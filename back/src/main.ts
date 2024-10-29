import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { generateRoutes } from "./app/routes/generatorIARoutes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors());


// Routes
app.use("/api/ai", generateRoutes);

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong: " + err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
