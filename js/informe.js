/* ============================
    CARGAR DATOS PARA INFORME
============================ */

function cargarResumenInforme() {
    const claves = ["zodiaco", "luna", "numero", "chino", "compat", "tarot"];
    const datosInforme = {};

    claves.forEach(k => {
        try {
            const raw = localStorage.getItem(`astro_${k}`);
            // Validación: Solo parsea si el dato existe
            datosInforme[k] = raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.error(`Error en datos de ${k}`, e);
            datosInforme[k] = {};
        }
    });

    actualizarVistaInforme(datosInforme);
}

function actualizarVistaInforme(d) {
    // Ejemplo de inyección segura en el DOM
    const elResumen = document.getElementById("resumen-texto");
    if (elResumen) {
        elResumen.textContent = `Tu signo es ${d.zodiaco.nombre || "desconocido"} 
                                 con fase lunar ${d.luna.fase || "no calculada"}.`;
    }
}
