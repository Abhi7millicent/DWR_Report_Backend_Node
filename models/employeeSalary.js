import mongoose from "mongoose";

const salaryDetails = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },

  bankAccountName: {
    type: String,
    required: true,
  },
  ifscCode: {
    type: String,
    required: true,
  },
  accountNo: {
    type: String,
    required: true,
  },
  uanNo: {
    type: String,
    required: true,
  },
  epfoNo: {
    type: String,
    required: true,
  },
  panNo: {
    type: String,
    required: true,
  },
  annualSalary: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: String,
    required: true,
  },
});
export const salaryDetailSchema = mongoose.model(
  "employee_Salary_Details",
  salaryDetails
);
