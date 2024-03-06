import express from "express";
import letterUpload from '../middleware/letterUpload.js';
import { saveLetter, updateLetter } from '../controllers/letterController.js'; // Correct import statement for the saveLetter function

const router = express.Router();

router.post("/upload", letterUpload.single('file'), saveLetter); // Using the letterUpload middleware for handling file uploads
router.post("/:type", updateLetter);

export default router;
