import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Connection from "./dataBase/db.js";
import employee from "./routes/employeeRoute.js";
import authenticate from "./routes/authenticateRoute.js";
import employeeSalary from "./routes/employeeSalaryRoute.js";
import employeeAdress from "./routes/employeeAddressRoute.js";
import EmployeePersonalDetails from "./routes/employeePersonalDetailsRoute.js";
import EmployeeEducationalDetails from "./routes/employeeEducationalRoute.js"
import letter from "./routes/letterRoute.js"
dotenv.config();
const PORT = process.env.PORT;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/api/DWR/employee", employee);
app.use("/api/DWR/authenticate", authenticate);
app.use("/api/DWR/personal-details", EmployeePersonalDetails);
app.use("/api/DWR/employee-salary", employeeSalary);
app.use("/api/DWR/employee-address", employeeAdress);
app.use("/api/DWR/educational-details", EmployeeEducationalDetails);
app.use("/api/DWR/letter",letter);

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`Server is running on : ${PORT} `));
