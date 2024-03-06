import { PDFDocument } from '@pdf-lib/core';
import officeConverter from 'office-converter';

// Function to convert DOCX buffer to PDF buffer and send as downloadable attachment
export async function convertToPdfAndDownload(docxBuffer, res) {
    try {
        const pdfBuffer = await convertDocxToPdf(docxBuffer);

        // Send PDF file as downloadable attachment
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="modified_letter.pdf"');
        res.send(pdfBuffer);
    } catch (error) {
        console.error("Error converting to PDF and downloading:", error);
        res.status(500).send("Server error");
    }
}

// Helper function to convert DOCX buffer to PDF buffer
async function convertDocxToPdf(docxBuffer) {
    return new Promise((resolve, reject) => {
        officeConverter.convertBuffer(docxBuffer, '.pdf', {}, (err, pdfBuffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(pdfBuffer);
            }
        });
    });
}
