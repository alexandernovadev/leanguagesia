import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Languages API ",
      version: "2.12.0",
      description: "Documentation Languages API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "http://languages-ai-back.alexandernova.pro",
      },
    ],
  },
  apis: ["./src/app/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
