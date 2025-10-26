import api from "./axios";

export const fetchProjects = async (page = 1, limit = 20) => {
  const res = await api.get(`/projects?page=${page}&limit=${limit}`);
  return res.data; // { success, projects, total, page, totalPages }
};

export const createProject = async (data: { title: string; description?: string }) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const updateProject = async (id: string, data: { title?: string; description?: string }) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id: string) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};
