// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');

// Route untuk registrasi admin
router.post('/admin/register', adminController.registerAdmin);

// Route untuk login admin
router.post('/admin/login', adminController.loginAdmin);

module.exports = router;
