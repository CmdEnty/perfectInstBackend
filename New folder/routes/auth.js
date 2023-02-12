const express = require("express");
const { login, register, logout, updateUser } = require("../controllers/auth");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/updateUser/:id", updateUser);

module.exports = router;
