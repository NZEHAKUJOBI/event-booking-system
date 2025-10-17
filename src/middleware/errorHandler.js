module.exports = (err, req, res, next) => {
  console.error("Error handler:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
