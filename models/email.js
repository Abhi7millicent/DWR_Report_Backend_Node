import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  sentAt: { type: Date, default: Date.now },
});

export const Email = mongoose.model("email_el", emailSchema);
