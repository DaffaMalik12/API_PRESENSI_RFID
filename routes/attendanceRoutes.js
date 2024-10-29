const express = require("express");
const router = express.Router();
const attendanceController = require("../Controllers/attendanceController");

router.post("/api/attendance", attendanceController.recordAttendance);

module.exports = router;
