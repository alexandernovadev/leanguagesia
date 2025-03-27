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
import { data } from "./data";

// 📌 Función para mezclar un array (Shuffle)
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// 📌 Generar nodos dinámicamente desde JSON
const createNodes = (data: {
  vocabulary: string;
  pairs: { left: string; right: string }[];
}): Node[] => {
  const nodes: Node[] = [];

  // Mezclar las palabras de la derecha
  const shuffledPairs = shuffleArray([...data.pairs]);

  data.pairs.forEach((pair, index) => {
    nodes.push({
      id: `left-${index}`,
      type: "customNode",
      position: { x: 100, y: index * 80 },
      data: { label: pair.left, isLeft: true },
    });
  });

  shuffledPairs.forEach((pair, index) => {
    nodes.push({
      id: `right-${index}`,
      type: "customNode",
      position: { x: 400, y: index * 80 },
      data: { label: pair.right, isLeft: false },
    });
  });

  return nodes;
};

const CustomNode = ({ data }: { data: { label: string; isLeft: boolean } }) => (
  <div className="bg-white text-black w-[150px] px-4 py-2 rounded-lg shadow-md text-center">
    {data.isLeft ? (
      <Handle type="source" position={Position.Right} />
    ) : (
      <Handle type="target" position={Position.Left} />
    )}
    <div>{data.label}</div>
  </div>
);

const nodeTypes = { customNode: CustomNode };

export const MatchGameC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    setNodes(createNodes(data));
  }, [data]);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => {
      const filteredEdges = eds.filter(
        (edge) => edge.source !== connection.source
      );
      return addEdge({ ...connection, animated: true }, filteredEdges);
    });
  }, []);

  return (
    <div className="h-screen flex items-center justify-center ">
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
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
          >
            <Background color="#444" gap={16} />
            <Controls showZoom={false} showFitView={false} />
          </ReactFlow>
        </div>
        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg block mx-auto">
          Validate
        </button>
      </div>
    </div>
  );
};
