import express from "express";
import { addProject, getListOfProjects, editProject, updateDeleteFlag, getProjectById } from "../controllers/projectController.js";

const router = express.Router();

// Add a new project
router.post("/add", addProject);

// Get a list of all projects
router.get("/list", getListOfProjects);

// Get project details by ID
router.get("/:id", getProjectById);

// Edit a project
router.put("/edit/:id", editProject);

// Update delete flag for a project
router.patch("/delete/:id", updateDeleteFlag);

export default router;
