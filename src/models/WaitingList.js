// src/models/WaitingList.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event");

const WaitingList = sequelize.define("WaitingList", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// ✅ Correct association
Event.hasMany(WaitingList, { foreignKey: "eventId", onDelete: "CASCADE" });
WaitingList.belongsTo(Event, { foreignKey: "eventId" });

module.exports = WaitingList;
