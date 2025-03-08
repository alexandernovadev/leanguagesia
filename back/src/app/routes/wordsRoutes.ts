import { Router } from "express";
import {
  createWord,
  getWordById,
  getWords,
  updateWord,
  deleteWord,
  findWordByName,
  updateWordLevel,
  updateWordImg,
  updateWordExamples,
  updateWordCodeSwitching,
  updateWordSynonyms,
  updateWordType,
  getRecentHardOrMediumWords,
} from "../controllers/wordController";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Words
 *     description: Endpoints related to word management
 */

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: Retrieve a list of words with pagination
 *     tags: [Words]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of words per page
 *     responses:
 *       200:
 *         description: A paginated list of words
 */
router.get("/", getWords);

/**
 * @swagger
 * /api/words/{id}:
 *   get:
 *     summary: Get a word by its ID
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A word object
 *       404:
 *         description: Word not found
 */
router.get("/:id", getWordById);

/**
 * @swagger
 * /api/words/get-cards-anki:
 *   get:
 *     summary: Get the most recent hard or medium words
 *     tags: [Words]
 *     responses:
 *       200:
 *         description: A list of recently added hard or medium words
 */
router.get("/get-cards-anki", getRecentHardOrMediumWords);

/**
 * @swagger
 * /api/words/word/{word}:
 *   get:
 *     summary: Find a word by name
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: word
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word object
 *       404:
 *         description: Word not found
 */
router.get("/word/:word", findWordByName);

/**
 * @swagger
 * /api/words:
 *   post:
 *     summary: Create a new word
 *     tags: [Words]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               word:
 *                 type: string
 *               meaning:
 *                 type: string
 *     responses:
 *       201:
 *         description: Word created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createWord);

/**
 * @swagger
 * /api/words/{id}/level:
 *   put:
 *     summary: Update the level of a word
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               level:
 *                 type: string
 *                 enum: [easy, medium, hard]
 *     responses:
 *       200:
 *         description: Word level updated
 *       404:
 *         description: Word not found
 */
router.put("/:id/level", updateWordLevel);

/**
 * @swagger
 * /api/words/{id}/image:
 *   put:
 *     summary: Update the image of a word
 *     tags: [Words]
 */
router.put("/:id/image", updateWordImg);

/**
 * @swagger
 * /api/words/{id}/examples:
 *   put:
 *     summary: Update the examples of a word
 *     tags: [Words]
 */
router.put("/:id/examples", updateWordExamples);

/**
 * @swagger
 * /api/words/{id}/code-switching:
 *   put:
 *     summary: Update the code-switching property of a word
 *     tags: [Words]
 */
router.put("/:id/code-switching", updateWordCodeSwitching);

/**
 * @swagger
 * /api/words/{id}/synonyms:
 *   put:
 *     summary: Update the synonyms of a word
 *     tags: [Words]
 */
router.put("/:id/synonyms", updateWordSynonyms);

/**
 * @swagger
 * /api/words/{id}/types:
 *   put:
 *     summary: Update the types of a word
 *     tags: [Words]
 */
router.put("/:id/types", updateWordType);

/**
 * @swagger
 * /api/words/{id}:
 *   put:
 *     summary: Update an entire word object
 *     tags: [Words]
 */
router.put("/:id", updateWord);

/**
 * @swagger
 * /api/words/{id}:
 *   delete:
 *     summary: Delete a word by ID
 *     tags: [Words]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Word deleted successfully
 *       404:
 *         description: Word not found
 */
router.delete("/:id", deleteWord);

export default router;
