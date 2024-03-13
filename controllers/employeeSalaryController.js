import  salaryDetailsSchema  from "../models/employeeSalary.js";

export const putEmployeeSalary = async (req, res) => {
  try {
    const employeeId = req.params.id; // Corrected the destructure
    const updateData = req.body;

    const [updatedRowsCount, [updatedSalary]] = await SalaryDetails.update(updateData, {
      where: { employeeId: employeeId },
      returning: true // Return the updated rows
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Employee salary not found" });
    }

    res.status(200).json({ success: true, data: updatedSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getEmployeeSalaryByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeSalary = await SalaryDetails.findOne({
      where: { employeeId: employeeId }
    });

    if (!employeeSalary) {
      return res.status(404).json({ message: "Employee salary not found" });
    }

    res.status(200).json({ data: employeeSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
