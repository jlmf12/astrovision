/* ============================
   CARGAR HORÓSCOPO CHINO
============================ */

function cargarChino() {
    // 1. CARGA SEGURA: Evita "Unguarded JSON.parse"
    const rawDatos = localStorage.getItem("astro_datos");
    const datos = rawDatos ? JSON.parse(rawDatos) : {};

    // 2. VALIDACIÓN DE DATOS
    if (!datos.fecha) {
        actualizarInterfazChino("—", "—", "Introduce tus datos primero.");
        return;
    }

    // 3. PROCESAMIENTO ROBUSTO DE FECHA
    const fechaObj = new Date(datos.fecha);
    const year = fechaObj.getUTCFullYear();

    // Validar que el año sea un número (evita fallos si la fecha es inválida)
    if (isNaN(year)) {
        actualizarInterfazChino("—", "—", "Fecha no válida.");
        return;
    }

    const animal = obtenerAnimalChino(year);
    const elemento = obtenerElementoChino(year);
    const descripcion = descripcionesChinas[animal] || "—";

    // 4. ACTUALIZACIÓN DE INTERFAZ
    actualizarInterfazChino(animal, elemento, descripcion);

    // 5. PERSISTENCIA SEGURA
    localStorage.setItem("astro_chino", JSON.stringify({
        animal,
        elemento,
        descripcion
    }));
}

/**
 * Actualiza el DOM (Mantiene la complejidad ciclomática baja)
 */
function actualizarInterfazChino(animal, elemento, descripcion) {
    const ids = {
        "chino-animal": animal,
        "chino-elemento": elemento,
        "chino-descripcion": descripcion
    };

    Object.entries(ids).forEach(([id, valor]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = valor;
    });
}

/* ============================
   LÓGICA DE CÁLCULO
============================ */

function obtenerAnimalChino(year) {
    const animales = [
        "Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente",
        "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"
    ];
    // Ciclo de 12 años (2020 fue Rata)
    const index = (year - 2020) % 12;
    return animales[(index + 12) % 12];
}

function obtenerElementoChino(year) {
    const elementos = ["Metal", "Agua", "Madera", "Fuego", "Tierra"];
    // Ciclo de 10 años, cambia cada 2 años
    const index = Math.floor(((year - 2020) % 10) / 2);
    return elementos[(index + 5) % 5];
}

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
