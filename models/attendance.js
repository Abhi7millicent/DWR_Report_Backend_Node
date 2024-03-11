import mongoose from "mongoose";

const attendance = new mongoose.Schema({
      attendanceId:{
        type: String,
        required: true,
      },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    statusflag: {
        type: String,
    },
    dwrFlag: {
        type: Boolean,
        required: true,
        default: false
    },
    deleteFlag: {
        type: Boolean,
        required: true,
        default: false
    }
});

const attendanceSchema = mongoose.model(
    "attendance_a",
    attendance
  );
export default attendanceSchema;