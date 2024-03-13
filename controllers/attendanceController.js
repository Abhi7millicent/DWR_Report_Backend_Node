import XLSX from 'xlsx';
import AttendanceSchema from '../models/attendance.js';
import moment from "moment-timezone";
import { getAttendanceIdById } from './employeeController.js';
export const uploadAttendance = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Load the uploaded Excel file
        const workbook = XLSX.readFile(req.file.path);
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

        const attendanceList = await AttendanceSchema.find({
            attendanceId: attendanceId,
            date: {
                $gte: startDate,
                $lte: endDate
            }
        });

        const result = {};
        attendanceList.forEach(attendance => {
            result[attendance.date] = attendance.statusflag;
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};