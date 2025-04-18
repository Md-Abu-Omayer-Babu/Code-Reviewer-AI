import React from "react";

function Navbar() {
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
    </div>
  );
}

export default Navbar;
