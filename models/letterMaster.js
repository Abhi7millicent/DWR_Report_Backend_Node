import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const letterMaster = sequelize.define(
  "Letter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ltm",
    },
    letterType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "letter_type_ltm",
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "path_ltm",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_ltm",
    },
  },
  {
    tableName: "letters_type_master_ltm",
  }
);

(async () => {
  try {
    await letterMaster.sync();
    console.log("Letter model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Letter model:", error);
  }
})();

export default letterMaster;
