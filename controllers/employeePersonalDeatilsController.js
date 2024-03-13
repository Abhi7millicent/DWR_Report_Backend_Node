import personalDetailsSchema from "../models/employeePersonalDeatils.js";

export const updateEmployeePersonalDetails = async (req, res) => {
  const employeeId = req.params.employeeId;
  const updatedPersonalDetails = req.body;

  try {
      const [updatedRowsCount, [updatedPersonalData]] = await personalDetailsSchema.update(updatedPersonalDetails, {
          where: { employeeId: employeeId },
          returning: true, // Return the updated rows
      });

      if (updatedRowsCount === 0) {
          return res.status(404).json({ message: "Personal details not found" });
      }

      return res.status(200).json({ message: "Personal details updated successfully", updatedDetails: updatedPersonalData });
  } catch (error) {
      console.error("Error updating personal details:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployeePersonalDataByEmployeeId = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
      const personalData = await personalDetailsSchema.findOne({ where: { employeeId: employeeId } });
      
      if (!personalData) {
          return res.status(404).json({ message: "Personal data not found for the given employeeId" });
      }
      
      return res.status(200).json({ data: personalData });
  } catch (error) {
      console.error("Error retrieving personal data:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};
