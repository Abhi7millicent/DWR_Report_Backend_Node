import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    balancedLeave: {
        type: String
    },
    lastUpdatedMonthYear: {
        type: String
    },
    reporting: {
        type: String
    },
    role: {
        type: String
    },
    loginId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    deleteFlag: {
        type: Boolean,
        required: true,
        default: false
    }
});

const employee = mongoose.model('employee_master_em', employeeSchema);

export default employee;