/* ============================================================
   RG DATA & FINANCE INC. — THEME.JS
   Module: Dark Mode Premium (Desktop + Mobile)
=========================================================== */

/**
 * Apply the correct theme based on:
 * - saved user preference
 * - system preference (prefers-color-scheme)
 */
function applyTheme(savedTheme, prefersDark, icon, iconMobile) {
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  document.body.classList.toggle("dark-mode", isDark);

  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (iconMobile) iconMobile.textContent = isDark ? "☀️" : "🌙";
}

/**
 * Toggle theme and persist user choice
 */
function toggleTheme(icon, iconMobile) {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (iconMobile) iconMobile.textContent = isDark ? "☀️" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* ============================================================
   INITIALIZATION
=========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const toggleBtnMobile = document.getElementById("theme-toggle-mobile");
  const icon = document.getElementById("theme-icon");
  const iconMobile = document.getElementById("theme-icon-mobile");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  // Apply theme on load
  applyTheme(savedTheme, prefersDark, icon, iconMobile);

  // Bind events only if buttons exist
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => toggleTheme(icon, iconMobile));
  }

  if (toggleBtnMobile) {
    toggleBtnMobile.addEventListener("click", () => toggleTheme(icon, iconMobile));
  }
});
