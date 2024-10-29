// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// Route untuk registrasi user
router.post("/user/register", userController.registerUser);

module.exports = router;
