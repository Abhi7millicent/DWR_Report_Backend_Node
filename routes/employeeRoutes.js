import express from "express";
import { addEmployee, getEmployeeList, getEmployeeById, updateEmployee } from "../controllers/employeeController.js";

const router = express.Router();

// Define routes
router.post("/add", addEmployee);

router.get("/list", getEmployeeList);

router.get('/:id', getEmployeeById);

router.put('/:id', updateEmployee);

export default router;