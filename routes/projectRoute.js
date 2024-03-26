import express from "express";
import { getProjects, getProjectById, createProject, updateProject, updateDeleteFlag } from "../controllers/projectController.js";

const router = express.Router();

// Add a new project
router.post("/add", createProject);

// Get a list of all projects
router.get("/list", getProjects);

// Get project details by ID
router.get("/:id", getProjectById);

// Edit a project
router.put("/edit/:id", updateProject);

// Update delete flag for a project
router.patch("/delete/:id", updateDeleteFlag);

export default router;
