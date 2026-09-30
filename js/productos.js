// ==============================
// NOVA SNEAKERS - PRODUCTOS
// ==============================

const CLAVE_PRODUCTOS = "novaSneakersProductos";
const VERSION_IMAGENES_CATALOGO = "v15-mujer-basketball-training-44-productos";

// Productos de demostración iniciales.
const productosIniciales = [
    { codigo: "NS-001", nombre: "Nova Air Street", descripcion: "Zapatilla urbana de diseño moderno para uso diario.", precio: 59990, stock: 12, stockCritico: 3, categoria: "Urbanas", publico: "Unisex", imagen: "img/productos/nova-air-street-v2.jpg", galeria: ["img/productos/nova-air-street-v2.jpg"] },
    { codigo: "NS-002", nombre: "Nova Runner Pro", descripcion: "Zapatilla deportiva pensada para running y actividad diaria.", precio: 69990, stock: 8, stockCritico: 2, categoria: "Running", publico: "Unisex", imagen: "img/productos/nova-runner-pro-v2.jpg", galeria: ["img/productos/nova-runner-pro-v2.jpg"] },
    { codigo: "NS-003", nombre: "Nova Court X", descripcion: "Modelo deportivo con diseño inspirado en el básquetbol.", precio: 79990, stock: 5, stockCritico: 2, categoria: "Basketball", publico: "Unisex", imagen: "img/productos/nova-court-x-v2.jpg", galeria: ["img/productos/nova-court-x-v2.jpg"] },
    { codigo: "NS-004", nombre: "Nova Motion", descripcion: "Modelo versátil para entrenamiento y actividad física.", precio: 64990, stock: 10, stockCritico: 3, categoria: "Training", publico: "Unisex", imagen: "img/productos/nova-motion-v2.jpg", galeria: ["img/productos/nova-motion-v2.jpg"] },
    { codigo: "NS-005", nombre: "Nova Street One", descripcion: "Zapatilla urbana cómoda para combinar con distintos estilos.", precio: 54990, stock: 15, stockCritico: 4, categoria: "Urbanas", publico: "Unisex", imagen: "img/productos/nova-street-one-v2.jpg", galeria: ["img/productos/nova-street-one-v2.jpg"] },
    { codigo: "NS-006", nombre: "Nova Runner Max", descripcion: "Modelo deportivo para quienes buscan comodidad al correr.", precio: 74990, stock: 7, stockCritico: 2, categoria: "Running", publico: "Unisex", imagen: "img/productos/nova-runner-max-v2.jpg", galeria: ["img/productos/nova-runner-max-v2.jpg"] },
    { codigo: "NS-007", nombre: "Nova Dunk", descripcion: "Zapatilla de básquetbol de caña alta, con soporte y suela de tracción.", precio: 84990, stock: 4, stockCritico: 2, categoria: "Basketball", publico: "Unisex", imagen: "img/productos/nova-dunk-v2.jpg", galeria: ["img/productos/nova-dunk-v2.jpg"] },
    { codigo: "NS-008", nombre: "Nova Training Plus", descripcion: "Zapatilla versátil para sesiones de entrenamiento.", precio: 68990, stock: 9, stockCritico: 3, categoria: "Training", publico: "Unisex", imagen: "img/productos/nova-training-plus-v2.jpg", galeria: ["img/productos/nova-training-plus-v2.jpg"] },
    { codigo: "NS-009", nombre: "Nova Street Sand", descripcion: "Zapatilla urbana en tonos arena para un estilo diario y versátil.", precio: 57990, stock: 11, stockCritico: 3, categoria: "Urbanas", publico: "Unisex", imagen: "img/productos/nova-street-sand-v2.jpg", galeria: ["img/productos/nova-street-sand-v2.jpg"] },
    { codigo: "NS-010", nombre: "Nova Runner Red", descripcion: "Zapatilla de running con combinación roja y negra para actividad diaria.", precio: 72990, stock: 8, stockCritico: 2, categoria: "Running", publico: "Unisex", imagen: "img/productos/nova-runner-red-v2.jpg", galeria: ["img/productos/nova-runner-red-v2.jpg"] },
    { codigo: "NS-011", nombre: "Nova Court Purple", descripcion: "Zapatilla de básquetbol en tonos púrpura con diseño deportivo.", precio: 81990, stock: 6, stockCritico: 2, categoria: "Basketball", publico: "Unisex", imagen: "img/productos/nova-court-purple-v2.jpg", galeria: ["img/productos/nova-court-purple-v2.jpg"] },
    { codigo: "NS-012", nombre: "Nova Motion Orange", descripcion: "Zapatilla de entrenamiento con detalles naranjas y diseño dinámico.", precio: 66990, stock: 10, stockCritico: 3, categoria: "Training", publico: "Unisex", imagen: "img/productos/nova-motion-orange-v2.jpg", galeria: ["img/productos/nova-motion-orange-v2.jpg"] },
    { codigo: "NS-W01", nombre: "Nova Aura Street", descripcion: "Zapatilla urbana femenina de diseño moderno y cómodo para uso diario.", precio: 64990, stock: 10, stockCritico: 3, categoria: "Urbanas", publico: "Mujer", imagen: "img/productos/mujer/nova-aura-street.jpg", galeria: ["img/productos/mujer/nova-aura-street.jpg", "img/productos/mujer/nova-aura-street-detalle.jpg", "img/productos/mujer/nova-aura-street-zoom.jpg"] },
    { codigo: "NS-W02", nombre: "Nova City Pearl", descripcion: "Zapatilla urbana femenina de líneas limpias y estilo versátil.", precio: 67990, stock: 8, stockCritico: 2, categoria: "Urbanas", publico: "Mujer", imagen: "img/productos/mujer/nova-city-pearl.jpg", galeria: ["img/productos/mujer/nova-city-pearl.jpg", "img/productos/mujer/nova-city-pearl-detalle.jpg", "img/productos/mujer/nova-city-pearl-zoom.jpg"] },
    { codigo: "NS-W03", nombre: "Nova Street Bloom", descripcion: "Zapatilla urbana femenina con detalles suaves y acabado contemporáneo.", precio: 62990, stock: 12, stockCritico: 3, categoria: "Urbanas", publico: "Mujer", imagen: "img/productos/mujer/nova-street-bloom.jpg", galeria: ["img/productos/mujer/nova-street-bloom.jpg", "img/productos/mujer/nova-street-bloom-detalle.jpg", "img/productos/mujer/nova-street-bloom-zoom.jpg"] },
    { codigo: "NS-W04", nombre: "Nova Urban Sand", descripcion: "Zapatilla urbana femenina en tonos arena para looks diarios.", precio: 65990, stock: 9, stockCritico: 3, categoria: "Urbanas", publico: "Mujer", imagen: "img/productos/mujer/nova-urban-sand.jpg", galeria: ["img/productos/mujer/nova-urban-sand.jpg", "img/productos/mujer/nova-urban-sand-detalle.jpg", "img/productos/mujer/nova-urban-sand-zoom.jpg"] },
    { codigo: "NS-W05", nombre: "Nova Run Flow", descripcion: "Zapatilla femenina para running y actividad diaria con sensación ligera.", precio: 72990, stock: 9, stockCritico: 2, categoria: "Running", publico: "Mujer", imagen: "img/productos/mujer/nova-run-flow.jpg", galeria: ["img/productos/mujer/nova-run-flow.jpg", "img/productos/mujer/nova-run-flow-detalle.jpg", "img/productos/mujer/nova-run-flow-zoom.jpg"] },
    { codigo: "NS-W06", nombre: "Nova Run Breeze", descripcion: "Modelo femenino de running pensado para comodidad y movimiento.", precio: 74990, stock: 7, stockCritico: 2, categoria: "Running", publico: "Mujer", imagen: "img/productos/mujer/nova-run-breeze.jpg", galeria: ["img/productos/mujer/nova-run-breeze.jpg", "img/productos/mujer/nova-run-breeze-detalle.jpg", "img/productos/mujer/nova-run-breeze-zoom.jpg"] },
    { codigo: "NS-W07", nombre: "Nova Run Pulse", descripcion: "Zapatilla femenina de running con diseño dinámico y deportivo.", precio: 76990, stock: 6, stockCritico: 2, categoria: "Running", publico: "Mujer", imagen: "img/productos/mujer/nova-train-rose.jpg", galeria: ["img/productos/mujer/nova-train-rose.jpg", "img/productos/mujer/nova-train-rose-detalle.jpg", "img/productos/mujer/nova-train-rose-zoom.jpg"] },
    { codigo: "NS-W08", nombre: "Nova Run Active", descripcion: "Modelo femenino para entrenamientos y carreras de ritmo diario.", precio: 73990, stock: 10, stockCritico: 3, categoria: "Running", publico: "Mujer", imagen: "img/productos/mujer/nova-training-pulse.jpg", galeria: ["img/productos/mujer/nova-training-pulse.jpg", "img/productos/mujer/nova-training-pulse-detalle.jpg", "img/productos/mujer/nova-training-pulse-zoom.jpg"] },
    { codigo: "NS-W09", nombre: "Nova Train Flex", descripcion: "Zapatilla femenina de training para movimientos variados.", precio: 69990, stock: 8, stockCritico: 3, categoria: "Training", publico: "Mujer", imagen: "img/productos/mujer/nova-train-flex.jpg", galeria: ["img/productos/mujer/nova-train-flex.jpg", "img/productos/mujer/nova-train-flex-detalle.jpg", "img/productos/mujer/nova-train-flex-zoom.jpg"] },
    { codigo: "NS-W10", nombre: "Nova Train Move", descripcion: "Modelo femenino de entrenamiento con soporte y diseño activo.", precio: 71990, stock: 7, stockCritico: 2, categoria: "Training", publico: "Mujer", imagen: "img/productos/mujer/nova-train-move.jpg", galeria: ["img/productos/mujer/nova-train-move.jpg", "img/productos/mujer/nova-train-move-detalle.jpg", "img/productos/mujer/nova-train-move-zoom.jpg"] },
    { codigo: "NS-W11", nombre: "Nova Train Core", descripcion: "Zapatilla femenina de training de estilo sobrio y versátil.", precio: 68990, stock: 11, stockCritico: 3, categoria: "Training", publico: "Mujer", imagen: "img/productos/mujer/nova-train-core.jpg", galeria: ["img/productos/mujer/nova-train-core.jpg", "img/productos/mujer/nova-train-core-detalle.jpg", "img/productos/mujer/nova-train-core-zoom.jpg"] },
    { codigo: "NS-W12", nombre: "Nova Train Energy", descripcion: "Modelo femenino de entrenamiento con detalles llamativos.", precio: 72990, stock: 6, stockCritico: 2, categoria: "Training", publico: "Mujer", imagen: "img/productos/mujer/nova-train-energy.jpg", galeria: ["img/productos/mujer/nova-train-energy.jpg", "img/productos/mujer/nova-train-energy-detalle.jpg", "img/productos/mujer/nova-train-energy-zoom.jpg"] },
    { codigo: "NS-W13", nombre: "Nova Court Elite", descripcion: "Zapatilla femenina de básquetbol con soporte y amortiguación para juego dinámico.", precio: 89990, stock: 8, stockCritico: 2, categoria: "Basketball", publico: "Mujer", imagen: "img/productos/mujer/nova-court-elite.jpg", galeria: ["img/productos/mujer/nova-court-elite.jpg", "img/productos/mujer/nova-court-elite-detalle.jpg", "img/productos/mujer/nova-court-elite-zoom.jpg"] },
    { codigo: "NS-W14", nombre: "Nova Dunk Pro", descripcion: "Modelo femenino de básquetbol de caña alta con ajuste firme y suela de tracción.", precio: 92990, stock: 6, stockCritico: 2, categoria: "Basketball", publico: "Mujer", imagen: "img/productos/mujer/nova-dunk-pro.jpg", galeria: ["img/productos/mujer/nova-dunk-pro.jpg", "img/productos/mujer/nova-dunk-pro-detalle.jpg", "img/productos/mujer/nova-dunk-pro-zoom.jpg"] },
    { codigo: "NS-W15", nombre: "Nova Hoops Mid", descripcion: "Zapatilla femenina de básquetbol de media caña para movimientos rápidos.", precio: 87990, stock: 10, stockCritico: 3, categoria: "Basketball", publico: "Mujer", imagen: "img/productos/mujer/nova-hoops-mid.jpg", galeria: ["img/productos/mujer/nova-hoops-mid.jpg", "img/productos/mujer/nova-hoops-mid-detalle.jpg", "img/productos/mujer/nova-hoops-mid-zoom.jpg"] },
    { codigo: "NS-W16", nombre: "Nova Jump Force", descripcion: "Modelo femenino de básquetbol con estructura deportiva y buena tracción.", precio: 90990, stock: 7, stockCritico: 2, categoria: "Basketball", publico: "Mujer", imagen: "img/productos/mujer/nova-jump-force.jpg", galeria: ["img/productos/mujer/nova-jump-force.jpg", "img/productos/mujer/nova-jump-force-detalle.jpg", "img/productos/mujer/nova-jump-force-zoom.jpg"] },
    { codigo: "NS-K01", nombre: "Nova Kids Street", descripcion: "Zapatilla infantil urbana cómoda para el día a día.", precio: 39990, stock: 12, stockCritico: 3, categoria: "Urbanas", publico: "Niños", imagen: "img/productos/ninos/nova-kids-01.jpg", galeria: ["img/productos/ninos/nova-kids-01.jpg", "img/productos/ninos/nova-kids-01-detalle.jpg", "img/productos/ninos/nova-kids-01-zoom.jpg"] },
    { codigo: "NS-K02", nombre: "Nova Kids Play", descripcion: "Modelo infantil urbano pensado para juegos y actividades diarias.", precio: 37990, stock: 14, stockCritico: 4, categoria: "Urbanas", publico: "Niños", imagen: "img/productos/ninos/nova-kids-02.jpg", galeria: ["img/productos/ninos/nova-kids-02.jpg", "img/productos/ninos/nova-kids-02-detalle.jpg", "img/productos/ninos/nova-kids-02-zoom.jpg"] },
    { codigo: "NS-K03", nombre: "Nova Kids Urban", descripcion: "Zapatilla infantil urbana resistente y versátil.", precio: 41990, stock: 10, stockCritico: 3, categoria: "Urbanas", publico: "Niños", imagen: "img/productos/ninos/nova-kids-03.jpg", galeria: ["img/productos/ninos/nova-kids-03.jpg", "img/productos/ninos/nova-kids-03-detalle.jpg", "img/productos/ninos/nova-kids-03-zoom.jpg"] },
    { codigo: "NS-K04", nombre: "Nova Kids Fresh", descripcion: "Modelo infantil urbano de diseño fresco y liviano.", precio: 38990, stock: 13, stockCritico: 3, categoria: "Urbanas", publico: "Niños", imagen: "img/productos/ninos/nova-kids-04.jpg", galeria: ["img/productos/ninos/nova-kids-04.jpg", "img/productos/ninos/nova-kids-04-detalle.jpg", "img/productos/ninos/nova-kids-04-zoom.jpg"] },
    { codigo: "NS-K05", nombre: "Nova Kids Run", descripcion: "Zapatilla infantil para running y actividad física.", precio: 42990, stock: 9, stockCritico: 3, categoria: "Running", publico: "Niños", imagen: "img/productos/ninos/nova-kids-05.jpg", galeria: ["img/productos/ninos/nova-kids-05.jpg", "img/productos/ninos/nova-kids-05-detalle.jpg", "img/productos/ninos/nova-kids-05-zoom.jpg"] },
    { codigo: "NS-K06", nombre: "Nova Kids Sprint", descripcion: "Modelo infantil deportivo para movimiento y carrera.", precio: 44990, stock: 8, stockCritico: 2, categoria: "Running", publico: "Niños", imagen: "img/productos/ninos/nova-kids-06.jpg", galeria: ["img/productos/ninos/nova-kids-06.jpg", "img/productos/ninos/nova-kids-06-detalle.jpg", "img/productos/ninos/nova-kids-06-zoom.jpg"] },
    { codigo: "NS-K07", nombre: "Nova Kids Dash", descripcion: "Zapatilla infantil de running con diseño dinámico.", precio: 43990, stock: 11, stockCritico: 3, categoria: "Running", publico: "Niños", imagen: "img/productos/ninos/nova-kids-07.jpg", galeria: ["img/productos/ninos/nova-kids-07.jpg", "img/productos/ninos/nova-kids-07-detalle.jpg", "img/productos/ninos/nova-kids-07-zoom.jpg"] },
    { codigo: "NS-K08", nombre: "Nova Kids Speed", descripcion: "Modelo infantil deportivo para juegos activos.", precio: 45990, stock: 7, stockCritico: 2, categoria: "Running", publico: "Niños", imagen: "img/productos/ninos/nova-kids-08.jpg", galeria: ["img/productos/ninos/nova-kids-08.jpg", "img/productos/ninos/nova-kids-08-detalle.jpg", "img/productos/ninos/nova-kids-08-zoom.jpg"] },
    { codigo: "NS-K09", nombre: "Nova Kids Court", descripcion: "Zapatilla infantil de básquetbol con soporte deportivo.", precio: 47990, stock: 8, stockCritico: 2, categoria: "Basketball", publico: "Niños", imagen: "img/productos/ninos/nova-kids-09.jpg", galeria: ["img/productos/ninos/nova-kids-09.jpg", "img/productos/ninos/nova-kids-09-detalle.jpg", "img/productos/ninos/nova-kids-09-zoom.jpg"] },
    { codigo: "NS-K10", nombre: "Nova Kids Dunk", descripcion: "Modelo infantil inspirado en el básquetbol urbano.", precio: 49990, stock: 6, stockCritico: 2, categoria: "Basketball", publico: "Niños", imagen: "img/productos/ninos/nova-kids-10.jpg", galeria: ["img/productos/ninos/nova-kids-10.jpg", "img/productos/ninos/nova-kids-10-detalle.jpg", "img/productos/ninos/nova-kids-10-zoom.jpg"] },
    { codigo: "NS-K11", nombre: "Nova Kids Hoops", descripcion: "Zapatilla infantil para básquetbol y actividad diaria.", precio: 48990, stock: 9, stockCritico: 3, categoria: "Basketball", publico: "Niños", imagen: "img/productos/ninos/nova-kids-11.jpg", galeria: ["img/productos/ninos/nova-kids-11.jpg", "img/productos/ninos/nova-kids-11-detalle.jpg", "img/productos/ninos/nova-kids-11-zoom.jpg"] },
    { codigo: "NS-K12", nombre: "Nova Kids Jump", descripcion: "Modelo infantil de básquetbol con diseño energético.", precio: 50990, stock: 7, stockCritico: 2, categoria: "Basketball", publico: "Niños", imagen: "img/productos/ninos/nova-kids-12.jpg", galeria: ["img/productos/ninos/nova-kids-12.jpg", "img/productos/ninos/nova-kids-12-detalle.jpg", "img/productos/ninos/nova-kids-12-zoom.jpg"] },
    { codigo: "NS-K13", nombre: "Nova Kids Power", descripcion: "Zapatilla infantil de training con soporte, ajuste seguro y diseño deportivo.", precio: 44990, stock: 9, stockCritico: 3, categoria: "Training", publico: "Niños", imagen: "img/productos/ninos/nova-kids-13.jpg", galeria: ["img/productos/ninos/nova-kids-13.jpg", "img/productos/ninos/nova-kids-13-detalle.jpg", "img/productos/ninos/nova-kids-13-zoom.jpg"] },
    { codigo: "NS-K14", nombre: "Nova Kids Move", descripcion: "Modelo infantil de training pensado para movimiento y actividad física.", precio: 43990, stock: 11, stockCritico: 3, categoria: "Training", publico: "Niños", imagen: "img/productos/ninos/nova-kids-14.jpg", galeria: ["img/productos/ninos/nova-kids-14.jpg", "img/productos/ninos/nova-kids-14-detalle.jpg", "img/productos/ninos/nova-kids-14-zoom.jpg"] },
    { codigo: "NS-K15", nombre: "Nova Kids Active", descripcion: "Zapatilla infantil de training con estructura estable y amortiguación deportiva.", precio: 45990, stock: 8, stockCritico: 2, categoria: "Training", publico: "Niños", imagen: "img/productos/ninos/nova-kids-15.jpg", galeria: ["img/productos/ninos/nova-kids-15.jpg", "img/productos/ninos/nova-kids-15-detalle.jpg", "img/productos/ninos/nova-kids-15-zoom.jpg"] },
    { codigo: "NS-K16", nombre: "Nova Kids Flex", descripcion: "Modelo infantil de training flexible y liviano para actividades diarias.", precio: 42990, stock: 10, stockCritico: 3, categoria: "Training", publico: "Niños", imagen: "img/productos/ninos/nova-kids-16.jpg", galeria: ["img/productos/ninos/nova-kids-16.jpg", "img/productos/ninos/nova-kids-16-detalle.jpg", "img/productos/ninos/nova-kids-16-zoom.jpg"] }
];

