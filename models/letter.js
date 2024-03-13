import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const lettersSchema = sequelize.define(
  "Letter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_lm",
    },
    letterType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "letter_type_lm",
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "path_lm",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_lm",
    },
  },
  {
    tableName: "letters_master_lm",
  }
);

(async () => {
  try {
    await lettersSchema.sync();
    console.log("Letter model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Letter model:", error);
  }
})();

export default lettersSchema;
