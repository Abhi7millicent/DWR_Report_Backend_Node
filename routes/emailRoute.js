import express from "express";
import { postSendMail } from "../controllers/sendMailControll.js";

const router = express.Router();

router.post("/send-mail", postSendMail);

export default router;
