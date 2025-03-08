import { Router } from "express";
import {
  createLecture,
  getLectureById,
  updateLecture,
  deleteLecture,
  getAllLectures,
  updateImageLecureById,
} from "../controllers/LectureController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Lectures
 *   description: Endpoints related to lecture management
 */

/**
 * @swagger
 * /api/lectures:
 *   get:
 *     summary: Retrieve a paginated list of lectures
 *     tags: [Lectures]
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
 *         description: Number of lectures per page
 *     responses:
 *       200:
 *         description: A paginated list of lectures
 */
router.get("/", getAllLectures);

/**
 * @swagger
 * /api/lectures/{id}:
 *   get:
 *     summary: Get a lecture by its ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: A lecture object
 *       404:
 *         description: Lecture not found
 */
router.get("/:id", getLectureById);

/**
 * @swagger
 * /api/lectures:
 *   post:
 *     summary: Create a new lecture
 *     tags: [Lectures]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: integer
 *                 example: 45
 *               level:
 *                 type: string
 *                 example: "Intermediate"
 *               typeWrite:
 *                 type: string
 *                 example: "Academic"
 *               language:
 *                 type: string
 *                 example: "English"
 *               img:
 *                 type: string
 *                 example: "https://example.com/lecture-image.jpg"
 *               content:
 *                 type: string
 *                 example: "This is a detailed lecture about modern linguistics."
 *             required:
 *               - time
 *               - level
 *               - typeWrite
 *               - language
 *               - content
 *     responses:
 *       201:
 *         description: Lecture created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", createLecture);

/**
 * @swagger
 * /api/lectures/{id}:
 *   put:
 *     summary: Update a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lecture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               time:
 *                 type: integer
 *                 example: 60
 *               level:
 *                 type: string
 *                 example: "Advanced"
 *               typeWrite:
 *                 type: string
 *                 example: "Technical"
 *               language:
 *                 type: string
 *                 example: "French"
 *               content:
 *                 type: string
 *                 example: "An in-depth discussion on AI ethics."
 *             required:
 *               - time
 *               - level
 *               - typeWrite
 *               - language
 *               - content
 *     responses:
 *       200:
 *         description: Lecture updated successfully
 *       404:
 *         description: Lecture not found
 */
router.put("/:id", updateLecture);

/**
 * @swagger
 * /api/lectures/image/{id}:
 *   put:
 *     summary: Update the image of a lecture
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lecture ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 example: "https://example.com/new-lecture-image.jpg"
 *             required:
 *               - img
 *     responses:
 *       200:
 *         description: Lecture image updated successfully
 *       404:
 *         description: Lecture not found
 */
router.put("/image/:id", updateImageLecureById);

/**
 * @swagger
 * /api/lectures/{id}:
 *   delete:
 *     summary: Delete a lecture by ID
 *     tags: [Lectures]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Lecture ID
 *     responses:
 *       200:
 *         description: Lecture deleted successfully
 *       404:
 *         description: Lecture not found
 */
router.delete("/:id", deleteLecture);

export default router;
