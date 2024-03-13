
import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const LeaveManagementSchema = sequelize.define(
  "LeaveManagement",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_lm",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "employee_id_lm",
    },
    leaveType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "leave_type_lm",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "description_lm",
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "start_date_lm",
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "end_date_lm",
    },
    noOfDays: {
      type: DataTypes.STRING,
      field: "no_of_days_lm",
    },
    balancedLeave: {
      type: DataTypes.STRING,
      field: "balanced_leave_lm",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
      field: "status_lm",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_lm",
    },
  },
  {
    tableName: "leave_management_lm",
  }
);

(async () => {
  try {
    await LeaveManagementSchema.sync();
    console.log("LeaveManagement model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing LeaveManagement model:", error);
  }
})();

export default LeaveManagementSchema;

