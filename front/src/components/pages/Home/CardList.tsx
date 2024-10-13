import { demoCards } from "./data/CardsData";

export const CardList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {demoCards.map((card) => (
        <div
          key={card.id}
          className="flex flex-col border border-gray-600 rounded-lg"
        >
          <div
            className={`bg-customBlack-200 rounded-lg p-4 aspect-square relative`}
          >
            <div className="absolute top-2 left-2 text-2xl">{card.flag}</div>
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
          <p className="mt-2 text-base font-medium py-2 line-clamp-2 px-2">
            {card.title}
          </p>
        </div>
      ))}
    </div>
  );
};
