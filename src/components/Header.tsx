import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("Header - user:", user);

  return (
    <header className="flex justify-end items-center p-4 md:p-6 bg-white shadow sticky top-0 z-10">

      <div className="flex items-center space-x-3">

        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          ✉️
        </button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          🔔
        </button>

        <div className="flex items-center bg-indigo-50 rounded-full px-3 py-1 shadow-sm hover:shadow-md transition">
          
          <div className="mr-2 text-sm">
            <p className="font-medium">{user?.name}</p>
            <p className="text-gray-500 text-xs">{user?.email}</p>
          </div>

          <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>

        </div>
      </div>
    </header>
  );
};
