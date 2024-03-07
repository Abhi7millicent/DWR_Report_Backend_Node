import express from "express";
import { uploadDWR } from "../controllers/DWRController.js";

const router = express.Router();

// Define route for uploading DWR data
router.post("/upload/:id", uploadDWR);

export default router;
