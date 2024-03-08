import multer from "multer";
import nodemailer from "nodemailer";
import { Transporter } from "../models/transporterEmail.js";

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:\\DWR_Report_Backend_Node\\uploads\\email");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: storage });

// Saving transporter configuration
// const transporterConfig = new Transporter({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "c2a43365fe24f0",
//     pass: "22e02a1b3ee257",
//   },
// });
// await transporterConfig.save();
// const config = await Transporter.findOne({}).exec();
// Nodemailer transporter
