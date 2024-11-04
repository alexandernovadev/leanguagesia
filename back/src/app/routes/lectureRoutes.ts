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

router.post("/", createLecture);
router.get("/", getAllLectures);
router.get("/:id", getLectureById);
router.put("/:id", updateLecture);
router.put("/image/:id", updateImageLecureById);
router.delete("/:id", deleteLecture);

export default router;
