"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useState } from "react";

function page() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [filename, setFilename] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilename(selectedFile.name);
  };

  const handleReview = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setMessage("File uploaded successfully");
        if (data.message === "File uploaded successfully") {
          alert(data.message);
          router.push("/codereviewerai-analyze");
        }

      } else {
        throw new Error(data.message || "File upload failed");
      }
    } catch (error) {
      alert(error.message);
      setMessage(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center w-screen h-screen items-center flex-col gap-1 bg-amber-100">
        <h1 className="text-3xl font-bold text-green-700 justify-center items-center text-center py-5">
          Code Reviewer AI
        </h1>

        {/* file input */}
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer p-2 bg-blue-600 text-white rounded-md shadow-gray-400 m-1"
          onClick={handleUpload}
        >
          Choose a file
        </label>
        {filename && (
          <p className="text-lg text-gray-700 font-semibold">{filename}</p>
        )}

        <button
          className="cursor-pointer p-2 bg-green-700 text-white rounded-md shadow-gray-400 m-1"
          onClick={handleReview}
        >
          Review Your Code
        </button>
      </div>
    </div>
  );
}

export default page;
