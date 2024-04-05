import express from 'express';
import { createTask, updateDeleteFlag, getTaskById, getAllTasks, updateTask, getAllTasksByTaskId, getAllTasksByProjectId, getAllTasksById } from '../controllers/taskController.js';

const router = express.Router();

router.post('/add', createTask);
router.patch('/update-delete-flag/:id', updateDeleteFlag);
router.get('/get-task/:id', getTaskById);
router.get('/get-all-tasks', getAllTasks);
router.get('/get-projectId/:id', getAllTasksByProjectId);
router.get('/get-taskId/:id', getAllTasksByTaskId);
router.put('/update-task/:id', updateTask);
router.get('/task/:employeeId', getAllTasksById);


export default router;