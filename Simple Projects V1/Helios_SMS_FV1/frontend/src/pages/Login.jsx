import { BookOpen, LogIn } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";
import { defaultStudentPassword, loginUser } from "../data/storage.js";

export default function Login({ themeTools }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("admin@helios.edu");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = loginUser(email, password);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    const fallback = result.user.role === "admin" ? "/admin" : "/student";
    navigate(location.state?.from?.pathname || fallback, { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-label="Helios login">
        <div className="login-theme-slot">
          <ThemeToggle theme={themeTools.theme} onToggle={themeTools.toggleTheme} />
        </div>

        <div className="login-brand">
          <span className="login-logo">
            <BookOpen size={34} />
          </span>
          <h1>Helios Student Management System</h1>
          <p>Sign in with your admin or student account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />

          {error ? <p className="form-error">{error}</p> : null}

          <button className="button button-primary" type="submit">
            <LogIn size={21} />
            Login
          </button>
        </form>

        <div className="credential-strip" aria-label="Demo credentials">
          <span>Admin: admin@helios.edu / admin123</span>
          <span>Student password: {defaultStudentPassword}</span>
        </div>
      </section>
    </main>
  );
}
