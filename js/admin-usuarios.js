// ==============================
// NOVA SNEAKERS - GESTIÓN DE USUARIOS
// ==============================

let runUsuarioEditando = null;

function iniciarGestionUsuarios(sesion) {
    configurarMenuAdmin(sesion, "usuarios");
    document.getElementById("formulario-usuario-admin").addEventListener("submit", guardarUsuarioDesdeFormulario);
    document.getElementById("boton-cancelar-usuario").addEventListener("click", cancelarEdicionUsuario);
    document.getElementById("buscar-usuario-admin").addEventListener("input", aplicarFiltrosUsuariosAdmin);
    document.getElementById("filtro-rol-admin").addEventListener("change", aplicarFiltrosUsuariosAdmin);
    document.getElementById("region-admin").addEventListener("change", actualizarComunasAdmin);
    document.getElementById("tabla-usuarios-admin").addEventListener("click", function(evento) {
        const boton = evento.target.closest(".boton-editar-usuario");
        if (boton) editarUsuario(boton.dataset.run);
    });

    cargarRegionesAdmin();
    renderizarUsuariosAdmin();
}

function cargarRegionesAdmin() {
    const select = document.getElementById("region-admin");
    select.innerHTML = '<option value="">Selecciona una región</option>';

    Object.keys(regionesYComunas).forEach(function(region) {
        const opcion = document.createElement("option");
        opcion.value = region;
        opcion.textContent = region;
        select.appendChild(opcion);
    });
    actualizarComunasAdmin();
}

function actualizarComunasAdmin(comunaSeleccionada = "") {
    const region = document.getElementById("region-admin").value;
    const select = document.getElementById("comuna-admin");
    select.innerHTML = '<option value="">Selecciona una comuna</option>';

    (regionesYComunas[region] || []).forEach(function(comuna) {
        const opcion = document.createElement("option");
        opcion.value = comuna;
        opcion.textContent = comuna;
        if (comuna === comunaSeleccionada) opcion.selected = true;
        select.appendChild(opcion);
    });
}

function limpiarErroresUsuarioAdmin() {
    ["run-admin", "nombre-admin", "apellidos-admin", "correo-admin", "contrasena-admin", "fechaNacimiento-admin", "tipo-admin", "region-admin", "comuna-admin", "direccion-admin"].forEach(function(id) {
        mostrarError(id, "");
    });
}

function validarFormularioUsuarioAdmin() {
    limpiarErroresUsuarioAdmin();
    const run = document.getElementById("run-admin");
    const nombre = document.getElementById("nombre-admin");
    const apellidos = document.getElementById("apellidos-admin");
    const correo = document.getElementById("correo-admin");
    const password = document.getElementById("contrasena-admin");
    const fecha = document.getElementById("fechaNacimiento-admin");
    const tipo = document.getElementById("tipo-admin");
    const region = document.getElementById("region-admin");
    const comuna = document.getElementById("comuna-admin");
    const direccion = document.getElementById("direccion-admin");

    const errores = [];
    const runValor = run.value.trim().toUpperCase();

    if (!validarRun(runValor)) {
        const mensaje = "El RUN no es válido. Debe tener entre 7 y 9 caracteres, sin puntos ni guion, e incluir un dígito verificador válido.";
        errores.push(mensaje); mostrarError("run-admin", mensaje);
    }
    if (!nombre.value.trim() || nombre.value.trim().length > 50) {
        const mensaje = "El nombre es obligatorio y no puede superar 50 caracteres.";
        errores.push(mensaje); mostrarError("nombre-admin", mensaje);
    }
    if (!apellidos.value.trim() || apellidos.value.trim().length > 100) {
        const mensaje = "Los apellidos son obligatorios y no pueden superar 100 caracteres.";
        errores.push(mensaje); mostrarError("apellidos-admin", mensaje);
    }
    if (!correoValido(correo.value.trim())) {
        const mensaje = "El correo debe usar @duoc.cl, @profesor.duoc.cl o @gmail.com y no superar 100 caracteres.";
        errores.push(mensaje); mostrarError("correo-admin", mensaje);
    }
    if (!validarFechaNacimiento(fecha)) {
        errores.push("La fecha de nacimiento no puede ser futura.");
    }
    if (!runUsuarioEditando && !contraseñaValida(password.value)) {
        const mensaje = "La contraseña debe tener entre 4 y 10 caracteres.";
        errores.push(mensaje); mostrarError("contrasena-admin", mensaje);
    }
    if (runUsuarioEditando && password.value !== "" && !contraseñaValida(password.value)) {
        const mensaje = "Si cambias la contraseña, debe tener entre 4 y 10 caracteres.";
        errores.push(mensaje); mostrarError("contrasena-admin", mensaje);
    }
    if (!tipo.value) {
        const mensaje = "Debes seleccionar un tipo de usuario.";
        errores.push(mensaje); mostrarError("tipo-admin", mensaje);
    }
    if (!region.value) {
        const mensaje = "Debes seleccionar una región.";
        errores.push(mensaje); mostrarError("region-admin", mensaje);
    }
    if (!comuna.value) {
        const mensaje = "Debes seleccionar una comuna.";
        errores.push(mensaje); mostrarError("comuna-admin", mensaje);
    }
    if (!direccion.value.trim() || direccion.value.trim().length > 300) {
        const mensaje = "La dirección es obligatoria y no puede superar 300 caracteres.";
        errores.push(mensaje); mostrarError("direccion-admin", mensaje);
    }

    return { errores, elementos: { run, nombre, apellidos, correo, password, fecha, tipo, region, comuna, direccion } };
}

