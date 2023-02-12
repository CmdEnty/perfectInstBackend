const express = require("express");
const {
  getSalary,
  salaryView,
  addSalary,
  staffSalaryView,
  salaryViewStaff,
} = require("../controllers/salary");

const router = express.Router();

router.get("/", getSalary);
router.get("/salaryView/:id", salaryView);
router.get("/salaryViewStaff/:staffNo", salaryViewStaff);
router.get("/staffSalaryView/:sid", staffSalaryView);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addSalary", addSalary);

module.exports = router;
