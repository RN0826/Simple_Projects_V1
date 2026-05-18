import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, getTheme, setTheme } from "./data/storage.js";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Students from "./pages/Students.jsx";
import Attendance from "./pages/Attendance.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import StudentAttendance from "./pages/StudentAttendance.jsx";

function RequireRole({ children, role }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;

  return children;
}

export default function App() {
  const [theme, updateTheme] = useState(getTheme);

  useEffect(() => {
    document.body.dataset.theme = theme;
    setTheme(theme);
  }, [theme]);

  const themeTools = useMemo(
    () => ({
      theme,
      toggleTheme: () => updateTheme((current) => (current === "dark" ? "light" : "dark")),
    }),
    [theme],
  );

  return (
    <Routes>
      <Route path="/login" element={<Login themeTools={themeTools} />} />
      <Route
        path="/admin"
        element={
          <RequireRole role="admin">
            <AdminDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/admin/students"
        element={
          <RequireRole role="admin">
            <Students />
          </RequireRole>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <RequireRole role="admin">
            <Attendance />
          </RequireRole>
        }
      />
      <Route
        path="/student"
        element={
          <RequireRole role="student">
            <StudentDashboard />
          </RequireRole>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <RequireRole role="student">
            <StudentAttendance />
          </RequireRole>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
