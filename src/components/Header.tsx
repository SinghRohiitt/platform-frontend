

export default function Header() {
  return (
    <header className="flex justify-end  items-center p-4 md:p-6 bg-white shadow sticky top-0 z-10">
      {/* Navigation Links on the LEFT */}
  

      {/* User Info on the RIGHT */}
      <div className="flex items-center space-x-3">
        {/* Optional notifications */}
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          ✉️
        </button>
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          🔔
        </button>

        {/* User avatar and name */}
        <div className="flex items-center bg-indigo-50 rounded-full px-3 py-1 shadow-sm hover:shadow-md transition">
          <div className="mr-2 text-sm">
            <p className="font-medium">Alyssa Jones</p>
            <p className="text-gray-500 text-xs">Product Manager</p>
          </div>
          <div className="w-10 h-10 bg-indigo-500 text-white flex items-center justify-center rounded-full font-bold">
            AJ
          </div>
        </div>
      </div>
    </header>
  );
}
