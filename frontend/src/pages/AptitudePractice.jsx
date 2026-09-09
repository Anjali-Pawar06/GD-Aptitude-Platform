import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import questions from "../data/Questions";


function AptitudePractice() {
    const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const question = questions[currentQuestion];

  const selectAnswer = (index) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: index
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  const submitPractice = () => {
  let correct = 0;

  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.answer) {
      correct++;
    }
  });

  const incorrect = questions.length - correct;

  navigate("/result", {
    state: {
      correct,
      incorrect,
      total: questions.length
    }
  });
};

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="practice-page">

      {/* Header */}
      <div className="practice-header">

        <div>
          <span className="page-label">QUANTITATIVE APTITUDE</span>

          <h1>Aptitude Practice</h1>

          <p>
            Test your skills and improve your placement preparation.
          </p>
        </div>

        <div className="practice-timer">
          <Clock size={18} />
          <span>10:00</span>
        </div>

      </div>


      {/* Progress */}
      <div className="question-progress">

        <div className="progress-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      </div>


      {/* Question Card */}
      <div className="question-card">

        <div className="question-number">
          Question {currentQuestion + 1}
        </div>

        <h2>{question.question}</h2>

        <div className="options-list">

          {question.options.map((option, index) => (

            <button
              key={index}
              className={`option ${
                selectedAnswers[currentQuestion] === index
                  ? "selected"
                  : ""
              }`}
              onClick={() => selectAnswer(index)}
            >

              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option}</span>

              {selectedAnswers[currentQuestion] === index && (
                <CheckCircle
                  size={20}
                  className="option-check"
                />
              )}

            </button>

          ))}

        </div>

      </div>


      {/* Navigation */}
      <div className="question-navigation">

        <button
          className="secondary-button"
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft size={18} />
          Previous
        </button>


        {currentQuestion === questions.length - 1 ? (

         <button
  className="submit-button"
  onClick={submitPractice}
>
  Submit Practice
  <CheckCircle size={18} />
</button>

        ) : (

          <button
            className="primary-button"
            onClick={nextQuestion}
          >
            Next
            <ChevronRight size={18} />
          </button>

        )}

      </div>

    </div>
  );
}

export default AptitudePractice;