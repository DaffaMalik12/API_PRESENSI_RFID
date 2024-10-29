const db = require("../models/db");

exports.recordAttendance = (req, res) => {
  const { rfid_uid } = req.body;

  if (!rfid_uid) {
    return res.status(400).json({ error: "RFID UID is required" });
  }

  // Misalnya cek pengguna berdasarkan UID dan catat kehadiran
  const query = "SELECT * FROM users WHERE rfid_uid = ?";
  db.query(query, [rfid_uid], (err, results) => {
    if (err) {
      console.error("Error checking user:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Insert kehadiran ke tabel attendance
    const userId = results[0].id;
    const insertQuery =
      "INSERT INTO attendance (user_id, timestamp) VALUES (?, NOW())";

    db.query(insertQuery, [userId], (err, result) => {
      if (err) {
        console.error("Error recording attendance:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        message: "Attendance recorded successfully",
        attendanceId: result.insertId,
      });
    });
  });
};
