const express = require("express");
const { getFields, addfield, fieldSearch } = require("../controllers/field");

const router = express.Router();

router.get("/", getFields);
router.get("/search/:fieldName", fieldSearch);
router.post("/addfield", addfield);

module.exports = router;
