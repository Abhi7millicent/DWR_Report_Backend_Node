import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Connection from "./dataBase/db.js";
import employee   from './routes/employeeRoutes.js';
import authenticate  from './routes/authenticateRoute.js';
import EmployeePersonalDetails from './routes/employeePersonalDetailsRoute.js';
dotenv.config();
const PORT = process.env.PORT;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use("/api/DWR/employee", employee);
app.use("/api/DWR/authenticate", authenticate);
app.use("/api/DWR/personal-details", EmployeePersonalDetails);

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`Server is running on : ${PORT} `));