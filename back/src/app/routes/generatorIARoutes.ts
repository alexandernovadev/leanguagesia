// routes/textRoutes.ts
import { Router } from "express";
import { generateJSONword, generateTextStream } from "../controllers/generateIAController";

export const generateRoutes = Router();

generateRoutes.post("/generate-text", generateTextStream);

generateRoutes.post("/generate-wordJson", generateJSONword);


