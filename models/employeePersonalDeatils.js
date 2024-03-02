import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  emergencyContact1: {
    type: String,
    required: true,
  },
  emergencyContact2: {
    type: String,
    required: true,
  },
  relation1: {
    type: String,
    required: true,
  },
  relation2: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
});

export const personalDeatilsSchema = mongoose.Model(
  "employee_PersonalDetails",
  personalSchema
);
