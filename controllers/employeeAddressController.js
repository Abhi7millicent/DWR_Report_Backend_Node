import addresSchema from "../models/employeeAddress.js";

export const getEmployeeAdressById = async (req, res) => {
  try {
    const { id, addressType } = req.params;

    const employeeAddress = await addresSchema.findOne({
      where: {
        employeeId: id,
        addressType,
      }
    });

    if (!employeeAddress) {
      return res.status(404).json({ message: "Employee address not found" });
    }

    res.status(200).json({ data: employeeAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const putEmployeeAdressById = async (req, res) => {
  try {
    const { id, addressType } = req.params;
    const updateData = req.body;

    const [updatedRowsCount, updatedRows] = await addresSchema.update(updateData, {
      where: {
        employeeId: id,
        addressType,
      },
      returning: true, // Return the updated rows
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Employee address not found" });
    }

    res.status(200).json({ success: true, data: updatedRows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
