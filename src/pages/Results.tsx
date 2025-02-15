import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-screen w-screen px-6 py-10 text-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 blur-[120px] opacity-90 pointer-events-none"
        animate={{ rotate: [0, 360], scale: [3.0, 3.0, 3.0] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg h-full overflow-y-auto">
        <h1 className="text-3xl font-bold text-center text-white">Quiz Results</h1>
        <ul className="mt-6 space-y-4 w-full">
          {results.map((result, index) => {
            const isCorrect = result.userAnswer === result.correctAnswer;
            return (
              <li
                key={index}
                className={`p-4 border rounded-lg text-white text-lg ${isCorrect ? 'border-green-500 bg-green-700' : 'border-red-500 bg-red-700'}`}
              >
                <p className="font-semibold">{result.question}</p>
                <p className="text-sm text-gray-300">Your Answer: {result.userAnswer || "Not Answered"}</p>
                <p className="text-sm text-gray-300">Correct Answer: {result.correctAnswer}</p>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-white text-black rounded-md text-lg font-semibold hover:bg-gray-200 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    </motion.div>
  );
}
