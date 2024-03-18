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
      console.log("Role Master model synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing Role Master model:", error);
    }
  })();
  
  export default projectSchema;
  