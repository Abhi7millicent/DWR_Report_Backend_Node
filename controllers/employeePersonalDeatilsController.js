import personalDetailsSchema from "../models/employeePersonalDeatils.js";
import { Op, Sequelize } from 'sequelize';
import { getNameById } from "./employeeController.js";

export const updateEmployeePersonalDetails = async (req, res) => {
  const employeeId = req.params.employeeId;
  const updatedPersonalDetails = req.body;

  try {
    const [updatedRowsCount] = await personalDetailsSchema.update(updatedPersonalDetails, {
      where: { employeeId: employeeId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Personal details not found" });
    }

    // Fetch the updated personal data after the update
    const updatedPersonalData = await personalDetailsSchema.findOne({
      where: { employeeId: employeeId }
    });

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

export const getListOfDateOfBirth = async (startDate, endDate) => {
    try {
      const personalData = await personalDetailsSchema.findAll({ 
        where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('DATE_FORMAT', Sequelize.col('date_of_birth_epd'), '%m-%d'), {
                    [Op.between]: [startDate.substring(5), endDate.substring(5)] // Extract MM-DD from startDate and endDate
                }),
                { deleteFlag: false }
            ]
        }
    });
      const namesWithBirthdate = [];
        
        for (const data of personalData) {
            // Get the name associated with the personalData ID
            const name = await getNameById(data.employeeId);
            // Push name with birthdate to the array
            namesWithBirthdate.push({ name: name, date: data.dateOfBirth , type: "birthDay"});
        }
        return namesWithBirthdate;
    } catch (error) {
      console.error("Error retrieving personal data:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};