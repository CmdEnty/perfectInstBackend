const express = require("express");
const {
  getFeeStructure,
  addFeeStructure,
} = require("../controllers/feeStructure");

const router = express.Router();

router.get("/", getFeeStructure);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addFeeStructure", addFeeStructure);

module.exports = router;
