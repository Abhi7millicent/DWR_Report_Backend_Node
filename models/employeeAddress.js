import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const EmployeeAddress = sequelize.define(
  "EmployeeAddress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ea",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "employee_id_ea",
    },
    addressType: {
      type: DataTypes.STRING,
      field: "address_type_ea",
    },
    addressLine1: {
      type: DataTypes.STRING,
      field: "address_line1_ea",
    },
    addressLine2: {
      type: DataTypes.STRING,
      field: "address_line2_ea",
    },
    country: {
      type: DataTypes.STRING,
      field: "country_ea",
    },
    pinCode: {
      type: DataTypes.STRING,
      field: "pin_code_ea",
    },
    city: {
      type: DataTypes.STRING,
      field: "city_ea",
    },
    state: {
      type: DataTypes.STRING,
      field: "state_ea",
    },
    contactno1: {
      type: DataTypes.STRING,
      field: "contactno1_ea",
    },
    contactno2: {
      type: DataTypes.STRING,
      field: "contactno2_ea",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_ea",
    },
  },
  {
    tableName: "employee_address_ea",
  }
);


(async () => {
  try {
    await EmployeeAddress.sync();
    console.log("EmployeeAddress model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing EmployeeAddress model:", error);
  }
})();

export default EmployeeAddress;
