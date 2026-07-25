/*
Navbar Logic
Handles navigation indicator, hover shimmer positioning, and active button state.
===========================================
*/

(() => {
  /* ================= NAVBAR ================= */
  const nav = document.getElementById("segNav");

  if (nav) {
    const buttons = nav.querySelectorAll(".seg-btn");
    const indicator = document.getElementById("segIndicator");
    const hover = document.getElementById("segHover");

    function moveIndicator(el) {
      const rect = el.getBoundingClientRect();
      const parent = nav.getBoundingClientRect();
      indicator.style.width = rect.width + "px";
      indicator.style.left = rect.left - parent.left + "px";
    }

    function moveHover(el) {
      const rect = el.getBoundingClientRect();
      const parent = nav.getBoundingClientRect();
      hover.style.width = rect.width + "px";
      hover.style.left = rect.left - parent.left + "px";
      hover.style.opacity = 1;
    }

    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        moveHover(btn);
        hover.classList.remove("active");
        void hover.offsetWidth;
        hover.classList.add("active");
      });

      btn.addEventListener("click", () => {
        document.querySelector(".seg-btn.active")?.classList.remove("active");
        btn.classList.add("active");
        moveIndicator(btn);
      });
    });

    nav.addEventListener("mouseleave", () => {
      hover.style.opacity = 0;
    });

    window.addEventListener("load", () => {
      const active = document.querySelector(".seg-btn.active");
      if (active) moveIndicator(active);
    });
  }
})();
