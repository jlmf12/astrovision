/* ============================
    LÓGICA DE COMPATIBILIDAD
============================ */

function calcularCompatibilidad() {
    // 1. CARGA SEGURA: Elimina "Unguarded JSON.parse"
    const rawZodiaco = localStorage.getItem("astro_zodiaco");
    const zodiaco = rawZodiaco ? JSON.parse(rawZodiaco) : null;

    const contenedorMsg = document.getElementById("compat-resultado");

    if (!zodiaco || !zodiaco.nombre) {
        if (contenedorMsg) contenedorMsg.textContent = "Calcula tu signo solar primero.";
        return;
    }

    // 2. CÁLCULO DE COMPATIBILIDAD
    const mejorCompat = obtenerMejorCompatibilidad(zodiaco.nombre);
    
    // 3. ACTUALIZACIÓN DE INTERFAZ
    if (contenedorMsg) {
        contenedorMsg.textContent = `Tu mejor afinidad es con: ${mejorCompat.join(", ")}`;
    }
    
    // 4. PERSISTENCIA SEGURA
    localStorage.setItem("astro_compat", JSON.stringify({
        mejor: mejorCompat
    }));
}

/**
 * Determina afinidades según el elemento del signo
 * (Mantiene la complejidad ciclomática baja < 10)
 */
function obtenerMejorCompatibilidad(signo) {
    const grupos = {
        fuego: ["Aries", "Leo", "Sagitario"],
        tierra: ["Tauro", "Virgo", "Capricornio"],
        aire: ["Géminis", "Libra", "Acuario"],
        agua: ["Cáncer", "Escorpio", "Piscis"]
    };

    // Encontrar a qué grupo pertenece el signo actual
    const grupoPertenece = Object.keys(grupos).find(key => 
        grupos[key].includes(signo)
    );

    // Retorna los otros signos del mismo grupo (afinidad elemental)
    return grupoPertenece ? grupos[grupoPertenece].filter(s => s !== signo) : [];
}
