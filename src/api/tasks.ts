import api from "./axios";

// ✅ Create Task
export const createTask = async (data: any) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

// ✅ Get tasks for a project
export const getTasksByProject = async (projectId: string) => {
  const res = await api.get(`/tasks?projectId=${projectId}`);
  return res.data;
};

// ✅ Update task
export const updateTaskById = async (id: string, data: any) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

// ✅ Delete task
export const deleteTaskById = async (id: string) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
