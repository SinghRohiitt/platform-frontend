import { useEffect, useState } from "react";
import {
  createProject,
  fetchProjects,
  updateProjectById,
  deleteProjectById,
} from "../api/projects";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description?: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function Project() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate = useNavigate();
  // Create Modal
  const [open, setOpen] = useState(false);

  // Create form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Edit Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setEditData(project);
    setEditModalOpen(true);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchProjects();
      setProjects(res.projects);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create New Project
  const handleCreateProject = async (e: any) => {
    e.preventDefault();

    try {
      const res = await createProject({ title, description });

      setProjects((prev) => [res.project, ...prev]);

      setOpen(false);
      setTitle("");
      setDescription("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating project");
    }
  };

  // ✅ Update Project
  const submitUpdate = async () => {
    if (!editData) return;

    try {
      const res = await updateProjectById(editData.id, {
        title: editData.title,
        description: editData.description,
      });

      setProjects((prev) =>
        prev.map((p) => (p.id === editData.id ? res.project : p))
      );

      setEditModalOpen(false);
    } catch (e) {
      alert("Failed to update project");
    }
  };

  // ✅ Delete Project
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteProjectById(id);

      setProjects((prev) => prev.filter((p) => p.id !== id));

      Swal.fire("Deleted!", "Your project has been removed.", "success");
    } catch (e) {
      Swal.fire("Error", "Failed to delete project", "error");
    }
  };

  // ✅ LOADING / ERROR UI
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Projects</h2>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          + Add Project
        </button>
      </div>

      {/* ✅ Create Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>

        <form className="space-y-4" onSubmit={handleCreateProject}>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Create
          </button>
        </form>
      </Modal>

      {/* ✅ Projects List */}
      {projects.length === 0 ? (
        <p>No projects found</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <li
              key={project.id}
              className="p-4 bg-white shadow rounded hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg">{project.title}</h3>

              {project.description && (
                <p className="text-gray-600 mt-1">{project.description}</p>
              )}

              <div className="mt-3 p-2 bg-gray-50 rounded">
                <p className="text-sm text-gray-700">
                  Owner:{" "}
                  <span className="font-semibold">{project?.owner?.name}</span>
                </p>
                <p className="text-sm text-gray-500">{project?.owner?.email}</p>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-3">
                <button
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  onClick={() => navigate(`/project/${project.id}/tasks`)}
                >
                  add task
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  onClick={() => handleDelete(project.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ EDIT MODAL */}
      {editModalOpen && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

            <input
              type="text"
              className="w-full p-2 border rounded mb-3"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              className="w-full p-2 border rounded mb-3"
              value={editData.description || ""}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={submitUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
