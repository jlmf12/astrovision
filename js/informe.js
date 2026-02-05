/* ============================
    CARGAR DATOS INFORME
============================ */

function obtenerStorageSeguro(clave) {
    const dato = localStorage.getItem(clave);
    // Guardia de seguridad requerida por el escáner
    if (typeof dato !== "string") return {};
    
    try {
        return JSON.parse(dato);
    } catch (e) {
        return {};
    }
}

function cargarInformeCompleto() {
    const d = {
        zodiaco: obtenerStorageSeguro("astro_zodiaco"),
        luna: obtenerStorageSeguro("astro_luna"),
        chino: obtenerStorageSeguro("astro_chino"),
        numero: obtenerStorageSeguro("astro_numero"),
        compat: obtenerStorageSeguro("astro_compat"),
        tarot: obtenerStorageSeguro("astro_tarot")
    };
    
    const elNombre = document.getElementById("inf-nombre");
    if (elNombre) elNombre.textContent = d.zodiaco.nombre || "—";
    // Repetir el patrón if(el) para el resto de IDs
}
