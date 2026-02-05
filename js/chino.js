/* ============================
   CARGAR HORÓSCOPO CHINO
============================ */

function cargarChino() {
    // SOLUCIÓN "Unguarded JSON.parse": Verificar existencia antes de parsear
    const rawDatos = localStorage.getItem("astro_datos");
    const datos = rawDatos ? JSON.parse(rawDatos) : {};

    if (!datos.fecha) {
        actualizarInterfazChino("—", "—", "Introduce tus datos primero.");
        return;
    }

    // Asegurar que la fecha se procese correctamente independientemente del formato
    const fechaObj = new Date(datos.fecha);
    const year = fechaObj.getUTCFullYear();

    // Validar que el año sea un número válido
    if (isNaN(year)) {
        actualizarInterfazChino("—", "—", "Fecha no válida.");
        return;
    }

    const animal = obtenerAnimalChino(year);
    const elemento = obtenerElementoChino(year);
    const descripcion = descripcionesChinas[animal] || "—";

    actualizarInterfazChino(animal, elemento, descripcion);

    // Guardar para informe
    localStorage.setItem("astro_chino", JSON.stringify({
        animal,
        elemento,
        descripcion
    }));
}

/**
 * Función auxiliar para actualizar el DOM de forma segura (Baja la complejidad)
 */
function actualizarInterfazChino(animal, elemento, descripcion) {
    const elAnimal = document.getElementById("chino-animal");
    const elElemento = document.getElementById("chino-elemento");
    const elDesc = document.getElementById("chino-descripcion");

    if (elAnimal) elAnimal.textContent = animal;
    if (elElemento) elElemento.textContent = elemento;
    if (elDesc) elDesc.textContent = descripcion;
}

/* ============================
   ANIMAL DEL HORÓSCOPO CHINO
============================ */

function obtenerAnimalChino(year) {
    const animales = [
        "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente",
        "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"
    ];

    // 2020 fue año de la Rata (Ciclo de 12)
    const index = (year - 2020) % 12;
    return animales[(index + 12) % 12];
}

/* ============================
   ELEMENTO SEGÚN EL CICLO
============================ */

function obtenerElementoChino(year) {
    const elementos = ["Metal", "Agua", "Madera", "Fuego", "Tierra"];

    // Ciclo de 10 años → cada elemento dura 2 años
    const index = Math.floor(((year - 2020) % 10) / 2);
    return elementos[(index + 5) % 5];
}

/* ============================
   DESCRIPCIONES
============================ */

const descripcionesChinas = {
    "Rata": "Inteligente, estratégica y adaptable.",
    "Buey": "Paciente, fuerte y confiable.",
    "Tigre": "Valiente, impulsivo y apasionado.",
    "Conejo": "Amable, sensible y diplomático.",
    "Dragón": "Poderoso, creativo y magnético.",
    "Serpiente": "Sabia, intuitiva y misteriosa.",
    "Caballo": "Libre, energético y sociable.",
    "Cabra": "Artística, tranquila y compasiva.",
    "Mono": "Ingenioso, curioso y divertido.",
    "Gallo": "Preciso, trabajador y directo.",
    "Perro": "Leal, protector y honesto.",
    "Cerdo": "Generoso, noble y amable."
};
