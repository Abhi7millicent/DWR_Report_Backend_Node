
import Task from '../models/task.js';

// Controller to add a new task
export const addTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add task' });
  }
};

// Controller to update the delete flag of a task
export const updateDeleteFlag = async (req, res) => {
    try{
    const { id } = req.params;
    const updatedTask = await Task.update(
      { deleteFlag: true },
      { where: { id } }
    );
    res.status(200).json({ updatedTask, message: 'Task delete flag updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get a task by ID
export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

// Controller to get a list of all tasks
export const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.findAll({ where: { deleteFlag: false } });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch tasks' });
    }
  };

// Controller to update project ID of a task by ID
export const updateProjectId = async (req, res) => {
  const { id } = req.params;
  const { projectId } = req.body;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.update({ projectId });
    res.status(200).json({ message: 'Project ID updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update project ID' });
  }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await task.update(req.body);
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update task' });
    }
  };
