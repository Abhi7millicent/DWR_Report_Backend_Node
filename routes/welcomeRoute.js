import express from 'express';
import { updateWelcomeDetailsByEmployeeId } from '../controllers/welcomeContoller.js';

const router = express.Router();

// Route to update welcome details by employee ID
router.put('/update/:employeeId', updateWelcomeDetailsByEmployeeId);

export default router;