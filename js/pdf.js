/* ============================
   GENERAR PDF ASTROVISIÓN
============================ */

// Ruta absoluta (estable en PWA)
const RUTA_PDF = "/pdf/template.html";

async function generarPDF(nombreUsuario) {
    const fecha = new Date().toLocaleDateString("es-ES").replace(/\//g, "-");
    const nombreArchivo = `Informe_AstroVision_${fecha}.pdf`;

    // 1. Cargar plantilla
    const response = await fetch(RUTA_PDF);
    const template = await response.text();

    // 2. Contenedor invisible
    const contenedor = document.createElement("div");
    contenedor.style.position = "fixed";
    contenedor.style.top = "-9999px";
    contenedor.style.left = "-9999px";
    contenedor.style.width = "800px";
    contenedor.innerHTML = template;
    document.body.appendChild(contenedor);

    // 3. Leer datos reales de la app
    const zodiaco = JSON.parse(localStorage.getItem("astro_zodiaco") || "{}");
    const luna = JSON.parse(localStorage.getItem("astro_luna") || "{}");
    const numero = JSON.parse(localStorage.getItem("astro_numero") || "{}");
    const chino = JSON.parse(localStorage.getItem("astro_chino") || "{}");
    const compat = JSON.parse(localStorage.getItem("astro_compat") || "{}");
    const transitos = localStorage.getItem("astro_transitos") || "—";
    const tarot = JSON.parse(localStorage.getItem("astro_tarot") || "{}");

    const datos = {
        nombre: nombreUsuario || "Usuario AstroVisión",
        signoSolar: zodiaco.nombre || "—",
        signoSolarTexto: zodiaco.descripcion || "",
        luna: luna.signo ? `${luna.signo} · ${luna.fase}` : "—",
        signoChino: chino.animal || "—",
        numeroVida: numero.numero || "—",
        numerologiaTexto: numero.texto || "",
        compatibilidades: Array.isArray(compat.mejor) ? compat.mejor : [],
        transitos: typeof transitos === "string" ? [transitos] : transitos,
        cartaDia: tarot.nombre || "—",
        cartaDiaTexto: tarot.significado || "—"
    };

    // 4. Inyectar datos (seguro)
    setText(contenedor, "#pdf-nombre-usuario", datos.nombre);
    setText(contenedor, "#pdf-signo-solar", datos.signoSolar);
    setText(contenedor, "#pdf-signo-solar-texto", datos.signoSolarTexto);
    setText(contenedor, "#pdf-luna", datos.luna);
    setText(contenedor, "#pdf-signo-chino", datos.signoChino);
    setText(contenedor, "#pdf-numero-vida", datos.numeroVida);
    setText(contenedor, "#pdf-numerologia-resumen", datos.numerologiaTexto);
    setText(contenedor, "#pdf-carta-dia", datos.cartaDia);
    setText(contenedor, "#pdf-carta-dia-texto", datos.cartaDiaTexto);

    // Compatibilidades
    const nodoCompat = contenedor.querySelector("#pdf-compatibilidades");
    if (nodoCompat) {
        nodoCompat.innerHTML = "";
        if (datos.compatibilidades.length === 0) {
            nodoCompat.innerHTML = '<span class="tag">Sin datos</span>';
        } else {
            datos.compatibilidades.forEach(c => {
                const span = document.createElement("span");
                span.className = "tag";
                span.textContent = c;
                nodoCompat.appendChild(span);
            });
        }
    }

    // Tránsitos
    const nodoTransitos = contenedor.querySelector("#pdf-transitos");
    if (nodoTransitos) {
        nodoTransitos.innerHTML = "";
        datos.transitos.forEach(t => {
            const li = document.createElement("li");
            li.textContent = t;
            nodoTransitos.appendChild(li);
        });
    }

    // 5. Renderizar a imagen
    const canvas = await html2canvas(contenedor, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    // 6. Crear PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(nombreArchivo);

    // 7. Limpiar
    document.body.removeChild(contenedor);
}

/* ============================
   UTILIDAD SEGURA
============================ */

function setText(contenedor, selector, texto) {
    const el = contenedor.querySelector(selector);
    if (el) el.textContent = texto;
}
