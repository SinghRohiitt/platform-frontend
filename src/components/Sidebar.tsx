// components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { Home, ClipboardList, Users, Settings, LucideProjector} from "lucide-react";

const links = [
  { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/" },
   { name: "Projects", icon: <LucideProjector className="w-5 h-5" />, path: "/projects" },
  { name: "Tasks", icon: <ClipboardList className="w-5 h-5" />, path: "/tasks" },
  { name: "Team", icon: <Users className="w-5 h-5" />, path: "/team" },
  { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col  md:flex">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">Platform</h1>
      </div>

      

      <nav className="flex flex-col space-y-1 px-4 mt-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition ${
                isActive ? "bg-indigo-100 text-indigo-700" : "hover:bg-gray-100"
              }`
            }
          >
            {link.icon} {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
