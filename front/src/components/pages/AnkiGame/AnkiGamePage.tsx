import { useState, useEffect } from "react";
import { MainLayout } from "../../shared/Layouts/MainLayout";
import { Card } from "./Card";
import { CardNavigation } from "./CardNavigation";
import { cardsData as exampleCardsData } from "./data/wordsexample";
import { Word } from "../Lecture/types/Word";

export const AnkiGamePage = () => {
  const [cards, setCards] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const data = exampleCardsData;
      // @ts-ignore
      setCards(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load cards.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false); // Reset to front view
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false); // Reset to front view
    }
  };

  return (
    <MainLayout>
      <section className="flex flex-col mt-12 w-full overflow-hidden">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="mx-3">
            <Card
              card={cards[currentIndex]}
              flipped={flipped}
              onFlip={() => setFlipped(!flipped)}
            />
            <CardNavigation
              currentIndex={currentIndex}
              totalCards={cards.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          </div>
        )}
      </section>
    </MainLayout>
  );
};
