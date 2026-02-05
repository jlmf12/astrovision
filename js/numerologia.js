/* ============================
   CARGAR NUMEROLOGÍA
============================ */

function cargarNumerologia() {
    const datos = JSON.parse(localStorage.getItem("astro_datos") || "{}");

    if (!datos.fecha) {
        document.getElementById("numero-texto").textContent = "Introduce tus datos primero.";
        return;
    }

    const numero = calcularNumeroVida(datos.fecha);

    // Mostrar imagen
    const img = document.getElementById("numero-img");
    img.src = `../img/numerologia/${numero}.png`;
    img.alt = `Número ${numero}`;

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

    document.getElementById("numero-texto").textContent = textos[numero] || "—";

    // Guardar para informe
    localStorage.setItem("astro_numero", JSON.stringify({
        numero,
        texto: textos[numero]
    }));
}

/* ============================
   CÁLCULO DEL NÚMERO DE VIDA
============================ */

function calcularNumeroVida(fechaStr) {
    const fecha = fechaStr.replace(/-/g, ""); // YYYYMMDD → YYYYMMDD sin guiones
    let suma = 0;

    // Sumar todos los dígitos
    for (const c of fecha) {
        suma += parseInt(c);
    }

    // Reducir a un solo dígito
    while (suma > 9) {
        suma = suma.toString().split("").reduce((a, b) => a + parseInt(b), 0);
    }

    return suma;
}
