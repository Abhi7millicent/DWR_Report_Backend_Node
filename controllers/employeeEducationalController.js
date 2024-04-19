import { uploadEducationDocumentToFirebaseStorage } from "../middleware/educationDocumentUpload.js";
import EmployeeEducationDetails from "../models/employeeEducationalDetails.js";

export const addEmployeeEducationalDetail = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = await uploadEducationDocumentToFirebaseStorage(file);
    const education = await EmployeeEducationDetails.create({
      degree: req.body.degree,
      institute: req.body.institute,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      percentage: req.body.percentage,
      employeeId:  req.body.employeeId,
      document: filePath,
    });

    res.status(200).json({ message: "Uploaded successfully", education });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeEducationalDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const educationalDetails = await EmployeeEducationDetails.findAll({
      where: {
        employeeId: id,
        deleteFlag: false,
      },
    });
    res.status(200).json({ data: educationalDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const putDeleteFlag = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Find the educational detail by ID
    const educationalDetails = await EmployeeEducationDetails.findOne({
      where: { id: employeeId },
    });

    // Check if the educational detail exists
    if (!educationalDetails) {
      return res.status(404).json({ message: "Educational details not found" });
    }

    // Set deleteFlag to true
    educationalDetails.deleteFlag = true;

    // Save the updated document
    await educationalDetails.save();

    res
      .status(200)
      .json({ message: "Educational details deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
