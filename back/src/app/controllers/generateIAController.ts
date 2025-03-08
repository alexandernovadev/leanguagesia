import { Request, Response } from "express";
import { generateTextStreamService } from "../services/ai/generateTextStream";
import { generateWordJson } from "../services/ai/generateWordJson";
import { WordService } from "../services/words/wordService";
import { generateWordExamplesJson } from "../services/ai/generateWordExamplesJson";
import { generateWordExamplesCodeSwithcingJson } from "../services/ai/generateWordExamplesCodeSwithcingJson";
import { generateWordTypesJson } from "../services/ai/generateWordTypesJson";
import { generateWordSynomymsJson } from "../services/ai/generateWordSynomymsJson";

const wordService = new WordService();

export const generateTextStream = async (req: Request, res: Response) => {
  const { prompt, level, typeWrite } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const stream = await generateTextStreamService({
      prompt,
      level,
      typeWrite,
    });

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

export const generateJSONword = async (req: Request, res: Response) => {
  const { prompt, language } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const json = await generateWordJson(prompt, language);

    const wordStructurefinal = {
      ...json,
      language: "en",
      seen: 1,
      level: "hard",
      img: "",
    };

    const newWord = await wordService.createWord(wordStructurefinal);
    return res.status(201).json({
      success: true,
      message: "Word created successfully",
      data: newWord,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error trying to generate JSON word",
      error: error.message || error,
    });
  }
};

export const updatedJSONWordExamples = async (req: Request, res: Response) => {
  const { prompt, language, oldExamples } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }
  const IDWord = req.params.idword;
  try {
    const { examples } = await generateWordExamplesJson(
      prompt,
      language,
      oldExamples
    );

    const updateExamples = await wordService.updateWordExamples(
      IDWord,
      examples
    );

    return res.status(201).json({
      success: true,
      message: "Word examples generated successfully",
      data: updateExamples,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error trying to generate JSON examples word",
      error: error.message || error,
    });
  }
};
export const updatedJSONWordExamplesCodeSwitching = async (
  req: Request,
  res: Response
) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return res.status(400).json({ error: "Word is required." });
  }
  const IDWord = req.params.idword;
  try {
    const { codeSwitching } = await generateWordExamplesCodeSwithcingJson(
      word,
      language,
      oldExamples
    );

    const updateExamples = await wordService.updateWordCodeSwitching(
      IDWord,
      codeSwitching
    );

    return res.status(201).json({
      success: true,
      message: "Word CodeSwiching examples generated successfully",
      data: updateExamples,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error trying to generate JSON  CodeSwiching word",
      error: error.message || error,
    });
  }
};

export const updatedJSONWordTypes = async (req: Request, res: Response) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return res.status(400).json({ error: "Word is required." });
  }
  const IDWord = req.params.idword;
  try {
    const { type } = await generateWordTypesJson(word, language, oldExamples);

    const updateExamples = await wordService.updateWordType(IDWord, type);

    return res.status(201).json({
      success: true,
      message: "Word Types generated successfully",
      data: updateExamples,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error trying to generate JSON Types word",
      error: error.message || error,
    });
  }
};

export const updatedJSONWordSynonyms = async (req: Request, res: Response) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return res.status(400).json({ error: "Word is required." });
  }
  const IDWord = req.params.idword;
  try {
    const { sinonyms } = await generateWordSynomymsJson(
      word,
      language,
      oldExamples
    );

    const updateExamples = await wordService.updateWordSynonyms(
      IDWord,
      sinonyms
    );

    return res.status(201).json({
      success: true,
      message: "Word Sinonyms generated successfully",
      data: updateExamples,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error trying to generate JSON Sinonyms word",
      error: error.message || error,
    });
  }
};
