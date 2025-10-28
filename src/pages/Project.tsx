import { useEffect, useState } from "react";
import { fetchProjects } from "../api/projects";

interface Project {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  createdAt: string;
}
export default function Project() {
   const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetchProjects(); // backend endpoint
        setProjects(res.projects); // make sure backend returns { projects: [...] }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">All Projects</h2>
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
              <p className="text-sm text-gray-400 mt-2">
                Created by: {project.ownerId}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}