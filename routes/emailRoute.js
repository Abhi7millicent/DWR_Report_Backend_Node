import express from "express";
import {
  postSendMail,
  postTransporterMaill,
  putTransporterMaill,
} from "../controllers/sendMailControll.js";

import { upload } from "../middleware/emailUplaod.js";

const router = express.Router();

router.post("/send-mail", upload.single("file"), postSendMail);
router.post("/transporter-mail/add", postTransporterMaill);
router.put("/transporter-mail/update", putTransporterMaill);
// router.get("/transporter-mail/list", getTransporterMaill);

export default router;
