import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onSchedule } from "firebase-functions/v2/scheduler";

initializeApp();
const db = getFirestore();

const TIMEZONE = "America/New_York"; // ✅ Runs on EST time
const QUESTION_COUNT = 10; // ✅ Number of questions in QOTD

export const generateQOTD = onSchedule(
  {
    schedule: "0 9 * * *", // ✅ Runs every day at 9:00 AM EST
    timeZone: TIMEZONE,
  },
  async () => {
    const today = new Date().toLocaleDateString("en-US", {
      timeZone: TIMEZONE,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    const formattedDate = today.replace(/\//g, "-"); // ✅ Converts MM/DD/YYYY → MM-DD-YYYY
    console.log(`📅 Generating QOTD for: ${formattedDate}`);

    const questionsRef = db.collection("questions");

    // 🔹 Step 1: Get questions assigned to today
    const snapshot = await questionsRef.where("date", "==", formattedDate).get();
    let selectedQuestions = snapshot.docs.map((doc) => doc.id);

    // 🔹 Step 2: If fewer than 10, grab random ones
    if (selectedQuestions.length < QUESTION_COUNT) {
      const remaining = QUESTION_COUNT - selectedQuestions.length;
      console.log(`⚠️ Only found ${selectedQuestions.length}. Filling ${remaining} randomly.`);

      const randomSnapshot = await questionsRef
        .orderBy("difficulty", "desc") // (Optional) Select harder questions first
        .limit(remaining)
        .get();

      const randomQuestions = randomSnapshot.docs.map((doc) => doc.id);
      selectedQuestions = [...selectedQuestions, ...randomQuestions];
    }

    // 🔹 Step 2.5: Update the "lastUsed" field for each selected question
    const batch = db.batch();
    selectedQuestions.forEach((questionId) => {
      const questionDocRef = questionsRef.doc(questionId);
      batch.update(questionDocRef, { lastUsed: formattedDate });
    });
    await batch.commit();
    console.log(`✅ Updated lastUsed for ${selectedQuestions.length} questions.`);

    // 🔹 Step 3: Save today's questions in "qotd" collection
    await db.collection("qotd").doc(formattedDate).set({
      date: formattedDate,
      questions: selectedQuestions,
      createdAt: new Date(),
    });

    console.log(`✅ QOTD for ${formattedDate} updated with ${selectedQuestions.length} questions.`);
  }
);
