const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event");

const Booking = sequelize.define("Booking", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("booked", "cancelled"),
    defaultValue: "booked",
  },
});

Event.hasMany(Booking, { foreignKey: "eventId", onDelete: "CASCADE" });
Booking.belongsTo(Event, { foreignKey: "eventId" });

module.exports = Booking;
