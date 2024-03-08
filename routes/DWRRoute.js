import express from "express";
import multer from "multer";
import { uploadDWR } from "../controllers/DWRController.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:\\DWR_report_backend\\uploads\\DWR');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original filename
  }
});

const upload = multer({ storage: storage });

// Define route for uploading DWR data
router.post("/upload", upload.single('file'), uploadDWR);

export default router;
