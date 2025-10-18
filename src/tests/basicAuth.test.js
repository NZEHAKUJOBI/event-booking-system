const request = require("supertest");
const express = require("express");
const basicAuth = require("../middleware/basicAuth");

const app = express();

// A protected route using the middleware
app.get("/protected", basicAuth, (req, res) => {
  res.json({ message: "Authorized access" });
});

describe("Basic Authentication Middleware", () => {
  it("should return 401 if Authorization header is missing", async () => {
    const res = await request(app).get("/protected");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/missing or invalid/i);
  });

  it("should return 403 if credentials are invalid", async () => {
    const badCredentials = Buffer.from("wrong:credentials").toString("base64");
    const res = await request(app)
      .get("/protected")
      .set("Authorization", `Basic ${badCredentials}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/access denied/i);
  });

  it("should allow access for valid credentials", async () => {
    const validCredentials = Buffer.from("admin:secret").toString("base64");
    const res = await request(app)
      .get("/protected")
      .set("Authorization", `Basic ${validCredentials}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/authorized/i);
  });
});
