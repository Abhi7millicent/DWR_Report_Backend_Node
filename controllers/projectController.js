import projectSchema from "../models/project.js";

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const newProject = await projectSchema.create({
      name,
      description,
      startDate,
      endDate,
      deleteFlag: false, // Assuming deleteFlag is initially false
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a list of all projects
export const getListOfProjects = async (req, res) => {
  try {
    const projects = await projectSchema.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project details by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectSchema.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a project
export const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;
    const updatedProject = await projectSchema.update(
      {
        name,
        description,
        startDate,
        endDate,
      },
      { where: { id } }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update delete flag for a project
export const updateDeleteFlag = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await projectSchema.update(
      { deleteFlag: true },
      { where: { id } }
    );
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
