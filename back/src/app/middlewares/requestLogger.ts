// requestLogger.ts
import { Request, Response, NextFunction } from "express";
import logger from "../utlis/logger";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Evitar registrar favicon
  if (req.originalUrl === "/favicon.ico") {
    return next();
  }

  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const responseTime = diff[0] * 1e3 + diff[1] / 1e6;

    const dataLog = res.locals.userResponse
      ? `UserResponser: ${JSON.stringify(res.locals.userResponse, null, 2)}`
      : `Data: ${JSON.stringify(req.body, null, 2)}`;

    // Log estructurado
    const logMessage = `
🚀 Incoming Request:
  👉 Method: ${req.method}
  🌐 URL: ${req.originalUrl}
  💻 Client IP: ${req.ip}
  📱 User-Agent: ${req.headers["user-agent"]}
  📦 Content-Length: ${req.headers["content-length"] || 0}
  ⏳ Response Time: ${responseTime.toFixed(2)} ms
  ✅ Status: ${res.statusCode}
  ${dataLog}
    `.trim(); // Eliminar espacios innecesarios

    logger.info(logMessage);
  });

  next();
};
