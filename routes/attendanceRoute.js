import express from "express";
// import multer from "multer";
import { getAttendanceOfMonth, uploadAttendance } from "../controllers/attendanceController.js";
import upload from "../middleware/attendanceUpload.js";

const router = express.Router();
// Multer configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'D:\\DWR_report_backend\\uploads\\attendance');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // Keep the original filename
//     }
//   });

  // const upload = multer({ storage: storage });

  

  // router.post("/upload/:startDate/:endDate", upload.single('file'), uploadAttendance);
  router.post("/upload/", upload.single('file'), uploadAttendance);
  router.get("/:employeeId/:date", getAttendanceOfMonth);

  export default router;

