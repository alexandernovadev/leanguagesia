import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

import { fixesSwagger, statisticsSwagger, wordsSwagger } from "./routes";

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
    paths: {
      ...fixesSwagger["paths"],
      ...statisticsSwagger["paths"],
      ...wordsSwagger["paths"],
    },
  },
  apis: ["./src/app/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  if (process.env.NODE_ENV === "development") {
    console.info("Swagger enabled in development mode");
    // @ts-ignore
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  } else {
    console.info("Swagger disabled in production mode");
  }
}
