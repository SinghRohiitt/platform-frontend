// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="h-screen w-full flex  text-gray-900 overflow-hidden">

      {/* Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className=" mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
