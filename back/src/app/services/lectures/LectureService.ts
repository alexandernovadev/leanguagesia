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

  async getLectureById(id: string): Promise<ILecture | null> {
    return await Lecture.findById(id);
  }

  async updateLecture(
    id: string,
    data: Partial<ILecture>
  ): Promise<ILecture | null> {
    return await Lecture.findByIdAndUpdate(id, data, { new: true });
  }

  async updateImage(id: string, img: string): Promise<ILecture | null> {
    return await Lecture.findByIdAndUpdate(id, { img }, { new: true });
  }

  async deleteLecture(id: string): Promise<ILecture | null> {
    return await Lecture.findByIdAndDelete(id);
  }

  async getAllLectures(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<ILecture>> {
    const skip = (page - 1) * limit;
    const [total, data] = await Promise.all([
      Lecture.countDocuments(),
      Lecture.find().skip(skip).limit(limit),
    ]);

    return {
      data,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  }
}
