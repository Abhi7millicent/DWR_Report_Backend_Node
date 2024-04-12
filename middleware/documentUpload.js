// import axios from "axios";
// import dotenv from "dotenv";
// import multer from "multer";
// import { mkdirSync, existsSync } from "fs";
// import path from "path";

// dotenv.config();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = "./uploads/documents"; // Destination directory
//     if (!existsSync(uploadDir)) {
//       mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     cb(null, Date.now() + ext); // Rename the file with current time
//   },
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, callback) => {
//     if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
//       callback(null, true);
//     } else {
//       console.log("Only jpg and png files are supported!");
//       callback(null, false);
//     }
//   },
//   limits: {
//     fieldSize: 1024 * 1024 * 2,
//   },
// });

// export default upload;

// const authToken = process.env.BLOB_READ_WRITE_TOKEN;

// export const uploadFileToBlobStorage = async (file) => {
//   try {
//     const response = await axios.post(
//       'YOUR_BLOB_STORAGE_API_ENDPOINT',
//       file.buffer, // Assuming file.buffer contains the file content
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//           'Content-Type': file.mimetype, // Set the appropriate content type
//         },
//       }
//     );
//     console.log("Uploaded file path:", response.data.url);
//     return response.data.url; // URL of the uploaded file
//   } catch (error) {
//     console.error('Error uploading file to Blob storage:', error.message);
//     throw error;
//   }
// };

import multer from "multer";
import path from "path";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const storage = multer.memoryStorage(); // Use memory storage for multer

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "application/pdf" || // Add PDF mimetype
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // Add Excel mimetype
    ) {
      callback(null, true);
    } else {
      console.log("Only jpg and png files are supported!");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
});

export default upload;

export const uploadFileToFirebaseStorage = async (file) => {
  try {
    const storageRef = firebase.storage().ref();
    const fileExtension = path.extname(file.originalname);
    const uploadTask = storageRef
      .child(`uploads/${Date.now()}${fileExtension}`)
      .put(file.buffer, { contentType: file.mimetype });
    await uploadTask;
    console.log(
      "Uploaded file path:",
      uploadTask.snapshot.ref.getDownloadURL()
    );
    return uploadTask.snapshot.ref.getDownloadURL();
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error.message);
    throw error;
  }
};
