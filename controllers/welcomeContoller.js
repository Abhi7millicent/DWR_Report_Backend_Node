import welcome from "../models/welcome.js";

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

export const updateWelcomeDetailsByEmployeeId = async (req, res) => {
    const { employeeId } = req.params;
    const { personalDetails, educationDetails, bankDetails } = req.body;
  
    try {
      const update = await WelcomeModel.update(
        {
          personalDetails,
          educationDetails,
          bankDetails,
        },
        {
          where: {
            employeeId,
          },
        }
      );
      if (!update) {
        return res.status(404).json({ message: 'Employee not found.' });
      }

      return res.status(200).json({ message: 'Welcome details updated successfully.' });
    } catch (error) {
      console.error('Error updating welcome details:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };