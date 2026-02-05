/* ============================================================
   MENÚ LATERAL
============================================================ */

function toggleMenu() {
    document.getElementById("side-menu").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
}


/* ============================================================
   NORMALIZAR TILDES (para imágenes)
============================================================ */

function normalizarSigno(signo) {
    return signo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


/* ============================================================
   CÁLCULO DEL SIGNO ZODIACAL
============================================================ */

function obtenerSigno(dia, mes) {
    const signos = [
        { nombre: "Capricornio", inicio: [12, 22], fin: [1, 19] },
        { nombre: "Acuario",     inicio: [1, 20],  fin: [2, 18] },
        { nombre: "Piscis",      inicio: [2, 19],  fin: [3, 20] },
        { nombre: "Aries",       inicio: [3, 21],  fin: [4, 19] },
        { nombre: "Tauro",       inicio: [4, 20],  fin: [5, 20] },
        { nombre: "Géminis",     inicio: [5, 21],  fin: [6, 20] },
        { nombre: "Cáncer",      inicio: [6, 21],  fin: [7, 22] },
        { nombre: "Leo",         inicio: [7, 23],  fin: [8, 22] },
        { nombre: "Virgo",       inicio: [8, 23],  fin: [9, 22] },
        { nombre: "Libra",       inicio: [9, 23],  fin: [10, 22] },
        { nombre: "Escorpio",    inicio: [10, 23], fin: [11, 21] },
        { nombre: "Sagitario",   inicio: [11, 22], fin: [12, 21] }
    ];

    for (const s of signos) {
        const [mi, di] = s.inicio;
        const [mf, df] = s.fin;

        if ((mes === mi && dia >= di) || (mes === mf && dia <= df)) {
            return s.nombre;
        }
    }

    return "—";
}


/* ============================================================
   ELEMENTO ZODIACAL
============================================================ */

function obtenerElemento(signo) {
    const elementos = {
        "Aries":       "🔥 Fuego",
        "Tauro":       "🌍 Tierra",
        "Géminis":     "💨 Aire",
        "Cáncer":      "💧 Agua",
        "Leo":         "🔥 Fuego",
        "Virgo":       "🌍 Tierra",
        "Libra":       "💨 Aire",
        "Escorpio":    "💧 Agua",
        "Sagitario":   "🔥 Fuego",
        "Capricornio": "🌍 Tierra",
        "Acuario":     "💨 Aire",
        "Piscis":      "💧 Agua"
    };

    return elementos[signo] || "—";
}


/* ============================================================
   LUNA (simplificada)
============================================================ */

function obtenerLuna(dia, mes) {
    const fases = [
        "Aries", "Tauro", "Géminis", "Cáncer",
        "Leo", "Virgo", "Libra", "Escorpio",
        "Sagitario", "Capricornio", "Acuario", "Piscis"
    ];
    return fases[(dia + mes) % 12];
}


/* ============================================================
   NUMEROLOGÍA
============================================================ */

function calcularNumeroVida(fecha) {
    const nums = fecha.replaceAll("-", "").split("").map(Number);
    let suma = nums.reduce((a, b) => a + b, 0);

    while (suma > 9) {
        suma = suma.toString().split("").map(Number).reduce((a, b) => a + b, 0);
    }

    return suma;
}

const interpretacionesNumerologia = {
    1: "Liderazgo, independencia y fuerza personal.",
    2: "Cooperación, sensibilidad y equilibrio.",
    3: "Creatividad, comunicación y expresión.",
    4: "Orden, estabilidad y disciplina.",
    5: "Cambio, libertad y aventura.",
    6: "Amor, armonía y responsabilidad.",
    7: "Espiritualidad, análisis y sabiduría.",
    8: "Poder, éxito y ambición.",
    9: "Humanitarismo, compasión y cierre de ciclos."
};


/* ============================================================
   PROCESAR FORMULARIO (sin hora)
============================================================ */

function procesarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const fecha  = document.getElementById("fecha").value;

    if (!nombre || !fecha) {
        alert("Por favor, completa todos los datos.");
        return;
    }

    const [anio, mes, dia] = fecha.split("-").map(Number);

    const signo    = obtenerSigno(dia, mes);
    const elemento = obtenerElemento(signo);
    const luna     = obtenerLuna(dia, mes);

    const numeroVida = calcularNumeroVida(fecha);
    const numCorto   = interpretacionesNumerologia[numeroVida];

    localStorage.setItem("astro_nombre", nombre);
    localStorage.setItem("astro_fecha", fecha);
    localStorage.setItem("astro_signo", signo);
    localStorage.setItem("astro_elemento", elemento);
    localStorage.setItem("astro_luna", luna);
    localStorage.setItem("astro_numero_vida", numeroVida);
    localStorage.setItem("astro_numero_interpretacion", numCorto);

    const signoNormalizado = normalizarSigno(signo);
    localStorage.setItem("astro_signo_img", `../img/zodiaco/${signoNormalizado}.png`);

    window.location.href = "zodiaco.html";
}


/* ============================================================
   CARGA DE DATOS EN PÁGINAS
============================================================ */

function cargarDato(id, clave) {
    const el = document.getElementById(id);
    if (el) el.textContent = localStorage.getItem(clave) || "—";
}

function cargarPaginaZodiaco() {
    cargarDato("nombre", "astro_nombre");
    cargarDato("signo", "astro_signo");
    cargarDato("elemento", "astro_elemento");
    cargarDato("luna", "astro_luna");

    const img = localStorage.getItem("astro_signo_img");
    if (img) document.getElementById("img-signo").src = img;
}


