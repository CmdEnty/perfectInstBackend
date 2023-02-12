const express = require("express");

const { uploadKraPin, uploadNhif } = require("../controllers/staffUpload");

const router = express.Router();
router.post("/kraPin", uploadKraPin);
router.post("/nhif", uploadNhif);
module.exports = router;
