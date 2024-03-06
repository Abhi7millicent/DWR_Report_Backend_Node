import express from "express";
import {
  postLeaveManagement,
  getLeaveManagement,
} from "../controllers/leaveManagementController.js";

const router = express.Router();

router.post("/add", postLeaveManagement);
router.get("/list/:id", getLeaveManagement);

export default router;
