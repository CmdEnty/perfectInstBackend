import express from "express";
import { getSalary, salaryView, addSalary } from "../controllers/salary.js";

const router = express.Router();

router.get("/", getSalary);
router.get("/salaryView/:id", salaryView);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addSalary", addSalary);

export default router;
