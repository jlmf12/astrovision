document.addEventListener("DOMContentLoaded", cargarInforme);

function cargarInforme() {
    const zodiaco = JSON.parse(localStorage.getItem("astro_zodiaco") || "{}");
    const luna = JSON.parse(localStorage.getItem("astro_luna") || "{}");
    const numero = JSON.parse(localStorage.getItem("astro_numero") || "{}");
    const chino = JSON.parse(localStorage.getItem("astro_chino") || "{}");
    const compat = JSON.parse(localStorage.getItem("astro_compat") || "{}");
    const transitos = localStorage.getItem("astro_transitos") || "—";
    const tarot = JSON.parse(localStorage.getItem("astro_tarot") || "{}");

    setText("info-zodiaco",
        zodiaco.nombre
            ? `${zodiaco.nombre} · Elemento: ${zodiaco.elemento}. ${zodiaco.descripcion}`
            : "—"
    );

    setText("info-luna",
        luna.signo
            ? `Signo lunar: ${luna.signo}. Fase: ${luna.fase}.`
            : "—"
    );

    setText("info-numero",
        numero.numero
            ? `Número de vida: ${numero.numero}. ${numero.texto}`
            : "—"
    );

    setText("info-chino",
        chino.animal
            ? `${chino.animal} · Elemento: ${chino.elemento}. ${chino.descripcion}`
            : "—"
    );

    setText("info-compat",
        Array.isArray(compat.mejor)
            ? `Mejor: ${compat.mejor.join(", ")} · Media: ${compat.media.join(", ")} · Baja: ${compat.baja.join(", ")}`
            : "—"
    );

    setText("info-transitos", transitos);

    setText("info-tarot",
        tarot.nombre
            ? `${tarot.nombre} — ${tarot.significado}`
            : "—"
    );
}

function setText(id, texto) {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
}

function generarInforme() {
    cargarInforme();
    alert("Informe actualizado.");
}
