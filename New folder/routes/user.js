const express = require("express");
const {
  getUser,
  updateUser,
  updateUserPsd,
  updateProfilePic,
} = require("../controllers/user");

const router = express.Router();

router.get("/find/:userId", getUser);
router.post("/updateUser/:id", updateUser);
router.post("/updateUserPsd/:id", updateUserPsd);
router.post("/updateProfilePic/:id", updateProfilePic);

module.exports = router;
