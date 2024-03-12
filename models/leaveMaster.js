import mongoose from "mongoose";

const leaveMaster = new mongoose.Schema({
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

export const leaveMasterSchema = mongoose.model(
    "leave_master_rm",
    leaveMaster
  );