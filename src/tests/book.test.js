// src/tests/book.test.js
const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const Event = require("../models/Event");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("POST /book", () => {
  let event;

  beforeAll(async () => {
    event = await Event.create({
      name: "Tech Fest",
      totalTickets: 2,
      availableTickets: 2,
    });
  });

  it("should book a ticket when available", async () => {
    const res = await request(app)
      .post("/book")
      .send({ userId: "user1", eventId: event.id });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("booked");
  });

  it("should add user to waiting list when sold out", async () => {
    await request(app)
      .post("/book")
      .send({ userId: "user2", eventId: event.id });
    const res = await request(app)
      .post("/book")
      .send({ userId: "user3", eventId: event.id });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/added to waiting list/i);
  });

  it("should handle missing fields", async () => {
    const res = await request(app).post("/book").send({});
    expect(res.statusCode).toBe(400);
  });
});
