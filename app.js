/**
 * RG DATA & FINANCE INC. - Core Application Engine
 * Synchronisation du menu mobile et de l'état du thème sombre.
 * Année de référence : 2026
 */

function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileMenu) {
    mobileMenu.classList.toggle("open");
  }
}
window.toggleMenu = toggleMenu;

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      if (icon) icon.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      if (icon) icon.textContent = '🌙';
    }
  }

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('theme', nextTheme);
    });
  }
});