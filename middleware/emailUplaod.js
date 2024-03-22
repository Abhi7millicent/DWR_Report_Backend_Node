import multer from "multer";

const storage = multer.memoryStorage(); // Use memory storage for multer

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf' || // Add PDF mimetype
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Add Excel mimetype
    ) {
      callback(null, true);
    } else {
      console.log('Only JPG, PNG, PDF, and Excel files are supported!');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
});

export const uploadEmailFilesToFirebaseStorage = async (file) => {
  try {
    const storageRef = firebase.storage().ref();
    const fileExtension = path.extname(file.originalname);
    const uploadTask = storageRef.child(`emailFiles/${Date.now()}${fileExtension}`).put(file.buffer, { contentType: file.mimetype });
    await uploadTask;
    console.log("Uploaded file path:", uploadTask.snapshot.ref.getDownloadURL());
    return uploadTask.snapshot.ref.getDownloadURL();
  } catch (error) {
    console.error('Error uploading file to Firebase Storage:', error.message);
    throw error;
  }
};


// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "D:\\DWR_Report_Backend_Node\\uploads\\email");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// export const upload = multer({ storage: storage });

// Saving transporter configuration
// const transporterConfig = new Transporter({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "c2a43365fe24f0",
//     pass: "22e02a1b3ee257",
//   },
// });
// await transporterConfig.save();
// const config = await Transporter.findOne({}).exec();
// Nodemailer transporter
