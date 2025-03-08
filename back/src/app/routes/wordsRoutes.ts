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

router.get("/", getWords);
router.get("/:id", getWordById);
router.get("/get-cards-anki", getRecentHardOrMediumWords);
router.get("/word/:word", findWordByName);

router.post("/", createWord);

router.put("/:id/level", updateWordLevel);
// ToDo: update Image
// router.put("/:id/image", updateWordImage);

// ToDo: update SeensPlusplUs
// router.put("/:id/image", updateWordSeensplusone);

// ToDo: update Examples
// router.put("/:id/image", updateWordExamples);

// ToDo: update Code Switching
// router.put("/:id/image", updateWordExamplesCodeSwitching);

// ToDo: update Code Synonyms
// router.put("/:id/image", updateWordSynonyms);

// ToDo: update Code WordTypes
// router.put("/:id/image", updateWordTypes);

router.put("/:id", updateWord); // Update all Obeject

router.delete("/:id", deleteWord);


export default router;
