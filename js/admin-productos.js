// ==============================
// NOVA SNEAKERS - GESTIÓN DE PRODUCTOS
// ==============================

let codigoProductoEditando = null;
let rolActualProductos = "";

function iniciarGestionProductos(sesion) {
    rolActualProductos = sesion.tipo;
    configurarMenuAdmin(sesion, "productos");
    document.getElementById("formulario-producto").addEventListener("submit", guardarProductoDesdeFormulario);
    document.getElementById("boton-cancelar-producto").addEventListener("click", cancelarEdicionProducto);
    document.getElementById("buscar-producto-admin").addEventListener("input", aplicarFiltrosProductosAdmin);
    document.getElementById("filtro-categoria-admin").addEventListener("change", aplicarFiltrosProductosAdmin);
    document.getElementById("tabla-productos-admin").addEventListener("click", function(evento) {
        const botonEditar = evento.target.closest(".boton-editar-producto");
        const botonEliminar = evento.target.closest(".boton-eliminar-producto");

        if (botonEditar) {
            editarProducto(botonEditar.dataset.codigo);
        }

        if (botonEliminar) {
            eliminarProducto(botonEliminar.dataset.codigo);
        }
    });

    cargarCategoriasProducto();
    renderizarProductosAdmin();
}

function cargarCategoriasProducto() {
    const select = document.getElementById("categoria");
    const filtro = document.getElementById("filtro-categoria-admin");
    const categorias = ["Running", "Urbanas", "Basketball", "Training"];

    categorias.forEach(function(categoria) {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        select.appendChild(opcion);

        const opcionFiltro = opcion.cloneNode(true);
        filtro.appendChild(opcionFiltro);
    });
}

function limpiarErroresProducto() {
    ["codigo", "nombre-producto", "descripcion-producto", "precio", "stock", "stockCritico", "categoria", "publico", "imagen"].forEach(function(id) {
        mostrarError(id, "");
    });
}

function validarFormularioProducto() {
    limpiarErroresProducto();
    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const nombre = document.getElementById("nombre-producto").value.trim();
    const descripcion = document.getElementById("descripcion-producto").value.trim();
    const precio = Number(document.getElementById("precio").value);
    const stock = Number(document.getElementById("stock").value);
    const stockCriticoTexto = document.getElementById("stockCritico").value.trim();
    const stockCritico = stockCriticoTexto === "" ? null : Number(stockCriticoTexto);
    const categoria = document.getElementById("categoria").value;
    const publico = document.getElementById("publico").value;
    const imagen = document.getElementById("imagen").value.trim();
    const productosActuales = productos;

    const errores = [];

    if (codigo.length < 3) {
        const mensaje = "El código es obligatorio y debe tener al menos 3 caracteres.";
        errores.push(mensaje); mostrarError("codigo", mensaje);
    }
    if (nombre.length === 0 || nombre.length > 100) {
        const mensaje = "El nombre es obligatorio y no puede superar 100 caracteres.";
        errores.push(mensaje); mostrarError("nombre-producto", mensaje);
    }
    if (descripcion.length > 500) {
        const mensaje = "La descripción no puede superar 500 caracteres.";
        errores.push(mensaje); mostrarError("descripcion-producto", mensaje);
    }
    if (!Number.isFinite(precio) || precio < 0) {
        const mensaje = "El precio debe ser un número mayor o igual a 0.";
        errores.push(mensaje); mostrarError("precio", mensaje);
    }
    if (!Number.isInteger(stock) || stock < 0) {
        const mensaje = "El stock debe ser un número entero mayor o igual a 0.";
        errores.push(mensaje); mostrarError("stock", mensaje);
    }
    if (stockCritico !== null && (!Number.isInteger(stockCritico) || stockCritico < 0)) {
        const mensaje = "El stock crítico debe ser un número entero mayor o igual a 0.";
        errores.push(mensaje); mostrarError("stockCritico", mensaje);
    }
    if (!categoria) {
        const mensaje = "Debes seleccionar una categoría.";
        errores.push(mensaje); mostrarError("categoria", mensaje);
    }
    if (!publico) {
        const mensaje = "Debes seleccionar una colección.";
        errores.push(mensaje); mostrarError("publico", mensaje);
    }

    const codigoDuplicado = productosActuales.some(function(producto) {
        return producto.codigo.toUpperCase() === codigo && producto.codigo !== codigoProductoEditando;
    });
    if (codigoDuplicado) {
        const mensaje = "Ya existe un producto con ese código.";
        errores.push(mensaje); mostrarError("codigo", mensaje);
    }

    const productoAnterior = productosActuales.find(function(producto) { return producto.codigo === codigoProductoEditando; });
    const galeria = productoAnterior && Array.isArray(productoAnterior.galeria) ? productoAnterior.galeria : (imagen ? [imagen, imagen, imagen] : []);
    return { errores, datos: { codigo, nombre, descripcion, precio, stock, stockCritico, categoria, publico, imagen, galeria } };
}

