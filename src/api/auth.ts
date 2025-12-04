import api from "./axios";

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

export const signin = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/signin", data);
  return res.data;
};
export const getCurrentUser = async () => {
  const res = await api.get("/auth/user");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/auth/allusers");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const updateProfile = async (data: {
  name?: string;
  email?: string;
  image?: string;
}) => {
  const res = await api.put("/auth/update-profile", data);
  return res.data;
};

export const getUserLength = async () => {
  const res = await api.get("/auth/userlength");
  return res.data;
};
