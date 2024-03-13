import Email from "../models/email.js";

import nodemailer from "nodemailer";
import TransporterEmail from "../models/transporterEmail.js";

export const postSendMail = async (req, res) => {
  try {
    const { email, name, subject, body } = req.body;
    const file = req.file ? req.file.path : null;

    // Save email details to MySQL
    await Email.create({
      email,
      name,
      subject,
      body,
      file,
    });

    const transporterMail = await TransporterEmail.findOne();

    if (!transporterMail) {
      return res.status(404).json({ error: "Transporter email not found" });
    }

    const transporter = nodemailer.createTransport({
      host: transporterMail.host,
      port: transporterMail.port,
      auth: {
        user: transporterMail.authUser,
        pass: transporterMail.authPassword,
      },
    });

    // Send email using Nodemailer
    await transporter.sendMail({
      from: transporterMail.authUser,
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

export const postTransporterMail = async (req, res) => {
  const { host, port, authUser, authPassword } = req.body;
  try {
    const transporterMail = await TransporterEmail.create({
      host,
      port,
      authUser,
      authPassword,
    });

    res.status(200).json({
      data: transporterMail,
      message: "TransporterMail added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putTransporterMail = async (req, res) => {
  const { host, port, authPassword, authUser } = req.body;

  try {
    // Find the existing transporter document in the database
    let transporterMail = await TransporterEmail.findOne();

    // Update the transporter details
    if (transporterMail) {
      transporterMail.host = host;
      transporterMail.port = port;
      transporterMail.authUser = authUser;
      transporterMail.authPassword = authPassword;
    } else {
      // If no transporter document exists, create a new one
      transporterMail = await TransporterEmail.create({
        host,
        port,
        authUser,
        authPassword,
      });
    }

    // Save the updated/created transporter document
    const transporterMailSave = await transporterMail.save();
    res.status(200).json({
      message: "Transporter Mail updated successfully",
      data: transporterMailSave,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
