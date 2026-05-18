import { BookOpen, CalendarCheck, Grid2X2, LogOut, UserRound, UsersRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../data/storage.js";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: Grid2X2 },
  { to: "/admin/students", label: "Students", icon: UsersRound },
  { to: "/admin/attendance", label: "Attendance", icon: CalendarCheck },
];

const studentLinks = [
  { to: "/student", label: "Dashboard", icon: Grid2X2 },
  { to: "/student/attendance", label: "My Attendance", icon: CalendarCheck },
];

export default function DashboardLayout({ title, eyebrow, description, children }) {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const links = user?.role === "admin" ? adminLinks : studentLinks;

  function handleLogout() {
    logoutUser();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <span className="brand-icon">
            <BookOpen size={28} />
          </span>
          <div>
            <h1>Helios SMS</h1>
            <p>Student Management</p>
          </div>
        </div>

        <nav className="side-nav" aria-label="Primary">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} end={link.to === `/${user.role}`}>
                <Icon size={21} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div>
            <p>{eyebrow}</p>
            <h2>{user?.role === "admin" ? "Helios Admin" : user?.name}</h2>
          </div>
          <button className="button button-ghost" type="button" onClick={handleLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </header>

        <main className="content-area">
          <section className="page-heading">
            <div>
              <h2>{title}</h2>
              {description ? <p>{description}</p> : null}
            </div>
            {user?.role === "student" ? (
              <div className="student-chip">
                <UserRound size={18} />
                {user.studentId}
              </div>
            ) : null}
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
