import express from "express";
import {
  getCourse,
  courseView,
  searchCourse,
  addCourse,
  deleteCourse,
} from "../controllers/course.js";

const router = express.Router();

router.get("/", getCourse);
router.get("/courseView/:cid", courseView);
router.get("/search/:cid", searchCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addCourse", addCourse);

export default router;
