const express = require("express");
const {
  getFeeStructure,
  addFeeStructure,
  getFeeStructureSession,
} = require("../controllers/feeStructure");

const router = express.Router();

router.get("/", getFeeStructure);
router.post("/getFeeStructureSession/:cid", getFeeStructureSession);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/", addFeeStructure);

module.exports = router;
