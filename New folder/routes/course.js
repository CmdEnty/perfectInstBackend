const express = require("express");
const {
  getCourse,
  courseView,
  searchCourse,
  addCourse,
  deleteCourse,
} = require("../controllers/course");


const router = express.Router();

router.get("/", getCourse);
router.get("/courseView/:cid", courseView);
router.get("/search/:cid", searchCourse);
router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addCourse", addCourse);

module.exports = router;
