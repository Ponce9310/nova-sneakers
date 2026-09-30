// ==============================
// NOVA SNEAKERS - USUARIOS
// ==============================

const CLAVE_USUARIOS = "novaSneakersUsuarios";

const regionesYComunas = {
    "Región Metropolitana": ["Santiago", "Maipú", "Puente Alto", "La Florida"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel"]
};

// Usuarios de demostración para poder probar los tres perfiles del sistema.
const usuariosIniciales = [
    {
        run: "190110222",
        nombre: "Administrador",
        apellidos: "NOVA",
        correo: "admin@gmail.com",
        contrasena: "1234",
        fechaNacimiento: "",
        tipo: "Administrador",
        region: "Región Metropolitana",
        comuna: "Santiago",
        direccion: "Dirección de demostración"
    },
    {
        run: "111111111",
        nombre: "Vendedor",
        apellidos: "NOVA",
        correo: "vendedor@gmail.com",
        contrasena: "1234",
        fechaNacimiento: "",
        tipo: "Vendedor",
        region: "Región Metropolitana",
        comuna: "Maipú",
        direccion: "Dirección de demostración"
    },
    {
        run: "222222222",
        nombre: "Cliente",
        apellidos: "NOVA",
        correo: "cliente@gmail.com",
        contrasena: "1234",
        fechaNacimiento: "",
        tipo: "Cliente",
        region: "Región Metropolitana",
        comuna: "La Florida",
        direccion: "Dirección de demostración"
    }
];

function obtenerUsuarios() {
    const guardado = localStorage.getItem(CLAVE_USUARIOS);

    if (!guardado) {
        localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales));
        return usuariosIniciales;
    }

    try {
        const datos = JSON.parse(guardado);
        if (Array.isArray(datos)) {
            return datos;
        }
    } catch (error) {
        // Si el almacenamiento está dañado, se recuperan los datos de demostración.
    }

    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuariosIniciales));
    return [...usuariosIniciales];
}

function guardarUsuarios(usuarios) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function cargarRegiones() {
    const selectRegion = document.getElementById("region");

    if (!selectRegion) {
        return;
    }

    Object.keys(regionesYComunas).forEach(function(region) {
        const opcion = document.createElement("option");
        opcion.value = region;
        opcion.textContent = region;
        selectRegion.appendChild(opcion);
    });

    actualizarComunas();
}

function actualizarComunas() {
    const selectRegion = document.getElementById("region");
    const selectComuna = document.getElementById("comuna");

    if (!selectRegion || !selectComuna) {
        return;
    }

    selectComuna.innerHTML = "";

    const comunas = regionesYComunas[selectRegion.value] || [];

    comunas.forEach(function(comuna) {
        const opcion = document.createElement("option");
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
    });
}

function usuarioExiste(correo, run) {
    return obtenerUsuarios().some(function(usuario) {
        return usuario.correo.toLowerCase() === correo.toLowerCase() || usuario.run === run;
    });
}

function registrarUsuario(datos) {
    const usuarios = obtenerUsuarios();

    if (usuarioExiste(datos.correo, datos.run)) {
        return { exito: false, mensaje: "Ya existe un usuario con ese correo o RUN." };
    }

    usuarios.push(datos);
    guardarUsuarios(usuarios);

    return { exito: true, mensaje: "Usuario registrado correctamente." };
}

function buscarUsuarioPorCorreo(correo) {
    return obtenerUsuarios().find(function(usuario) {
        return usuario.correo.toLowerCase() === correo.toLowerCase();
    });
}

function iniciarSesion(correo, contraseña) {
    // En esta propuesta frontend la contraseña se guarda solamente para la demostración.
    // No corresponde a una autenticación real de servidor.
    const usuario = buscarUsuarioPorCorreo(correo);

    if (!usuario) {
        return { exito: false, mensaje: "Correo o contraseña incorrectos." };
    }

    if (usuario.contrasena !== contraseña) {
        return { exito: false, mensaje: "Correo o contraseña incorrectos." };
    }

    localStorage.setItem("novaSneakersSesion", JSON.stringify(usuario));
    return { exito: true, usuario: usuario };
}

function cerrarSesion() {
    localStorage.removeItem("novaSneakersSesion");
}

function obtenerSesion() {
    const sesion = localStorage.getItem("novaSneakersSesion");

    if (!sesion) {
        return null;
    }

    try {
        const datos = JSON.parse(sesion);
        if (datos && typeof datos === "object" && ["Administrador", "Vendedor", "Cliente"].includes(datos.tipo)) {
            return datos;
        }
    } catch (error) {
        // Si la sesión está dañada, se elimina para evitar errores de navegación.
    }

    localStorage.removeItem("novaSneakersSesion");
    return null;
}


function buscarUsuarioPorRun(run) {
    const valor = run.trim().toUpperCase();
    return obtenerUsuarios().find(function(usuario) {
        return usuario.run.toUpperCase() === valor;
    });
}

function actualizarUsuario(runOriginal, datosActualizados) {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex(function(usuario) {
        return usuario.run.toUpperCase() === runOriginal.toUpperCase();
    });

    if (indice === -1) {
        return { exito: false, mensaje: "No se encontró el usuario seleccionado." };
    }

    const duplicado = usuarios.some(function(usuario, posicion) {
        return posicion !== indice && (
            usuario.correo.toLowerCase() === datosActualizados.correo.toLowerCase() ||
            usuario.run.toUpperCase() === datosActualizados.run.toUpperCase()
        );
    });

    if (duplicado) {
        return { exito: false, mensaje: "El correo o RUN ya pertenece a otro usuario." };
    }

    usuarios[indice] = datosActualizados;
    guardarUsuarios(usuarios);
    return { exito: true, mensaje: "Usuario actualizado correctamente." };
}
