import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./app/db/mongoConnection";

// Routes
import { generateRoutes } from "./app/routes/generatorIARoutes";
import LectureRoutes from "./app/routes/lectureRoutes";
import WordsRoutes from "./app/routes/wordsRoutes";
import Arreglosquick from "./app/routes/arreglosquick";
import { setupSwagger } from "../swaggerConfig";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "V. March 8 2025 4:40 PM";

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors());

// Swagger Conf
setupSwagger(app);

// Connection to MongoDB
connectDB()
  .then(() => {
    console.log("Connection to MongoDB established successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/api/ai", generateRoutes);
app.use("/api/lectures", LectureRoutes);
app.use("/api/words", WordsRoutes);

// Just for testing purposes
app.use("/api/fixes", Arreglosquick);

app.use("/", (req, res) => {
  // send json saying that the server is running
  res.json({
    message: "Server is running",
    date: new Date().toISOString(),
    version: VERSION,
  });
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong: " + err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
