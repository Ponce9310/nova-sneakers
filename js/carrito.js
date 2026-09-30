// ==============================
// NOVA SNEAKERS - CARRITO
// ==============================
// Este archivo concentra la lógica del carrito para que todos los botones
// de "Agregar al carrito" utilicen exactamente las mismas reglas.

const CLAVE_CARRITO_NOVA = "novaSneakersCarrito";
const CLAVE_PRODUCTOS_CARRITO = "novaSneakersProductos";

function obtenerCarrito() {
    try {
        const guardado = localStorage.getItem(CLAVE_CARRITO_NOVA);
        const carrito = guardado ? JSON.parse(guardado) : [];
        return Array.isArray(carrito) ? carrito : [];
    } catch (error) {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO_NOVA, JSON.stringify(carrito));
}

function obtenerCatalogoParaResumen() {
    try {
        const guardado = localStorage.getItem(CLAVE_PRODUCTOS_CARRITO);
        const productos = guardado ? JSON.parse(guardado) : [];
        return Array.isArray(productos) ? productos : [];
    } catch (error) {
        return [];
    }
}

function buscarProductoParaResumen(codigo) {
    return obtenerCatalogoParaResumen().find(function (producto) {
        return producto.codigo === codigo;
    });
}

function formatearPrecioCarrito(precio) {
    return Number(precio).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    });
}

function obtenerImagenCarrito(producto) {
    return producto && producto.imagen && producto.imagen.trim() !== ""
        ? producto.imagen
        : "img/productos/producto-generico.svg";
}

