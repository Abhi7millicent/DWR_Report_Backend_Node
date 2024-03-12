import { DataTypes, Model } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

class Employee extends Model {}

Employee.init(
  {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field:'id_em',
      },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field:'firstname_em',
    },
    middleName: {
      type: DataTypes.STRING,
    field:'middlename_em',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field:'lastname_em',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field:'email_em',
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      field:'date_em',
    },
    balancedLeave: {
      type: DataTypes.STRING,
      field:'balanceleave_em',
    },
    lastUpdatedMonthYear: {
      type: DataTypes.STRING,
      field:'lastupdatedmonthyear_em',
    },
    reporting: {
      type: DataTypes.STRING,
      field:'reporting_em',
    },
    role: {
      type: DataTypes.STRING,
      field:'role_em',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      field:'password_em',
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      field:'confirmpassword_em',
    },
    attendanceId: {
      type: DataTypes.STRING,
      field:'attendanceid_em',
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'deleteFlag_em',
    },
  },
  {
    sequelize,
    modelName: "Employee",
    tableName: "employee_master_em",
  }
);

Employee.sync();


export default Employee;
