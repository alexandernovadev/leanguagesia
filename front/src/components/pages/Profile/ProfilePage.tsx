import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import verbs from "./tabla.json";
import { MainLayout } from "../../shared/Layouts/MainLayout";

type Verb = {
  Verb: string;
  Past: string;
  "Past Participle (PP)": string;
  Spanish: string;
};

const ITEMS_PER_PAGE = 10;
const fields: (keyof Verb)[] = ["Verb", "Past", "Past Participle (PP)"];

const ProfilePage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [randomFields, setRandomFields] = useState<number[]>([]);
  const [validated, setValidated] = useState<boolean>(false);

  useEffect(() => {
    // Reset answers and pick random fields for each verb on page change
    const initialAnswers = Array.from({ length: ITEMS_PER_PAGE }, () => [
      "",
      "",
      "",
    ]);
    setAnswers(initialAnswers);
    const randoms = Array.from({ length: ITEMS_PER_PAGE }, () =>
      Math.floor(Math.random() * 3)
    );
    setRandomFields(randoms);
    setValidated(false);
  }, [page]);

  const handleChange = (rowIndex: number, value: string) => {
    const updatedAnswers = answers.map((answer, i) =>
      i === rowIndex
        ? answer.map((val, j) => (j === randomFields[rowIndex] ? value : val))
        : answer
    );
    setAnswers(updatedAnswers);
  };

  const validateAnswers = () => {
    setValidated(true);
  };

  const nextPage = () =>
    setPage((prev) =>
      Math.min(prev + 1, Math.floor(verbs.length / ITEMS_PER_PAGE))
    );
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  const startIndex = page * ITEMS_PER_PAGE;
  const currentVerbs: Verb[] = verbs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
        <h1 className="text-2xl mb-6">Verb Game</h1>
        <div className="w-full max-w-4xl overflow-y-auto max-h-[70vh]">
          {currentVerbs.map((verb, i) => (
            <div
              key={i}
              className="mb-2 p-2 bg-gray-800 rounded-xl shadow-lg flex items-center"
            >
              {fields.map((field, j) => (
                <div key={j} className="flex-1 px-2 ">
                  {j === randomFields[i] ? (
                    <section className="flex items-center">
                      {validated &&
                        (answers[i][j] === verb[field] ? (
                          <Check className="text-green-500 inline ml-2" />
                        ) : j === randomFields[i] ? (
                          <div className="flex items-center">
                          <X className="text-red-500 inline ml-2" />
                          <span className="font-semibold">{verb[field]}</span>
                          </div>
                        ) : null)}
                      <input
                        type="text"
                        value={answers[i][j]}
                        onChange={(e) => handleChange(i, e.target.value)}
                        className="w-full p-2 bg-gray-700 mx-1 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </section>
                  ) : (
                    <span className="block text-center p-2">{verb[field]}</span>
                  )}
                </div>
              ))}
              <div className="flex-1 px-2">
                <span className="block text-center p-2">{verb["Spanish"]}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 w-full max-w-4xl">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:bg-gray-700"
          >
            Anterior
          </button>
          <button
            onClick={validateAnswers}
            className="px-4 py-2 bg-green-600 rounded-md"
          >
            Validar
          </button>
          <button
            onClick={nextPage}
            disabled={startIndex + ITEMS_PER_PAGE >= verbs.length}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:bg-gray-700"
          >
            Siguiente
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
