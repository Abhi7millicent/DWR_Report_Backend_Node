import mongoose from "mongoose";

const letterSchema = new mongoose.Schema({
    letterType: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    deleteFlag: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const lettersSchema = mongoose.model(
    "letter_l", letterSchema
);