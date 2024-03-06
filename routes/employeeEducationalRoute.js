import express from "express";

import { addEmployeeEducationalDetail, getEmployeeEducationalDetail, putDeleteFlag } from "../controllers/employeeEducationalController.js";

const router = express.Router();

router.post("/save",addEmployeeEducationalDetail);
router.get("/list",getEmployeeEducationalDetail);
router.put("/delete/:id",putDeleteFlag);

export default router;