// Array principal utilizado por la tienda y por la administración.
let productos = obtenerProductosGuardados();

function obtenerProductosGuardados() {
    const guardado = localStorage.getItem(CLAVE_PRODUCTOS);

    if (!guardado) {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productosIniciales));
        return [...productosIniciales];
    }

    try {
        const datos = JSON.parse(guardado);

        if (!Array.isArray(datos)) {
            localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productosIniciales));
            return [...productosIniciales];
        }

        // Mantiene las imágenes oficiales y agrega los nuevos productos de demostración
        // cuando el navegador ya tenía guardada una versión anterior del catálogo.
        const productosActualizados = datos.map(function(producto) {
            const productoInicial = productosIniciales.find(function(inicial) {
                return inicial.codigo === producto.codigo;
            });

            if (!productoInicial) return producto;

            return {
                ...producto,
                publico: producto.publico || productoInicial.publico,
                imagen: producto.imagen || productoInicial.imagen,
                galeria: Array.isArray(producto.galeria) && producto.galeria.length >= 3
                    ? producto.galeria
                    : productoInicial.galeria
            };
        });

        productosIniciales.forEach(function(productoInicial) {
            const yaExiste = productosActualizados.some(function(producto) {
                return producto.codigo === productoInicial.codigo;
            });

            if (!yaExiste) {
                productosActualizados.push(productoInicial);
            }
        });

        const versionImagenes = localStorage.getItem("novaSneakersVersionImagenesCatalogo");
        if (versionImagenes !== VERSION_IMAGENES_CATALOGO) {
            const imagenesCatalogo = {
                "NS-W01": "img/productos/mujer/nova-aura-street.jpg",
                "NS-W02": "img/productos/mujer/nova-city-pearl.jpg",
                "NS-W03": "img/productos/mujer/nova-street-bloom.jpg",
                "NS-W04": "img/productos/mujer/nova-urban-sand.jpg",
                "NS-W05": "img/productos/mujer/nova-run-flow.jpg",
                "NS-W06": "img/productos/mujer/nova-run-breeze.jpg",
                "NS-W07": "img/productos/mujer/nova-train-rose.jpg",
                "NS-W08": "img/productos/mujer/nova-training-pulse.jpg",
                "NS-W09": "img/productos/mujer/nova-train-flex.jpg",
                "NS-W10": "img/productos/mujer/nova-train-move.jpg",
                "NS-W11": "img/productos/mujer/nova-train-core.jpg",
                "NS-W12": "img/productos/mujer/nova-train-energy.jpg",
                "NS-W13": "img/productos/mujer/nova-court-elite.jpg",
                "NS-W14": "img/productos/mujer/nova-dunk-pro.jpg",
                "NS-W15": "img/productos/mujer/nova-hoops-mid.jpg",
                "NS-W16": "img/productos/mujer/nova-jump-force.jpg"
            };

            const imagenesNinos = {
                "NS-K01": "img/productos/ninos/nova-kids-01.jpg",
                "NS-K02": "img/productos/ninos/nova-kids-02.jpg",
                "NS-K03": "img/productos/ninos/nova-kids-03.jpg",
                "NS-K04": "img/productos/ninos/nova-kids-04.jpg",
                "NS-K05": "img/productos/ninos/nova-kids-05.jpg",
                "NS-K06": "img/productos/ninos/nova-kids-06.jpg",
                "NS-K07": "img/productos/ninos/nova-kids-07.jpg",
                "NS-K08": "img/productos/ninos/nova-kids-08.jpg",
                "NS-K09": "img/productos/ninos/nova-kids-09.jpg",
                "NS-K10": "img/productos/ninos/nova-kids-10.jpg",
                "NS-K11": "img/productos/ninos/nova-kids-11.jpg",
                "NS-K12": "img/productos/ninos/nova-kids-12.jpg",
                "NS-K13": "img/productos/ninos/nova-kids-13.jpg",
                "NS-K14": "img/productos/ninos/nova-kids-14.jpg",
                "NS-K15": "img/productos/ninos/nova-kids-15.jpg",
                "NS-K16": "img/productos/ninos/nova-kids-16.jpg"
            };

            productosActualizados.forEach(function(producto) {
                const ruta = imagenesCatalogo[producto.codigo] || imagenesNinos[producto.codigo];
                if (!ruta) return;

                const partes = ruta.split("/");
                const nombreArchivo = partes.pop().replace(".jpg", "");
                const carpeta = partes.join("/");
                producto.imagen = ruta;
                producto.galeria = [
                    ruta,
                    carpeta + "/" + nombreArchivo + "-detalle.jpg",
                    carpeta + "/" + nombreArchivo + "-zoom.jpg"
                ];
            });

            localStorage.setItem("novaSneakersVersionImagenesCatalogo", VERSION_IMAGENES_CATALOGO);
        }

        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productosActualizados));
        return productosActualizados;
    } catch (error) {
        localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productosIniciales));
        return [...productosIniciales];
    }
}

