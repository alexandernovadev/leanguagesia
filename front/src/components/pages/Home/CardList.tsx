import { useEffect, useState } from "react";
import { Card } from "./Card";
// import { demoCards } from "./data/CardsData";
import { BACKURL } from "../../../api/backConf";
import { Lecture } from "../Lecture/types/Lecture";

export const CardList = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  const getLecture = async () => {
    const response = await fetch(`${BACKURL}/api/lectures`);
    const { data } = await response.json();

    setLectures(data);
  };

  useEffect(() => {
    getLecture();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {lectures?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </div>
  );
};
