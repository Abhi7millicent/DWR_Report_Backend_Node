import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const projectSchema = sequelize.define(
    "project_master_pm",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id_pm",
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name_pm",
          },
          clientName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "client_name_pm",
          },
          clientLocation: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "client_location_pm",
          },
          contact: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "contact_pm",
          },
          emailId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "email_pm",
          },
          tecnology: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "tecnology_pm",
          },
          employeeProjectId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "employee_project_id_pm",
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "description_pm",
          },
          startDate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "start_date_pm",
          },
          endDate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "end_date_pm",
          },
          deleteFlag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "delete_flag_pm",
          },
    },
    {
        tableName: "project_master_pm",
    }
);

(async () => {
    try {
      await projectSchema.sync();
      console.log("project model synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing project model:", error);
    }
  })();
  
  export default projectSchema;
  