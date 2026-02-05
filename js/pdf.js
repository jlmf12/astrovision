/* ============================
    GENERAR PDF ASTROVISIÓN
============================ */

function limpiar(valor, fallback) {
    if (!valor) return fallback;
    return valor;
}

function obtenerTextoLuna(luna) {
    if (!luna.signo) return "—";
    return luna.signo + " · " + luna.fase;
}

/**
 * Función de mapeo ultra-plana (Complejidad: 1)
 */
function mapearEstructuraInforme(nombre, s) {
    const nombreFinal = limpiar(nombre, "Usuario AstroVisión");
    const sol = limpiar(s.zodiaco.nombre, "—") + " · " + limpiar(s.zodiaco.descripcion, "");
    const num = limpiar(s.numero.numero, "—") + " · " + limpiar(s.numero.texto, "");
    const tar = limpiar(s.tarot.nombre, "—") + " · " + limpiar(s.tarot.significado, "");
    const lun = obtenerTextoLuna(s.luna);

    return {
        nombre: nombreFinal,
        signoSolar: sol,
        luna: lun,
        signoChino: limpiar(s.chino.animal, "—"),
        numeroVida: num,
        compatibilidades: s.compat.mejor,
        transitos: [s.transitosRaw],
        cartaDia: tar
    };
}
// VERIFICACIÓN FINAL: No debe haber NADA después de esta línea.
