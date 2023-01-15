import express from "express";
import {
  getDesign,
  designView,
  designationSearch,
  addDesign,
} from "../controllers/designation.js";

const router = express.Router();

router.get("/", getDesign);
router.get("/designView/:id", designView);
router.get("/search/:designationTitle", designationSearch);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addDesign", addDesign);

export default router;
