import express from 'express';
import { getEmployeeDetails, getPersonalDetailsValue, updateAadhaarCard, updateEmployeeDetails, updatePanCard } from '../controllers/welcomeContoller.js';
import upload from '../middleware/documentUpload.js';

const router = express.Router();

router.put('/personal-details/:employeeId', updateEmployeeDetails);
router.get('/personal-details/:employeeId', getEmployeeDetails);
router.put('/pan-upload/:employeeId', upload.single("file"), updatePanCard);
router.put('/aadhaar-upload/:employeeId', upload.single("file"), updateAadhaarCard);
router.get('/personal-details-value/:employeeId', getPersonalDetailsValue);

export default router;