"use client";
import React, { useState } from "react";

function Box2() {
  const [boxes, setBoxes] = useState(["Box 1", "Box 2", "Box 3"]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedItem === null) return;

    const updatedBoxes = [...boxes];
    const item = updatedBoxes[draggedItem];

    updatedBoxes.splice(draggedItem, 1);
    updatedBoxes.splice(index, 0, item);

    setBoxes(updatedBoxes);
    setDraggedItem(null);
  };
  return (
    <div className="grid bg-amber-100 grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Drag and Drop without library</h1>

      <main className="flex flex-row cursor-pointer gap-8 items-center sm:items-start">
        {boxes.map((box, index) => (
          <div
          className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-md shadow-lg cursor-pointer"
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            {box}
          </div>
        ))}
      </main>
    </div>
  );
}

export default Box2;
