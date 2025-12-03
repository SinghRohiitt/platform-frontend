// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoute from "./layouts/PrivateRoute";

import Dashboard from "./pages/Dashboard";
// import Tasks from "./pages/ProjectTasks";
import Team from "./pages/Team";
import Project from "./pages/Project";
import SettingsPage from "./pages/Settings";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PublicLayout from "./layouts/PublicLayout";
import ProjectTasks from "./pages/ProjectTasks";
import AdminLayout from "./layouts/AdminLayout";
import UserProject from "./pages/UserProject";
import EditProfile from "./pages/EditProfile";
import { Tasks } from "./pages/Tasks";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes (with layout) */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/project/:projectId/tasks"
              element={<ProjectTasks />}
            />
            {/* <Route path="/edit-profile" element={<EditProfile />} /> */}
            <Route path="/user/project" element={<UserProject />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route element={<AdminLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/team" element={<Team />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Route>
        <Route element={<PublicLayout />}>
          {/* Auth Routes (without layout) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
