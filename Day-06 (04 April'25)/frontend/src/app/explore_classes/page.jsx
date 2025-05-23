"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Navbar from "../../../components/Navbar";

function ExploreClasses() {
  const router = useRouter();
  const [classes, setClasses] = useState([]);

  const searchParams = useSearchParams();
  const selectedFile = searchParams.get("file");

  // show all classes
  const showAllClasses = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/class_finding/get_classes/${fileName}`
      );
      const data = await response.json();
      console.log(data);

      setClasses(data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  const makeDraggable = (e) => {
    let isDragging = false;
    let X, Y;

    const element = e.target;

    // Start dragging on mousedown
    element.addEventListener("mousedown", (e) => {
      isDragging = true;
      X = e.clientX - element.getBoundingClientRect().left;
      Y = e.clientY - element.getBoundingClientRect().top;
      element.style.position = "absolute";
    });

    // Move the box on mousemove
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      element.style.left = `${e.clientX - X}px`;
      element.style.top = `${e.clientY - Y}px`;
    });

    // Stop dragging on mouseup
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  };

  return (
    <div>
      <Navbar/>

      <div className="flex flex-wrap gap-4 items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-amber-200">
        {/* hidden */}

        {showAllClasses && classes && (
          <div className="flex flex-col gap-10 justify-center items-center text-center">
            <div className="cursor-pointer">
              <button
                className="bg-blue-500 rounded-sm h-full w-40 cursor-pointer"
                onClick={() => {
                  showAllClasses(selectedFile);
                }}
              >
                Show All Classes
              </button>
            </div>

            <div className="text-center font-semibold max-w-xl">
              {/* {classes.join('\n')} */}
              <div className="flex flex-row gap-5">
                {classes.map((cls, index) => (
                  <div
                    key={index}
                    className="bg-blue-400 cursor-pointer rounded-xl font-bold text-white h-32 w-32 text-center justify-center items-center flex"
                    // draggable={true}
                    // onDragStart={(e) => {
                    //   e.dataTransfer.setData("text", cls);
                    // }}
                    // onDragEnd={(e) => {
                    //   e.target.style.position = "absolute";
                    //   e.target.style.left = `${e.clientX - e.target.offsetWidth}px`;
                    //   e.target.style.top = `${e.clientY - e.target.offsetHeight}px`;
                    // }}

                    onMouseOver={(e) => {
                      makeDraggable(e);
                    }}
                  >
                    {cls}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreClasses;
