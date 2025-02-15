import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"] },
  { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"] },
  { question: "What is 5 + 7?", options: ["12", "10", "14", "15"] },
  { question: "Name a programming language that starts with 'P'.", options: ["Python", "Perl", "PHP", "Pascal"] },
  { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"] },
  { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"] },
  { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1923"] },
  { question: "What is the largest planet in our solar system?", options: ["Jupiter", "Saturn", "Earth", "Neptune"] },
  { question: "Who discovered gravity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"] },
  { question: "What is the square root of 64?", options: ["8", "6", "10", "12"] }
];

const TIMER_DURATION = 10.0; // seconds

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(timer);
          handleNext(null);
          return TIMER_DURATION;
        }
        return parseFloat((prev - 0.1).toFixed(1));
      });
    }, 100);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleNext = (userAnswer) => {
    const correctAnswer = questions[currentQuestion].options[0];
    const updatedResults = [...results, { 
      question: questions[currentQuestion].question, 
      userAnswer: userAnswer || "Not Answered", 
      correctAnswer 
    }];
    setResults(updatedResults);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(TIMER_DURATION);
    } else {
      navigate("/results", { state: { results: updatedResults } });
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
      <motion.div
        className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 blur-[120px] opacity-90 pointer-events-none"
        animate={{ rotate: [0, 360], scale: [3.0, 3.0, 3.0] }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      ></motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow w-full max-w-lg">
        <p className="text-2xl md:text-3xl font-bold text-center leading-snug text-white">
          {questions[currentQuestion].question}
        </p>
        <p className="mt-2 text-lg font-semibold text-white">{timeLeft}s</p>
      </div>

      <div className="relative z-10 w-full max-w-lg mt-auto pb-10 flex flex-col items-center space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleNext(option)}
            className="w-full px-4 py-3 border-2 border-white rounded-md bg-transparent text-white text-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