function guardarProductoDesdeFormulario(evento) {
    evento.preventDefault();

    if (rolActualProductos !== "Administrador") {
        mostrarMensajeAdmin("mensaje-producto", "Tu perfil de Vendedor solo puede consultar productos.", "error");
        return;
    }

    const resultado = validarFormularioProducto();

    if (resultado.errores.length > 0) {
        mostrarMensajeAdmin("mensaje-producto", resultado.errores.join(" "), "error");
        return;
    }

    if (codigoProductoEditando) {
        const indice = productos.findIndex(function(producto) {
            return producto.codigo === codigoProductoEditando;
        });
        productos[indice] = resultado.datos;
        guardarProductos(productos);
        mostrarMensajeAdmin("mensaje-producto", "Producto actualizado correctamente.", "exito");
    } else {
        productos.push(resultado.datos);
        guardarProductos(productos);
        mostrarMensajeAdmin("mensaje-producto", "Producto creado correctamente.", "exito");
    }

    limpiarFormularioProducto();
    renderizarProductosAdmin();
}

function eliminarProducto(codigo) {
    if (rolActualProductos !== "Administrador") {
        mostrarMensajeAdmin("mensaje-producto", "Solo el Administrador puede eliminar productos.", "error");
        return;
    }

    const producto = buscarProducto(codigo);
    if (!producto) {
        mostrarMensajeAdmin("mensaje-producto", "No se encontró el producto seleccionado.", "error");
        return;
    }

    const confirmar = window.confirm(
        "¿Estás seguro de eliminar \"" + producto.nombre + "\" (" + producto.codigo + ")?\n\nEsta acción eliminará el producto del catálogo. La operación no se puede deshacer desde este panel."
    );

    if (!confirmar) {
        return;
    }

    productos = productos.filter(function(item) {
        return item.codigo !== codigo;
    });
    guardarProductos(productos);

    // Evita que el carrito conserve una referencia a un producto eliminado.
    const carritoGuardado = localStorage.getItem("novaSneakersCarrito");
    if (carritoGuardado) {
        try {
            const carrito = JSON.parse(carritoGuardado);
            if (Array.isArray(carrito)) {
                const carritoActualizado = carrito.filter(function(item) {
                    return item.codigo !== codigo;
                });
                localStorage.setItem("novaSneakersCarrito", JSON.stringify(carritoActualizado));
            }
        } catch (error) {
            localStorage.removeItem("novaSneakersCarrito");
        }
    }

    if (codigoProductoEditando === codigo) {
        limpiarFormularioProducto();
    }

    mostrarMensajeAdmin("mensaje-producto", "Producto eliminado correctamente.", "exito");
    renderizarProductosAdmin();
}

