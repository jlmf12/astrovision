/* ============================
    GENERAR PDF ASTROVISIÓN (REFAC)
============================ */

const RUTA_TEMPLATE = "/pdf/template.html";

async function generarPDF(nombreUsuario) {
    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    const nombreArchivo = `Informe_AstroVision_${fecha}.pdf`;

    // 1. Cargar y Procesar Plantilla (Seguro)
    const contenedor = await prepararContenedor();
    
    // 2. Obtener y Mapear Datos
    const datos = prepararDatosInforme(nombreUsuario);

    // 3. Inyectar Datos en el DOM (Modularizado)
    inyectarDatosPrincipales(contenedor, datos);
    gestionarListasDinamicas(contenedor, datos);

    // 4. Renderizado Final
    await exportarAPDF(contenedor, nombreArchivo);

    // 5. Limpieza
    document.body.removeChild(contenedor);
}

/* --- FUNCIONES AUXILIARES PARA BAJAR COMPLEJIDAD --- */

async function prepararContenedor() {
    const response = await fetch(RUTA_TEMPLATE);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    const contenedor = document.createElement("div");
    contenedor.style.cssText = "position:fixed; top:-9999px; width:800px;";
    if (doc.body.firstChild) {
        contenedor.appendChild(doc.body.firstChild.cloneNode(true));
    }
    document.body.appendChild(contenedor);
    return contenedor;
}

function prepararDatosInforme(nombre) {
    const zodiaco = JSON.parse(localStorage.getItem("astro_zodiaco") || "{}");
    const luna = JSON.parse(localStorage.getItem("astro_luna") || "{}");
    const numero = JSON.parse(localStorage.getItem("astro_numero") || "{}");
    const chino = JSON.parse(localStorage.getItem("astro_chino") || "{}");
    const compat = JSON.parse(localStorage.getItem("astro_compat") || "{}");
    const transitos = localStorage.getItem("astro_transitos") || "—";
    const tarot = JSON.parse(localStorage.getItem("astro_tarot") || "{}");

    return {
        nombre: nombre || "Usuario AstroVisión",
        signoSolar: `${zodiaco.nombre || "—"} · ${zodiaco.descripcion || ""}`,
        luna: luna.signo ? `${luna.signo} · ${luna.fase}` : "—",
        signoChino: chino.animal || "—",
        numeroVida: `${numero.numero || "—"} · ${numero.texto || ""}`,
        compatibilidades: Array.isArray(compat.mejor) ? compat.mejor : [],
        transitos: typeof transitos === "string" ? [transitos] : transitos,
        cartaDia: `${tarot.nombre || "—"} · ${tarot.significado || ""}`
    };
}

function inyectarDatosPrincipales(cnt, d) {
    const campos = {
        "#pdf-nombre-usuario": d.nombre,
        "#pdf-signo-solar": d.signoSolar,
        "#pdf-luna": d.luna,
        "#pdf-signo-chino": d.signoChino,
        "#pdf-numero-vida": d.numeroVida,
        "#pdf-carta-dia": d.cartaDia
    };
    Object.entries(campos).forEach(([sel, val]) => {
        const el = cnt.querySelector(sel);
        if (el) el.textContent = val;
    });
}

function gestionarListasDinamicas(cnt, d) {
    // Compatibilidades
    const nodoC = cnt.querySelector("#pdf-compatibilidades");
    if (nodoC) {
        nodoC.replaceChildren();
        d.compatibilidades.forEach(c => {
            const s = document.createElement("span");
            s.className = "tag";
            s.textContent = c;
            nodoC.appendChild(s);
        });
    }
    // Tránsitos
    const nodoT = cnt.querySelector("#pdf-transitos");
    if (nodoT) {
        nodoT.replaceChildren();
        d.transitos.forEach(t => {
            const li = document.createElement("li");
            li.textContent = t;
            nodoT.appendChild(li);
        });
    }
}

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
