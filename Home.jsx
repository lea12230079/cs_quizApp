import React, { useState } from 'react';
import { questions } from '../questions';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Quiz Finished! Your score: ${score}`);
      setQuizActive(false);
      setCurrentQuestion(0);
    }
  };

  return (
    <section className={`home-section ${quizActive ? 'blur' : ''}`}>
      {!quizActive ? (
        <div className="home-content">
          <h1>Quiz Guide</h1>
          <p>Test your knowledge with our interactive quiz system!</p>
          <button className="start-btn" onClick={() => setShowPopup(true)}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-box active">
          <div className="quiz-header">
            <span>Score: {score} / {questions.length}</span>
          </div>
          <h2 className="question-text">
            {questions[currentQuestion].numb}. {questions[currentQuestion].question}
          </h2>
          <div className="option-list">
            {questions[currentQuestion].options.map((opt, i) => (
              <button key={i} className="option" onClick={() => opt === questions[currentQuestion].answer && setScore(score + 1)}>
                {opt}
              </button>
            ))}
          </div>
          <div className="quiz-footer">
            <span className="question-total">{currentQuestion + 1} of {questions.length} Questions</span>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup-info active">
          <h2>Quiz Guide</h2>
          <span className="info">1. You have 15 seconds per question.</span>
          <div className="btn-group">
            <button className="info-btn" onClick={() => setShowPopup(false)}>Exit Quiz</button>
            <button className="info-btn" onClick={() => {setQuizActive(true); setShowPopup(false);}}>Continue</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;