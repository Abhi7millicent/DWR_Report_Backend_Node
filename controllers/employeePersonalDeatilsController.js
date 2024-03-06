import { personalDeatilsSchema } from "../models/employeePersonalDeatils.js";

export const updateEmployeePersonalDetails = async (req, res) => {
    const employeeId = req.params.employeeId;
    const updatedPersonalDetails = req.body;
  
    try {
      const result = await personalDeatilsSchema.findOneAndUpdate(
        { employeeId: employeeId },
        updatedPersonalDetails,
        { new: true }
      );
  
      if (!result) {
        return res.status(404).json({ message: "Personal details not found" });
      }
  
      return res.status(200).json({ message: "Personal details updated successfully", updatedDetails: result });
    } catch (error) {
      console.error("Error updating personal details:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};

export const getEmployeePersonalDataByEmployeeId = async (req, res) => {
    const employeeId = req.params.employeeId;

    try {
        const personalData = await personalDeatilsSchema.findOne({ employeeId: employeeId });
        
        if (!personalData) {
            return res.status(404).json({ message: "Personal data not found for the given employeeId" });
        }
        
        return res.status(200).json({data: personalData });
    } catch (error) {
        console.error("Error retrieving personal data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
