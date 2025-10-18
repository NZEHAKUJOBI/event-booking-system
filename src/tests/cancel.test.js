const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const Event = require("../models/Event");

// Basic Auth header for admin:secret
const authHeader = `Basic ${Buffer.from("admin:secret").toString("base64")}`;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("POST /cancel", () => {
  let event;

  beforeAll(async () => {
    event = await Event.create({
      name: "Music Fest",
      totalTickets: 1,
      availableTickets: 1,
    });

    // Booked user
    await request(app)
      .post("/book")
      .send({ userId: "user1", eventId: event.id });

    // Waiting list user
    await request(app)
      .post("/book")
      .send({ userId: "user2", eventId: event.id });
  });

  it("should cancel a booking and assign next waiting user", async () => {
    const res = await request(app)
      .post("/cancel")
      .set("Authorization", authHeader) // ✅ add auth
      .send({ userId: "user1", eventId: event.id });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/ticket reassigned/i);
  });

  it("should return 404 if booking not found", async () => {
    const res = await request(app)
      .post("/cancel")
      .set("Authorization", authHeader) // ✅ add auth
      .send({ userId: "unknown", eventId: event.id });

    expect(res.statusCode).toBe(404);
  });
});
