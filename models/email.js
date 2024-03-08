import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  email: String,
  name: String,
  subject: String,
  body: String,
  sentAt: {
    type: String,
    default: function () {
      return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  date: {
    type: String,
    default: function () {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },

  file: String,
});

export const Email = mongoose.model("email_log_el", emailSchema);
