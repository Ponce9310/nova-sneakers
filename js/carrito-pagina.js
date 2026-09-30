// NOVA SNEAKERS - PAGINA DE CARRITO
function mostrarCarrito(){
    const contenedor=document.getElementById("contenido-carrito"); if(!contenedor) return;
    const carrito=obtenerCarrito();
    const items=carrito.map(function(item){const producto=buscarProducto(item.codigo);return producto?{item,producto}:null;}).filter(Boolean);
    if(!items.length){
        contenedor.innerHTML='<div class="carrito-vacio"><h2>Tu carrito está vacío</h2><p>Agrega productos desde nuestro catálogo para comenzar.</p><a href="productos.html" class="boton boton-principal">Ver productos</a></div>'; return;
    }
    let total=0;
    const filas=items.map(function(ref){
        const p=ref.producto, cantidad=Number(ref.item.cantidad), subtotal=p.precio*cantidad; total+=subtotal;
        return `<article class="item-carrito">
            <a href="detalle.html?codigo=${encodeURIComponent(p.codigo)}"><img src="${obtenerImagenProducto(p)}" alt="${p.nombre}" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';"></a>
            <div class="info-item-carrito"><p class="categoria-producto">${p.categoria}</p><h3>${p.nombre}</h3><p>${formatearPrecio(p.precio)} por unidad</p><small>${p.stock<=p.stockCritico && p.stock>0?'⚠ Stock crítico':''}</small></div>
            <div class="cantidad-carrito"><label>Cantidad</label><div class="control-cantidad"><button type="button" data-cantidad="menos" data-codigo="${p.codigo}" aria-label="Disminuir cantidad">−</button><output>${cantidad}</output><button type="button" data-cantidad="mas" data-codigo="${p.codigo}" aria-label="Aumentar cantidad" ${cantidad>=p.stock?'disabled':''}>+</button></div><small>Máximo ${p.stock}</small></div>
            <div class="subtotal-carrito"><strong>${formatearPrecio(subtotal)}</strong><button type="button" class="boton-eliminar" data-eliminar-carrito="${p.codigo}">Eliminar</button></div>
        </article>`;
    }).join("");
    contenedor.innerHTML=`<div class="lista-carrito">${filas}</div><div class="resumen-carrito"><div><span>Productos</span><strong>${items.reduce((s,x)=>s+Number(x.item.cantidad),0)}</strong></div><div><span>Subtotal</span><strong>${formatearPrecio(total)}</strong></div><div><span>Despacho</span><strong>Se calcula en checkout</strong></div><div class="total-final"><span>Total</span><strong>${formatearPrecio(total)}</strong></div><a class="boton boton-principal" href="checkout.html">Continuar compra</a><a href="productos.html" class="enlace">← Seguir comprando</a></div>`;
}
function actualizarCantidadCarrito(codigo,delta){
    const carrito=obtenerCarrito(), item=carrito.find(i=>i.codigo===codigo), producto=buscarProducto(codigo); if(!item||!producto) return;
    const nueva=Number(item.cantidad)+delta;
    if(nueva<1){eliminarDelCarrito(codigo);return;}
    if(nueva>Number(producto.stock)){mostrarAvisoCarrito("No puedes superar el stock disponible.");return;}
    item.cantidad=nueva; guardarCarrito(carrito); actualizarContadorCarrito(); mostrarCarrito();
}
function eliminarDelCarrito(codigo){
    const producto=buscarProducto(codigo); if(!producto) return;
    const confirmar=window.confirm("¿Quieres eliminar "+producto.nombre+" del carrito?"); if(!confirmar) return;
    guardarCarrito(obtenerCarrito().filter(i=>i.codigo!==codigo)); actualizarContadorCarrito(); mostrarCarrito();
}
document.addEventListener("DOMContentLoaded",function(){
    mostrarCarrito();
    const cont=document.getElementById("contenido-carrito"); if(!cont) return;
    cont.addEventListener("click",function(e){
        const cantidad=e.target.closest("[data-cantidad]"); const eliminar=e.target.closest("[data-eliminar-carrito]");
        if(cantidad) actualizarCantidadCarrito(cantidad.dataset.codigo,cantidad.dataset.cantidad==="mas"?1:-1);
        if(eliminar) eliminarDelCarrito(eliminar.dataset.eliminarCarrito);
    });
});
