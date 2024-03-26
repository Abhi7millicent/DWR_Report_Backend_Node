import express from 'express';
import { createEmployeeProjectRole, getEmployeeProjectRoles, getEmployeeProjectRoleById, updateEmployeeProjectRole } from './employeeProjectRoleController.js';

const router = express.Router();

// Routes for CRUD operations
router.post('/', createEmployeeProjectRole);
router.get('/', getEmployeeProjectRoles);
router.get('/:id', getEmployeeProjectRoleById);
router.put('/:id', updateEmployeeProjectRole);
router.patch('/:id', updateDeleteFlag);

export default router;
