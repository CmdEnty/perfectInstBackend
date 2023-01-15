import express from "express";
import {
  getExpenditures,
  expenditureView,
  addExpenditure,
} from "../controllers/expenditure.js";

const router = express.Router();

router.get("/", getExpenditures);
router.get("/expenditureView/:id", expenditureView);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addExpenditure", addExpenditure);

export default router;
