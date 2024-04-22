import express from "express";
import uploadHoliday from "../middleware/holidayUpload.js";
import { getData, uploadExcel } from "../controllers/holidayController.js";

const router = express.Router();

// POST endpoint for uploading Excel sheet
router.post("/upload", uploadHoliday.single("file"), uploadExcel);

// GET endpoint for retrieving data
router.get("/data", getData);

export default router;