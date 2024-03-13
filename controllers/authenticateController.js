import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from "../models/employee.js";

export const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the employee by email
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(401).json({ message: 'Authentication failed. Email or password incorrect.' });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, employee.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Email or password incorrect.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: employee._id, email: employee.email, role: employee.role },
            process.env.JWT_SECRET, // Your JWT secret key
            { expiresIn: '1h' } // Token expiration time
        );

        // Response data
        const responseData = {
            id: employee.id,
            name: `${employee.firstName} ${employee.lastName}`,
            role: employee.role,
            message: 'Authentication successful',
            status: true, 
            token
        };

        // Send response
        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
