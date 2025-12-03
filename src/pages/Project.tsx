import { useEffect, useState } from "react";
import {
  createProject,
  fetchProjects,
  updateProjectById,
  deleteProjectById,
  assignUsers,
} from "../api/projects";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../api/auth";

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
  const [open, setOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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

  const openAssignModal = async (project: Project) => {
    setSelectedProjectId(project.id);
    const res = await getAllUsers();
    setUsers(res.users);
    setAssignModalOpen(true);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 md:p-8">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Project Management
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Organize and manage your projects efficiently
              </p>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
            >
              <span className="text-xl">+</span>
              <span>Create Project</span>
            </button>
          </div>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md` flex justify-center items-center p-4 z-50">
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Decorative gradient circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10"></div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Create New Project
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateProject} className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-indigo-500">📝</span>
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-gray-800"
                    placeholder="Enter project title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-blue-500">📄</span>
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none min-h-[120px] font-medium text-gray-800 resize-none"
                    placeholder="Describe your project"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Button */}
                <button className="w-full px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
                  Create Project
                </button>
              </form>
            </div>
          </div>
        </Modal>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <div className="text-gray-300 text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first project to get started
            </p>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 font-medium"
            >
              <span className="text-xl">+</span>
              <span>Create Project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-5">
                  <h3 className="font-bold text-xl text-white truncate">
                    {project.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-4">
                  {project.description && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  )}

                  {/* Owner Info */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {project?.owner?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          Project Owner
                        </p>
                        <p className="font-semibold text-gray-800 truncate">
                          {project?.owner?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {project?.owner?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 font-medium transition-all duration-200"
                      onClick={() => handleEdit(project)}
                    >
                      <span>✏️</span>
                      <span>Edit</span>
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 text-sm rounded-lg hover:bg-green-100 font-medium transition-all duration-200"
                      onClick={() => navigate(`/project/${project.id}/tasks`)}
                    >
                      <span>📋</span>
                      <span>Tasks</span>
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 text-purple-600 text-sm rounded-lg hover:bg-purple-100 font-medium transition-all duration-200"
                      onClick={() => openAssignModal(project)}
                    >
                      <span>👥</span>
                      <span>Members</span>
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 font-medium transition-all duration-200"
                      onClick={() => handleDelete(project.id)}
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editModalOpen && editData && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex justify-center items-center p-4 z-50">
            <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl border border-white/50 relative overflow-hidden">
              {/* Decorative gradient background */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10"></div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Edit Project
                </h2>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-indigo-500">📝</span>
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-medium text-gray-800"
                    placeholder="Enter project title"
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-blue-500">📄</span>
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all outline-none min-h-[120px] font-medium text-gray-800 resize-none"
                    placeholder="Describe your project"
                    value={editData.description || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    className="flex-1 px-5 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all hover:scale-105 active:scale-95"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    onClick={submitUpdate}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Assign Members Modal */}
        {assignModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Assign Team Members
              </h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 mb-6">
                {users.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all border border-gray-100"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => {
                        setSelectedUsers((prev) =>
                          prev.includes(user.id)
                            ? prev.filter((u) => u !== user.id)
                            : [...prev, user.id]
                        );
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-all"
                  onClick={() => setAssignModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={async () => {
                    await assignUsers(selectedProjectId!, selectedUsers);
                    Swal.fire(
                      "Updated!",
                      "Members assigned successfully",
                      "success"
                    );
                    setAssignModalOpen(false);
                  }}
                >
                  Save Members
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
