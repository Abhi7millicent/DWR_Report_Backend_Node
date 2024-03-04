import mongoose from "mongoose";

const employeeAddresSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  addressType: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  contactno1: {
    type: String,
    required: true,
  },
  contactno2: {
    type: String,
    required: true,
  },
  deleteFlag: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const addresSchema = mongoose.model(
  "employee_address_ea",
  employeeAddresSchema
);
export default addresSchema;
