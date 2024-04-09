import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const dailyWorkReportDateAdjustSchema = sequelize.define(
  "dwr_date_adjust_dda",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_dda",
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "employee_id_dda",
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "date_dda",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
      field: "status_dda",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_dda",
    },
  },
  {
    tableName: "dwr_date_adjust_dda",
  }
);

(async () => {
  try {
    await dailyWorkReportDateAdjustSchema.sync();
    console.log("Role Master model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Role Master model:", error);
  }
})();

export default dailyWorkReportDateAdjustSchema;
