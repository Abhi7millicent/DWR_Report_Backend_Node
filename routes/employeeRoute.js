import express from "express";
import {
  addEmployee,
  getEmployeeList,
} from "../controllers/employeeController.js";

const router = express.Router();

// Define routes
router.post("/add", addEmployee);

router.get("/list", getEmployeeList);

export default router;
