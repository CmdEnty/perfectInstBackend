const express = require("express");
const {
  getExpenditures,
  expenditureView,
  addExpenditure,
} = require("../controllers/expenditure");

const router = express.Router();

router.get("/", getExpenditures);
router.get("/expenditureView/:id", expenditureView);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addExpenditure", addExpenditure);

module.exports = router;
