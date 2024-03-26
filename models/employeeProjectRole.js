import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const employeeProjectRoleSchema = sequelize.define(
    "employee_project_role_epr",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id_epr",
          },
          employeeId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "employeeId_epr",
          },
          roleId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "roleId_epr",
          },
          projectId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "projectId_epr",
          },
          
          deleteFlag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "delete_flag_epr",
          },
    },
    {
        tableName: "employee_project_role_epr",
    }
);

(async () => {
    try {
      await employeeProjectRoleSchema.sync();
      console.log("employeeProjectRoleSchema synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing employeeProjectRoleSchema:", error);
    }
  })();
  
  export default employeeProjectRoleSchema;
  