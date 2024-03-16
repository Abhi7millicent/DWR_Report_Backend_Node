import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs"; // Import the fs module

dotenv.config();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationDir = "./upload/document";

    // Check if the destination directory exists, if not, create it
    fs.promises
      .mkdir(destinationDir, { recursive: true })
      .then(() => {
        cb(null, destinationDir);
      })
      .catch((err) => {
        console.error("Error creating directory:", err);
        cb(err, null);
      });
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      // console.log("path:", );
      callback(null, true);
    } else {
      console.log("Only JPG and PNG files are supported!");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2, // Limit file size to 2MB
  },
});

export default upload;
