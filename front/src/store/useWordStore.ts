import { create } from "zustand";
import { BACKURL } from "../api/backConf";
import { Word } from "../models/Word";

interface WordStore {
  words: Word[];
  activeWord: Word | null;
  loading: boolean;
  actionLoading: { [key: string]: boolean };
  errors: { [key: string]: string | null } | string | null;
  totalPages: number;
  currentPage: number;
  searchQuery: string;

  getWords: (page?: number, limit?: number, wordUser?: string) => Promise<void>;
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  retry: () => void;
  getWordById: (id: string) => Promise<void>;
  getWordByName: (word: string) => Promise<void>;
  createWord: (wordData: Omit<Word, "_id">) => Promise<void>;
  updateWord: (id: string, wordData: Partial<Word>) => Promise<void>;
  updateWordLevel: (id: string, level: string) => Promise<void>;
  incrementWordSeen: (id: string) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
  getRecentHardOrMediumWords: () => Promise<void>;
  clearErrors: () => void;
  setActiveWord: (word: Word | null) => void;
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || `Error: ${response.statusText}`);
  }
  return data;
};

export const useWordStore = create<WordStore>((set, get) => ({
  words: [],
  activeWord: null,
  loading: false,
  actionLoading: {},
  errors: null,
  totalPages: 1,
  currentPage: 1,
  searchQuery: "",

  getWords: async (
    page = get().currentPage,
    limit = 7,
    wordUser = get().searchQuery
  ) => {
    set({
      loading: true,
      errors: null,
      currentPage: page,
      ...(page === 1 ? { words: [] } : {}), // Reset on first page
    });
    try {
      const url = `${BACKURL}/api/words?page=${page}&limit=${limit}${
        wordUser ? `&wordUser=${wordUser}` : ""
      }`;
      const response = await fetch(url);
      const { data } = await handleResponse(response);

      set({
        words: data.data,
        totalPages: data.pages,
        loading: false,
      });
    } catch (error: any) {
      set({ errors: error.message, loading: false });
    }
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().getWords(page);
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query, currentPage: 1 }); // Reset to page 1 on new search
    get().getWords(1, 7, query); // Trigger fetch with new query
  },

  setActiveWord: (word: Word | null) => {
    const currentActive = get().activeWord;
    // Si es la misma palabra, no hace nada
    if (currentActive?._id === word?._id) return;

    set({ activeWord: word });

    if (word?._id) {
      get().incrementWordSeen(word._id);
    }
  },

  retry: () => {
    get().getWords(); // Re-fetch with current page and searchQuery
  },

  // Rest of the methods remain unchanged
  getWordById: async (id: string) => {
    set({ loading: true, errors: null });
    try {
      const response = await fetch(`${BACKURL}/api/words/${id}`);
      const data = await handleResponse(response);
      set({ activeWord: data.data, loading: false });
    } catch (error: any) {
      set({ errors: error.message, loading: false });
    }
  },

  getWordByName: async (word: string) => {
    set({ loading: true, errors: null });
    try {
      const response = await fetch(`${BACKURL}/api/words/word/${word}`);
      const data = await handleResponse(response);
      set({ activeWord: data.data, loading: false });
    } catch (error: any) {
      set({ errors: error.message, loading: false });
    }
  },

  createWord: async (wordData: Omit<Word, "_id">) => {
    set({
      actionLoading: { ...get().actionLoading, create: true },
      errors: null,
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
        errors: error.message,
        actionLoading: { ...get().actionLoading, create: false },
      });
    }
  },

  updateWord: async (id: string, wordData: Partial<Word>) => {
    set({
      actionLoading: { ...get().actionLoading, update: true },
      errors: null,
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
        errors: error.message,
        actionLoading: { ...get().actionLoading, update: false },
      });
    }
  },

  updateWordLevel: async (id: string, level: string) => {
    set({
      actionLoading: { ...get().actionLoading, updateLevel: true },
      errors: null,
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
        errors: error.message,
        actionLoading: { ...get().actionLoading, updateLevel: false },
      });
    }
  },

  incrementWordSeen: async (id: string) => {
    set({
      actionLoading: { ...get().actionLoading, incrementSeen: true },
      errors: null,
    });

    try {
      const response = await fetch(
        `${BACKURL}/api/words/${id}/increment-seen`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await handleResponse(response);

      set((state) => ({
        words: state.words.map((word) =>
          word._id === id ? { ...word, seen: (word.seen || 0) + 1 } : word
        ),
        activeWord:
          state.activeWord && state.activeWord._id === id
            ? { ...state.activeWord, seen: (state.activeWord.seen || 0) + 1 }
            : state.activeWord,
        actionLoading: { ...state.actionLoading, incrementSeen: false },
      }));
    } catch (error: any) {
      set({
        errors: error.message,
        actionLoading: { ...get().actionLoading, incrementSeen: false },
      });
    }
  },

  deleteWord: async (id: string) => {
    set({
      actionLoading: { ...get().actionLoading, delete: true },
      errors: null,
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
        errors: error.message,
        actionLoading: { ...get().actionLoading, delete: false },
      });
    }
  },

  getRecentHardOrMediumWords: async () => {
    set({ loading: true, errors: null });
    try {
      const response = await fetch(`${BACKURL}/api/words/get-cards-anki`);
      const data = await handleResponse(response);
      set({ words: data.data, loading: false });
    } catch (error: any) {
      set({ errors: error.message, loading: false });
    }
  },

  clearErrors: () => set({ errors: null }),
}));
