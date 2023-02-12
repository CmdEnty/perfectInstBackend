const express = require("express");
const { getClasses, addClass } = require("../controllers/intakeClass");

const router = express.Router();

router.get("/", getClasses);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addClass", addClass);

module.exports = router;
