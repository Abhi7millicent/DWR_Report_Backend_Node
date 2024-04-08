import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateDeleteFlag,
  getListOfProjectName,
  getListOfProjectNameByEmployeeId,
} from "../controllers/projectController.js";

const router = express.Router();

// Add a new project
router.post("/add", createProject);

// Get a list of all projects
router.get("/list", getProjects);

router.get("/name", getListOfProjectName);

router.get("/getNameByEmployeeId", getListOfProjectNameByEmployeeId);

// Get project details by ID
router.get("/:id", getProjectById);

// Edit a project
router.put("/edit/:id", updateProject);

// Update delete flag for a project
router.patch("/delete/:id", updateDeleteFlag);

export default router;
