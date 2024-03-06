import { LeaveManagementSchema } from "../models/leaveManagement.js";

export const postLeaveManagement = async (req, res) => {
  try {
    const {
      employeeId,
      leaveType,
      description,
      startDate,
      endDate,
      noOfDays,
      balancedLeave,
    } = req.body;

    const leaveManagement = new LeaveManagementSchema({
      employeeId,
      leaveType,
      description,
      startDate,
      endDate,
      noOfDays,
      balancedLeave,
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
