# Pasodoble Run — Landing Page

Landing page para Pasodoble Run: fisioterapia, entrenamiento de fuerza, running y coaching en Caracas, Venezuela. Construida con Next.js 15 (export estático) + Tailwind CSS 4. Desplegable en Cloudflare Pages sin backend.

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Arrancar servidor de desarrollo
npm run dev
# → http://localhost:3000

# Build de producción (genera /out)
npm run build
```

> **Requisito:** Node.js 18+. El proyecto usa `output: "export"` — no hay servidor Node en producción.

---

## Configuración inicial

### 1. Número de WhatsApp y correo

Edita `src/data/site.ts`:

```ts
export const site = {
  whatsappNumber: "584120000000",  // formato internacional, sin + ni espacios
  email: "hola@pasodoblerun.com",
  url: "https://pasodoblerun.com",
  instagram: "https://instagram.com/pasodoblerun",
};
```

### 2. Web3Forms (email de contacto)

1. Regístrate gratis en [web3forms.com](https://web3forms.com) con tu correo destino.
2. Copia tu **Access Key**.
3. En `src/data/site.ts`, pon la clave en `web3formsKey`.
4. En Cloudflare Pages → Settings → Environment Variables, agrega:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=tu_access_key
   ```
   O cambia el string directo en `site.ts` (la key es pública por diseño).

---

## Agregar un post al foro

Crea un archivo `.mdx` en `content/posts/`:

```mdx
---
title: "Título del artículo"
slug: "titulo-del-articulo"
date: "2026-07-01"
category: "fuerza"         # fuerza | running | fisioterapia
instagramUrl: "https://instagram.com/p/XXXXXX"
cover: "/posts/mi-imagen.jpg"
excerpt: "Resumen de 1-2 frases que aparece en la tarjeta del foro."
references:
  - "Autor et al., 2024. Título. Revista, volumen(número), páginas."
---

Contenido del artículo en **Markdown**. Puedes usar encabezados, listas, negritas, etc.
```

Luego coloca la imagen de portada en `public/posts/mi-imagen.jpg` y vuelve a hacer `npm run build`. El post aparecerá automáticamente en `/foro/` y tendrá su URL en `/foro/titulo-del-articulo/`.

Categorías disponibles: `fuerza`, `running`, `fisioterapia`.

---

## Agregar una reseña

Las reseñas son estáticas — el cliente las aprueba y agrega manualmente.

Edita `src/data/reviews.ts` y agrega un objeto al array:

```ts
{
  name: "María G.",
  program: "running",          // fuerza | running | fisioterapia | coaching
  text: "Texto de la reseña...",
  rating: 5,
  avatar: "/avatars/maria.jpg",  // o una URL externa
}
```

El formulario del sitio envía las reseñas al correo configurado en Web3Forms para revisión previa.

---

## Personalizar imágenes y videos

- **Video del hero:** cambia la URL en `src/data/media.ts` → `heroVideo`. Acepta cualquier URL directa a un `.mp4` o un archivo en `public/`.
- **Fotos de servicios / nosotros / foro:** actualiza las URLs en `src/data/services.ts`, `src/components/sections/About.tsx` y los frontmatters de los posts.
- **Logo:** reemplaza el texto de Navbar/Footer con un `<img>` apuntando a `public/logo.svg`.

---

## Despliegue en Cloudflare Pages

1. Sube el repo a GitHub.
2. En [Cloudflare Pages](https://pages.cloudflare.com/) → Create a project → Connect to Git.
3. Selecciona el repo.
4. Configura el build:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Node.js version:** 18 (en Environment Variables: `NODE_VERSION = 18`)
5. Agrega variables de entorno si usas Web3Forms:
   - `NEXT_PUBLIC_WEB3FORMS_KEY` = tu access key
6. Dominio custom: Settings → Custom Domains → agrega tu dominio y apunta el DNS a Cloudflare.

---

## Estructura del proyecto

```
src/
  app/                  # Rutas (App Router)
    page.tsx            # Home
    foro/page.tsx       # Índice del foro
    foro/[slug]/        # Post individual
  components/
    layout/             # Navbar, Footer, WhatsAppFAB, LenisProvider
    sections/           # Hero, Methodology, Services, Reviews, About, Contact, ForumPreview
    ui/                 # Button, Card, Accordion, MindMap, ReviewCarousel, VideoEmbed
    motion/             # Reveal, StaggerGroup, Counter
  data/                 # Contenido estático (site, services, reviews, faq, etc.)
  lib/                  # posts.ts (server), post-types.ts (shared), whatsapp.ts
  styles/globals.css    # Tokens de diseño y utilidades globales
content/posts/          # Artículos MDX del foro
public/                 # Imágenes, fuentes, etc.
```

---

## Checklist de contenido pendiente (del cliente)

- [ ] Logo en SVG/PNG (claro y oscuro)
- [ ] Número de WhatsApp definitivo (formato `58XXXXXXXXXX`)
- [ ] Correo de destino para Web3Forms
- [ ] Bio, foto y credenciales del profesional
- [ ] Misión, visión y valores
- [ ] Video del hero (mp4 o YouTube) y videos de metodología
- [ ] 2–3 posts científicos con referencias e imagen de portada
- [ ] Testimonios reales (nombre, programa, texto, foto, rating)
- [ ] Fotos de sesiones y entrenamientos (con permiso de los atletas)
- [ ] Handle de Instagram y otras redes
