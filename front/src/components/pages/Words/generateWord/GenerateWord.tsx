import React, { useCallback, useState } from "react";
import { Loader, Turtle, Volume2 } from "lucide-react";

import { BACKURL } from "../../../../api/backConf";
import { Word } from "../../../../models/Word";
import { getLevelColor } from "../../../../utils/getLevelColor";

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
      console.error("Failed to generate word:", error)
      setWordDb(undefined); // Reset the state if there's an error
    } finally {
      setLoadingGetWord(false);
    }
  };

  const listenWord = useCallback(
    (rate = 1) => {
      if (wordDb?.word && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(wordDb.word);
        utterance.lang = "en-US";
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }
    },
    [wordDb?.word]
  );

  return (
    <form
      onSubmit={generateWord}
      className="h-[620px] bg-black-800 min-w-[520px] rounded-xl max-w-[720px] p-5 overflow-y-scroll"
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setWordToSearch(e.target.value)}
        className="p-2 border border-green-600 rounded-md w-full"
      />
      <div>
        <div className="pt-2 space-y-6 overflow-auto h-full">
          <section className="flex gap-2 justify-start items-center">
            <h1 className="text-4xl font-bold text-green-400 capitalize">
              {wordToSearch || "Search for a word"}
            </h1>
          </section>

          {wordDb ? (
            <div className="flex flex-col justify-between  rounded-lg">
              <div className="px-2 overflow-scroll">
                <div className="flex justify-between items-center">
                  <span
                    className="text-lg font-bold px-2 py-1 rounded-full border"
                    style={{
                      color: getLevelColor(wordDb.level),
                      borderColor: getLevelColor(wordDb.level),
                    }}
                  >
                    {wordDb.level || "Unknown"}
                  </span>
                  <p className="text-yellow-500 mt-1 text-base font-bold">
                    👀 {wordDb.seen}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => listenWord()}
                    title="Normal Speed"
                    className="border p-2 rounded-full border-green-400"
                  >
                    <Volume2 size={32} color="green"/>
                  </button>
                  <button
                    onClick={() => listenWord(0.009)}
                    title="Slow Speed"
                    className="border p-2 rounded-full border-green-400"
                  >
                    <Turtle size={32} color="green" />
                  </button>
                </div>
                <p className="text-2xl text-purple-500 mt-2 font-bold">
                  {wordDb.IPA}
                </p>
                <p className="text-gray-400 mt-2 text-lg">
                  {wordDb.definition}
                </p>

                {wordDb.spanish && (
                  <div className="mt-2">
                    <p className="text-blue-500 text-3xl font-bold capitalize">
                      {wordDb.spanish.word}
                    </p>
                    <p className="text-gray-300 text-base">
                      {wordDb.spanish.definition}
                    </p>
                  </div>
                )}

                {wordDb.examples && wordDb.examples.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-gray-400 font-bold text-base">
                      Examples
                    </h3>
                    <ul className="text-gray-300 space-y-1 mt-1 text-base">
                      {wordDb.examples.map((example, index) => (
                        <li key={index} className="list-disc list-inside">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {wordDb.sinonyms && wordDb.sinonyms.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-gray-400 font-bold text-base">
                      Synonyms
                    </h3>
                    <ul className="text-white space-y-1 mt-1 text-base capitalize">
                      {wordDb.sinonyms.map((synonym, index) => (
                        <li key={index} className="list-disc list-inside">
                          🔹 {synonym}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {wordDb.type && wordDb.type.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-gray-400 font-bold text-base">
                      Word Types
                    </h3>
                    <ul className="text-white space-y-1 mt-1 text-base capitalize">
                      {wordDb.type.map((type, index) => (
                        <li key={index} className="list-disc list-inside">
                          🪹 {type}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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
