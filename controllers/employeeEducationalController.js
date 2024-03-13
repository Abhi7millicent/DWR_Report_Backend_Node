import EmployeeEducationDetails from "../models/employeeEducationalDetails.js";

export const addEmployeeEducationalDetail = async (req, res) => {
  try {
    const { id, degree, institute, startDate, endDate, percentage } = req.body;
    const educationalDetails = new EmployeeEducationDetails({
      id,
      degree,
      institute,
      startDate,
      endDate,
      percentage,
    });
    const savedEducationalDetails = await educationalDetails.save();
    res.status(201).json({ data: savedEducationalDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeEducationalDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const educationalDetails = await EmployeeEducationDetails.findAll({
      where: {
        id: id,
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
    const id = req.params.id;

    // Find the educational detail by ID
    const educationalDetails = await EmployeeEducationDetails.findOne({
      where: { id: id },
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
