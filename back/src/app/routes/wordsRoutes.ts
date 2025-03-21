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
  incrementWordSeen,
} from "../controllers/wordController";

const router = Router();

router.get("/get-cards-anki", getRecentHardOrMediumWords);
router.get("/recent-hard-medium", getRecentHardOrMediumWords);
router.get("/", getWords);
router.get("/:id", getWordById);
router.get("/word/:word", findWordByName);

router.post("/", createWord);

router.put("/:id/level", updateWordLevel);
router.put("/:id/increment-seen", incrementWordSeen);
router.put("/:id/image", updateWordImg);
router.put("/:id/examples", updateWordExamples);
router.put("/:id/code-switching", updateWordCodeSwitching);
router.put("/:id/synonyms", updateWordSynonyms);
router.put("/:id/types", updateWordType);
router.put("/:id", updateWord);

router.delete("/:id", deleteWord);

export default router;
