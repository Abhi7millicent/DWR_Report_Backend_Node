import fs from "fs";
import { promisify } from "util";
import  lettersSchema  from "../models/letter.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { uploadLetterToFirebaseStorage } from "../middleware/letterUpload.js";
import { readFirebaseFile } from "../middleware/attendanceUpload.js";

// Function to replace placeholders in a Word document
async function replacePlaceholders(path, replacements, res) {
    try {
        const fileContent = await readFirebaseFile(path);
        // const content = await promisify(fs.readFile)(fileContent);
        const zip = new PizZip(fileContent);
        const doc = new Docxtemplater();
        doc.loadZip(zip);
        
        
        try {
            doc.setData(replacements);
            doc.render();
        } catch (renderError) {
            console.error("Error rendering document:", renderError);
        }
    
    
    
        const modifiedContent = doc.getZip().generate({ type: 'nodebuffer' });
    
        res.setHeader('Content-Type', 'application/docx');
        res.setHeader('Content-Disposition', 'attachment; filename="modified_letter.docx"');
        res.send(modifiedContent);
    } catch (error) {
        console.error("Error replacing placeholders:", error);
        throw error;
    }
}

// Controller to save a new letter
export const saveLetter = async (req, res) => {
    try {
        const { letterType } = req.body;
        // console.log("path", req.file.path);
        // const path = req.file.path;
        const filePath = req.file;

    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const path = await uploadLetterToFirebaseStorage(filePath);

        
        const newLetter = await lettersSchema.create({
            letterType,
            path,
        });

        res.status(201).send("Letter uploaded successfully.:");
    } catch (error) {
        console.error("Error saving letter:", error);
        res.status(500).send("Server error");
    }
};

// Controller to update a letter
export const updateLetter = async (req, res) => {
    const letterType = req.params.type;
    const replacements = req.body;

    try {
        const letter = await lettersSchema.findOne({ where: { letterType, deleteFlag: false } });

        if (letter) {
            const path = letter.path;
            await replacePlaceholders(path, replacements, res);
        } else {
            res.status(404).json({ message: "Letter not found" });
        }
    } catch (error) {
        console.error("Error updating letter:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};