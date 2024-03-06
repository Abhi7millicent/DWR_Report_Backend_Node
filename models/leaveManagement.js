import mongoose from "mongoose";

const leaveManagementSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  noOfDays: {
    type: String,
    required: true,
  },
  balancedLeave: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  deleteFlag: {
    type: Boolean,
    require: true,
    default: false,
  },
});

export const LeaveManagementSchema = mongoose.model(
  "leave_management_lm",
  leaveManagementSchema
);
