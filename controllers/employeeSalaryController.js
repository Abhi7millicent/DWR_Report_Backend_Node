import  salaryDetailsSchema  from "../models/employeeSalary.js";

export const putEmployeeSalary = async (req, res) => {
  try {
    const employeeId = req.params.id; // Corrected the destructure
    const updateData = req.body;

    const updateSalary = await salaryDetailsSchema.findOneAndUpdate(
      { employeeId: employeeId },
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: updateSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getEmployeeSalaryByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeSalary = await salaryDetailsSchema.findOne({
      employeeId,
    });
    if (!employeeSalary) {
      return res.status(404).json({ messsage: "Employee Salary not found" });
    }
    res.status(200).json({ data: employeeSalary });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
