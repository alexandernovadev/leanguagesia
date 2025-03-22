import { create } from "zustand";
import { BACKURL } from "../api/backConf";
import { Lecture } from "../models/Lecture";

interface LectureStore {
  lectures: Lecture[];
  activeLecture: Lecture | null;
  loading: boolean;
  actionLoading: { [key: string]: boolean };
  errors: { [key: string]: string | null };
  totalPages: number;
  currentPage: number;

  getLectures: (page?: number, limit?: number) => Promise<void>;
  getLectureById: (id: string) => Promise<void>;
  postLecture: (lectureData: Lecture) => Promise<void>;
  putLecture: (id: string, lectureData: Lecture) => Promise<void>;
  putLectureImage: (id: string, image: string) => Promise<void>;
  deleteLecture: (id: string | number) => Promise<void>;
  clearErrors: () => void;
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success)
    throw new Error(data.error || `Error: ${response.statusText}`);
  return data;
};

export const useLectureStore = create<LectureStore>((set, get) => ({
  lectures: [],
  activeLecture: null,
  loading: false,
  actionLoading: {},
  errors: {},
  totalPages: 1,
  currentPage: 1,

  getLectures: async (page = 1, limit = 10) => {
    set({
      loading: true,
      errors: { ...get().errors, get: null },
      currentPage: page,
      ...(page === 1 ? { lectures: [] } : {}), // Clean just in the first page
    });
    try {
      const response = await fetch(
        `${BACKURL}/api/lectures?page=${page}&limit=${limit}`
      );
      const { data } = await handleResponse(response);

      set((state) => ({
        lectures: [...state.lectures, ...data.data],
        totalPages: data.pages,
        loading: false,
      }));
    } catch (error: any) {
      set({ errors: { ...get().errors, get: error.message }, loading: false });
    }
  },

  getLectureById: async (id: string) => {
    set({ loading: true, errors: { ...get().errors, getById: null } });
    try {
      const response = await fetch(`${BACKURL}/api/lectures/${id}`);
      const data = await handleResponse(response);
      set({ activeLecture: data.data, loading: false });
    } catch (error: any) {
      set({
        errors: { ...get().errors, getById: error.message },
        loading: false,
      });
    }
  },

  postLecture: async (lectureData: Lecture) => {
    set({
      actionLoading: { ...get().actionLoading, post: true },
      errors: { ...get().errors, post: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/lectures`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lectureData),
      });
      const data = await handleResponse(response);
      set((state) => ({
        lectures: [...state.lectures, data.data],
        actionLoading: { ...state.actionLoading, post: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, post: error.message },
        actionLoading: { ...get().actionLoading, post: false },
      });
    }
  },

  putLecture: async (id: string, lectureData: Lecture) => {
    set({
      actionLoading: { ...get().actionLoading, put: true },
      errors: { ...get().errors, put: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/lectures/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lectureData),
      });
      const data = await handleResponse(response);
      set((state) => ({
        lectures: state.lectures.map((lecture) =>
          lecture._id === id ? data.data : lecture
        ),
        activeLecture: data.data,
        actionLoading: { ...state.actionLoading, put: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, put: error.message },
        actionLoading: { ...get().actionLoading, put: false },
      });
    }
  },

  putLectureImage: async (id: string, image: string) => {
    set({
      actionLoading: { ...get().actionLoading, putImage: true },
      errors: { ...get().errors, putImage: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/lectures/image/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      const data = await handleResponse(response);
      set((state) => ({
        lectures: state.lectures.map((lecture) =>
          lecture._id === id ? data.data : lecture
        ),
        activeLecture: data.data,
        actionLoading: { ...state.actionLoading, putImage: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, putImage: error.message },
        actionLoading: { ...get().actionLoading, putImage: false },
      });
    }
  },

  deleteLecture: async (id: string | number) => {
    set({
      actionLoading: { ...get().actionLoading, delete: true },
      errors: { ...get().errors, delete: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/lectures/${id}`, {
        method: "DELETE",
      });
      await handleResponse(response);
      set((state) => ({
        lectures: state.lectures.filter((lecture) => lecture._id !== id),
        activeLecture:
          state.activeLecture?._id === id ? null : state.activeLecture,
        actionLoading: { ...state.actionLoading, delete: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, delete: error.message },
        actionLoading: { ...get().actionLoading, delete: false },
      });
    }
  },

  clearErrors: () => set({ errors: {} }),
}));
