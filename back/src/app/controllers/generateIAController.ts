import { Request, Response } from "express";
import { generateTextStreamService } from "../services/ai/generateTextStream";

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

