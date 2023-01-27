const express = require("express");
const {
  getStaffs,
  staffView,
  addStaff,
  deleteStaff,
  staffSearch,
  updateStaffs,
  updateContacts,
  updateSpecialNeeds,
} = require("../controllers/staff");

const router = express.Router();

router.get("/", getStaffs);

router.get("/staffView/:sid", staffView);
router.delete("/deleteStaff/:regNo", deleteStaff);
router.post("/staffs/:sid", updateStaffs);
router.post("/updateContacts/:sid", updateContacts);
router.post("/updateSpecialNeeds/:sid", updateSpecialNeeds);
router.get("/search/:idNumber", staffSearch);
router.post("/addStaff", addStaff);

module.exports = router;
