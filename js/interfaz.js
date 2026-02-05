/* ============================
    CONTROL DEL MENÚ LATERAL
============================ */

/**
 * Función unificada para cerrar el menú (Baja complejidad)
 */
function cerrarMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    if (menu && overlay) {
        // Usamos clases en lugar de estilos fijos para mayor seguridad y limpieza
        menu.classList.remove("active");
        overlay.classList.remove("active");
        
        // Fallback para asegurar compatibilidad con tu CSS actual si no usas clases
        menu.style.left = "-260px";
        overlay.style.display = "none";
    }
}

/**
 * Alterna el estado del menú
 */
function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    if (!menu || !overlay) return;

    // Determinamos el estado basándonos en el estilo actual
    const isClosed = menu.style.left === "-260px" || menu.style.left === "";

    if (isClosed) {
        menu.style.left = "0px";
        overlay.style.display = "block";
    } else {
        cerrarMenu();
    }
}

/* ============================
    EVENTOS DE CONTROL
============================ */

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");

    // 1. Cerrar al hacer clic en enlaces o en el overlay
    const elementosCierre = document.querySelectorAll("#side-menu a, #overlay");
    
    elementosCierre.forEach(el => {
        el.addEventListener("click", cerrarMenu);
    });

    // 2. Cerrar con la tecla Escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            cerrarMenu();
        }
    });
});
