const express = require("express");
const {
  getAdmittedStudents,
  studentView,
  getPendingStudentsLocal,
  addStudent,
  admitStudent,
  deleteStudent,
  studentUpdate,
} = require("../controllers/students");

const router = express.Router();

router.get("/", getAdmittedStudents);
router.get("/getPendingStudentsLocal", getPendingStudentsLocal);
router.get("/studentView/:sid", studentView);
router.post("/studentUpdate/:sid", studentUpdate);
router.post("/admitStudent/:regNo", admitStudent);
router.delete("/deleteStudent/:regNo", deleteStudent);
router.post("/addStudent", addStudent);

module.exports = router;
