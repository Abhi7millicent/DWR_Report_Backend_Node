import express from "express";
import {
  getEmployeeAdressById,
  putEmployeeAdressById,
} from "../controllers/employeeAddressController.js";
const router = express.Router();

router.get("/:addressType/:id", getEmployeeAdressById);
router.put("/:addressType/:id", putEmployeeAdressById);
export default router;
