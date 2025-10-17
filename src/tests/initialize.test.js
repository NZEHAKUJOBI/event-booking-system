const request = require("supertest");
const app = require("../app");
const sequelize = require("../config/database");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("POST /initialize", () => {
  it("should create a new event with total and available tickets", async () => {
    const res = await request(app)
      .post("/initialize")
      .send({ name: "Tech Summit", totalTickets: 100 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.totalTickets).toBe(100);
    expect(res.body.availableTickets).toBe(100);
  });

  it("should return 400 if name or tickets are missing", async () => {
    const res = await request(app).post("/initialize").send({});
    expect(res.statusCode).toBe(400);
  });
});
