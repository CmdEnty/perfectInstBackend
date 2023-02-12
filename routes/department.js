const express = require("express");
const {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department");

const router = express.Router();

router.get("/", getDepartments);
router.delete("/:id", deleteDepartment);
router.put("/:id", updateDepartment);
router.post("/addDepartment", addDepartment);

module.exports = router;
