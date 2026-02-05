/* ============================
   CARGAR NUMEROLOGÍA
============================ */

function cargarNumerologia() {
    const datos = JSON.parse(localStorage.getItem("astro_datos") || "{}");

    if (!datos.fecha) {
        const txtError = document.getElementById("numero-texto");
        if (txtError) txtError.textContent = "Introduce tus datos primero.";
        return;
    }

    const numero = calcularNumeroVida(datos.fecha);

    // SOLUCIÓN PATH TRAVERSAL: Validar que el número sea un dígito válido (1-9)
    const img = document.getElementById("numero-img");
    if (img && numero >= 1 && numero <= 9) {
        // Usamos ruta absoluta del proyecto para mayor seguridad
        img.src = `/astrovision/img/numerologia/${numero}.png`;
        img.alt = `Número ${numero}`;
    }

    // Texto interpretativo
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
    if (txtElemento) txtElemento.textContent = desc;

    // Guardar para informe
    localStorage.setItem("astro_numero", JSON.stringify({
        numero: numero,
        texto: desc
    }));
}

/* ============================
   CÁLCULO DEL NÚMERO DE VIDA
============================ */

function calcularNumeroVida(fechaStr) {
    // Limpiamos la fecha de cualquier caracter no numérico (guiones, barras, espacios)
    const numeros = fechaStr.replace(/\D/g, ""); 
    let suma = 0;

    // Sumar todos los dígitos
    for (const c of numeros) {
        suma += parseInt(c, 10);
    }

    // Reducir a un solo dígito (Cálculo pitagórico estándar)
    while (suma > 9) {
        suma = suma.toString().split("").reduce((a, b) => a + parseInt(b, 10), 0);
    }

    return suma;
}
