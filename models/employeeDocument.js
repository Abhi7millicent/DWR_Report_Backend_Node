import mongoose from "mongoose";

const employeeDocumentSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  documentType: {
    type: String,
  },
  uploadFilePath: {
    type: String,
  },
  description: {
    type: String,
  },
  deleteFlag: {
    type: Boolean,
    require: true,
    default: false,
  },
});

export const DocumentSchema = mongoose.model(
  "employee_document_rd",
  employeeDocumentSchema
);
