import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const salarySlipSchema = sequelize.define(
  "salarySlip",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ssm",
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "employee_id_ssm",
      },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "date_ssm",
    },
    basicSalary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "basic_salary_ssm",
    },
    leave: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "leave_ssm",
    },
    hra: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "hra_ssm",
    },
    conveyance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "conveyance_ssm",
    },
    loan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "loan_ssm",
    },
    professionTax: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "profession_tax_ssm",
    },
    tdsIt: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "tds_it_ssm",
    },
    dailyWages: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "daily_wages_ssm",
    },
    totalAddition: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "total_addition_ssm",
    },
    totalDeduction: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "total_deduction_ssm",
    },
    netSalary: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "net_salary_ssm",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_lm",
    },
  },
  {
    tableName: "salary_slip_master_ssm",
  }
);

(async () => {
  try {
    await salarySlipSchema.sync();
    console.log("Salary slip model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Salary slip model:", error);
  }
})();

export default salarySlipSchema;
