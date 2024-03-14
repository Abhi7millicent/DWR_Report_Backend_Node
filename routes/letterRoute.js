import express from "express";
import letterUpload from '../middleware/letterUpload.js';
import { saveLetter, updateLetter } from '../controllers/letterController.js'; // Correct import statement for the saveLetter function

const router = express.Router();

router.post("/upload", letterUpload.single('file'), saveLetter); // Using the letterUpload middleware for handling file uploads
router.post("/:type", updateLetter);

export default router;

// {
//     "{DATE}": "2024-03-05",
//     "{REFERENCENO}": "843788943",
//     "{NAME}": "Abhi",
//     "{ADDRESS1}": "test1",
//     "{ADDRESS2}": "test2",
//     "{POSITION}": "Software Devloper",
//     "{ANNUALY}" : "1200000",
//     "{MONTHLY}": "100000"
// }