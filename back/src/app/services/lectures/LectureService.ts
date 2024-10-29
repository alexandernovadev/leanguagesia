// LectureService.ts
import Lecture, { ILecture } from "../../db/models/Lecture";
import { connectDB } from "../../db/mongoConnection";

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export class LectureService {
  constructor() {
    connectDB(); // Asegura que la conexión esté lista
  }

  // Crear una nueva conferencia
  async createLecture(data: ILecture): Promise<ILecture> {
    const lecture = new Lecture(data);
    return await lecture.save();
  }

 
}
