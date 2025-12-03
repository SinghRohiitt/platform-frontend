import api from "./axios";

// ✅ Create Task for a specific project
export const createTask = async (projectId: string, data: any) => {
  // console.log("Creating task for project:", projectId);
  const res = await api.post(`/tasks/create/${projectId}`, data);

  return res.data;
};

// ✅ Get tasks of a specific project
export const getTasksByProject = async (projectId: string) => {
  const res = await api.get(`/tasks/get/${projectId}`);
  return res.data;
};

// ✅ Update task details (status or anything)
export const updateTaskById = async (taskId: string, data: any) => {
  const res = await api.put(`/tasks/${taskId}`, data);
  return res.data;
};

// ✅ Delete task
export const deleteTaskById = async (taskId: string) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};
export const assignTaskToUser = async (taskId: string, userId: string | null) => {
  return (await api.put(`/tasks/assign/${taskId}`, { assignedTo: userId || null })).data;
};

export const getAllTasks = async () => {
  const res = await api.get(`/tasks/`);
  return res.data;
}