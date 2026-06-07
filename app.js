/* =========================================================
   RG DATA & FINANCE INC. – APP.JS
   Core script: Menu mobile, Dark Mode, PWA registration
========================================================= */

/* ===== MENU MOBILE ===== */
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

/* ===== DARK MODE PREMIUM ===== */
function applyTheme(savedTheme, prefersDark, icon, iconMobile) {
  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

  if (isDark) {
    document.body.classList.add('dark-mode');
    if (icon) icon.textContent = '☀️';
    if (iconMobile) iconMobile.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    if (icon) icon.textContent = '🌙';
    if (iconMobile) iconMobile.textContent = '🌙';
  }
}

/* ===== INITIALISATION ===== */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
  const icon = document.getElementById('theme-icon');
  const iconMobile = document.getElementById('theme-icon-mobile');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  applyTheme(savedTheme, prefersDark, icon, iconMobile);

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
    if (iconMobile) iconMobile.textContent = isDark ? '☀️' : '🌙';

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleTheme);
});

/* ===== PWA – SERVICE WORKER REGISTRATION ===== */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("✅ Service Worker registered:", reg.scope))
      .catch(err => console.error("❌ Service Worker registration failed:", err));
  });
}
