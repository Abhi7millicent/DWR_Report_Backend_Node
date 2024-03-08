import mongoose from "mongoose";

const transporterSchema = new mongoose.Schema({
  host: {
    type: String,
    required: true,
  },
  port: {
    type: Number,
    required: true,
  },
  auth: {
    user: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
  },
});

// Create the model
export const Transporter = mongoose.model("Transporter_tr", transporterSchema);
