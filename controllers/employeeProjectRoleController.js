import employeeProjectRoleSchema from '../models/employeeProjectRole.js';

// Create operation
export const createEmployeeProjectRole = async (req, res) => {
    try {
        const employeeProjectRole = await employeeProjectRoleSchema.create(req.body);
        res.status(201).json(employeeProjectRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read operation - Get all employee project roles
export const getEmployeeProjectRoles = async (req, res) => {
    try {
        const employeeProjectRoles = await employeeProjectRoleSchema.findAll();
        res.json(employeeProjectRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read operation - Get employee project role by ID
export const getEmployeeProjectRoleById = async (req, res) => {
    const { id } = req.params;
    try {
        const employeeProjectRole = await employeeProjectRoleSchema.findByPk(id);
        if (employeeProjectRole) {
            res.json(employeeProjectRole);
        } else {
            res.status(404).json({ message: 'Employee project role not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update operation
export const updateEmployeeProjectRole = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await employeeProjectRoleSchema.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            res.json({ message: 'Employee project role updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee project role not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateDeleteFlag = async (req, res) => {
    const { id } = req.params;
    try {
        const employeeProjectRole = await employeeProjectRoleSchema.findByPk(id);
        if (employeeProjectRole) {
            employeeProjectRole.deleteFlag = true;
            await employeeProjectRole.save();
            res.json({ message: 'Delete flag updated successfully' });
        } else {
            res.status(404).json({ message: 'Employee project role not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};