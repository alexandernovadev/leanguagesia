import { Response } from "express";
import logger from "./logger";

export const successResponse = (
  res: Response,
  message = "Success",
  data: any,
  statusCode = 200
) => {
  return res.status(statusCode).json({ success: true, data, message });
};

export const errorResponse = (
  res: Response,
  error: any,
  statusCode = 400
) => {
  // Si el error es un objeto, imprime el mensaje, si no, imprime el error completo
  const errorMessage = error instanceof Error ? error.message : error;

  // Registra el error
  logger.error("Error Response:", {
    message: errorMessage,
    stack: error.stack || "No stack available",
  });

  return res.status(statusCode).json({ success: false, error: errorMessage });
};
