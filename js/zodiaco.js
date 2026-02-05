/* ============================
   CARGAR SIGNO ZODIACAL
============================ */

function cargarZodiaco() {
    const datos = JSON.parse(localStorage.getItem("astro_datos") || "{}");

    if (!datos.fecha) {
        document.getElementById("signo-solar").textContent = "—";
        document.getElementById("signo-elemento").textContent = "—";
        document.getElementById("signo-descripcion").textContent = "Introduce tus datos primero.";
        return;
    }

    const fecha = new Date(datos.fecha);
    const dia = fecha.getUTCDate();
    const mes = fecha.getUTCMonth() + 1;

    const signo = obtenerSigno(dia, mes);

    document.getElementById("signo-solar").textContent = signo.nombre;
    document.getElementById("signo-elemento").textContent = signo.elemento;
    document.getElementById("signo-descripcion").textContent = signo.descripcion;

    // Guardar para el informe
    localStorage.setItem("astro_zodiaco", JSON.stringify(signo));
}

/* ============================
   TABLA DE SIGNOS
============================ */

function obtenerSigno(dia, mes) {
    const signos = [
        { nombre: "Aries",      inicio: "21-3",  fin: "19-4", elemento: "Fuego", descripcion: "Energía, impulso y liderazgo." },
        { nombre: "Tauro",      inicio: "20-4",  fin: "20-5", elemento: "Tierra", descripcion: "Estabilidad, paciencia y sensualidad." },
        { nombre: "Géminis",    inicio: "21-5",  fin: "20-6", elemento: "Aire", descripcion: "Curiosidad, comunicación y dualidad." },
        { nombre: "Cáncer",     inicio: "21-6",  fin: "22-7", elemento: "Agua", descripcion: "Emoción, protección y sensibilidad." },
        { nombre: "Leo",        inicio: "23-7",  fin: "22-8", elemento: "Fuego", descripcion: "Creatividad, orgullo y brillo personal." },
        { nombre: "Virgo",      inicio: "23-8",  fin: "22-9", elemento: "Tierra", descripcion: "Orden, análisis y perfeccionismo." },
        { nombre: "Libra",      inicio: "23-9",  fin: "22-10", elemento: "Aire", descripcion: "Equilibrio, belleza y diplomacia." },
        { nombre: "Escorpio",   inicio: "23-10", fin: "21-11", elemento: "Agua", descripcion: "Intensidad, misterio y transformación." },
        { nombre: "Sagitario",  inicio: "22-11", fin: "21-12", elemento: "Fuego", descripcion: "Aventura, expansión y libertad." },
        { nombre: "Capricornio",inicio: "22-12", fin: "19-1", elemento: "Tierra", descripcion: "Disciplina, ambición y resistencia." },
        { nombre: "Acuario",    inicio: "20-1",  fin: "18-2", elemento: "Aire", descripcion: "Innovación, idealismo y rebeldía." },
        { nombre: "Piscis",     inicio: "19-2",  fin: "20-3", elemento: "Agua", descripcion: "Imaginación, empatía y espiritualidad." }
    ];

    const fechaNum = dia + mes * 100;

    for (const s of signos) {
        const [iDia, iMes] = s.inicio.split("-").map(Number);
        const [fDia, fMes] = s.fin.split("-").map(Number);

        const inicioNum = iDia + iMes * 100;
        const finNum = fDia + fMes * 100;

        // Capricornio cruza el año
        if (s.nombre === "Capricornio") {
            if (fechaNum >= inicioNum || fechaNum <= finNum) return s;
        }

        if (fechaNum >= inicioNum && fechaNum <= finNum) return s;
    }

    return { nombre: "—", elemento: "—", descripcion: "No se pudo determinar el signo." };
}
