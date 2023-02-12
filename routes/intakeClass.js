const express = require("express");
const {
  getClasses,
  addClass,
  addCourse,
  getClass,
} = require("../controllers/intakeClass");

const router = express.Router();

router.get("/", getClasses);
router.get("/:id", getClass);
router.post("/addCourse", addCourse);
router.post("/addClass", addClass);

module.exports = router;
