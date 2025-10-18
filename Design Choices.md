## Design Choices

This project was built using **Node.js** and **Express.js** for simplicity, performance, and scalability.  
I used **Sequelize ORM** with **SQLite** for relational data management, and enabled **transaction handling** to ensure data consistency during concurrent bookings and cancellations.

**Key Design Decisions:**

- **RESTful Architecture:** Clear separation of routes and controllers for maintainability.
- **Concurrency Handling:** Implemented database transactions and `PRAGMA journal_mode = WAL` to handle race conditions safely.
- **Waiting List Logic:** Users are automatically queued when events are sold out, and reassigned when tickets are canceled.
- **Test-Driven Development (TDD):** All core features were written with Jest and Supertest, achieving over 85% test coverage.
- **Error Handling Middleware:** Centralized error handler captures and formats all server errors.
- **Modular Structure:** Separated routes, controllers, models, and middleware for clarity and scalability.
- **Environment Variables:** Managed via `.env` file for clean configuration.
  Built using **Swagger (OpenAPI 3.0)** via `swagger-ui-express` and `swagger-jsdoc`.
  You can test all endpoints directly in the browser.
