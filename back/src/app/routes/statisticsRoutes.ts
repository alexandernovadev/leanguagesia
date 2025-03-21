import { Router } from "express";
import { BasicInformation } from "../controllers/statisticsController";

const routes = Router();

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Statistics
 *     description: All statistics so far
 *     responses:
 *       200:
 *         description: Just resturn list of words and lectures with levels details count
 */
routes.get("/", BasicInformation);

export default routes;
