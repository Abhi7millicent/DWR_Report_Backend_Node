import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const DocumentSchema = sequelize.define(
  "DocumentSchema",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_ed",
    },
    employeeId: {
      type: DataTypes.INTEGER,
      field: "employee_id_ed",
    },
    documentType: {
      type: DataTypes.STRING,
      field: "document_type_ed",
    },
    uploadFilePath: {
      type: DataTypes.STRING,
      field: "upload_file_path_ed",
    },
    description: {
      type: DataTypes.STRING,
      field: "description_ed",
    },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_ed",
    },
  },
  {
    tableName: "employee_document_ed",
  }
);
(async () => {
  try {
    await sequelize.sync(); // Synchronize the model with the database
    console.log("Employee document  model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing Employee model:", error);
  }
})();
export default DocumentSchema;
