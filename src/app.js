const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

app.use(morgan("dev"));
app.use(express.json());
app.use(eventRoutes);

// Force an error route
app.get("/error", (req, res, next) => {
  next(new Error("Test error"));
});

app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({ message: "Event Booking API running..." });
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // max 10 requests per minute per IP
  message: { message: "Too many requests, try again later." },
});

app.use(limiter);

module.exports = app;
