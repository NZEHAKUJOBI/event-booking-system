Design Choices

#This project uses Node.js and Express.js for simplicity, performance, and scalability.
#Sequelize ORM with SQLite provides relational data management and transaction support for concurrency safety.

#Key Decisions:

#RESTful Architecture: Clean separation of routes, controllers, and services.

#Concurrency Control: Database transactions with PRAGMA journal_mode = WAL prevent race conditions.

#Waiting List Logic: Users are automatically queued when events sell out and reassigned on cancellations.

#TDD Approach: Core features tested with Jest and Supertest, achieving >85% coverage.

#Centralized Error Handling: Global middleware for consistent error responses.

#Modular Structure: Independent folders for routes, controllers, models, and middleware.

#Environment Config: .env for credentials and database paths.

#Interactive Docs: Built with Swagger (OpenAPI 3.0) using swagger-ui-express and swagger-jsdoc for live API testing.
