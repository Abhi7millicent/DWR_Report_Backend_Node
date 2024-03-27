import projectSchema from "../models/project.js";

// Get all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await projectSchema.findAll({where: {deleteFlag: false}});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get project by ID
export const getProjectById = async (req, res) => {
    const { id } = req.params;
    try {
        const project = await projectSchema.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new project
export const createProject = async (req, res) => {
    const projectData = req.body;
    try {
        const project = await projectSchema.create(projectData);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing project
export const updateProject = async (req, res) => {
    const { id } = req.params;
    const projectData = req.body;
    try {
        const project = await projectSchema.findByPk(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        await project.update(projectData);
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a project by ID
export const updateDeleteFlag = async (req, res) => {
  const { id } = req.params;
  try {
      const project = await projectSchema.findByPk(id);
      if (!project) {
          return res.status(404).json({ message: "Project not found" });
      }
      await project.update({ deleteFlag: true });
      res.status(200).json(project);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const getListOfProjectName = async (req, res) =>  {
    try {
     
      const projects = await projectSchema.findAll({
        where: {
          deleteFlag: false, // Using Sequelize operators
        },
      });
      const projectDetails = projects.map(project => {
        return {
          id: project.id,
          name: project.name
        };
      });
  
      res.json(projectDetails);
    } catch (error) {
      console.error("Error fetching project details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };