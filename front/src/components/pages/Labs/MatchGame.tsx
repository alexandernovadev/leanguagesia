import React, { useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ArcherContainer, ArcherElement } from "react-archer";

type Pair = {
  left: string;
  right: string;
};

const jsonData: { vocabulary: string; pairs: Pair[] } = {
  vocabulary: "Everyday routine",
  pairs: [
    { left: "get", right: "home late" },
    { left: "do", right: "exercise" },
    { left: "feel", right: "tired" },
    { left: "fall", right: "asleep" },
    { left: "take a", right: "break" },
    { left: "watch", right: "TV" },
    { left: "work long", right: "hours" },
    { left: "wake up", right: "early" },
    { left: "get up about", right: "eight" },
    { left: "stay up", right: "until midnight" },
  ],
};

// Draggable component
const DraggableWord: React.FC<{ word: string; type: string }> = ({
  word,
  type,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { word },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 border bg-gray-200 rounded text-center cursor-grab transition-all ${
        isDragging ? "opacity-50 scale-105" : "opacity-100"
      }`}
    >
      {word}
    </div>
  );
};

// Drop zone component
const DropZone: React.FC<{
  rightWord: string;
  onDrop: (word: string) => void;
  status?: string;
  hoveredWord?: string;
}> = ({ rightWord, onDrop, status, hoveredWord }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "word",
    drop: (item: { word: string }) => onDrop(item.word),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`p-3 border rounded w-40 h-12 flex items-center justify-center transition-all
        ${isOver ? "bg-blue-100" : "bg-white"}
        ${status === "correct" ? "border-green-500 bg-green-100" : ""}
        ${status === "incorrect" ? "border-red-500 bg-red-100" : ""}
      `}
    >
      {hoveredWord || "Drop here"}
    </div>
  );
};

const MatchGame: React.FC = () => {
  const [userMatches, setUserMatches] = useState<{ [key: string]: string }>({});
  const [hoveredWord, setHoveredWord] = useState<{ [key: string]: string }>({});
  const [validationResults, setValidationResults] = useState<{
    [key: string]: string;
  }>({});

  const handleDrop = (leftWord: string, rightWord: string) => {
    setUserMatches((prev) => ({ ...prev, [leftWord]: rightWord }));
    setHoveredWord((prev) => ({ ...prev, [rightWord]: "" })); // Remove hover preview
  };

  const validateAnswers = () => {
    let newResults: { [key: string]: string } = {};
    jsonData.pairs.forEach((pair) => {
      newResults[pair.left] =
        userMatches[pair.left] === pair.right ? "correct" : "incorrect";
    });
    setValidationResults(newResults);
  };

  const resetGame = () => {
    setUserMatches({});
    setValidationResults({});
    setHoveredWord({});
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center mt-10 bg-gray-900 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">{jsonData.vocabulary}</h2>

        <ArcherContainer strokeColor="blue">
          <div className="flex justify-between w-[500px] space-x-10">
            {/* Left Side */}
            <div className="space-y-4">
              {jsonData.pairs.map((pair) => (
                <ArcherElement key={pair.left} id={pair.left}>
                  <DraggableWord word={pair.left} type="word" />
                </ArcherElement>
              ))}
            </div>

            {/* Right Side - Drop Zones */}
            <div className="space-y-4">
              {jsonData.pairs.map((pair) => (
                <ArcherElement
                  key={pair.right}
                  id={pair.right}
                  relations={
                    userMatches[pair.left]
                      ? [
                          {
                            targetId: pair.right,
                            targetAnchor: "left",
                            sourceAnchor: "right",
                          },
                        ]
                      : []
                  }
                >
                  <DropZone
                    rightWord={pair.right}
                    onDrop={(word) => handleDrop(word, pair.right)}
                    status={validationResults[pair.left]}
                    hoveredWord={
                      hoveredWord[pair.right] || userMatches[pair.left]
                    }
                  />
                </ArcherElement>
              ))}
            </div>
          </div>
        </ArcherContainer>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={validateAnswers}
            className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Validate
          </button>

          <button
            onClick={resetGame}
            className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default MatchGame;
