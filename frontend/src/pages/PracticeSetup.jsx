import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Calculator,
  Brain,
  Languages,
  BarChart3,
  ArrowLeft,
  Play
} from "lucide-react";

const categories = [
  {
    name: "Quantitative Aptitude",
    icon: Calculator
  },
  {
    name: "Logical Reasoning",
    icon: Brain
  },
  {
    name: "Verbal Ability",
    icon: Languages
  },
  {
    name: "Data Interpretation",
    icon: BarChart3
  }
];

function PracticeSetup() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedCategory =
    location.state?.category || "Quantitative Aptitude";

  const [category, setCategory] = useState(selectedCategory);
  const [difficulty, setDifficulty] = useState("All");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const startPractice = () => {
    navigate("/aptitude/practice", {
      state: {
        category,
        difficulty,
        numberOfQuestions
      }
    });
  };

  return (
    <div className="setup-page">

      <button
        className="back-link"
        onClick={() => navigate("/aptitude")}
      >
        <ArrowLeft size={17} />
        Back to Aptitude
      </button>

      <div className="setup-header">
        <span className="page-label">PRACTICE SETUP</span>

        <h1>Configure Your Practice</h1>

        <p>
          Customize your practice session based on your preparation goals.
        </p>
      </div>

      <div className="setup-card">

        <div className="setup-section">
          <h3>Choose Category</h3>
          <p>Select the area you want to practice.</p>

          <div className="setup-category-grid">

            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={`setup-category ${
                    category === item.name ? "active" : ""
                  }`}
                  onClick={() => setCategory(item.name)}
                >
                  <Icon size={22} />

                  <span>{item.name}</span>
                </button>
              );
            })}

          </div>
        </div>


        <div className="setup-section">
          <h3>Difficulty</h3>
          <p>Choose the difficulty level.</p>

          <div className="difficulty-options">

            {["All", "Easy", "Medium", "Hard"].map((level) => (

              <button
                key={level}
                className={`difficulty-button ${
                  difficulty === level ? "active" : ""
                }`}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>

            ))}

          </div>
        </div>


        <div className="setup-section">
          <h3>Number of Questions</h3>
          <p>How many questions do you want to solve?</p>

          <div className="question-count-options">

            {[10, 20, 30, 50].map((count) => (

              <button
                key={count}
                className={`count-button ${
                  numberOfQuestions === count ? "active" : ""
                }`}
                onClick={() => setNumberOfQuestions(count)}
              >
                {count}
              </button>

            ))}

          </div>
        </div>


        <div className="setup-summary">

          <div>
            <span>Category</span>
            <strong>{category}</strong>
          </div>

          <div>
            <span>Difficulty</span>
            <strong>{difficulty}</strong>
          </div>

          <div>
            <span>Questions</span>
            <strong>{numberOfQuestions}</strong>
          </div>

        </div>


        <button
          className="start-practice-button"
          onClick={startPractice}
        >
          <Play size={19} />
          Start Practice
        </button>

      </div>

    </div>
  );
}

export default PracticeSetup;