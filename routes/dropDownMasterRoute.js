import express from "express";
import {
  createDropDown,
  getAllDropDowns,
  getDropDownById,
  updateDropDown,
  deleteDropDown,
} from "../controllers/dropDownController.js";

const router = express.Router();

router.post("/{type}", createDropDown);
router.get("/{type}", getAllDropDowns);
router.get("/:id", getDropDownById);
router.put("/:id", updateDropDown);
router.patch("/:id", deleteDropDown);

export default router;
