import { readFirebaseFile } from "../middleware/attendanceUpload.js";
import { uploadSalarySlipFileToFirebaseStorage } from "../middleware/salarySlipUpload.js";
import salarySlipSchema from "../models/salarySlip.js";
import {
  getNoOfAbsentBetweenDateRange,
  getNoOfHalfdayBetweenDateRange,
} from "./attendanceController.js";
import {
  getAttendanceIdByEmployeeMaster,
  getStartDateByEmployeeMaster,
} from "./employeeController.js";
import { getSalaryByEmployee } from "./employeeSalaryController.js";
import PDFDocument from "pdfkit";
import { parseString } from "xml2js";
import { PassThrough } from "stream";
import fs from "fs";

export const generateSalarySlip = async (req, res) => {
  try {
    const employeeId = req.params;
    let dateValue = await findStartDate(employeeId);
    const currentDate = new Date();
   
    if (!dateValue) {
      dateValue = await getStartDateByEmployeeMaster(employeeId);
      const startDate = new Date(dateValue);
      const differenceInMilliseconds = currentDate - startDate;
      const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
  
      if(differenceInDays < 35) {
        return res.status(200).json({ message: "35 days is not completed to generate salary slip" });
    }
    }

    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because month index starts from 0
    const day = String(currentDate.getDate()).padStart(2, "0");

    const currentDateFormatted = `${year}-${month}-${day}`;

    const parseDate = (dateString) => {
      const [year, month, day] = dateString.split("-").map(Number);
      return { year, month, day };
    };

    // Parse dateValue and currentDateFormatted
    const dateValueParsed = parseDate(dateValue);
    const currentDateParsed = parseDate(currentDateFormatted);

    // Check if year and month are the same
    const isSameMonthAndYear =
      dateValueParsed.year === currentDateParsed.year &&
      dateValueParsed.month === currentDateParsed.month;

      if (isSameMonthAndYear) {
        // If salary slip already exists, send a response indicating it's already present
        return res.status(200).json({
          message: "Salary slip already exists for the previous month.",
        });
      }

    const startDate = new Date(dateValue);

    // Calculate end date as one month ahead of the start date
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1);

    const dateFormate = new Date(endDate);
    dateFormate.setDate(endDate.getDate() + 1);
    const date = dateFormate.toISOString().split("T")[0];

    const noOfDays = await calculateNoOfDays(startDate, endDate);

    const basicSalaryString = await getSalaryByEmployee(employeeId);
    const basicSalary = +basicSalaryString;

    const dailyWages = basicSalary / noOfDays;

    const attendanceId = await getAttendanceIdByEmployeeMaster(employeeId);
    const absentCount = await getNoOfAbsentBetweenDateRange(
      startDate,
      endDate,
      attendanceId
    );
    const halfDayCount = await getNoOfHalfdayBetweenDateRange(
      startDate,
      endDate,
      attendanceId
    );

    const leave = absentCount + halfDayCount / 2;

    const leaveAmount = dailyWages * leave;

    //pending values
    const hra = 0;
    const conveyance = 0;
    const loan = 0;
    const professionTax = 0;
    const tdsIt = 0;

    const totalAddition = basicSalary + hra + conveyance;
    const totalDeduction = leaveAmount + loan + professionTax + tdsIt;
    const netSalary = totalAddition - totalDeduction;
    const empId = employeeId.employeeId;

    const salarySlip = new salarySlipSchema({
      employeeId: empId,
      date,
      basicSalary,
      leave,
      hra,
      conveyance,
      loan,
      professionTax,
      tdsIt,
      dailyWages,
      totalAddition,
      totalDeduction,
      netSalary,
    });

    await salarySlip.save();
    res.status(201).json({ message: "Salary slip genrated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findStartDate = async (employeeId) => {
  try {
    // Find the most recent salary slip for the employee
    const salarySlip = await salarySlipSchema.findOne({
      where: {
        employeeId: employeeId.employeeId,
      },
      order: [["id", "DESC"]],
    });

    if (!salarySlip) {
      return null;
    }

    return salarySlip.date;
  } catch (error) {
    throw new Error("Error finding start date: " + error.message);
  }
};

const calculateNoOfDays = async (startDate, endDate) => {
  try {
    // Calculate the difference in milliseconds between the two dates
    const differenceMs = endDate - startDate;

    // Convert milliseconds to days
    return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    throw new Error("Error to calculate noOfDays: " + error.message);
  }
};

export const getSalarySlipByEmployeeId = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const salarySlips = await salarySlipSchema.findAll({
      where: { employeeId: employeeId },
    });
    res.status(200).json({ data: salarySlips });
  } catch (error) {
    console.error("Error fetching salary slip by employeeId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSalarySlipById = async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const path = await uploadSalarySlipFileToFirebaseStorage(file);
  try {
    const updated = await salarySlipSchema.update(
      {
        ...req.body, // Update other fields from req.body
        path: path, // Update path
        status: "Approved", // Update status
      },
      {
        where: { id: id },
        returning: true, // Make sure to include this to get the updated record
      }
    );

    if (updated) {
      res
        .status(200)
        .json(`Salary slip with ID ${id} has been updated successfully.`);
    } else {
      res.status(404).json(`Salary slip with ID ${id} not found.`);
    }
  } catch (error) {
    res
      .status(500)
      .json("Error updating salary slip details: " + error.message);
  }
};

export const getSalarySlipById = async (req, res) => {
  const id = req.params.id;
  try {
    const salarySlip = await salarySlipSchema.findByPk(id);
    if (!salarySlip) {
      throw new Error("salarySlip not found");
    }
    res.status(200).json({ data: salarySlip });
  } catch (error) {
    res.status(500).json("Error to get salary slip details: " + error.message);
  }
};

export const downloadSalarySlip = async (req, res) => {
  const id = req.params.id;
  try {
    const salarySlip = await salarySlipSchema.findByPk(id);
    if (!salarySlip) {
      throw new Error("Salary slip not found");
    }
    const xmlData = await readFirebaseFile(salarySlip.path); // Fetch XML data from Firebase
    const pdfStream = await generatePDF(xmlData); // Convert XML to PDF

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="salary_slip.pdf"'
    );

    // Pipe the PDF stream to the response
    pdfStream.pipe(res);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error downloading salary slip", message: error.message });
  }
};

// Function to generate PDF from XML data
const generatePDF = async (xmlData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = new PassThrough(); // Use PassThrough stream

    // Pipe the PDF document to the PassThrough stream
    doc.pipe(stream);

    // Parse XML data
    parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      // Extract data from XML
      const salarySlipData = result.DOCUMENT;

      // Write data to PDF
      doc.text(JSON.stringify(salarySlipData), { align: "left" });

      // Finalize the PDF
      doc.end();

      // Resolve the promise with the PassThrough stream
      resolve(stream);
    });
  });
};
