import { Router } from "express";
import {
  generateJSONword,
  generateTextStream,
} from "../controllers/generateIAController";

export const generateRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: AI Generation
 *   description: Endpoints for AI-generated content
 */

/**
 * @swagger
 * /api/ai/generate-text:
 *   post:
 *     summary: Generate a text stream based on a given prompt
 *     tags: [AI Generation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "The importance of renewable energy"
 *               level:
 *                 type: string
 *                 enum: [A1, A2, B1, B2, C1, C2]
 *                 example: "B2"
 *               typeWrite:
 *                 type: string
 *                 example: "Academic Article"
 *             required:
 *               - prompt
 *     responses:
 *       200:
 *         description: Returns a streamed Markdown-formatted text response
 *         content:
 *           text/markdown:
 *             schema:
 *               type: string
 *               example: "# Renewable Energy\n## Importance\nRenewable energy sources..."
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */
generateRoutes.post("/generate-text", generateTextStream);

/**
 * @swagger
 * /api/ai/generate-wordJson:
 *   post:
 *     summary: Generate a JSON object for a word with definitions, examples, and translations
 *     tags: [AI Generation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "challenge"
 *               language:
 *                 type: string
 *                 enum: [en, es, pt]
 *                 default: "en"
 *                 example: "en"
 *             required:
 *               - prompt
 *     responses:
 *       201:
 *         description: Returns a structured JSON with word details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Word created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     word:
 *                       type: string
 *                       example: "challenge"
 *                     language:
 *                       type: string
 *                       example: "en"
 *                     definition:
 *                       type: string
 *                       example: "A difficult task or situation that requires effort to overcome."
 *                     examples:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Starting a new job comes with its own set of challenges."
 *                         - "The project presented several challenges."
 *                     type:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["noun", "verb"]
 *                     IPA:
 *                       type: string
 *                       example: "/ˈtʃæl.ɪn.dʒ/"
 *                     synonyms:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["difficulty", "obstacle", "hurdle"]
 *                     codeSwitching:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Enfrentamos varios challenges al implementar el proyecto."
 *                         - "La vida está llena de challenges que nos ayudan a crecer."
 *                     spanish:
 *                       type: object
 *                       properties:
 *                         definition:
 *                           type: string
 *                           example: "Situaciones o tareas difíciles que requieren esfuerzo y determinación para superarse."
 *                         word:
 *                           type: string
 *                           example: "desafío"
 *       400:
 *         description: Bad request, missing required fields
 *       500:
 *         description: Internal server error
 */
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
