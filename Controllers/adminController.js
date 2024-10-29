// Controllers/adminController.js
const db = require("../models/db"); // Mengimpor koneksi database

exports.registerAdmin = (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO admin (username, password) VALUES (?, ?)";

  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Error inserting admin:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({
      message: "Admin registered successfully",
      adminId: result.insertId,
    });
  });
};

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM admin WHERE username = ? AND password = ?";

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  });
};
