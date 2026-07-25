/*
Theme Logic
Handles dark/light switching and theme persistence exactly as the source project does.
===========================================
*/

(() => {
  /* ================= THEME ================= */
  const themeBtn = document.getElementById("themeToggle");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("light-mode", !isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("dark-mode")
        ? "light"
        : "dark";

      applyTheme(nextTheme);
    });
  }
})();