function agregarAlCarrito(codigo, cantidad = 1) {
    const producto = typeof buscarProducto === "function"
        ? buscarProducto(codigo)
        : buscarProductoParaResumen(codigo);

    if (!producto) {
        return { exito: false, mensaje: "No se encontró el producto." };
    }

    const cantidadSolicitada = Number(cantidad);

    if (!Number.isInteger(cantidadSolicitada) || cantidadSolicitada < 1) {
        return { exito: false, mensaje: "La cantidad debe ser un número entero mayor o igual a 1." };
    }

    const stock = Number(producto.stock);

    if (!Number.isInteger(stock) || stock <= 0) {
        return { exito: false, mensaje: "Este producto no tiene stock disponible." };
    }

    const carrito = obtenerCarrito();
    const item = carrito.find(function (elemento) {
        return elemento.codigo === codigo;
    });

    const cantidadActual = item ? Number(item.cantidad || 0) : 0;
    const nuevaCantidad = cantidadActual + cantidadSolicitada;

    if (nuevaCantidad > stock) {
        return {
            exito: false,
            mensaje: "No puedes superar el stock disponible. Máximo: " + stock + "."
        };
    }

    if (item) {
        item.cantidad = nuevaCantidad;
    } else {
        carrito.push({
            codigo: codigo,
            cantidad: cantidadSolicitada
        });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    actualizarPanelCarrito();
    mostrarAvisoCarrito("✓ " + producto.nombre + " agregado al carrito.");

    return { exito: true, mensaje: "Producto agregado al carrito." };
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;

    const total = obtenerCarrito().reduce(function (suma, item) {
        const cantidad = Number(item.cantidad || 0);
        return suma + (Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 0);
    }, 0);

    contador.textContent = total;
}

function obtenerDatosResumenCarrito() {
    const carrito = obtenerCarrito();
    const catalogo = obtenerCatalogoParaResumen();
    let total = 0;
    let cantidadTotal = 0;
    const productos = [];

    carrito.forEach(function (item) {
        const producto = catalogo.find(function (elemento) {
            return elemento.codigo === item.codigo;
        });

        if (!producto) return;

        const cantidad = Number(item.cantidad || 0);
        const subtotal = Number(producto.precio || 0) * cantidad;

        total += subtotal;
        cantidadTotal += cantidad;
        productos.push({
            producto: producto,
            cantidad: cantidad,
            subtotal: subtotal
        });
    });

    return {
        productos: productos,
        total: total,
        cantidadTotal: cantidadTotal
    };
}

function crearPanelCarrito() {
    const botonCarrito = document.querySelector(".boton-carrito");
    if (!botonCarrito) return;

    let panel = document.getElementById("panel-carrito-header");

    if (!panel) {
        panel = document.createElement("div");
        panel.id = "panel-carrito-header";
        panel.className = "panel-carrito-header";
        panel.hidden = true;
        panel.setAttribute("role", "dialog");
        panel.setAttribute("aria-label", "Resumen del carrito");
        document.body.appendChild(panel);
    }

    // Evita registrar dos veces el mismo evento si la función se vuelve a llamar.
    if (botonCarrito.dataset.carritoConfigurado !== "true") {
        botonCarrito.dataset.carritoConfigurado = "true";
        botonCarrito.addEventListener("click", function (evento) {
            evento.preventDefault();
            evento.stopPropagation();
            alternarPanelCarrito();
        });
    }

    botonCarrito.setAttribute("aria-expanded", panel.hidden ? "false" : "true");
    botonCarrito.setAttribute("aria-haspopup", "dialog");
    posicionarPanelCarrito();
}

function posicionarPanelCarrito() {
    const panel = document.getElementById("panel-carrito-header");
    const boton = document.querySelector(".boton-carrito");

    if (!panel || !boton) return;

    const rect = boton.getBoundingClientRect();
    const ancho = Math.min(390, window.innerWidth - 20);
    const margen = 10;
    let left = rect.right - ancho;

    if (left < margen) left = margen;
    if (left + ancho > window.innerWidth - margen) {
        left = window.innerWidth - ancho - margen;
    }

    panel.style.width = ancho + "px";
    panel.style.left = left + "px";
    panel.style.top = Math.max(10, rect.bottom + 10) + "px";
}

function alternarPanelCarrito() {
    const panel = document.getElementById("panel-carrito-header");
    const boton = document.querySelector(".boton-carrito");

    if (!panel || !boton) return;

    if (panel.hidden) {
        actualizarPanelCarrito();
        posicionarPanelCarrito();
        panel.hidden = false;
        boton.setAttribute("aria-expanded", "true");
    } else {
        cerrarPanelCarrito();
    }
}

function cerrarPanelCarrito() {
    const panel = document.getElementById("panel-carrito-header");
    const boton = document.querySelector(".boton-carrito");

    if (panel) panel.hidden = true;
    if (boton) boton.setAttribute("aria-expanded", "false");
}

function actualizarPanelCarrito() {
    const panel = document.getElementById("panel-carrito-header");
    if (!panel) return;

    const datos = obtenerDatosResumenCarrito();

    if (datos.productos.length === 0) {
        panel.innerHTML = `
            <div class="panel-carrito-cabecera">
                <div><strong>Tu carrito</strong><span>0 productos</span></div>
                <button type="button" class="panel-carrito-cerrar" aria-label="Cerrar">×</button>
            </div>
            <div class="panel-carrito-vacio">
                <span class="panel-carrito-icono" aria-hidden="true">🛒</span>
                <strong>Tu carrito está vacío</strong>
                <p>Agrega tus zapatillas favoritas y aparecerán aquí.</p>
                <a href="productos.html" class="panel-carrito-accion-secundaria">Ver productos</a>
            </div>`;
    } else {
        const filas = datos.productos.map(function (item) {
            return `
                <article class="panel-carrito-item">
                    <img src="${obtenerImagenCarrito(item.producto)}" alt="${item.producto.nombre}" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';">
                    <div class="panel-carrito-item-info">
                        <strong>${item.producto.nombre}</strong>
                        <span>${item.cantidad} × ${formatearPrecioCarrito(item.producto.precio)}</span>
                    </div>
                    <strong class="panel-carrito-subtotal">${formatearPrecioCarrito(item.subtotal)}</strong>
                </article>`;
        }).join("");

        panel.innerHTML = `
            <div class="panel-carrito-cabecera">
                <div><strong>Tu carrito</strong><span>${datos.cantidadTotal} ${datos.cantidadTotal === 1 ? "producto" : "productos"}</span></div>
                <button type="button" class="panel-carrito-cerrar" aria-label="Cerrar">×</button>
            </div>
            <div class="panel-carrito-lista">${filas}</div>
            <div class="panel-carrito-total"><span>Total</span><strong>${formatearPrecioCarrito(datos.total)}</strong></div>
            <div class="panel-carrito-acciones">
                <a href="productos.html" class="panel-carrito-ver">Seguir comprando</a>
                <a href="carrito.html" class="panel-carrito-continuar">Ver carrito →</a>
            </div>`;
    }

    const cerrar = panel.querySelector(".panel-carrito-cerrar");
    if (cerrar) cerrar.addEventListener("click", cerrarPanelCarrito);
}

function mostrarAvisoCarrito(mensaje) {
    let aviso = document.getElementById("aviso-carrito");

    if (!aviso) {
        aviso = document.createElement("div");
        aviso.id = "aviso-carrito";
        aviso.className = "aviso-carrito";
        document.body.appendChild(aviso);
    }

    aviso.textContent = mensaje;
    aviso.classList.add("visible");

    clearTimeout(window.novaAvisoCarrito);
    window.novaAvisoCarrito = setTimeout(function () {
        aviso.classList.remove("visible");
    }, 2200);
}

function configurarBotonesAgregarCarrito() {
    // Delegación como respaldo para botones generados dinámicamente.
    if (document.documentElement.dataset.carritoDelegado === "true") return;
    document.documentElement.dataset.carritoDelegado = "true";

    document.addEventListener("click", function (evento) {
        const boton = evento.target.closest ? evento.target.closest("[data-agregar-carrito]") : null;
        if (!boton) return;

        // Los botones que ya tienen listener directo marcan este atributo.
        if (boton.dataset.carritoDirecto === "true") return;

        evento.preventDefault();
        evento.stopPropagation();

        const codigo = boton.getAttribute("data-agregar-carrito");
        const resultado = agregarAlCarrito(codigo, 1);

        if (!resultado.exito) mostrarAvisoCarrito(resultado.mensaje);
    }, true);
}

// Exponemos las funciones para que productos.js, inicio.js y detalle.js
// puedan utilizar exactamente la misma lógica.
window.agregarAlCarrito = agregarAlCarrito;
window.actualizarContadorCarrito = actualizarContadorCarrito;
window.mostrarAvisoCarrito = mostrarAvisoCarrito;
window.actualizarPanelCarrito = actualizarPanelCarrito;
window.obtenerCarrito = obtenerCarrito;
window.guardarCarrito = guardarCarrito;

function inicializarCarrito() {
    actualizarContadorCarrito();
    crearPanelCarrito();
    configurarBotonesAgregarCarrito();
    actualizarPanelCarrito();
    posicionarPanelCarrito();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarCarrito, { once: true });
} else {
    inicializarCarrito();
}

window.addEventListener("resize", posicionarPanelCarrito);
window.addEventListener("scroll", posicionarPanelCarrito, { passive: true });

// Si otra pestaña modifica el carrito, esta pestaña se actualiza.
window.addEventListener("storage", function () {
    actualizarContadorCarrito();
    actualizarPanelCarrito();
});

document.addEventListener("click", function (evento) {
    const panel = document.getElementById("panel-carrito-header");
    const boton = document.querySelector(".boton-carrito");

    if (!panel || panel.hidden) return;

    if (!panel.contains(evento.target) && (!boton || !boton.contains(evento.target))) {
        cerrarPanelCarrito();
    }
});

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") cerrarPanelCarrito();
});
