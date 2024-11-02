import { useState, useEffect } from "react";
import { MainLayout } from "../../shared/Layouts/MainLayout";
import { Card, CardData } from "./Card";
import { CardNavigation } from "./CardNavigation";
import { cardsData as exampleCardsData } from "./data/wordsexample"; // Local data for example

export const AnkiGamePage = () => {
  const [cards, setCards] = useState<CardData[]>(exampleCardsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulated API fetch function
  const fetchCards = async () => {
    try {
      setLoading(true);
      // Here would be the API call in the future
      // For example: const response = await fetch("/api/cards");
      // const data = await response.json();
      
      const data = exampleCardsData; // Using local data for now
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
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center mx-4">
        <section className="flex flex-col items-center mt-12 w-[520px]">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <>
              <Card card={cards[currentIndex]} />
              <CardNavigation
                currentIndex={currentIndex}
                totalCards={cards.length}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </>
          )}
        </section>
      </div>
    </MainLayout>
  );
};
