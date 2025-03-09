import { Router } from "express";
import {
  generateJSONword,
  generateTextStream,
  updatedJSONWordExamples,
  updatedJSONWordExamplesCodeSwitching,
  updatedJSONWordSynonyms,
  updatedJSONWordTypes,
  updateImageWord
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

/**
 * @swagger
 * /api/ai/generate-word-examples/{idword}:
 *   put:
 *     summary: Generate and update word examples using AI
 *     tags: [AI Generation]
 *     parameters:
 *       - in: path
 *         name: idword
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the word to update with AI-generated examples
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "challenge"
 *               language:
 *                 type: string
 *                 enum: [en, es, pt]
 *                 default: "en"
 *                 example: "en"
 *               oldExamples:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "This is an old example sentence."
 *                   - "Another previous example of usage."
 *             required:
 *               - word
 *               - language
 *               - oldExamples
 *     responses:
 *       201:
 *         description: Returns the updated word examples
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
 *                   example: "Word examples generated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     word:
 *                       type: string
 *                       example: "challenge"
 *                     examples:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "Overcoming obstacles is always a challenge."
 *                         - "She accepted the challenge to improve her skills."
 *                         - "Life is full of unexpected challenges."
 *       400:
 *         description: Bad request, missing required fields (word)
 *       500:
 *         description: Internal server error
 */
generateRoutes.put("/generate-word-examples/:idword", updatedJSONWordExamples);


/**
 * @swagger
 * /api/ai/generate-code-switching/{idword}:
 *   put:
 *     summary: Generate and update word Code-Switching examples using AI
 *     tags: [AI Generation]
 *     parameters:
 *       - in: path
 *         name: idword
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the word to update with AI-generated code-switching examples
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "challenge"
 *               language:
 *                 type: string
 *                 enum: [en, es, pt]
 *                 default: "en"
 *                 example: "en"
 *               oldExamples:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "El globo bursts y todos se asustan"
 *                   - "Ella bursts en lágrimas al escuchar la noticia."
 *             required:
 *               - word
 *               - language
 *               - oldExamples
 *     responses:
 *       201:
 *         description: Returns the updated word Code-Switching examples
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
 *                   example: "Word Code-Switching examples generated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     word:
 *                       type: string
 *                       example: "bursts"
 *                     examples:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "El globo bursts y todos se asustan."
 *                         - "Ella bursts en lágrimas al escuchar la noticia."
 *                         - "El río bursts sus orillas después de la tormenta."
 *       400:
 *         description: Bad request, missing required fields (word, language, or oldExamples)
 *       500:
 *         description: Internal server error
 */
generateRoutes.put("/generate-code-switching/:idword", updatedJSONWordExamplesCodeSwitching);


/**
 * @swagger
 * /api/ai/generate-word-wordtypes/{idword}:
 *   put:
 *     summary: Generate and update word types using AI
 *     tags: [AI Generation]
 *     parameters:
 *       - in: path
 *         name: idword
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the word to update with AI-generated types
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "run"
 *               language:
 *                 type: string
 *                 enum: [en, es, pt]
 *                 default: "en"
 *                 example: "en"
 *               oldExamples:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "I love to run in the morning."
 *                   - "He scored a home run in the final inning."
 *             required:
 *               - word
 *               - language
 *     responses:
 *       201:
 *         description: Returns the updated word types
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
 *                   example: "Word Types generated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     word:
 *                       type: string
 *                       example: "run"
 *                     type:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "noun"
 *                         - "verb"
 *       400:
 *         description: Bad request, missing required fields (word, language)
 *       500:
 *         description: Internal server error
 */
generateRoutes.put("/generate-word-wordtypes/:idword", updatedJSONWordTypes);


/**
 * @swagger
 * /api/ai/generate-code-synonyms/{idword}:
 *   put:
 *     summary: Generate and update word synonyms using AI
 *     tags: [AI Generation]
 *     parameters:
 *       - in: path
 *         name: idword
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the word to update with AI-generated synonyms
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "happy"
 *               language:
 *                 type: string
 *                 enum: [en, es, pt]
 *                 default: "en"
 *                 example: "en"
 *               oldExamples:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - "She felt very happy after receiving the good news."
 *                   - "It was a happy moment for everyone."
 *             required:
 *               - word
 *               - language
 *     responses:
 *       201:
 *         description: Returns the updated word synonyms
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
 *                   example: "Word Synonyms generated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     word:
 *                       type: string
 *                       example: "happy"
 *                     synonyms:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "joyful"
 *                         - "content"
 *                         - "pleased"
 *       400:
 *         description: Bad request, missing required fields (word, language)
 *       500:
 *         description: Internal server error
 */
generateRoutes.put("/generate-code-synonyms/:idword", updatedJSONWordSynonyms);


/**
 * @swagger
 * /api/ai/generate-image/{idword}:
 *   post:
 *     summary: Generate an AI image and update the word entry
 *     tags: [AI Generation]
 *     parameters:
 *       - in: path
 *         name: idword
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the word to update with the AI-generated image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *                 example: "An artistic representation of the word 'challenge'"
 *             required:
 *               - word
 *     responses:
 *       200:
 *         description: Returns the updated word with the generated image
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
 *                   example: "Image generated and updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     word:
 *                       type: string
 *                       example: "challenge"
 *                     imageUrl:
 *                       type: string
 *                       example: "https://cloudinary.com/image123.jpg"
 *       400:
 *         description: Bad request, missing required fields (word)
 *       500:
 *         description: Internal server error
 */
generateRoutes.post("/generate-image/:idword", updateImageWord);