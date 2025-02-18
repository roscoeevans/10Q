import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  // Prevent user from retaking the quiz
  useEffect(() => {
    localStorage.setItem("quizCompleted", "true");
  }, []);

  // Debugging: Log results to check if timeLeft is being recorded properly
  useEffect(() => {
    console.log("Quiz Results Data (checking timeLeft):", results);
    results.forEach((result, index) => {
      console.log(`Question ${index + 1}:`, result.question, "| Time Left:", result.timeLeft);
    });
  }, [results]);

  // Calculate total score
  const totalScore = results.reduce((acc, result) => {
    if (result.userAnswer === result.correctAnswer) {
      return acc + 10 + (result.timeLeft ?? 0);
    }
    return acc;
  }, 0).toFixed(1).replace(/\.0+$/, "");

  const shareResults = () => {
    const emojiResults = results.map(result => result.userAnswer === result.correctAnswer ? "🟩" : "🟥").join(" ");
    const date = new Date().toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
    const message = `10Q - ${date}\nScore: ${totalScore} points\n${emojiResults}\n\nCan you beat my score?`;
    const smsLink = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsLink;
  };

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

        {/* Score Display */}
        <div className="mt-4 text-xl font-semibold text-center text-white bg-gray-800 px-6 py-3 rounded-lg">
          Total Score: <span className="text-yellow-300">{totalScore} points</span>
        </div>

        <ul className="mt-6 space-y-4 w-full">
          {results.map((result, index) => {
            console.log("Processing result:", result); // Debugging
            const isCorrect = result.userAnswer === result.correctAnswer;
            const timeBonus = result.timeLeft ?? 0;
            const score = isCorrect ? (10 + timeBonus).toFixed(1).replace(/\.0+$/, "") : 0;

            return (
              <li
                key={index}
                className={`p-4 border rounded-lg text-white text-lg ${isCorrect ? 'border-green-500 bg-green-700' : 'border-red-500 bg-red-700'}`}
              >
                <p className="font-semibold">{result.question}</p>
                <p className="text-sm text-gray-300">Your Answer: {result.userAnswer || "Not Answered"}</p>
                <p className="text-sm text-gray-300">Correct Answer: {result.correctAnswer}</p>
                <p className="text-sm text-gray-300">Time Left: {timeBonus} seconds</p>
                {isCorrect ? (
                  <p className="text-sm font-bold text-yellow-300">Score: {score} points (includes {timeBonus} sec time bonus)</p>
                ) : (
                  <p className="text-sm font-bold text-yellow-300">Score: 0 points</p>
                )}
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

        <button
          onClick={shareResults}
          className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
        >
          Challenge Your Friends
        </button>
      </div>
    </motion.div>
  );
}