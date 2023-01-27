const express = require("express");
const {
  getAdmittedStudents,
  studentView,
  getPendingStudentsLocal,
  addStudent,
  admitStudent,
  deleteStudent,
  studentUpdate,
  updateStudent,
  updateContacts,
  updateSpecialNeeds,
  studentSearch,
} = require("../controllers/students");

const router = express.Router();

router.get("/", getAdmittedStudents);
router.get("/getPendingStudentsLocal", getPendingStudentsLocal);
router.get("/studentView/:sid", studentView);
router.post("/studentUpdate/:sid", studentUpdate);
router.get("/search/:idNumber", studentSearch);
router.post("/students/:sid", updateStudent);
router.post("/updateContacts/:sid", updateContacts);
router.post("/updateSpecialNeeds/:sid", updateSpecialNeeds);
router.post("/admitStudent/:regNo", admitStudent);
router.delete("/deleteStudent/:regNo", deleteStudent);
router.post("/addStudent", addStudent);

module.exports = router;
