import { MainLayout } from "../../shared/Layouts/MainLayout";
import { useGetWords } from "../../../hooks/serviceshooks/useGetWords";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { WordTable } from "./WordTable";

export const WordPage = () => {
  const { words, loading, error, page, totalPages, setPage, retry } =
    useGetWords();

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = (id: string) => {
    console.log(`Edit word with ID: ${id}`);
  };

  const handleRemove = (id: string) => {
    console.log(`Remove word with ID: ${id}`);
  };

  return (
    <MainLayout>
      <div className="text-customGreen-100 p-6 h-full">

        {loading && <Loading />}
        {error && <ErrorMessage retry={retry} />}
        {!loading && !error && (
          <>
            <WordTable
              words={words}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className={`px-4 py-2 border border-green-600 rounded-lg text-white ${
                  page === 1 ? "bg-gray-800 opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-black-200">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className={`px-4 py-2 border border-green-600 rounded-lg text-white ${
                  page === totalPages
                    ? "bg-gray-800 opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};
