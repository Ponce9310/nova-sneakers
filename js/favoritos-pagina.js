// NOVA SNEAKERS - PAGINA DE FAVORITOS
function renderizarFavoritos(){
    const contenedor=document.getElementById("lista-favoritos");
    if(!contenedor || typeof productos === "undefined") return;
    const codigos=obtenerFavoritos();
    const lista=codigos.map(function(codigo){return buscarProducto(codigo);}).filter(Boolean);
    if(!lista.length){
        contenedor.innerHTML='<div class="carrito-vacio"><h2>No tienes favoritos guardados</h2><p>Guarda una zapatilla con el corazón para encontrarla rápidamente aquí.</p><a href="productos.html" class="boton boton-principal">Explorar productos</a></div>';
        return;
    }
    contenedor.innerHTML=lista.map(function(producto){
        return `<article class="tarjeta-favorito">
            <a href="detalle.html?codigo=${encodeURIComponent(producto.codigo)}" class="favorito-imagen"><img src="${obtenerImagenProducto(producto)}" alt="${producto.nombre}" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';"></a>
            <div class="favorito-info"><p class="categoria-producto">${producto.categoria}</p><h2>${producto.nombre}</h2><strong>${formatearPrecio(producto.precio)}</strong><p>${producto.stock>0?"Stock disponible":"Sin stock"}</p>
            <div class="favorito-acciones"><a class="boton boton-secundario" href="detalle.html?codigo=${encodeURIComponent(producto.codigo)}">Ver detalle</a><button type="button" class="boton boton-principal" data-agregar-carrito="${producto.codigo}" ${producto.stock===0?'disabled':''}>${producto.stock===0?'Sin stock':'Agregar al carrito'}</button><button type="button" class="boton boton-secundario" data-favorito="${producto.codigo}" aria-pressed="true">♥</button></div></div>
        </article>`;
    }).join("");
    actualizarBotonesFavoritos();

    contenedor.querySelectorAll("[data-agregar-carrito]").forEach(function(boton) {
        boton.dataset.carritoDirecto = "true";
        boton.addEventListener("click", function(evento) {
            evento.preventDefault();
            evento.stopPropagation();
            const resultado = window.agregarAlCarrito(boton.dataset.agregarCarrito, 1);
            if (!resultado.exito && typeof window.mostrarAvisoCarrito === "function") {
                window.mostrarAvisoCarrito(resultado.mensaje);
            }
        });
    });
}

document.addEventListener("DOMContentLoaded",renderizarFavoritos);
