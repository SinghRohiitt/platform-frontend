import { NavLink } from "react-router-dom";
import { Home, Users, Settings, LucideProjector, ClipboardList } from "lucide-react";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const links = [
  { name: "Dashboard", icon: Home, path: "/", role: "all" },
  { name: "Projects", icon: LucideProjector, path: "/projects", role: "ADMIN" },
  { name: "Tasks", icon: ClipboardList, path: "/project/:projectId/tasks", role: "all" },
    { name: "project", icon: LucideProjector, path: "/user/project", role: "all" },
  { name: "Team", icon: Users, path: "/team", role: "ADMIN" },
  { name: "Settings", icon: Settings, path: "/settings", role: "ADMIN" },
];

export default function Sidebar() {
   const { user } = useSelector((state: RootState) => state.auth);
   const userRole = user?.role || "guest";      
  //  console.log("Sidebar - userRole:", userRole);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold tracking-tight text-indigo-600">
          Platform
        </h1>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links
          .filter(link => link.role === "all" || link.role === userRole)
          .map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`
                }
              >
                <Icon className="w-5 h-5 opacity-90" />
                <span className="tracking-wide">{link.name}</span>
              </NavLink>
            );
          })}
      </nav>

      <div className="border-t border-gray-200 p-4 text-xs text-gray-500">
        v1.0 — Control Panel
      </div>
    </aside>
  );
}
