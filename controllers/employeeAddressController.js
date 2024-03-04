import addresSchema from "../models/employeeAddress.js";

export const getEmployeeAdressById = async (req, res) => {
  try {
    const { id, addressType } = req.params;

    const employeeAddress = await addresSchema.findOne({
      employeeId: id,
      addressType,
    });

    if (!employeeAddress) {
      return res.status(404).json({ message: "Employee addess not found" });
    }
    res.status(200).json({ data: employeeAddress });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const putEmployeeAdressById = async (req, res) => {
  try {
    const { id, addressType } = req.params;
    const updateData = req.body;
    const updateAddress = await addresSchema.findOneAndUpdate(
      { employeeId: id, addressType },
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: updateAddress });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
