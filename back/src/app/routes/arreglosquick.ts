import { Router } from "express";
import { arreglosmaricasrapidos } from "../controllers/labsController";

const routes = Router();

/**
 * @swagger
 * /api/fixes:
 *   get:
 *     summary: Fix things of my back
 *     description: Contain mehtods that help to fix things that I forget
 *     responses:
 *       200:
 *         description: Just resturn true or false if its completed
 */
routes.get("/", arreglosmaricasrapidos);

export default routes;
