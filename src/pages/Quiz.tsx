import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  "What is the capital of France?",
  "Who wrote 'To Kill a Mockingbird'?",
  "What is 5 + 7?",
  "Name a programming language that starts with 'P'.",
  "What is the chemical symbol for gold?",
  "Who painted the Mona Lisa?",
  "What year did the Titanic sink?",
  "What is the largest planet in our solar system?",
  "Who discovered gravity?",
  "What is the square root of 64?"
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer(""); // Clear input for next question
    } else {
      alert("Quiz completed! Redirecting to results...");
      // TODO: Navigate to results page
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswer("");
    }
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center h-screen w-screen px-6 py-10 text-white overflow-hidden"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 blur-[120px] opacity-90 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(90deg, #0000FF 20%, #FF1493 50%, #FFA500 80%)"
        }}
        animate={{
          rotate: [0, 360],
          scale: [3.0, 3.0, 3.0]
        }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      ></motion.div>

      {/* Question centered on screen */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-2xl md:text-3xl font-bold text-center leading-snug text-white">
          {questions[currentQuestion]}
        </p>
      </div>

      {/* Footer with input and navigation arrows */}
      <div className="relative z-10 w-full max-w-lg mt-auto pb-10 flex flex-col items-center space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full px-4 py-3 border-2 border-white rounded-md bg-transparent text-white placeholder-white/70 text-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
        />
        <div className="flex justify-between w-full mt-4">
          <motion.button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            whileTap={{ scale: 0.85 }}
            className="text-white text-6xl bg-transparent p-6 focus:outline-none focus-visible:ring-0 active:bg-transparent transition-transform"
            onMouseDown={(e) => e.preventDefault()}
          >
            &#8592;
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileTap={{ scale: 0.85 }}
            className="text-white text-6xl bg-transparent p-6 focus:outline-none focus-visible:ring-0 active:bg-transparent transition-transform"
            onMouseDown={(e) => e.preventDefault()}
          >
            &#8594;
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
