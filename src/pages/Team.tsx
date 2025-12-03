import { useEffect, useState } from "react";
import { getAllUsers } from "../api/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  ProjectMember: [
    {
      project: {
        id: string;
        title: string;
      };
    }
  ];
}

export default function Team() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const AllUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.users || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading team members...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-6 md:p-8">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="mb-4">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Team Members
                </h1>
                <p className="text-gray-600 text-sm md:text-base">
                  Manage and view all team members
                </p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Total Members
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {users.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-medium text-gray-800"
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xl">
                  ✓
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Active Members
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {users.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-xl">
                  📊
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Assigned to Projects
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      users.filter(
                        (u) => u.ProjectMember && u.ProjectMember[0]?.project
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xl">
                  👤
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Unassigned
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {
                      users.filter(
                        (u) => !u.ProjectMember || !u.ProjectMember[0]?.project
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members List */}
        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-gray-300 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No members found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-white font-semibold text-sm">
                <div className="col-span-4">Member</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-3">Current Project</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="px-6 py-4 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200 group"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Member Info */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          ID: {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">✉️</span>
                        <p className="text-sm text-gray-600 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-span-2">
                      {user.role ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                          {user.role}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                          Member
                        </span>
                      )}
                    </div>

                    {/* Current Project */}
                    <div className="col-span-3">
                      {user.ProjectMember && user.ProjectMember[0]?.project ? (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                          <span className="text-indigo-500">📊</span>
                          <p className="text-sm font-medium text-indigo-700 truncate">
                            {user.ProjectMember[0].project.title}
                          </p>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          No project assigned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
