// Controllers/adminController.js
const db = require("../models/db"); // Mengimpor koneksi database
const bcrypt = require("bcrypt"); // Mengimpor bcrypt untuk hashing password

// Fungsi registerAdmin dengan hashing password
exports.registerAdmin = (req, res) => {
  const { username, password, email } = req.body;

  // Hash password sebelum menyimpannya
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Error encrypting password" });
    }

    const query =
      "INSERT INTO admin (username, password, email) VALUES (?, ?, ?)";

    db.query(query, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error("Error inserting admin:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        message: "Admin registered successfully",
        adminId: result.insertId,
      });
    });
  });
};

// Fungsi loginAdmin dengan verifikasi hash password
exports.loginAdmin = (req, res) => {
  console.log("Request body:", req.body);
  const { email, password } = req.body;
  console.log("Login attempt for email:", email);

  const query = "SELECT * FROM admin WHERE email = ?";

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error logging in:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Results:", results);

    if (results.length === 0) {
      console.log("No user found with the email");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const admin = results[0];
    console.log("Admin data retrieved:", admin);

    // Verifikasi password dengan bcrypt
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing password:", err);
        return res.status(500).json({ error: "Error verifying password" });
      }
      console.log("Password match:", isMatch);

      if (!isMatch) {
        console.log("Password did not match");
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ message: "Login successful" });
    });
  });
};
