// routes/textRoutes.ts
import { Router } from "express";
import { generateJSONword, generateTextStream } from "../controllers/generateIAController";

export const generateRoutes = Router();

generateRoutes.post("post", generateTextStream);
generateRoutes.post("/generate-wordJson", generateJSONword);

// ToDo: update Image
// router.post("generate-image", generateImage);

// ToDo: update Examaples
// router.post("/generate-word-examples", generateWordExamples);

// ToDo: update Code Switching
// router.post("/generate-code-switching", generateWordCodeSwitching);

// ToDo: update Code Synonyms
// router.post("/generate-word-synonyms", generateWordSynonyms);

// ToDo: update Code WordTypes
// router.post("/generate-code-wordTypes", generateWordTypes);


