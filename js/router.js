// Detectar si estamos en /pages/ o en la raíz
const RUTA_PAGES = location.pathname.includes("/pages/")
    ? "./"          // Si ya estamos dentro de /pages/
    : "pages/";     // Si estamos en index.html

// Contenedor donde se cargan las páginas
const contenedor = document.getElementById("app");

// Navegación principal
async function navegar(ruta) {
    const archivo = `${RUTA_PAGES}${ruta}.html`;

    try {
        const respuesta = await fetch(archivo);
        if (!respuesta.ok) throw new Error("Página no encontrada");

        const html = await respuesta.text();
        contenedor.innerHTML = html;

        // Actualizar historial
        history.pushState({ ruta }, "", `#${ruta}`);

        // Ejecutar scripts internos de la página cargada
        ejecutarScripts(contenedor);

    } catch (e) {
        contenedor.innerHTML = `
            <div style="padding:20px; text-align:center;">
                <h2>Error cargando la página</h2>
                <p>No se pudo cargar: <strong>${ruta}.html</strong></p>
            </div>
        `;
    }
}

// Ejecutar scripts incluidos dentro del HTML cargado
function ejecutarScripts(elemento) {
    const scripts = elemento.querySelectorAll("script");

    scripts.forEach(oldScript => {
        const nuevo = document.createElement("script");
        if (oldScript.src) {
            nuevo.src = oldScript.src;
        } else {
            nuevo.textContent = oldScript.textContent;
        }
        document.body.appendChild(nuevo);
        oldScript.remove();
    });
}

// Manejar navegación con botones o enlaces
document.addEventListener("click", e => {
    const link = e.target.closest("[data-nav]");
    if (!link) return;

    e.preventDefault();
    const ruta = link.getAttribute("data-nav");
    navegar(ruta);
});

// Manejar navegación con el botón atrás del navegador
window.addEventListener("popstate", e => {
    if (e.state && e.state.ruta) {
        navegar(e.state.ruta);
    }
});

// Cargar página inicial si hay hash
window.addEventListener("load", () => {
    const hash = location.hash.replace("#", "");
    if (hash) {
        navegar(hash);
    }
});
