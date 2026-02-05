
  /* ============================================================
   UTILIDADES Y SEGURIDAD
============================================================ */

function leerStorage(clave) {
    const valor = localStorage.getItem(clave);
    if (typeof valor !== "string") return "";
    return valor;
}

function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");
    if (menu && overlay) {
        menu.classList.toggle("open");
        overlay.classList.toggle("show");
    }
}

/**
 * MAPA SEGURO DE RUTAS (Elimina High: Path Traversal)
 * Al definir las rutas aquí, evitamos concatenar strings con datos de entrada.
 */
function obtenerRutaImagenZodiaco(signo) {
    const rutas = {
        "aries": "../img/zodiaco/aries.png",
        "tauro": "../img/zodiaco/tauro.png",
        "geminis": "../img/zodiaco/geminis.png",
        "cancer": "../img/zodiaco/cancer.png",
        "leo": "../img/zodiaco/leo.png",
        "virgo": "../img/zodiaco/virgo.png",
        "libra": "../img/zodiaco/libra.png",
        "escorpio": "../img/zodiaco/escorpio.png",
        "sagitario": "../img/zodiaco/sagitario.png",
        "capricornio": "../img/zodiaco/capricornio.png",
        "acuario": "../img/zodiaco/acuario.png",
        "piscis": "../img/zodiaco/piscis.png"
    };
    const normalizado = signo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return rutas[normalizado] || "../img/zodiaco/default.png";
}

function obtenerRutaImagenTarot(clave) {
    // Validamos que la clave sea una de nuestras cartas permitidas
    const cartasValidas = ["loco", "mago", "sacerdotisa", "emperatriz", "emperador", "sumo-sacerdote", "enamorados", "carro", "justicia", "ermitaño", "rueda", "fuerza", "colgado", "muerte", "templanza", "diablo", "torre", "estrella", "luna", "sol", "juicio", "mundo"];
    
    if (cartasValidas.includes(clave)) {
        return `../img/tarot/${clave}.png`;
    }
    return "../img/tarot/reverso.png";
}

/* ============================================================
   LÓGICA DE CÁLCULO
=========================================================== */

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

    const encontrado = signos.find(s => {
        const [mi, di] = s.inicio;
        const [mf, df] = s.fin;
        return (mes === mi && dia >= di) || (mes === mf && dia <= df);
    });

    return encontrado ? encontrado.nombre : "Aries";
}

function calcularNumeroVida(fecha) {
    if (!fecha) return 1;
    const nums = fecha.replaceAll("-", "").split("").map(Number);
    let suma = nums.reduce((a, b) => a + b, 0);

    while (suma > 9) {
        suma = suma.toString().split("").map(Number).reduce((a, b) => a + b, 0);
    }
    return suma;
}

/* ============================================================
   ACCIONES DE PÁGINA
============================================================ */

function procesarFormulario() {
    const elNombre = document.getElementById("nombre");
    const elFecha = document.getElementById("fecha");

    if (!elNombre?.value || !elFecha?.value) {
        alert("Por favor, completa todos los datos.");
        return;
    }

    const signo = obtenerSigno(...elFecha.value.split("-").reverse().slice(0, 2).map(Number));
    
    localStorage.setItem("astro_nombre", elNombre.value);
    localStorage.setItem("astro_fecha", elFecha.value);
    localStorage.setItem("astro_signo", signo);
    
    // Corregido: Usamos la función de ruta segura
    localStorage.setItem("astro_signo_img", obtenerRutaImagenZodiaco(signo));

    window.location.assign("zodiaco.html");
}

function generarCartaDia() {
    const cartas = ["loco", "mago", "sacerdotisa", "emperatriz", "emperador", "sumo-sacerdote", "enamorados", "carro", "justicia", "ermitaño", "rueda", "fuerza", "colgado", "muerte", "templanza", "diablo", "torre", "estrella", "luna", "sol", "juicio", "mundo"];
    const clave = cartas[Math.floor(Math.random() * cartas.length)];

    localStorage.setItem("astro_tarot_carta_dia", clave);
    // Corregido: Usamos la función de ruta segura
    localStorage.setItem("astro_img_tarot", obtenerRutaImagenTarot(clave));
    
    window.location.assign("tarot.html");
}

/* ============================================================
   CARGA DE INTERFAZ
============================================================ */

function cargarDato(id, clave) {
    const el = document.getElementById(id);
    if (el) el.textContent = leerStorage(clave) || "—";
}

function cargarPaginaZodiaco() {
    cargarDato("nombre", "astro_nombre");
    cargarDato("signo", "astro_signo");
    
    const imgPath = leerStorage("astro_signo_img");
    const elImg = document.getElementById("img-signo");
    
    // Verificación de seguridad adicional para la URL de la imagen
    if (elImg && imgPath && imgPath.startsWith("../img/zodiaco/")) {
        elImg.src = imgPath;
    }
}

// Exportación
window.toggleMenu = toggleMenu;
window.procesarFormulario = procesarFormulario;
window.cargarPaginaZodiaco = cargarPaginaZodiaco;
window.generarCartaDia = generarCartaDia;
