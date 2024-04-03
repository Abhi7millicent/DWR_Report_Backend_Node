import express from "express";
import {
  getCompletedTaskCount,
  getCompletedTaskCountById,
  getEmployeeCount,
  getListOfEvents,
  getPendingTaskCount,
  getPendingTaskCountById,
  getProjectCount,
  getTaskCount,
  getTaskCountById,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/employee-count", getEmployeeCount);
router.get("/project-count", getProjectCount);
router.get("/task-count", getTaskCount);
router.get("/pending-task-count", getPendingTaskCount);
router.get("/completed-task-count", getCompletedTaskCount);
router.get("/task-count/:id", getTaskCountById);
router.get("/pending-task-count/:id", getPendingTaskCountById);
router.get("/completed-task-count/:id", getCompletedTaskCountById);
router.get("/events-list", getListOfEvents);

export default router;
