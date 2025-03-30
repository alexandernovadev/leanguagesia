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
  errorMessage: any,
  statusCode = 400,
  errordata?: any
) => {
  // Register the error in the logs
  logger.error("Error Response:", {
    message: errorMessage,
    stack: errordata || "No stack available",
  });

  return res.status(statusCode).json({ success: false, error: errorMessage });
};
