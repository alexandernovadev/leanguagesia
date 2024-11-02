import { Request, Response } from "express";
import { LectureService } from "../services/lectures/LectureService";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 60 }); // cache de 5 minutos
const lectureService = new LectureService();

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
    console.log(error);
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
    console.log(error);
    return res.status(500).json({ error: "Error deleting lecture" });
  }
};

// ====== Gets ====== 
export const getLectureById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lectureId = req.params.id;
    const cacheKey = `lecture_${lectureId}`;

    // Verificar si el caché tiene la conferencia
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const lecture = await lectureService.getLectureById(lectureId);
    if (!lecture) {
      return res.status(404).json({ error: "Lecture not found" });
    }

    // Almacenar en caché la conferencia y devolverla
    cache.set(cacheKey, lecture);
    return res.json(lecture);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error retrieving lecture" });
  }
};

export const getAllLectures = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const cacheKey = `lectures_page${page}_limit${limit}`;

    // Verificar si el caché tiene los resultados de la página
    if (cache.has(cacheKey)) {
      return res.json(cache.get(cacheKey));
    }

    const lectures = await lectureService.getAllLectures(page, limit);

    // Almacenar en caché los resultados y devolverlos
    cache.set(cacheKey, lectures);
    return res.json(lectures);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error fetching lectures" });
  }
};
