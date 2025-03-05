import { Link } from "react-router-dom";
import { Card as CardType } from "./types/types";
import { Edit2, Eye } from "lucide-react";

interface CardProps {
  card: CardType;
}

export const Card = ({ card }: CardProps) => {
  const getTitle = (title: string) => {
    // Usamos una expresión regular para encontrar el primer título (# Title)
    const match = title.match(/^#\s(.+)/m);
    // Si se encuentra un título, devolvemos el texto; si no, devolvemos una cadena vacía
    return match ? match[1].trim() : "Sin título";
  };

  return (
    <div
      role="article"
      aria-labelledby={`card-title-${card._id}`}
      tabIndex={0}
      className="flex flex-col border border-gray-600 rounded-lg focus:outline-none focus:ring-[0.3px] focus:ring-green-600 focus:border-green-600 cursor-pointer"
    >
      <div
        className="bg-customBlack-200 rounded-lg p-4 aspect-square relative bg-center bg-cover opacity-90"
        style={{
          backgroundImage: `url(${card.img})`,
        }}
      >
        <div
          className="absolute top-2 left-2 text-2xl flex gap-4 items-center"
          role="img"
          aria-label={`Flag representing ${card.flag}`}
        >
          <span>{card.language == "en" ? "🇬🇧" : ""}</span>
          <button>
            <Edit2 className="w-4 h-4 text-green-800" />
          </button>

          <Link to={`/lecture/${card._id}`} key={card._id}>
            <Eye className="w-4 h-4 text-green-800" />
          </Link>
        </div>
        <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
          <span
            className="text-xs bg-gray-800 text-green-700 w-[29px] rounded-full px-2 py-1 relative left-[35px]"
            aria-label={`Level: ${card.level}`}
          >
            {card.level}
          </span>

          <span
            className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full flex items-center"
            aria-label={`Duration: ${card.time} minutes`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {card.time} min
          </span>
        </div>
      </div>
      <p
        id={`card-title-${card._id}`}
        className="mt-2 text-base font-medium py-2 line-clamp-2 px-2"
      >
        {getTitle(card.content)}
      </p>
    </div>
  );
};
