import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import { mkdirSync } from "fs";
dotenv.config();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "D:/DWR_Report_Backend_Node/uploads/documents"); // here its will be location file will be save
    cb(null, process.env.APP_ROUTE+"/DWR_Report_Backend_Node/uploads/documents"); // here its will be location file will be save
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    mkdirSync(ext, { recursive: true });
    cb(null, Date.now() + ext); // it will rename the filewith current time
  },
});

var uplaod = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      console.log( process.env.APP_ROUTE,"path");
      console.log(__filename,"filename");
      callback(null, true);
    } else {
      console.log("only jpg and png file support!");
      callback(null, false);
    }
  },
  limits: {
    fieldSize: 1024 * 1024 * 2,
  },
});

export default uplaod;
