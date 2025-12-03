import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks";
type TaskType = {
  id: string;
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "PENDING" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  project: {
    id: string;
    title: string;
    description: string;
  };
  creator: {
    id: string;
    name: string;
    email: string;
  };
};

export const Tasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await getAllTasks();
      console.log("Fetched tasks:", res);
      setTasks(res.tasks); // 👈 mapping tasks array
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
        Tasks
      </h1>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 relative overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer"
          >
            {/* Decorative background lights */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 rounded-full blur-2xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-purple-300/20 to-pink-300/20 rounded-full blur-2xl -z-10"></div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {task.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {task.description}
            </p>

            {/* Extra Info */}
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold text-gray-700">Project:</span>{" "}
                {task.project?.title}
              </p>

              <p>
                <span className="font-semibold text-gray-700">Created By:</span>{" "}
                {task.creator?.name}
              </p>

              <p>
                <span className="font-semibold text-gray-700">Priority:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    task.priority === "HIGH"
                      ? "bg-red-100 text-red-600"
                      : task.priority === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.priority}
                </span>
              </p>

              <p>
                <span className="font-semibold text-gray-700">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    task.status === "COMPLETED"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              <p className="text-gray-500 text-xs">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Action Button */}
            <button className="mt-4 w-full py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
              View Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
