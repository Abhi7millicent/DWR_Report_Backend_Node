import mongoose from "mongoose";

const roleMaster = new mongoose.Schema({
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

export const roleMasterSchema = mongoose.model(
    "role_master_rm",
    roleMaster
  );