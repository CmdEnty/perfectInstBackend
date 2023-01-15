import express from "express";
import {
  getFeeStructure,
  addFeeStructure,
} from "../controllers/feeStructure.js";

const router = express.Router();

router.get("/", getFeeStructure);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addFeeStructure", addFeeStructure);

export default router;
