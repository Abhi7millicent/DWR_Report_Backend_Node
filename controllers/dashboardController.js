import { getEmployeeTotalCount } from "./employeeController";
import { getProjectTotalCount } from "./projectController";
import { getCompletedTaskTotalCount, getCompletedTaskTotalCountById, getPendingTaskTotalCount, getPendingTaskTotalCountById, getTaskTotalCount, getTaskTotalCountById } from "./taskController";

export const getEmployeeCount = async (req, res) => {
    try {
      const count = await getEmployeeTotalCount();
      res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getProjectCount = async (req, res) => {
    try {
        const count = await getProjectTotalCount();
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getTaskCount = async (req, res) => {
    try {
        const count = await getTaskTotalCount();
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getPendingTaskCount = async (req, res) => {
    try {
        const count = await getPendingTaskTotalCount();
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getCompletedTaskCount = async (req, res) => {
    try {
        const count = await getCompletedTaskTotalCount();
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getTaskCountById = async (req, res) => {
    try {
        const employeeId = req.param.employeeId;
        const count = await getTaskTotalCountById(employeeId);
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getPendingTaskCountById = async (req, res) => {
    try {
        const count = await getPendingTaskTotalCountById();
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  export const getCompletedTaskCountById = async (req, res) => {
    try {
        const count = await getCompletedTaskTotalCountById();
        res.status(200).JSON({data: count});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  export const getListOfEvents = async (req, res) => {
    try{
        const currentDate = new Date();
        const lastDate = new Date(currentDate);
        lastDate.setDate(currentDate.getDate() + 31);

        // Formatting currentDate to YYYY-MM-DD
        const startDate = currentDate.toISOString().split('T')[0];
        
        // Formatting endDate to YYYY-MM-DD
        const endDate = lastDate.toISOString().split('T')[0];

        const dateOfBirth = await getListOfDateOfBirth(startDate, endDate);
        const anniversary = await getListOfAnniversary(startDate, endDate);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  