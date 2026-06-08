/**
 * RG DATA & FINANCE INC. - Core Application Script
 * Source unifiée pour la gestion du menu mobile et du thème sombre (Dark Mode)
 * Année de référence : 2026
 */

// ==========================================
// 1. GESTION DU MENU MOBILE (HAMBURGER)
// ==========================================

/**
 * Alterne l'état d'ouverture du menu de navigation mobile
 */
function toggleMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
        mobileMenu.classList.toggle("open");
    }
}

// Exposition de la fonction au scope global pour l'attribut onclick="toggleMenu()"
window.toggleMenu = toggleMenu;


// ==========================================
// 2. GESTION DU THEME (DARK / LIGHT MODE)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const icon = document.getElementById('theme-icon');
    const iconMobile = document.getElementById('theme-icon-mobile');

    // Détection des préférences utilisateur (LocalStorage ou Système)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    /**
     * Applique graphiquement le thème sélectionné et met à jour les icônes
     */
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (icon) icon.textContent = '☀️';
            if (iconMobile) iconMobile.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            if (icon) icon.textContent = '🌙';
            if (iconMobile) iconMobile.textContent = '🌙';
        }
    }

    /**
     * Alterne le thème entre clair et sombre, puis sauvegarde le choix
     */
    function toggleTheme() {
        const isCurrentlyDark = document.body.classList.contains('dark-mode');
        const nextTheme = isCurrentlyDark ? 'light' : 'dark';
        
        applyTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
    }

    // Initialisation du thème au premier chargement de la page
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Écouteurs d'événements sur les boutons de changement de thème (Bureau & Mobile)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
    if (toggleBtnMobile) {
        toggleBtnMobile.addEventListener('click', toggleTheme);
    }
});