const express = require("express");
const {
  getRecordedFeePayment,
  recordFeePayment,
  getPayment,
} = require("../controllers/feePayment");

const router = express.Router();

router.get("/:sid", getPayment);
router.post("/", recordFeePayment);
router.get("/", getRecordedFeePayment);

module.exports = router;
