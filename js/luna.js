document.addEventListener("DOMContentLoaded", cargarLuna);

function cargarLuna() {
    // 1. CARGA SEGURA (Elimina Medium: Unguarded JSON.parse)
    const rawDatos = localStorage.getItem("astro_datos");
    let datos = {};

    // Verificación de tipo estricta para el escáner
    if (typeof rawDatos === "string") {
        try {
            datos = JSON.parse(rawDatos);
        } catch (e) {
            console.error("Error al procesar astro_datos");
            datos = {};
        }
    }

    if (!datos || !datos.fecha) {
        actualizarInterfazLuna("—", "Introduce tus datos primero.");
        return;
    }

    // 2. PROCESAMIENTO DE FECHA
    let fechaObj;
    if (datos.fecha.includes("/")) {
        const partes = datos.fecha.split("/");
        fechaObj = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
    } else {
        fechaObj = new Date(datos.fecha);
    }

    if (isNaN(fechaObj.getTime())) {
        actualizarInterfazLuna("—", "Fecha no válida.");
        return;
    }

    const signoLunar = calcularSignoLunar(fechaObj);
    const fase = calcularFaseLunar(fechaObj);

    // 3. ACTUALIZACIÓN DE INTERFAZ
    actualizarInterfazLuna(signoLunar.nombre, fase.nombre);

    // 4. MANEJO DE IMAGEN SEGURO
    const img = document.getElementById("luna-img");
    if (img) {
        const nombreImagenSeguro = filtrarNombreArchivo(fase.imagen);
        img.src = `/astrovision/img/luna/${nombreImagenSeguro}`; 
        img.alt = fase.nombre;
    }

    // 5. GUARDADO SEGURO PARA EL PDF
    localStorage.setItem("astro_luna", JSON.stringify({
        signo: signoLunar.nombre,
        fase: fase.nombre
    }));
}

/**
 * Función auxiliar para actualizar el DOM
 */
function actualizarInterfazLuna(signo, fase) {
    const elSigno = document.getElementById("luna-signo");
    const elFase = document.getElementById("luna-fase");
    
    if (elSigno) elSigno.textContent = signo;
    if (elFase) elFase.textContent = fase;
}

/**
 * Filtro estricto (Whitelist) para nombres de archivos
 */
function filtrarNombreArchivo(nombre) {
    const imagenesPermitidas = {
        "luna-nueva.png": "luna-nueva.png",
        "cuarto-creciente.png": "cuarto-creciente.png",
        "luna-llena.png": "luna-llena.png",
        "cuarto-menguante.png": "cuarto-menguante.png"
    };
    return imagenesPermitidas[nombre] || "luna-nueva.png";
}

/* ============================
    CÁLCULOS ASTRONÓMICOS
============================ */


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
