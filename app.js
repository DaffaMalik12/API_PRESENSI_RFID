const express = require("express");
const bodyParser = require("body-parser");
const attendanceRoutes = require("./routes/attendanceRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(attendanceRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
