/* ============================
    CARGAR SIGNO ZODIACAL
============================ */

function cargarZodiaco() {
    // 1. CARGA SEGURA: Eliminamos "Unguarded JSON.parse"
    const rawDatos = localStorage.getItem("astro_datos");
    let datos = {};

    if (typeof rawDatos === "string") {
        try {
            datos = JSON.parse(rawDatos);
        } catch (e) {
            console.error("Error en parseo de datos de zodiaco");
            datos = {};
        }
    }

    // 2. VALIDACIÓN DE ENTRADA
    if (!datos || !datos.fecha) {
        actualizarDOMZodiaco("—", "—", "Introduce tus datos primero.");
        return;
    }

    const fecha = new Date(datos.fecha);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1;

    // Verificar si la fecha es válida
    if (isNaN(dia) || isNaN(mes)) {
        actualizarDOMZodiaco("—", "—", "Fecha no válida.");
        return;
    }

    const signo = obtenerSigno(dia, mes);

    // 3. ACTUALIZACIÓN DE INTERFAZ
    actualizarDOMZodiaco(signo.nombre, signo.elemento, signo.descripcion);

    // 4. GUARDADO SEGURO
    localStorage.setItem("astro_zodiaco", JSON.stringify(signo));
}

/**
 * Función auxiliar para actualizar el DOM (Baja complejidad)
 */
function actualizarDOMZodiaco(nombre, elemento, desc) {
    const ids = {
        "signo-solar": nombre,
        "signo-elemento": elemento,
        "signo-descripcion": desc
    };

    Object.entries(ids).forEach(([id, valor]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    });
}

/* ============================
    TABLA DE SIGNOS
============================ */

function obtenerSigno(dia, mes) {
    const signos = [
        { nombre: "Aries",       inicio: [21, 3],  fin: [19, 4], elemento: "Fuego", descripcion: "Energía, impulso y liderazgo." },
        { nombre: "Tauro",       inicio: [20, 4],  fin: [20, 5], elemento: "Tierra", descripcion: "Estabilidad, paciencia y sensualidad." },
        { nombre: "Géminis",     inicio: [21, 5],  fin: [20, 6], elemento: "Aire", descripcion: "Curiosidad, comunicación y dualidad." },
        { nombre: "Cáncer",      inicio: [21, 6],  fin: [22, 7], elemento: "Agua", descripcion: "Emoción, protección y sensibilidad." },
        { nombre: "Leo",         inicio: [23, 7],  fin: [22, 8], elemento: "Fuego", descripcion: "Creatividad, orgullo y brillo personal." },
        { nombre: "Virgo",       inicio: [23, 8],  fin: [22, 9], elemento: "Tierra", descripcion: "Orden, análisis y perfeccionismo." },
        { nombre: "Libra",       inicio: [23, 9],  fin: [22, 10], elemento: "Aire", descripcion: "Equilibrio, belleza y diplomacia." },
        { nombre: "Escorpio",    inicio: [23, 10], fin: [21, 11], elemento: "Agua", descripcion: "Intensidad, misterio y transformación." },
        { nombre: "Sagitario",   inicio: [22, 11], fin: [21, 12], elemento: "Fuego", descripcion: "Aventura, expansión y libertad." },
        { nombre: "Capricornio", inicio: [22, 12], fin: [19, 1], elemento: "Tierra", descripcion: "Disciplina, ambición y resistencia." },
        { nombre: "Acuario",     inicio: [20, 1],  fin: [18, 2], elemento: "Aire", descripcion: "Innovación, idealismo y rebeldía." },
        { nombre: "Piscis",      inicio: [19, 2],  fin: [20, 3], elemento: "Agua", descripcion: "Imaginación, empatía y espiritualidad." }
    ];

    const fechaNum = dia + mes * 100;

    for (const s of signos) {
        const inicioNum = s.inicio[0] + s.inicio[1] * 100;
        const finNum = s.fin[0] + s.fin[1] * 100;

        // Lógica especial para Capricornio (salto de año)
        if (s.nombre === "Capricornio") {
            if (fechaNum >= inicioNum || fechaNum <= finNum) return s;
        } else {
            if (fechaNum >= inicioNum && fechaNum <= finNum) return s;
        }
    }

    return { nombre: "—", elemento: "—", descripcion: "No determinado." };
}
