document.addEventListener("DOMContentLoaded", cargarInforme);

function cargarInforme() {
    // 1. Obtener datos con valores por defecto
    const data = {
        zodiaco: JSON.parse(localStorage.getItem("astro_zodiaco") || "{}"),
        luna: JSON.parse(localStorage.getItem("astro_luna") || "{}"),
        numero: JSON.parse(localStorage.getItem("astro_numero") || "{}"),
        chino: JSON.parse(localStorage.getItem("astro_chino") || "{}"),
        compat: JSON.parse(localStorage.getItem("astro_compat") || "{}"),
        transitos: localStorage.getItem("astro_transitos") || "—",
        tarot: JSON.parse(localStorage.getItem("astro_tarot") || "{}")
    };

    // 2. Ejecutar las actualizaciones (Modularizado para bajar la complejidad)
    actualizarZodiaco(data.zodiaco);
    actualizarLuna(data.luna);
    actualizarNumero(data.numero);
    actualizarChino(data.chino);
    actualizarCompatibilidad(data.compat);
    actualizarTarot(data.tarot);
    
    setText("info-transitos", data.transitos);
}

/* ============================
    FUNCIONES DE ACTUALIZACIÓN
============================ */

function actualizarZodiaco(z) {
    const txt = z.nombre 
        ? `${z.nombre} · Elemento: ${z.elemento}. ${z.descripcion}` 
        : "—";
    setText("info-zodiaco", txt);
}

function actualizarLuna(l) {
    const txt = l.signo 
        ? `Signo lunar: ${l.signo}. Fase: ${l.fase}.` 
        : "—";
    setText("info-luna", txt);
}

function actualizarNumero(n) {
    const txt = n.numero 
        ? `Número de vida: ${n.numero}. ${n.texto}` 
        : "—";
    setText("info-numero", txt);
}

function actualizarChino(c) {
    const txt = c.animal 
        ? `${c.animal} · Elemento: ${c.elemento}. ${c.descripcion}` 
        : "—";
    setText("info-chino", txt);
}

function actualizarCompatibilidad(c) {
    if (!Array.isArray(c.mejor)) {
        setText("info-compat", "—");
        return;
    }
    const txt = `Mejor: ${c.mejor.join(", ")} · Media: ${c.media.join(", ")} · Baja: ${c.baja.join(", ")}`;
    setText("info-compat", txt);
}

function actualizarTarot(t) {
    const txt = t.nombre 
        ? `${t.nombre} — ${t.significado}` 
        : "—";
    setText("info-tarot", txt);
}

/* ============================
    UTILIDADES
============================ */

function setText(id, texto) {
    const el = document.getElementById(id);
    if (el) el.textContent = texto;
}

function generarInforme() {
    cargarInforme();
    alert("Informe actualizado.");
}
