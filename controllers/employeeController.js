import bcrypt from 'bcrypt';
import Employee from "../models/employee.js";

export const addEmployee = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            balancedLeave,
            lastUpdatedMonthYear,
            reporting,
            role,
            password,
            confirmPassword // New field for confirming password
        } = req.body;

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash the password and confirmPassword
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        // Check if the email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const currentDate = new Date().toISOString().substring(0, 10); // Get the current date in yyyy-mm-dd format

        const employee = new Employee({
            firstName,
            middleName,
            lastName,
            email,
            date: currentDate, // Assign current date to dateOfBirth
            balancedLeave,
            lastUpdatedMonthYear,
            reporting,
            role,
            password: hashedPassword, // Save the hashed password
            confirmPassword: hashedConfirmPassword, // Save the hashed confirmPassword
            deleteFlag: false // Default value for deleteFlag
        });

        await employee.save();

        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