function guardarProductos(nuevosProductos) {
    productos = nuevosProductos;
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
}

function buscarProducto(codigo) {
    return productos.find(function(producto) {
        return producto.codigo === codigo;
    });
}

function formatearPrecio(precio) {
    return Number(precio).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
    });
}

function obtenerImagenProducto(producto) {
    return producto.imagen && producto.imagen.trim() !== ""
        ? producto.imagen
        : "img/productos/producto-generico.svg";
}

function imagenConRespaldo(ruta, nombre) {
    return `<img src="${ruta}" alt="${nombre}" fetchpriority="high" decoding="async" onerror="this.onerror=null;this.src='img/productos/producto-generico.svg';">`;
}

let categoriaSeleccionada = "Todos";
let publicoSeleccionado = "Todos";
let textoBusqueda = "";
let ordenCatalogo = "relevancia";
let paginaCarrusel = 0;
let intervaloCarrusel = null;
let carruselPausado = false;

function obtenerCantidadVisible() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1000) return 2;
    return 4;
}

function obtenerPaginasCarrusel(cantidad) {
    const visibles = obtenerCantidadVisible();
    return Math.max(1, Math.ceil(cantidad / visibles));
}

function crearTarjetaProducto(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML = `
        <a href="detalle.html?codigo=${encodeURIComponent(producto.codigo)}" class="imagen-producto">
            ${imagenConRespaldo(obtenerImagenProducto(producto), producto.nombre)}
            <span class="etiqueta-imagen">${producto.publico || "Unisex"}</span>
        </a>
        <div class="contenido-producto">
            <p class="categoria-producto">${producto.categoria} · ${producto.publico || "Unisex"}</p>
            <h3>${producto.nombre}</h3>
            <p class="precio-producto">${formatearPrecio(producto.precio)}</p>
            <p class="stock-producto ${producto.stock === 0 ? "sin-stock" : ""}">${producto.stock === 0 ? "Sin stock" : "Stock disponible: " + producto.stock}</p>
            <div class="acciones-producto">
                <a href="detalle.html?codigo=${encodeURIComponent(producto.codigo)}" class="boton boton-secundario">Ver detalle</a>
                <button type="button" class="boton boton-principal" data-agregar-carrito="${producto.codigo}" ${producto.stock === 0 ? "disabled" : ""}>
                    ${producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
                </button>
                <button type="button" class="boton-favorito" data-favorito="${producto.codigo}" aria-pressed="false">♡</button>
            </div>
        </div>
    `;

    const botonAgregar = tarjeta.querySelector("[data-agregar-carrito]");
    if (botonAgregar) {
        botonAgregar.dataset.carritoDirecto = "true";
        botonAgregar.addEventListener("click", function(evento) {
            evento.preventDefault();
            evento.stopPropagation();

            if (typeof window.agregarAlCarrito !== "function") {
                console.error("NOVA SNEAKERS: la función del carrito no está disponible.");
                return;
            }

            const resultado = window.agregarAlCarrito(producto.codigo, 1);
            if (!resultado.exito && typeof window.mostrarAvisoCarrito === "function") {
                window.mostrarAvisoCarrito(resultado.mensaje);
            }
        });
    }

    return tarjeta;
}

