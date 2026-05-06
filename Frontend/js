const studiesBtn = document.getElementById("studiesBtn");
const studiesDropdown = document.getElementById("studiesDropdown");
const menuBtn = document.getElementById("menuBtn");
const sidePanel = document.getElementById("sidePanel");
const themeMiniBtn = document.getElementById("themeMiniBtn");
const THEME_KEY = "mockSiteTheme_v1";

function closeDropdown() {
  if (!studiesDropdown) {
    return;
  }
  studiesDropdown.classList.remove("is-open");
  studiesBtn?.setAttribute("aria-expanded", "false");
}

function toggleDropdown() {
  const open = studiesDropdown.classList.toggle("is-open");
  studiesBtn?.setAttribute("aria-expanded", open ? "true" : "false");
}

studiesBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleDropdown();
});

document.addEventListener("click", () => closeDropdown());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdown();
    sidePanel.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }
});

menuBtn?.addEventListener("click", () => {
  const open = sidePanel.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  themeMiniBtn?.setAttribute("aria-pressed", isDark ? "true" : "false");
}

function toggleTheme() {
  const isDark = !document.body.classList.contains("theme-dark");
  const next = isDark ? "dark" : "light";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // ignore
  }
}

themeMiniBtn?.addEventListener("click", toggleTheme);

// shortcut: Alt+T
document.addEventListener("keydown", (e) => {
  if (e.altKey && e.key.toLowerCase() === "t") {
    e.preventDefault();
    toggleTheme();
  }
});

// mini language buttons (vizual)
document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("[data-lang]").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
});

// init theme from storage
try {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  }
} catch {
  // ignore
}

