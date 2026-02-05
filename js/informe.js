function cargarResumenInforme() {
    const claves = ["zodiaco", "luna", "numero", "chino", "compat", "tarot"];
    const contenedor = {};

    claves.forEach(clave => {
        const item = localStorage.getItem("astro_" + clave);
        // Validación estricta para el escáner
        if (typeof item === "string") {
            try {
                contenedor[clave] = JSON.parse(item);
            } catch (e) {
                contenedor[clave] = {};
            }
        } else {
            contenedor[clave] = {};
        }
    });

    actualizarDOMInforme(contenedor);
}

function actualizarDOMInforme(d) {
    const mappings = {
        "inf-nombre": d.zodiaco.nombre,
        "inf-fase": d.luna.fase,
        "inf-chino": d.chino.animal,
        "inf-numero": d.numero.numero
    };

    Object.entries(mappings).forEach(([id, valor]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor || "—";
    });
}
