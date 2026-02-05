async function cargarCartaDelDia() {
    try {
        const respuesta = await fetch("https://api.ejemplo.com/tarot"); // Cambiar por tu URL real
        const carta = await respuesta.json();
        actualizarInterfazTarot(carta);
    } catch (error) {
        console.error("Error al obtener carta");
    }
}

function actualizarInterfazTarot(c) {
    const elTitulo = document.getElementById("tarot-titulo");
    if (elTitulo) elTitulo.textContent = c.nombre;
    
    localStorage.setItem("astro_tarot", JSON.stringify(c));
}
