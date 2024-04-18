import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const personalDeatilsSchema = sequelize.define(
  "EmployeePersonalDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_epd",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "employee_id_epd",
    },
    bloodGroup: {
      type: DataTypes.STRING,
      field: "blood_group_epd",
    },
    panNo: {
      type: DataTypes.STRING,
      field: "pan_no_epd",
    },
    aadhaarNo: {
      type: DataTypes.STRING,
      field: "addhar_no_epd",
    },
    emergencyContact1: {
      type: DataTypes.STRING,
      field: "emergency_contact1_epd",
    },
    emergencyContact2: {
      type: DataTypes.STRING,
      field: "emergency_contact2_epd",
    },
    relation1: {
      type: DataTypes.STRING,
      field: "relation1_epd",
    },
    relation2: {
      type: DataTypes.STRING,
      field: "relation2_epd",
    },
    dateOfBirth: {
      type: DataTypes.STRING,
      field: "date_of_birth_epd",
    },
    personalEmail: {
      type: DataTypes.STRING,
      field: "personal_email_epd",
    },
    gender: {
      type: DataTypes.STRING,
      field: "gender_epd",
    },
    maritalStatus: {
      type: DataTypes.STRING,
      field: "marital_status_epd",
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: "phone_number_epd",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_epd",
    },
  },
  {
    tableName: "employee_personal_details_epd",
  }
);

(async () => {
  try {
    await personalDeatilsSchema.sync();
    console.log("EmployeePersonalDetails model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing EmployeePersonalDetails model:", error);
  }
})();

export default personalDeatilsSchema;
