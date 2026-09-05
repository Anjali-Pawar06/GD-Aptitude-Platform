import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/aptitude"
          element={
            <DashboardLayout>
              <h2>Aptitude</h2>
            </DashboardLayout>
          }
        />

        <Route
          path="/gd-practice"
          element={
            <DashboardLayout>
              <h2>GD Practice</h2>
            </DashboardLayout>
          }
        />

        <Route
          path="/assessment"
          element={
            <DashboardLayout>
              <h2>Assessments</h2>
            </DashboardLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;