function qs(sel) {
  return document.querySelector(sel);
}

function qsa(sel) {
  return Array.from(document.querySelectorAll(sel));
}

function setExpanded(btn, expanded) {
  btn.setAttribute("aria-expanded", expanded ? "true" : "false");
}

function initDropdown(buttonSelector, dropdownSelector) {
  const btn = qs(buttonSelector);
  const dropdown = qs(dropdownSelector);
  if (!btn || !dropdown) return;

  function close() {
    dropdown.classList.remove("is-open");
    setExpanded(btn, false);
  }

  function toggle() {
    const isOpen = dropdown.classList.toggle("is-open");
    setExpanded(btn, isOpen);
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    toggle();
  });

  document.addEventListener("click", (e) => {
    const within = dropdown.contains(e.target) || btn.contains(e.target);
    if (!within) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// Dropdown-uri
initDropdown("#studiesBtn", "#studiesDropdown");
initDropdown("#blogBtn", "#blogDropdown");

// Side panel menu
(function initSidePanel() {
  const menuBtn = qs("#menuBtn");
  const panel = qs("#sidePanel");
  if (!menuBtn || !panel) return;

  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  menuBtn.addEventListener("click", () => {
    const open = !panel.classList.contains("is-open");
    setOpen(open);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  document.addEventListener("click", (e) => {
    const within = panel.contains(e.target) || menuBtn.contains(e.target);
    if (!within) setOpen(false);
  });
})();

// Theme toggle (light/dark)
(function initThemeToggle() {
  const btn = qs("#themeMiniBtn");
  if (!btn) return;

  function getStoredTheme() {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  }

  function applyTheme(theme) {
    document.body.classList.toggle("theme-dark", theme === "dark");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    setStoredTheme(theme);
  }

  const initial = getStoredTheme() || "light";
  applyTheme(initial);

  btn.addEventListener("click", () => {
    const current = document.body.classList.contains("theme-dark") ? "dark" : "light";
    applyTheme(current === "dark" ? "light" : "dark");
  });
})();

// Language UI (doar schimbare vizuală)
(function initLanguageButtons() {
  const buttons = qsa(".lang__btn");
  if (!buttons.length) return;

  buttons.forEach((b) => {
    b.addEventListener("click", () => {
      buttons.forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
    });
  });
})();

