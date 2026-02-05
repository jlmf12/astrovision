/* ============================
    GENERAR PDF ASTROVISIÓN
============================ */

async function generarPDF(nombreUsuario) {
    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    const nombreArchivo = `Informe_AstroVision_${fecha}.pdf`;
    const contenedor = await prepararContenedor();
    const storage = cargarDatosSeguros();
    const datos = mapearEstructuraInforme(nombreUsuario, storage);

    inyectarDatosPrincipales(contenedor, datos);
    gestionarListasDinamicas(contenedor, datos);

    await exportarAPDF(contenedor, nombreArchivo);
    if (contenedor && contenedor.parentNode) {
        contenedor.parentNode.removeChild(contenedor);
    }
}

function cargarDatosSeguros() {
    const claves = ["zodiaco", "luna", "numero", "chino", "compat", "tarot"];
    const data = {};
    claves.forEach(k => {
        const item = localStorage.getItem(`astro_${k}`);
        try {
            data[k] = item ? JSON.parse(item) : {};
        } catch (e) {
            data[k] = {};
        }
    });
    data.transitosRaw = localStorage.getItem("astro_transitos") || "—";
    return data;
}

/**
 * LOGICA PLANA: Sin operadores ternarios complejos ni concatenaciones internas.
 * Esto garantiza una complejidad ciclomática muy baja.
 */
function mapearEstructuraInforme(nombre, s) {
    const nombreFinal = nombre || "Usuario AstroVisión";
    
    // Extraer datos con fallbacks simples
    const zNombre = s.zodiaco.nombre || "—";
    const zDesc = s.zodiaco.descripcion || "";
    const nNum = s.numero.numero || "—";
    const nText = s.numero.texto || "";
    const tNombre = s.tarot.nombre || "—";
    const tSign = s.tarot.significado || "";
    
    // Preparar strings finales fuera del objeto
    const signoSolar = zNombre + " · " + zDesc;
    const numeroVida = nNum + " · " + nText;
    const cartaDia = tNombre + " · " + tSign;
    
    let lunaFinal = "—";
    if (s.luna.signo) {
        lunaFinal = s.luna.signo + " · " + s.luna.fase;
    }

    return {
        nombre: nombreFinal,
        signoSolar: signoSolar,
        luna: lunaFinal,
        signoChino: s.chino.animal || "—",
        numeroVida: numeroVida,
        compatibilidades: s.compat.mejor || [],
        transitos: [s.transitosRaw],
        cartaDia: cartaDia
    };
}

async function prepararContenedor() {
    const response = await fetch("/pdf/template.html");
    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const contenedor = document.createElement("div");
    contenedor.style.cssText = "position:fixed; top:-9999px; width:800px;";
    if (doc.body.firstChild) {
        contenedor.appendChild(doc.body.firstChild.cloneNode(true));
    }
    document.body.appendChild(contenedor);
    return contenedor;
}

function inyectarDatosPrincipales(cnt, d) {
    const ids = ["#pdf-nombre-usuario", "#pdf-signo-solar", "#pdf-luna", "#pdf-signo-chino", "#pdf-numero-vida", "#pdf-carta-dia"];
    const valores = [d.nombre, d.signoSolar, d.luna, d.signoChino, d.numeroVida, d.cartaDia];
    
    ids.forEach((id, i) => {
        const el = cnt.querySelector(id);
        if (el) el.textContent = valores[i];
    });
}

function gestionarListasDinamicas(cnt, d) {
    const comp = cnt.querySelector("#pdf-compatibilidades");
    if (comp && Array.isArray(d.compatibilidades)) {
        comp.replaceChildren();
        d.compatibilidades.forEach(item => {
            const span = document.createElement("span");
            span.className = "tag";
            span.textContent = item;
            comp.appendChild(span);
        });
    }
}

async function exportarAPDF(cnt, nombre) {
    const canvas = await html2canvas(cnt, { scale: 2, useCORS: true });
    const img = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(nombre);
}
