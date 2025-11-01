import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createTask, deleteTaskById, getTasksByProject } from "../api/tasks";
import Swal from "sweetalert2";

export default function ProjectTasks() {
  const { id: projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getTasksByProject(projectId!);
    setTasks(res.tasks);
  };

  const handleCreateTask = async (e: any) => {
    e.preventDefault();

    const res = await createTask({
      title,
      description,
      priority,
      projectId,
      assignedTo,
    });

    setTasks((prev) => [res.task, ...prev]);
    setOpen(false);
  };

  const handleDelete = async (taskId: string) => {
    const confirm = await Swal.fire({
      title: "Delete Task?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    await deleteTaskById(taskId);
    setTasks((prev) => prev.filter((t: any) => t.id !== taskId));

    Swal.fire("Deleted!", "Task removed", "success");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Tasks for Project</h2>

        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded"
          onClick={() => setOpen(true)}
        >
          + Add Task
        </button>
      </div>

      {/* ✅ Task Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-3">Create Task</h2>

            <form className="space-y-3" onSubmit={handleCreateTask}>
              <input
                type="text"
                placeholder="Task title"
                className="w-full border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <select
                className="w-full border p-2 rounded"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <input
                type="text"
                placeholder="Assigned To (User ID)"
                className="w-full border p-2 rounded"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />

              <button className="w-full bg-indigo-600 text-white py-2 rounded">
                Create
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Show tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map((task: any) => (
          <div key={task.id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>

            <p className="mt-2 text-sm">
              Priority: <b>{task.priority}</b>
            </p>

            <p className="text-sm">Status: {task.status}</p>

            <button
              onClick={() => handleDelete(task.id)}
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