/* ============================================================
   TAROT – CARTA DEL DÍA
============================================================ */

const cartasTarot = [
    "loco", "mago", "sacerdotisa", "emperatriz", "emperador",
    "sumo-sacerdote", "enamorados", "carro", "justicia", "ermitaño",
    "rueda", "fuerza", "colgado", "muerte", "templanza",
    "diablo", "torre", "estrella", "luna", "sol", "juicio", "mundo"
];

function generarCartaDia() {
    const idx = Math.floor(Math.random() * cartasTarot.length);
    const clave = cartasTarot[idx];

    localStorage.setItem("astro_tarot_carta_dia", clave);
    localStorage.setItem("astro_img_tarot", `../img/tarot/${clave}.png`);
    localStorage.setItem("astro_interpretacion_tarot", `Tu energía del día está influenciada por ${clave}.`);

    window.location.href = "tarot.html";
}


/* ============================================================
   TAROT – TIRADA DE 3 CARTAS
============================================================ */

function generarTirada() {
    const baraja = [...cartasTarot];
    const seleccion = [];

    for (let i = 0; i < 3; i++) {
        const idx = Math.floor(Math.random() * baraja.length);
        seleccion.push(baraja[idx]);
        baraja.splice(idx, 1);
    }

    localStorage.setItem("astro_tirada", JSON.stringify({
        1: { clave: seleccion[0] },
        2: { clave: seleccion[1] },
        3: { clave: seleccion[2] }
    }));

    const interpretacion = `
        Tu tirada revela un proceso en tres etapas:
        • Pasado: ${seleccion[0]}
        • Presente: ${seleccion[1]}
        • Futuro: ${seleccion[2]}
    `;

    localStorage.setItem("astro_interpretacion_tirada", interpretacion.trim());

    window.location.href = "tarot-tirada.html";
}


/* ============================================================
   COMPATIBILIDADES
============================================================ */

const compatibilidades = {
    "Aries":       { mejor: ["Leo", "Sagitario"], media: ["Géminis", "Acuario"], baja: ["Cáncer", "Capricornio"] },
    "Tauro":       { mejor: ["Virgo", "Capricornio"], media: ["Cáncer", "Piscis"], baja: ["Leo", "Acuario"] },
    "Géminis":     { mejor: ["Libra", "Acuario"], media: ["Aries", "Leo"], baja: ["Virgo", "Piscis"] },
    "Cáncer":      { mejor: ["Escorpio", "Piscis"], media: ["Tauro", "Virgo"], baja: ["Aries", "Libra"] },
    "Leo":         { mejor: ["Aries", "Sagitario"], media: ["Géminis", "Libra"], baja: ["Tauro", "Escorpio"] },
    "Virgo":       { mejor: ["Tauro", "Capricornio"], media: ["Cáncer", "Escorpio"], baja: ["Géminis", "Sagitario"] },
    "Libra":       { mejor: ["Géminis", "Acuario"], media: ["Leo", "Sagitario"], baja: ["Cáncer", "Capricornio"] },
    "Escorpio":    { mejor: ["Cáncer", "Piscis"], media: ["Virgo", "Capricornio"], baja: ["Leo", "Acuario"] },
    "Sagitario":   { mejor: ["Aries", "Leo"], media: ["Libra", "Acuario"], baja: ["Virgo", "Piscis"] },
    "Capricornio": { mejor: ["Tauro", "Virgo"], media: ["Escorpio", "Piscis"], baja: ["Aries", "Libra"] },
    "Acuario":     { mejor: ["Géminis", "Libra"], media: ["Aries", "Sagitario"], baja: ["Tauro", "Escorpio"] },
    "Piscis":      { mejor: ["Cáncer", "Escorpio"], media: ["Tauro", "Capricornio"], baja: ["Géminis", "Sagitario"] }
};

function generarCompatibilidades() {
    const signo = localStorage.getItem("astro_signo");

    if (!signo || !compatibilidades[signo]) {
        localStorage.setItem("astro_compat_mejor", "—");
        localStorage.setItem("astro_compat_media", "—");
        localStorage.setItem("astro_compat_baja", "—");
        return;
    }

    const comp = compatibilidades[signo];

    localStorage.setItem("astro_compat_mejor", comp.mejor.join(", "));
    localStorage.setItem("astro_compat_media", comp.media.join(", "));
    localStorage.setItem("astro_compat_baja", comp.baja.join(", "));
}


/* ============================================================
   TRÁNSITOS ACTUALES
============================================================ */

function generarTransitos() {
    const signo = localStorage.getItem("astro_signo") || "tu signo";
    const luna  = localStorage.getItem("astro_luna") || "tu luna";
    const num   = localStorage.getItem("astro_numero_vida") || "tu número de vida";

    const texto = `
Hoy los tránsitos activan especialmente la energía de ${signo}.
Tu luna en ${luna} matiza cómo vives estos movimientos a nivel emocional.
Tu número de vida ${num} señala el aprendizaje de fondo de este periodo.
    `.trim();

    localStorage.setItem("astro_transitos_texto", texto);
}


/* ============================================================
   EXPORTAR FUNCIONES
============================================================ */

window.toggleMenu = toggleMenu;
window.procesarFormulario = procesarFormulario;
window.cargarPaginaZodiaco = cargarPaginaZodiaco;
window.generarCartaDia = generarCartaDia;
window.generarTirada = generarTirada;
window.generarCompatibilidades = generarCompatibilidades;
window.generarTransitos = generarTransitos;
