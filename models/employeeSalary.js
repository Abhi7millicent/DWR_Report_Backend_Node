import mongoose from "mongoose";

const salaryDetailsSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    bankAccountName: {
        type: String,
    },
    ifscCode: {
        type: String,
    },
    accountNo: {
        type: String,
    },
    uanNo: {
        type: String,
    },
    epfoNo: {
        type: String,
    },
    panNo: {
        type: String,
    },
    annualSalary: {
        type: String,
    },
    monthlySalary: {
        type: String,
    },
    deleteFlag: {
      type: Boolean,
      required: true,
      default: false
  }
});

export const salaryDetailSchema = mongoose.model(
    "employee_salary_details",
    salaryDetailsSchema
);
