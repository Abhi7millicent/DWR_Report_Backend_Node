import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const salaryDetailsSchema = sequelize.define(
  "EmployeeSalaryDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_esd",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "employee_id_esd",
    },
    bankAccountName: {
      type: DataTypes.STRING,
      field: "bank_account_name_esd",
    },
    ifscCode: {
      type: DataTypes.STRING,
      field: "ifsc_code_esd",
    },
    accountNo: {
      type: DataTypes.STRING,
      field: "account_no_esd",
    },
    uanNo: {
      type: DataTypes.STRING,
      field: "uan_no_esd",
    },
    epfoNo: {
      type: DataTypes.STRING,
      field: "epfo_no_esd",
    },
    annualSalary: {
      type: DataTypes.STRING,
      field: "annual_salary_esd",
    },
    monthlySalary: {
      type: DataTypes.STRING,
      field: "monthly_salary_esd",
    },
    document: {
      type: DataTypes.STRING,
      field: "document_esd",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_esd",
    },
  },
  {
    tableName: "employee_salary_details_esd",
  }
);

(async () => {
  try {
    await salaryDetailsSchema.sync();
    console.log("EmployeeSalaryDetails model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing EmployeeSalaryDetails model:", error);
  }
})();

export default salaryDetailsSchema;
