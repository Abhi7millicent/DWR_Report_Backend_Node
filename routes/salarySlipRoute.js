import express from "express";
import { generateSalarySlip, getSalarySlipByEmployeeId, getSalarySlipById, updateSalarySlipById } from "../controllers/salarySlipController.js";
import uploadSalarySlip from "../middleware/salarySlipUpload.js";

const router = express.Router();

router.post("/:employeeId",generateSalarySlip)
router.get("/list/:employeeId",getSalarySlipByEmployeeId)
router.put('/:id', uploadSalarySlip.single("file"), updateSalarySlipById);
router.get("/:id", getSalarySlipById);

export default router;