import { useState, useRef, useEffect, useMemo } from "react";

export const data = {
  vocabulary: "Everyday routine",
  pairs: [
    { left: "get", right: "home late" },
    { left: "do", right: "exercise" },
    { left: "feel", right: "tired" },
    { left: "fall", right: "asleep" },
    { left: "take a", right: "break" },
    { left: "watch", right: "TV" },
    { left: "work long", right: "hours" },
    { left: "wake up", right: "early" },
    { left: "get up about", right: "eight" },
    { left: "stay up", right: "until midnight" },
  ],
};

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const MatchGame = () => {
  const shuffledLeft = useMemo(
    () => shuffleArray(data.pairs.map((p) => p.left)),
    []
  );
  const shuffledRight = useMemo(
    () => shuffleArray(data.pairs.map((p) => p.right)),
    []
  );

  const [userPairs, setUserPairs] = useState<
    { leftId: number; rightId: number }[]
  >([]);
  const [dragStart, setDragStart] = useState<{
    leftId: number;
    x: number;
    y: number;
  } | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [validated, setValidated] = useState(false);

  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Calcular posiciones relativas con bordes precisos
  const getRelativePosition = (element: HTMLDivElement, isLeft: boolean) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svgRect = svgRef.current.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();
    return {
      x: isLeft
        ? elemRect.right - svgRect.left // Borde derecho para elementos izquierdos
        : elemRect.left - svgRect.left, // Borde izquierdo para elementos derechos
      y: elemRect.top - svgRect.top + elemRect.height / 2, // Centro vertical
    };
  };

  // Listener de movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragStart && svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        setDragPos({
          x: e.clientX - svgRect.left,
          y: e.clientY - svgRect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dragStart]);

  // Listener global para cancelar el drag
  useEffect(() => {
    const handleMouseUp = () => {
      setDragStart(null);
      setDragPos(null);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Iniciar el arrastre desde un elemento izquierdo
  const onLeftMouseDown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const leftDiv = leftRefs.current[index];
    if (leftDiv && svgRef.current) {
      const pos = getRelativePosition(leftDiv, true);
      setDragStart({
        leftId: index,
        x: pos.x,
        y: pos.y,
      });
    }
  };

  // Soltar sobre un elemento derecho
  const onRightMouseUp = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragStart) {
      // Verificar si ya existe una conexión para este elemento izquierdo
      const existingConnection = userPairs.find(
        (pair) => pair.leftId === dragStart.leftId
      );

      if (existingConnection) {
        // Reemplazar la conexión existente
        setUserPairs((prev) =>
          prev.map((pair) =>
            pair.leftId === dragStart.leftId
              ? { leftId: dragStart.leftId, rightId: index }
              : pair
          )
        );
      } else {
        // Añadir nueva conexión
        setUserPairs((prev) => [
          ...prev,
          { leftId: dragStart.leftId, rightId: index },
        ]);
      }

      setDragStart(null);
      setDragPos(null);
    }
  };

  // Calcular pares correctos
  const correctPairs = useMemo(() => {
    return data.pairs.map((p) => ({
      leftId: shuffledLeft.indexOf(p.left),
      rightId: shuffledRight.indexOf(p.right),
    }));
  }, [shuffledLeft, shuffledRight]);

  // Validar el juego
  const validateGame = () => {
    setValidated(true);
  };

  // Renderizar líneas de conexión
  const renderLines = () => {
    const lines = validated ? correctPairs : userPairs;
    return lines.map((pair, idx) => {
      const leftElem = leftRefs.current[pair.leftId];
      const rightElem = rightRefs.current[pair.rightId];
      if (!leftElem || !rightElem || !svgRef.current) return null;

      const leftPos = getRelativePosition(leftElem, true);
      const rightPos = getRelativePosition(rightElem, false);

      return (
        <line
          key={idx}
          x1={leftPos.x}
          y1={leftPos.y}
          x2={rightPos.x}
          y2={rightPos.y}
          stroke={validated ? "green" : "blue"}
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      );
    });
  };

  return (
    <div className="relative flex flex-col items-center p-8 select-none">
      <h2 className="text-xl font-bold mb-4">{data.vocabulary}</h2>
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight: "300px" }}
      >
        <svg
          ref={svgRef}
          className="absolute w-full h-full top-0 left-0 pointer-events-none"
        >
          {renderLines()}
          {dragStart && dragPos && !validated && (
            <line
              x1={dragStart.x}
              y1={dragStart.y}
              x2={dragPos.x}
              y2={dragPos.y}
              stroke="red"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          )}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={validated ? "green" : "blue"}
              />
            </marker>
          </defs>
        </svg>
        <div className="flex flex-col gap-4">
          {shuffledLeft.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (leftRefs.current[idx] = el)}
              className="p-4 bg-blue-500 text-white rounded-md cursor-pointer"
              onMouseDown={(e) => onLeftMouseDown(idx, e)}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="w-20 sm:w-56"></div>
        <div className="flex flex-col gap-4">
          {shuffledRight.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (rightRefs.current[idx] = el)}
              className="p-4 bg-green-800 text-white rounded-md cursor-pointer"
              onMouseUp={(e) => onRightMouseUp(idx, e)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={validateGame}
        className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-md font-bold hover:bg-purple-700"
      >
        Validar Respuestas
      </button>
    </div>
  );
};
