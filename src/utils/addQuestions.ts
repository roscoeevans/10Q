import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path is correct

// General function to add questions
export async function addQuestions(questions: any[]) {
  try {
    for (let question of questions) {
      const questionRef = doc(db, "questions", question.id);
      await setDoc(questionRef, question);
    }
    console.log("🔥 Questions added successfully!");
  } catch (error) {
    console.error("❌ Error adding questions:", error);
  }
}
