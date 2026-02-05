// Manejo seguro de navegación para evitar Path Traversal
const DESTINOS = {
    ZODIACO: "zodiaco.html",
    INDEX: "../index.html"
};

function guardarDatosFormulario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    if (!nombre || !fecha) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const astroDatos = { nombre, fecha };
    localStorage.setItem("astro_datos", JSON.stringify(astroDatos));

    // Navegación segura (Línea 100 corregida)
    window.location.assign(DESTINOS.ZODIACO);
}

// Ejemplo de carga segura para evitar "Unguarded JSON.parse"
function obtenerDatosSeguros() {
    try {
        const raw = localStorage.getItem("astro_datos");
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        console.error("Error al parsear datos", e);
        return {};
    }
}
