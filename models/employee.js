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
        required: true
    },
    date: {
        type: String,
        required: true
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
   
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    deleteFlag: {
        type: Boolean,
        required: true,
        default: false
    }
});

const employee = mongoose.model('employee_master_em', employeeSchema);

export default employee;