import multer from "multer";
import path from "path";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import dotenv from "dotenv";

dotenv.config();

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

const storage = multer.memoryStorage(); // Use memory storage for multer

const uploadProfile = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' 
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

export default uploadProfile;

export const uploadProfileToFirebaseStorage = async (file) => {
  try {
    const storageRef = firebase.storage().ref();
    const fileExtension = path.extname(file.originalname);
    const uploadTask = storageRef.child(`Profile/${Date.now()}${fileExtension}`).put(file.buffer, { contentType: file.mimetype });
    await uploadTask;
    console.log("Uploaded file path:", uploadTask.snapshot.ref.getDownloadURL());
    return uploadTask.snapshot.ref.getDownloadURL();
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error.message);
    throw error;
  }
};