/* ============================
    CARGAR TRÁNSITOS ACTUALES
============================ */

/**
 * Gestiona la carga y visualización de la energía diaria
 */
function cargarTransitos() {
    const hoy = new Date();
    const energia = generarEnergiaDelDia(hoy);

    // 1. ACTUALIZACIÓN SEGURA DEL DOM
    const elTexto = document.getElementById("transitos-texto");
    if (elTexto) {
        elTexto.textContent = energia;
    }

    // 2. PERSISTENCIA SEGURA
    // Aunque es un string simple, validamos que exista un valor válido
    if (energia) {
        try {
            localStorage.setItem("astro_transitos", energia);
        } catch (e) {
            console.error("Error al persistir tránsitos diarios");
        }
    }
}

/* ============================
    GENERADOR DE ENERGÍA DEL DÍA
============================ */

/**
 * Lógica determinista para mensajes diarios (Complejidad Ciclomática: 1)
 */
function generarEnergiaDelDia(fecha) {
    // Validar que la fecha sea un objeto Date válido
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
        return "La energía está en constante cambio. Mantén la calma.";
    }

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;

    // Semilla matemática para variar el mensaje según la fecha
    const clave = (dia * 7 + mes * 13) % 6;

    const mensajes = [
        "Un día ideal para tomar decisiones importantes y avanzar con determinación.",
        "La energía favorece la introspección y la claridad emocional.",
        "Momento perfecto para comunicarte, negociar y expresar tus ideas.",
        "La creatividad fluye con facilidad: excelente para proyectos artísticos.",
        "Energía inestable: avanza con calma y evita discusiones innecesarias.",
        "Un día de renovación: suelta lo viejo y abre espacio a nuevas oportunidades."
    ];

    // Acceso seguro al array mediante fallback
    return mensajes[clave] || mensajes[0];
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarTransitos);
