import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const TIMER_DURATION = 12.0;

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Quiz() {
  type Question = {
    question: string;
    choices: string[];
    correctAnswer: string;
    id: string;
  };
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ question: string; selected: string; correct: string }[]>([]);
  const navigate = useNavigate();

  let anonID = localStorage.getItem("anonymousID") || "";
  
  useEffect(() => {
    async function fetchQOTD() {
      const today = new Date()
        .toLocaleDateString("en-US", {
          timeZone: "America/New_York",
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");

      try {
        const qotdRef = doc(db, "qotd", today);
        const qotdSnapshot = await getDoc(qotdRef);

        if (!qotdSnapshot.exists()) {
          setError("No quiz available for today.");
          setLoading(false);
          return;
        }

        const { questions: questionIDs } = qotdSnapshot.data();
        if (!questionIDs || questionIDs.length === 0) {
          setError("No questions found for today's quiz.");
          setLoading(false);
          return;
        }

        const questionRefs = questionIDs.map((id) => doc(db, "questions", id));
        const questionSnapshots = await Promise.all(questionRefs.map((q) => getDoc(q)));

        const questionsList = questionSnapshots
          .filter((q) => q.exists())
          .map((q) => {
            const questionData = q.data();
            return {
              question: questionData.question,
              choices: shuffleArray(questionData.choices),
              correctAnswer: questionData.answer,
              id: q.id,
            };
          });

        if (questionsList.length === 0) {
          setError("No valid questions found.");
        } else {
          setQuestions(questionsList);
        }
      } catch (err) {
        console.error("Error fetching QOTD:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchQOTD();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => parseFloat((prev - 0.1).toFixed(1))), 100);
      return () => clearTimeout(timer);
    } else {
      handleNext(null);
    }
  }, [timeLeft]);

  const handleNext = async (userAnswer) => {
    if (questions.length === 0) return;

    const today = new Date()
      .toLocaleDateString("en-US", {
        timeZone: "America/New_York",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-");

    const currentQ = questions[currentQuestion];
    const isCorrect = userAnswer?.toLowerCase() === currentQ.correctAnswer.toLowerCase();
    
    const newAnswer = {
      question: currentQ.question,
      selected: userAnswer,
      correct: currentQ.correctAnswer,
    };

    setUserAnswers((prev) => [...prev, newAnswer]);

// Update Firestore
try {
  const questionRef = doc(db, "questions", currentQ.id, "responses", anonID);
  await setDoc(questionRef, { response: userAnswer, isCorrect });

  const userRef = doc(db, "users", anonID, "qotd", today, "responses", currentQ.id);
  await setDoc(userRef, { response: userAnswer, isCorrect });
} catch (error) {
  console.error("Error updating Firestore:", error);
}

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(TIMER_DURATION);
    } else {
      navigate("/results", { state: { userAnswers: [...userAnswers, newAnswer] } });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white text-2xl">Loading today's quiz...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-white text-2xl">{error}</div>;
  }

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

      {questions.length > 0 && (
        <div className="relative z-10 flex flex-col items-center h-full w-full max-w-lg text-center px-6">
          <div className="flex flex-col items-center justify-center flex-1 space-y-2">
            <p className="text-3xl font-bold text-white px-6">{questions[currentQuestion].question}</p>
            <p className="text-lg font-semibold text-white">{timeLeft.toFixed(1)}s</p>
          </div>

          <div className="w-full max-w-lg px-6 flex flex-col space-y-4 pb-10">
            {questions[currentQuestion].choices.map((option, index) => (
              <button
                key={index}
                onClick={() => handleNext(option)}
                className="w-full px-4 py-3 border-2 border-white rounded-md bg-transparent text-white text-lg hover:bg-white hover:text-black transition-all duration-300"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
