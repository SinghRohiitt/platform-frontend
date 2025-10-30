// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
// import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          <Outlet /> {/* Renders the child routes (Dashboard, Team, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
