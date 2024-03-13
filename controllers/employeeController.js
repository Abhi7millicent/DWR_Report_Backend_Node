import bcrypt from "bcrypt";
import Employee from "../models/employee.js";
import addresSchema from "../models/employeeAddress.js";
import personalDeatilsSchema from "../models/employeePersonalDeatils.js";
import  salaryDetailsSchema  from "../models/employeeSalary.js";
import { DateTime } from "luxon";
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
    const existingEmployee = await Employee.findOne({ email } );
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
        employeeId: employee.id,
        addressType: "Permanent",
      });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred while creating the address:", error);
    }

    await addresSchema.create({
      employeeId: employee.id,
      addressType: "Temporary",
    });

    // Create personal details entry for the new employee
    await personalDeatilsSchema.create({
      employeeId: employee.id,
    });

    // Create salary details entry for the new employee
    await salaryDetailsSchema.create({
      employeeId: employee.id,
    });

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeList = async (req, res) => {
  try {
    // Fetch the list of employees from the database
    const employeeList = await Employee.findAll({
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
    const employee = await Employee.findByPk(employeeId);

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
    const updatedEmployee = await Employee.findByPk(employeeId);

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    // Update the employee's information
    updatedEmployee.set(updateData);
    await updatedEmployee.save();
    res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postAddBalancedLeave = async (req, res) => {
  try {
    const currentDate = DateTime.now(); // Get current date-time using Luxon

    const currentMonth = currentDate.toFormat("MM-yyyy"); // Format current date-time to MM-yyyy

    // Check if leave already added for the current month
    const leaveAlreadyAdded = await Employee.findOne({
      where: {
        lastUpdatedMonthYear: currentMonth,
      },
    });

    if (leaveAlreadyAdded) {
      return res
        .status(400)
        .json({ message: "Leave already added for the current month." });
    } else {
      // Fetch all employees
      const employees = await Employee.findAll();

      // Update balancedLeave for all employees and set lastUpdatedMonthYear
      for (const employee of employees) {
        let balancedLeave = employee.balancedLeave
          ? parseInt(employee.balancedLeave)
          : 0;

        const newBalancedLeave = balancedLeave + 2;

        //   // Update balancedLeave and lastUpdatedMonthYear
        //   await Employee.findByIdAndUpdate(employee._id, {
        //     balancedLeave: newBalancedLeave.toString(),
        //     lastUpdatedMonthYear: currentMonth,
        //   });
        // }
        // Update balancedLeave and lastUpdatedMonthYear
        await employee.update({
          balancedLeave: newBalancedLeave.toString(),
          lastUpdatedMonthYear: currentMonth,
        });
      }

      return res
        .status(200)
        .json({ message: "Leave updated successfully for all entities." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing leave updates." });
  }
};

export const getBalancedLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const employee = await Employee.findByPk(id); // Find employee by ID

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const balancedLeave = employee.balancedLeave; // Get balancedLeave from the employee object

    res.status(200).json({ data: balancedLeave });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBalancedLeave = async (employeeId, leave) => {
  try {
    await Employee.findByIdAndUpdate(
      employeeId,
      { balancedLeave: leave },
      { new: true }
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBalancedLeaveById = async (employeeId) => {
  try {
    console.log("employeeId:", employeeId);
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found1");
    }
    console.log("blancedleave:", employee.balancedLeave);
    return employee.balancedLeave;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAttendanceIdById = async (employeeId) => {
  try {
    console.log("employeeId:", employeeId);
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new Error("Employee not found1");
    }
    console.log("attendanceId:", employee.attendanceId);
    return employee.attendanceId;
  } catch (error) {
    throw new Error(error.message);
  }
};
