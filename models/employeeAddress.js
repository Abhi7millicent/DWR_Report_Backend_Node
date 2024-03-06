import mongoose from "mongoose";

const employeeAddresSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  addressType: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  country: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  contactno1: {
    type: String,
  },
  contactno2: {
    type: String,
  },
  deleteFlag: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const addresSchema = mongoose.model(
  "employee_address_ea",
  employeeAddresSchema
);
export default addresSchema;
