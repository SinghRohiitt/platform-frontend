// src/layouts/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const PrivateRoute = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  // console.log("PrivateRoute - user:", user?.role);  

  // if no user → redirect to signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // if user exists → render child routes (Outlet)
  return <Outlet />;
};

export default PrivateRoute;
