import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const dropDownMasterSchema = sequelize.define(
  "dropDown_master_dm",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_dm",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name_dm",
    },
    type:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "type_dm"
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_dm",
    },
  },
  {
    tableName: "dropDown_master_dm",
  }
);

(async () => {
  try {
    await dropDownMasterSchema.sync();
    console.log("dropDown Master model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing dropDown Master model:", error);
  }
})();

export default dropDownMasterSchema;
