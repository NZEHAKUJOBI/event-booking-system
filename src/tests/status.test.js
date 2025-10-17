// src/tests/status.test.js
const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");
const Event = require("../models/Event");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("GET /status/:eventId", () => {
  let event;

  beforeAll(async () => {
    event = await Event.create({
      name: "Code Conference",
      totalTickets: 2,
      availableTickets: 1,
    });
    await request(app)
      .post("/book")
      .send({ userId: "userA", eventId: event.id });
    await request(app)
      .post("/book")
      .send({ userId: "userB", eventId: event.id }); // waiting list
  });

  it("should return current event status", async () => {
    const res = await request(app).get(`/status/${event.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("availableTickets");
    expect(res.body).toHaveProperty("waitingListCount");
  });

  it("should return 404 for invalid event id", async () => {
    const res = await request(app).get(`/status/999`);
    expect(res.statusCode).toBe(404);
  });
});
