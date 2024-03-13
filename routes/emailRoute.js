import express from "express";
import {
  postSendMail,
  postTransporterMail,
  putTransporterMail,
} from "../controllers/sendMailControll.js";

import { upload } from "../middleware/emailUplaod.js";

const router = express.Router();

router.post("/send-mail", upload.single("file"), postSendMail);
router.post("/transporter-mail/add", postTransporterMail);
router.put("/transporter-mail/update", putTransporterMail);
// router.get("/transporter-mail/list", getTransporterMaill);

export default router;
