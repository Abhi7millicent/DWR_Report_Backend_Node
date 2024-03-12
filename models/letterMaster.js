import mongoose from "mongoose";

const letterMaster = new mongoose.Schema({
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

export const letterMasterSchema = mongoose.model(
    "letter_master_rm",
    letterMaster
  );