/* ============================
    GENERAR PDF ASTROVISIÓN
============================ */

const RUTA_TEMPLATE = "/pdf/template.html";

async function generarPDF(nombreUsuario) {
    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    const nombreArchivo = `Informe_AstroVision_${fecha}.pdf`;

    // 1. Preparar el entorno de renderizado
    const contenedor = await prepararContenedor();
    const storage = cargarDatosSeguros();
    const datos = mapearEstructuraInforme(nombreUsuario, storage);

    // 2. Inyectar información
    inyectarDatosPrincipales(contenedor, datos);
    gestionarListasDinamicas(contenedor, datos);

    // 3. Generar y limpiar
    await exportarAPDF(contenedor, nombreArchivo);
    document.body.removeChild(contenedor);
}

/* --- FUNCIONES AUXILIARES (REDUCCIÓN DE COMPLEJIDAD) --- */

/**
 * Carga y parsea el almacenamiento de forma protegida
 */
function cargarDatosSeguros() {
    const claves = ["zodiaco", "luna", "numero", "chino", "compat", "tarot"];
    const data = {};
    
    claves.forEach(k => {
        try {
            data[k] = JSON.parse(localStorage.getItem(`astro_${k}`) || "{}");
        } catch (e) {
            data[k] = {};
        }
    });
    
    data.transitosRaw = localStorage.getItem("astro_transitos") || "—";
    return data;
}

/**
 * Organiza la estructura final del objeto de datos
 */
function mapearEstructuraInforme(nombre, s) {
    return {
        nombre: nombre || "Usuario AstroVisión",
        signoSolar: `${s.zodiaco.nombre || "—"} · ${s.zodiaco.descripcion || ""}`,
        luna: s.luna.signo ? `${s.luna.signo} · ${s.luna.fase}` : "—",
        signoChino: s.chino.animal || "—",
        numeroVida: `${s.numero.numero || "—"} · ${s.numero.texto || ""}`,
        compatibilidades: Array.isArray(s.compat.mejor) ? s.compat.mejor : [],
        transitos: typeof s.transitosRaw === "string" ? [s.transitosRaw] : s.transitosRaw,
        cartaDia: `${s.tarot.nombre || "—"} · ${s.tarot.significado || ""}`
    };
}

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
    actualizarNodoLista(cnt.querySelector("#pdf-compatibilidades"), d.compatibilidades, "span", "tag");
    actualizarNodoLista(cnt.querySelector("#pdf-transitos"), d.transitos, "li");
}

function actualizarNodoLista(nodo, items, tag, clase = "") {
    if (!nodo) return;
    nodo.replaceChildren();
    
    items.forEach(item => {
        const el = document.createElement(tag);
        if (clase) el.className = clase;
        el.textContent = item;
        nodo.appendChild(el);
    });
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
 
   

