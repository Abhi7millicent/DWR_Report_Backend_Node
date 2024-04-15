import bcrypt from "bcrypt";
import Employee from "../models/employee.js";
import addresSchema from "../models/employeeAddress.js";
import personalDeatilsSchema from "../models/employeePersonalDeatils.js";
import salaryDetailsSchema from "../models/employeeSalary.js";
import { DateTime } from "luxon";
import { Sequelize } from "sequelize";
import { Op } from 'sequelize';
import { postSendWellcomeMail } from "./sendMailControll.js";
import { uploadProfileToFirebaseStorage } from "../middleware/profileUpload.js";
import { readFirebaseFile } from "../middleware/attendanceUpload.js";
import path from 'path';
export const addEmployee = async (req, res) => {
  try {
    const { emails } = req.body;
    const {
      firstName,
      middleName,
      lastName,
      email,
      date,
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
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const currentDate = new Date().toISOString().substring(0, 10); // Get the current date in yyyy-mm-dd format

    const employee = new Employee({
      firstName,
      middleName,
      lastName,
      email,
      date, // Assign current date to dateOfBirth
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
        addressType: "Current",
      });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred while creating the address:", error);
    }

    await addresSchema.create({
      employeeId: employee.id,
      addressType: "Permanent",
    });

    // Create personal details entry for the new employee
    await personalDeatilsSchema.create({
      employeeId: employee.id,
    });

    // Create salary details entry for the new employee
    await salaryDetailsSchema.create({
      employeeId: employee.id,
    });

    // await postSendWellcomeMail(emails,firstName,email,password);

    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeList = async (req, res) => {
  try {
    // Fetch the list of employees from the database
    const employeeList = await Employee.findAll({
      where: {
        deleteFlag: false,
        role: { [Sequelize.Op.not]: "admin" },// Using Sequelize operators
      },
      order: [['id', 'DESC']], // Replace 'columnName' with the column you want to order by
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
    const employee = await Employee.findByPk(employeeId);
    if (employee) {
      await employee.update({ balancedLeave: leave });
      console.log('Leave balance updated successfully.');
    } else {
      console.log('Employee not found.');
    }
  } catch (error) {
    console.error('Error updating leave balance:', error);
  }
};

export const getBalancedLeaveById = async (employeeId) => {
  try {
    console.log("employeeId:", employeeId);
    const employee = await Employee.findByPk(employeeId);
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
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      throw new Error("Employee not found1");
    }
    console.log("attendanceId:", employee.attendanceId);
    return employee.attendanceId;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getStartDateByEmployeeMaster = async (employeeId) => {
  try {
    console.log("employeeId:", employeeId);
    const id = parseInt(employeeId.employeeId);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    console.log("attendanceId:", employee.attendanceId);
    return employee.date;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAttendanceIdByEmployeeMaster = async (employeeId) => {
  try {
    console.log("employeeId:", employeeId);
    const id = parseInt(employeeId.employeeId);
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    console.log("attendanceId:", employee.attendanceId);
    return employee.attendanceId;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployeeTotalCount = async () => {
  try {
    const count = await Employee.count({ where: { deleteFlag: false, role: { [Sequelize.Op.not]: "admin" } } });
    return count;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getNameById = async (empId) => {
  const id = parseInt(empId);
  try {
    const name = await Employee.findByPk(id);
    return name.firstName + " " + name.middleName + " " + name.lastName;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getBalanceleaveCountById = async (empId) => {
  const id = empId;
  try {
    const name = await Employee.findByPk(id);
    return name.balancedLeave;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getListOfAnniversary = async (startDate, endDate) => {
  try {
    const employee = await Employee.findAll({ 
      where: { date: { [Op.between]: [startDate, endDate] }, deleteFlag: false } 
    });
    const namesWithAnniversaryDate = [];
    
    for (const data of employee) {
      // Get the current year
      const currentYear = new Date().getFullYear();

      // Get the anniversary date and set the year to the current year
      const anniversaryDate = new Date(data.date);
      anniversaryDate.setFullYear(currentYear);

      // Format the anniversary date as "YYYY-MM-DD"
      const formattedAnniversaryDate = anniversaryDate.toISOString().split('T')[0];

      // Push the name with the adjusted anniversary date to the array
      namesWithAnniversaryDate.push({ 
        name: data.firstName + " " + data.middleName + " " + data.lastName, 
        date: formattedAnniversaryDate,
        type: "Anniversary"
      });
    }
    
    return namesWithAnniversaryDate;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getListOfEmployeeName = async (req, res) =>  {
  try {
    // Fetch all employees from the database
    const employees = await Employee.findAll({
      where: {
        deleteFlag: false
        // role: { [Sequelize.Op.not]: "admin" }, // Using Sequelize operators
      },
    });

    // Extracting firstName, lastName, and id
    const employeeDetails = employees.map(employee => {
      return {
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`
      };
    });

    res.json(employeeDetails);
  } catch (error) {
    console.error("Error fetching employee details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAttendanceIdWithStartDate = async () => {
  try {
    const employeelist = await Employee.findAll({ where: { deleteFlag: false } });
    // console.log("Employee List:", employeelist); // Log employeelist

    const result = [];

    employeelist.forEach(employee => {
      if (employee.attendanceId !== null && employee.joiningDate !== null) {
        result.push({ "attendanceId": employee.attendanceId, "joiningDate": employee.date });
      }
    });

    // console.log("Result:", result); // Log result array
    return result;
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw new Error("Internal Server Error");
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No profile uploaded" });
    }

    const filePath = await uploadProfileToFirebaseStorage(file);
    const employee = await Employee.findByPk(employeeId);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update the employee's profile picture blob in the database
    await employee.update({ profile: filePath });

    return res.status(200).json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// View profile picture
export const viewProfilePic = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);
    console.log("employee:", employee.profile);
    if (!employee || !employee.profile) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    // Read profile picture from Firebase Storage
    const profilePic = await readFirebaseFile(employee.profile);

    // Determine the file extension
    const extname = path.extname(employee.profile).toLowerCase();

    // Set the appropriate content type in the response headers based on the file extension
    let contentType = 'image/jpeg'; // default to JPEG
    if (extname === '.png') {
      contentType = 'image/png';
    }

    res.setHeader('Content-Type', contentType);

    // Return the profile picture as response
    return res.status(200).send(profilePic);
  } catch (error) {
    console.error('Error viewing profile picture:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateEmployeeStatus = async (req, res) => {
  const  id  = req.params.id;
  
  try {
    const employee = await Employee.findByPk(id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.update({ status: 'Inactive' });

    return res.json({ message: 'Employee status updated successfully' });
  } catch (error) {
    console.error('Error updating employee status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};