function obtenerTotalPaginas() {
    const pista = document.getElementById("lista-productos");
    return pista ? pista.querySelectorAll(".pagina-carrusel").length : 0;
}

function actualizarCarrusel() {
    const pista = document.getElementById("lista-productos");
    const anterior = document.getElementById("anterior-productos");
    const siguiente = document.getElementById("siguiente-productos");
    const orden = document.getElementById("orden-productos");
    const indicadores = document.getElementById("indicadores-carrusel");
    const totalPaginas = obtenerTotalPaginas();

    if (!pista || totalPaginas === 0) return;

    paginaCarrusel = Math.max(0, Math.min(paginaCarrusel, totalPaginas - 1));
    pista.style.transform = `translate3d(-${paginaCarrusel * 100}%, 0, 0)`;

    // Las flechas siguen disponibles para navegar manualmente.
    anterior.disabled = totalPaginas <= 1;
    siguiente.disabled = totalPaginas <= 1;

    indicadores.innerHTML = "";

    for (let i = 0; i < totalPaginas; i++) {
        const indicador = document.createElement("button");
        indicador.type = "button";
        indicador.className = "indicador-carrusel" + (i === paginaCarrusel ? " activo" : "");
        indicador.setAttribute("aria-label", "Ir a la página " + (i + 1));
        indicador.addEventListener("click", function() {
            paginaCarrusel = i;
            actualizarCarrusel();
            reiniciarAutoplay();
        });
        indicadores.appendChild(indicador);
    }
}

