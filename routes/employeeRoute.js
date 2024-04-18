import express from "express";
import {
  addEmployee,
  getEmployeeList,
  getEmployeeById,
  updateEmployee,
  postAddBalancedLeave,
  getBalancedLeave,
  getListOfEmployeeName,
  uploadProfilePic,
  viewProfilePic,
  updateEmployeeStatus,
} from "../controllers/employeeController.js";
import uploadProfile from "../middleware/profileUpload.js";

const router = express.Router();

// Define routes
router.post("/add", addEmployee);
router.get("/list", getEmployeeList);
router.get("/namelist", getListOfEmployeeName);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.post("/addBalancedLeave", postAddBalancedLeave);
router.get("/balanced-leave/:id", getBalancedLeave);
router.put('/update-status/:id', updateEmployeeStatus);

// Route for uploading profile picture
router.post('/upload/:id',uploadProfile.single("profile"), uploadProfilePic);

// Route for viewing profile picture
router.get('/view/:id', viewProfilePic);



export default router;
