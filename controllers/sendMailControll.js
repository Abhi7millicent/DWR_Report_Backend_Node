import Email from "../models/email.js";

import nodemailer from "nodemailer";
import TransporterEmail from "../models/transporterEmail.js";
import { uploadEmailFilesToFirebaseStorage } from "../middleware/emailUplaod.js";

export const postSendOfferLetterMail = async (req, res) => {
  try {
    const { email, name, subject, body, pdf } = req.body;

    const pdfBuffer = Buffer.from(pdf, 'base64'); // Convert base64 PDF string to Buffer

    // Save email details to MySQL
    await Email.create({
      email,
      name,
      subject,
      body,
      pdf: pdfBuffer, // Save the PDF as Buffer in the database
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
      from: transporterMail.userId,
      to: email,
      subject: subject,
      text: body,
      attachments: [{
        filename: 'offerLetter.pdf',
        content: pdfBuffer, // Attach the PDF Buffer
      }],
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "An error occurred while sending the email" });
  }
}

export const postSendMail = async (req, res) => {
  try {
    const { email, name, subject, body } = req.body;
    const file1 = req.file;

    if (!file1) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await uploadEmailFilesToFirebaseStorage(file1);

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
      from: transporterMail.userId,
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

export const postSendWellcomeMail = async (emails,firstName,email1,password) => {
  try{
    const emailPromises = emails.map(async (email) => {
      // Create email object
      const emailObj = {
        to: email,
        subject: "Welcome to Millicent Technologies",
        text: `Dear ${firstName},\n\nWelcome to Millicent Technologies
        \n\nYour login credentials are:\n\n
        Username: ${email1}\n
        Password: ${password}\n\n
        use the below link to login and complete your profile Details\n
        Link: https://dwr-report.vercel.app/\n\n
        Thank you for joining us!\n\n
        Best regards,\n
        Millicent Technologies`,
      };

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
      // Send email
      await transporter.sendMail(emailObj);

      // Save sent email details to database
      await Email.create({
        email: email,
        subject: emailObj.subject,
        body: emailObj.text,
      });
    });

    // Wait for all emails to be sent and database entries to be created
    await Promise.all(emailPromises);

    return { success: true };
  } catch (error) {
    console.error("Error sending emails:", error);
    return { success: false, error: "Internal server error" };
  }
};