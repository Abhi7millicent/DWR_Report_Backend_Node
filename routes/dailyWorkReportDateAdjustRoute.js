// routes/dailyWorkReportDateAdjustRoutes.js
import { Router } from 'express';
import { create, getAll, getById, getDateByEmployeeId, update } from '../controllers/dailyWorkReportDateAdjustController.js';

const router = Router();

// Routes for CRUD operations
router.get('/', getAll);
router.get('/:id', getById);
router.get('/get-by-employeeId/:employeeId', getDateByEmployeeId);
router.post('/create', create);
router.put('/:id', update);
export default router;
