import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const leaveMaster = sequelize.define(
  "LeaveMaster",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ltm", // Assuming this field name is correct for your leaveMaster schema
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name_ltm", // Adjust field name according to your database schema
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_ltm",
    },
  },
  {
    tableName: "leave_master_rm", // Adjust table name according to your database schema
  }
);

(async () => {
  try {
    await leaveMaster.sync();
    console.log("LeaveMaster model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing LeaveMaster model:", error);
  }
})();

export default leaveMaster;
