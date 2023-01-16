const express = require("express");
const {
  getStaffs,
  staffView,
  addStaff,
  deleteStaff,
  staffSearch,
} = require("../controllers/staff");

const router = express.Router();

router.get("/", getStaffs);

router.get("/staffView/:sid", staffView);
router.delete("/deleteStaff/:regNo", deleteStaff);
router.get("/search/:idNumber", staffSearch);
router.post("/addStaff", addStaff);

module.exports = router;
