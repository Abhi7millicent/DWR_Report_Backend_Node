import express from "express";
import {
  postEmployeeDocument,
  getEmployeeDocument,
  putEmployeeDocument,
} from "../controllers/employeeDocumentController.js";
import upload from "../middleware/documentUpload.js";
const router = express.Router();

router.post("/add", upload.single("uploadFilePath"), postEmployeeDocument);
router.get("/list/:id", getEmployeeDocument);
router.put("/:id", putEmployeeDocument);

export default router;
