import express from "express";
import multer from "multer";
import { uploadDWR, getDWR, getDWRBasedOnDate, getDWRBasedOnDateRange } from "../controllers/dailyWorkReportController.js";
import uploadDWRPath from "../middleware/dailyWorkReportUpload.js";

const router = express.Router();

// Define route for uploading DWR data
router.post("/upload", uploadDWRPath.single('file'), uploadDWR);
router.get("/list/:employeeId", getDWR);
router.get("/list/:employeeId/:date", getDWRBasedOnDate);
router.get("/list/:employeeId/:startDate/:endDate", getDWRBasedOnDateRange);

export default router;
