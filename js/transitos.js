/* ============================
   CARGAR TRÁNSITOS ACTUALES
============================ */

function cargarTransitos() {
    const hoy = new Date();
    const energia = generarEnergiaDelDia(hoy);

    document.getElementById("transitos-texto").textContent = energia;

    // Guardar para informe
    localStorage.setItem("astro_transitos", energia);
}

/* ============================
   GENERADOR DE ENERGÍA DEL DÍA
============================ */

function generarEnergiaDelDia(fecha) {
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;

    // Semilla simple para variar el mensaje
    const clave = (dia * 7 + mes * 13) % 6;

    const mensajes = [
        "Un día ideal para tomar decisiones importantes y avanzar con determinación.",
        "La energía favorece la introspección y la claridad emocional.",
        "Momento perfecto para comunicarte, negociar y expresar tus ideas.",
        "La creatividad fluye con facilidad: excelente para proyectos artísticos.",
        "Energía inestable: avanza con calma y evita discusiones innecesarias.",
        "Un día de renovación: suelta lo viejo y abre espacio a nuevas oportunidades."
    ];

    return mensajes[clave];
}
