import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";
import { mkdirSync, existsSync } from "fs";
import path from "path";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/documents"; // Destination directory
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename the file with current time
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      callback(null, true);
    } else {
      console.log("Only jpg and png files are supported!");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});

export default upload;

const authToken = process.env.BLOB_READ_WRITE_TOKEN;

export const uploadFileToBlobStorage = async (file) => {
  try {
    const response = await axios.post(
      'YOUR_BLOB_STORAGE_API_ENDPOINT',
      file.buffer, // Assuming file.buffer contains the file content
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': file.mimetype, // Set the appropriate content type
        },
      }
    );
    console.log("Uploaded file path:", response.data.url);
    return response.data.url; // URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file to Blob storage:', error.message);
    throw error;
  }
};


