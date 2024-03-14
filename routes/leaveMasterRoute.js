import express from "express";
import { addleaveType, getleaveType } from "../controllers/leaveMasterController.js";

const router = express.Router();

router.post("/save",addleaveType);
router.get("/list",getleaveType);

export default router;