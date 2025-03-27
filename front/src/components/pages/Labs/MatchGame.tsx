import { useState, useRef, useEffect } from "react";

type Pair = { leftId: number; rightId: number };

const itemsLeft = ["A", "B", "C", "D"];
const itemsRight = ["1", "2", "3", "4"];

export const MatchGame = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [dragging, setDragging] = useState<{ x: number; y: number } | null>(
    null
  );
  const [dragStart, setDragStart] = useState<{
    id: number;
    x: number;
    y: number;
  } | null>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragStart) {
        setDragging({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      setDragStart(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragStart]);

  const handleLeftMouseDown = (index: number, event: React.MouseEvent) => {
    const rect = leftRefs.current[index]?.getBoundingClientRect();
    if (rect) {
      setDragStart({ id: index, x: rect.right, y: rect.top + rect.height / 2 });
    }
  };

  const handleRightMouseUp = (index: number) => {
    if (dragStart) {
      setPairs([...pairs, { leftId: dragStart.id, rightId: index }]);
      setDragging(null);
      setDragStart(null);
    }
  };

  return (
    <div className="relative flex items-center justify-center p-8">
      {/* SVG para líneas */}
      <svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
        {pairs.map(({ leftId, rightId }, i) => {
          const leftElement = leftRefs.current[leftId];
          const rightElement = rightRefs.current[rightId];

          if (leftElement && rightElement) {
            const leftRect = leftElement.getBoundingClientRect();
            const rightRect = rightElement.getBoundingClientRect();
            return (
              <line
                key={i}
                x1={leftRect.right}
                y1={leftRect.top + leftRect.height / 2}
                x2={rightRect.left}
                y2={rightRect.top + rightRect.height / 2}
                stroke="blue"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          }
          return null;
        })}
        {/* Flecha en tiempo real */}
        {dragStart && dragging && (
          <line
            x1={dragStart.x}
            y1={dragStart.y}
            x2={dragging.x}
            y2={dragging.y}
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
            <polygon points="0 0, 10 3.5, 0 7" fill="blue" />
          </marker>
        </defs>
      </svg>

      {/* Lista izquierda */}
      <div className="flex flex-col gap-4">
        {itemsLeft.map((item, index) => (
          <div
            key={index}
            ref={(el) => (leftRefs.current[index] = el)}
            className="p-4 bg-blue-500 text-white rounded-md cursor-pointer"
            onMouseDown={(e) => handleLeftMouseDown(index, e)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Espacio en medio */}
      <div className="w-20"></div>

      {/* Lista derecha */}
      <div className="flex flex-col gap-4">
        {itemsRight.map((item, index) => (
          <div
            key={index}
            ref={(el) => (rightRefs.current[index] = el)}
            className="p-4 bg-green-500 text-white rounded-md cursor-pointer"
            onMouseUp={() => handleRightMouseUp(index)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
