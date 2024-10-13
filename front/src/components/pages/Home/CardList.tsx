import { Card } from "./Card";
import { demoCards } from "./data/CardsData";

export const CardList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {demoCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
