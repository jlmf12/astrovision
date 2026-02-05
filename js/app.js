/* ============================================================
   UTILIDADES Y SEGURIDAD
============================================================ */

/**
 * Función de guardia para lectura segura de localStorage
 */
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

function normalizarSigno(signo) {
    if (!signo) return "aries";
    return signo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

/* ============================================================
   CÁLCULO DEL SIGNO ZODIACAL (Optimizado para Complejidad)
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

    const encontrado = signos.find(s => {
        const [mi, di] = s.inicio;
        const [mf, df] = s.fin;
        return (mes === mi && dia >= di) || (mes === mf && dia <= df);
    });

    return encontrado ? encontrado.nombre : "Aries";
}

/* ============================================================
   NUMEROLOGÍA Y LUNA
============================================================ */

function calcularNumeroVida(fecha) {
    if (!fecha) return 1;
    const nums = fecha.replaceAll("-", "").split("").map(Number);
    let suma = nums.reduce((a, b) => a + b, 0);

    while (suma > 9) {
        suma = suma.toString().split("").map(Number).reduce((a, b) => a + b, 0);
    }
    return suma;
}

function obtenerLuna(dia, mes) {
    const fases = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
    return fases[(dia + mes) % 12];
}

/* ============================================================
   PROCESAR FORMULARIO (Blindado)
============================================================ */

function procesarFormulario() {
    const elNombre = document.getElementById("nombre");
    const elFecha = document.getElementById("fecha");

    if (!elNombre?.value || !elFecha?.value) {
        alert("Por favor, completa todos los datos.");
        return;
    }

    const nombre = elNombre.value;
    const fecha = elFecha.value;
    const [anio, mes, dia] = fecha.split("-").map(Number);

    const signo = obtenerSigno(dia, mes);
    const numeroVida = calcularNumeroVida(fecha);

    localStorage.setItem("astro_nombre", nombre);
    localStorage.setItem("astro_fecha", fecha);
    localStorage.setItem("astro_signo", signo);
    localStorage.setItem("astro_numero_vida", numeroVida.toString());
    
    const signoNormalizado = normalizarSigno(signo);
    localStorage.setItem("astro_signo_img", `../img/zodiaco/${signoNormalizado}.png`);

    window.location.assign("zodiaco.html");
}

/* ============================================================
   TAROT (Manejo Seguro)
============================================================ */

const cartasTarot = ["loco", "mago", "sacerdotisa", "emperatriz", "emperador", "sumo-sacerdote", "enamorados", "carro", "justicia", "ermitaño", "rueda", "fuerza", "colgado", "muerte", "templanza", "diablo", "torre", "estrella", "luna", "sol", "juicio", "mundo"];

function generarCartaDia() {
    const idx = Math.floor(Math.random() * cartasTarot.length);
    const clave = cartasTarot[idx];

    localStorage.setItem("astro_tarot_carta_dia", clave);
    localStorage.setItem("astro_img_tarot", `../img/tarot/${clave}.png`);
    
    window.location.assign("tarot.html");
}

/* ============================================================
   CARGA DE DATOS (Manejo de DOM seguro)
============================================================ */

function cargarDato(id, clave) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = leerStorage(clave) || "—";
    }
}

function cargarPaginaZodiaco() {
    cargarDato("nombre", "astro_nombre");
    cargarDato("signo", "astro_signo");
    
    const imgPath = leerStorage("astro_signo_img");
    const elImg = document.getElementById("img-signo");
    if (elImg && imgPath) {
        elImg.src = imgPath;
    }
}

// Exportación al objeto Global
window.toggleMenu = toggleMenu;
window.procesarFormulario = procesarFormulario;
window.cargarPaginaZodiaco = cargarPaginaZodiaco;
window.generarCartaDia = generarCartaDia;
