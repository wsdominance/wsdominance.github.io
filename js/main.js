(() => {
  const languageSelect = document.getElementById("language-select");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  const supportedLanguages = ["ko", "en", "ja"];

  function setLanguage(language) {
    const lang = supportedLanguages.includes(language) ? language : "ko";
    const dictionary = window.translations[lang];

    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        // Only translation strings intentionally containing markup use innerHTML.
        if (["heroTitle", "heroButton", "aboutTitle"].includes(key)) {
          element.innerHTML = dictionary[key];
        } else {
          element.textContent = dictionary[key];
        }
      }
    });

    languageSelect.value = lang;
    try {
      localStorage.setItem("preferred-language", lang);
    } catch (_) {
      // Language switching still works if storage is unavailable.
    }
  }

  languageSelect.addEventListener("change", (event) => {
    setLanguage(event.target.value);
  });

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll(".placeholder-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.getAttribute("href") === "#") {
        event.preventDefault();
      }
    });
  });

  let preferredLanguage = "ko";
  try {
    const saved = localStorage.getItem("preferred-language");
    if (saved && supportedLanguages.includes(saved)) preferredLanguage = saved;
  } catch (_) {}
  setLanguage(preferredLanguage);
})();
