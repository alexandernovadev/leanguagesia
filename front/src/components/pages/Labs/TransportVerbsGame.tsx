import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";

import confetti from "canvas-confetti";
import { Button, Card } from "./components";

type Verb = {
  id: number;
  text: string;
  matched: boolean;
  selected: boolean;
};

type Object = {
  id: string;
  text: string;
  matched: boolean;
  selected: boolean;
};

type Match = {
  verbId: number;
  objectId: string;
};

const CORRECT_MATCHES: Match[] = [
  { verbId: 1, objectId: "a" }, // catch - the underground
  { verbId: 2, objectId: "b" }, // get on - a taxi
  { verbId: 3, objectId: "c" }, // go - your bus
  { verbId: 4, objectId: "d" }, // pick up - a train
  { verbId: 5, objectId: "e" }, // miss - children
  { verbId: 6, objectId: "f" }, // take - with your shopping
  { verbId: 7, objectId: "g" }, // go by - rickshaw
  { verbId: 8, objectId: "h" }, // drop you off - on foot
];

const initialVerbs: Verb[] = [
  { id: 1, text: "catch", matched: false, selected: false },
  { id: 2, text: "get on", matched: false, selected: false },
  { id: 3, text: "go", matched: false, selected: false },
  { id: 4, text: "pick up", matched: false, selected: false },
  { id: 5, text: "miss", matched: false, selected: false },
  { id: 6, text: "take", matched: false, selected: false },
  { id: 7, text: "go by", matched: false, selected: false },
  { id: 8, text: "drop you off", matched: false, selected: false },
];

const initialObjects: Object[] = [
  { id: "a", text: "the underground", matched: false, selected: false },
  { id: "b", text: "a taxi", matched: false, selected: false },
  { id: "c", text: "your bus", matched: false, selected: false },
  { id: "d", text: "a train", matched: false, selected: false },
  { id: "e", text: "children", matched: false, selected: false },
  { id: "f", text: "with your shopping", matched: false, selected: false },
  { id: "g", text: "rickshaw", matched: false, selected: false },
  { id: "h", text: "on foot", matched: false, selected: false },
];

// TODO Hacer pulses cuando estan mal  y otro pulso cuando estan bien
export const TransportVerbsGame = () => {
  const [verbs, setVerbs] = useState<Verb[]>([]);
  const [objects, setObjects] = useState<Object[]>([]);
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [selectedObject, setSelectedObject] = useState<Object | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (selectedVerb && selectedObject) {
      checkMatch(selectedVerb, selectedObject);
    }
  }, [selectedVerb, selectedObject]);

  useEffect(() => {
    if (score === CORRECT_MATCHES.length && score > 0) {
      setGameComplete(true);
      triggerConfetti();
    }
  }, [score]);

  const resetGame = () => {
    // Shuffle the objects array
    const shuffledObjects = [...initialObjects].sort(() => Math.random() - 0.5);

    setVerbs([...initialVerbs]);
    setObjects(shuffledObjects);
    setSelectedVerb(null);
    setSelectedObject(null);
    setScore(0);
    setAttempts(0);
    setGameComplete(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#9333ea", "#6366f1", "#3b82f6"],
    });
  };

  const selectVerb = (verb: Verb) => {
    if (verb.matched || (selectedVerb && selectedObject)) return;

    // Update the selected state for verbs
    setVerbs(
      verbs.map((v) => ({
        ...v,
        selected: v.id === verb.id,
      }))
    );

    setSelectedVerb(verb);
  };

  const selectObject = (object: Object) => {
    if (object.matched || !selectedVerb || (selectedVerb && selectedObject))
      return;

    // Update the selected state for objects
    setObjects(
      objects.map((o) => ({
        ...o,
        selected: o.id === object.id,
      }))
    );

    setSelectedObject(object);
  };

  const checkMatch = (verb: Verb, object: Object) => {
    const isMatch = CORRECT_MATCHES.some(
      (match) => match.verbId === verb.id && match.objectId === object.id
    );

    setTimeout(() => {
      if (isMatch) {
        // Update matched status
        setVerbs(
          verbs.map((v) =>
            v.id === verb.id
              ? { ...v, matched: true, selected: false }
              : { ...v, selected: false }
          )
        );
        setObjects(
          objects.map((o) =>
            o.id === object.id
              ? { ...o, matched: true, selected: false }
              : { ...o, selected: false }
          )
        );
        setScore((prev) => prev + 1);
      } else {
        // Reset selection
        setVerbs(verbs.map((v) => ({ ...v, selected: false })));
        setObjects(objects.map((o) => ({ ...o, selected: false })));
      }

      setAttempts((prev) => prev + 1);
      setSelectedVerb(null);
      setSelectedObject(null);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl pt-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="text-lg mb-4 md:mb-0 text-purple-300">
          <span className="text-purple-300">Puntuación:</span> {score}/
          {CORRECT_MATCHES.length}
        </div>
        <div className="text-lg mb-4 md:mb-0 text-purple-300">
          <span className="text-purple-300">Intentos:</span> {attempts}
        </div>
        <Button
          onClick={resetGame}
          className="bg-purple-700 hover:bg-purple-600 text-white"
        >
          <Shuffle className="mr-2 h-4 w-4" /> Reiniciar
        </Button>
      </div>

      {gameComplete && (
        <div className="bg-purple-900/50 p-4 rounded-lg mb-6 text-center">
          <h2 className="text-2xl font-bold text-purple-300 mb-2">
            ¡Felicidades!
          </h2>
          <p className="text-gray-200">
            Has completado el juego en {attempts} intentos.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Verbos</h2>
          <div className="space-y-2">
            {verbs.map((verb) => (
              <Card
                key={verb.id}
                className={`p-3 cursor-pointer transition-all ${
                  verb.matched
                    ? "bg-green-900/30 border-green-500"
                    : verb.selected
                    ? "bg-purple-800 border-purple-400"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-700"
                }`}
                onClick={() => selectVerb(verb)}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-purple-300">{verb.id}</span>
                  <span
                    className={verb.matched ? "text-green-300" : "text-white"}
                  >
                    {verb.text}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-purple-300">
            Objetos
          </h2>
          <div className="space-y-2">
            {objects.map((object) => (
              <Card
                key={object.id}
                className={`p-3 cursor-pointer transition-all ${
                  object.matched
                    ? "bg-green-900/30 border-green-500"
                    : object.selected
                    ? "bg-purple-800 border-purple-400"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-700"
                }`}
                onClick={() => selectObject(object)}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-purple-300">{object.id}</span>
                  <span
                    className={object.matched ? "text-green-300" : "text-white"}
                  >
                    {object.text}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
