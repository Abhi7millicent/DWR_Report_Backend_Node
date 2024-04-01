import express from "express";
import { generateSalarySlip } from "../controllers/salarySlipController.js";

const router = express.Router();

router.post("/salary-slip/:employeeId",generateSalarySlip)

export default router;