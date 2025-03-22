import { Request, Response } from "express";

import { LectureService } from "../services/lectures/LectureService";
import { successResponse, errorResponse } from "../utlis/responseHelpers";

const lectureService = new LectureService();

export const createLecture = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.createLecture(req.body);

    return successResponse(res, "Lecture created successfully", lecture, 201);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Error creating lecture");
  }
};

export const getLectureById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.getLectureById(req.params.id);
    if (!lecture) {
      return errorResponse(res, "Lecture not found" ,404);
    }

    return successResponse(res, "Lecture Listed by ID successfully", lecture);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Error retrieving lecture");
  }
};

export const updateLecture = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.updateLecture(req.params.id, req.body);
    if (!lecture) {
      return errorResponse(res, "Lecture not found" ,404);
    }

    return successResponse(res, "Lecture Updated successfully", lecture);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Error updating lecture");
  }
};

export const deleteLecture = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const lecture = await lectureService.deleteLecture(req.params.id);
    if (!lecture) {
      return errorResponse(res, "Lecture not found" ,404);
    }

    return successResponse(res, "Lecture deleted successfully", {});
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Error deleting lecture");
  }
};

export const updateImageLecureById = async (req: Request, res: Response) => {
  const ID = req.params.id;
  const { image } = req.body;

  try {
    const updatedLecture = await lectureService.updateImage(ID, image);
    if (!updatedLecture) {
      return errorResponse(res, "Lecture not found", 404);
    }
    return successResponse(
      res,
      "Lecture Update Image Lectue ById successfully",
      updatedLecture
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Error updating Image lecture");
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

    return successResponse(res, "Lecture listed successfully", lectures);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Error fetching lectures");
  }
};
