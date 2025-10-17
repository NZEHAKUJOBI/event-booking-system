const Event = require("../models/Event");
const Booking = require("../models/Booking");
const WaitingList = require("../models/WaitingList");
const sequelize = require("../config/database");

exports.initializeEvent = async (req, res) => {
  try {
    const { name, totalTickets } = req.body;

    if (!name || !totalTickets)
      return res
        .status(400)
        .json({ message: "Name and totalTickets are required" });

    const event = await Event.create({
      name,
      totalTickets,
      availableTickets: totalTickets,
    });

    return res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.bookTicket = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId)
    return res.status(400).json({ message: "userId and eventId are required" });

  const transaction = await sequelize.transaction();

  try {
    const event = await Event.findByPk(eventId, { transaction, lock: true });

    if (!event) {
      await transaction.rollback();
      return res.status(404).json({ message: "Event not found" });
    }

    // If tickets are still available
    if (event.availableTickets > 0) {
      event.availableTickets -= 1;
      await event.save({ transaction });

      const booking = await Booking.create(
        { userId, eventId, status: "booked" },
        { transaction }
      );

      await transaction.commit();
      return res.status(201).json(booking);
    }

    // Otherwise, add to waiting list
    const position = await WaitingList.count({ where: { eventId } });
    await WaitingList.create(
      { userId, eventId, position: position + 1 },
      { transaction }
    );

    await transaction.commit();
    return res
      .status(200)
      .json({ message: "Event sold out. User added to waiting list." });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  const { userId, eventId } = req.body;
  if (!userId || !eventId)
    return res.status(400).json({ message: "userId and eventId are required" });

  const transaction = await sequelize.transaction();
  try {
    const booking = await Booking.findOne({
      where: { userId, eventId, status: "booked" },
      transaction,
      lock: true,
    });

    if (!booking) {
      await transaction.rollback();
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save({ transaction });

    const event = await Event.findByPk(eventId, { transaction, lock: true });
    event.availableTickets += 1;
    await event.save({ transaction });

    // Check waiting list
    const nextInLine = await WaitingList.findOne({
      where: { eventId },
      order: [["position", "ASC"]],
      transaction,
      lock: true,
    });

    if (nextInLine) {
      // Assign ticket to waiting user
      await Booking.create(
        { userId: nextInLine.userId, eventId, status: "booked" },
        { transaction }
      );

      await nextInLine.destroy({ transaction });
      event.availableTickets -= 1;
      await event.save({ transaction });
      await transaction.commit();

      return res.status(200).json({
        message: `Booking cancelled and ticket reassigned to ${nextInLine.userId}`,
      });
    }

    await transaction.commit();
    return res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    await transaction.rollback();
    res.status(500).json({ message: "Server error" });
  }
};
exports.getEventStatus = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const totalBookings = await event.countBookings();
    const waitingListCount = await event.countWaitingLists();

    res.status(200).json({
      eventId: event.id,
      name: event.name,
      totalTickets: event.totalTickets,
      availableTickets: event.availableTickets,
      totalBookings,
      waitingListCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
