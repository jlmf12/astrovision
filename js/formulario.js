function guardarYContinuar(event) {
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;

    if (!nombre || !fecha) return;

    localStorage.setItem("astro_datos", JSON.stringify({ nombre, fecha }));

    // Redirección fija (Evita manipulación de rutas)
    window.location.assign("zodiaco.html");
}
