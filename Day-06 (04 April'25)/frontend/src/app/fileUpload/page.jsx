"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function fileUpload() {
  const router = useRouter();
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleUpload = async (e) => {
    e.preventDefault()

    if (!file) {
      setStatus('Please select a file')
      return
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('http://localhost:8000/files/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      setStatus(data.message)
      
    } catch (error) {
      console.error(error)
      setStatus('Failed to upload file')
    }
  }

  useEffect(() => {
    if(status === 'File uploaded successfully!'){
      setTimeout(() => {
        setStatus('')
      }, 3000)
    }
  }, [status])

  return (
    <div>
      <h1 className="p-4 w-full text-2xl cursor-pointer bg-gray-300 text-black font-bold text-center"
        onClick={() => {
          router.push('/')
        }}
      >
        Code Reviewer AI
      </h1>
      <div className="flex bg-gray- flex-col gap-4 items-center justify-center min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        
        <form className="flex flex-col items-center gap-4">
          <input
            type="file" 
            className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:text-black hover:bg-blue-500 text-white px-6 py-2 rounded-md cursor-pointer"
            onClick={handleUpload}
          >
            Upload
          </button>
        </form>
        <p>{status}</p>

        <div>
          <button 
            className="bg-green-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-green-400 hover:text-black"
            onClick={() => {
              router.push('/review_code')
            }}
          >
            Review Your Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default fileUpload;
