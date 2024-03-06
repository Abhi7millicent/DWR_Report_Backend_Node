import bcrypt from "bcrypt";
import Employee from "../models/employee.js";
import addresSchema from "../models/employeeAddress.js";
import { personalDeatilsSchema } from "../models/employeePersonalDeatils.js";
import { salaryDetailSchema } from "../models/employeeSalary.js";

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
      confirmPassword, // New field for confirming password
    } = req.body;

    // Hash the password and confirmPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
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
      deleteFlag: false, // Default value for deleteFlag
    });

    await employee.save();

    // Automatically add address entries for the new employee

    try {
      await addresSchema.create({
        employeeId: employee._id,
        addressType: "Permanent",
      });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred while creating the address:", error);
    }

    await addresSchema.create({
      employeeId: employee._id,
      addressType: "Temporary",
    });

    // Create personal details entry for the new employee
    await personalDeatilsSchema.create({
      employeeId: employee._id,
    });

    // Create salary details entry for the new employee
    await salaryDetailSchema.create({
      employeeId: employee._id,
    });

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeList = async (req, res) => {
  try {
    // Fetch the list of employees from the database
    const employeeList = await Employee.find({
      deleteFlag: false,
      role: { $ne: "admin" },
    });

    res.status(200).json({ employees: employeeList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Find the employee by ID
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ data: employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Extract employee ID from request parameters
    const updateData = req.body; // Extract updated data from request body

    // Find the employee by ID and update their information
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
