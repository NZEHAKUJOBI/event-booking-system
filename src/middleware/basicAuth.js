const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
  const [username, password] = credentials.split(":");

  const ADMIN_USER = process.env.ADMIN_USER || "admin";
  const ADMIN_PASS = process.env.ADMIN_PASS || "secret";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return next();
  }

  return res.status(403).json({ message: "Access denied" });
};

module.exports = basicAuth;
