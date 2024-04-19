import express from "express";

import {
  addEmployeeEducationalDetail,
  getEmployeeEducationalDetail,
  putDeleteFlag,
} from "../controllers/employeeEducationalController.js";
import uploadEducationDetails from "../middleware/educationDocumentUpload.js";

const router = express.Router();

router.post("/save", uploadEducationDetails.single("file"), addEmployeeEducationalDetail);
router.get("/list/:id", getEmployeeEducationalDetail);
router.put("/delete/:id", putDeleteFlag);

export default router;
