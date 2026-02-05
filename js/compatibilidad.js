/* ============================
   CARGAR COMPATIBILIDADES
============================ */

function cargarCompatibilidades() {
    const zodiaco = JSON.parse(localStorage.getItem("astro_zodiaco") || "{}");

    if (!zodiaco.nombre) {
        document.getElementById("compat-mejor").textContent = "—";
        document.getElementById("compat-media").textContent = "—";
        document.getElementById("compat-baja").textContent = "Introduce tus datos primero.";
        return;
    }

    const signo = zodiaco.nombre;
    const compat = obtenerCompatibilidades(signo);

    document.getElementById("compat-mejor").textContent = compat.mejor.join(", ");
    document.getElementById("compat-media").textContent = compat.media.join(", ");
    document.getElementById("compat-baja").textContent = compat.baja.join(", ");

    // Guardar para informe
    localStorage.setItem("astro_compat", JSON.stringify(compat));
}

/* ============================
   TABLA DE COMPATIBILIDADES
============================ */

function obtenerCompatibilidades(signo) {
    const tabla = {
        "Aries": {
            mejor: ["Leo", "Sagitario", "Acuario"],
            media: ["Géminis", "Aries", "Libra"],
            baja: ["Cáncer", "Capricornio", "Tauro"]
        },
        "Tauro": {
            mejor: ["Virgo", "Capricornio", "Cáncer"],
            media: ["Piscis", "Escorpio", "Tauro"],
            baja: ["Leo", "Acuario", "Géminis"]
        },
        "Géminis": {
            mejor: ["Libra", "Acuario", "Aries"],
            media: ["Leo", "Sagitario", "Géminis"],
            baja: ["Virgo", "Piscis", "Tauro"]
        },
        "Cáncer": {
            mejor: ["Escorpio", "Piscis", "Tauro"],
            media: ["Virgo", "Capricornio", "Cáncer"],
            baja: ["Aries", "Libra", "Acuario"]
        },
        "Leo": {
            mejor: ["Aries", "Sagitario", "Géminis"],
            media: ["Libra", "Leo", "Cáncer"],
            baja: ["Tauro", "Escorpio", "Capricornio"]
        },
        "Virgo": {
            mejor: ["Tauro", "Capricornio", "Cáncer"],
            media: ["Escorpio", "Piscis", "Virgo"],
            baja: ["Géminis", "Sagitario", "Leo"]
        },
        "Libra": {
            mejor: ["Géminis", "Acuario", "Leo"],
            media: ["Sagitario", "Libra", "Aries"],
            baja: ["Cáncer", "Capricornio", "Piscis"]
        },
        "Escorpio": {
            mejor: ["Cáncer", "Piscis", "Virgo"],
            media: ["Capricornio", "Escorpio", "Tauro"],
            baja: ["Leo", "Acuario", "Géminis"]
        },
        "Sagitario": {
            mejor: ["Aries", "Leo", "Acuario"],
            media: ["Géminis", "Sagitario", "Libra"],
            baja: ["Virgo", "Piscis", "Cáncer"]
        },
        "Capricornio": {
            mejor: ["Tauro", "Virgo", "Escorpio"],
            media: ["Piscis", "Capricornio", "Cáncer"],
            baja: ["Aries", "Libra", "Leo"]
        },
        "Acuario": {
            mejor: ["Géminis", "Libra", "Sagitario"],
            media: ["Aries", "Acuario", "Leo"],
            baja: ["Tauro", "Escorpio", "Cáncer"]
        },
        "Piscis": {
            mejor: ["Cáncer", "Escorpio", "Capricornio"],
            media: ["Tauro", "Piscis", "Virgo"],
            baja: ["Géminis", "Sagitario", "Leo"]
        }
    };

    return tabla[signo] || {
        mejor: ["—"],
        media: ["—"],
        baja: ["—"]
    };
}
