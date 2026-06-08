/**
 * RG DATA & FINANCE INC. - Theme Management Module (Dark / Light Mode)
 * Version modulaire et optimisée pour l'écosystème PWA
 * Année de référence : 2026
 */

/**
 * Applique le thème adéquat selon les préférences sauvegardées ou système
 */
function applyTheme(savedTheme, prefersDark, icon, iconMobile) {
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  document.body.classList.toggle("dark-mode", isDark);

  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (iconMobile) iconMobile.textContent = isDark ? "☀️" : "🌙";
}

/**
 * Alterne le thème (Toggle) et sauvegarde le choix de l'utilisateur
 */
function toggleTheme(icon, iconMobile) {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (iconMobile) iconMobile.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Initialisation et attachement des écouteurs d'événements au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleBtnMobile = document.getElementById("theme-toggle-mobile");
  const icon = document.getElementById("theme-icon");
  const iconMobile = document.getElementById("theme-icon-mobile");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  // Application initiale du thème
  applyTheme(savedTheme, prefersDark, icon, iconMobile);

  // Gestionnaires de clics (Bureau et Mobile)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => toggleTheme(icon, iconMobile));
  }

  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener("click", () => toggleTheme(icon, iconMobile));
  }
});