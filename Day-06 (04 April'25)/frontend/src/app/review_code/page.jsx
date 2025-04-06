"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@heroui/tooltip";

function ReviewCode() {
  const router = useRouter();
  const [filesname, setFilesname] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [isFuncHovered, setIsFuncHovered] = useState(false);
  const [isClassHovered, setIsClassHovered] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("http://localhost:8000/files/all_files");
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

  const showFullCode = async (fileName) => {
    try {
      const response = await fetch(
        `http://localhost:8000/files/get_contents/${fileName}`
      );
      const data = await response.json();
      console.log(data);

      setFileContent(data.content);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
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
                  showFullCode(file);
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
        {fileContent && (
          <div className="mt-8 p-4 flex flex-col gap-2 border border-gray-300 rounded bg-white">
            {/* <h2 className="text-xl text-center font-bold mb-4">File Content:</h2>
            <pre className="whitespace-pre-wrap">{fileContent}</pre> */}
            <Tooltip content={"click to show full code"}>
              <button className={`bg-blue-400 ${isFuncHovered ? 'bg-white text-white' : 'text-black'} ${isClassHovered ? 'bg-white text-white' : 'text-black'} rounded-xl p-1 cursor-pointer`}>
                Full Code
              </button>
            </Tooltip>
            <Tooltip content={"click to show all classes"}>
              <button className={`bg-blue-400 ${isFuncHovered ? 'bg-white text-white' : 'text-black'} rounded-xl p-1 cursor-pointer`}
                onMouseOver={() => setIsClassHovered(true)}
                onMouseOut={() => setIsClassHovered(false)}
              >
                All Classes
              </button>
            </Tooltip>
            <Tooltip content={"click to show all functions"}>
              <button className={`bg-blue-400 ${isClassHovered ? 'bg-white text-white' : 'text-black'} rounded-xl p-1 cursor-pointer`}
                onMouseOver={() => setIsFuncHovered(true)}
                onMouseOut={() => setIsFuncHovered(false)}
              >
                All Functions
              </button>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCode;
