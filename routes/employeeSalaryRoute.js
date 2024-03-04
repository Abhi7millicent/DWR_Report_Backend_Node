import express from "express";
import {
  getEmployeeSalaryByEmployeeId,
  putEmployeeSalary,
} from "../controllers/employeeSalaryController.js";

const router = express.Router();

router.put("/update/:id", putEmployeeSalary);
router.get("/:id", getEmployeeSalaryByEmployeeId);

export default router;