function guardarUsuarioDesdeFormulario(evento) {
    evento.preventDefault();
    const resultado = validarFormularioUsuarioAdmin();

    if (resultado.errores.length > 0) {
        mostrarMensajeAdmin("mensaje-usuario", resultado.errores.join(" "), "error");
        return;
    }

    const e = resultado.elementos;
    const usuarios = obtenerUsuarios();
    const existente = runUsuarioEditando ? buscarUsuarioPorRun(runUsuarioEditando) : null;

    const datos = {
        run: e.run.value.trim().toUpperCase(),
        nombre: e.nombre.value.trim(),
        apellidos: e.apellidos.value.trim(),
        correo: e.correo.value.trim().toLowerCase(),
        contrasena: e.password.value || (existente ? existente.contrasena : ""),
        fechaNacimiento: e.fecha.value,
        tipo: e.tipo.value,
        region: e.region.value,
        comuna: e.comuna.value,
        direccion: e.direccion.value.trim()
    };

    if (runUsuarioEditando) {
        const respuesta = actualizarUsuario(runUsuarioEditando, datos);
        mostrarMensajeAdmin("mensaje-usuario", respuesta.mensaje, respuesta.exito ? "exito" : "error");
        if (respuesta.exito) {
            limpiarFormularioUsuario();
            renderizarUsuariosAdmin();
        }
        return;
    }

    if (usuarios.some(function(usuario) {
        return usuario.run.toUpperCase() === datos.run || usuario.correo.toLowerCase() === datos.correo;
    })) {
        mostrarMensajeAdmin("mensaje-usuario", "Ya existe un usuario con ese RUN o correo.", "error");
        return;
    }

    const respuesta = registrarUsuario(datos);
    mostrarMensajeAdmin("mensaje-usuario", respuesta.mensaje, respuesta.exito ? "exito" : "error");
    if (respuesta.exito) {
        limpiarFormularioUsuario();
        renderizarUsuariosAdmin();
    }
}

function editarUsuario(run) {
    const usuario = buscarUsuarioPorRun(run);
    if (!usuario) return;

    runUsuarioEditando = usuario.run;
    document.getElementById("run-admin").value = usuario.run;
    document.getElementById("nombre-admin").value = usuario.nombre;
    document.getElementById("apellidos-admin").value = usuario.apellidos;
    document.getElementById("correo-admin").value = usuario.correo;
    document.getElementById("contrasena-admin").value = "";
    document.getElementById("contrasena-admin").placeholder = "Dejar vacío para mantener la actual";
    document.getElementById("fechaNacimiento-admin").value = usuario.fechaNacimiento || "";
    document.getElementById("tipo-admin").value = usuario.tipo;
    document.getElementById("region-admin").value = usuario.region;
    actualizarComunasAdmin(usuario.comuna);
    document.getElementById("direccion-admin").value = usuario.direccion;
    document.getElementById("titulo-formulario-usuario").textContent = "Editar usuario";
    document.getElementById("boton-guardar-usuario").textContent = "Guardar cambios";
    document.getElementById("boton-cancelar-usuario").classList.remove("oculto");
    document.getElementById("formulario-usuario-admin").scrollIntoView({ behavior: "smooth", block: "start" });
}

function cancelarEdicionUsuario() {
    limpiarFormularioUsuario();
    mostrarMensajeAdmin("mensaje-usuario", "", "");
}

function limpiarFormularioUsuario() {
    runUsuarioEditando = null;
    document.getElementById("formulario-usuario-admin").reset();
    document.getElementById("contrasena-admin").placeholder = "4 a 10 caracteres";
    document.getElementById("titulo-formulario-usuario").textContent = "Nuevo usuario";
    document.getElementById("boton-guardar-usuario").textContent = "Crear usuario";
    document.getElementById("boton-cancelar-usuario").classList.add("oculto");
    cargarRegionesAdmin();
}

function aplicarFiltrosUsuariosAdmin() {
    renderizarUsuariosAdmin(
        document.getElementById("buscar-usuario-admin").value.trim().toLowerCase(),
        document.getElementById("filtro-rol-admin").value
    );
}

function renderizarUsuariosAdmin(texto = "", rol = "Todos") {
    const contenedor = document.getElementById("tabla-usuarios-admin");
    if (!contenedor) return;

    const filtrados = obtenerUsuarios().filter(function(usuario) {
        const coincideTexto = usuario.run.toLowerCase().includes(texto) || usuario.nombre.toLowerCase().includes(texto) || usuario.apellidos.toLowerCase().includes(texto) || usuario.correo.toLowerCase().includes(texto);
        const coincideRol = rol === "Todos" || usuario.tipo === rol;
        return coincideTexto && coincideRol;
    });

    document.getElementById("contador-usuarios-admin").textContent = filtrados.length + " usuario(s)";

    if (filtrados.length === 0) {
        contenedor.innerHTML = '<div class="estado-vacio"><h3>No se encontraron usuarios</h3><p>Prueba con otro filtro.</p></div>';
        return;
    }

    contenedor.innerHTML = filtrados.map(function(usuario) {
        return `
            <article class="fila-admin">
                <div><strong>${escaparHTML(usuario.nombre)} ${escaparHTML(usuario.apellidos)}</strong><span>RUN: ${escaparHTML(usuario.run)}</span></div>
                <div><strong>Correo</strong><span>${escaparHTML(usuario.correo)}</span></div>
                <div><strong>Perfil</strong><span>${escaparHTML(usuario.tipo)}</span></div>
                <div><strong>Ubicación</strong><span>${escaparHTML(usuario.comuna)}, ${escaparHTML(usuario.region)}</span></div>
                <div><button type="button" class="boton boton-principal boton-pequeno boton-editar-usuario" data-run="${escaparHTML(usuario.run)}">Editar</button></div>
            </article>
        `;
    }).join("");
}
