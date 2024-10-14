import { Card as CardType } from "./types/types";

interface CardProps {
  card: CardType;
}

export const Card = ({ card }: CardProps) => {
  return (
    <div
      key={card.id}
      className="flex flex-col border border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300 cursor-pointer" 
      role="article"
      aria-labelledby={`card-title-${card.id}`} 
      tabIndex={0} 
    >
      <div
        className={`bg-customBlack-200 rounded-lg p-4 aspect-square relative`}
      >
        <div
          className="absolute top-2 left-2 text-2xl"
          role="img"
          aria-label={`Flag representing ${card.flag}`} 
        >
          {card.flag}
        </div>
        <div className="absolute bottom-2 right-2 flex flex-col space-y-1">
          <span
            className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full"
            aria-label={`Level: ${card.level}`} 
          >
            {card.level}
          </span>
          <span
            className="text-xs bg-customGreen-50 text-green-700 px-2 py-1 rounded-full flex items-center"
            aria-label={`Duration: ${card.duration} minutes`} 
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
            {card.duration} min
          </span>
        </div>
      </div>
      <p
        id={`card-title-${card.id}`} 
        className="mt-2 text-base font-medium py-2 line-clamp-2 px-2"
      >
        {card.title}
      </p>
    </div>
  );
};
