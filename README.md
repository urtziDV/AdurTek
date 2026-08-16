# AdurTek - Web Corporativa

Web oficial de **AdurTek**, estudio de desarrollo de aplicaciones y webs. Alojada en [adurtek.dev](https://adurtek.dev).

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

## 💳 Solicitud de licencias B2B

Las páginas de `teamplanner.html` y `tooltracker.html` incluyen un **formulario de solicitud de licencias** (sección `#solicitar`) con:

- **Selector de plan** (tarjetas seleccionables)
- **Número de licencias** (campo numérico)
- **Cálculo automático del precio** en tiempo real según plan y nº de licencias
- **Envío por email** (`mailto:`) a `info@adurtek.dev` con todos los datos de la solicitud

### Cómo funciona el envío

Al pulsar "Solicitar licencias", se abre el cliente de correo del usuario con un email pre-rellenado dirigido a `info@adurtek.dev`, incluyendo: producto, plan, número de licencias, precio estimado, empresa, nombre y email de contacto.

### Personalizar precios

Los precios por plan se definen en el atributo `data-precio` de cada radio button en el formulario:
- En `teamplanner.html`: Starter `0`, Professional `9.99`, Enterprise `0` (a medida)
- En `tooltracker.html`: Básico `49`, Profesional `99`, Enterprise `0` (a medida)

Para cambiar un precio, edita el `data-precio` correspondiente. El cálculo (precio × nº de licencias) se realiza automáticamente en `js/script.js` (función `initLicenciaForm`).

> ⚠️ **Seguridad**: este enfoque no expone ninguna clave secreta. El formulario solo genera un email de solicitud; el pago y la facturación se gestionan posteriormente con el cliente. Si más adelante quieres cobro automático, puedes sustituir el `mailto:` por links de pago de Stripe/PayPal (también seguros, sin claves en el repo).

## 📧 Contacto

- Email: info@adurtek.dev
- Web: https://adurtek.dev

---

© AdurTek. Hecho con ❤️ y mucho café.
