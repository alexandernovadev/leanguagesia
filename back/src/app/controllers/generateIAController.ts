import { Request, Response } from "express";
import { generateTextStreamService } from "../services/generateTextStream";

export const generateTextStream = async (req: Request, res: Response) => {
  const { prompt, level,typeWrite } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const stream = await generateTextStreamService({ prompt,level,typeWrite });

    res.setHeader("Content-Type", "application/json");
    res.flushHeaders();

    // Read the stream and send the data to the client
    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || "";
      res.write(piece);
    }

    // Close the stream when done
    res.end();
  } catch (error) {
    res.status(500).json({
      message: "Error trying to generate text stream",
      error,
    });
  }
};

/*
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
      const { audio, subtitles } = await textToAudioUseCase({ prompt, voice });

      // Send back the file path or stream the file to the user
      res.status(200).json({ audio, subtitles });
    } catch (error) {
      next(error); // Forward the error to error-handling middleware
    }
  }
);
*/
