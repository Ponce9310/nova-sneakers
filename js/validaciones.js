// ==============================
// NOVA SNEAKERS - VALIDACIONES
// ==============================

const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function correoValido(correo) {
    const correoLimpio = correo.trim().toLowerCase();

    if (correoLimpio.length === 0 || correoLimpio.length > 100) {
        return false;
    }

    const tieneFormatoBasico = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLimpio);
    const dominioPermitido = DOMINIOS_PERMITIDOS.some(function(dominio) {
        return correoLimpio.endsWith(dominio);
    });

    return tieneFormatoBasico && dominioPermitido;
}

function contraseñaValida(contraseña) {
    return contraseña.length >= 4 && contraseña.length <= 10;
}

function mostrarError(campo, mensaje) {
    const elemento = document.getElementById(campo + "-error");

    if (elemento) {
        elemento.textContent = mensaje;
    }
}

function limpiarError(campo) {
    mostrarError(campo, "");
}

// Validación del campo de correo mientras el usuario escribe.
function validarCorreoEnTiempoReal(input) {
    const correo = input.value.trim();

    if (correo.length === 0) {
        mostrarError(input.id, "El correo es requerido.");
        return false;
    }

    if (correo.length > 100) {
        mostrarError(input.id, "El correo no puede superar los 100 caracteres.");
        return false;
    }

    if (!correoValido(correo)) {
        mostrarError(input.id, "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        return false;
    }

    limpiarError(input.id);
    return true;
}

function validarContraseñaEnTiempoReal(input) {
    const contraseña = input.value;

    if (contraseña.length === 0) {
        mostrarError(input.id, "La contraseña es requerida.");
        return false;
    }

    if (!contraseñaValida(contraseña)) {
        mostrarError(input.id, "La contraseña debe tener entre 4 y 10 caracteres.");
        return false;
    }

    limpiarError(input.id);
    return true;
}

function validarTextoRequerido(input, maximo) {
    const valor = input.value.trim();

    if (valor.length === 0) {
        mostrarError(input.id, "Este campo es requerido.");
        return false;
    }

    if (valor.length > maximo) {
        mostrarError(input.id, "No puede superar los " + maximo + " caracteres.");
        return false;
    }

    limpiarError(input.id);
    return true;
}

function validarRun(run) {
    const valor = run.trim().toUpperCase();

    if (valor.length < 7 || valor.length > 9) {
        return false;
    }

    if (!/^\d{7,8}[0-9K]$/.test(valor)) {
        return false;
    }

    const cuerpo = valor.slice(0, -1);
    const digitoEsperado = calcularDigitoVerificador(cuerpo);
    return valor.slice(-1) === digitoEsperado;
}

function calcularDigitoVerificador(cuerpo) {
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);

    if (resto === 11) {
        return "0";
    }

    if (resto === 10) {
        return "K";
    }

    return String(resto);
}

function validarRunEnTiempoReal(input) {
    const valor = input.value.trim().toUpperCase();

    if (valor.length === 0) {
        mostrarError(input.id, "El RUN es requerido.");
        return false;
    }

    if (/[.\-]/.test(valor)) {
        mostrarError(input.id, "Ingresa el RUN sin puntos ni guion.");
        return false;
    }

    if (valor.length < 7 || valor.length > 9) {
        mostrarError(input.id, "El RUN debe tener entre 7 y 9 caracteres, incluyendo el dígito verificador.");
        return false;
    }

    if (!/^\d{7,8}[0-9K]$/.test(valor)) {
        mostrarError(input.id, "Ingresa 7 u 8 dígitos y, al final, el dígito verificador.");
        return false;
    }

    if (!validarRun(valor)) {
        mostrarError(input.id, "El RUN no es válido. Revisa el dígito verificador.");
        return false;
    }

    limpiarError(input.id);
    return true;
}

// La fecha de nacimiento es opcional, pero no puede ser una fecha futura.
function obtenerFechaActualISO() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return año + "-" + mes + "-" + dia;
}

function prepararFechaNacimiento(input) {
    if (!input) {
        return;
    }

    input.max = obtenerFechaActualISO();
}

function validarFechaNacimiento(input) {
    if (!input) {
        return true;
    }

    const valor = input.value;

    // El campo es opcional según el ERS.
    if (valor === "") {
        limpiarError(input.id);
        return true;
    }

    const fechaActual = obtenerFechaActualISO();

    if (valor > fechaActual) {
        mostrarError(input.id, "La fecha de nacimiento no puede ser futura.");
        return false;
    }

    limpiarError(input.id);
    return true;
}

function prepararValidacionesFormulario(formulario) {
    const campos = formulario.querySelectorAll("input, select, textarea");

    campos.forEach(function(campo) {
        campo.addEventListener("input", function() {
            if (campo.dataset.tipo === "correo") {
                validarCorreoEnTiempoReal(campo);
            }

            if (campo.dataset.tipo === "contraseña") {
                validarContraseñaEnTiempoReal(campo);
            }

            if (campo.dataset.tipo === "run") {
                validarRunEnTiempoReal(campo);
            }

            if (campo.dataset.tipo === "texto") {
                validarTextoRequerido(campo, Number(campo.dataset.maximo));
            }

            if (campo.type === "date" && campo.id.toLowerCase().includes("fechanacimiento")) {
                validarFechaNacimiento(campo);
            }
        });
    });
}


// ==============================
// APOYO VISUAL DE CONTRASEÑAS
// ==============================

// Muestra u oculta una contraseña al presionar el icono del ojo.
function alternarPassword(idCampo, boton) {
    const campo = document.getElementById(idCampo);

    if (!campo) {
        return;
    }

    if (campo.type === "password") {
        campo.type = "text";
        boton.textContent = "🙈";
        boton.setAttribute("aria-label", "Ocultar contraseña");
    } else {
        campo.type = "password";
        boton.textContent = "👁";
        boton.setAttribute("aria-label", "Mostrar contraseña");
    }
}

// Actualiza el indicador visual de longitud de contraseña.
function actualizarRequisitoPassword() {
    const campo = document.getElementById("contrasena");
    const requisito = document.getElementById("requisito-longitud");

    if (!campo || !requisito) {
        return;
    }

    const cumple = contraseñaValida(campo.value);
    requisito.classList.toggle("cumplido", cumple);
}

// Comprueba que la confirmación sea igual a la contraseña.
function validarConfirmacionContraseña() {
    const password = document.getElementById("contrasena");
    const confirmacion = document.getElementById("confirmarContrasena");
    const error = document.getElementById("confirmarContrasena-error");

    if (!password || !confirmacion || !error) {
        return true;
    }

    if (confirmacion.value.length === 0) {
        error.textContent = "Debes confirmar la contraseña.";
        return false;
    }

    if (password.value !== confirmacion.value) {
        error.textContent = "Las contraseñas no coinciden.";
        return false;
    }

    error.textContent = "";
    return true;
}

document.addEventListener("DOMContentLoaded", function() {
    const password = document.getElementById("contrasena");
    const confirmacion = document.getElementById("confirmarContrasena");

    if (password) {
        password.addEventListener("input", function() {
            actualizarRequisitoPassword();
            validarConfirmacionContraseña();
        });
    }

    if (confirmacion) {
        confirmacion.addEventListener("input", validarConfirmacionContraseña);
    }

    prepararFechaNacimiento(document.getElementById("fechaNacimiento"));
    prepararFechaNacimiento(document.getElementById("fechaNacimiento-admin"));

    actualizarRequisitoPassword();
});
