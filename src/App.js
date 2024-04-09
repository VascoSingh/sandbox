import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";

import SearchNode from "./components/SearchNode";

const nodeTypes = {
  searchNode: SearchNode, // 'searchNode' is a custom type identifier
};

const initialNodes = [
  {
    id: "1",
    type: "default",
    position: { x: -110, y: 30 },
    data: { label: "1" },
  },
  {
    id: "2",
    type: "searchNode", // This matches the key in the nodeTypes object
    position: { x: 100, y: 120 },
    data: { label: "Search" },
  },
  {
    id: "3",
    type: "default",
    position: { x: -140, y: 210 },
    data: { label: "3" },
  },
  {
    id: "4",
    type: "default",
    position: { x: 340, y: 100 },
    data: { label: "4" },
  },
  {
    id: "5",
    type: "default",
    position: { x: 240, y: 280 },
    data: { label: "5" },
  },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep"},
  { id: "e2-5", source: "2", target: "5", type: "straight"},
  { id: "e4-5", source: "4", target: "5" },
];

export default function App() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (reactFlowInstance && nodes.length > 0) {
      // This ensures the view fits all nodes after the initial render
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance, nodes]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Image and Text at the top, centered with a transparent background */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 1000,
          display: "flex",
          padding: "10px",
          flexDirection: "column",
          alignItems: "center",
          background: "transparent", // Set the background to transparent
        }}
      >
        <img
          src="/rabbitholeicon.png"
          alt="icon"
          style={{ width: "200px", height: "200px", marginBottom: "-30px" }}
        />
          <div class="reem-kufi-fun-rabbit-hole">Rabbit Hole</div>

      </div>

      {/* React Flow container adjusted to be below the header */}
      <div style={{ width: "100%", height: "100%" }} ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
