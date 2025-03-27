import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  Handle,
  Position,
  Connection,
  Edge,
  addEdge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

type Pair = { left: string; right: string };
type DataType = { vocabulary: string; pairs: Pair[] };

export const data: DataType = {
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

// 📌 Función para mezclar un array (Shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// 📌 Generar nodos dinámicamente desde JSON
const createNodes = (data: DataType): Node[] => {
  const nodes: Node[] = [];

  // Crear nodos de la izquierda (en orden) y almacenar el índice del par
  data.pairs.forEach((pair, index) => {
    nodes.push({
      id: `left-${index}`,
      type: "customNode",
      position: { x: 100, y: index * 80 },
      data: { label: pair.left, isLeft: true, pairIndex: index },
    });
  });

  // Para los nodos de la derecha, conservamos el índice original y se mezclan
  const rightPairs = data.pairs.map((pair, index) => ({ ...pair, originalIndex: index }));
  const shuffledRightPairs = shuffleArray(rightPairs);

  shuffledRightPairs.forEach((pair, displayIndex) => {
    nodes.push({
      id: `right-${pair.originalIndex}`,
      type: "customNode",
      position: { x: 400, y: displayIndex * 80 },
      data: { label: pair.right, isLeft: false, pairIndex: pair.originalIndex },
    });
  });

  return nodes;
};

type CustomNodeData = {
  label: string;
  isLeft: boolean;
  pairIndex: number;
};

const CustomNode = ({ data }: { data: CustomNodeData }) => (
  <div className="bg-white text-black text-xl w-[180px] px-4 py-3 rounded-lg shadow-md text-center">
    {data.isLeft ? (
      <Handle
        type="source"
        position={Position.Right}
        className="w-6 h-6 bg-blue-500"
      />
    ) : (
      <Handle
        type="target"
        position={Position.Left}
        className="w-6 h-6 bg-blue-500"
      />
    )}
    <div>{data.label}</div>
  </div>
);

const nodeTypes = { customNode: CustomNode };

export const MatchGame = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    setNodes(createNodes(data));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => {
      const filteredEdges = eds.filter(
        (edge) => edge.source !== connection.source
      );
      return addEdge({ ...connection, animated: true }, filteredEdges);
    });
  }, []);

  const validateConnections = () => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) => {
        // Buscar los nodos conectados según sus id
        const sourceNode = nodes.find((n) => n.id === edge.source);
        const targetNode = nodes.find((n) => n.id === edge.target);
        let isCorrect = false;
        if (sourceNode && targetNode) {
          isCorrect =
            sourceNode.data.pairIndex === targetNode.data.pairIndex;
        }
        return {
          ...edge,
          animated: false,
          style: {
            stroke: isCorrect ? "green" : "red",
            strokeWidth: 4,
          },
        };
      })
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-[600px] h-[700px] rounded-lg p-4">
        <h2 className="text-white text-center text-2xl mb-4">
          {data.vocabulary}
        </h2>
        <div className="h-[600px] rounded-md relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            panOnDrag={false} // Evita que el tablero se mueva al arrastrar conexiones
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
          >
            <Background color="#444" gap={16} />
            <Controls showZoom={false} showFitView={false} />
          </ReactFlow>
        </div>
        <button
          onClick={validateConnections}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg block mx-auto"
        >
          Validate
        </button>
      </div>
    </div>
  );
};
