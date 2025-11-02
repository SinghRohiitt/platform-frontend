
import api from "./axios"

export const signup = async (data: { name: string; email: string; password: string })=> {
const res =  await api.post("/auth/signup", data)
return res.data
}

export const signin = async (data: { email: string; password: string })=> {
const res =  await api.post("/auth/signin", data)
return res.data
}
export const getCurrentUser = async () => {
  const res = await api.get("/auth/user");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/auth/allusers");
  return res.data;
};