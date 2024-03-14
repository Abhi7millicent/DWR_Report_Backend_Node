import express from "express";
import { addDocumentType, getDocumentType } from "../controllers/documentMasterController.js";

const router = express.Router();

router.post("/save",addDocumentType);
router.get("/list",getDocumentType);

export default router;