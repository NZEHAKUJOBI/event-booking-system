const { Sequelize } = require("sequelize");

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? ":memory:" : "event.db",
  logging: false,
  dialectOptions: {
    timeout: 10000, // wait up to 10s before SQLITE_BUSY
  },
});

// Enable WAL mode for concurrent writes
sequelize
  .query("PRAGMA journal_mode = WAL;")
  .then(() => sequelize.query("PRAGMA busy_timeout = 10000;"))
  .catch((err) => console.error("Failed to set WAL mode:", err));

module.exports = sequelize;
