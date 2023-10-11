const express = require("express");
const { register, login, verifyToken } = require("../Controller/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// router.get('/user', verifyToken,protected);

module.exports = router;