function editarProducto(codigo) {
    if (rolActualProductos !== "Administrador") {
        mostrarMensajeAdmin("mensaje-producto", "Tu perfil de Vendedor solo puede consultar productos.", "error");
        return;
    }

    const producto = buscarProducto(codigo);
    if (!producto) return;

    codigoProductoEditando = producto.codigo;
    document.getElementById("codigo").value = producto.codigo;
    document.getElementById("codigo").readOnly = true;
    document.getElementById("nombre-producto").value = producto.nombre;
    document.getElementById("descripcion-producto").value = producto.descripcion || "";
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("stockCritico").value = producto.stockCritico ?? "";
    document.getElementById("categoria").value = producto.categoria;
    document.getElementById("publico").value = producto.publico || "Unisex";
    document.getElementById("imagen").value = producto.imagen || "";
    document.getElementById("titulo-formulario-producto").textContent = "Editar producto";
    document.getElementById("boton-guardar-producto").textContent = "Guardar cambios";
    document.getElementById("boton-cancelar-producto").classList.remove("oculto");
    document.getElementById("formulario-producto").scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelarEdicionProducto() {
    limpiarFormularioProducto();
    mostrarMensajeAdmin("mensaje-producto", "", "");
}

function limpiarFormularioProducto() {
    codigoProductoEditando = null;
    document.getElementById("formulario-producto").reset();
    document.getElementById("codigo").readOnly = false;
    document.getElementById("titulo-formulario-producto").textContent = "Nuevo producto";
    document.getElementById("boton-guardar-producto").textContent = "Crear producto";
    document.getElementById("boton-cancelar-producto").classList.add("oculto");
}

function aplicarFiltrosProductosAdmin() {
    renderizarProductosAdmin(
        document.getElementById("buscar-producto-admin").value.trim().toLowerCase(),
        document.getElementById("filtro-categoria-admin").value
    );
}

function rutaImagenAdmin(producto) {
    const imagen = obtenerImagenProducto(producto);
    if (/^(https?:|data:|\/)/i.test(imagen) || imagen.startsWith("../")) {
        return imagen;
    }
    return "../" + imagen;
}

function renderizarProductosAdmin(texto = "", categoria = "Todos") {
    const contenedor = document.getElementById("tabla-productos-admin");
    if (!contenedor) return;

    const filtrados = productos.filter(function(producto) {
        const coincideTexto = producto.codigo.toLowerCase().includes(texto) || producto.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria === "Todos" || producto.categoria === categoria;
        return coincideTexto && coincideCategoria;
    });

    document.getElementById("contador-productos-admin").textContent = filtrados.length + " producto(s)";

    if (filtrados.length === 0) {
        contenedor.innerHTML = '<div class="estado-vacio"><h3>No se encontraron productos</h3><p>Prueba con otro filtro.</p></div>';
        return;
    }

    contenedor.innerHTML = filtrados.map(function(producto) {
        const alerta = producto.stockCritico !== null && producto.stockCritico !== undefined && producto.stock <= producto.stockCritico;
        return `
            <article class="fila-admin">
                <div class="mini-producto">
                    <img src="${escaparHTML(rutaImagenAdmin(producto))}" alt="${escaparHTML(producto.nombre)}">
                    <div><strong>${escaparHTML(producto.nombre)}</strong><span>${escaparHTML(producto.codigo)}</span></div>
                </div>
                <div><strong>Categoría</strong><span>${escaparHTML(producto.categoria)} · ${escaparHTML(producto.publico || "Unisex")}</span></div>
                <div><strong>Precio</strong><span>${formatearPrecio(producto.precio)}</span></div>
                <div><strong>Stock</strong><span class="${alerta ? "stock-alerta" : ""}">${producto.stock}${alerta ? " · Stock crítico" : ""}</span></div>
                <div>
                    <a class="boton boton-secundario boton-pequeno" href="../detalle.html?codigo=${encodeURIComponent(producto.codigo)}">Ver</a>
                    ${rolActualProductos === "Administrador" ? `<button type="button" class="boton boton-principal boton-pequeno boton-editar-producto" data-codigo="${escaparHTML(producto.codigo)}">Editar</button><button type="button" class="boton boton-secundario boton-pequeno boton-eliminar-producto" data-codigo="${escaparHTML(producto.codigo)}">Eliminar</button>` : ""}
                </div>
            </article>
        `;
    }).join("");
}
