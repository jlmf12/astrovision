function cargarChino() {
    const rawDatos = localStorage.getItem("astro_datos");
    // Guards against parsing null or undefined values
    const datos = rawDatos ? JSON.parse(rawDatos) : {};

    if (!datos.fecha) {
        actualizarInterfazChino("—", "—", "Introduce tus datos primero.");
        return;
    }

    const year = new Date(datos.fecha).getUTCFullYear();
    const animal = obtenerAnimalChino(year);
    const elemento = obtenerElementoChino(year);
    const descripcion = descripcionesChinas[animal] || "—";

    actualizarInterfazChino(animal, elemento, descripcion);

    localStorage.setItem("astro_chino", JSON.stringify({
        animal,
        elemento,
        descripcion
    }));
}
