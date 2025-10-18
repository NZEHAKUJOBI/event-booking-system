const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const setupSwagger = require("./config/swagger");
const eventRoutes = require("./routes/eventRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// === Middleware ===
app.use(express.json());
app.use(morgan("dev"));

// === Rate Limiting (apply early to all routes) ===
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: "Too many requests, try again later." },
});
app.use(limiter);

// === Routes ===
app.get("/", (req, res) => {
  res.json({ message: "Event Booking API running..." });
});

app.use("/", eventRoutes);

// === Swagger Docs ===
setupSwagger(app);

// === Logging (optional custom log per request) ===
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// === Global Error Handler ===
app.use(errorHandler);

module.exports = app;
