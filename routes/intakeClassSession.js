const express = require("express");
const {
  getClasses,
getClassCourses,
  availableClass,
  getClassSession,
} = require("../controllers/intakeClassSession");

const router = express.Router();

router.post("/getClasses/:classTitle", getClasses);
router.get("/:cid", getClassSession);
router.get("/getClassCourses/:cid", getClassCourses);
router.get("/availableClass/:cid", availableClass);
// router.post("/addClass", addClass);

module.exports = router;
