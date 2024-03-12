import mongoose from "mongoose";

const documentMaster = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    deleteFlag: {
        type: Boolean,
        require: true,
        default: false,
    }
})

export const documentMasterSchema = mongoose.model(
    "document_master_rm",
    documentMaster
  );