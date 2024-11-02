import { useState, useEffect } from "react";
import { BACKURL } from "../../api/backConf";
import { Word } from "../../components/pages/Lecture/types/Word";

interface UseGetWordsResult {
  words: Word[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  retry: () => void;
}

export const useGetWords = (
  initialPage: number = 1,
  limit: number = 10
): UseGetWordsResult => {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BACKURL}/api/words?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (data.success) {
        setWords(data.data);
        setTotalPages(data.pagination.pages);
      } else {
        setError("Failed to load words.");
      }
    } catch (error) {
      setError("An error occurred while fetching words.");
    } finally {
      setLoading(false);
    }
  };

  const retry = () => {
    fetchWords();
  };

  useEffect(() => {
    fetchWords();
  }, [page]);

  return { words, loading, error, page, totalPages, setPage, retry };
};
