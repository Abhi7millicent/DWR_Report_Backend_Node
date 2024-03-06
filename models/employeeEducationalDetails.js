import mongoose from "mongoose";

const employeeEducationalSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    institute: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    percentage: {
        type: String,
        required: true,
    },
    deleteFlag: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const EducationalSchema = mongoose.model(
    "employee_educational_schema_ees", employeeEducationalSchema
);