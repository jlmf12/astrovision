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

        if (datos.nombre) {
            const nombreElem = document.getElementById("nombre");
            if (nombreElem) nombreElem.value = datos.nombre;
        }
        
        if (datos.fecha) {
            const fechaElem = document.getElementById("fecha");
            if (fechaElem) fechaElem.value = datos.fecha;
        }

    } catch (e) {
        console.error("Error cargando datos:", e);
    }
});


/* ============================
    GUARDAR DATOS DEL USUARIO
============================ */

function guardarDatos() {
    const nombreInput = document.getElementById("nombre");
    const fechaInput = document.getElementById("fecha");

    const nombre = nombreInput ? nombreInput.value.trim() : "";
    const fecha = fechaInput ? fechaInput.value.trim() : "";

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
        CREAR BOTÓN SEGUIR (SEGURO)
    ============================ */

    let btnSeguir = document.getElementById("btn-seguir");

    if (!btnSeguir) {
        btnSeguir = document.createElement("button");
        btnSeguir.id = "btn-seguir";
        btnSeguir.className = "btn-accion";
        btnSeguir.style.marginTop = "15px";

        // Crear el texto del botón de forma segura
        const spanText = document.createElement("span");
        spanText.textContent = "Seguir";

        // Crear la imagen del botón de forma segura
        const imgIcon = document.createElement("img");
        imgIcon.src = "../img/ui/adelante.png";
        imgIcon.alt = "seguir";
        imgIcon.className = "icono-btn";

        // Ensamblar el botón
        btnSeguir.appendChild(spanText);
        btnSeguir.appendChild(imgIcon);

        const card = document.querySelector(".card");
        if (card) {
            card.appendChild(btnSeguir);
        }

        btnSeguir.addEventListener("click", () => {
            window.location.href = "zodiaco.html";
        });
    }
}

