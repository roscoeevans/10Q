import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

export default function Home() {
  useEffect(() => {
    let anonID = localStorage.getItem("anonymousID");
    if (!anonID) {
      anonID = `user-${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("anonymousID", anonID);
    }
    console.log("User Anonymous ID:", anonID);
  }, []);
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

        <Link to="/quiz">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-white text-white font-semibold text-lg md:text-xl rounded-lg shadow-md hover:bg-white hover:text-gray-900 transition-all duration-300"
          >
            Start Quiz
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
