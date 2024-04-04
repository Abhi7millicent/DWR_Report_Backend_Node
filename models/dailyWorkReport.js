import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const dailyWorkReportSchema = sequelize.define(
  "DWR",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_ds",
      },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "employee_id_ds",
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "date_ds",
    },
    fromTime: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "from_time_ds",
    },
    toTime: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "to_time_ds",
    },
    taskId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "task_id_ds",
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "project_name_ds",
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "task_description_ds",
    },
    reportedBy: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "reported_by_ds",
    },
    ticketType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "ticket_type_ds",
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "status_ds",
    },
    estimatedDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "estimated_date_ds",
    },
    solution: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "solution_ds",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_ds",
    },
  },
  {
    tableName: "dwr_ds",
  }
);

(async () => {
  try {
    await dailyWorkReportSchema.sync();
    console.log("DWR model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing DWR model:", error);
  }
})();

export default dailyWorkReportSchema;
