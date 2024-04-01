import xlsx from "xlsx";
import dwrSchema from "../models/dailyWorkReport.js";
import moment from "moment";
import { Op } from 'sequelize';

export const uploadDWR = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Parse uploaded Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log("data:", data);

    // Transform Excel data to match the schema
    const transformedData = data.map((row) => ({
      employeeId: row.employeeId,
      date: formatDate(row.date),
      fromTime: formatTime(row.fromTime),
      toTime: formatTime(row.toTime),
      taskId: row.taskId,
      projectName: row.projectName,
      taskDescription: row.taskDescription,
      reportedBy: row.reportedBy,
      ticketType: row.ticketType,
      status: row.status,
      estimatedDate: formatDate(row.estimatedDate),
      solution: row.solution,
    }));

    function formatDate(cell) {
      // console.log("cell:", cell);
      if (!isNaN(cell)) {
        // Check if the cell value is a number (which is typical for date cells in Excel)
        const dateValue = cell;
        const date = new Date((dateValue - (25567 + 1)) * 86400 * 1000); // Converting Excel date serial to JavaScript date
        // console.log("date2:", date);
        if (!isNaN(date.getTime())) {
          // Check if the date is valid
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate() - 1).padStart(2, "0");
          return `${year}-${month}-${day}`;
        } else {
          console.log("Cell does not contain a valid date value1.");
          return null;
        }
      } else {
        console.log("Cell does not contain a valid date value2.");
        return null;
      }
    }

    function formatTime(cell) {
      if (!isNaN(cell)) {
        const timeValue = cell;
        const Value = new Date((timeValue - 25567) * 86400 * 1000);
        const formattedTime = moment.utc(Value).format("HH:mm");
        return formattedTime;
      } else {
        console.log("Cell does not contain a numeric value.");
        return null;
      }
    }

    // Save transformed data to MySQL
    await dwrSchema.bulkCreate(transformedData);


    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading data");
  }
};

export const getDWR = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const dwrList = await dwrSchema.findAll({ where: { employeeId, deleteFlag: false } });
    res.status(200).json({ data: dwrList });
  } catch (err) {
    console.error("Error fetching DWR entries:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDWRBasedOnDateRange = async (req, res) => {
  try {
    const { startDate, endDate, employeeId } = req.params;

    const dwrList = await dwrSchema.findAll({
      where: { employeeId, date: { [Op.between]: [startDate, endDate] }, deleteFlag: false }
    });

    res.status(200).json({ data: dwrList });
  } catch (err) {
    console.error("Error fetching DWR entries:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const getDWRBasedOnDate = async (req, res) => {
  try {
    const { employeeId, date } = req.params;

    const dwrList = await dwrSchema.findAll({ where: { employeeId, date, deleteFlag: false } });

    res.status(200).json({ data: dwrList });
  } catch (err) {
    console.error("Error fetching DWR entries:", err);
    res.status(500).json({ message: "Internal server error". err });
  }
};