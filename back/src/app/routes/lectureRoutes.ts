import { Router } from "express";
import { createLecture } from "../controllers/LectureController";

const router = Router();

// Ruta para crear una nueva conferencia
// @ts-ignore
router.post("/", createLecture);

export default router;