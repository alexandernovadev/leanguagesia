import { Response } from "express";

export const successResponse = (
  res: Response,
  message = "Success",
  data: any,
  code = 200
) => {
  return res.status(code).json({ success: true, data, message });
};

export const errorResponse = (res: Response, error: any, statusCode = 400) => {
  return res.status(statusCode).json({ success: false, error });
};
