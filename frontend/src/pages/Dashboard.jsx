import {
  Calculator,
  UsersRound,
  ClipboardCheck,
  Flame,
  ArrowRight,
  Trophy,
} from "lucide-react";

import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <div className="dashboard">

      <section className="hero-card">
        <div>
          <span className="hero-label">YOUR PREPARATION JOURNEY</span>

          <h2>
            Build confidence.
            <br />
            Perform better.
          </h2>

          <p>
            Practice aptitude, sharpen your reasoning,
            and master group discussions.
          </p>

          <button className="primary-btn">
            Continue Practice
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="hero-progress">
          <div className="progress-circle">
            <strong>72%</strong>
            <span>Overall</span>
          </div>
        </div>
      </section>

      <section className="stats-grid">

        <StatCard
          icon={<Calculator size={21} />}
          title="Questions Solved"
          value="247"
          subtitle="+18 this week"
        />

        <StatCard
          icon={<UsersRound size={21} />}
          title="GD Sessions"
          value="12"
          subtitle="3 this week"
        />

        <StatCard
          icon={<ClipboardCheck size={21} />}
          title="Assessments"
          value="18"
          subtitle="78% avg. score"
        />

        <StatCard
          icon={<Flame size={21} />}
          title="Current Streak"
          value="7 Days"
          subtitle="Keep it going!"
        />

      </section>

      <section className="dashboard-grid">

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Continue Learning</h3>
              <p>Pick up where you left off</p>
            </div>

            <button className="text-btn">
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="learning-item">
            <div className="learning-icon aptitude">
              <Calculator size={20} />
            </div>

            <div className="learning-info">
              <strong>Quantitative Aptitude</strong>
              <span>Percentage & Profit/Loss</span>

              <div className="mini-progress">
                <div style={{ width: "68%" }}></div>
              </div>
            </div>

            <strong className="percentage">68%</strong>
          </div>

          <div className="learning-item">
            <div className="learning-icon gd">
              <UsersRound size={20} />
            </div>

            <div className="learning-info">
              <strong>Group Discussion</strong>
              <span>Communication Skills</span>

              <div className="mini-progress">
                <div style={{ width: "52%" }}></div>
              </div>
            </div>

            <strong className="percentage">52%</strong>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Performance</h3>
              <p>Your current strengths</p>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Reasoning</span>
              <strong>82%</strong>
            </div>

            <div className="skill-bar">
              <div style={{ width: "82%" }}></div>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Quantitative</span>
              <strong>76%</strong>
            </div>

            <div className="skill-bar">
              <div style={{ width: "76%" }}></div>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Communication</span>
              <strong>71%</strong>
            </div>

            <div className="skill-bar">
              <div style={{ width: "71%" }}></div>
            </div>
          </div>

          <div className="skill">
            <div>
              <span>Confidence</span>
              <strong>64%</strong>
            </div>

            <div className="skill-bar">
              <div style={{ width: "64%" }}></div>
            </div>
          </div>
        </div>

      </section>

      <section className="bottom-grid">

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Recommended for You</h3>
              <p>Based on your recent performance</p>
            </div>
          </div>

          <div className="recommendation">
            <div className="recommendation-icon">
              <Trophy size={20} />
            </div>

            <div>
              <strong>Probability Basics</strong>
              <p>Your accuracy is below 60% in this topic.</p>
            </div>

            <button className="outline-btn">Practice</button>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Recent Activity</h3>
              <p>Your latest attempts</p>
            </div>
          </div>

          <div className="activity">
            <div className="activity-dot"></div>
            <div>
              <strong>Aptitude Assessment</strong>
              <span>Score: 78/100 • 2 hours ago</span>
            </div>
          </div>

          <div className="activity">
            <div className="activity-dot"></div>
            <div>
              <strong>GD Practice</strong>
              <span>Topic: AI in Education • Yesterday</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}

export default Dashboard;