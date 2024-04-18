import express from 'express';
import { getEmployeeDetails, updateEmployeeDetails } from '../controllers/welcomeContoller.js';

const router = express.Router();

router.put('/personal-details/:employeeId', updateEmployeeDetails);
router.get('/personal-details/:employeeId', getEmployeeDetails);

export default router;