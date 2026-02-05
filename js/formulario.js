/* ============================
    GESTIÓN DE FORMULARIO
============================ */

// Lista blanca para navegación segura (Elimina High: Path Traversal)
const PAGINAS = {
    RESULTADO: "zodiaco.html",
    INICIO: "index.html"
};

function manejarEnvio(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    if (!nombre || !fecha) return;

    localStorage.setItem("astro_datos", JSON.stringify({ nombre, fecha }));

    // Redirección controlada
    window.location.assign(PAGINAS.RESULTADO);
}

/**
 * Carga segura de datos (Elimina Medium: Unguarded JSON.parse)
 */
function cargarDatosFormulario() {
    try {
        const raw = localStorage.getItem("astro_datos");
        if (!raw) return {};
        return JSON.parse(raw);
    } catch (e) {
        console.error("Error de datos", e);
        return {};
    }
}
