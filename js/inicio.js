// ==============================
// NOVA SNEAKERS - INICIO
// ==============================

function mostrarProductosDestacados() {
    const contenedor = document.getElementById("productos-destacados");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.slice(0, 4).forEach(function(producto) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "home-ref-producto";

        tarjeta.innerHTML = `
            <a href="detalle.html?codigo=${encodeURIComponent(producto.codigo)}" class="home-ref-producto-imagen">
                <span class="home-ref-categoria">${producto.categoria}</span>
                <img src="${obtenerImagenProducto(producto)}" alt="${producto.nombre}" loading="lazy" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';">
            </a>
            <div class="home-ref-producto-info">
                <a href="detalle.html?codigo=${encodeURIComponent(producto.codigo)}" class="home-ref-producto-nombre">${producto.nombre}</a>
                <p class="home-ref-producto-precio">${formatearPrecio(producto.precio)}</p>
                <p class="home-ref-producto-stock ${producto.stock === 0 ? "sin-stock" : ""}">${producto.stock === 0 ? "Sin stock" : "Stock disponible: " + producto.stock}</p>
                <div class="home-ref-acciones">
                    <button type="button" class="home-ref-add" data-agregar-carrito="${producto.codigo}" ${producto.stock === 0 ? "disabled" : ""}>
                        <span aria-hidden="true">🛒</span> ${producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                    </button>
                    <button type="button" class="boton-favorito" data-favorito="${producto.codigo}" aria-pressed="false">♡</button>
                </div>
            </div>
        `;

        const botonAgregar = tarjeta.querySelector("[data-agregar-carrito]");
        if (botonAgregar) {
            botonAgregar.dataset.carritoDirecto = "true";
            botonAgregar.addEventListener("click", function(evento) {
                evento.preventDefault();
                evento.stopPropagation();
                if (typeof window.agregarAlCarrito !== "function") {
                    console.error("NOVA SNEAKERS: la función del carrito no está disponible.");
                    return;
                }
                const resultado = window.agregarAlCarrito(producto.codigo, 1);
                if (!resultado.exito && typeof window.mostrarAvisoCarrito === "function") {
                    window.mostrarAvisoCarrito(resultado.mensaje);
                }
            });
        }

        contenedor.appendChild(tarjeta);
    });
}

document.addEventListener("DOMContentLoaded", mostrarProductosDestacados);


document.addEventListener("DOMContentLoaded",function(){
    const form=document.querySelector(".community-form");
    const input=document.getElementById("correo-comunidad");
    if(!form||!input) return;
    form.addEventListener("submit",function(e){
        e.preventDefault();
        const correo=input.value.trim().toLowerCase();
        if(!correo || !correo.includes("@")){ mostrarAvisoCarrito("Ingresa un correo válido para suscribirte."); return; }
        const lista=JSON.parse(localStorage.getItem("novaSneakersSuscriptores")||"[]");
        if(!lista.includes(correo)) lista.push(correo);
        localStorage.setItem("novaSneakersSuscriptores",JSON.stringify(lista));
        input.value="";
        mostrarAvisoCarrito("¡Suscripción registrada correctamente!");
    });
});
