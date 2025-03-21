import { Request, Response } from "express";
import { LectureService } from "../services/lectures/LectureService";
import { WordService } from "../services/words/wordService";

const lectureService = new LectureService();
const wordService = new WordService();

export const BasicInformation = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.createLecture(req.body);
    return res.status(201).json(lecture);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating lecture" });
  }
};
