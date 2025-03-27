import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { CheckIcon, XIcon } from "lucide-react";
import { useMobile } from "../../../hooks/useMobile";

// Define types
interface Word {
  id: number;
  text: string;
  category: string | null;
  isCorrect: boolean | null;
}

interface DraggableWordProps {
  word: Word;
  onDrop: (id: number, category: string) => void;
}

interface CategoryColumnProps {
  title: string;
  words: Word[];
  onDrop: (id: number, category: string) => void;
}

// Define correct categories for each word
const correctCategories: { [key: string]: string } = {
  cards: "play",
  hiking: "go",
  homework: "do",
  nothing: "do",
  running: "go",
  shopping: "go",
  tennis: "play",
  "the piano": "play",
  football: "play",
  karate: "do",
  surfing: "go",
  fishing: "go",
};

// Define the initial words
const initialWords: Word[] = [
  { id: 1, text: "cards", category: null, isCorrect: null },
  { id: 2, text: "hiking", category: null, isCorrect: null },
  { id: 3, text: "homework", category: null, isCorrect: null },
  { id: 4, text: "nothing", category: null, isCorrect: null },
  { id: 5, text: "running", category: null, isCorrect: null },
  { id: 6, text: "shopping", category: null, isCorrect: null },
  { id: 7, text: "tennis", category: null, isCorrect: null },
  { id: 8, text: "the piano", category: null, isCorrect: null },
  { id: 9, text: "football", category: null, isCorrect: null },
  { id: 10, text: "karate", category: null, isCorrect: null },
  { id: 11, text: "surfing", category: null, isCorrect: null },
  { id: 12, text: "fishing", category: "go", isCorrect: null },
];

// Draggable word component
const DraggableWord: React.FC<DraggableWordProps> = ({ word, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "word",
    item: { id: word.id, text: word.text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`px-3 py-2 bg-gray-700 rounded-md cursor-move shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {word.text}
    </div>
  );
};

// Category column component
const CategoryColumn = ({ title, words, onDrop }: CategoryColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "word",
    drop: (item: { id: number; text: string }) =>
      onDrop(item.id, title.toLowerCase()),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`p-4 bg-gray-800 rounded-lg border-2 ${
        isOver ? "border-purple-500" : "border-gray-700"
      } transition-colors min-h-[200px]`}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
      <div className="flex flex-col gap-2">
        {words.map((word) => (
          <div
            key={word.id}
            className={`px-3 py-2 bg-gray-700 rounded-md flex justify-between items-center ${
              word.isCorrect === true
                ? "border-2 border-green-500"
                : word.isCorrect === false
                ? "border-2 border-red-500"
                : ""
            }`}
          >
            <span>{word.text}</span>
            {word.isCorrect === true && (
              <CheckIcon className="h-5 w-5 text-green-500" />
            )}
            {word.isCorrect === false && (
              <XIcon className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CompleteDoGoPlay = () => {
  const isMobile = useMobile();
  const [words, setWords] = useState<Word[]>(initialWords);

  // Handle dropping a word into a category
  const handleDrop = (id: number, category: string) => {
    setWords(
      words.map((word) => {
        if (word.id === id) {
          return { ...word, category, isCorrect: null };
        }
        return word;
      })
    );
  };

  // Reset the game
  const resetGame = () => {
    setWords(
      initialWords.map((word) => {
        if (word.id === 12) return { ...word, category: "go", isCorrect: null };
        return { ...word, category: null, isCorrect: null };
      })
    );
  };

  // Show all correct answers
  const showAnswers = () => {
    setWords(
      words.map((word) => ({
        ...word,
        category: correctCategories[word.text],
        isCorrect: true,
      }))
    );
  };

  // Validate current answers
  const validateAnswers = () => {
    setWords(
      words.map((word) => {
        if (word.category === null) return word;
        const isCorrect = word.category === correctCategories[word.text];
        return { ...word, isCorrect };
      })
    );
  };

  // Get words for each category
  const bankWords = words.filter((word) => word.category === null);
  const doWords = words.filter((word) => word.category === "do");
  const goWords = words.filter((word) => word.category === "go");
  const playWords = words.filter((word) => word.category === "play");

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="min-h-screen text-white p-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Complete the table
        </h1>

        {/* Word Bank */}
        <div className="mb-8">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Word Bank
            </h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {bankWords.map((word) => (
                <DraggableWord key={word.id} word={word} onDrop={handleDrop} />
              ))}
            </div>
          </div>
        </div>

        {/* Category Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CategoryColumn title="Do" words={doWords} onDrop={handleDrop} />
          <CategoryColumn title="Go" words={goWords} onDrop={handleDrop} />
          <CategoryColumn title="Play" words={playWords} onDrop={handleDrop} />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center flex justify-center gap-4 flex-wrap">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md transition-colors"
          >
            Reset Game
          </button>
          <button
            onClick={validateAnswers}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors"
          >
            Validate
          </button>
          <button
            onClick={showAnswers}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md transition-colors"
          >
            Show Answers
          </button>
        </div>
      </div>
    </DndProvider>
  );
};
