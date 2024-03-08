import xlsx from "xlsx";
import dwrSchema from "../models/DWR.js";

export const uploadDWR = async (req, res) => {
  try {
    console.log("file:", req.body.file);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const row of data) {
      const newDWR = new dwrSchema({
        employeeId: row.employeeId,
        date: row.date,
        fromTime: row.fromTime,
        toTime: row.toTime,
        taskId: row.taskId,
        projectName: row.projectName,
        taskDescription: row.taskDescription, // Corrected spelling
        reportedBy: row.reportedBy,
        ticketType: row.ticketType,
        status: row.status,
        estimatedDate: row.estimatedDate,
        solution: row.solution,
      });

      await newDWR.save();
    }

    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading DWR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
