function mostrarCartaDia(data) {
    const imgElement = document.getElementById("carta-dia");
    if (imgElement && data.imagen) {
        // Validación estricta de nombre de archivo
        const imagenSegura = data.imagen.replace(/[^a-z0-9.-]/gi, '');
        imgElement.src = `/astrovision/img/tarot/${imagenSegura}`;
        imgElement.alt = data.nombre || "Carta de Tarot";
    }

    const txtElement = document.getElementById("interpretacion-dia");
    if (txtElement) {
        txtElement.textContent = data.interpretacion || "";
    }
    
    localStorage.setItem("astro_tarot", data.interpretacion || "");
}

function generarTirada() {
    const cartas = [obtenerCartaAleatoria(), obtenerCartaAleatoria(), obtenerCartaAleatoria()];
    const data = {
        cartas: cartas,
        interpretacion: `Pasado: ${cartas[0].nombre}. Presente: ${cartas[1].nombre}. Futuro: ${cartas[2].nombre}.`
    };

    localStorage.setItem("astro_tarot_tirada", JSON.stringify(data));
    mostrarTirada(data);
}

function mostrarTirada(data) {
    data.cartas.forEach((carta, index) => {
        const el = document.getElementById(`tirada-carta-${index + 1}`);
        if (el) {
            const imgSegura = carta.imagen.replace(/[^a-z0-9.-]/gi, '');
            el.src = `/astrovision/img/tarot/${imgSegura}`;
            el.alt = carta.nombre;
        }
    });

    const interp = document.getElementById("tirada-interpretacion");
    if (interp) interp.textContent = data.interpretacion;
}
