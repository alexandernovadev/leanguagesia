import { MainLayout } from "../../shared/Layouts/MainLayout";
import { useGetWords } from "../../../hooks/serviceshooks/useGetWords";
import { Loading } from "./Loading";
import { ErrorMessage } from "./ErrorMessage";
import { WordTable } from "./WordTable";
import { Word } from "../Lecture/types/Word";
import { ToastContainer, toast } from "react-toastify";
import { BACKURL } from "../../../api/backConf";

export const WordPage = () => {
  const { words, loading, error, page, totalPages, setPage, retry } =
    useGetWords();

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleEdit = async (word: Word) => {
    try {
      const { _id, __v, ...rest } = word;
      const edit = await fetch(`${BACKURL}/api/words/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });

      if (edit.ok) {
        toast.success("Word updated successfully!");
        retry();
      } else {
        throw new Error("Failed to update word");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating word.");
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`${BACKURL}/api/words/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Word removed successfully!");
        retry();
      } else {
        throw new Error("Failed to delete word");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting word.");
    }
  };

  return (
    <MainLayout>
      <div className="text-customGreen-100 p-6 h-full">
        <ToastContainer
          toastClassName={() =>
            "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-gray-900"
          }
          bodyClassName={() => "text-white flex items-center"}
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
