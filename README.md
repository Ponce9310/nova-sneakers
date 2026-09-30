# NOVA SNEAKERS — Catálogo y experiencia de compra

Proyecto académico DSY1104.

## Funcionalidades
- Catálogo, búsqueda, filtros y ordenamiento.
- Detalle de producto, stock y control de cantidades.
- Carrito persistente con localStorage y mini-carrito.
- Favoritos con localStorage.
- Registro, login y roles.
- Mi cuenta e historial de pedidos.
- Checkout frontend simulado: contacto, despacho, método de pago simulado y confirmación.
- Administración de productos, usuarios y pedidos.
- Actualización de estado de pedidos para Administrador.
- Blog, Nosotros y Contacto.
- Responsive y validaciones JavaScript.

## Alcance técnico
Esta versión sigue siendo frontend. No realiza pagos reales, no utiliza backend/base de datos y no implementa autenticación de servidor. Los pedidos y usuarios se mantienen con localStorage para la demostración académica.


## Corrección V9.2 — Despacho / Comunas
- El selector de comuna ahora se actualiza al cambiar la región en el checkout.
- La comuna permanece deshabilitada hasta seleccionar una región.
- Si existe una sesión con región y comuna guardadas, ambas se precargan correctamente.
- Se mantiene la validación obligatoria de región y comuna antes de confirmar la compra simulada.

## Actualización V19 — Catálogo ampliado y experiencia de compra

- Catálogo ampliado a 44 productos de demostración: 12 Unisex, 16 Mujer y 16 Niños.
- 12 productos Unisex existentes.
- 12 productos Mujer: 4 Urbanas, 4 Running y 4 Training.
- 16 productos Niños: 4 Urbanas, 4 Running, 4 Basketball y 4 Training.
- Nuevo filtro por colección (Unisex, Mujer, Niños) combinado con filtro por tipo.
- Cada producto incorpora una galería de hasta 3 vistas para la ficha de detalle.
- La ficha de detalle incluye miniaturas, flechas anterior/siguiente, contador y visor ampliado.
- Las colecciones Mujer y Niños usan fotografías de producto en JPG, con versiones principal, detalle y zoom; se eliminaron las maquetas SVG de esos productos.
- El carrito, favoritos, stock, checkout, pedidos y administración continúan utilizando el mismo código de producto y localStorage.
- Los productos existentes mantienen su imagen principal y reciben vistas adicionales sin perder la información de stock o precio almacenada previamente.

## Actualización V18 — Colección Niños completa

- Catálogo actualizado a 44 productos: 12 Unisex, 16 Mujer y 16 Niños.
- Niños ahora incluye 4 Urbanas, 4 Running, 4 Basketball y 4 Training.
- Se reemplazaron las imágenes repetidas de Niños por fotografías de producto diferenciadas para cada modelo.
- Se incorporaron Nova Kids Power, Move, Active y Flex en Training.
- Cada nuevo producto cuenta con imagen principal, detalle y zoom.
