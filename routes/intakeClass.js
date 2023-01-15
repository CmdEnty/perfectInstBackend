import express from "express";
import { getClasses, addClass } from "../controllers/intakeClass.js";

const router = express.Router();

router.get("/", getClasses);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addClass", addClass);

export default router;
