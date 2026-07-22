import "./DashboardLayout.css";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Sidebar />
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <Topbar />
        </header>

        <main className="dashboard-content">{children}</main>
      </section>
    </div>
  );
}
