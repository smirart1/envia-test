# EcartPay Test

## Descripcion

Aplicación web desarrollada con Vue 3 y Vite, que permite a los usuarios explorar un catálogo de productos, agregarlos a un carrito de compras, calcular el costo de envío y generar guías de envío.
La interfaz está diseñada con Vuetify y utiliza Pinia para la gestión global del estado.

## Tecnologías utilizadas

- **Vue 3** + **Vite**
- **TypeScript**
- **Pinia** (gestión de estado)
- **Vuetify** (UI y estilos)
- **ESLint** y **Prettier** (formateo y linting)

## Instalación

### Clonar el repositorio

```bash
git clone https://github.com/smirart1/envia-test.git
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

Este proyecto requiere un archivo `.env` en la raíz con las configuraciones necesarias para el consumo de la API. Este archivo estará adjunto en el correo original con la liga del repositorio.

### Ejecutar en desarrollo

```bash
npm run dev
```

## Características

### 1. Página de Productos

- Muestra un listado de productos obtenidos desde la API.

### 2. Vista de Detalle de Producto

- Al hacer clic en un producto, se muestra mas informacion del producto.
- Desde esta vista, se puede **agregar el producto al carrito**.

### 3. Carrito de Compras

- Visualiza los productos agregados.
- Permite eliminar productos y actualizar cantidades.

### 4. Envío y Generación de Guía

- Segunda tab del carrito: formulario para **cotizar envío**.
- Tercera tab: genera una **guía descargable** con la información proporcionada.
