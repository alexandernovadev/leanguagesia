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

const ITEMS_PER_PAGE = 9;
const fields: (keyof Verb)[] = ["Verb", "Past", "Past Participle (PP)"];

// Función para mezclar un array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const ProfilePage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [randomFields, setRandomFields] = useState<number[]>([]);
  const [validated, setValidated] = useState<boolean>(false);
  const [shuffledVerbs, setShuffledVerbs] = useState<Verb[]>([]);

  // Mezclar los verbos al montar el componente
  useEffect(() => {
    const shuffled = shuffleArray(verbs);
    setShuffledVerbs(shuffled);
  }, []); // Solo se ejecuta una vez al montar el componente

  // Calcular el total de páginas basado en el array mezclado
  const totalPages = Math.ceil(shuffledVerbs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (shuffledVerbs.length === 0) return; // Esperar a que shuffledVerbs esté listo

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
  }, [page, shuffledVerbs]);

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

  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  const startIndex = page * ITEMS_PER_PAGE;
  const currentVerbs: Verb[] = shuffledVerbs.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
        <h1 className="text-2xl mb-6">
          Verb Game  | {page + 1} / {totalPages}|
        </h1>
        <div className="w-full max-w-4xl overflow-y-auto max-h-[70vh]">
          {currentVerbs.map((verb, i) => (
            <div
              key={i}
              className="mb-2 p-2 bg-gray-800 rounded-xl shadow-lg flex flex-wrap items-center"
            >
              {fields.map((field, j) => (
                <div key={j} className="w-1/2 md:w-1/4 px-2">
                  {j === randomFields[i] ? (
                    <section className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0">
                      <div className="flex flex-col justify-center items-start gap-2">
                        <input
                          type="text"
                          disabled={validated}
                          value={answers[i][j]}
                          onChange={(e) => handleChange(i, e.target.value)}
                          className={`w-full px-2  bg-gray-700 mx-1 text-white border 
                            border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                            ${validated && answers[i][j].toLocaleLowerCase() !== verb[field] ? 'text-[12] py-0' :'py-1' }
                            `}
                        />
                        {validated &&
                          answers[i][j].toLocaleLowerCase() !== verb[field] && (
                            <div className="flex">
                            <div className="flex items-center border border-red-500 rounded-full p-1 mx-2">
                              <X className="text-red-500 " size={16} />
                            </div>
                              <span className="text-[14px] font-bold ml-2 text-gray-200">
                                {verb[field]}
                              </span>
                            </div>
                          )}
                      </div>
                      {validated &&
                        (answers[i][j].toLocaleLowerCase() === verb[field] ? (
                          <div className="flex items-center border border-green-500 rounded-full p-1 mx-2">
                            <Check className="text-green-500 " size={16} />
                          </div>
                        ) : null)}
                    </section>
                  ) : (
                    <span className="block text-center p-2">{verb[field]}</span>
                  )}
                </div>
              ))}
              <div className="w-1/2 md:w-1/4 px-2">
                <span className="block text-center p-2 font-bold capitalize">
                  {verb["Spanish"]}
                </span>
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
            disabled={page === totalPages - 1}
            className="px-4 py-2 bg-blue-600 rounded-md disabled:bg-gray-700"
          >
            Siguiente
          </button>
        </div>
      </div>
    </MainLayout>
  );
};
