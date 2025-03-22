import { create } from "zustand";
import { BACKURL } from "../api/backConf";
import { Word } from "../models/Word";

// Define the store's state and actions
interface WordStore {
  words: Word[];
  activeWord: Word | null;
  loading: boolean;
  actionLoading: { [key: string]: boolean };
  errors: { [key: string]: string | null };
  totalPages: number;
  currentPage: number;

  getWords: (page?: number, limit?: number, wordUser?: string) => Promise<void>;
  getWordById: (id: string) => Promise<void>;
  getWordByName: (word: string) => Promise<void>;
  createWord: (wordData: Omit<Word, "_id">) => Promise<void>;
  updateWord: (id: string, wordData: Partial<Word>) => Promise<void>;
  updateWordLevel: (id: string, level: string) => Promise<void>;
  incrementWordSeen: (id: string) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
  getRecentHardOrMediumWords: () => Promise<void>;
  clearErrors: () => void;
}

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || `Error: ${response.statusText}`);
  }
  return data;
};

// Create the Zustand store
export const useWordStore = create<WordStore>((set, get) => ({
  words: [],
  activeWord: null,
  loading: false,
  actionLoading: {},
  errors: {},
  totalPages: 1,
  currentPage: 1,

  // Fetch all words with pagination and optional wordUser filter
  getWords: async (page = 1, limit = 10, wordUser?: string) => {
    set({
      loading: true,
      errors: { ...get().errors, get: null },
      currentPage: page,
      ...(page === 1 ? { words: [] } : {}), // Reset on first page
    });
    try {
      const url = `${BACKURL}/api/words?page=${page}&limit=${limit}${
        wordUser ? `&wordUser=${wordUser}` : ""
      }`;
      const response = await fetch(url);
      const { data } = await handleResponse(response);

      set((state) => ({
        words: [...state.words, ...data.data],
        totalPages: data.pages,
        loading: false,
      }));
    } catch (error: any) {
      set({ errors: { ...get().errors, get: error.message }, loading: false });
    }
  },

  // Fetch a word by ID
  getWordById: async (id: string) => {
    set({ loading: true, errors: { ...get().errors, getById: null } });
    try {
      const response = await fetch(`${BACKURL}/api/words/${id}`);
      const data = await handleResponse(response);
      set({ activeWord: data.data, loading: false });
    } catch (error: any) {
      set({
        errors: { ...get().errors, getById: error.message },
        loading: false,
      });
    }
  },

  // Fetch a word by name
  getWordByName: async (word: string) => {
    set({ loading: true, errors: { ...get().errors, getByName: null } });
    try {
      const response = await fetch(`${BACKURL}/api/words/word/${word}`);
      const data = await handleResponse(response);
      set({ activeWord: data.data, loading: false });
    } catch (error: any) {
      set({
        errors: { ...get().errors, getByName: error.message },
        loading: false,
      });
    }
  },

  // Create a new word
  createWord: async (wordData: Omit<Word, "_id">) => {
    set({
      actionLoading: { ...get().actionLoading, create: true },
      errors: { ...get().errors, create: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/words`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wordData),
      });
      const data = await handleResponse(response);
      set((state) => ({
        words: [...state.words, data.data],
        actionLoading: { ...state.actionLoading, create: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, create: error.message },
        actionLoading: { ...get().actionLoading, create: false },
      });
    }
  },

  // Update an existing word
  updateWord: async (id: string, wordData: Partial<Word>) => {
    set({
      actionLoading: { ...get().actionLoading, update: true },
      errors: { ...get().errors, update: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/words/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wordData),
      });
      const data = await handleResponse(response);
      set((state) => ({
        words: state.words.map((word) => (word._id === id ? data.data : word)),
        activeWord: data.data,
        actionLoading: { ...state.actionLoading, update: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, update: error.message },
        actionLoading: { ...get().actionLoading, update: false },
      });
    }
  },

  // Update word level
  updateWordLevel: async (id: string, level: string) => {
    set({
      actionLoading: { ...get().actionLoading, updateLevel: true },
      errors: { ...get().errors, updateLevel: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/words/${id}/level`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level }),
      });
      const data = await handleResponse(response);
      set((state) => ({
        words: state.words.map((word) => (word._id === id ? data.data : word)),
        activeWord: data.data,
        actionLoading: { ...state.actionLoading, updateLevel: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, updateLevel: error.message },
        actionLoading: { ...get().actionLoading, updateLevel: false },
      });
    }
  },

  // Increment word seen count
  incrementWordSeen: async (id: string) => {
    set({
      actionLoading: { ...get().actionLoading, incrementSeen: true },
      errors: { ...get().errors, incrementSeen: null },
    });
    try {
      const response = await fetch(
        `${BACKURL}/api/words/${id}/increment-seen`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await handleResponse(response);
      set((state) => ({
        words: state.words.map((word) => (word._id === id ? data.data : word)),
        activeWord: data.data,
        actionLoading: { ...state.actionLoading, incrementSeen: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, incrementSeen: error.message },
        actionLoading: { ...get().actionLoading, incrementSeen: false },
      });
    }
  },

  // Delete a word
  deleteWord: async (id: string) => {
    set({
      actionLoading: { ...get().errors, delete: true },
      errors: { ...get().errors, delete: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/words/${id}`, {
        method: "DELETE",
      });
      await handleResponse(response);
      set((state) => ({
        words: state.words.filter((word) => word._id !== id),
        activeWord: state.activeWord?._id === id ? null : state.activeWord,
        actionLoading: { ...state.actionLoading, delete: false },
      }));
    } catch (error: any) {
      set({
        errors: { ...get().errors, delete: error.message },
        actionLoading: { ...get().actionLoading, delete: false },
      });
    }
  },

  // Fetch recent hard or medium words
  getRecentHardOrMediumWords: async () => {
    set({
      loading: true,
      errors: { ...get().errors, getRecentHardOrMedium: null },
    });
    try {
      const response = await fetch(`${BACKURL}/api/words/get-cards-anki`);
      const data = await handleResponse(response);
      set({
        words: data.data, // Overwrites words with the recent ones
        loading: false,
      });
    } catch (error: any) {
      set({
        errors: { ...get().errors, getRecentHardOrMedium: error.message },
        loading: false,
      });
    }
  },

  // Clear all errors
  clearErrors: () => set({ errors: {} }),
}));
