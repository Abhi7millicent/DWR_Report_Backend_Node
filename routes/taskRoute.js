import express from 'express';
import { createTask, updateDeleteFlag, getTaskById, getAllTasks, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/add', createTask);
router.patch('/update-delete-flag/:id', updateDeleteFlag);
router.get('/get-task/:id', getTaskById);
router.get('/get-all-tasks', getAllTasks);
router.put('/update-task/:id', updateTask);

export default router;