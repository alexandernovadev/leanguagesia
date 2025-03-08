import { Request, Response } from "express";
import Word, { IWord } from "../db/models/Word";

export const arreglosmaricasrapidos = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // Actualizar el campo `level` de todos los documentos a "hard"
    // const result = await Word.updateMany({}, { level: "hard" });

    return res.status(200).json({
      success: true,
      message: "FIxed quick done",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating words level" });
  }
};
