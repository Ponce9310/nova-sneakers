// NOVA SNEAKERS - CHECKOUT FRONTEND SIMULADO
function checkoutPrecio(valor){ return Number(valor).toLocaleString("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}); }
function obtenerResumenCheckout(){
    const carrito=typeof obtenerCarrito === "function" ? obtenerCarrito() : [];
    return carrito.map(function(item){
        const producto=typeof buscarProducto === "function" ? buscarProducto(item.codigo) : null;
        if(!producto) return null;
        return {codigo:item.codigo,nombre:producto.nombre,precio:Number(producto.precio),cantidad:Number(item.cantidad),imagen:obtenerImagenProducto(producto)};
    }).filter(Boolean);
}
function renderizarResumenCheckout(){
    const lista=document.getElementById("resumen-checkout");
    const totalEl=document.getElementById("total-checkout");
    if(!lista || !totalEl) return;
    const items=obtenerResumenCheckout();
    if(!items.length){ window.location.href="carrito.html"; return; }
    const total=items.reduce((s,i)=>s+i.precio*i.cantidad,0);
    lista.innerHTML=items.map(i=>`<div class="checkout-item"><img src="${i.imagen}" alt="${i.nombre}" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';"><div><strong>${i.nombre}</strong><span>${i.cantidad} × ${checkoutPrecio(i.precio)}</span></div><strong>${checkoutPrecio(i.precio*i.cantidad)}</strong></div>`).join("");
    totalEl.textContent=checkoutPrecio(total);
}
function prefijarDatosSesion(){
    if(typeof obtenerSesion !== "function") return;
    const sesion=obtenerSesion();
    if(!sesion) return;
    const mapa={nombre:sesion.nombre+" "+sesion.apellidos,correo:sesion.correo,direccion:sesion.direccion||"",region:sesion.region||"",comuna:sesion.comuna||""};
    Object.keys(mapa).forEach(function(id){const campo=document.getElementById(id);if(campo && !campo.value) campo.value=mapa[id];});
}
function validarCheckout(){
    const ids=["nombre","correo","region","comuna","direccion","metodo-pago"];
    let valido=true;
    ids.forEach(function(id){
        const campo=document.getElementById(id); if(!campo) return;
        const error=document.getElementById(id+"-error");
        if(!campo.value.trim()) { if(error) error.textContent="Este campo es obligatorio."; campo.classList.add("campo-invalido"); valido=false; }
        else { if(error) error.textContent=""; campo.classList.remove("campo-invalido"); }
    });
    const correo=document.getElementById("correo");
    if(correo && correo.value && typeof correoValido === "function" && !correoValido(correo.value.trim())){
        const error=document.getElementById("correo-error"); if(error) error.textContent="Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com."; correo.classList.add("campo-invalido"); valido=false;
    }
    const terminos=document.getElementById("terminos");
    if(terminos && !terminos.checked){ document.getElementById("terminos-error").textContent="Debes aceptar las condiciones de la compra simulada."; valido=false; }
    else if(terminos) document.getElementById("terminos-error").textContent="";
    return valido;
}
function crearPedidoCheckout(){
    const items=obtenerResumenCheckout();
    const total=items.reduce((s,i)=>s+i.precio*i.cantidad,0);
    const sesion=typeof obtenerSesion === "function" ? obtenerSesion() : null;
    const pedidos=typeof obtenerPedidos === "function" ? obtenerPedidos() : [];
    const numero="PED-"+String(Date.now()).slice(-8);
    const pedido={
        numero:numero, fecha:new Date().toLocaleDateString("es-CL"), cliente:document.getElementById("nombre").value.trim(), correo:document.getElementById("correo").value.trim().toLowerCase(),
        estado:"Pendiente", total:total, metodoPago:document.getElementById("metodo-pago").value, direccion:document.getElementById("direccion").value.trim(), region:document.getElementById("region").value, comuna:document.getElementById("comuna").value, productos:items.map(i=>({codigo:i.codigo,nombre:i.nombre,cantidad:i.cantidad,precio:i.precio}))
    };
    pedidos.push(pedido);
    localStorage.setItem("novaSneakersPedidos",JSON.stringify(pedidos));
    // Descuenta stock porque la compra fue confirmada dentro de la simulación.
    if(typeof productos !== "undefined" && typeof guardarProductos === "function"){
        productos.forEach(function(producto){const item=items.find(i=>i.codigo===producto.codigo);if(item) producto.stock=Math.max(0,Number(producto.stock)-item.cantidad);});
        guardarProductos(productos);
    }
    localStorage.setItem("novaSneakersCarrito","[]");
    localStorage.setItem("novaSneakersUltimoPedido",JSON.stringify(pedido));
    return pedido;
}
function mostrarConfirmacionPedido(pedido){
    document.getElementById("formulario-checkout").classList.add("oculto");
    document.getElementById("checkout-resumen-box").classList.add("oculto");
    const exito=document.getElementById("confirmacion-checkout");
    exito.classList.remove("oculto");
    exito.innerHTML=`<div class="confirmacion-icono">✓</div><p class="etiqueta">COMPRA SIMULADA CONFIRMADA</p><h2>Gracias por tu compra</h2><p>Tu pedido <strong>${pedido.numero}</strong> fue registrado correctamente.</p><div class="confirmacion-datos"><span>Total</span><strong>${checkoutPrecio(pedido.total)}</strong><span>Estado</span><strong>${pedido.estado}</strong></div><p class="texto-ayuda">Esta demostración no realiza un cobro real. El pedido quedó disponible para consulta en el panel administrativo.</p><div class="acciones-checkout"><a class="boton boton-principal" href="cuenta.html">Ver mis pedidos</a><a class="boton boton-secundario" href="productos.html">Seguir comprando</a></div>`;
    if(typeof actualizarContadorCarrito === "function") actualizarContadorCarrito();
}

function configurarDespachoCheckout() {
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");

    if (!region || !comuna) {
        return;
    }

    // La comuna depende de la región seleccionada.
    region.addEventListener("change", function() {
        actualizarComunas();

        // Al cambiar de región, siempre se debe elegir nuevamente una comuna.
        if (!region.value) {
            comuna.disabled = true;
        } else {
            comuna.disabled = false;
        }
    });

    // Al cargar el checkout, la comuna queda deshabilitada hasta conocer la región.
    comuna.disabled = true;
}

document.addEventListener("DOMContentLoaded",function(){
    const form=document.getElementById("formulario-checkout");
    if(!form) return;

    const sesionActual = typeof obtenerSesion === "function" ? obtenerSesion() : null;
    if(!sesionActual || sesionActual.tipo !== "Cliente") {
        window.location.href = "login.html?retorno=checkout";
        return;
    }

    prefijarDatosSesion();
    renderizarResumenCheckout();

    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const sesion = typeof obtenerSesion === "function" ? obtenerSesion() : null;

    if(typeof cargarRegiones === "function" && region && comuna) {
        // Primero cargamos las regiones. Después seleccionamos la región guardada,
        // y recién entonces generamos sus comunas.
        cargarRegiones();
        configurarDespachoCheckout();

        if(sesion && sesion.region) {
            region.value = sesion.region;
            actualizarComunas();
            comuna.disabled = false;

            if(sesion.comuna) {
                comuna.value = sesion.comuna;
            }
        } else {
            // Si no hay región seleccionada, mostramos el mensaje inicial.
            comuna.innerHTML = '<option value="">Selecciona una comuna</option>';
            comuna.disabled = true;
        }
    }

    form.addEventListener("submit",function(e){
        e.preventDefault();

        if(!validarCheckout()) {
            document.getElementById("mensaje-checkout").textContent="Revisa los campos marcados antes de confirmar.";
            return;
        }

        const stockActual=obtenerResumenCheckout().every(function(item){
            const producto=buscarProducto(item.codigo);
            return producto && Number(item.cantidad) <= Number(producto.stock);
        });

        if(!stockActual){
            document.getElementById("mensaje-checkout").textContent="El stock cambió. Regresa al carrito y revisa las cantidades antes de confirmar.";
            return;
        }

        const pedido=crearPedidoCheckout();
        mostrarConfirmacionPedido(pedido);
    });
});
