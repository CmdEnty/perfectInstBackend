const express = require("express");
const {
  getFields,
  addfield,
  fieldSearch,
  updateField,
  deleteField,
} = require("../controllers/field");

const router = express.Router();

router.get("/", getFields);
router.get("/search/:fieldName", fieldSearch);
router.put("/:id", updateField);
router.delete("/:id", deleteField);
router.post("/addfield", addfield);

module.exports = router;
