const express = require("express");
const { register, login, verifyToken, getin } = require("../Controller/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getin", verifyToken, getin);

// router.post("/login",verifyToken, login);
// router.get('/user', verifyToken,protected);

module.exports = router;
