import React, { useState } from "react";
import { motion } from "framer-motion";
import { addQuestions } from "../utils/addQuestions";

const DATE = "02-23-2025";

const questions = [
    {
      id: `${DATE}-q1`,
      question: "Which country won the FIFA World Cup in 2018?",
      choices: ["France", "Brazil", "Germany", "Argentina"],
      answer: "france",
      date: DATE,
      difficulty: 0,
      lastUsed: null
    },
    {
      id: `${DATE}-q2`,
      question: "Who holds the record for the most home runs in a single MLB season?",
      choices: ["Barry Bonds", "Babe Ruth", "Mark McGwire", "Sammy Sosa"],
      answer: "barry bonds",
      date: DATE,
      difficulty: 2,
      lastUsed: null
    },
    {
      id: `${DATE}-q3`,
      question: "How many players are there on a standard basketball team on the court at one time?",
      choices: ["5", "6", "7", "4"],
      answer: "5",
      date: DATE,
      difficulty: 1,
      lastUsed: null
    },
    {
      id: `${DATE}-q4`,
      question: "Which NFL team has won the most Super Bowls?",
      choices: ["New England Patriots", "Pittsburgh Steelers", "Dallas Cowboys", "San Francisco 49ers"],
      answer: "new england patriots",
      date: DATE,
      difficulty: 3,
      lastUsed: null
    },
    {
      id: `${DATE}-q5`,
      question: "Who is the fastest man in the world, holding the 100m world record?",
      choices: ["Usain Bolt", "Tyson Gay", "Yohan Blake", "Carl Lewis"],
      answer: "usain bolt",
      date: DATE,
      difficulty: 1,
      lastUsed: null
    },
    {
      id: `${DATE}-q6`,
      question: "Which team won the NBA championship in 2020?",
      choices: ["Los Angeles Lakers", "Miami Heat", "Golden State Warriors", "Milwaukee Bucks"],
      answer: "los angeles lakers",
      date: DATE,
      difficulty: 2,
      lastUsed: null
    },
    {
      id: `${DATE}-q7`,
      question: "Which golfer has won the most major championships?",
      choices: ["Jack Nicklaus", "Tiger Woods", "Arnold Palmer", "Ben Hogan"],
      answer: "jack nicklaus",
      date: DATE,
      difficulty: 4,
      lastUsed: null
    },
    {
      id: `${DATE}-q8`,
      question: "In which sport would you perform a 'slam dunk'?",
      choices: ["Basketball", "Tennis", "Soccer", "Volleyball"],
      answer: "basketball",
      date: DATE,
      difficulty: 0,
      lastUsed: null
    },
    {
      id: `${DATE}-q9`,
      question: "What is the maximum break in a single frame of snooker?",
      choices: ["147", "155", "167", "180"],
      answer: "147",
      date: DATE,
      difficulty: 5,
      lastUsed: null
    },
    {
      id: `${DATE}-q10`,
      question: "Which country is known as the birthplace of modern Olympic Games?",
      choices: ["Greece", "United States", "France", "United Kingdom"],
      answer: "greece",
      date: DATE,
      difficulty: 2,
      lastUsed: null
    }
  ];

  const AddQuestions: React.FC = () => {
    const [status, setStatus] = useState<string | null>(null);
  
    const handleAddQuestions = async () => {
      setStatus("Adding questions...");
      try {
        await addQuestions(questions); // Call generalized function
        setStatus("🔥 Questions added successfully!");
      } catch (error) {
        setStatus("❌ Error adding questions.");
        console.error(error);
      }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-screen w-screen text-white overflow-hidden">
          <motion.div
            className="fixed inset-0 w-screen h-screen bg-gradient-to-r from-blue-500 via-pink-500 to-orange-500 blur-[120px] opacity-90 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          ></motion.div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            <button
              onClick={handleAddQuestions}
              className="px-6 py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg"
            >
              Add Questions
            </button>
            {status && <p className="mt-4 text-lg">{status}</p>}
          </div>
        </div>
      );
    };
    
    export default AddQuestions;
