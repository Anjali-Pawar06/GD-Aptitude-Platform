import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Brain,
  Languages,
  BarChart3,
  ArrowRight,
  Clock,
  BookOpen
} from "lucide-react";

const categories = [
  {
    title: "Quantitative Aptitude",
    description: "Numbers, percentages, probability, profit & loss and more.",
    icon: Calculator,
    questions: 120,
    difficulty: "Easy to Hard"
  },
  {
    title: "Logical Reasoning",
    description: "Improve your analytical and logical thinking skills.",
    icon: Brain,
    questions: 95,
    difficulty: "Easy to Hard"
  },
  {
    title: "Verbal Ability",
    description: "Practice grammar, vocabulary, comprehension and more.",
    icon: Languages,
    questions: 80,
    difficulty: "Easy to Hard"
  },
  {
    title: "Data Interpretation",
    description: "Analyze charts, tables and numerical data efficiently.",
    icon: BarChart3,
    questions: 65,
    difficulty: "Medium to Hard"
  }
];

function Aptitude() {
    const navigate = useNavigate();
  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <span className="page-label">APTITUDE</span>

          <h1>Aptitude Practice</h1>

          <p>
            Sharpen your problem-solving skills with focused practice
            designed for placement preparation.
          </p>
        </div>
      </div>

      <div className="aptitude-summary">

        <div className="summary-item">
          <BookOpen size={22} />
          <div>
            <strong>360+</strong>
            <span>Questions</span>
          </div>
        </div>

        <div className="summary-item">
          <Clock size={22} />
          <div>
            <strong>Timed</strong>
            <span>Practice</span>
          </div>
        </div>

        <div className="summary-item">
          <BarChart3 size={22} />
          <div>
            <strong>Track</strong>
            <span>Your Progress</span>
          </div>
        </div>

      </div>

      <div className="section-heading">
        <div>
          <h2>Choose a Category</h2>
          <p>Start practicing the area you want to improve.</p>
        </div>
      </div>

      <div className="category-grid">

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <div className="category-card" key={category.title}>

              <div className="category-icon">
                <Icon size={24} />
              </div>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <div className="category-meta">
                <span>{category.questions} Questions</span>
                <span>{category.difficulty}</span>
              </div>

             <button
  className="practice-button"
  onClick={() =>
  navigate("/aptitude/setup", {
    state: {
      category: category.title
    }
  })
}
>
  Start Practice
  <ArrowRight size={17} />
</button>

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Aptitude;