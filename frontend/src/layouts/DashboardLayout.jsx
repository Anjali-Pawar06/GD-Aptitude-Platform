import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <Topbar />

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;