import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

// --- Quiz Data (from your questions.js) ---
const questions = [
  { numb: 1, question: "What does HTML stand for?", answer: "C.Hyper Text Markup Language", options: ["A.Hyper Type Multi Language", "B.Hyper Text Multiple Language", "C.Hyper Text Markup Language", "D.Home Text Multi Language"] },
  { numb: 2, question: "What does CSS stand for?", answer: "A.Cascading Style Sheet", options: ["A.Cascading Style Sheet", "B.Cute Style Sheet", "C.Computer Style Sheet", "D.Codehal Style Sheet"] },
  { numb: 3, question: "What does PHP stand for?", answer: "A.Hypertext Preprocessor", options: ["A.Hypertext Preprocessor", "B.Hometext Programming", "C.Hypertext Preprogramming", "D.Programming Hypertext Preprocessor"] },
  { numb: 4, question: "What does SQL stand for?", answer: "D.Structured Query Language", options: ["A.Strenght Query Language", "B.Stylesheet Query Language", "C.Science Questions Language", "D.Structured Query Language"] },
  { numb: 5, question: "What does XML stand for?", answer: "D.Extensible Markup Language", options: ["A.Excellent Multiple Language", "B.Explore Multiple Language", "C.Extra Markup Language", "D.Extensible Markup Language"] }
];

// --- Page Components ---
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      alert(`Final Score: ${score} / ${questions.length}`);
      setQuizActive(false);
      setCurrentIdx(0);
      setScore(0);
    }
  };

  return (
    <section className="home-container">
      {!quizActive ? (
        <div className={`home-content ${showPopup ? 'blur' : ''}`}>
          <h1>Quiz Website</h1>
          <p>Test Your Knowledge</p>
          <button className="start-btn" onClick={() => setShowPopup(true)}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-box active">
          <h1>CS Quiz</h1>
          <div className="quiz-header">
            <span>Quiz Website</span>
            <span className="header-score">score {score} / {questions.length}</span>
          </div>
          <h2 className="question-text">{questions[currentIdx].question}</h2>
          <div className="option-list">
            {questions[currentIdx].options.map((opt, i) => (
              <div key={i} className="option" onClick={() => opt === questions[currentIdx].answer && setScore(score + 1)}>
                <span>{opt}</span>
              </div>
            ))}
          </div>
          <div className="quiz-footer">
            <span className="question-total">{currentIdx + 1} of {questions.length} Questions</span>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup-info active">
          <h2>Quiz Guide</h2>
          <span className="info">1. Select the best answer for each question.</span>
          <span className="info">2. You cannot go back once you click Next.</span>
          <div className="btn-group">
            <button className="info-btn exit-btn" onClick={() => setShowPopup(false)}>Exit Quiz</button>
            <button className="info-btn continue-btn" onClick={() => {setQuizActive(true); setShowPopup(false);}}>Continue</button>
          </div>
        </div>
      )}
    </section>
  );
};

const About = () => <div className="page-content"><h1>About Us</h1><p>This is a React-based Quiz application for Phase 2.</p></div>;
const Services = () => <div className="page-content"><h1>Services</h1><p>We provide educational testing and CS fundamentals.</p></div>;
const Contact = () => <div className="page-content"><h1>Contact</h1><p>Email: student@university.edu</p></div>;

// --- Main App ---
export default function App() {
  return (
    <Router>
      <header className="header">
        <Link to="/" className="logo">Quiz.</Link>
        <nav className="navbar">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}