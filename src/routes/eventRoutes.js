const express = require("express");
const router = express.Router();
const {
  initializeEvent,
  bookTicket,
  cancelBooking,
  getEventStatus,
} = require("../controllers/eventController");
const basicAuth = require("../middleware/basicAuth");

/**
 * @swagger
 * /initialize:
 *   post:
 *     summary: Initialize a new event
 *     description: Creates an event with a specified number of tickets.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               totalTickets:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Event initialized successfully
 *       400:
 *         description: Invalid input
 */
router.post("/initialize", basicAuth, initializeEvent);

/**
 * @swagger
 * /book:
 *   post:
 *     summary: Book a ticket for a user
 *     description: Books a ticket or adds the user to the waiting list if sold out.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Ticket booked successfully
 *       200:
 *         description: Added to waiting list
 *       400:
 *         description: Bad request
 */
router.post("/book", bookTicket);

/**
 * @swagger
 * /cancel:
 *   post:
 *     summary: Cancel a booking
 *     description: Cancels a user’s booking and assigns the ticket to the next waiting user if any.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: Booking not found
 */
router.post("/cancel", basicAuth, cancelBooking);

/**
 * @swagger
 * /status/{eventId}:
 *   get:
 *     summary: Get event status
 *     description: Returns available tickets and waiting list count for a specific event.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Successfully retrieved event status
 *       404:
 *         description: Event not found
 */
router.get("/status/:eventId", getEventStatus);

module.exports = router;
