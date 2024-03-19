import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const taskSchema = sequelize.define(
    "task_master_tm",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id_tm",
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name_tm",
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "description_tm",
          },
          startDate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "start_date_tm",
          },
          endDate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "end_date_tm",
          },
          projectId: {
            type: DataTypes.STRING,
            field: "project_id_tm",
          },
          deleteFlag: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: "delete_flag_tm",
          },
    },
    {
        tableName: "task_master_tm",
    }
);

(async () => {
    try {
      await projectSchema.sync();
      console.log("task model synchronized successfully.");
    } catch (error) {
      console.error("Error synchronizing task model:", error);
    }
  })();
  
  export default taskSchema;
  