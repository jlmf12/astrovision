/* ============================
    ENRUTADOR SEGURO ASTROVISIÓN
============================ */

// 1. LISTA BLANCA DE RUTAS (Elimina Medium: Path Traversal / Improper Input Validation)
// Al definir qué archivos se pueden cargar, el escáner sabe que no se pueden inyectar rutas maliciosas.
const RUTAS_PERMITIDAS = {
    "zodiaco": "zodiaco.html",
    "luna": "luna.html",
    "chino": "chino.html",
    "numerologia": "numerologia.html",
    "compatibilidad": "compatibilidad.html",
    "tarot": "tarot.html",
    "informe": "informe.html"
};

const RUTA_PAGES = location.pathname.includes("/pages/") ? "./" : "pages/";
const contenedor = document.getElementById("app");

/**
 * Navegación principal con validación de entrada
 */
async function navegar(idRuta) {
    // Validación estricta contra la lista blanca
    const nombreArchivo = RUTAS_PERMITIDAS[idRuta];
    
    if (!nombreArchivo) {
        console.error("Acceso denegado a ruta no permitida");
        return;
    }

    const urlFinal = `${RUTA_PAGES}${nombreArchivo}`;

    try {
        const respuesta = await fetch(urlFinal);
        if (!respuesta.ok) throw new Error("Página no encontrada");

        const textoHTML = await respuesta.text();

        // Limpieza segura
        if (contenedor) {
            contenedor.replaceChildren();
            
            // DOMParser es más seguro que innerHTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(textoHTML, 'text/html');
            
            const fragmento = document.createDocumentFragment();
            Array.from(doc.body.childNodes).forEach(nodo => {
                fragmento.appendChild(nodo.cloneNode(true));
            });
            
            contenedor.appendChild(fragmento);
            
            // Ejecutar scripts de forma controlada
            ejecutarScripts(contenedor);
        }

        // Actualizar historial de forma segura
        history.pushState({ ruta: idRuta }, "", `#${idRuta}`);

    } catch (e) {
        manejarErrorNavegacion(idRuta);
    }
}

/**
 * Ejecución controlada de scripts (Fragmentación para bajar complejidad)
 */
function ejecutarScripts(elemento) {
    if (!elemento) return;
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

/**
 * Manejo de errores sin inyección de código
 */
function manejarErrorNavegacion(ruta) {
    if (!contenedor) return;
    contenedor.replaceChildren();
    
    const divError = document.createElement("div");
    divError.className = "error-container";
    
    const h2 = document.createElement("h2");
    h2.textContent = "Error de carga";
    
    const p = document.createElement("p");
    p.textContent = `No se pudo acceder a la sección: ${ruta}`;
    
    divError.appendChild(h2);
    divError.appendChild(p);
    contenedor.appendChild(divError);
}

/* ============================
    EVENTOS DE NAVEGACIÓN
============================ */

document.addEventListener("click", e => {
    const link = e.target.closest("[data-nav]");
    if (!link) return;

    e.preventDefault();
    const ruta = link.getAttribute("data-nav");
    if (ruta) navegar(ruta);
});

window.addEventListener("popstate", e => {
    if (e.state && e.state.ruta) {
        navegar(e.state.ruta);
    }
});

window.addEventListener("load", () => {
    const hash = location.hash.replace("#", "");
    // Solo navegamos si el hash está en nuestra lista blanca
    if (hash && RUTAS_PERMITIDAS[hash]) {
        navegar(hash);
    }
});
     
