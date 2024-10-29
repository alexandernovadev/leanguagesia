import { Request, Response } from "express";
import { LectureService } from "../services/lectures/LectureService";

const lectureService = new LectureService();

// Crear una nueva conferencia
export const createLecture = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.createLecture(req.body);
    return res.status(201).json(lecture);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error creating lecture" });
  }
};
