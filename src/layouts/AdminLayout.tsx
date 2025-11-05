// src/layouts/AdminLayout.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AdminLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  console.log("AdminLayout - user:", user);

  // 🔒 If not logged in → go to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 🚫 If logged in but NOT admin → show no access + redirect
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed → load the protected page
  return <Outlet />;
};

export default AdminLayout;
