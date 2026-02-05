/* ============================
   CARGAR HORÓSCOPO CHINO
============================ */

function cargarChino() {
    const datos = JSON.parse(localStorage.getItem("astro_datos") || "{}");

    if (!datos.fecha) {
        document.getElementById("chino-animal").textContent = "—";
        document.getElementById("chino-elemento").textContent = "—";
        document.getElementById("chino-descripcion").textContent = "Introduce tus datos primero.";
        return;
    }

    const year = new Date(datos.fecha).getUTCFullYear();

    const animal = obtenerAnimalChino(year);
    const elemento = obtenerElementoChino(year);
    const descripcion = descripcionesChinas[animal] || "—";

    document.getElementById("chino-animal").textContent = animal;
    document.getElementById("chino-elemento").textContent = elemento;
    document.getElementById("chino-descripcion").textContent = descripcion;

    // Guardar para informe
    localStorage.setItem("astro_chino", JSON.stringify({
        animal,
        elemento,
        descripcion
    }));
}

/* ============================
   ANIMAL DEL HORÓSCOPO CHINO
============================ */

function obtenerAnimalChino(year) {
    const animales = [
        "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente",
        "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"
    ];

    // 2020 fue año de la Rata
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
