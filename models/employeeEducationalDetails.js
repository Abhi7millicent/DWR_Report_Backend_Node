import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const EmployeeEducationDetails = sequelize.define(
  "EmployeeEducationDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_eed",
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "degree_eed",
    },
    institute: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "institute_eed",
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "startDate_eed",
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "endDate_eed",
    },
    percentage: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "percentage_eed",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "deleteFlag_eed",
    },
  },
  {
    tableName: "employee_educational_details_eed",
  }
);
(async () => {
  try {
    await sequelize.sync(); // Synchronize the model with the database
    console.log("Employee  Education Details model synchronized successfully.");
  } catch (error) {
    console.error(
      "Error synchronizing Employee Education Details model:",
      error
    );
  }
})();
export default EmployeeEducationDetails;
