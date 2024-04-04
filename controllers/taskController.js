import Task from "../models/task.js";
import { Op } from "sequelize";
// Controller for creating a new task
export const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Could not create task" });
    }
};

// Controller for getting all tasks
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({where: {deleteFlag: false}});
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
};

export const getAllTasksById = async (req, res) => {
  const employeeId = req.params.employeeId;
  try {
      const tasks = await Task.findAll({where: {deleteFlag: false, assignTo: {
        [Op.and]: [
            { value: employeeId }      // Filter by value
        ]
    }}});
      res.json({data: tasks});
  } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Could not fetch tasks" });
  }
};

export const getAllTasksByProjectId = async (req, res) => {
    try {
        const tasks = await Task.findAll({ 
            where: { 
                projectId: {
                    [Op.and]: [
                        { value: req.params.id }      // Filter by value
                    ]
                },
                taskId: "", // Filter tasks where taskId is null
                deleteFlag: false 
            } 
        });
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
};

export const getAllTasksByTaskId = async (req, res) => {
    try {
        const tasks = await Task.findAll({where: {taskId: req.params.id,deleteFlag: false}});
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
};

// Controller for getting a single task by ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Could not fetch task" });
    }
};

// Controller for updating a task by ID
export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Task.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedTask = await Task.findByPk(id);
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Could not update task" });
    }
};

// Controller for deleting a task by ID
export const updateDeleteFlag = async (req, res) => {
  const { id } = req.params;
  try {
      const task = await Task.findByPk(id);
      if (!task) {
          return res.status(404).json({ message: "task not found" });
      }
      await task.update({ deleteFlag: true });
      res.status(200).json(task);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

export const getTaskTotalCount = async () => {
    try {
      const count = await Task.count({ where: { deleteFlag: false } });
      return count;
    } catch (error) {
      throw new Error(error.message);
    }
  };
export const getPendingTaskTotalCount = async () => {
    try {
      const count = await Task.count({ where: { deleteFlag: false, status: "Pending" } });
      return count;
    } catch (error) {
      throw new Error(error.message);
    }
  };
export const getCompletedTaskTotalCount = async () => {
    try {
      const count = await Task.count({ where: { deleteFlag: false, status: "Completed" } });
      return count;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  export const getTaskTotalCountById = async (employeeId) => {
    try {
      const count = await Task.count({ where: { deleteFlag: false, assignTo: {
        [Op.and]: [
            { value: employeeId }      // Filter by value
        ]
    }, } });
      return count;
    } catch (error) {
      throw new Error(error.message);
    }
  };
export const getPendingTaskTotalCountById = async (employeeId) => {
    try {
      const count = await Task.count({ where: { assignTo: {
        [Op.and]: [
            { value: employeeId }      // Filter by value
        ]
    }, deleteFlag: false, status: "Pending" } });
      return count;
    } catch (error) {
      throw new Error(error.message);
    }
  };
export const getCompletedTaskTotalCountById = async (employeeId) => {
    try {
      const count = await Task.count({ where: { assignTo: {
        [Op.and]: [
            { value: employeeId }      // Filter by value
        ]
    }, deleteFlag: false, status: "Completed" } });
      return count;
    } catch (error) {
      throw new Error(error.message);
    }
  };
