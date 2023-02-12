const express = require("express");
const { getUnits, addUnit } = require("../controllers/unit");

const router = express.Router();

router.get("/", getUnits);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addUnit", addUnit);

module.exports = router;
