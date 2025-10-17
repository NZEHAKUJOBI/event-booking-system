require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
const Event = require("./models/Event");
const Booking = require("./models/Booking");
const WaitingList = require("./models/WaitingList");

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query("PRAGMA journal_mode = WAL;");

    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("🗂️ Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
