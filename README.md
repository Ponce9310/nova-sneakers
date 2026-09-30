# NOVA SNEAKERS — Catálogo y experiencia de compra

NOVA SNEAKERS es una tienda web de zapatillas desarrollada con **HTML5, CSS3 y JavaScript**, enfocada en ofrecer una experiencia de navegación, consulta de productos y simulación de compra desde el navegador.

El proyecto integra catálogo de productos, detalle de producto, carrito de compras, favoritos, autenticación, gestión de cuenta, pedidos, administración, blog y formularios de contacto.

## Descripción

La aplicación presenta un catálogo organizado por público y tipo de zapatilla, permitiendo al usuario explorar productos, revisar sus características, agregarlos al carrito y completar un flujo de compra simulado.

La persistencia de la información funcional se realiza mediante **localStorage**, por lo que el proyecto funciona desde el navegador y no requiere un servidor, backend o base de datos externa.

## Funcionalidades principales

- Catálogo dinámico de **44 productos**.
- Productos distribuidos en:
  - **Unisex:** 12 productos.
  - **Mujer:** 16 productos.
  - **Niños:** 16 productos.
- Tipos de producto:
  - Urbanas.
  - Running.
  - Basketball.
  - Training.
- Búsqueda y filtrado de productos.
- Vista de detalle de cada producto.
- Selección de talla y color.
- Carrito de compras con persistencia mediante `localStorage`.
- Sistema de favoritos.
- Registro e inicio de sesión.
- Validaciones de formularios mediante JavaScript.
- Gestión de cuenta e historial de pedidos.
- Flujo de checkout y confirmación de compra simulado.
- Generación de identificadores para los pedidos.
- Panel de administración.
- Gestión de productos.
- Gestión de usuarios.
- Gestión y consulta de pedidos.
- Funcionalidades diferenciadas según el rol del usuario.
- Sección de blog.
- Página informativa "Nosotros".
- Formulario de contacto con validaciones.
- Diseño responsive.
- Navegación entre las distintas páginas del sitio.
- Integración de imágenes y recursos multimedia.

## Roles del sistema

### Visitante

Puede navegar por el sitio, consultar el catálogo, revisar productos, acceder al blog y utilizar las secciones informativas.

### Cliente

Puede registrarse, iniciar sesión, gestionar su cuenta, utilizar favoritos, administrar su carrito y realizar compras simuladas.

### Vendedor

Dispone de funciones orientadas a la consulta y gestión operativa de productos y pedidos según los permisos definidos en la aplicación.

### Administrador

Cuenta con acceso a las funciones administrativas del sistema, incluyendo la gestión de productos, usuarios y pedidos.

## Tecnologías utilizadas

- **HTML5:** estructura y contenido de las páginas.
- **CSS3:** estilos, diseño visual y adaptación responsive.
- **JavaScript:** lógica de interacción, catálogo, carrito, favoritos, autenticación, validaciones, pedidos y administración.
- **localStorage:** persistencia de información en el navegador.
- **GitHub:** repositorio remoto y trabajo colaborativo del código fuente.

## Estructura del proyecto

```text
NOVA-SNEAKERS/
│
├── admin/
│   ├── index.html
│   ├── productos.html
│   ├── pedidos.html
│   ├── pedido-detalle.html
│   └── usuarios.html
│
├── css/
│   └── estilos.css
│
├── img/
│   └── productos/
│
├── js/
│   ├── admin.js
│   ├── admin-productos.js
│   ├── admin-usuarios.js
│   ├── blog.js
│   ├── carrito.js
│   ├── carrito-pagina.js
│   ├── checkout.js
│   ├── contacto.js
│   ├── cuenta.js
│   ├── detalle.js
│   ├── favoritos.js
│   ├── favoritos-pagina.js
│   ├── header.js
│   ├── inicio.js
│   ├── menu.js
│   ├── pedidos.js
│   ├── productos.js
│   ├── usuarios.js
│   └── validaciones.js
│
├── video/
│
├── index.html
├── productos.html
├── detalle.html
├── carrito.html
├── checkout.html
├── favoritos.html
├── login.html
├── registro.html
├── cuenta.html
├── nosotros.html
├── contacto.html
├── blog.html
├── blog-detalle.html
└── README.md
