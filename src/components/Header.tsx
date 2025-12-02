import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Bell, Mail } from "lucide-react";
import { Link } from "react-router-dom"; // 👈 ADD THIS

export const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  console.log("Header - user:", user);

  return (
    <header className="h-20 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md border-gray-200 sticky top-0 z-20">
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition flex items-center justify-center">
          <Mail className="w-5 h-5 text-gray-600" />
        </button>

        <button className="relative p-2 hover:bg-gray-100 rounded-full transition flex items-center justify-center">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* ⭐ Entire Profile Section Clickable */}
        <Link
          to="/edit-profile" // 👈 Route
          className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 transition px-3 py-1.5 rounded-full cursor-pointer shadow-sm border border-gray-200"
        >
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 leading-none">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">
              {user?.email}
            </p>
          </div>

          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        </Link>
      </div>
    </header>
  );
};
