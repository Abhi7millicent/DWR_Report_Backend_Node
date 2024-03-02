import express from "express";
import { authenticate } from "../controllers/authenticateController.js";

const router = express.Router();

router.post("/login", authenticate);

export default router;