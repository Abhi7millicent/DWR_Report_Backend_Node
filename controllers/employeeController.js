import bcrypt from 'bcrypt';
import Employee from "../models/employee.js";
import addresSchema  from "../models/employeeAddress.js";
import { personalDeatilsSchema } from "../models/employeePersonalDeatils.js";
import {salaryDetailSchema}  from "../models/employeeSalary.js";

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

        // Hash the password and confirmPassword
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

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

        // Automatically add address entries for the new employee

        try {
            await addresSchema.create({
                employeeId: employee._id,
                addressType: 'Permanent'
            });
        } catch (error) {
            // Handle the error here
            console.error("An error occurred while creating the address:", error);
        }

        console.log("employeeId:", employee._id);

        await addresSchema.create({
            employeeId: employee._id,
            addressType: 'Temporary'
        });

        // Create personal details entry for the new employee
        await personalDeatilsSchema.create({
            employeeId: employee._id
        });

        // Create salary details entry for the new employee
        await salaryDetailSchema.create({
            employeeId: employee._id
        });

        res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
