import express from "express";
import { generateSalarySlip, getSalarySlipByEmployeeId } from "../controllers/salarySlipController.js";

const router = express.Router();

router.post("/:employeeId",generateSalarySlip)
router.get("/list/:employeeId",getSalarySlipByEmployeeId)

export default router;