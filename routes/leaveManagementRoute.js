import express from "express";
import {
  postLeaveManagement,
  getLeaveManagement,
  postApproveLeave,
  postRejectLeave,
} from "../controllers/leaveManagementController.js";

const router = express.Router();

router.post("/add", postLeaveManagement);
router.get("/list/:id", getLeaveManagement);
router.post("/approve/:id", postApproveLeave);
router.post("/reject/:id", postRejectLeave);

export default router;
