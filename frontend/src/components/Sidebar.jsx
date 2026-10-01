import {
  LayoutDashboard,
  Calculator,
  UsersRound,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut,
  Brain,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Aptitude",
      icon: Calculator,
      path: "/aptitude",
    },
    {
      name: "GD Practice",
      icon: UsersRound,
      path: "/gd-practice",
    },
    {
      name: "Assessments",
      icon: ClipboardCheck,
      path: "/assessment",
    },
    {
      name: "My Progress",
      icon: BarChart3,
      path: "/progress",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Brain size={22} />
        </div>

        <div>
          <h2>PrepSphere</h2>
          <span>Learn • Practice • Perform</span>
        </div>
      </div>

      <div className="menu-section">
        <p className="menu-title">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <NavLink to="/settings" className="menu-item">
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>

        <button className="logout">
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;