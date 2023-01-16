const express = require("express");
const { getDepartments, addDepartment } = require("../controllers/department");

const router = express.Router();

router.get("/", getDepartments);
// router.delete("/deleteCourse/:id", deleteCourse);
router.post("/addDepartment", addDepartment);

module.exports = router;
