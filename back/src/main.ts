import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { generateText } from "./app/services/generateText";
import { textToAudioUseCase } from "./app/services/generateAudio";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get(
  "/",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const prompt = "Paises de america";

    try {
      const response = await generateText(prompt);
      res.json(response);
    } catch (error) {
      next(error); // Forward the error to error-handling middleware
    }
  }
);

app.post(
  "/generate-audio",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { prompt, voice } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt is required." });
      return;
    }

    try {
      // Call the textToAudioUseCase to generate the audio file
      const speechFile = await textToAudioUseCase({ prompt, voice });

      // Send back the file path or stream the file to the user
      res.status(200).json({ filePath: speechFile });
    } catch (error) {
      next(error); // Forward the error to error-handling middleware
    }
  }
);

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong: " + err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
