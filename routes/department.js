import express from "express";
import { getDepartments, addDepartment } from "../controllers/department.js";

const router = express.Router();

router.get("/", getDepartments);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addDepartment", addDepartment);

export default router;
