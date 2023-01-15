import express from "express";
import {
  getStaffs,
  staffView,
  addStaff,
  deleteStaff,
  staffSearch,
} from "../controllers/staff.js";

const router = express.Router();

router.get("/", getStaffs);

router.get("/staffView/:sid", staffView);
router.delete("/deleteStaff/:regNo", deleteStaff);
router.get("/search/:idNumber", staffSearch);
router.post("/addStaff", addStaff);

export default router;
