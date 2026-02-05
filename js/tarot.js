/* ============================
   CARTA DEL DÍA
============================ */

function cargarCartaDelDia() {
    const guardada = localStorage.getItem("astro_tarot_dia");

    if (guardada) {
        const data = JSON.parse(guardada);
        mostrarCartaDia(data);
        return;
    }

    // Si no hay carta guardada, generar una nueva
    generarCartaDia();
}

function generarCartaDia() {
    const carta = obtenerCartaAleatoria();

    const data = {
        nombre: carta.nombre,
        imagen: carta.imagen,
        interpretacion: carta.interpretacion
    };

    localStorage.setItem("astro_tarot_dia", JSON.stringify(data));

    mostrarCartaDia(data);
}

function mostrarCartaDia(data) {
    document.getElementById("carta-dia").src = `../img/tarot/${data.imagen}`;
    document.getElementById("carta-dia").alt = data.nombre;
    document.getElementById("interpretacion-dia").textContent = data.interpretacion;

    // Guardar para informe
    localStorage.setItem("astro_tarot", data.interpretacion);
}

/* ============================
   TIRADA DE 3 CARTAS
============================ */

function cargarTirada() {
    const guardada = localStorage.getItem("astro_tarot_tirada");

    if (guardada) {
        const data = JSON.parse(guardada);
        mostrarTirada(data);
        return;
    }

    generarTirada();
}

function generarTirada() {
    const carta1 = obtenerCartaAleatoria();
    const carta2 = obtenerCartaAleatoria();
    const carta3 = obtenerCartaAleatoria();

    const data = {
        cartas: [carta1, carta2, carta3],
        interpretacion: interpretarTirada(carta1, carta2, carta3)
    };

    localStorage.setItem("astro_tarot_tirada", JSON.stringify(data));

    mostrarTirada(data);
}

function mostrarTirada(data) {
    document.getElementById("tirada-carta-1").src = `../img/tarot/${data.cartas[0].imagen}`;
    document.getElementById("tirada-carta-2").src = `../img/tarot/${data.cartas[1].imagen}`;
    document.getElementById("tirada-carta-3").src = `../img/tarot/${data.cartas[2].imagen}`;

    document.getElementById("tirada-interpretacion").textContent = data.interpretacion;

    // Guardar para informe
    localStorage.setItem("astro_tarot", data.interpretacion);
}

/* ============================
   INTERPRETACIÓN DE TIRADA
============================ */

function interpretarTirada(c1, c2, c3) {
    return `Pasado: ${c1.nombre}. Presente: ${c2.nombre}. Futuro: ${c3.nombre}.`;
}

/* ============================
   BARAJA DE TAROT
============================ */

const cartasTarot = [
    { nombre: "El Loco", imagen: "loco.png", interpretacion: "Nuevos comienzos, espontaneidad y libertad." },
    { nombre: "El Mago", imagen: "mago.png", interpretacion: "Poder personal, acción y manifestación." },
    { nombre: "La Sacerdotisa", imagen: "sacerdotisa.png", interpretacion: "Intuición, misterio y sabiduría interior." },
    { nombre: "La Emperatriz", imagen: "emperatriz.png", interpretacion: "Creatividad, fertilidad y abundancia." },
    { nombre: "El Emperador", imagen: "emperador.png", interpretacion: "Orden, autoridad y estabilidad." },
    { nombre: "El Hierofante", imagen: "hierofante.png", interpretacion: "Tradición, guía espiritual y aprendizaje." },
    { nombre: "Los Enamorados", imagen: "enamorados.png", interpretacion: "Decisiones, unión y armonía." },
    { nombre: "El Carro", imagen: "carro.png", interpretacion: "Determinación, avance y victoria." },
    { nombre: "La Fuerza", imagen: "fuerza.png", interpretacion: "Coraje, paciencia y autocontrol." },
    { nombre: "El Ermitaño", imagen: "ermitaño.png", interpretacion: "Búsqueda interior, reflexión y sabiduría." },
    { nombre: "La Rueda de la Fortuna", imagen: "rueda.png", interpretacion: "Cambios, destino y ciclos." },
    { nombre: "La Justicia", imagen: "justicia.png", interpretacion: "Equilibrio, verdad y decisiones justas." },
    { nombre: "El Colgado", imagen: "colgado.png", interpretacion: "Perspectiva, pausa y rendición." },
    { nombre: "La Muerte", imagen: "muerte.png", interpretacion: "Transformación, cierre y renacimiento." },
    { nombre: "La Templanza", imagen: "templaza.png", interpretacion: "Armonía, paciencia y equilibrio." },
    { nombre: "El Diablo", imagen: "diablo.png", interpretacion: "Apegos, tentaciones y sombras." },
    { nombre: "La Torre", imagen: "torre.png", interpretacion: "Cambio abrupto, revelación y liberación." },
    { nombre: "La Estrella", imagen: "estrella.png", interpretacion: "Esperanza, inspiración y guía." },
    { nombre: "La Luna", imagen: "luna.png", interpretacion: "Intuición, sueños y confusión." },
    { nombre: "El Sol", imagen: "sol.png", interpretacion: "Éxito, alegría y claridad." },
    { nombre: "El Juicio", imagen: "juicio.png", interpretacion: "Renovación, despertar y decisiones." },
    { nombre: "El Mundo", imagen: "mundo.png", interpretacion: "Cierre, logro y plenitud." }
];

/* ============================
   CARTA ALEATORIA
============================ */

function obtenerCartaAleatoria() {
    const index = Math.floor(Math.random() * cartasTarot.length);
    return cartasTarot[index];
}