function avanzarCarrusel() {
    const totalPaginas = obtenerTotalPaginas();
    if (totalPaginas <= 1) return;
    if (paginaCarrusel === totalPaginas - 1) {
        const pista = document.getElementById("lista-productos");
        if (pista) {
            pista.style.transition = "none";
            paginaCarrusel = 0;
            actualizarCarrusel();
            requestAnimationFrame(function(){ requestAnimationFrame(function(){ pista.style.transition = ""; }); });
            return;
        }
    }
    paginaCarrusel += 1;
    actualizarCarrusel();
}

function retrocederCarrusel() {
    const totalPaginas = obtenerTotalPaginas();

    if (totalPaginas <= 1) return;

    paginaCarrusel = (paginaCarrusel - 1 + totalPaginas) % totalPaginas;
    actualizarCarrusel();
}

function detenerAutoplay() {
    if (intervaloCarrusel) {
        clearInterval(intervaloCarrusel);
        intervaloCarrusel = null;
    }
}

function iniciarAutoplay() {
    detenerAutoplay();

    if (obtenerTotalPaginas() <= 1) return;

    intervaloCarrusel = setInterval(function() {
        if (!carruselPausado && document.visibilityState === "visible") {
            avanzarCarrusel();
        }
    }, 4500);
}

function reiniciarAutoplay() {
    iniciarAutoplay();
}

