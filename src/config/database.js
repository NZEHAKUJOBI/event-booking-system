const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  logging: false,
  retry: {
    max: 5, // retry 5 times if DB is busy
  },
  dialectOptions: {
    timeout: 20000, // wait longer before giving up
  },
});

module.exports = sequelize;
