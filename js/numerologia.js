/* ============================
    CARGAR NUMEROLOGÍA
============================ */

function cargarNumerologia() {
    // 1. CARGA SEGURA: Eliminamos "Unguarded JSON.parse" con verificación de tipo
    const rawDatos = localStorage.getItem("astro_datos");
    let datos = {};

    if (typeof rawDatos === "string") {
        try {
            datos = JSON.parse(rawDatos);
        } catch (e) {
            console.error("Error al procesar datos de numerología");
            datos = {};
        }
    }

    // 2. VALIDACIÓN DE FECHA
    if (!datos || !datos.fecha) {
        const txtError = document.getElementById("numero-texto");
        if (txtError) txtError.textContent = "Introduce tus datos primero.";
        return;
    }

    const numero = calcularNumeroVida(datos.fecha);

    // 3. MANEJO SEGURO DE IMAGEN (Previene Path Traversal)
    const img = document.getElementById("numero-img");
    if (img && numero >= 1 && numero <= 9) {
        // Validación estricta: nos aseguramos de que 'numero' sea realmente un número
        const numSeguro = Math.floor(Number(numero));
        img.src = `/astrovision/img/numerologia/${numSeguro}.png`;
        img.alt = `Número de vida ${numSeguro}`;
    }

    // 4. TEXTOS INTERPRETATIVOS
    const textos = {
        1: "Liderazgo, independencia y fuerza personal.",
        2: "Cooperación, sensibilidad y equilibrio.",
        3: "Creatividad, expresión y alegría.",
        4: "Orden, estabilidad y disciplina.",
        5: "Cambio, libertad y aventura.",
        6: "Responsabilidad, amor y armonía.",
        7: "Introspección, sabiduría y espiritualidad.",
        8: "Poder, éxito material y ambición.",
        9: "Humanitarismo, compasión y cierre de ciclos."
    };

    const desc = textos[numero] || "—";
    const txtElemento = document.getElementById("numero-texto");
    if (txtElemento) {
        txtElemento.textContent = desc;
    }

    // 5. GUARDADO SEGURO
    localStorage.setItem("astro_numero", JSON.stringify({
        numero: numero,
        texto: desc
    }));
}

/* ============================
    CÁLCULO DEL NÚMERO DE VIDA
============================ */

function calcularNumeroVida(fechaStr) {
    // Limpieza de caracteres no numéricos
    const numeros = fechaStr.replace(/\D/g, ""); 
    let suma = 0;

    for (const c of numeros) {
        suma += parseInt(c, 10);
    }

    // Reducción pitagórica (aseguramos complejidad baja)
    while (suma > 9) {
        let subtotal = 0;
        const digitos = suma.toString();
        for (const d of digitos) {
            subtotal += parseInt(d, 10);
        }
        suma = subtotal;
    }

    return suma;
}
