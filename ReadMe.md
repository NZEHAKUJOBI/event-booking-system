# 🎟️ Event Ticket Booking System (Node.js + Express + SQLite)

A RESTful API demonstrating **concurrency-safe ticket booking** with waiting list management, cancellation handling, and full TDD coverage.

---

## Features

- Initialize events with limited ticket counts
- Book tickets with automatic waiting list when sold out
- Cancel bookings with automatic reassignment to waiting users
- View real-time event status (available + waiting list count)
- Thread-safe transactions using SQLite WAL mode
- Full **TDD (Jest + Supertest)** with >85% coverage
- **Rate limiting** and **Basic Authentication** for secure endpoints
- Centralized **error handling** and structured **logging**
- Fully interactive **Swagger documentation** at  
  **[http://localhost:4000/api-docs/](http://localhost:4000/api-docs/)**

---

## 🧱 Project Structure

## 🧱 Project Structure

src/
┣ config/
┃ ┣ database.js # Sequelize + SQLite configuration
┃ ┗ swagger.js # Swagger (OpenAPI 3.0) configuration
┣ controllers/
┃ ┗ eventController.js # Core booking and cancellation logic
┣ middleware/
┃ ┗ errorHandler.js # Global error handler
┣ models/
┃ ┣ Event.js
┃ ┣ Booking.js
┃ ┗ WaitingList.js
┣ routes/
┃ ┗ eventRoutes.js # API route definitions
┣ tests/
┃ ┗ \*.test.js # Jest + Supertest test suites
┣ app.js # Express app setup
┗ server.js # Entry point

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
