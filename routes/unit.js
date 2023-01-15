import express from "express";
import { getUnits, addUnit } from "../controllers/unit.js";

const router = express.Router();

router.get("/", getUnits);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addUnit", addUnit);

export default router;
