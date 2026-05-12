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

// Language switching
(function initLanguageSwitching() {
  // Translation object - Add your translations here
  const translations = {
    RO: {
      "blog-btn": "Blog",
      "contacte": "Contacte",
      "studies-btn": "Proces de studii",
      "noutati": "Noutăți",
      "profesori": "Profesori",
      "despre-noi": "Despre noi",
      "promotii": "Promoții",
      "orar": "Orarul",
      "transport": "Transportarea",
      "alimentare": "Alimentarea",
      "activitati": "Activități extrașcolare",
      "consiliu": "Consiliul elevilor"
    },
    RU: {
      "blog-btn": "Блог",
      "contacte": "Контакты",
      "studies-btn": "Процесс обучения",
      "noutati": "Новости",
      "profesori": "Преподаватели",
      "despre-noi": "О нас",
      "promotii": "Акции",
      "orar": "Расписание",
      "transport": "Транспортировка",
      "alimentare": "Питание",
      "activitati": "Внеклассные мероприятия",
      "consiliu": "Совет студентов"
    },
    EN: {
      "blog-btn": "Blog",
      "contacte": "Contact",
      "studies-btn": "Study Process",
      "noutati": "News",
      "profesori": "Teachers",
      "despre-noi": "About Us",
      "promotii": "Promotions",
      "orar": "Schedule",
      "transport": "Transportation",
      "alimentare": "Meals",
      "activitati": "Extracurricular Activities",
      "consiliu": "Student Council"
    }
  };

  const buttons = qsa(".lang__btn");
  if (!buttons.length) return;

  function getStoredLanguage() {
    try {
      return localStorage.getItem("language") || "RO";
    } catch {
      return "RO";
    }
  }

  function setStoredLanguage(lang) {
    try {
      localStorage.setItem("language", lang);
    } catch {
      // ignore
    }
  }

  function updatePageLanguage(lang) {
    document.documentElement.lang = lang.toLowerCase();

    // Update all elements with data-i18n attribute
    qsa("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    setStoredLanguage(lang);
  }

  // Set initial language from localStorage
  const initialLang = getStoredLanguage();
  buttons.forEach((b) => {
    if (b.getAttribute("data-lang") === initialLang) {
      b.classList.add("is-active");
    } else {
      b.classList.remove("is-active");
    }
  });

  // Language button click handler
  buttons.forEach((b) => {
    b.addEventListener("click", () => {
      const lang = b.getAttribute("data-lang");
      updatePageLanguage(lang);
      buttons.forEach((x) => x.classList.remove("is-active"));
      b.classList.add("is-active");
    });
  });
})();

