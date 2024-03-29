import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_em",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "firstname_em",
    },
    middleName: {
      type: DataTypes.STRING,
      field: "middlename_em",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "lastname_em",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
      field: "email_em",
    },
    date: {
      type: DataTypes.STRING, // Assuming it's a date field
      field: "date_em",
    },
    balancedLeave: {
      type: DataTypes.STRING, // Assuming it's a numeric field
      field: "balanceleave_em",
    },
    lastUpdatedMonthYear: {
      type: DataTypes.STRING,
      field: "lastupdatedmonthyear_em",
    },
    reporting: {
      type: DataTypes.JSON,
      field: "reporting_em",
    },
    role: {
      type: DataTypes.STRING,
      field: "role_em",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "password_em",
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL, // This field is not stored in the database
      allowNull: false,
    },
    attendanceId: {
      type: DataTypes.STRING,
      field: "attendanceid_em",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "deleteFlag_em",
    },
  },
  {
    tableName: "employee_master_em",
  }
);

(async () => {
  try {
    await sequelize.sync(); // Synchronize the model with the database
    console.log("Employee model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Employee model:", error);
  }
})();

export default Employee;
