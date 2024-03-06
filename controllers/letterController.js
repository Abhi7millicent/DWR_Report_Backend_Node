import fs from "fs";
import { promisify } from "util";
import { lettersSchema } from "../models/letter.js";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import libreofficeConvert from "libreoffice-convert";

// Function to replace placeholders in a Word document
async function replacePlaceholders(path, replacements, res) {
    try {
        const content = await promisify(fs.readFile)(path);
        const zip = new PizZip(content);
        const doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(replacements);
        doc.render();

        const modifiedContent = doc.getZip().generate({ type: 'nodebuffer' });

        res.setHeader('Content-Type', 'application/docx');
        res.setHeader('Content-Disposition', 'attachment; filename="modified_letter.docx"');
        res.send(modifiedContent);
    } catch (error) {
        console.error("Error replacing placeholders:", error);
        throw error;
    } finally {
        // Attempt to remove temporary files/directories created by libreoffice-convert
        try {
            await promisify(fs.rmdir)(libreofficeConvert.getTmpDirPath(), { recursive: true });
        } catch (cleanupError) {
            // Ignore cleanup errors
            console.error("Error cleaning up temporary directory:", cleanupError);
        }
    }
}

// Controller to save a new letter
export const saveLetter = async (req, res) => {
    try {
        const { letterType } = req.body;
        const path = req.file.path;

        const newLetter = new lettersSchema({
            letterType,
            path,
        });

        await newLetter.save();

        res.status(201).send("Letter uploaded successfully.");
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
        const letter = await lettersSchema.findOne({ letterType, deleteFlag: false });

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
