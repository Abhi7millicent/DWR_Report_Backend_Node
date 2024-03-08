import { Email } from "../models/email.js";

export const postSendMail = async (req, res) => {
  const { to, subject, body } = req.body;
  const email = new Email({
    to,
    subject,
    body,
  });

  try {
    await email.save();
    res.statu(200).json({ data: email });
  } catch (error) {
    console.log("Error saving email to MongoDB:", error);
    res.send("Error while saving email");
    return;
  }
};
