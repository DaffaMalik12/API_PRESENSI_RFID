const db = require("../models/db"); // Mengimpor koneksi database

exports.registerUser = (req, res) => {
  const { name, nim, jurusan, kelas, rfid_UID } = req.body; // Tambahkan rfid_UID di sini

  const query =
    "INSERT INTO users (name, nim, jurusan, kelas, rfid_uid) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, nim, jurusan, kelas, rfid_UID], (err, result) => {
    if (err) {
      console.error("Error registering user:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  });
};
