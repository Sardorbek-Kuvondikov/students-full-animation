const body = document.body;
const navToggle = document.querySelector(".site-nav__toggle");
const navList = document.querySelector(".site-nav__list");
const navLinks = document.querySelectorAll(".site-nav__link");
const themeToggle = document.querySelector(".theme-toggle");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  body.classList.add("is-dark");
  themeToggle?.setAttribute("aria-pressed", "true");
}

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("is-dark");
    const theme = body.classList.contains("is-dark") ? "dark" : "light";
    localStorage.setItem("portfolio-theme", theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  });
}

const sections = document.querySelectorAll(".section-anchor");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isCurrent);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}