function configurarPausaCarrusel() {
    const carrusel = document.querySelector(".carrusel-productos");

    if (!carrusel) return;

    carrusel.addEventListener("mouseenter", function() {
        carruselPausado = true;
    });

    carrusel.addEventListener("mouseleave", function() {
        carruselPausado = false;
    });

    // En pantallas táctiles no dejamos el movimiento automático mientras
    // el usuario está tocando el carrusel.
    carrusel.addEventListener("touchstart", function() {
        carruselPausado = true;
    }, { passive: true });

    carrusel.addEventListener("touchend", function() {
        carruselPausado = false;
        reiniciarAutoplay();
    }, { passive: true });
}

function mostrarProductos() {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) return;

    let productosFiltrados = productos.filter(function(producto) {
        const coincideCategoria = categoriaSeleccionada === "Todos" || producto.categoria === categoriaSeleccionada;
        const coincidePublico = publicoSeleccionado === "Todos" || (producto.publico || "Unisex") === publicoSeleccionado;
        const texto = textoBusqueda.toLowerCase();
        const datosBusqueda = [producto.nombre, producto.codigo, producto.categoria, producto.publico || "Unisex"].join(" ").toLowerCase();
        const coincideBusqueda = datosBusqueda.includes(texto);
        return coincideCategoria && coincidePublico && coincideBusqueda;
    });
    productosFiltrados = productosFiltrados.slice().sort(function(a,b){
        if(ordenCatalogo === "precio-menor") return Number(a.precio)-Number(b.precio);
        if(ordenCatalogo === "precio-mayor") return Number(b.precio)-Number(a.precio);
        if(ordenCatalogo === "stock") return Number(b.stock)-Number(a.stock);
        return a.codigo.localeCompare(b.codigo);
    });

    detenerAutoplay();
    contenedor.innerHTML = "";
    paginaCarrusel = 0;

    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `<div class="estado-vacio-catalogo"><h3>No encontramos productos</h3><p>Prueba con otra búsqueda o categoría.</p></div>`;
        document.getElementById("indicadores-carrusel").innerHTML = "";
        document.querySelectorAll(".flecha-carrusel").forEach(function(boton) { boton.disabled = true; });
        return;
    }

    const visibles = obtenerCantidadVisible();

    for (let inicio = 0; inicio < productosFiltrados.length; inicio += visibles) {
        const pagina = document.createElement("div");
        pagina.className = "pagina-carrusel";

        productosFiltrados.slice(inicio, inicio + visibles).forEach(function(producto) {
            pagina.appendChild(crearTarjetaProducto(producto));
        });

        contenedor.appendChild(pagina);
    }

    actualizarCarrusel();
    iniciarAutoplay();
}

