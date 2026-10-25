<<<<<<< HEAD
# GESIC Perú — landing page

Landing page corporativa desarrollada con React, TypeScript, Vite y Tailwind CSS, preparada para publicarse en Cloudflare Pages.

## Requisitos

- Node.js LTS (incluye npm).
- Visual Studio Code (recomendado).
- Conexión a internet para instalar dependencias y cargar las fuentes de Google.

## Ejecutar en Windows

1. Descomprime la carpeta del proyecto.
2. Abre `gesic-web` desde Visual Studio Code.
3. Abre **Terminal → New Terminal**.
4. Ejecuta:

```bash
npm install
npm run dev
```

5. Abre la URL que muestre Vite, normalmente `http://localhost:5173`.

Para detener el servidor local, presiona `Ctrl + C` en la terminal.

## Compilar para producción

```bash
npm run build
npm run preview
```

Vite genera la web final en `dist/`. La carpeta `dist/` es la que debe publicarse; no subas `node_modules`.

## Personalizar el contenido

- Datos comerciales y servicios: `src/data/content.ts`.
- Componentes de la página: `src/App.tsx`.
- Estilos responsive y colores: `src/styles.css`.
- Metadatos SEO: `index.html`.
- Favicon: `public/favicon.svg`.
- Política de privacidad (borrador pendiente de revisión): `public/politica-de-privacidad.html`.

### Imágenes

Coloca tus imágenes en `public/images/` usando estos nombres para reemplazar las imágenes provisionales:
- `condominio-hero.jpg`
- `condominio-comunes.jpg`
- `gestion-financiera.jpg`
- `tablero-electrico.jpg`
- `junta-directiva.jpg`
- `areas-verdes.jpg`

Los espacios de galería y perfiles de equipo están diseñados para no presentar imágenes provisionales como proyectos o retratos reales. El hero y la imagen de “Nosotros” requieren fotografía local para mostrar una imagen; si todavía no la tienes, puedes colocar imágenes de stock con licencia comercial adecuada y sustituirlas después.

### Logotipo

El encabezado usa una marca tipográfica provisional y un icono genérico. No es el logotipo oficial de GESIC. Cuando tengas el archivo original, incorpóralo en `public/` y reemplaza el componente `Logo` en `src/App.tsx`.

### WhatsApp

El enlace está desactivado de forma predeterminada. Cuando GESIC confirme el número oficial que utiliza WhatsApp Business, edita `whatsappNumber` en `src/data/content.ts` con el número internacional solo con dígitos, por ejemplo `51XXXXXXXXX`, sin `+`, espacios ni guiones. Comprueba que la cuenta sea correcta antes de publicar.

### Formulario

El formulario valida los campos del navegador y prepara un correo usando `mailto:`. **No envía los datos automáticamente ni confirma que el correo se haya enviado**: la persona debe revisar y enviar el mensaje en su aplicación de correo.

La política de privacidad incluida es solo un borrador estructural. Completa y valida el texto legal antes de recopilar datos reales. Si quieres un formulario web que envíe directamente sin abrir la aplicación de correo, tendrás que conectar y probar un servicio de formularios o un backend; este proyecto no simula esa integración.

## Publicar gratis en Cloudflare Pages con GitHub

1. Crea una cuenta en GitHub y crea un repositorio para el proyecto.
2. Sube los archivos del proyecto, sin `node_modules` ni `dist`.
3. En Cloudflare abre **Workers & Pages → Create application → Pages → Connect to Git**.
4. Autoriza GitHub y selecciona el repositorio.
5. Configura:
   - Framework preset: `Vite` (si aparece) o `None`.
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: dejar vacío si `package.json` está en la raíz del repositorio.
6. Pulsa Deploy. Cloudflare mostrará una URL `*.pages.dev`.
7. Prueba la web en escritorio y móvil antes de conectar el dominio.

También puedes desplegar directamente la carpeta `dist` con la opción de carga directa de Pages, pero no obtendrás el mismo flujo automático de compilación desde Git.

## Conectar `gesicperu.com` comprado en GoDaddy

1. En Cloudflare, agrega `gesicperu.com` como sitio y sigue el asistente.
2. Antes de cambiar DNS, revisa los registros existentes en GoDaddy. Si el correo corporativo está activo, conserva y verifica los registros MX, SPF, DKIM y DMARC que correspondan.
3. Cloudflare mostrará los nameservers asignados al dominio. En GoDaddy, abre la administración del dominio y reemplaza los nameservers actuales por los indicados por Cloudflare.
4. Espera a que Cloudflare confirme que la zona está activa.
5. En tu proyecto Pages, abre **Custom domains → Set up a domain** y agrega `gesicperu.com`. Sigue cualquier indicación que muestre el panel.
6. Si también quieres que funcione `www.gesicperu.com`, agrégalo como dominio personalizado y configura el redireccionamiento preferido si lo necesitas.
7. Prueba HTTPS, la versión con `www`, la versión sin `www` y el correo corporativo.

No elimines registros de correo ni cambies nameservers hasta tener identificados los registros actuales. La interfaz puede cambiar; sigue las instrucciones actuales de Cloudflare y GoDaddy.

## Checklist previo a producción

- [ ] Reemplazar la marca provisional por el logotipo oficial.
- [ ] Añadir fotografías autorizadas y con licencia comercial.
- [ ] Confirmar el número de WhatsApp, si se usará.
- [ ] Revisar datos de contacto y contenido de servicios.
- [ ] Completar y validar la política de privacidad.
- [ ] Ejecutar `npm run build` sin errores.
- [ ] Probar el formulario y comprobar que el comportamiento de `mailto:` está claro.
- [ ] Revisar en móvil, teclado y navegador.
- [ ] Confirmar que el DNS del correo corporativo se conserva al conectar el dominio.
- [ ] Verificar metadatos, favicon, enlaces y SEO en el sitio publicado.

## Estructura

```text
gesic-web/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── politica-de-privacidad.html
│   └── images/
├── src/
│   ├── components/
│   ├── data/
│   │   └── content.ts
│   ├── assets/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
└── vite.config.ts
```

Nota: se incluyen carpetas `components/` y `assets/` para organizar futuras extracciones de componentes y recursos; la implementación inicial mantiene las secciones en `App.tsx` y el contenido editable en `src/data/content.ts`.
=======
# gesiclandingweb
>>>>>>> 1bcbea6bef8828489f325f47a3ada0b0763bc9cf
