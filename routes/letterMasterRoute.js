import express from "express";
import { addletterType, getletterType } from "../controllers/letterMasterController.js";

const router = express.Router();

router.post("/save",addletterType);
router.get("/list",getletterType);

export default router;