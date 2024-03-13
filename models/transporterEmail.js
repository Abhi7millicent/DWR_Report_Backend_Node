import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const TransporterEmail = sequelize.define(
  "TransporterEmail",
  {
    host: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "host_te",
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "port_te",
    },

    authUser: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "auth_user_te", // Assuming you want to rename the field to match the SQL convention
    },
    authPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "auth_password_te", // Assuming you want to rename the field to match the SQL convention
    },
  },
  {
    tableName: "transporter_email_te", // Adjust table name as per your database schema
    timestamps: false, // If you don't want Sequelize to automatically manage createdAt and updatedAt fields
  }
);

(async () => {
  try {
    await sequelize.sync(); // Synchronize the model with the database
    console.log("Email transporter model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing email transporter model:", error);
  }
})();

export default TransporterEmail;
