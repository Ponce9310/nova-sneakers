// ==============================
// NOVA SNEAKERS - BLOG
// ==============================

const articulosBlog = {
    "1": {
        categoria: "TENDENCIAS",
        imagen: "img/blog/blog-urbano-hd.jpg",
        titulo: "Cómo combinar zapatillas urbanas en tu día a día",
        introduccion: "Las zapatillas urbanas pueden adaptarse a distintos estilos sin perder comodidad.",
        parrafos: [
            "Una forma sencilla de comenzar es elegir un modelo versátil y combinarlo con prendas de uso cotidiano.",
            "Los colores neutros facilitan las combinaciones, mientras que un diseño más llamativo puede convertirse en el elemento principal.",
            "También conviene considerar el uso que tendrá el calzado para elegir una alternativa cómoda."
        ]
    },
    "2": {
        categoria: "DATOS",
        imagen: "img/blog/blog-running-hd.jpg",
        titulo: "Qué revisar antes de elegir zapatillas deportivas",
        introduccion: "Antes de elegir un modelo deportivo conviene pensar primero en el uso que tendrá.",
        parrafos: [
            "El tipo de actividad es uno de los primeros aspectos que se debe considerar: running, entrenamiento y basketball pueden tener necesidades diferentes.",
            "También es útil revisar comodidad, ajuste y características del producto.",
            "Finalmente, comparar precio, stock y descripción ayuda a tomar una decisión informada."
        ]
    }
};

function mostrarArticulo() {
    const contenedor = document.getElementById("articulo-blog");
    const titulo = document.getElementById("titulo-articulo");
    const parametros = new URLSearchParams(window.location.search);
    const articulo = articulosBlog[parametros.get("articulo") || "1"];

    if (!articulo) {
        titulo.textContent = "Artículo no encontrado";
        contenedor.innerHTML = '<div class="mensaje"><h2>El artículo no está disponible.</h2><a href="blog.html" class="boton boton-principal">Volver al blog</a></div>';
        return;
    }

    titulo.textContent = articulo.titulo;
    let contenido = `<p class="etiqueta">${articulo.categoria}</p><h2>${articulo.titulo}</h2><img class="imagen-articulo" src="${articulo.imagen}" alt="${articulo.titulo}"><p class="articulo-introduccion">${articulo.introduccion}</p>`;

    articulo.parrafos.forEach(function(parrafo) {
        contenido += `<p>${parrafo}</p>`;
    });

    contenedor.innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", mostrarArticulo);
