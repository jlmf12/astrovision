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

        const textoHTML = await respuesta.text();

        // 1. Limpiar el contenedor de forma segura
        contenedor.replaceChildren();

        // 2. Usar DOMParser para convertir el texto en nodos reales (Más seguro que innerHTML)
        const parser = new DOMParser();
        const doc = parser.parseFromString(textoHTML, 'text/html');
        
        // 3. Insertar el contenido procesado
        const contenidoFragmento = document.createDocumentFragment();
        Array.from(doc.body.childNodes).forEach(nodo => {
            contenidoFragmento.appendChild(nodo.cloneNode(true));
        });
        contenedor.appendChild(contenidoFragmento);

        // Actualizar historial
        history.pushState({ ruta }, "", `#${ruta}`);

        // Ejecutar scripts internos
        ejecutarScripts(contenedor);

    } catch (e) {
        // CORRECCIÓN SEGURA PARA ERRORES (Sin innerHTML)
        contenedor.replaceChildren();
        const divError = document.createElement("div");
        divError.style.cssText = "padding:20px; text-align:center;";
        
        const h2 = document.createElement("h2");
        h2.textContent = "Error cargando la página";
        
        const p = document.createElement("p");
        p.textContent = `No se pudo cargar: ${ruta}.html`;
        
        divError.appendChild(h2);
        divError.appendChild(p);
        contenedor.appendChild(divError);
    }
}

// Ejecutar scripts incluidos (Mantenemos la lógica pero con precaución)
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
    if (ruta) navegar(ruta);
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
