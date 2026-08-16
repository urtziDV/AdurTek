# AdurTek - Web Corporativa

Web oficial de **AdurTek**, empresa de productos digitales propios (TeamPlanner, ToolTracker Pro y MundoSubastas.es). Alojada en [adurtek.dev](https://adurtek.dev).

## 🚀 Características

- **Diseño moderno e impactante** con efectos visuales avanzados
- **Animaciones de scroll** (reveal on scroll)
- **Fondo de partículas interactivo** (canvas)
- **Cursor personalizado** con efecto de anillo
- **Glassmorphism** en tarjetas y secciones
- **Gradientes animados** y efectos de brillo
- **Preloader** animado
- **Barra de progreso de scroll**
- **Contadores animados** de estadísticas
- **Efecto tilt 3D** en los mockups de proyectos
- **Totalmente responsive** (móvil, tablet, escritorio)
- **Accesible** (soporta `prefers-reduced-motion`)

## 📁 Estructura del proyecto

```
Adurtek.dev/
├── index.html              # Página principal
├── teamplanner.html        # Página del proyecto TeamPlanner (con licencias B2B)
├── tooltracker.html        # Página del proyecto ToolTracker Pro (con licencias B2B)
├── mundosubastas.html      # Página del proyecto MundoSubastas.es
├── css/
│   ├── styles.css          # Estilos y efectos principales
│   └── projects.css        # Estilos de las páginas de proyectos y licencias B2B
├── js/
│   └── script.js           # Interacciones y animaciones
├── images/
│   └── hero-image.jpg      # Imagen de la sección "Sobre nosotros"
└── README.md
```

## 🛠️ Tecnologías

- HTML5
- CSS3 (variables, grid, flexbox, animaciones, media queries)
- JavaScript vanilla (sin dependencias externas)
- Google Fonts: Space Grotesk + Inter

## 🖥️ Ejecución local

Simplemente abre `index.html` en tu navegador, o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve
```

Luego visita `http://localhost:8000`.

## 🌐 Despliegue en adurtek.dev

Esta web es **estática** (solo HTML, CSS y JS), por lo que se puede desplegar en cualquier hosting estático:

### Opción 1: GitHub Pages
1. Sube el proyecto a un repositorio de GitHub
2. Ve a *Settings → Pages*
3. Selecciona la rama `main` y la carpeta raíz `/`
4. Tu web estará disponible en `https://tu-usuario.github.io/repo`

### Opción 2: Netlify / Vercel
1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. O conecta tu repositorio de GitHub en Vercel
3. Configura el dominio personalizado `adurtek.dev`

### Opción 3: Hosting tradicional (cPanel, etc.)
1. Sube todos los archivos a la carpeta `public_html` o `www`
2. Configura el dominio `adurtek.dev` en tu proveedor DNS

## ✏️ Personalización

- **Colores**: edita las variables CSS en `css/styles.css` (sección `:root`)
- **Proyectos**: modifica las tarjetas en `index.html` (sección `#proyectos`)
- **Contacto**: conecta el formulario en `js/script.js` (función `initContactForm`) con tu backend o servicio de email (Formspree, EmailJS, etc.)
- **Redes sociales**: actualiza los enlaces en la sección de contacto y footer

## 💳 Modelo de precios y licencias

Tanto **TeamPlanner** como **ToolTracker Pro** siguen el mismo modelo de negocio:

- **Starter (gratis)**: versión limitada para empezar, descargable desde Microsoft Store.
- **PRO (99€ de por vida)**: pago único, sin suscripciones. Se compra mediante compra in-app desde la propia app en Microsoft Store.
- **B2B (lotes de licencias)**: venta de lotes de licencias PRO con **descuento por volumen** y facturación personalizada. Se solicita presupuesto desde la web.

### Descuento por volumen (B2B)

El precio por licencia PRO (99€) se ajusta según el número de licencias compradas:

| Nº de licencias | Descuento | Precio por licencia |
|-----------------|-----------|---------------------|
| 1 - 9           | 0%        | 99,00 €             |
| 10 - 49         | 5%        | 94,05 €             |
| 50 - 99         | 10%       | 89,10 €             |
| 100+            | 15%       | 84,15 €             |

### Botones de Microsoft Store

Las tablas de precios de `teamplanner.html` y `tooltracker.html` incluyen botones de **descarga** (Starter) y **compra PRO** que enlazan a la app en Microsoft Store. Sustituye el enlace `https://apps.microsoft.com/detail/TU-APP-ID` por el ID real de cada app.

### Formulario de solicitud B2B

Las páginas de `teamplanner.html` y `tooltracker.html` incluyen un **formulario de solicitud de presupuesto B2B** (sección `#solicitar`) con:

- **Selector de tipo de licencia** (PRO o B2B)
- **Número de licencias** (campo numérico)
- **Cálculo automático del precio** en tiempo real (PRO: 99€ × nº de licencias; B2B: 99€ × nº de licencias con descuento por volumen)
- **Envío por email** (`mailto:`) a `info@adurtek.dev` con todos los datos de la solicitud

### Cómo funciona el envío

Al pulsar "Solicitar presupuesto", se abre el cliente de correo del usuario con un email pre-rellenado dirigido a `info@adurtek.dev`, incluyendo: producto, tipo de licencia, número de licencias, precio estimado, descuento aplicado (si procede), empresa, nombre y email de contacto.

### Personalizar precios y descuentos

El precio base PRO se define en el atributo `data-precio` de cada radio button en el formulario:
- En `teamplanner.html`: PRO `99`, B2B `99`
- En `tooltracker.html`: PRO `99`, B2B `99`

Para cambiar el precio, edita el `data-precio` correspondiente. Los umbrales de descuento por volumen se definen en la función `obtenerDescuento()` de `js/script.js` (función `initLicenciaForm`).

> ⚠️ **Seguridad**: este enfoque no expone ninguna clave secreta. El formulario solo genera un email de solicitud; el pago y la facturación se gestionan posteriormente con el cliente. La compra individual se realiza de forma segura mediante compra in-app en Microsoft Store.

## 📧 Contacto

- Email: info@adurtek.dev
- Web: https://adurtek.dev

---

© AdurTek. Hecho con ❤️ y mucho café.
