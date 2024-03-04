import express from "express";
import { updateEmployeePersonalDetails, getEmployeePersonalDataByEmployeeId } from "../controllers/employeePersonalDeatilsController.js";

const router = express.Router();

router.put("/update/:employeeId",updateEmployeePersonalDetails);

router.get("/:employeeId", getEmployeePersonalDataByEmployeeId);

export default router;