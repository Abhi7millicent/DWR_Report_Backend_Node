import mongoose from "mongoose";

const DWR = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
      },
    date: {
        type: String,
        required: true,
    },
    fromTime: {
        type: String,
        required: true,
    },
    toTime: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true,
    },
    reportedBy: {
        type: String,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    estimatedDate: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    }
});

const dwrSchema = mongoose.model(
    "dwr_ds",
    DWR
  );
export default dwrSchema;