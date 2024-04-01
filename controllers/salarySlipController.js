import salarySlipSchema from "../models/salarySlip.js";
import { getNoOfAbsentBetweenDateRange, getNoOfHalfdayBetweenDateRange } from "./attendanceController.js";
import { getStartDateByEmployeeMaster } from "./employeeController.js";

export const generateSalarySlip = async (req, res) => {
  try {
    const employeeId  = req.params;
    let dateValue = await findStartDate(employeeId);
    
    if (!dateValue) {
        dateValue = await getStartDateByEmployeeMaster(employeeId);
    }
    const startDate = new Date(dateValue);

    // Calculate end date as one month ahead of the start date
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(endDate.getDate() - 1)

    const dateFormate = new Date(endDate);
    const date = dateFormate.toISOString().split('T')[0];

    const noOfDays = await calculateNoOfDays(startDate, endDate);

    const basicSalaryString = await getSalaryByEmployee(employeeId);
    const basicSalary = +basicSalaryString;

    const dailyWages = basicSalary/noOfDays;

    const absentCount = await getNoOfAbsentBetweenDateRange(startDate, endDate, employeeId);
    const halfDayCount = await getNoOfHalfdayBetweenDateRange(startDate, endDate, employeeId);

    const leave = absentCount + (halfDayCount/2);

    const leaveAmount = dailyWages * leave;

    //pending values
    const hra =0;
    const conveyance =0;
    const loan =0;
    const professionTax =0;
    const tdsIt =0;

    const totalAddition = basicSalary + hra + conveyance;
    const totalDeduction = leaveAmount + loan + professionTax + tdsIt;
    const netSalary = totalAddition - totalDeduction;

    const salarySlip = new salarySlipSchema({
        employeeId,
        date,
        basicSalary,
        leave,
        hra,
        conveyance,
        loan,
        professionTax,
        tdsIt,
        dailyWages,
        totalAddition,
        totalDeduction,
        netSalary
    });

    await salarySlip.save();
    res.status(201).json({ message: "Salary slip genrated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findStartDate = async (employeeId) => {
  try {
    // Find the most recent salary slip for the employee
    const salarySlip = await salarySlipSchema.findOne({
      where: {
        employeeId: employeeId
      },
      order: [['id', 'DESC']]
    });

    if (!salarySlip) {
      return null;
    }

    return salarySlip.date;
  } catch (error) {
    throw new Error("Error finding start date: " + error.message);
  }
};

const calculateNoOfDays = async (startDate, endDate) => {
    try{
        // Calculate the difference in milliseconds between the two dates
        const differenceMs = endDate - startDate;

        // Convert milliseconds to days
        return Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    } catch (error) {
    throw new Error("Error to calculate noOfDays: " + error.message);
  }
};

