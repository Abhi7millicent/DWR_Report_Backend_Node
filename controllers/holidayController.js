import fs from "fs";
import xlsx from "xlsx";
import holidayMasterSchema from "../models/holiday.js";

// Controller function to handle uploading Excel sheet and writing data to database
export const uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const filePath = await uploadHolidayFileToFirebaseStorage(file);
    const fileContent = await readDWRFromFirebaseFile(filePath);

    const workbook = xlsx.read(fileContent, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Transformation function for each row
    const transformedData = data.map((row) => ({
        date: formatDate(row.date),
        day: row.day,
        holiday: row.holiday,
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

    // Insert transformed data into the database
    await holidayMasterSchema.bulkCreate(transformedData);


    res.status(200).send("Excel sheet uploaded and data inserted successfully.");
  } catch (error) {
    console.error("Error uploading Excel sheet:", error);
    res.status(500).send("Internal server error.");
  }
};

// Controller function to retrieve data from the database
export const getData = async (req, res) => {
  try {
    const data = await holidayMasterSchema.findAll();
    res.status(200).json({data: data});
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal server error.");
  }
};
