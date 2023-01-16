const express = require("express");
const {
  getDesign,
  designView,
  designationSearch,
  addDesign,
} = require("../controllers/designation");

const router = express.Router();

router.get("/", getDesign);
router.get("/designView/:id", designView);
router.get("/search/:designationTitle", designationSearch);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addDesign", addDesign);

module.exports = router;
