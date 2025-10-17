const request = require("supertest");
const express = require("express");
const errorHandler = require("../middleware/errorHandler");

const app = express();

// Force an error route
app.get("/error", (req, res, next) => {
  next(new Error("Test error"));
});

// Attach middleware
app.use(errorHandler);

describe("Error handler middleware", () => {
  it("should handle errors and return 500", async () => {
    const res = await request(app).get("/error");
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/Test error/);
  });
});
