import React, { useState } from "react";
import { Loader, Volume2 } from "lucide-react";

import { BACKURL } from "../../../../api/backConf";
import { Word } from "../../../../models/Word";

export const GenerateWord = () => {
  const [loadingGetWord, setLoadingGetWord] = useState(false);
  const [wordToSearch, setWordToSearch] = useState<string | null>(null);
  const [wordDb, setWordDb] = useState<Word | undefined>(undefined);

  const generateWord = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!wordToSearch) {
      console.error("Word to search cannot be empty.");
      return;
    }
    setLoadingGetWord(true);

    try {
      const response = await fetch(`${BACKURL}/api/ai/generate-wordJson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: wordToSearch, language: "en" }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { data } = await response.json();
      setWordDb(data);
    } catch (error) {
      console.error("Failed to generate word:", error);
      setWordDb(undefined); // Reset the state if there's an error
    } finally {
      setLoadingGetWord(false);
    }
  };

  const listenWord = () => {
    if (wordToSearch) {
      const audio = new Audio(wordToSearch);
      audio.play();
    }
  };

  return (
    <form
      onSubmit={generateWord}
      className="h-[620px] bg-black-700 min-w-96 p-5 overflow-y-scroll"
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setWordToSearch(e.target.value)}
        className="p-2 border border-green-600 rounded-md w-full"
      />
      <div>
        <div className="p-6 pt-10 space-y-6 overflow-auto h-full">
          <section className="flex gap-3 justify-start items-center">
            <h1 className="text-4xl font-bold text-green-400 capitalize">
              {wordToSearch || "Search for a word"}
            </h1>
            {wordDb && (
              <span onClick={listenWord} className="cursor-pointer pt-2">
                <Volume2 className="w-8 h-8" />
              </span>
            )}
          </section>

          {wordDb?.IPA && (
            <div className="flex gap-3">
              <span className="text-green-300 font-semibold text-2xl">
                {wordDb.IPA}
              </span>
            </div>
          )}

          {wordDb ? (
            <div className="space-y-6">
              <section className="flex gap-3 justify-start items-center">
                <p className="text-sm font-medium text-green-300">
                  {wordDb.level ? `Level: ${wordDb.level}` : ""}
                </p>
                {wordDb.type && (
                  <p className="text-green-200 font-medium text-sm">
                    Type: {wordDb.type.join(", ")}
                  </p>
                )}
              </section>
              <p className="text-xl font-semibold">{wordDb.definition}</p>

              {wordDb.img && (
                <img
                  src={wordDb.img}
                  alt={wordDb.word}
                  className="w-full h-48 object-cover rounded-md border border-green-700"
                />
              )}

              {wordDb.examples && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Examples:
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {wordDb.examples.map((example, index) => (
                      <li key={index} className="text-black-200">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.codeSwitching && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Code-Switching Examples:
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {wordDb.codeSwitching.map((example, index) => (
                      <li key={index} className="text-black-200">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.sinonyms && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Synonyms:
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    {wordDb.sinonyms.map((synonym, index) => (
                      <li key={index} className="text-black-200 capitalize">
                        {synonym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {wordDb.spanish && (
                <div>
                  <h2 className="text-lg font-semibold text-green-400 mb-2">
                    Spanish:
                  </h2>
                  <p className="text-black-200 capitalize">
                    <strong>Word:</strong> {wordDb.spanish.word}
                  </p>
                  <p className="text-black-200">
                    <strong>Definition:</strong> {wordDb.spanish.definition}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <p className="text-green-300 text-center">
                Word not found in the database.
              </p>
              <button
                type="submit"
                disabled={loadingGetWord}
                className="flex items-center justify-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-800 text-white rounded-md font-medium"
              >
                {loadingGetWord ? (
                  <Loader className="animate-spin w-5 h-5" />
                ) : null}
                {loadingGetWord ? "Generating..." : "Generate Word with AI"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
