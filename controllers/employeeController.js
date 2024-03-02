import Employee from "../models/employee.js";

export const addEmployee = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            dateOfBirth,
            balancedLeave,
            lastUpdatedMonthYear,
            reporting,
            role,
            loginId,
            password
        } = req.body;

        const employee = new Employee({
            firstName,
            middleName,
            lastName,
            email,
            dateOfBirth,
            balancedLeave,
            lastUpdatedMonthYear,
            reporting,
            role,
            loginId,
            password
        });

        await employee.save();

        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Duplicate email or loginId' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};