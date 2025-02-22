import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import AddQuestions from "./pages/AddQuestions"; // Generalized question adding page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/add-questions" element={<AddQuestions />} /> {/* Generalized route */}
      </Routes>
    </Router>
  );
}

export default App;
