import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
dotenv.config();
// Getting the directory name of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Assuming req.body.category exists and holds the category information
    const category = req.body.category || "default";
    const uploadPath = path.join(__dirname, "upload", category);
    mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
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
