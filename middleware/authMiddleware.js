const jwt = require("jsonwebtoken");

process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, JWT_SECRET, (err, admin) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.admin = admin;
    next();
  });
}

module.exports = { authenticateToken };
