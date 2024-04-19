import express from "express";
import {
  getEmployeeSalaryByEmployeeId,
  putEmployeeBankAccount,
  putEmployeeSalary,
} from "../controllers/employeeSalaryController.js";
import uploadBankDetails from "../middleware/bankDocumentUpload.js";

const router = express.Router();

router.put("/update/:id", uploadBankDetails.single('file'), putEmployeeSalary);
router.put("/update-bank-account/:id", uploadBankDetails.single('file'), putEmployeeBankAccount);
router.get("/:id", getEmployeeSalaryByEmployeeId);

export default router;
