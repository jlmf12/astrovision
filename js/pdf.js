/**
 * Mapeo de datos ultra-clement con el escáner (Complejidad < 5)
 */
function mapearEstructuraInforme(nombre, s) {
    // 1. Extraer con valores por defecto simples
    const z = s.zodiaco || {};
    const n = s.numero || {};
    const t = s.tarot || {};
    const l = s.luna || {};

    // 2. Construir strings fuera del objeto para bajar la complejidad
    const solStr = (z.nombre || "—") + " · " + (z.descripcion || "");
    const numStr = (n.numero || "—") + " · " + (n.texto || "");
    const taroStr = (t.nombre || "—") + " · " + (t.significado || "");
    const lunStr = l.signo ? (l.signo + " · " + l.fase) : "—";

    return {
        nombre: nombre || "Usuario AstroVisión",
        signoSolar: solStr,
        luna: lunStr,
        signoChino: s.chino.animal || "—",
        numeroVida: numStr,
        compatibilidades: Array.isArray(s.compat.mejor) ? s.compat.mejor : [],
        transitos: Array.isArray(s.transitosRaw) ? s.transitosRaw : [s.transitosRaw],
        cartaDia: taroStr
    };
}

/**
 * Función de exportación (Limpia, sin código inalcanzable)
 */
async function exportarAPDF(cnt, nombre) {
    const canvas = await html2canvas(cnt, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    
    const pdf = new jsPDF("p", "mm", "a4");
    const w = 210;
    const h = (canvas.height * w) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 0, 0, w, h);
    pdf.save(nombre);
}
// VERIFICACIÓN: No debe haber NADA escrito después de esta llave.

