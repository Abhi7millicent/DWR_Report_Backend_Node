import express from "express";
import { addRole, getRole } from "../controllers/roleMasterController.js";

const router = express.Router();

router.post("/save",addRole);
router.get("/list",getRole);

export default router;