"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@heroui/tooltip";

function ReviewCode() {
  const router = useRouter();
  const [filesname, setFilesname] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [isFullCodeHovered, setIsFullCodeHovered] = useState(false);
  const [isFuncHovered, setIsFuncHovered] = useState(false);
  const [isClassHovered, setIsClassHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAllClasses, setShowAllClasses] = useState(false);
  const [showAllFunctions, setShowAllFunctions] = useState(false);
  const [classes, setClasses] = useState([]);
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/files/get_all_files"
        );
        const data = await response.json();

        console.log(data);

        setFilesname(data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
        setFilesname([]);
      }
    };

    fetchFiles();
  }, []);

  // show full code
  const showFullCode = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/files/get_contents/${fileName}`
      );
      const data = await response.json();
      setFileContent(data.content);
      setShowCode(true);
      setShowAllClasses(false);
      setShowAllFunctions(false);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  // show all classes
  const showClasses = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/class_finding/get_classes/${fileName}`
      );
      const data = await response.json();
      console.log(data);

      setClasses(data.classes);
      setShowAllClasses(true);
      setShowAllFunctions(false);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  // show all functions
  const showFunctions = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/functions/get_functions_under_classes/${fileName}`
      );
      const data = await response.json();
      setFunctions(data.functions_under_classes);
      setShowAllClasses(false);
      setShowAllFunctions(true);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  // choose options
  const chooseOptions = (fileName) => {
    setSelectedFile(fileName);
    setShowOptions(true);
    setShowCode(false);
    setShowAllClasses(false);
    setShowAllFunctions(false);
  };

  const deleteFile = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/files/delete/${fileName}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      <h1
        className="p-4 w-full text-2xl cursor-pointer bg-gray-300 text-black font-bold text-center"
        onClick={() => {
          router.push("/");
        }}
      >
        Code Reviewer AI
      </h1>

      <div className="flex flex-wrap gap-4 items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-amber-200">
        {filesname.length > 0 ? (
          filesname.map((file) => (
            <Tooltip
              key={file}
              content={"Click outside of the delete button to show full code!"}
            >
              <div
                className="bg-blue-500 flex flex-col w-32 h-32 rounded text-white text-center justify-center items-center cursor-pointer hover:bg-white transition"
                onClick={() => {
                  chooseOptions(file);
                }}
                draggable={true}
                onDragStart={(e) => e.dataTransfer.setData("text", file)}
                onDragEnd={(e) => {
                  e.target.style.position = "absolute";
                  e.target.style.left = `${e.clientX - e.target.offsetWidth}px`;
                  e.target.style.top = `${e.clientY - e.target.offsetHeight}px`;
                }}
              >
                {file}
                <button
                  className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded"
                  onClick={() => {
                    deleteFile(file);
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
              </div>
            </Tooltip>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No files found.</p>
        )}

        {showOptions && selectedFile && (
          <div className="mt-8 p-4 flex flex-col gap-2 border border-gray-300 rounded bg-white">
            <h2
              className={`text-lg font-bold text-center ${
                isFullCodeHovered ? "text-white" : "text-black"
              }`}
            >
              {selectedFile}
            </h2>
            <Tooltip content={"click to show full code"}>
              <button
                className={`bg-blue-400 ${
                  isFuncHovered ? "bg-white text-white" : "text-black"
                } ${
                  isClassHovered ? "bg-white text-white" : "text-black"
                } rounded-xl p-1 cursor-pointer`}
                onClick={() => {
                  showFullCode(selectedFile);
                }}
                onMouseOver={() => setIsFullCodeHovered(true)}
                onMouseOut={() => setIsFullCodeHovered(false)}
              >
                Full Code
              </button>
            </Tooltip>
            <Tooltip content={"click to show all classes"}>
              <button
                className={`bg-blue-400 ${
                  isFuncHovered ? "bg-white text-white" : "text-black"
                } rounded-xl p-1 cursor-pointer`}
                onMouseOver={() => setIsClassHovered(true)}
                onMouseOut={() => setIsClassHovered(false)}
                onClick={() => showClasses(selectedFile)}
              >
                All Classes
              </button>
            </Tooltip>
            <Tooltip content={"click to show all functions"}>
              <button
                className={`bg-blue-400 ${
                  isClassHovered ? "bg-white text-white" : "text-black"
                } rounded-xl p-1 cursor-pointer`}
                onMouseOver={() => setIsFuncHovered(true)}
                onMouseOut={() => setIsFuncHovered(false)}
                onClick={() => showFunctions(selectedFile)}
              >
                All Functions
              </button>
            </Tooltip>
          </div>
        )}

        {showCode && fileContent && (
          <div className="p-4 flex flex-col gap-2 border border-gray-300 rounded bg-white">
            <h2 className="text-xl text-center font-bold mb-4">
              File Content: {selectedFile}
            </h2>
            <pre className="whitespace-pre-wrap">{fileContent}</pre>
          </div>
        )}

        {showAllClasses && classes && (
          <div className="p-4 flex flex-col gap-2 border border-gray-300 rounded bg-white w-full max-w-xl">
            <h2 className="text-xl text-center font-bold mb-4">
              Classes: {selectedFile}
            </h2>
            <pre className="whitespace-pre-wrap w-full max-w-xl">
              {classes.map((cls, idx) => (
                <div
                  key={idx}
                  className="bg-blue-400 text-white px-4 py-1 mb-1 rounded"
                >
                  {cls}
                </div>
              ))}
            </pre>
          </div>
        )}

        {showAllFunctions && functions && (
          <div className="p-4 flex flex-col gap-2 border border-gray-300 rounded bg-white w-full max-w-xl">
            <h2 className="text-xl text-center font-bold mb-4">
              Functions Under Classes: {selectedFile}
            </h2>
            {Object.entries(functions).map(([className, funcList]) => (
              <div key={className} className="mb-2">
                <h3 className="font-semibold text-lg text-blue-700">
                  {className}
                </h3>
                <ul className="list-disc list-inside pl-4 text-gray-800">
                  {funcList.map((func, idx) => (
                    <li key={idx}>{func}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCode;
