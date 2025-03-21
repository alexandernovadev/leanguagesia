import { Router } from "express";
import {
  generateJSONword,
  generateTextStream,
  updatedJSONWordExamples,
  updatedJSONWordExamplesCodeSwitching,
  updatedJSONWordSynonyms,
  updatedJSONWordTypes,
  updateImageWord,
} from "../controllers/generateIAController";

export const generateRoutes = Router();

generateRoutes.post("/generate-text", generateTextStream);
generateRoutes.post("/generate-wordJson", generateJSONword);
generateRoutes.post("/generate-image/:idword", updateImageWord);

generateRoutes.put("/generate-word-examples/:idword", updatedJSONWordExamples);
generateRoutes.put(
  "/generate-code-switching/:idword",
  updatedJSONWordExamplesCodeSwitching
);

generateRoutes.put("/generate-word-wordtypes/:idword", updatedJSONWordTypes);
generateRoutes.put("/generate-code-synonyms/:idword", updatedJSONWordSynonyms);

