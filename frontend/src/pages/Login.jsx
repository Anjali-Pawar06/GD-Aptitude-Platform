import { Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
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
          <span className="eyebrow">SMARTER PREPARATION</span>

          <h1>
            Prepare today.
            <br />
            Perform with confidence.
          </h1>

          <p>
            Practice aptitude and group discussions,
            track your progress, and become interview-ready.
          </p>
        </div>

      </div>

      <div className="auth-right">

        <div className="auth-box">

          <span className="mobile-logo">PrepSphere</span>

          <h2>Welcome back</h2>

          <p className="auth-subtitle">
            Sign in to continue your preparation.
          </p>

          <form>

            <label>Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

            <div className="forgot">
              <span></span>
              <a href="#">Forgot password?</a>
            </div>

            <button className="primary-btn auth-btn">
              Sign In
              <ArrowRight size={18} />
            </button>

          </form>

          <p className="switch-auth">
            Don't have an account?
            <Link to="/register"> Create one</Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;