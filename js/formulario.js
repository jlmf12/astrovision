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

    // Secure redirection
    window.location.assign(PAGINAS.RESULTADO);
}

function cargarDatosFormulario() {
    try {
        const raw = localStorage.getItem("astro_datos");
        // Safe check before parsing
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}
