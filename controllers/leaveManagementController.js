import employee from "../models/employee.js";
import  LeaveManagementSchema  from "../models/leaveManagement.js";
import { updateBalancedLeave, getBalancedLeaveById } from "./employeeController.js";

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

    const leaveManagement = new LeaveManagementSchema({
      leaveType,
      description,
      startDate,
      endDate,
      noOfDays,
      balancedLeave,
      employeeId,
    });

   
    if (leaveManagement.leaveType !== "Unpaid Leave") {
      // console.log("empid1:",leaveManagementSave.employeeId)
      const previousBalancedLeave = await getBalancedLeaveById(leaveManagementSave.employeeId);
      if (previousBalancedLeave >= leaveManagementSave.noOfDays) {
          const leave = (parseInt(previousBalancedLeave) - parseInt(leaveManagementSave.noOfDays)).toString();
          await updateBalancedLeave(leaveManagementSave.employeeId, leave);
      } else {
          res.status(400).json({ message: "Sorry you do not have sufficient amount of leave." });
      }
  };
  
  const leaveManagementSave = await leaveManagement.save();
  

   
    res.status(200).json({ data: leaveManagementSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getLeaveManagement = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const leaveManagement = await LeaveManagementSchema.findAll({
      where: {
        employeeId,
        deleteFlag: false,
      },
    });
    res.status(200).json({ data: leaveManagement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postApproveLeave = async (req, res) => {
  const id = req.params.id;

  try {
    const leaveRequest = await LeaveManagementSchema.findByPk(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leaveRequest.status === "Rejected") { 
      const leave = (parseInt(leaveRequest.balancedLeave) - parseInt(leaveRequest.noOfDays)).toString();
      await updateBalancedLeave(leaveRequest.employeeId, leave);
    }

    leaveRequest.status = "Approved";
    await leaveRequest.save();

    return res.status(200).json({
      message: "Leave request approved successfully",
      data: leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postRejectLeave = async (req, res) => {
  const id = req.params.id;

  try {
    const leaveRequest = await LeaveManagementSchema.findByPk(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    if (leaveRequest.status !== "Rejected") { 
      const leave = (parseInt(leaveRequest.balancedLeave) + parseInt(leaveRequest.noOfDays)).toString();
      await updateBalancedLeave(leaveRequest.employeeId, leave);
    }

    leaveRequest.status = "Rejected";
    await leaveRequest.save();

    return res.status(200).json({
      message: "Leave request rejected successfully",
      data: leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRequestedLeave = async (req, res) => {
  try {
    const requestedLeave = await LeaveManagementSchema.findAll({
      include: [{
        model: employee,
        as: 'employee',
        attributes: ['firstName', 'lastName'],
      }],
    });

    res.status(200).json({ data: requestedLeave });
  } catch (error) {
    console.error("Error fetching requested leave:", error);
    res.status(500).json({ message: error.message });
  }
};