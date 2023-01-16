const express = require("express");
const { getSalary, salaryView, addSalary } = require("../controllers/salary");

const router = express.Router();

router.get("/", getSalary);
router.get("/salaryView/:id", salaryView);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addSalary", addSalary);

module.exports = router;
