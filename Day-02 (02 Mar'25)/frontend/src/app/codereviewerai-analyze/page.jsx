"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

function Page() {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState(""); 
  const [className, setClassName] = useState("");

  useEffect(() => {
    showFiles();
  }, []);

  const showFiles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/files");
      setFiles(response.data.files);
    } catch (error) {
      alert("Error fetching files:", error);
    }
  };

  const handleClassFinder = async (fileContent) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/class_finder", {
        file_name: "file.py",  // You can pass the actual file name if needed
        content: fileContent
      });
      setClassName(response.data.classes.join(", "));  // Join all class names as a string
    } catch (error) {
      alert("Error finding classes:", error);
    }
  };

  const showFullCode = async (file) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/files/${file}`);
      setContent(response.data.content);
      handleClassFinder(response.data.content);  // Extract classes when file is shown
    } catch (error) {
      alert("Error fetching file content:", error);
    }
  };

  const handleDelete = async (file) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/files/${file}`);
      if (response.status === 200) {
        alert(response.data.message);
        showFiles();
      } else {
        throw new Error(response.data.message || "File deletion failed");
      }
    } catch (error) {
      alert("Error deleting file:", error); 
    }
  };

  return (
    <div>
      <h1 className="text-center bg-amber-400">Code Reviewer AI Analyze</h1>
      <div className="flex justify-center items-center bg-amber-300 w-full h-screen flex-col">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file} className="flex gap-3">
              <h2 className="text-2xl font-bold cursor-pointer"
                onClick={() => showFullCode(file)}
              >
                {file}
              </h2>
              <MdDelete
                className="text-2xl cursor-pointer text-red-500"
                onClick={() => handleDelete(file)}
              />
            </div>
          ))
        ) : (
          <p className="text-lg">No files found</p>
        )}

        <br />

        {/* Display full code and class names */}
        {content && (
          <div>
            <pre className="bg-white p-4 rounded-md">
              <h2 className="text-xl font-semibold text-center text-blue-500">Class Names:</h2>
              {className}
              <br />
              <h3 className="text-xl font-semibold text-center text-blue-500">Full Code:</h3><br />
              {content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
