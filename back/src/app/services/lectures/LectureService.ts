// LectureService.ts
import Lecture, { ILecture } from "../../db/models/Lecture";

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export class LectureService {

  async createLecture(data: ILecture): Promise<ILecture> {
    const lecture = new Lecture(data);
    return await lecture.save();
  }

 
}
