/* ============================
    LÓGICA DE COMPATIBILIDAD
============================ */

function calcularCompatibilidad() {
    const rawZodiaco = localStorage.getItem("astro_zodiaco");
    const zodiaco = rawZodiaco ? JSON.parse(rawZodiaco) : null;

    if (!zodiaco || !zodiaco.nombre) {
        const msg = document.getElementById("compat-resultado");
        if (msg) msg.textContent = "Calcula tu signo solar primero.";
        return;
    }

    // Lógica de comparación...
    const mejorCompat = obtenerMejorCompatibilidad(zodiaco.nombre);
    
    localStorage.setItem("astro_compat", JSON.stringify({
        mejor: mejorCompat
    }));
}
