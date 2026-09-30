// ==============================
// NOVA SNEAKERS - PEDIDOS
// ==============================

const CLAVE_PEDIDOS = "novaSneakersPedidos";

const pedidosIniciales = [
    {
        numero: "PED-001",
        fecha: "15/09/2026",
        cliente: "Cliente Demo 1",
        estado: "Preparando",
        total: 129980,
        productos: [
            { codigo: "NS-001", nombre: "Nova Air Street", cantidad: 1, precio: 59990 },
            { codigo: "NS-002", nombre: "Nova Runner Pro", cantidad: 1, precio: 69990 }
        ]
    },
    {
        numero: "PED-002",
        fecha: "16/09/2026",
        cliente: "Cliente Demo 2",
        estado: "Pendiente",
        total: 79990,
        productos: [
            { codigo: "NS-003", nombre: "Nova Court X", cantidad: 1, precio: 79990 }
        ]
    },
    {
        numero: "PED-003",
        fecha: "17/09/2026",
        cliente: "Cliente Demo 3",
        estado: "Entregado",
        total: 114980,
        productos: [
            { codigo: "NS-005", nombre: "Nova Street One", cantidad: 1, precio: 54990 },
            { codigo: "NS-008", nombre: "Nova Training Plus", cantidad: 1, precio: 68990 }
        ]
    }
];

function obtenerPedidos() {
    const guardado = localStorage.getItem(CLAVE_PEDIDOS);

    if (!guardado) {
        localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidosIniciales));
        return [...pedidosIniciales];
    }

    try {
        const pedidos = JSON.parse(guardado);
        return Array.isArray(pedidos) ? pedidos : [...pedidosIniciales];
    } catch (error) {
        return [...pedidosIniciales];
    }
}

function buscarPedido(numero) {
    return obtenerPedidos().find(function(pedido) {
        return pedido.numero === numero;
    });
}

function mostrarPedidos(filtroEstado) {
    const contenedor = document.getElementById("lista-pedidos");
    if (!contenedor) return;

    const pedidos = obtenerPedidos().filter(function(pedido) {
        return !filtroEstado || filtroEstado === "Todos" || pedido.estado === filtroEstado;
    });

    if (pedidos.length === 0) {
        contenedor.innerHTML = '<div class="estado-vacio"><h3>No hay pedidos para mostrar</h3><p>Prueba con otro estado.</p></div>';
        return;
    }

    contenedor.innerHTML = pedidos.map(function(pedido) {
        return `
            <article class="fila-admin fila-pedido">
                <div><strong>${escaparHTML(pedido.numero)}</strong><span>${escaparHTML(pedido.fecha)}</span></div>
                <div><strong>Cliente</strong><span>${escaparHTML(pedido.cliente)}</span></div>
                <div><strong>Estado</strong><span class="estado-pedido">${escaparHTML(pedido.estado)}</span></div>
                <div><strong>Total</strong><span>${formatearPrecio(pedido.total)}</span></div>
                <div><a class="boton boton-secundario boton-pequeno" href="pedido-detalle.html?numero=${encodeURIComponent(pedido.numero)}">Ver detalle</a></div>
            </article>
        `;
    }).join("");
}


function guardarPedidos(pedidos){ localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos)); }
function actualizarEstadoPedido(numero, nuevoEstado){
    const pedidos=obtenerPedidos();
    const indice=pedidos.findIndex(function(p){return p.numero===numero;});
    if(indice===-1) return {exito:false,mensaje:"No se encontró el pedido."};
    pedidos[indice].estado=nuevoEstado;
    guardarPedidos(pedidos);
    return {exito:true,mensaje:"Estado actualizado correctamente."};
}
