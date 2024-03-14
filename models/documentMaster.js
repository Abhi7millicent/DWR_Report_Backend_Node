import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const documentMaster = sequelize.define(
  "Document",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_drm",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name_drm",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_drm",
    },
  },
  {
    tableName: "document_master_rm",
  }
);

(async () => {
  try {
    await documentMaster.sync();
    console.log("Document model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Document model:", error);
  }
})();

export default documentMaster;
