import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const questions = [
  {
    id: "02-20-2025-q1",
    question: "What is the name of Tony Stark's superhero persona?",
    choices: ["Iron Man", "Spider-Man", "Hulk", "Thor"],
    answer: "iron man",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q2",
    question: "Which Infinity Stone is housed in the Eye of Agamotto?",
    choices: ["Time Stone", "Reality Stone", "Mind Stone", "Power Stone"],
    answer: "time stone",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q3",
    question: "Who is the villain in the first Avengers movie (2012)?",
    choices: ["Loki", "Thanos", "Ultron", "Red Skull"],
    answer: "loki",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q4",
    question: "What is the real name of Black Panther?",
    choices: ["T'Challa", "M'Baku", "Shuri", "N'Jadaka"],
    answer: "t'challa",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q5",
    question: "Which MCU movie introduced Spider-Man?",
    choices: ["Captain America: Civil War", "Avengers: Age of Ultron", "Spider-Man: Homecoming", "Iron Man 3"],
    answer: "captain america: civil war",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q6",
    question: "What is the name of Thor's enchanted hammer?",
    choices: ["Mjolnir", "Stormbreaker", "Gungnir", "Excalibur"],
    answer: "mjolnir",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q7",
    question: "Which character said 'I can do this all day'?",
    choices: ["Captain America", "Iron Man", "Black Widow", "Hawkeye"],
    answer: "captain america",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q8",
    question: "What is the name of the organization that created the Winter Soldier program?",
    choices: ["HYDRA", "S.H.I.E.L.D.", "A.I.M.", "The Hand"],
    answer: "hydra",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q9",
    question: "What was the first MCU film to introduce Wakanda?",
    choices: ["Captain America: Civil War", "Black Panther", "Avengers: Infinity War", "Iron Man 2"],
    answer: "captain america: civil war",
    date: "02-20-2025",
    difficulty: 40.0,
    lastUsed: null
  },
  {
    id: "02-20-2025-q10",
    question: "In 'Doctor Strange in the Multiverse of Madness,' which universe designation is given to the main MCU universe?",
    choices: ["Earth-616", "Earth-838", "Earth-199999", "Earth-42"],
    answer: "earth-616",
    date: "02-20-2025",
    difficulty: 0,
    lastUsed: null
  }
];

export async function addQuestions() {
  try {
    for (let question of questions) {
      const questionRef = doc(db, "questions", question.id);
      await setDoc(questionRef, question);
    }
    console.log("🔥 questions added successfully!");
  } catch (error) {
    console.error("❌ Error adding questions:", error);
  }
}
