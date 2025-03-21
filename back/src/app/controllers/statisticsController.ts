import { Request, Response } from "express";
import { LectureService } from "../services/lectures/LectureService";
import { WordService } from "../services/words/wordService";

const lectureService = new LectureService();
const wordService = new WordService();

// V1
export const BasicInformation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const countByLevelAndTotalLectures =
      await lectureService.getLectureCountsByLevel();
    const countByLevelAndTotalWords = await wordService.getWordCountsByLevel();
    return res.status(201).json({
      success: true,
      lectures: countByLevelAndTotalLectures,
      words: countByLevelAndTotalWords,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Error creating lecture" });
  }
};
