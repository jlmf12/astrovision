/* ============================
    CARGAR DATOS INFORME
============================ */

/**
 * Función de guardia para lectura segura de localStorage
 */
function obtenerStorageSeguro(clave) {
    const dato = localStorage.getItem(clave);
    // Verificación de tipo estricta para el escáner
    if (typeof dato !== "string" || dato === null) return {};
    
    try {
        return JSON.parse(dato);
    } catch (e) {
        console.error(`Error en parseo de ${clave}`);
        return {};
    }
}

/**
 * Carga y distribuye todos los datos en la vista del informe
 */
function cargarInformeCompleto() {
    const d = {
        zodiaco: obtenerStorageSeguro("astro_zodiaco"),
        luna:    obtenerStorageSeguro("astro_luna"),
        chino:   obtenerStorageSeguro("astro_chino"),
        numero:  obtenerStorageSeguro("astro_numero"),
        compat:  obtenerStorageSeguro("astro_compat"),
        tarot:   obtenerStorageSeguro("astro_tarot")
    };
    
    // Mapeo de IDs del DOM con sus respectivos valores
    const mapeo = {
        "inf-nombre": d.zodiaco?.nombre,
        "inf-fase":   d.luna?.fase,
        "inf-chino":  d.chino?.animal,
        "inf-numero": d.numero?.numero,
        "inf-compat": d.compat?.mejor ? d.compat.mejor.join(", ") : null,
        "inf-tarot":  d.tarot?.nombre
    };

    // Inyección segura en el DOM
    Object.entries(mapeo).forEach(([id, valor]) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = valor || "—";
        }
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarInformeCompleto);
