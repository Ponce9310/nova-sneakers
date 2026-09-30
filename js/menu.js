/* ==============================
   NOVA SNEAKERS - MENÚ MÓVIL
   Controla la apertura/cierre del menú de navegación
   en pantallas pequeñas (hamburguesa) para todas las páginas.
   ============================== */
document.addEventListener("DOMContentLoaded", function () {
    var boton = document.getElementById("menu-toggle");
    var menu = document.getElementById("menu-principal");
    var encabezado = document.querySelector(".encabezado, .home-header");

    if (!boton || !menu) {
        return;
    }

    function cerrarMenu() {
        menu.classList.remove("menu-abierto");
        boton.classList.remove("activo");
        boton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-bloqueo");
    }

    function alternarMenu() {
        var abierto = menu.classList.toggle("menu-abierto");
        boton.classList.toggle("activo", abierto);
        boton.setAttribute("aria-expanded", abierto ? "true" : "false");
        document.body.classList.toggle("menu-bloqueo", abierto);
    }

    boton.addEventListener("click", function (evento) {
        evento.stopPropagation();
        alternarMenu();
    });

    /* Cierra el menú al elegir una sección */
    menu.querySelectorAll("a").forEach(function (enlace) {
        enlace.addEventListener("click", cerrarMenu);
    });

    /* Cierra el menú al tocar fuera de él */
    document.addEventListener("click", function (evento) {
        if (menu.classList.contains("menu-abierto") &&
            !menu.contains(evento.target) &&
            !boton.contains(evento.target)) {
            cerrarMenu();
        }
    });

    /* Cierra el menú con la tecla Escape */
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            cerrarMenu();
        }
    });

    /* Si la ventana vuelve a tamaño de escritorio, se asegura de limpiar el estado */
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) {
            cerrarMenu();
        }
    });
});
