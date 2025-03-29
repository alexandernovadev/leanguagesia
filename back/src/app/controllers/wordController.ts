import { Request, Response } from "express";
import { WordService } from "../services/words/wordService";

// Todo Remove this funtipn Mongo has mehtos to do it
import { shuffleArray } from "../utlis/shuffle";
import { errorResponse, successResponse } from "../utlis/responseHelpers";

const wordService = new WordService();

export const getWordByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Forzamos el tipo a `string`, y si es un array, tomamos el primer elemento.
    const word = (req.params.word || req.query.word) as string | undefined;

    // Verificamos que `word` sea un `string` y no esté vacío.
    if (!word || Array.isArray(word)) {
      return errorResponse(res, "A single word parameter is required");
    }

    const foundWord = await wordService.findWordByWord(word);
    if (!foundWord) {
      return errorResponse(res, "Word not found", 404);
    }

    return successResponse(res, "Get Word successFully", foundWord);
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while getting the word \n" + error,
      500
    );
  }
};

export const createWord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const wordData = req.body;
    const newWord = await wordService.createWord(wordData);

    return successResponse(res, "Word created successfully", newWord, 201);
  } catch (error) {
    if (error.name === "ValidationError") {
      return errorResponse(res, "Validation error" + error);
    }
    return errorResponse(
      res,
      "An error occurred while creating the word \n" + error,
      500
    );
  }
};

export const getWordById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const word = await wordService.getWordById(id);
    if (!word) {
      return errorResponse(res, "Word not found", 404);
    }

    return successResponse(res, "Word listed by Id successfully", word);
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while retrieving the word \n" + error,
      500
    );
  }
};

export const getWords = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const wordUser = req.query.wordUser as string;
    const wordList = await wordService.getWords(page, limit, wordUser);

    return successResponse(res, "Words sucessfully listed", wordList);
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while retrieving the word \n" + error,
      500
    );
  }
};

export const updateWord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedWord = await wordService.updateWord(id, updateData);
    if (!updatedWord) {
      return errorResponse(res, "Word not found", 404);
    }
    return successResponse(res, "Word updated successfully", updatedWord);
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while updating the word \n" + error,
      500
    );
  }
};

export const updateWordLevel = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const level = req.body.level;

    const updatedWord = await wordService.updateWordLevel(id, level);
    if (!updatedWord) {
      return errorResponse(res, "Word not found", 404);
    }

    return successResponse(res, "Word level updated successfully", updatedWord);
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while updating level the word \n" + error,
      500
    );
  }
};

export const deleteWord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedWord = await wordService.deleteWord(id);
    if (!deletedWord) {
      return errorResponse(res, "Word no found by ID: " + id, 403);
    }

    return successResponse(res, "Word deleted successfully", {});
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while deleting the word \n" + error,
      500
    );
  }
};

export const getRecentHardOrMediumWords = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const words = await wordService.getRecentHardOrMediumWords();

    const shuffledWords = shuffleArray(words);

    return successResponse(
      res,
      "List Recent Hard Or Medium Words successfully",
      shuffledWords
    );
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while retrieving recent hard or medium words \n" +
        error,
      500
    );
  }
};

export const updateIncrementWordSeens = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updatedWord = await wordService.incrementWordSeen(id);

    if (!updatedWord) {
      return errorResponse(res, "Word Not Found ", 404);
    }

    return successResponse(
      res,
      "Word seen count incremented successfully",
      updatedWord
    );
  } catch (error) {
    return errorResponse(
      res,
      "An error occurred while incrementing the word seen count \n" + error,
      500
    );
  }
};
