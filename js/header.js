// NOVA SNEAKERS - CABECERA Y CUENTA
// Mantiene el enlace de cuenta y su icono coherentes con la sesión actual.
document.addEventListener("DOMContentLoaded", function(){
    const enlaces = document.querySelectorAll("[data-cuenta-link]");
    if (!enlaces.length || typeof obtenerSesion !== "function") return;
    const sesion = obtenerSesion();
    enlaces.forEach(function(enlace){
        const icono = enlace.querySelector(".icono-cuenta-interno");
        if (sesion) {
            enlace.href = "cuenta.html";
            enlace.setAttribute("title", "Mi cuenta");
            enlace.setAttribute("aria-label", "Mi cuenta");
            if (icono) {
                icono.textContent = "♙";
            } else if (enlace.classList.contains("icono-header")) {
                enlace.textContent = "♙";
            } else {
                enlace.textContent = "Mi cuenta";
            }
            enlace.classList.toggle("activo", window.location.pathname.endsWith("cuenta.html"));
        } else {
            enlace.href = "login.html";
            enlace.setAttribute("title", "Iniciar sesión");
            enlace.setAttribute("aria-label", "Iniciar sesión");
            if (icono) {
                icono.textContent = "♙";
            } else if (enlace.classList.contains("icono-header")) {
                enlace.textContent = "♙";
            } else {
                enlace.textContent = "Iniciar sesión";
            }
        }
    });
});
