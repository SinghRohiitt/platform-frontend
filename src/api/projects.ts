import api from "./axios";

export const fetchProjects = async (page = 1, limit = 20) => {
  const res = await api.get(`/projects?page=${page}&limit=${limit}`);
  return res.data; // { success, projects, total, page, totalPages }
};

export const createProject = async (data: { title: string; description?: string }) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const updateProjectById = async (id: string, data: any) => {
  const res = await api.put(`/projects/${id}`, data, { withCredentials: true });
  return res.data;
};

// ✅ Delete project
export const deleteProjectById = async (id: string) => {
  const res = await api.delete(`/projects/${id}`, { withCredentials: true });
  return res.data;
};
