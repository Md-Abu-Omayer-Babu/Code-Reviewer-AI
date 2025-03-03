"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function Page() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    showFiles();
  }, []);

  const showFiles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/files", {
        method: "GET",
      });
      const data = await response.json();
      setFiles(data.files); 
    } catch (error) {
      alert("Error fetching files:", error);
    }
  };

  const showFullCode = async (file) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/files/${file}`, {
        method: "GET",
      });

      const data = await response.json();
      alert(data.content)
      return data.content;
    }catch(error){
      alert(error.message);
    }
  }

  const handleDelete = async (file) => {
    try{
      const response = await fetch(`http://127.0.0.1:8000/files/${file}`, {
        method: "DELETE"
      })
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        showFiles(); 
      }else{
        throw new Error(data.message || "File deletion failed");
      }
    }catch(error){
      alert(error.message);
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
              >{file}</h2>
              <MdDelete
                className="text-2xl cursor-pointer text-red-500"
                onClick={() => handleDelete(file)}
              />
            </div>
          ))
        ) : (
          <p className="text-lg">No files found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
