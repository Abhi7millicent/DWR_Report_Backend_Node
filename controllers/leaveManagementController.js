import employee from "../models/employee.js";
import { LeaveManagementSchema } from "../models/leaveManagement.js";

export const postLeaveManagement = async (req, res) => {
  try {
    const {
      leaveType,
      description,
      startDate,
      endDate,
      noOfDays,
      balancedLeave,
      employeeId,
    } = req.body;
    // const employeeId = req.params.id;
    console.log(employeeId, "emplyeeId");
    const leaveManagement = new LeaveManagementSchema({
      leaveType,
      description,
      startDate,
      endDate,
      noOfDays,
      balancedLeave,
      employeeId,
    });

    const leaveManagementSave = await leaveManagement.save();
    res.status(200).json({ data: leaveManagementSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLeaveManagement = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const leaveManagement = await LeaveManagementSchema.find({
      employeeId,
      deleteFlag: false,
    });
    res.status(200).json({ data: leaveManagement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postApproveLeave = async (req, res) => {
  const id = req.params.id;

  try {
    const leaveRequest = await LeaveManagementSchema.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    // Assuming each leave request has an associated employee ID
    const employeeId = leaveRequest.employeeId;
    const employee = await employee.findById(employeeId);

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Check if the employee has enough leave balance
    if (employee.leaveBalance < leaveRequest.numberOfLeave) {
      return res.status(400).json({ message: "Insufficient leave balance" });
    }

    // Deduct leave balance and update status
    employee.leaveBalance -= leaveRequest.numberOfLeave;
    leaveRequest.status = "Approve";

    // Save changes
    await employee.save();
    await leaveRequest.save();

    return res.status(200).json({
      message: "Leave request approved successfully",
      data: leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const postRejectLeave = async (req, res) => {
  const id = req.params.id;

  try {
    const leaveRequest = await LeaveManagementSchema.findById(id);
    if (!leaveRequest) {
      res.status(404).json({ message: "Leave request not found" });
    }
    leaveRequest.status = "Rejected";
    await leaveRequest.save();

    return res.status(200).json({
      message: "Leave request rejected successfully",
      data: leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
