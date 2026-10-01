import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">
      <div>
        <p className="welcome-small">Welcome back 👋</p>
        <h1>Good evening, Student</h1>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={18} />
          <input placeholder="Search..." />
        </div>

        <button className="notification">
          <Bell size={19} />
          <span></span>
        </button>

        <div className="profile">
          <div className="avatar">AS</div>

          <div>
            <strong>Student</strong>
            <small>Candidate</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;