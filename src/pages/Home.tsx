import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export default function Home() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const hasCompletedQuiz = localStorage.getItem("quizCompleted");

  useEffect(() => {
    if (hasCompletedQuiz) {
      const calculateTimeRemaining = () => {
        const now = new Date();
        const nextQuizTime = new Date(now);
        nextQuizTime.setUTCDate(now.getUTCDate() + 1);
        nextQuizTime.setUTCHours(5, 0, 0, 0); // 12:00 AM Eastern Time (UTC-5)

        const diff = nextQuizTime.getTime() - now.getTime();
        setTimeRemaining(diff > 0 ? diff : 0);
      };

      calculateTimeRemaining();
      const timer = setInterval(calculateTimeRemaining, 1000);

      return () => clearInterval(timer);
    }
  }, [hasCompletedQuiz]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 blur-[120px] opacity-90"
        style={{
          backgroundImage: "linear-gradient(90deg, #0000FF 20%, #FF1493 50%, #FFA500 80%)",
        }}
        animate={{
          rotate: [0, 360],
          scale: [3.0, 3.0, 3.0],
        }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg space-y-6 text-white">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-wide">10Q</h1>
        <p className="text-lg md:text-xl max-w-lg">A daily 10-question challenge to test your knowledge.</p>

        {!hasCompletedQuiz ? (
          <Link to="/quiz">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-semibold text-lg md:text-xl rounded-lg shadow-md hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Start Quiz
            </motion.button>
          </Link>
        ) : (
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">Come back tomorrow for another 10Q daily quiz!</p>
            <p className="mt-2 text-lg">Next quiz unlocks in:</p>
            <p className="mt-2 text-2xl font-bold text-yellow-300">{timeRemaining !== null ? formatTime(timeRemaining) : "Loading..."}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
