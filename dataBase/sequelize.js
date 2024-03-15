import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql2 from 'mysql2';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const DATABASE = process.env.DB_DATABASE;
// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  dialectModule: mysql2,
  storage: DATABASE,
});

export default sequelize;
