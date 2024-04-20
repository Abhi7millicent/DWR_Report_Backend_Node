import { uploadBankDocumentToFirebaseStorage } from "../middleware/bankDocumentUpload.js";
import  salaryDetailsSchema  from "../models/employeeSalary.js";

export const putEmployeeBankAccount = async (req, res) => {
  try {
    const  employeeId  = req.params.id;
    const file = req.file;
    // const { bankAccountName, ifscCode, accountNo, uanNo, epfoNo, annualSalary, monthlySalary } = req.body;
    const { bankAccountName, ifscCode, accountNo} = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload the bank document to Firebase Storage
    const bankDoument = await uploadBankDocumentToFirebaseStorage(file);

    const bankDetails = await salaryDetailsSchema.update(
      { 
        bankAccountName, 
        ifscCode, 
        accountNo, 
        document: bankDoument, 
      },
      { 
        where: { employeeId: employeeId } 
      }
    );

    res.status(200).json({ message: "Uploaded successfully", bankDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const putEmployeeSalary = async (req, res) => {
  try {
    const  employeeId  = req.params.id;
    const file = req.file;
    const { bankAccountName, ifscCode, accountNo, uanNo, epfoNo, annualSalary, monthlySalary } = req.body;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload the bank document to Firebase Storage
    const bankDoument = await uploadBankDocumentToFirebaseStorage(file);

    const bankDetails = await salaryDetailsSchema.update(
      { 
        bankAccountName, 
        ifscCode, 
        accountNo, 
        uanNo, 
        epfoNo, 
        annualSalary, 
        monthlySalary, 
        document: bankDoument 
      },
      { 
        where: { employeeId: employeeId } 
      }
    );

    res.status(200).json({ message: "Uploaded successfully", bankDetails });
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
        where: { employeeId: employeeId.employeeId }
      });
      return employeeSalary.monthlySalary;
    } catch (error) {
    throw new Error("Error to calculate noOfDays: " + error.message);
  }
};
