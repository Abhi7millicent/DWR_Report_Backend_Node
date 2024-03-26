import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const technologyMasterSchema = sequelize.define(
  "technology_master_tm",
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
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_tm",
    },
  },
  {
    tableName: "technology_master_tm",
  }
);

(async () => {
  try {
    await technologyMasterSchema.sync();
    console.log("technology Master model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing technology Master model:", error);
  }
})();

export default technologyMasterSchema;
