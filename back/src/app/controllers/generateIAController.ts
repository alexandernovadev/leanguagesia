import { Request, Response } from "express";

import { generateTextStreamService } from "../services/ai/generateTextStream";
import { generateWordJson } from "../services/ai/generateWordJson";
import { WordService } from "../services/words/wordService";
import { generateWordExamplesJson } from "../services/ai/generateWordExamplesJson";
import { generateWordExamplesCodeSwithcingJson } from "../services/ai/generateWordExamplesCodeSwithcingJson";
import { generateWordTypesJson } from "../services/ai/generateWordTypesJson";
import { generateWordSynomymsJson } from "../services/ai/generateWordSynomymsJson";
import { generateImage } from "../services/ai/generateImage";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../services/cloudinary/cloudinaryService";

import { errorResponse, successResponse } from "../utils/responseHelpers";
import { imageWordPrompt } from "./helpers/ImagePrompt";

const wordService = new WordService();

/**
 * Generate Image with AI Save in cloudinary and update Word
 */
export const updateImageWord = async (req, res) => {
  const { word, imgOld } = req.body;
  const IDWord = req.params.idword;

  if (!word) {
    return errorResponse(res, "Prompt is required.", 400);
  }

  try {
    // Generate image with DALL·E 3
    const imageBase64 = await generateImage(imageWordPrompt(word));
    if (!imageBase64) {
      return errorResponse(res, "Failed to generate image.", 400);
    }

    let deleteOldImagePromise: Promise<void> = Promise.resolve();

    if (imgOld && imgOld.includes("res.cloudinary.com")) {
      const parts = imgOld.split("/");
      let publicId = parts.pop();

      // Handle casoes where there is not extenxion
      if (publicId.includes(".")) {
        publicId = publicId.split(".")[0]; // Remove extenxion if exist
      }

      // Make sure htat deleteImageFromCloudinary return promise type void
      deleteOldImagePromise = deleteImageFromCloudinary(
        "languagesai/words/" + publicId
      ).then(() => {});
    }

    // Upload new image on parallel whithin removig image
    const [_, urlImage] = await Promise.all([
      deleteOldImagePromise,
      uploadImageToCloudinary(imageBase64, "words"),
    ]);

    // Update image
    const updateImageWord = await wordService.updateWordImg(IDWord, urlImage);

    return successResponse(
      res,
      "Word Image generated successfully",
      updateImageWord
    );
  } catch (error) {
    return errorResponse(res, "Error generating image \n" + error);
  }
};

export const generateTextStream = async (req: Request, res: Response) => {
  const { prompt, level, typeWrite, addEasyWords } = req.body;

  if (!prompt) {
    return errorResponse(res, "Prompt is required.", 400);
  }

  try {
    let promptAddEasyWords = "";

    if (addEasyWords) {
      const getEasyWords = await wordService.getLastEasyWords();
      const wordsArray = getEasyWords.map((item) => item.word);
      promptAddEasyWords =
        `- Its' IMPORTANT that add these words | ${wordsArray.join(
          ", "
        )}|  to the lecture 
      because the user needs to remember those ones.`.trim();
    }

    const stream = await generateTextStreamService({
      prompt,
      level,
      typeWrite,
      promptAddEasyWords,
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
    return errorResponse(
      res,
      "Error trying to generate text stream \n" + error,
      500
    );
  }
};

export const generateJSONword = async (req: Request, res: Response) => {
  const { prompt, language } = req.body;

  if (!prompt) {
    return errorResponse(res, "Prompt is required.", 400);
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

    return successResponse(res, "Generate word JSON successfully", newWord);
  } catch (error) {
    return errorResponse(
      res,
      "Error trying to generate JSON word \n" + error,
      500
    );
  }
};

export const updatedJSONWordExamples = async (req: Request, res: Response) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return errorResponse(res, "Word is required.", 400);
  }
  const IDWord = req.params.idword;
  try {
    const { examples } = await generateWordExamplesJson(
      word,
      language,
      oldExamples
    );

    const updateExamples = await wordService.updateWordExamples(
      IDWord,
      examples
    );

    return successResponse(
      res,
      "updated JSON Word Examples word JSON successfully",
      updateExamples,
      201
    );
  } catch (error) {
    return errorResponse(
      res,
      "Error trying to Update JSON Word \n" + error,
      500
    );
  }
};

export const updatedJSONWordExamplesCodeSwitching = async (
  req: Request,
  res: Response
) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return errorResponse(res, "Word is required.", 400);
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

    return successResponse(
      res,
      "updated JSON Code Swithing JSON successfully",
      updateExamples,
      201
    );
  } catch (error) {
    return errorResponse(
      res,
      "Error trying to Update JSON Word Examples \n" + error,
      500
    );
  }
};

export const updatedJSONWordTypes = async (req: Request, res: Response) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return errorResponse(res, "Word is required.", 400);
  }
  const IDWord = req.params.idword;
  try {
    const { type } = await generateWordTypesJson(word, language, oldExamples);

    const updateExamples = await wordService.updateWordType(IDWord, type);

    return successResponse(
      res,
      "updated JSON Types successfully",
      updateExamples,
      201
    );
  } catch (error) {
    return errorResponse(
      res,
      "Error trying to Update JSON Word Types \n" + error,
      500
    );
  }
};

export const updatedJSONWordSynonyms = async (req: Request, res: Response) => {
  const { word, language, oldExamples } = req.body;

  if (!word) {
    return errorResponse(res, "Word is required.", 400);
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

    return successResponse(
      res,
      "Word Sinonyms generated successfully",
      updateExamples,
      201
    );
  } catch (error) {
    return errorResponse(
      res,
      "Error trying to Update JSON Word Synonyms \n" + error,
      500
    );
  }
};
