// ==============================
// NOVA SNEAKERS - CONTACTO
// ==============================

function validarFormularioContacto(mostrarResultado = false) {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const comentario = document.getElementById("comentario");
    const mensaje = document.getElementById("mensaje-contacto");
    let valido = true;

    if (!nombre.value.trim()) {
        mostrarError("nombre", "El nombre es requerido.");
        valido = false;
    } else if (nombre.value.trim().length > 100) {
        mostrarError("nombre", "El nombre no puede superar los 100 caracteres.");
        valido = false;
    } else {
        limpiarError("nombre");
    }

    if (correo.value.trim() && !correoValido(correo.value)) {
        mostrarError("correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        valido = false;
    } else {
        limpiarError("correo");
    }

    if (!comentario.value.trim()) {
        mostrarError("comentario", "El comentario es requerido.");
        valido = false;
    } else if (comentario.value.trim().length > 500) {
        mostrarError("comentario", "El comentario no puede superar los 500 caracteres.");
        valido = false;
    } else {
        limpiarError("comentario");
    }

    if (mostrarResultado) {
        if (!valido) {
            mensaje.textContent = "Revisa los campos marcados antes de enviar.";
            return false;
        }

        mensaje.textContent = "Mensaje enviado correctamente.";
        document.getElementById("formulario-contacto").reset();
    }

    return valido;
}

document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formulario-contacto");

    if (!formulario) {
        return;
    }

    const campos = [
        document.getElementById("nombre"),
        document.getElementById("correo"),
        document.getElementById("comentario")
    ];

    campos.forEach(function(campo) {
        campo.addEventListener("input", function() {
            validarFormularioContacto(false);
        });
    });

    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault();
        validarFormularioContacto(true);
    });
});
