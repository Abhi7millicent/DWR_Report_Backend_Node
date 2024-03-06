import multer, { diskStorage } from 'multer';
import { join } from 'path';
import { mkdirSync } from 'fs';

const letterDirectory = 'D:/DWR_report_backend/uploads/letter'; // Define your letter directory path here

const storage = diskStorage({
  destination: (req, file, cb) => {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const folderPath = join(letterDirectory, `/${year}-${month}-${day}`);
      mkdirSync(folderPath, { recursive: true });
      cb(null, folderPath);
    } catch (err) {
      cb(err); // Pass error to the callback
    }
  },
  filename: (req, file, cb) => {
    cb(null,  file.originalname); 
  }
});

const letterUpload = multer({ storage: storage });

export default letterUpload;
