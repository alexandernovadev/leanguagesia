import { Request, Response } from "express";
import { LectureService } from "../services/lectures/LectureService";

const lectureService = new LectureService();

export const createLecture = async (
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

export const getLectureById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.getLectureById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    return res.json(lecture);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving lecture" });
  }
};

export const updateLecture = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.updateLecture(req.params.id, req.body);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    return res.json(lecture);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating lecture" });
  }
};

export const deleteLecture = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.deleteLecture(req.params.id);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    return res.json({ message: "Lecture deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting lecture" });
  }
};

export const updateImageLecureById = async (req: Request, res: Response) => {
  const ID = req.params.id;
  const { image } = req.body;

  try {
    const updatedLecture = await lectureService.updateImage(ID, image);
    if (!updatedLecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }
    return res.json(updatedLecture);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error updating lecture" });
  }
};

export const getAllLectures = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 1000;
    const lectures = await lectureService.getAllLectures(page, limit);
    return res.json(lectures);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching lectures" });
  }
};
