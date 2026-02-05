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
    const templateText = await response.text();

    // 2. Procesar plantilla de forma segura (Evita el error en línea 22)
    const parser = new DOMParser();
    const docTemplate = parser.parseFromString(templateText, 'text/html');
    const contenidoTemplate = docTemplate.body.firstChild;

    // 3. Contenedor invisible
    const contenedor = document.createElement("div");
    contenedor.style.position = "fixed";
    contenedor.style.top = "-9999px";
    contenedor.style.left = "-9999px";
    contenedor.style.width = "800px";
    
    // En lugar de innerHTML, clonamos el nodo procesado
    if (contenidoTemplate) {
        contenedor.appendChild(contenidoTemplate.cloneNode(true));
    }
    document.body.appendChild(contenedor);

    // 4. Leer datos reales de la app
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

    // 5. Inyectar datos (seguro con textContent)
    setText(contenedor, "#pdf-nombre-usuario", datos.nombre);
    setText(contenedor, "#pdf-signo-solar", datos.signoSolar);
    setText(contenedor, "#pdf-signo-solar-texto", datos.signoSolarTexto);
    setText(contenedor, "#pdf-luna", datos.luna);
    setText(contenedor, "#pdf-signo-chino", datos.signoChino);
    setText(contenedor, "#pdf-numero-vida", datos.numeroVida);
    setText(contenedor, "#pdf-numerologia-resumen", datos.numerologiaTexto);
    setText(contenedor, "#pdf-carta-dia", datos.cartaDia);
    setText(contenedor, "#pdf-carta-dia-texto", datos.cartaDiaTexto);

    // Compatibilidades (Corregido para evitar innerHTML)
    const nodoCompat = contenedor.querySelector("#pdf-compatibilidades");
    if (nodoCompat) {
        nodoCompat.replaceChildren(); // Limpia de forma segura
        if (datos.compatibilidades.length === 0) {
            const spanEmpty = document.createElement("span");
            spanEmpty.className = "tag";
            spanEmpty.textContent = "Sin datos";
            nodoCompat.appendChild(spanEmpty);
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
        nodoTransitos.replaceChildren(); // Limpia de forma segura
        datos.transitos.forEach(t => {
            const li = document.createElement("li");
            li.textContent = t;
            nodoTransitos.appendChild(li);
        });
    }

    // 6. Renderizar a imagen
    const canvas = await html2canvas(contenedor, {
        scale: 2,
        useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");

    // 7. Crear PDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(nombreArchivo);

    // 8. Limpiar
    document.body.removeChild(contenedor);
}

/* ============================
    UTILIDAD SEGURA
============================ */

function setText(contenedor, selector, texto) {
    const el = contenedor.querySelector(selector);
    if (el) el.textContent = texto;
}
