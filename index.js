import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./dataBase/sequelize.js";
import employee from "./routes/employeeRoute.js";
import authenticate from "./routes/authenticateRoute.js";
import employeeSalary from "./routes/employeeSalaryRoute.js";
import employeeAdress from "./routes/employeeAddressRoute.js";
import EmployeePersonalDetails from "./routes/employeePersonalDetailsRoute.js";
import EmployeeEducationalDetails from "./routes/employeeEducationalRoute.js";
import letter from "./routes/letterRoute.js";
import employeeDocument from "./routes/employeeDocumentRoute.js";
import leaveManagement from "./routes/leaveManagementRoute.js";
import dwr from "./routes/DWRRoute.js";
import email from "./routes/emailRoute.js";
import attendance from "./routes/attendanceRoute.js";
import roleMaster from "./routes/roleMasterRoute.js";
import documentMaster from "./routes/documentMasterRoute.js";
import leaveMaster from "./routes/leaveMasterRoute.js";
import letterMaster from "./routes/letterMasterRoute.js";
import project from "./routes/projectRoute.js";
import task from './routes/taskRoute.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/DWR/employee", employee);
app.use("/api/DWR/authenticate", authenticate);
app.use("/api/DWR/personal-details", EmployeePersonalDetails);
app.use("/api/DWR/employee-salary", employeeSalary);
app.use("/api/DWR/employee-address", employeeAdress);
app.use("/api/DWR/educational-details", EmployeeEducationalDetails);
app.use("/api/DWR/letter", letter);
app.use("/api/DWR/employee-document", employeeDocument);
app.use("/api/DWR/leave-management", leaveManagement);
app.use("/api/DWR", dwr);
app.use("/api/DWR/email", email);
app.use("/api/DWR/attendance", attendance);
app.use("/api/DWR/letter-master", leaveMaster);
app.use("/api/DWR/role-master", roleMaster);
app.use("/api/DWR/leave-master", letterMaster);
app.use("/api/DWR/document-master", documentMaster);
app.use("/api/DWR/projects", project);
app.use("/api/DWR/task", task);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => console.log(`Server is running on : ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
