"use client";

import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from "reactflow";

import "@xyflow/react/dist/style.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [classContents, setClassContents] = useState({});
  const [hoveredClass, setHoveredClass] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showFullCode, setShowFullCode] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);

        if (selectedFile.name.endsWith(".py")) {
          const classMatches = [
            ...content.matchAll(
              /class\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?:\((.*?)\))?:\s*([\s\S]*?)(?=\nclass\s+[A-Za-z_]|$)/g
            ),
          ];

          if (classMatches.length > 0) {
            const classMap = {};
            let classNodes = [];
            let classEdges = [];
            let contentMap = {};

            classMatches.forEach((match, index) => {
              const className = match[1];
              const parentClass = match[2] ? match[2].trim() : null;
              const classBody = match[3].trim();

              classMap[className] = index;
              contentMap[className] =
                classBody || "No content inside this class.";

              classNodes.push({
                id: className,
                data: { label: className },
                position: { x: index * 200, y: parentClass ? 200 : 50 },
                type: "customNode",
              });

              if (parentClass && classMap[parentClass] !== undefined) {
                classEdges.push({
                  id: `edge-${parentClass}-${className}`,
                  source: parentClass,
                  target: className,
                  animated: true,
                });
              }
            });

            setNodes(classNodes);
            setEdges(classEdges);
            setClassContents(contentMap);
          }
        }
      };

      reader.readAsText(selectedFile);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      customNode: ({ data }) => {
        const handleMouseEnter = (event) => {
          setHoveredClass(data.label);
          setTooltipPosition({
            x: event.clientX,
            y: event.clientY + 10,
          });
        };

        const handleMouseLeave = () => {
          setHoveredClass(null);
        };

        return (
          <div
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer w-[120px] text-center"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {data.label}
            <Handle type="target" position="top" />
            <Handle type="source" position="bottom" />
          </div>
        );
      },
    }),
    []
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4">
        <label className="cursor-pointer bg-blue-700 text-white text-xl px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition">
          Upload a Python File
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>

        {file && (
          <button
            className="bg-green-600 text-white text-xl px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() => setShowFullCode(true)}
          >
            Show Full Code
          </button>
        )}
      </div>

      <div className="w-screen h-screen border rounded-lg shadow-md">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {hoveredClass && classContents[hoveredClass] && (
        <div
          className="absolute bg-white text-black p-4 rounded-lg shadow-lg border border-gray-300 max-w-sm"
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
          }}
        >
          <h2 className="text-lg font-semibold text-blue-700">
            {hoveredClass}
          </h2>
          <pre className="text-gray-700 mt-2 whitespace-pre-wrap">
            {classContents[hoveredClass] || "No content found."}
          </pre>
        </div>
      )}

      {showFullCode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Full Code of {file?.name}
            </h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[400px] whitespace-pre-wrap">
              {fileContent}
            </pre>
            <button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => setShowFullCode(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
