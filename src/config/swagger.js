const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const SERVER_URL = process.env.SERVER_URL || "http://localhost:4000";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Event Booking System API",
      version: "1.0.0",
      description:
        "A simple event ticket booking system built with Node.js, Express, and Sequelize.\n\nFeatures include booking, cancellation, waiting list management, and status tracking.",
    },
    servers: [
      {
        url: SERVER_URL,
        description: "Local server",
      },
    ],

    // ✅ Add Basic Auth security definition
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
    },

    // ✅ Apply Basic Auth globally (affects all routes unless overridden)
    security: [
      {
        basicAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // points to route files for documentation
};

const swaggerSpec = swaggerJsDoc(options);

function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`✅ Swagger Docs available at ${SERVER_URL}/api-docs`);
}

module.exports = setupSwagger;
