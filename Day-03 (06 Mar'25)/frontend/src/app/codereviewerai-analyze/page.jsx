"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page() {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState(""); 
  const [className, setClassName] = useState("");
  const router = useRouter();

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
        file_name: "file.py",  
        content: fileContent
      });
      setClassName(response.data.classes.join(", "));
    } catch (error) {
      console.log(error.message);
      alert("Error finding classes:", error.message);
    }
  };

  const showFullCode = async (file) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/files/${file}`);
      setContent(response.data.content);
      handleClassFinder(response.data.content);  
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
      <h1 className="text-center bg-white">Code Reviewer AI Analyze</h1>
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
          <div className="flex flex-col items-center bg-white rounded-md p-8 shadow-md">
            <p className="text-2xl font-semibold">No files found</p>
            <p className="text-lg text-gray-500">Please upload a file to analyze its code.</p>
            <Link href="/codereviewerai-file-upload" className="mt-4 text-blue-500 hover:text-blue-700 hover:underline">Upload a file</Link>
          </div>
        )}

        <br />

        {/* Display full code and class names */}
        {content && (
          <div>
            <pre className="bg-white p-4 rounded-md">
              <h2 className="text-xl font-semibold text-center text-blue-500">Class Names:</h2>
              <p className="text-center">{className}</p>
              <br /><br />
              <h3 className="text-xl font-semibold text-center text-blue-500">Full Code:</h3>
              <p className="">{content}</p>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
