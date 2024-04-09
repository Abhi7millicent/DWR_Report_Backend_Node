import { getBalanceleaveCountById, getEmployeeTotalCount, getListOfAnniversary } from "./employeeController.js";
import { getListOfDateOfBirth } from "./employeePersonalDeatilsController.js";
import { getProjectTotalCount } from "./projectController.js";
import {
  getCompletedTaskTotalCount,
  getCompletedTaskTotalCountById,
  getPendingTaskTotalCount,
  getPendingTaskTotalCountById,
  getTaskTotalCount,
  getTaskTotalCountById,
} from "./taskController.js";

export const getEmployeeCount = async (req, res) => {
  try {
    const count = await getEmployeeTotalCount();
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getProjectCount = async (req, res) => {
  try {
    const count = await getProjectTotalCount();
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getTaskCount = async (req, res) => {
  try {
    const count = await getTaskTotalCount();
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getPendingTaskCount = async (req, res) => {
  try {
    const count = await getPendingTaskTotalCount();
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCompletedTaskCount = async (req, res) => {
  try {
    const count = await getCompletedTaskTotalCount();
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getTaskCountById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const count = await getTaskTotalCountById(employeeId);
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getBalanceleavesCountById = async (req, res) => {
    try {
      const empId = req.params.employeeId;
      const count = await getBalanceleaveCountById(empId);
      res.status(200).send({ data: count });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  };

export const getPendingTaskCountById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const count = await getPendingTaskTotalCountById(employeeId);
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getCompletedTaskCountById = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    const count = await getCompletedTaskTotalCountById(employeeId);
    res.status(200).send({ data: count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getListOfEvents = async (req, res) => {
  try {
    const currentDate = new Date();
    const lastDate = new Date(currentDate);
    lastDate.setDate(currentDate.getDate() + 31);

    // Formatting currentDate to YYYY-MM-DD
    const startDate = currentDate.toISOString().split("T")[0];

    // Formatting endDate to YYYY-MM-DD
    const endDate = lastDate.toISOString().split("T")[0];

    const dateOfBirth = await getListOfDateOfBirth(startDate, endDate);
    const anniversary = await getListOfAnniversary(startDate, endDate);
    const events = [...dateOfBirth, ...anniversary];

    // Sort events array based on date in descending order
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).send({ data: events });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

