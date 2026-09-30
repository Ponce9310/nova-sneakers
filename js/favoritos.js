// NOVA SNEAKERS - FAVORITOS
const CLAVE_FAVORITOS = "novaSneakersFavoritos";

function obtenerFavoritos(){
    try{
        const datos = JSON.parse(localStorage.getItem(CLAVE_FAVORITOS) || "[]");
        return Array.isArray(datos) ? datos : [];
    }catch(error){ return []; }
}

function guardarFavoritos(codigos){
    localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(codigos));
}

function esFavorito(codigo){ return obtenerFavoritos().includes(codigo); }

function alternarFavorito(codigo){
    const favoritos = obtenerFavoritos();
    const indice = favoritos.indexOf(codigo);
    if(indice >= 0){
        favoritos.splice(indice, 1);
        guardarFavoritos(favoritos);
        mostrarAvisoFavorito("Producto eliminado de favoritos.");
        return false;
    }
    favoritos.push(codigo);
    guardarFavoritos(favoritos);
    mostrarAvisoFavorito("Producto agregado a favoritos.");
    return true;
}

function mostrarAvisoFavorito(mensaje){
    let aviso=document.getElementById("aviso-favorito");
    if(!aviso){
        aviso=document.createElement("div");
        aviso.id="aviso-favorito";
        aviso.className="aviso-carrito";
        document.body.appendChild(aviso);
    }
    aviso.textContent=mensaje;
    aviso.classList.add("visible");
    clearTimeout(window.novaAvisoFavorito);
    window.novaAvisoFavorito=setTimeout(function(){ aviso.classList.remove("visible"); },2200);
}

function actualizarBotonesFavoritos(){
    const favoritos=obtenerFavoritos();
    const contador=document.getElementById("contador-favoritos-header");
    if(contador) contador.textContent=favoritos.length;
    document.querySelectorAll("[data-favorito]").forEach(function(boton){
        const activo=favoritos.includes(boton.dataset.favorito);
        boton.classList.toggle("favorito-activo",activo);
        boton.setAttribute("aria-pressed", activo ? "true" : "false");
        boton.setAttribute("aria-label", activo ? "Quitar de favoritos" : "Agregar a favoritos");
        boton.textContent=activo ? "♥" : "♡";
    });
}

document.addEventListener("click",function(evento){
    const boton=evento.target.closest("[data-favorito]");
    if(!boton) return;
    evento.preventDefault();
    alternarFavorito(boton.dataset.favorito);
    actualizarBotonesFavoritos();
    if(typeof renderizarFavoritos === "function") renderizarFavoritos();
});

document.addEventListener("DOMContentLoaded",actualizarBotonesFavoritos);
