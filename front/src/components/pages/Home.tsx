import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Home,
  Zap,
  BookOpen,
  User,
} from "lucide-react";

type Language = "English" | "Portugues";
type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface Filters {
  languages: Language[];
  levels: Level[];
}

interface Card {
  id: number;
  flag: string;
  level: Level;
  duration: number;
  title: string;
}

const demoCards: Card[] = [
  {
    id: 1,
    flag: "🇺🇸",
    level: "A1",
    duration: 3,
    title: "The best practice with zustand and more",
  },
  {
    id: 2,
    flag: "🇪🇸",
    level: "B2",
    duration: 5,
    title: "Advanced Spanish conversation techniques",
  },
  {
    id: 3,
    flag: "🇫🇷",
    level: "A2",
    duration: 4,
    title: "French cuisine vocabulary expansion",
  },
  {
    id: 4,
    flag: "🇩🇪",
    level: "C1",
    duration: 7,
    title: "German literature analysis",
  },
  {
    id: 5,
    flag: "🇯🇵",
    level: "B1",
    duration: 6,
    title: "Japanese kanji practice for intermediates",
  },
  {
    id: 6,
    flag: "🇮🇹",
    level: "A2",
    duration: 3,
    title: "Italian gestures and expressions",
  },
  {
    id: 7,
    flag: "🇷🇺",
    level: "B2",
    duration: 5,
    title: "Russian grammar deep dive",
  },
  {
    id: 8,
    flag: "🇨🇳",
    level: "A1",
    duration: 4,
    title: "Mandarin tones for beginners",
  },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    languages: [],
    levels: [],
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFilterChange = (
    type: "languages" | "levels",
    value: Language | Level
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type] as (Language | Level)[]).includes(value)
        ? (prev[type] as (Language | Level)[]).filter((item) => item !== value)
        : [...(prev[type] as (Language | Level)[]), value],
    }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    toggleModal();
  };

  return (
    <div className="bg-gradient-to-b from-black-800 via-customGreen-100 to-customBlack-100 text-black-200 min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black-800 to-transparent p-4">
        {" "}
        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-customBlack-200 rounded-lg py-2 pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-700 w-5 h-5" />
          </div>
          <button onClick={toggleModal} className="bg-customBlack-200 p-2 rounded-lg">
            <SlidersHorizontal className="text-green-700 w-5 h-5" />
          </button>
        </div>
      </div>
      <main className="flex-1 p-4 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {demoCards.map((card, index) => (
            <div key={card.id} className="flex flex-col">
              <div
                className={`bg-customBlack-200 rounded-lg p-4 aspect-square relative ${
                  index === 0 ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="absolute top-2 left-2 text-2xl">
                  {card.flag}
                </div>
                <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
                  <span className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full">
                    {card.level}
                  </span>
                  <span className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {card.duration} min
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm line-clamp-2">{card.title}</p>
            </div>
          ))}
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-4 bg-customBlack-200">
        <Home className="text-green-700 w-6 h-6" />
        <Zap className="w-6 h-6" />
        <BookOpen className="w-6 h-6" />
        <User className="w-6 h-6" />
      </nav>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-customBlack-200 rounded-lg p-6 w-5/6 max-w-md">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Languages</h3>
              {["English", "Portugues"].map((lang) => (
                <label key={lang} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.languages.includes(lang as Language)}
                    onChange={() =>
                      handleFilterChange("languages", lang as Language)
                    }
                    className="mr-2"
                  />
                  {lang}
                </label>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Levels</h3>
              <div className="grid grid-cols-3 gap-2">
                {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.levels.includes(level as Level)}
                      onChange={() =>
                        handleFilterChange("levels", level as Level)
                      }
                      className="mr-1"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={applyFilters}
              className="w-full bg-green-900 text-white py-2 rounded-lg hover:bg-green-800 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
