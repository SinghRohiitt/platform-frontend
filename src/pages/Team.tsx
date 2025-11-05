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

  const AllUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsers();

      // ✅ Adjust based on your API structure
      setUsers(res.users || []);

      console.log("Users:", res.users);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AllUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Team Page</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded mb-2">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
            {user.role && (
              <p className="text-xs text-gray-500">Role: {user.role}</p>
            )}
            <p className="text-sm">{user.ProjectMember[0]?.project.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