function configurarFiltrosCatalogo() {
    const botones = document.querySelectorAll("[data-categoria]");
    const botonesPublico = document.querySelectorAll("[data-publico]");
    const buscador = document.getElementById("buscar-producto");
    const anterior = document.getElementById("anterior-productos");
    const siguiente = document.getElementById("siguiente-productos");
    const orden = document.getElementById("orden-productos");

    botones.forEach(function(boton) {
        boton.addEventListener("click", function() {
            categoriaSeleccionada = boton.dataset.categoria;
            botones.forEach(function(item) { item.classList.remove("activo"); });
            boton.classList.add("activo");
            mostrarProductos();
        });
    });

    botonesPublico.forEach(function(boton) {
        boton.addEventListener("click", function() {
            publicoSeleccionado = boton.dataset.publico;
            botonesPublico.forEach(function(item) { item.classList.remove("activo"); });
            boton.classList.add("activo");
            mostrarProductos();
        });
    });

    if (buscador) {
        buscador.addEventListener("input", function() {
            textoBusqueda = buscador.value.trim();
            mostrarProductos();
        });
    }
    if (orden) {
        orden.addEventListener("change", function(){ ordenCatalogo=orden.value; mostrarProductos(); });
    }

    if (!anterior || !siguiente) return;

    anterior.addEventListener("click", function() {
        retrocederCarrusel();
        reiniciarAutoplay();
    });

    siguiente.addEventListener("click", function() {
        avanzarCarrusel();
        reiniciarAutoplay();
    });

    let cantidadVisibleAnterior = obtenerCantidadVisible();
    window.addEventListener("resize", function() {
        const cantidadVisibleActual = obtenerCantidadVisible();
        if (cantidadVisibleActual !== cantidadVisibleAnterior) {
            cantidadVisibleAnterior = cantidadVisibleActual;
            mostrarProductos();
        } else {
            actualizarCarrusel();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    configurarFiltrosCatalogo();
    configurarPausaCarrusel();
    mostrarProductos();
});

/* Si el usuario llega desde la lupa del encabezado, enfoca el buscador. */
document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search);
    const buscador = document.getElementById("buscar-producto");
    const publicoUrl = parametros.get("publico");
    if (publicoUrl && ["Unisex", "Mujer", "Niños"].includes(publicoUrl)) {
        publicoSeleccionado = publicoUrl;
        document.querySelectorAll("[data-publico]").forEach(function(boton){
            boton.classList.toggle("activo", boton.dataset.publico === publicoUrl);
        });
        mostrarProductos();
    }
    if (!buscador) return;

    const textoRecibido = parametros.get("q");
    if (textoRecibido) {
        buscador.value = textoRecibido;
        textoBusqueda = textoRecibido.trim();
        mostrarProductos();
        buscador.focus();
        buscador.select();
        return;
    }

    if (parametros.get("buscar") === "1") {
        buscador.focus();
        buscador.select();
    }
});
