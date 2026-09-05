import { Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="auth-page">

      <div className="auth-left">

        <div className="auth-brand">
          <div className="brand-icon">
            <Brain size={22} />
          </div>

          <span>PrepSphere</span>
        </div>

        <div className="auth-content">
          <span className="eyebrow">START YOUR JOURNEY</span>

          <h1>
            Your preparation.
            <br />
            Your progress.
          </h1>

          <p>
            Build strong aptitude skills and improve your
            communication through realistic GD practice.
          </p>
        </div>

      </div>

      <div className="auth-right">

        <div className="auth-box">

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Start your preparation journey today.
          </p>

          <form>

            <label>Full name</label>
            <input
              type="text"
              placeholder="Your name"
            />

            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
            />

            <button className="primary-btn auth-btn">
              Create Account
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="switch-auth">
            Already have an account?
            <Link to="/login"> Sign in</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;