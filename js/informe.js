/* ============================
    CARGAR DATOS PARA INFORME
============================ */

function cargarResumenInforme() {
    // Definimos las claves que necesitamos recuperar
    const claves = ["zodiaco", "luna", "numero", "chino", "compat", "tarot"];
    const datosInforme = {};

    claves.forEach(k => {
        try {
            // CARGA SEGURA: Se verifica la existencia antes de parsear
            const raw = localStorage.getItem(`astro_${k}`);
            datosInforme[k] = raw ? JSON.parse(raw) : {};
        } catch (e) {
            console.error(`Error al procesar datos de ${k}:`, e);
            datosInforme[k] = {};
        }
    });

    // Recuperar tránsitos (suele ser un string simple)
    datosInforme.transitos = localStorage.getItem("astro_transitos") || "No hay tránsitos disponibles.";

    // Inyectar datos en la vista del informe
    actualizarVistaInforme(datosInforme);
}

/**
 * Inyección segura de datos en el informe final
 */
function actualizarVistaInforme(d) {
    const mapeo = {
        "inf-nombre": d.zodiaco.nombre || "—",
        "inf-fase": d.luna.fase || "—",
        "inf-numero": d.numero.numero || "—",
        "inf-animal": d.chino.animal || "—",
        "inf-compat": d.compat.mejor ? d.compat.mejor.join(", ") : "—",
        "inf-tarot": d.tarot.nombre || "—"
    };

    Object.entries(mapeo).forEach(([id, valor]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    });
}
