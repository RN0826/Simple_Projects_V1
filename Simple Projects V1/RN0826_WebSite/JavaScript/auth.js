/*
Auth Logic
Handles source login overlay, guarded close behavior, toast, clear action, password reveal, and password strength.
===========================================
*/

(() => {
  /* ================= LOGIN SYSTEM ================= */
  const loginBtn = document.querySelector('[data-id="login"]');
  const overlay = document.getElementById("loginOverlay");

  if (loginBtn && overlay) {
    const modal = document.querySelector(".login-modal");
    const inputs = modal.querySelectorAll("input");
    const checkbox = modal.querySelector('input[type="checkbox"]');
    const toast = document.getElementById("loginToast");
    const clearBtn = document.getElementById("clearData");

    //solution for known bugs --> passowrd error msg, and pwd reveal.
    const strengthBox = document.getElementById("pwStrengthBox");
    const weakWarning = document.getElementById("pwWeakWarning");
    const pwGroup = document.getElementById("pwGroup");

    loginBtn.addEventListener("click", () => overlay.classList.add("active"));

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) attemptClose();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active"))
        attemptClose();
    });

    clearBtn.addEventListener("click", () => {
      inputs.forEach((input) => {
        if (input.type === "checkbox") input.checked = false;
        else input.value = "";
      });

      if (strengthBox) strengthBox.classList.remove("visible");
      if (weakWarning) weakWarning.classList.remove("visible");
      if (pwGroup) pwGroup.classList.remove("revealed");

      overlay.classList.remove("active");
    });

    function attemptClose() {
      if (hasUserInput()) {
        flashError();
        showToast();
      } else {
        if (strengthBox) strengthBox.classList.remove("visible");
        if (weakWarning) weakWarning.classList.remove("visible");

        overlay.classList.remove("active");
      }
    }

    function hasUserInput() {
      let hasText = false;
      inputs.forEach((input) => {
        if (input.type !== "checkbox" && input.value.trim() !== "")
          hasText = true;
      });
      return hasText || (checkbox && checkbox.checked);
    }

    function flashError() {
      inputs.forEach((input) => {
        input.style.border = "1px solid red";
        setTimeout(() => {
          input.style.border = "";
        }, 1500);
      });
    }

    function showToast() {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 5000);
    }
  }

  /* ================= PASSWORD CHECK ================= */
  const pwInput = document.getElementById("pwInput");

  if (pwInput) {
    const pwGroup = document.getElementById("pwGroup");
    const pwToggle = document.getElementById("pwToggle");
    const pwToggleShow = document.getElementById("pwToggleShow");
    const strengthBox = document.getElementById("pwStrengthBox");
    const weakWarning = document.getElementById("pwWeakWarning");

    const rules = {
      length: (v) => v.length >= 8,
      upper: (v) => /[A-Z]/.test(v),
      lower: (v) => /[a-z]/.test(v),
      number: (v) => /[0-9]/.test(v),
      special: (v) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v),
    };

    function isStrong(v) {
      return Object.values(rules).every((fn) => fn(v));
    }

    function toggleVisibility() {
      const revealed = pwGroup.classList.toggle("revealed");
      pwInput.type = revealed ? "text" : "password";
    }

    pwToggle.addEventListener("click", toggleVisibility);
    if (pwToggleShow) pwToggleShow.addEventListener("click", toggleVisibility);

    pwInput.addEventListener("input", () => {
      const val = pwInput.value;
      strengthBox.classList.toggle("visible", val.length > 0);
      document.querySelectorAll(".pw-req").forEach((el) => {
        el.classList.toggle("met", rules[el.dataset.req](val));
      });
      weakWarning.classList.remove("visible");
    });

    pwInput.addEventListener("blur", () => {
      setTimeout(() => {
        const val = pwInput.value;
        if (val.length > 0 && !isStrong(val)) {
          strengthBox.classList.remove("visible");
          weakWarning.classList.add("visible");
        } else {
          strengthBox.classList.remove("visible");
          weakWarning.classList.remove("visible");
        }
      }, 150);
    });

    pwInput.addEventListener("focus", () => {
      weakWarning.classList.remove("visible");
      if (pwInput.value.length > 0) strengthBox.classList.add("visible");
    });
  }
})();
