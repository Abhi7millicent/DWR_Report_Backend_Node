import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const welcomeSchema = sequelize.define(
    "welcome",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id_wm",
          },
          employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "employee_id_wm",
          },
          personalDetails: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "personal_details_wm",
          },
          educationDetails: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "education_details_wm",
          },
          bankDetails: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "details_details_wm",
          },
    },
    {
      tableName: "welcome_master_wm", // Adjust table name as per your database schema
      timestamps: false, // If you don't want Sequelize to automatically manage createdAt and updatedAt fields
    }
  );
  
  (async () => {
    try {
      await sequelize.sync(); // Synchronize the model with the database
      console.log("welcome model synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing welcome model:", error);
    }
  })();
  
  export default welcomeSchema;