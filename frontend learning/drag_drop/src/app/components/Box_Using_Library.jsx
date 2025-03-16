"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Box() {
  const [boxes, setBoxes] = useState(["Box 1", "Box 2", "Box 3"]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...boxes];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBoxes(items);
  };

  return (
    <div className="grid bg-amber-100 grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">Drag and Drop with library</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="boxes" direction="horizontal">
          {(provided) => (
            <main
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-row cursor-pointer gap-8 items-center sm:items-start"
            >
              {boxes.map((box, index) => (
                <Draggable key={box} draggableId={box} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-md shadow-lg"
                    >
                      {box}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </main>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Box;
