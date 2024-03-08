import { Email } from "../models/email.js";
import { Transporter } from "../models/transporterEmail.js";
import nodemailer from "nodemailer";

export const postSendMail = async (req, res) => {
  try {
    const { email, name, subject, body } = req.body;
    const file = req.file ? req.file.path : null;

    // Save email details to MongoDB
    await Email.create({
      email,
      name,
      subject,
      body,
      file,
    });

    const transporterMaill = await Transporter.findOne();

    if (!transporterMaill) {
      return "Transporter email not found";
    }

    const transporter = nodemailer.createTransport({
      host: transporterMaill.host,
      port: transporterMaill.port,
      auth: {
        user: transporterMaill.auth.user,
        pass: transporterMaill.auth.pass,
      },
    });

    // Send email using Nodemailer
    await transporter.sendMail({
      from: "c2a43365fe24f0",
      to: email,
      subject: subject,
      text: body,
      attachments: file ? [{ path: file }] : [],
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
};

export const postTransporterMaill = async (req, res) => {
  const {
    host,
    port,
    auth: { user, pass },
  } = req.body;
  try {
    const transporterMaill = new Transporter({
      host,
      port,
      auth: { user, pass },
    });
    const transporterMaillSave = await transporterMaill.save();
    res.status(200).json({ data: transporterMaillSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putTransporterMaill = async (req, res) => {
  const {
    host,
    port,
    auth: { user, pass },
  } = req.body;

  try {
    // Find the existing transporter document in the database
    let transporterMaill = await Transporter.findOne();

    // Update the transporter details
    if (transporterMaill) {
      transporterMaill.host = host;
      transporterMaill.port = port;
      transporterMaill.auth.user = user;
      transporterMaill.auth.pass = pass;
    } else {
      // If no transporter document exists, create a new one
      transporterMaill = new Transporter({
        host,
        port,
        auth: { user, pass },
      });
    }

    // Save the updated/created transporter document
    const transporterMaillSave = await transporterMaill.save();
    res.status(200).json({ data: transporterMaillSave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
