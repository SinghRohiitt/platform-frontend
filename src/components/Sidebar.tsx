import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  Plus,

  LucideProjector,
  ClipboardList,
} from "lucide-react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const links = [
  { name: "Dashboard", icon: Home, path: "/", role: "all" },
  { name: "Projects", icon: LucideProjector, path: "/projects", role: "ADMIN" },
  {
    name: "Tasks",
    icon: ClipboardList,
    path: "/project/:projectId/tasks",
    role: "all",
  },
  {
    name: "project",
    icon: LucideProjector,
    path: "/user/project",
    role: "all",
  },
  { name: "Team", icon: Users, path: "/team", role: "ADMIN" },
  { name: "Settings", icon: Settings, path: "/settings", role: "ADMIN" },
];

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role || "guest";

  return (
    <aside className="w-72 flex flex-col">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <img src={logo}></img>
          </div>
          <h1 className="text-xl font-bold text-gray-800">Platform.io</h1>
        </div>
      </div>

      {/* Create New Button */}
      <div className="px-4 mb-8">
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-between transition-colors shadow-sm">
          <span className="font-medium">Create New Pitch</span>
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {links
          .filter((link) => link.role === "all" || link.role === userRole)
          .map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-lg text-md font-bold transition-all uppercase
                  ${
                    isActive
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
      </nav>

      {/* Upgrade Section */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="mb-3">
            <div className="w-full h-24  rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Users className="w-8 h-8 text-indigo-600 mx-auto mb-1" />
                <div className="text-xs text-gray-600">Collaboration</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mb-3">
            Upgrade to PRO for more features
          </p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 text-sm font-medium transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
