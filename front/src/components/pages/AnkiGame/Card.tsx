import React from "react";
import { FlipHorizontal } from "lucide-react";
import { Word } from "../Lecture/types/Word";

interface CardProps {
  card: Word;
  flipped: boolean;
  onFlip: () => void;
}

export const Card: React.FC<CardProps> = ({ card, flipped, onFlip }) => {
  return (
    <div
      className="relative w-full h-[66vh] bg-opacity-50 rounded-lg overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Flip Button */}
      <button
        onClick={onFlip}
        className="absolute top-4 left-3 px-2 py-1 flex gap-3 bg-green-600 text-white rounded shadow-md hover:bg-green-700 z-30"
      >
        Flip <FlipHorizontal />
      </button>

      {/* Card Container */}
      <div
        className={`w-full h-full border border-green-800 rounded-lg shadow-lg transition-transform transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        {!flipped && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <h2 className="text-4xl font-bold capitalize">{card.word}</h2>
            <p className="text-green-600 text-3xl">{card.IPA}</p>
          </div>
        )}

        {/* Back Side */}
        {flipped && (
          <div className="absolute inset-0 flex flex-col justify-between p-4 transform rotate-y-180 overflow-y-auto">
            <div className="mt-5">
              <h2 className="text-2xl font-bold mb-2 capitalize">
                {card.word}
              </h2>
              <p className="text-gray-400 mb-4">{card.definition}</p>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>
                  <strong>Type:</strong> {card.type.join(", ")}
                </li>
                <li>
                  <strong>Examples:</strong>
                  <ul className="list-disc list-inside pl-4">
                    {card.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="flex justify-around mt-4">
              <button className="px-3 py-1 text-white bg-green-600 rounded">
                Easy
              </button>
              <button className="px-3 py-1 text-white bg-yellow-600 rounded">
                Medium
              </button>
              <button className="px-3 py-1 text-white bg-red-600 rounded">
                Hard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
