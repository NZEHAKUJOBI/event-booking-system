const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalTickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableTickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
module.exports = Event;
