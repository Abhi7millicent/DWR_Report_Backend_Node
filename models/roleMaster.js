import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const roleMasterSchema = sequelize.define(
  "role_master_rm",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_rm",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name_rm",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_rm",
    },
  },
  {
    tableName: "role_master_rm",
  }
);

(async () => {
  try {
    await roleMasterSchema.sync();
    console.log("Role Master model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Role Master model:", error);
  }
})();

export default roleMasterSchema;
