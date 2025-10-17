const express = require("express");
const router = express.Router();
const {
  initializeEvent,
  bookTicket,
  cancelBooking,
  getEventStatus,
} = require("../controllers/eventController");

router.post("/initialize", initializeEvent);
router.post("/book", bookTicket);
router.post("/cancel", cancelBooking);
router.get("/status/:eventId", getEventStatus);

module.exports = router;
