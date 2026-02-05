document.addEventListener("DOMContentLoaded", cargarLuna);

function cargarLuna() {
    const datos = JSON.parse(localStorage.getItem("astro_datos") || "{}");

    if (!datos.fecha) {
        document.getElementById("luna-signo").textContent = "—";
        document.getElementById("luna-fase").textContent = "Introduce tus datos primero.";
        return;
    }

    // Corrección de formato de fecha para asegurar compatibilidad
    const partes = datos.fecha.split("/");
    const fechaObj = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);

    const signoLunar = calcularSignoLunar(fechaObj);
    const fase = calcularFaseLunar(fechaObj);

    document.getElementById("luna-signo").textContent = signoLunar.nombre;
    document.getElementById("luna-fase").textContent = fase.nombre;

    // SOLUCIÓN PATH TRAVERSAL: Usar una ruta controlada
    const img = document.getElementById("luna-img");
    if (img) {
        // Opción segura: Definir la carpeta base y evitar el uso de variables directas en el path relativo
        const nombreImagenSeguro = filtrarNombreArchivo(fase.imagen);
        img.src = `/astrovision/img/luna/${nombreImagenSeguro}`; 
        img.alt = fase.nombre;
    }

    localStorage.setItem("astro_luna", JSON.stringify({
        signo: signoLunar.nombre,
        fase: fase.nombre
    }));
}

// Función auxiliar para evitar manipulaciones de ruta
function filtrarNombreArchivo(nombre) {
    const mapaImagenes = {
        "luna-nueva.png": "luna-nueva.png",
        "cuarto-creciente.png": "cuarto-creciente.png",
        "luna-llena.png": "luna-llena.png",
        "cuarto-menguante.png": "cuarto-menguante.png"
    };
    return mapaImagenes[nombre] || "luna-nueva.png";
}

function calcularSignoLunar(fecha) {
    const inicio = new Date("2000-01-06");
    const dias = (fecha - inicio) / (1000 * 60 * 60 * 24);
    const faseNorm = ((dias % 27.32) + 27.32) % 27.32 / 27.32;

    const signos = [
        "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario",
        "Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis"
    ];

    const indice = Math.floor(faseNorm * 12);
    return { nombre: signos[indice] || "—" };
}

function calcularFaseLunar(fecha) {
    const inicio = new Date("2000-01-06");
    const dias = (fecha - inicio) / (1000 * 60 * 60 * 24);
    const fase = ((dias % 29.53) + 29.53) % 29.53;

    if (fase < 1.5) return { nombre: "Luna Nueva", imagen: "luna-nueva.png" };
    if (fase < 7) return { nombre: "Cuarto Creciente", imagen: "cuarto-creciente.png" };
    if (fase < 14) return { nombre: "Luna Llena", imagen: "luna-llena.png" };
    if (fase < 22) return { nombre: "Cuarto Menguante", imagen: "cuarto-menguante.png" };
    return { nombre: "Luna Nueva", imagen: "luna-nueva.png" };
}
