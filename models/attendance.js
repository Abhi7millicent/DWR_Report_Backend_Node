import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const AttendanceSchema = sequelize.define(
  "attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id_am",
    },
    attendanceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "attendance_id",
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "date",
    },
    startTime: {
      type: DataTypes.STRING,
      field: "start_time",
    },
    endTime: {
      type: DataTypes.STRING,
      field: "end_time",
    },
    statusflag: {
      type: DataTypes.STRING,
      field: "status_flag",
    },
    dwrFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "dwr_flag",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag",
    },
  },
  {
    tableName: "attendance_master_am",
  }
);

(async () => {
  try {
    await AttendanceSchema.sync();
    console.log("Attendance model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Attendance model:", error);
  }
})();

export default AttendanceSchema;
