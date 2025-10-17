// src/middleware/auth.js
require("dotenv").config();

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  const expected = `Basic ${Buffer.from(
    `${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`
  ).toString("base64")}`;

  if (auth === expected) return next();
  return res.status(401).json({ message: "Unauthorized" });
};
