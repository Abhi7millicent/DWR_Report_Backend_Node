import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for multer

const letterUpload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      // file.mimetype === 'image/png' ||
      // file.mimetype === 'image/jpg' ||
      // file.mimetype === 'image/jpeg' ||
      // file.mimetype === 'application/pdf' ||
      // file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // Add DOCX mimetype
    ) {
      callback(null, true);
    } else {
      console.log('Only DOCX files are supported!');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
});


export default letterUpload;


export const uploadLetterToFirebaseStorage = async (file) => {
  try {
    const storageRef = firebase.storage().ref();
    const fileExtension = path.extname(file.originalname);
    const uploadTask = storageRef.child(`letter/${fileExtension}`).put(file.buffer, { contentType: file.mimetype });
    await uploadTask;
    console.log("Uploaded file path:", uploadTask.snapshot.ref.getDownloadURL());
    return uploadTask.snapshot.ref.getDownloadURL();
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error.message);
    throw error;
  }
};

// import multer, { diskStorage } from 'multer';
// import { join } from 'path';
// import { mkdirSync } from 'fs';

// const letterDirectory = 'D:/DWR_report_backend/uploads/letter'; // Define your letter directory path here

// const storage = diskStorage({
//   destination: (req, file, cb) => {
//     try {
//       const currentDate = new Date();
//       const year = currentDate.getFullYear();
//       const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
//       const day = currentDate.getDate().toString().padStart(2, "0");
//       const folderPath = join(letterDirectory, `/${year}-${month}-${day}`);
//       console.log("file",folderPath);
//       mkdirSync(folderPath, { recursive: true });
//       cb(null, folderPath);
//     } catch (err) {
//       cb(err); // Pass error to the callback
//     }
//   },
//   filename: (req, file, cb) => {
//     cb(null,  file.originalname); 
//   }
// });

// const letterUpload = multer({ storage: storage });

// export default letterUpload;
