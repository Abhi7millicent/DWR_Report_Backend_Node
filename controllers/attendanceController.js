import XLSX from 'xlsx';
import AttendanceSchema from '../models/attendance.js';
import moment from "moment-timezone";
import { Op } from "sequelize";
import { getAttendanceIdById, getAttendanceIdWithStartDate } from './employeeController.js';
import { readFirebaseFile, uploadAttendanceToFirebaseStorage } from '../middleware/attendanceUpload.js';
import { getLeaveListById } from './leaveManagementController.js';
export const uploadAttendance = async (req, res) => {
    try {
        const file = req.file;
        // const startDate = req.params.startDate;
        // const endDate = req.params.endDate;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const filePath = await uploadAttendanceToFirebaseStorage(file);
    const fileContent = await readFirebaseFile(filePath);

    // Load the uploaded Excel file
    const workbook = XLSX.read(fileContent, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: true });
        const attendanceRecords = {};
    jsonData.forEach(row => {
    const { id, dateTime } = row;
    const dateTimeString = formatDateTime(dateTime); // Convert dateTime to string
    const date = dateTimeString.substring(0, 10); 
    if (!attendanceRecords[id]) {
        attendanceRecords[id] = {}; // Initialize the object if it doesn't exist
    }
    if (!attendanceRecords[id][date]) {
        attendanceRecords[id][date] = { // Initialize the date object if it doesn't exist
            attendanceId: id, // Use 'attendanceId' instead of 'id'
            date: date, // Extract date from dateTimeString
            startTime: dateTimeString, // Store as string
            endTime: dateTimeString, // Store as string
        };
    } else {
        attendanceRecords[id][date].endTime = dateTimeString; // Store as string
    }
});

// console.log("attendanceRecords:", attendanceRecords);

// Save attendance records to the database
const savePromises = Object.values(attendanceRecords).map(async record => {
    const attendanceDates = Object.keys(record);
    for (const date of attendanceDates) {
        const { attendanceId, startTime, endTime } = record[date];
        const totalHours = (new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60); // Convert milliseconds to hours
        let statusflag;
        if (totalHours >= 9) {
            statusflag = 'Present';
        } else if (totalHours >= 4) {
            statusflag = 'Half Day';
        } else {
            statusflag = 'Absent';
        }
        await AttendanceSchema.create({ attendanceId, date, startTime, endTime, statusflag });
    }
});
await Promise.all(savePromises);

const employeeAttendanceId = await getAttendanceIdWithStartDate();
// const startDateFormat = new Date(startDate);
// const endDateFormat = new Date(endDate);
// const listOfDates = [];
// let saturdayCount = 0;

// for (let date = startDateFormat; date <= endDateFormat; date.setDate(date.getDate() + 1)) {
//     if (date.getDay() === 6) { // Saturday (0 is Sunday, 6 is Saturday)
//         saturdayCount++;
//         if (saturdayCount % 2 === 0) { // include 2nd and 4th Saturdays
//             continue;
//         } else {
//             listOfDates.push(date.toISOString().split('T')[0]);
//             continue;
//         }
//     }
//     if (date.getDay() !== 0) { // Exclude Sundays
//         listOfDates.push(date.toISOString().split('T')[0]);
//     }
// }
// const promises = employeeAttendanceId.map(async (employee) => {
//     await Promise.all(listOfDates.map(async (date) => {
//         try {
//             const attendance = await AttendanceSchema.findAll({
//                 where: {
//                     attendanceId: employee.attendanceId,
//                     date: date
//                 }
//             });
//             console.log("attendance:", attendance);
//             if (!attendance || attendance.length === 0) {
//                 const newAttendance = new AttendanceSchema({
//                     attendanceId: employee.attendanceId,
//                     date: date,
//                     statusflag: "Absent"
//                 });
//                 await newAttendance.save();
//                 console.log(`Attendance added for ${employee.attendanceId} on ${date}`);
//             } else {
//                 console.log(`Attendance already exists for ${employee.attendanceId} on ${date}`);
//             }
//         } catch (error) {
//             console.error(`Error occurred while processing attendance for ${employee.attendanceId} on ${date}:`, error);
//         }
//     }));
// });


// await Promise.all(promises);

// console.log("employeeAttendanceId:", employeeAttendanceId);
        return res.status(200).json({ message: 'Attendance records uploaded successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

function formatDateTime(cell) {
    if (!isNaN(cell)) {
        // Check if the cell value is a number (which is typical for date cells in Excel)
        const dateValue = cell;
        const date = new Date((dateValue - (25567 + 2)) * 86400 * 1000); // Converting Excel date serial to JavaScript date

        // Adjusting for Indian Standard Time (IST)
        const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        date.setTime(date.getTime() + ISTOffset);

        // Deducting 10 hours
        date.setTime(date.getTime() - (11 * 60 * 60 * 1000));

        if (!isNaN(date.getTime())) {
            // Check if the date is valid
            return moment(date).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm");
        } else {
            console.log("Cell does not contain a valid date value.");
            return null;
        }
    } else {
        console.log("Cell does not contain a valid date value.");
        return null;
    }
}

export const getAttendanceOfMonth = async (req, res) => {
    try {
        const { date, employeeId } = req.params;
        const attendanceId = await getAttendanceIdById(employeeId);
        if (!attendanceId) {
            throw new Error("attendanceId not found1");
        }

        const [year, month] = date.split('-');
        if (isNaN(parseInt(month)) || isNaN(parseInt(year))) {
            return res.status(400).json({ message: 'Invalid month or year' });
        }

        const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
        const endDate = new Date(year, month, 0, 23, 59, 59).toISOString().split('T')[0];

        const attendanceList = await AttendanceSchema.findAll({
            where: {
            attendanceId: attendanceId
            // date: {
            //     $gte: startDate,
            //     $lte: endDate
            // }
        }
        });
        console.log("attendanceList:", attendanceList);
        const result = {};
        attendanceList.forEach(attendance => {
            result[attendance.date] = attendance.statusflag;
        });
        
        const leaveResult = {};
        const leaveList = await getLeaveListById(startDate, endDate, employeeId);
        leaveList.forEach(leave => {
            const leaveStartDate = new Date(leave.startDate);
            const leaveEndDate = new Date(leave.endDate);
            for (let date = leaveStartDate; date <= leaveEndDate; date.setDate(date.getDate() + 1)) {
                leaveResult[date.toISOString().split('T')[0]] = leave.leaveType; // Assuming leave.leaveType holds the type of leave
            }
        });

        const listOfAttendance = {
            ...result,
            ...leaveResult
        };

        res.status(200).json( listOfAttendance );
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getNoOfAbsentBetweenDateRange = async (startDate, endDate, employeeId) => {
    try{
        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = endDate.toISOString().split('T')[0];
        
        const absentCount = await AttendanceSchema.count({
            where: {
                attendanceId: employeeId,
                date: {
                    [Op.between]: [startDateString, endDateString]
                },
                statusflag: "Absent"
            }
        });

        return absentCount;
    } catch (error) {
      throw new Error("Error finding start date: " + error.message);
    }
  };
export const getNoOfHalfdayBetweenDateRange = async (startDate, endDate, employeeId) => {
    try{
        const startDateString = startDate.toISOString().split('T')[0];
        const endDateString = endDate.toISOString().split('T')[0];
        
        const absentCount = await AttendanceSchema.count({
            where: {
                attendanceId: employeeId,
                date: {
                    [Op.between]: [startDateString, endDateString]
                },
                statusflag: "HalfDay"
            }
        });

        return absentCount;
    } catch (error) {
      throw new Error("Error finding start date: " + error.message);
    }
  };

 