import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

const offerLetterTemplateSchema = sequelize.define(
  "offerLetter",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_olts",
    },
    paragraph1: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "paragraph1_olts",
    },
    paragraph2: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "paragraph2_olts",
    },
    paragraph3: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "paragraph3_olts",
      },
      paragraph4: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "paragraph4_olts",
      },
      paragraph5: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "paragraph5_olts",
      },
    deleteFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "delete_flag_olts",
    },
  },
  {
    tableName: "offer_letter_template_schema_olts",
  }
);

(async () => {
  try {
    await offerLetterTemplateSchema.sync();
    console.log("offerLetterTemplate model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing offerLetterTemplate model:", error);
  }
})();

export default offerLetterTemplateSchema;
