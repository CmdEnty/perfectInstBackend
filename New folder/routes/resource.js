const express = require("express");

const {
  getResources,
  uploadResource,
  deleteResource,
  // downloadResource,
} = require("../controllers/resource");

const router = express.Router();
router.get("/", getResources);
router.delete("/deleteResource/:resourceId", deleteResource);
// router.post("/downloadResource/:resourceId", downloadResource);
router.post("/uploadResource", uploadResource);
module.exports = router;
