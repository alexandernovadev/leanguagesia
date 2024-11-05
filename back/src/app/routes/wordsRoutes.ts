import { Router } from "express";
import {
  createWord,
  getWordById,
  getWords,
  updateWord,
  deleteWord,
  findWordByName,
  updateWordLevel,
  getRecentHardOrMediumWords,
} from "../controllers/wordController";

const router = Router();

router.get("/get-cards-anki", getRecentHardOrMediumWords);
router.post("/", createWord);
router.get("/", getWords);
router.get("/:id", getWordById);
router.put("/:id", updateWord);
router.delete("/:id", deleteWord);

router.get("/word/:word", findWordByName);

router.put("/:id/level", updateWordLevel);


export default router;
