"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import useRouter

function Welcome() {
  const [isReviewing, setIsReviewing] = useState(false);
  const router = useRouter(); // ✅ Initialize router

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 max-w-lg text-center text-white"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold tracking-wide"
        >
          Welcome to <span className="text-blue-300">CodeReviewerAI</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg mt-2 text-gray-200"
        >
          Your AI-powered assistant for reviewing and improving code.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/codereviewerai")} // ✅ Navigate correctly
          className="mt-6 px-6 py-3 bg-blue-500 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Review My Code
        </motion.button>

        {isReviewing && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-sm text-gray-300"
          >
            Upload your code file to begin the review process.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default Welcome