import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import { mkdirSync, existsSync } from "fs";

dotenv.config();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./uploads/documents"; // Destination directory
    // const uploadDir = "./upl/documents"; // Destination directory
    console.log("dir:", uploadDir);
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists
    }
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    let ext = path.join(process.cwd());
    // let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename the file with current time
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      callback(null, true);
    } else {
      console.log("only jpg and png files are supported!");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});

export default upload;
