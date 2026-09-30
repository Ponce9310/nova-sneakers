// ==============================
// NOVA SNEAKERS - ADMINISTRACIÓN
// ==============================

function protegerPaginaAdministrativa(rolesPermitidos) {
    const sesion = obtenerSesion();

    if (!sesion) {
        window.location.href = "../login.html";
        return null;
    }

    if (rolesPermitidos && !rolesPermitidos.includes(sesion.tipo)) {
        window.location.href = "../productos.html";
        return null;
    }

    return sesion;
}

function salirDelSistema() {
    cerrarSesion();
    window.location.href = "../login.html";
}

function mostrarDatosSesion(sesion) {
    const nombre = document.getElementById("nombre-sesion");
    const rol = document.getElementById("rol-sesion");

    if (nombre) nombre.textContent = sesion.nombre + " " + sesion.apellidos;
    if (rol) rol.textContent = sesion.tipo;
}

function configurarPanel(sesion) {
    const titulo = document.getElementById("titulo-panel");
    const descripcion = document.getElementById("descripcion-panel");
    const tarjetaProductos = document.getElementById("tarjeta-productos-admin");
    const tarjetaUsuarios = document.getElementById("tarjeta-usuarios-admin");
    const tarjetaPedidos = document.getElementById("tarjeta-pedidos-admin");
    const tarjetaTienda = document.getElementById("tarjeta-tienda-admin");

    if (!titulo || !descripcion) return;

    if (sesion.tipo === "Administrador") {
        titulo.textContent = "Panel de administración";
        descripcion.textContent = "Gestiona productos y usuarios y consulta la información disponible del sistema.";
        if (tarjetaProductos) tarjetaProductos.classList.remove("oculto");
        if (tarjetaUsuarios) tarjetaUsuarios.classList.remove("oculto");
        if (tarjetaPedidos) tarjetaPedidos.classList.remove("oculto");
        if (tarjetaTienda) tarjetaTienda.classList.remove("oculto");
    } else if (sesion.tipo === "Vendedor") {
        titulo.textContent = "Panel de vendedor";
        descripcion.textContent = "Consulta productos, detalles y pedidos según los permisos de tu perfil.";
        if (tarjetaProductos) tarjetaProductos.classList.remove("oculto");
        if (tarjetaUsuarios) tarjetaUsuarios.classList.add("oculto");
        if (tarjetaPedidos) tarjetaPedidos.classList.remove("oculto");
        if (tarjetaTienda) tarjetaTienda.classList.add("oculto");
    }
}

function escaparHTML(valor) {
    return String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function mostrarMensajeAdmin(id, mensaje, tipo) {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    elemento.textContent = mensaje;
    elemento.className = "mensaje-formulario " + (tipo || "");
}

function configurarMenuAdmin(sesion, moduloActivo) {
    const esAdministrador = sesion.tipo === "Administrador";

    const enlacesUsuarios = document.querySelectorAll("[data-menu-usuarios]");
    enlacesUsuarios.forEach(function(enlace) {
        enlace.classList.toggle("oculto", !esAdministrador);
    });

    const enlacesTienda = document.querySelectorAll("[data-menu-tienda]");
    enlacesTienda.forEach(function(enlace) {
        enlace.classList.toggle("oculto", !esAdministrador);
    });

    const enlacesPublicos = document.querySelectorAll("[data-enlace-publico]");
    enlacesPublicos.forEach(function(enlace) {
        enlace.classList.toggle("oculto", !esAdministrador);
    });

    document.querySelectorAll("[data-modulo]").forEach(function(enlace) {
        enlace.classList.toggle("activo", enlace.dataset.modulo === moduloActivo);
    });
}
