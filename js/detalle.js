// ==============================
// NOVA SNEAKERS - DETALLE MODERNO
// ==============================

function obtenerCodigoProducto() {
    return new URLSearchParams(window.location.search).get("codigo");
}

function obtenerGaleriaProducto(producto) {
    const galeria = Array.isArray(producto.galeria) ? producto.galeria.filter(Boolean) : [];
    const imagenPrincipal = obtenerImagenProducto(producto);
    const resultado = galeria.length ? galeria.slice(0, 3) : [imagenPrincipal];

    // Si las vistas secundarias son SVG de la versión anterior, priorizamos
    // la fotografía principal para evitar mostrar ilustraciones de baja calidad.
    const seguras = resultado.map(function(ruta) {
        return ruta && ruta.toLowerCase().endsWith(".svg") ? imagenPrincipal : ruta;
    });

    while (seguras.length < 3) seguras.push(imagenPrincipal);
    return seguras.slice(0, 3);
}

function crearTallas(publico) {
    if (publico === "Niños") return [28, 29, 30, 31, 32, 33, 34];
    return [38, 39, 40, 41, 42, 43];
}

function mostrarDetalleProducto() {
    const contenedor = document.getElementById("detalle-producto");
    if (!contenedor) return;

    const codigo = obtenerCodigoProducto();
    const producto = buscarProducto(codigo);

    if (!producto) {
        contenedor.innerHTML = `<div class="mensaje"><h2>Producto no encontrado</h2><p>El producto que buscas no está disponible.</p><a href="productos.html" class="boton boton-principal">Volver a productos</a></div>`;
        return;
    }

    const agotado = Number(producto.stock) <= 0;
    const galeria = obtenerGaleriaProducto(producto);
    const tallas = crearTallas(producto.publico || "Unisex");
    const relacionados = productos.filter(function(item) {
        return item.codigo !== producto.codigo && (item.categoria === producto.categoria || item.publico === producto.publico);
    }).slice(0, 4);

    const migaPublico = document.getElementById("miga-publico");
    const migaCategoria = document.getElementById("miga-categoria");
    const migaProducto = document.getElementById("miga-producto");
    if (migaPublico) migaPublico.textContent = producto.publico || "Unisex";
    if (migaCategoria) migaCategoria.textContent = producto.categoria;
    if (migaProducto) migaProducto.textContent = producto.nombre;

    contenedor.innerHTML = `
        <div class="detalle-grid-ecommerce">
            <section class="galeria-ecommerce" aria-label="Galería de ${producto.nombre}">
                <div class="galeria-columna-mini" id="galeria-miniaturas"></div>
                <div class="galeria-principal-ecommerce">
                    <button type="button" class="galeria-flecha-ecommerce galeria-anterior" id="galeria-anterior" aria-label="Imagen anterior">‹</button>
                    <button type="button" class="imagen-principal-ecommerce" id="abrir-imagen-producto" aria-label="Ampliar imagen">
                        <img id="imagen-principal-producto" src="${galeria[0]}" alt="${producto.nombre} - vista 1" fetchpriority="high" onerror="this.onerror=null;this.src='${galeria[0]}';">
                        <span class="boton-ampliar-ecommerce">⛶ Ampliar</span>
                    </button>
                    <button type="button" class="galeria-flecha-ecommerce galeria-siguiente" id="galeria-siguiente" aria-label="Imagen siguiente">›</button>
                </div>
            </section>

            <section class="info-ecommerce">
                <div class="marca-detalle">NOVA <strong>SNEAKERS</strong></div>
                <div class="titulo-linea-detalle">
                    <h1>${producto.nombre}</h1>
                    <span class="codigo-ecommerce">Código: ${producto.codigo}</span>
                </div>
                <div class="valoracion-ecommerce" aria-label="Valoración 4,8 de 5"><span>★★★★★</span><strong>4.8</strong><small>(120 reseñas)</small></div>
                <p class="precio-ecommerce">${formatearPrecio(producto.precio)}</p>
                <p class="descripcion-ecommerce">${producto.descripcion} Comodidad, estilo y máximo rendimiento para acompañarte todos los días.</p>

                <div class="separador-ecommerce"></div>
                <div class="datos-ecommerce">
                    <p><strong>Categoría:</strong> ${producto.categoria}</p>
                    <p><strong>Colección:</strong> ${producto.publico || "Unisex"}</p>
                    <p><strong>Stock:</strong> ${agotado ? "Sin stock" : producto.stock + " unidad(es)"}</p>
                    <p><strong>Estado:</strong> <span class="estado-disponible">${agotado ? "Agotado" : "Disponible"}</span></p>
                </div>

                <div class="separador-ecommerce"></div>
                <div class="selectores-ecommerce">
                    <div class="selector-color"><strong>Color:</strong> <span>Color NOVA</span><div class="muestras-color"><button type="button" class="muestra-color activa" aria-label="Color seleccionado"></button><button type="button" class="muestra-color muestra-gris" aria-label="Color alternativo"></button><button type="button" class="muestra-color muestra-blanco" aria-label="Color alternativo"></button></div></div>
                    <div class="selector-talla"><div><strong>Talla:</strong> <span>Selecciona tu talla</span></div><div class="tallas-ecommerce" id="tallas-ecommerce">${tallas.map(function(talla, indice){return `<button type="button" class="boton-talla${indice===2?' activa':''}" data-talla="${talla}" aria-pressed="${indice===2?'true':'false'}">${talla}</button>`;}).join("")}</div><button type="button" class="guia-tallas" id="guia-tallas">⌁ Guía de tallas</button></div>
                </div>

                <div class="compra-ecommerce">
                    <div><strong>Cantidad</strong><div class="control-cantidad-ecommerce"><button type="button" id="menos-detalle" aria-label="Disminuir cantidad">−</button><output id="cantidad">1</output><button type="button" id="mas-detalle" aria-label="Aumentar cantidad">+</button></div></div>
                    <button type="button" class="boton-agregar-ecommerce" id="agregar-detalle" ${agotado ? "disabled" : ""}>🛒 ${agotado ? "Sin stock" : "Agregar al carrito"}</button>
                </div>
                <p id="mensaje-detalle" class="mensaje-formulario" role="status"></p>

                <div class="acciones-secundarias-ecommerce"><button type="button" class="accion-secundaria" data-favorito="${producto.codigo}" aria-pressed="false">♡ <span>Agregar a favoritos</span></button><button type="button" class="accion-secundaria" id="compartir-producto">↗ <span>Compartir</span></button></div>

                <div class="beneficios-ecommerce"><div><span>▣</span><strong>Envíos a todo Chile</strong><small>Rápido y seguro</small></div><div><span>◇</span><strong>Compra segura</strong><small>Tus datos protegidos</small></div><div><span>↻</span><strong>Cambios y devoluciones</strong><small>30 días de garantía</small></div></div>
            </section>
        </div>

        <section class="tabs-ecommerce" aria-label="Información del producto">
            <div class="tabs-cabecera"><button type="button" class="tab-ecommerce activa" data-tab="descripcion">Descripción</button><button type="button" class="tab-ecommerce" data-tab="caracteristicas">Características</button><button type="button" class="tab-ecommerce" data-tab="envio">Envío y devoluciones</button><button type="button" class="tab-ecommerce" data-tab="resenas">Reseñas (120)</button></div>
            <div class="contenido-tab-ecommerce activa" id="tab-descripcion">${producto.descripcion} La tecnología NOVA está pensada para entregar una pisada cómoda, un diseño moderno y una experiencia equilibrada para el uso diario.</div>
            <div class="contenido-tab-ecommerce" id="tab-caracteristicas"><ul><li>Diseño deportivo y urbano.</li><li>Suela de alto agarre.</li><li>Materiales seleccionados para uso diario.</li><li>Disponibilidad sujeta al stock indicado.</li></ul></div>
            <div class="contenido-tab-ecommerce" id="tab-envio">El despacho se simula dentro del proyecto. En checkout puedes seleccionar región y comuna antes de confirmar la compra.</div>
            <div class="contenido-tab-ecommerce" id="tab-resenas">Valoración demostrativa del catálogo: 4.8/5. Esta sección es informativa y no representa reseñas reales de clientes.</div>
        </section>

        <section class="relacionados-ecommerce"><div class="encabezado-relacionados"><h2>Productos relacionados</h2><a href="productos.html">Ver todos →</a></div><div class="grid-relacionados">${relacionados.map(function(item){return `<article class="tarjeta-relacionada"><a href="detalle.html?codigo=${encodeURIComponent(item.codigo)}" class="imagen-relacionada"><img src="${obtenerImagenProducto(item)}" alt="${item.nombre}" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';"><button type="button" class="favorito-relacionado" data-favorito="${item.codigo}" aria-label="Agregar ${item.nombre} a favoritos">♡</button></a><p>${item.nombre}</p><strong>${formatearPrecio(item.precio)}</strong></article>`;}).join("")}</div></section>

        <div class="modal-imagen-producto modal-ecommerce" id="modal-imagen-producto" hidden role="dialog" aria-modal="true" aria-label="Vista ampliada del producto"><button type="button" class="modal-cerrar-imagen" id="cerrar-modal-imagen" aria-label="Cerrar">×</button><img id="modal-imagen" src="${galeria[0]}" alt="${producto.nombre} ampliado"><div class="modal-controles"><button type="button" id="modal-anterior" aria-label="Anterior">‹</button><span id="modal-contador">1 / 3</span><button type="button" id="modal-siguiente" aria-label="Siguiente">›</button></div></div>
    `;

    let cantidad = 1;
    let indiceGaleria = 0;
    let tallaSeleccionada = String(tallas[2]);

    const imagenPrincipal = document.getElementById("imagen-principal-producto");
    const miniaturas = document.getElementById("galeria-miniaturas");
    const modal = document.getElementById("modal-imagen-producto");
    const modalImagen = document.getElementById("modal-imagen");
    const modalContador = document.getElementById("modal-contador");

    function actualizarCantidad(){
        document.getElementById("cantidad").textContent = cantidad;
        document.getElementById("menos-detalle").disabled = cantidad <= 1;
        document.getElementById("mas-detalle").disabled = cantidad >= Number(producto.stock);
    }
    function actualizarGaleria(){
        const ruta = galeria[indiceGaleria];
        imagenPrincipal.src = ruta;
        imagenPrincipal.alt = producto.nombre + " - vista " + (indiceGaleria+1);
        modalImagen.src = ruta;
        modalImagen.alt = producto.nombre + " ampliado - vista " + (indiceGaleria+1);
        modalContador.textContent = (indiceGaleria+1) + " / 3";
        document.querySelectorAll(".miniatura-ecommerce").forEach(function(btn, i){btn.classList.toggle("activa", i===indiceGaleria);});
    }
    function cambiarImagen(direccion){indiceGaleria=(indiceGaleria+direccion+galeria.length)%galeria.length;actualizarGaleria();}

    galeria.forEach(function(ruta, indice){
        const boton=document.createElement("button"); boton.type="button"; boton.className="miniatura-ecommerce"+(indice===0?" activa":""); boton.setAttribute("aria-label","Ver vista "+(indice+1)); boton.innerHTML=`<img src="${ruta}" alt="${producto.nombre} miniatura ${indice+1}" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg'">`; boton.addEventListener("click",function(){indiceGaleria=indice;actualizarGaleria();}); miniaturas.appendChild(boton);
    });

    document.getElementById("galeria-anterior").addEventListener("click",function(){cambiarImagen(-1);});
    document.getElementById("galeria-siguiente").addEventListener("click",function(){cambiarImagen(1);});
    document.getElementById("menos-detalle").addEventListener("click",function(){if(cantidad>1){cantidad--;actualizarCantidad();}});
    document.getElementById("mas-detalle").addEventListener("click",function(){if(cantidad<Number(producto.stock)){cantidad++;actualizarCantidad();}});

    document.querySelectorAll(".boton-talla").forEach(function(boton){boton.addEventListener("click",function(){tallaSeleccionada=boton.dataset.talla;document.querySelectorAll(".boton-talla").forEach(function(b){b.classList.remove("activa");b.setAttribute("aria-pressed","false");});boton.classList.add("activa");boton.setAttribute("aria-pressed","true");});});
    document.querySelectorAll(".muestra-color").forEach(function(boton){boton.addEventListener("click",function(){document.querySelectorAll(".muestra-color").forEach(function(b){b.classList.remove("activa");});boton.classList.add("activa");});});
    document.getElementById("guia-tallas").addEventListener("click",function(){window.alert("Guía de tallas NOVA: elige tu talla habitual. Para una compra real, esta guía se conectaría con las medidas de cada modelo.");});

    document.getElementById("agregar-detalle").addEventListener("click",function(){
        const resultado=window.agregarAlCarrito(producto.codigo,cantidad);
        const mensaje=document.getElementById("mensaje-detalle");
        mensaje.textContent=resultado.exito ? resultado.mensaje + " Talla seleccionada: " + tallaSeleccionada + "." : resultado.mensaje;
        mensaje.classList.toggle("mensaje-exito",resultado.exito); mensaje.classList.toggle("mensaje-error",!resultado.exito);
    });

    document.getElementById("compartir-producto").addEventListener("click",async function(){
        try { await navigator.clipboard.writeText(window.location.href); mostrarAvisoCarrito("✓ Enlace del producto copiado."); }
        catch(error){ mostrarAvisoCarrito("Copia la dirección de esta página para compartirla."); }
    });

    document.querySelectorAll(".tab-ecommerce").forEach(function(tab){tab.addEventListener("click",function(){const nombre=tab.dataset.tab;document.querySelectorAll(".tab-ecommerce").forEach(function(t){t.classList.remove("activa");});document.querySelectorAll(".contenido-tab-ecommerce").forEach(function(c){c.classList.remove("activa");});tab.classList.add("activa");document.getElementById("tab-"+nombre).classList.add("activa");});});

    function abrirModal(){modal.hidden=false;document.body.classList.add("modal-abierto");document.getElementById("cerrar-modal-imagen").focus();}
    function cerrarModal(){modal.hidden=true;document.body.classList.remove("modal-abierto");document.getElementById("abrir-imagen-producto").focus();}
    document.getElementById("abrir-imagen-producto").addEventListener("click",abrirModal);
    document.getElementById("cerrar-modal-imagen").addEventListener("click",cerrarModal);
    document.getElementById("modal-anterior").addEventListener("click",function(){cambiarImagen(-1);});
    document.getElementById("modal-siguiente").addEventListener("click",function(){cambiarImagen(1);});
    modal.addEventListener("click",function(e){if(e.target===modal)cerrarModal();});
    document.addEventListener("keydown",function(e){if(!modal.hidden){if(e.key==="Escape")cerrarModal();if(e.key==="ArrowLeft")cambiarImagen(-1);if(e.key==="ArrowRight")cambiarImagen(1);}});

    actualizarCantidad(); actualizarGaleria();
    if(typeof actualizarBotonesFavoritos === "function") actualizarBotonesFavoritos();
}

document.addEventListener("DOMContentLoaded",mostrarDetalleProducto);
