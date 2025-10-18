# 🎟️ Event Ticket Booking System (Node.js + Express + SQLite)

A RESTful API demonstrating **concurrency-safe ticket booking** with waiting list management, cancellation handling, and full TDD coverage.

---

🚀 Features

Initialize events with limited ticket counts

Book tickets with automatic waiting list when sold out

Cancel bookings with automatic reassignment

View event status (available + waiting list count)

Thread-safe SQLite using WAL mode

TDD (Jest + Supertest) with >85% coverage

Basic Authentication and rate limiting for sensitive operations

Centralized error handling and structured logging

Interactive Swagger Docs → http://localhost:4000/api-docs

---

## 🧱 Project Structure

## 🧱 Project Structure

src/
┣ config/
┃ ┣ database.js # Sequelize + SQLite setup
┃ ┗ swagger.js # Swagger (OpenAPI 3.0)
┣ controllers/
┃ ┗ eventController.js
┣ middleware/
┃ ┣ basicAuth.js # Basic Authentication
┃ ┗ errorHandler.js # Global error handling
┣ models/
┃ ┣ Event.js
┃ ┣ Booking.js
┃ ┗ WaitingList.js
┣ routes/
┃ ┗ eventRoutes.js
┣ tests/
┃ ┗ \*.test.js
┣ app.js
┗ server.js

## 🧭 Quick Start

Follow these steps to get your Event Booking System running locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/event-booking-system.git
cd event-booking-system

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a .env file in the project root
# (Use the template below)
echo "SERVER_URL=http://localhost:4000" > .env
echo "DB_DIALECT=sqlite" >> .env
echo "DB_STORAGE=event.db" >> .env

# 4️⃣ Start the development server
npm run dev

# 5️⃣ Run all tests
npm test


```
