import { Router } from "express";
import {
  createWord,
  getWordById,
  getWords,
  updateWord,
  deleteWord
} from "../controllers/wordController";

const router = Router();

router.post("/", createWord);
router.get("/", getWords);
router.get("/:id", getWordById);
router.put("/:id", updateWord);
router.delete("/:id", deleteWord);

export default router;
