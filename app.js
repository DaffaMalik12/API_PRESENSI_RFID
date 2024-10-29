const express = require("express");
const bodyParser = require("body-parser");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();
const cors = require("cors");

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "*", // Ganti dengan URL frontend Anda jika sudah ada
  })
);

// Routes tanpa prefix '/api'
app.use(attendanceRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
