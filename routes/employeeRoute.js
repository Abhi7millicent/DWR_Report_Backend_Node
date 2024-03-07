import express from "express";
import {
  addEmployee,
  getEmployeeList,
  getEmployeeById,
  updateEmployee,
  postAddBalancedLeave,
  getBalancedLeave,
} from "../controllers/employeeController.js";

const router = express.Router();

// Define routes
router.post("/add", addEmployee);

router.get("/list", getEmployeeList);

router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);
router.post("/addBalancedLeave", postAddBalancedLeave);
router.get("/balanced-leave/:id", getBalancedLeave);

export default router;
