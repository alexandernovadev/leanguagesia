import { Request, Response } from "express";
import { WordService } from "../services/words/wordService";

const wordService = new WordService();

// Obtener una palabra por nombre (ignorando mayúsculas y minúsculas)
export const findWordByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Forzamos el tipo a `string`, y si es un array, tomamos el primer elemento.
    const word = (req.params.word || req.query.word) as string | undefined;

    // Verificamos que `word` sea un `string` y no esté vacío.
    if (!word || Array.isArray(word)) {
      return res.status(400).json({
        success: false,
        message: "A single word parameter is required",
      });
    }

    const foundWord = await wordService.findWordByWord(word);
    if (!foundWord) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: foundWord,
    });
  } catch (error) {
    console.error("Error finding word:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while finding the word",
    });
  }
};

export const createWord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const wordData = req.body;
    const newWord = await wordService.createWord(wordData);
    return res.status(201).json({
      success: true,
      message: "Word created successfully",
      data: newWord,
    });
  } catch (error) {
    console.error("Error creating word:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }
    return res.status(500).json({
      success: false,
      message: "An error occurred while creating the word",
    });
  }
};

// Obtener una palabra por ID
export const getWordById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const word = await wordService.getWordById(id);
    if (!word) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: word,
    });
  } catch (error) {
    console.error("Error retrieving word:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the word",
    });
  }
};

// Obtener todas las palabras con paginación
export const getWords = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await wordService.getWords(page, limit);
    return res.status(200).json({
      success: true,
      data: result.data,
      pagination: {
        total: result.total,
        page: result.page,
        pages: result.pages,
      },
    });
  } catch (error) {
    console.error("Error retrieving words:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while retrieving words",
    });
  }
};

// Actualizar una palabra por ID
export const updateWord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedWord = await wordService.updateWord(id, updateData);
    if (!updatedWord) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Word updated successfully",
      data: updatedWord,
    });
  } catch (error) {
    console.error("Error updating word:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the word",
    });
  }
};

// Eliminar una palabra por ID
export const deleteWord = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedWord = await wordService.deleteWord(id);
    if (!deletedWord) {
      return res.status(404).json({
        success: false,
        message: "Word not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Word deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting word:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the word",
    });
  }
};
