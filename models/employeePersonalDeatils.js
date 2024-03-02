import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  emergencyContact1: {
    type: String,
  },
  emergencyContact2: {
    type: String,
  },
  relation1: {
    type: String,
  },
  relation2: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  deleteFlag: {
    type: Boolean,
    required: true,
    default: false
}
});

export const personalDeatilsSchema = mongoose.model(
  "employee_personal_details_epd",
  personalSchema
);
