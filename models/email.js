import { DataTypes } from "sequelize";
import sequelize from "../dataBase/sequelize.js";

// const emailSchema = new mongoose.Schema({
//   email: String,
//   name: String,
//   subject: String,
//   body: String,
//   sentAt: {
//     type: String,
//     default: function () {
//       return new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     },
//   },
//   date: {
//     type: String,
//     default: function () {
//       const now = new Date();
//       const year = now.getFullYear();
//       const month = (now.getMonth() + 1).toString().padStart(2, "0");
//       const day = now.getDate().toString().padStart(2, "0");
//       return `${year}-${month}-${day}`;
//     },
//   },

//   file: String,
// });

// export const Email = mongoose.model("email_log_el", emailSchema);

const Email = sequelize.define(
  "Email",
  {
    email: {
      type: DataTypes.STRING,
      field: "eamil_el",
    },
    name: {
      type: DataTypes.STRING,
      field: "name_el",
    },
    subject: {
      type: DataTypes.STRING,
      field: "subject_el",
    },
    body: {
      type: DataTypes.STRING,
      field: "body_el",
    },
    sentAt: {
      type: DataTypes.STRING,
      defaultValue: function () {
        return new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      },
      field: "sent_at_el",
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: function () {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
      field: "date_el",
    },
    file: {
      type: DataTypes.STRING,
      field: "file_el",
    },
  },
  {
    tableName: "email_log_el",
  }
);

export default Email;
