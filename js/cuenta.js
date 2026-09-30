// NOVA SNEAKERS - MI CUENTA
function renderizarCuenta(){
    const sesion=obtenerSesion();
    if(!sesion){ window.location.href="login.html"; return; }
    document.getElementById("nombre-cuenta").textContent=sesion.nombre+" "+sesion.apellidos;
    document.getElementById("correo-cuenta").textContent=sesion.correo;
    document.getElementById("rol-cuenta").textContent=sesion.tipo;
    document.getElementById("direccion-cuenta").textContent=(sesion.direccion||"Sin dirección registrada")+" · "+(sesion.comuna||"")+" · "+(sesion.region||"");
    const pedidos=obtenerPedidos().filter(function(p){return p.correo && p.correo.toLowerCase()===sesion.correo.toLowerCase();});
    const cont=document.getElementById("pedidos-cuenta");
    if(!pedidos.length){cont.innerHTML='<div class="estado-vacio"><h3>Aún no tienes pedidos</h3><p>Cuando confirmes una compra simulada aparecerá aquí.</p><a href="productos.html" class="boton boton-principal">Explorar productos</a></div>';}
    else cont.innerHTML=pedidos.slice().reverse().map(function(p){return `<article class="fila-cuenta"><div><strong>${p.numero}</strong><span>${p.fecha}</span></div><div><span>Estado</span><strong>${p.estado}</strong></div><div><span>Total</span><strong>${formatearPrecio(p.total)}</strong></div></article>`;}).join("");
    const fav=obtenerFavoritos(); document.getElementById("cantidad-favoritos-cuenta").textContent=fav.length+" favorito(s)";
}
document.addEventListener("DOMContentLoaded",function(){
    if(!document.getElementById("nombre-cuenta")) return;
    renderizarCuenta();
    document.getElementById("boton-cerrar-sesion-cuenta").addEventListener("click",function(){cerrarSesion();window.location.href="index.html";});
});
