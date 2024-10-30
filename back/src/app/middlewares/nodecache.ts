import express, { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
const app = express();

export const nodeCacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.json(cachedResponse); // Envía la respuesta en formato JSON
  } else {
    // Guardamos la función original `res.json`
    const originalJson = res.json.bind(res);

    res.json = (body: any): Response => {
      cache.set(key, body); // Guardamos la respuesta en caché
      return originalJson(body); // Enviamos la respuesta original en JSON
    };

    next();
  }
};
