import  salaryDetailsSchema  from "../models/employeeSalary.js";

export const putEmployeeSalary = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updateData = req.body;

    const [updatedRowsCount] = await salaryDetailsSchema.update(updateData, {
      where: { employeeId: employeeId }
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Employee salary not found" });
    }

    const updatedSalary = await salaryDetailsSchema.findOne({
      where: { employeeId: employeeId }
    });

    res.status(200).json({ success: true, data: updatedSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const getEmployeeSalaryByEmployeeId = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employeeSalary = await salaryDetailsSchema.findOne({
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

export const getSalaryByEmployee = async (employeeId) => {
    try{
      const employeeSalary = await salaryDetailsSchema.findOne({
        where: { employeeId: employeeId }
      });
      return employeeSalary.monthlySalary;
    } catch (error) {
    throw new Error("Error to calculate noOfDays: " + error.message);
  }
};
