import React from 'react'
import Welcome from '../Components/Welcome'

function page() {
  return (
    <div>
        <div className="flex justify-center w-screen h-screen items-center flex-col gap-1 bg-amber-100">
        <h1 className = "text-3xl font-bold text-black justify-center items-center text-center py-5">Code Reviewer AI</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload a Python File</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Analyze Your Code</button>
        </div>
    </div>
  )
}

export default page
