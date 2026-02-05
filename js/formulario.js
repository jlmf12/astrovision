/* ============================
   AUTOFORMATO FECHA dd/mm/aaaa
============================ */

document.addEventListener("DOMContentLoaded", () => {
    const fechaInput = document.getElementById("fecha");

    if (fechaInput) {
        fechaInput.addEventListener("input", function (e) {
            let v = e.target.value.replace(/\D/g, ""); // solo números

            if (v.length >= 3 && v.length <= 4) {
                v = v.replace(/(\d{2})(\d+)/, "$1/$2");
            } else if (v.length >= 5) {
                v = v.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
            }

            e.target.value = v.substring(0, 10);
        });
    }

    /* ============================
       CARGAR DATOS SI EXISTEN
    ============================ */

    const guardados = localStorage.getItem("astro_datos");
    if (!guardados) return;

    try {
        const datos = JSON.parse(guardados);

        if (datos.nombre) document.getElementById("nombre").value = datos.nombre;
        if (datos.fecha) document.getElementById("fecha").value = datos.fecha;

    } catch (e) {
        console.error("Error cargando datos:", e);
    }
});


/* ============================
   GUARDAR DATOS DEL USUARIO
============================ */

function guardarDatos() {
    const nombre = document.getElementById("nombre")?.value.trim();
    const fecha = document.getElementById("fecha")?.value.trim();

    if (!nombre) {
        alert("Por favor, introduce tu nombre.");
        return;
    }

    if (!fecha) {
        alert("Por favor, introduce tu fecha de nacimiento.");
        return;
    }

    // Validación estricta dd/mm/aaaa
    const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!regexFecha.test(fecha)) {
        alert("La fecha debe tener el formato dd/mm/aaaa");
        return;
    }

    const datos = { nombre, fecha };

    localStorage.setItem("astro_datos", JSON.stringify(datos));

    alert("Datos guardados correctamente.");

    /* ============================
       CREAR BOTÓN SEGUIR
    ============================ */

    let btnSeguir = document.getElementById("btn-seguir");

    if (!btnSeguir) {
        btnSeguir = document.createElement("button");
        btnSeguir.id = "btn-seguir";
        btnSeguir.className = "btn-accion";
        btnSeguir.style.marginTop = "15px";

        btnSeguir.innerHTML = `
            <span>Seguir</span>
            <img src="../img/ui/adelante.png" alt="seguir" class="icono-btn">
        `;

        const card = document.querySelector(".card");
        card.appendChild(btnSeguir);

        btnSeguir.addEventListener("click", () => {
            window.location.href = "zodiaco.html";
        });
    }
}
