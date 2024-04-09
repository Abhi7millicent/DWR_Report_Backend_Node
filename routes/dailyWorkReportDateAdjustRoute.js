// routes/dailyWorkReportDateAdjustRoutes.js
import { Router } from 'express';
import { create, getAll, getById, update } from '../controllers/dailyWorkReportDateAdjustController.js';

const router = Router();

// Routes for CRUD operations
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
export default router;
