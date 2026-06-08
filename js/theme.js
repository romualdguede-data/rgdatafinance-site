/* ============================================================
   RG DATA & FINANCE INC. — THEME.JS
   Module: Dark Mode Premium (Desktop + Mobile)
=========================================================== */

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

/* ============================================================
   INITIALISATION
=========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleBtnMobile = document.getElementById("theme-toggle-mobile");
  const icon = document.getElementById("theme-icon");
  const iconMobile = document.getElementById("theme-icon-mobile");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  // Application du thème au chargement initial de la page
  applyTheme(savedTheme, prefersDark, icon, iconMobile);

  // Affectation des écouteurs d'événements si les éléments existent dans le DOM
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => toggleTheme(icon, iconMobile));
  }

  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener("click", () => toggleTheme(icon, iconMobile));
  }
});