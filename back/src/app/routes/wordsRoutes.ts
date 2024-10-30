import { Router } from "express";
import {
  createWord,
  getWordById,
  getWords,
  updateWord,
  deleteWord,
  findWordByName
} from "../controllers/wordController";

const router = Router();

router.post("/", createWord);
router.get("/", getWords);
router.get("/:id", getWordById);
router.put("/:id", updateWord);
router.delete("/:id", deleteWord);

// Ruta para buscar una palabra por su nombre
router.get("/word/:word", findWordByName); 

export default router;
