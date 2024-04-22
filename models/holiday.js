import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const holidayMasterSchema = sequelize.define(
  "holiday_master_hm",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_hm",
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "name_hm",
    },
    day:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "day_hm"
    },
    holiday:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "holiday_hm"
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_hm",
    },
  },
  {
    tableName: "holiday_master_hm",
  }
);

(async () => {
  try {
    await holidayMasterSchema.sync();
    console.log("Holiday Master model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Holiday Master model:", error);
  }
})();

export default holidayMasterSchema;
