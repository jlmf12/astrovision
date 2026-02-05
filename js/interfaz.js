/* ============================
   CONTROL DEL MENÚ LATERAL
============================ */

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    if (!menu || !overlay) return;

    const isOpen = menu.style.left === "0px";

    if (isOpen) {
        // Cerrar menú
        menu.style.left = "-260px";
        overlay.style.display = "none";
    } else {
        // Abrir menú
        menu.style.left = "0px";
        overlay.style.display = "block";
    }
}

/* ============================
   CERRAR MENÚ AL CAMBIAR DE PÁGINA
============================ */

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("#side-menu a");
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    links.forEach(link => {
        link.addEventListener("click", () => {
            if (menu && overlay) {
                menu.style.left = "-260px";
                overlay.style.display = "none";
            }
        });
    });
});

/* ============================
   CERRAR MENÚ CON ESC
============================ */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const menu = document.getElementById("side-menu");
        const overlay = document.getElementById("overlay");

        if (menu && overlay) {
            menu.style.left = "-260px";
            overlay.style.display = "none";
        }
    }
});
