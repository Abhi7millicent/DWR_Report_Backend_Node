import fs from "fs";
import { promisify } from "util";
import { lettersSchema } from "../models/letter.js";
import { createReadStream } from "fs";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

// Function to replace placeholders in a Word document
async function replacePlaceholders(path, replacements) {
    try {
        const content = await promisify(fs.readFile)(path);
        const zip = new PizZip(content);
        const doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData(replacements);
        doc.render();

        // Get the modified content as a buffer
        const modifiedContent = doc.getZip().generate({ type: 'nodebuffer' });

        return modifiedContent;
    } catch (error) {
        console.error("Error replacing placeholders:", error);
        throw error;
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
            const modifiedDocBuffer = await replacePlaceholders(path, replacements);
            
        } else {
            res.status(404).json({ message: "Letter not found" });
        }
    } catch (error) {
        console.error("Error updating letter:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
