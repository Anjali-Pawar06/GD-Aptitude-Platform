import React from "react";
import { CheckCircle, XCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state || {
    score: 0,
    total: 5,
    correct: 0,
    incorrect: 5
  };

  const percentage = Math.round(
    (result.correct / result.total) * 100
  );

  return (
    <div className="result-page">

      <div className="result-card">

        <div className="result-icon">
          <CheckCircle size={42} />
        </div>

        <span className="page-label">
          PRACTICE COMPLETED
        </span>

        <h1>Great job! 🎉</h1>

        <p className="result-subtitle">
          Here is your performance summary.
        </p>


        {/* Score */}
        <div className="score-section">

          <div className="score-circle">
            <strong>{percentage}%</strong>
            <span>Score</span>
          </div>

          <div className="score-text">
            <strong>
              {result.correct} / {result.total}
            </strong>

            <span>
              Questions answered correctly
            </span>
          </div>

        </div>


        {/* Stats */}
        <div className="result-stats">

          <div className="result-stat">
            <CheckCircle size={20} />
            <strong>{result.correct}</strong>
            <span>Correct</span>
          </div>

          <div className="result-stat">
            <XCircle size={20} />
            <strong>{result.incorrect}</strong>
            <span>Incorrect</span>
          </div>

          <div className="result-stat">
            <strong>{result.total}</strong>
            <span>Total</span>
          </div>

        </div>


        {/* Buttons */}
        <div className="result-actions">

          <button
            className="secondary-button"
            onClick={() => navigate("/aptitude")}
          >
            <ArrowLeft size={18} />
            Back to Aptitude
          </button>

          <button
            className="primary-button"
            onClick={() =>
              navigate("/aptitude/practice")
            }
          >
            <RotateCcw size={18} />
            Practice Again
          </button>

        </div>

      </div>

    </div>
  );
}

export default Result;