// routes/textRoutes.ts
import { Router } from "express";
import { generateTextStream } from "../controllers/generateIAController";

export const generateRoutes = Router();

// Define la ruta y asigna el controlador generateTextStream
// @ts-ignore
generateRoutes.post("/generate-text", generateTextStream);


