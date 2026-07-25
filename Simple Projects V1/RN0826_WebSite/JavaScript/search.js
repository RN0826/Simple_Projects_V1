/*
Search Logic
Handles expandable search, Escape close, Ctrl+K, and Ctrl+ArrowDown shortcuts.
===========================================
*/

(() => {
  /* ================= SEARCH ================= */
  const searchToggle = document.getElementById("searchToggle");

  if (searchToggle) {
    (function () {
      const bar = document.getElementById("searchBar");
      const input = document.getElementById("searchInput");
      let open = false;

      function openSearch() {
        open = true;
        bar.classList.add("open");
        setTimeout(() => input.focus(), 50);
      }
      function closeSearch() {
        open = false;
        bar.classList.remove("open");
      }

      searchToggle.addEventListener("click", () =>
        open ? closeSearch() : openSearch(),
      );

      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "ArrowDown") {
          e.preventDefault();
          open ? closeSearch() : openSearch();
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
          e.preventDefault();
          open ? closeSearch() : openSearch();
        }
        if (e.key === "Escape" && open) closeSearch();
      });
    })();
  }
})();
