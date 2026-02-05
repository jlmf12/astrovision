document.addEventListener("DOMContentLoaded", cargarLuna);

function cargarLuna() {
    const datos = JSON.parse(localStorage.getItem("astro_datos") || "{}");

    if (!datos.fecha) {
        document.getElementById("luna-signo").textContent = "—";
        document.getElementById("luna-fase").textContent = "Introduce tus datos primero.";
        return;
    }

    const fecha = new Date(datos.fecha);

    const signoLunar = calcularSignoLunar(fecha);
    const fase = calcularFaseLunar(fecha);

    document.getElementById("luna-signo").textContent = signoLunar.nombre;
    document.getElementById("luna-fase").textContent = fase.nombre;

    const img = document.getElementById("luna-img");
    img.src = `../img/luna/${fase.imagen}`;
    img.alt = fase.nombre;

    localStorage.setItem("astro_luna", JSON.stringify({
        signo: signoLunar.nombre,
        fase: fase.nombre
    }));
}

function calcularSignoLunar(fecha) {
    const inicio = new Date("2000-01-06");
    const dias = (fecha - inicio) / (1000 * 60 * 60 * 24);
    const fase = (dias % 27.32) / 27.32;

    const signos = [
        "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario",
        "Capricornio", "Acuario", "Piscis", "Aries", "Tauro", "Géminis"
    ];

    const indice = Math.floor(fase * 12);
    return { nombre: signos[indice] || "—" };
}

function calcularFaseLunar(fecha) {
    const inicio = new Date("2000-01-06");
    const dias = (fecha - inicio) / (1000 * 60 * 60 * 24);
    const fase = dias % 29.53;

    if (fase < 1.5) return { nombre: "Luna Nueva", imagen: "luna-nueva.png" };
    if (fase < 7) return { nombre: "Cuarto Creciente", imagen: "cuarto-creciente.png" };
    if (fase < 14) return { nombre: "Luna Llena", imagen: "luna-llena.png" };
    if (fase < 22) return { nombre: "Cuarto Menguante", imagen: "cuarto-menguante.png" };
    return { nombre: "Luna Nueva", imagen: "luna-nueva.png" };
}
