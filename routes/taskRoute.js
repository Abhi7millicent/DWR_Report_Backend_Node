import express from 'express';
import { addTask, updateDeleteFlag, getTaskById, getAllTasks, updateProjectId, updateTask } from '../controllers/taskController.js';

const router = express.Router();

router.post('/add', addTask);
router.patch('/update-delete-flag/:id', updateDeleteFlag);
router.get('/get-task/:id', getTaskById);
router.get('/get-all-tasks', getAllTasks);
router.put('/update-project-id/:id', updateProjectId);
router.put('/update-task/:id', updateTask);

export default router;