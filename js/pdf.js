
/* ============================
    GENERAR PDF ASTROVISIÓN
============================ */

/**
 * Función auxiliar para limpiar strings (Baja la complejidad drásticamente)
 */
function limpiar(valor, fallback = "—") {
    return valor ? valor : fallback;
}

/**
 * Función de mapeo ultra-plana (Complejidad < 5)
 */
function mapearEstructuraInforme(nombre, s) {
    // Ya no usamos || ni if aquí. Solo asignaciones directas.
    const nombreFinal = limpiar(nombre, "Usuario AstroVisión");
    
    // Pre-procesamos los datos fuera de la estructura de retorno
    const sol = limpiar(s.zodiaco.nombre) + " · " + limpiar(s.zodiaco.descripcion, "");
    const num = limpiar(s.numero.numero) + " · " + limpiar(s.numero.texto, "");
    const tar = limpiar(s.tarot.nombre) + " · " + limpiar(s.tarot.significado, "");
    const lun = s.luna.signo ? (s.luna.signo + " · " + s.luna.fase) : "—";

    return {
        nombre: nombreFinal,
        signoSolar: sol,
        luna: lun,
        signoChino: limpiar(s.chino.animal),
        numeroVida: num,
        compatibilidades: s.compat.mejor,
        transitos: [s.transitosRaw],
        cartaDia: tar
    };
}

// Asegúrate de que no haya NADA de código después de la última llave de tu archivo.
