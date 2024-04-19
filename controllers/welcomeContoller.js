
import { uploadFileToFirebaseStorage } from "../middleware/documentUpload.js";
import welcome from "../models/welcome.js";
import { getAddress, updateAddress } from "./employeeAddressController.js";
import { getNameData, updateName } from "./employeeController.js";
import { getPersonalDetails, updatePersonalDetails, uploadAadhaarCard, uploadPanCard } from "./employeePersonalDeatilsController.js";

export const addNew = async (employeeId) => {
    const id = parseInt(employeeId);
    try {
        await welcome.create({
            employeeId: id,
          });
  } catch (error) {
        throw new Error(error.message);
  }
}
export const updateEmployeeDetails = async (req, res) => {
  const employeeId = req.params.employeeId;
  const {
    firstName,
    lastName,
    addressLine1,
    country,
    pinCode,
    city,
    state,
    bloodGroup,
    panNo,
    panNoName,
    aadhaarNo,
    aadhaarNoName,
    phoneNumber,
    emergencyContact1,
    relation1,
    dateOfBirth,
    personalEmail,
    gender,
    maritalStatus,
  } = req.body;

  const name = {
    firstName,
    lastName,
  };
  const address = {
    addressLine1,
    country,
    pinCode,
    city,
    state,
  };
  const personalDetails = {
    emergencyContact1,
    relation1,
    dateOfBirth,
    personalEmail,
    gender,
    bloodGroup,
    panNo,
    panNoName,
    phoneNumber,
    aadhaarNo,
    aadhaarNoName,
    maritalStatus,
  };

  try {
    // Update employee details
    await updateName(name, employeeId);

    // Update address
    await updateAddress(address, employeeId);

    // Update contact details
    await updatePersonalDetails(personalDetails, employeeId);

    await welcome.update({ personalDetails: true }, {
      where: {
        employeeId: employeeId
      }
    });

    res.status(200).send('Employee details updated successfully');
  } catch (error) {
    console.error('Error updating employee details:', error);
    res.status(500).send('Internal server error');
  }
}

export async function getEmployeeDetails(req, res) {
  const employeeId = req.params.employeeId;

  try {
    // Find the employee by employeeId
    const employee = await getNameData(employeeId);

    if (!employee) {
      return res.status(404).send('Employee not found');
    }

    // Find the address of the employee
    const address = await getAddress(employeeId);
    
    // Find the personal details of the employee
    const personalDetails = await getPersonalDetails(employeeId);
    
    // Construct response object
    const responseData = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      addressLine1: address.addressLine1,
      country: address.country,
      pinCode: address.pinCode,
      city: address.city,
      state: address.state,
      bloodGroup: personalDetails.bloodGroup,
      panNo: personalDetails.panNo,
      panNoPath: personalDetails.panNoPath,
      panNoName: personalDetails.panNoName,
      aadhaarNo: personalDetails.aadhaarNo,
      aadhaarNoPath: personalDetails.aadhaarNoPath,
      aadhaarNoName: personalDetails.aadhaarNoName,
      emergencyContact1: personalDetails.emergencyContact1,
      relation1: personalDetails.relation1,
      phoneNumber: personalDetails.phoneNumber,
      dateOfBirth: personalDetails.dateOfBirth,
      personalEmail: personalDetails.personalEmail,
      gender: personalDetails.gender,
      maritalStatus: personalDetails.maritalStatus,
    };

    res.status(200).json({ data: responseData });
  } catch (error) {
    console.error('Error retrieving employee details:', error);
    res.status(500).send('Internal server error');
  }
}

export const updatePanCard = async (req, res) => {
  try{
    const employeeId = req.params.employeeId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = await uploadFileToFirebaseStorage(file);

    await uploadPanCard(employeeId, filePath);
    res.status(200).json({ message: "uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAadhaarCard = async (req, res) => {
  try{
    const employeeId = req.params.employeeId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = await uploadFileToFirebaseStorage(file);

    await uploadAadhaarCard(employeeId, filePath);
    res.status(200).json({ message: "uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPersonalDetailsValue = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const welcomeData = await welcome.findOne({ where: { employeeId: employeeId } });
    if (!welcomeData) {
      return res.status(404).json({ message: 'Welcome data not found' });
    }
    const personalDetails = welcomeData.personalDetails;
    return res.status(200).json({data: personalDetails });
  } catch (error) {
    console.error('Error fetching personalDetails:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

