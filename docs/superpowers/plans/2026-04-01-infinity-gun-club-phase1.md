# Infinity Gun Club — Plan de Implementación Fase 1 (MVP)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir el sitio web completo de Infinity Gun Club (homepage + 3 landing pages + páginas adicionales + bilingüismo ES/EN) desplegado automáticamente en Netlify + GitHub Pages.

**Architecture:** Astro 5 con React Islands mínimas (solo BookingForm y LanguageToggle). Datos de contenido separados en `src/data/es/` y `src/data/en/` para mantener los componentes bilingües sin duplicación. Todo el contenido por encima del fold renderiza como HTML estático puro — cero JS en el cliente salvo las islands.

**Tech Stack:** Astro 5, Tailwind CSS, React 19 (islands), Google Fonts (Bebas Neue + Inter), Netlify, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-04-01-infinity-gun-club-design.md`

**Skills disponibles:** `frontend-design`, `commit`, `create-pr`, `web-artifacts-builder`
**Plugins activos:** Canva (assets), Telegram (notificaciones)
**Agentes del proyecto:** Pixel (Frontend), Bolt (Forms), Atlas (QA/Lighthouse)

---

## Estructura de Archivos

```
INFINTY GUN CLUB/
├── src/
│   ├── layouts/
│   │   └── Layout.astro              # Layout base: <head>, schema, GA4, fuentes
│   ├── components/
│   │   ├── NavBar.astro              # Nav desktop/tablet + mobile bottom tab
│   │   ├── Footer.astro              # Footer 4 col (desktop) / 2 col (tablet) / 1 col (mobile)
│   │   ├── StickyCTA.astro           # CTA amarilla sticky mobile (bottom: 56px)
│   │   ├── Hero.astro                # Video + fallback imagen + headline + CTAs
│   │   ├── ValueProps.astro          # 3 columnas: Seguridad / Adrenalina / Instructores
│   │   ├── HowItWorks.astro          # 4 pasos lineales
│   │   ├── SocialProof.astro         # Stars + conteo reviews + logos empresas
│   │   ├── Segments.astro            # 3 tarjetas de segmentos con CTAs
│   │   ├── Gallery.astro             # Grid de fotos instalaciones
│   │   ├── FAQ.astro                 # Accordion + FAQPage schema
│   │   ├── TrustSignals.astro        # Certificaciones + urgencia + CTA final
│   │   ├── ContactMap.astro          # Google Maps embed + info de contacto
│   │   ├── BookingForm.jsx           # React island: form 3 pasos (Netlify Forms)
│   │   └── LanguageToggle.jsx        # React island: ES/EN toggle con localStorage
│   ├── pages/
│   │   ├── index.astro               # Homepage ES
│   │   ├── civiles.astro             # Landing civiles ES
│   │   ├── corporativo.astro         # Landing corporativo ES
│   │   ├── gobierno.astro            # Landing gobierno ES
│   │   ├── instalaciones.astro       # Galería ES
│   │   ├── reservas.astro            # Página de reserva ES
│   │   ├── contacto.astro            # Página de contacto ES
│   │   ├── blog/[slug].astro         # Blog ES (placeholder Fase 1)
│   │   ├── en/
│   │   │   ├── index.astro           # Homepage EN
│   │   │   ├── civilians.astro       # Landing civiles EN
│   │   │   ├── corporate.astro       # Landing corporativo EN
│   │   │   ├── government.astro      # Landing gobierno EN
│   │   │   ├── facilities.astro      # Galería EN
│   │   │   ├── booking.astro         # Página de reserva EN
│   │   │   ├── contact.astro         # Página de contacto EN
│   │   │   └── blog/[slug].astro     # Blog EN (placeholder Fase 1)
│   │   └── 404.astro                 # Error 404 personalizado
│   ├── data/
│   │   ├── es/
│   │   │   ├── nav.ts                # Links de navegación ES
│   │   │   ├── home.ts               # Textos homepage ES (hero, props, FAQ, etc.)
│   │   │   └── segments.ts           # Datos de las 3 landing pages ES
│   │   └── en/
│   │       ├── nav.ts                # Links de navegación EN
│   │       ├── home.ts               # Textos homepage EN
│   │       └── segments.ts           # Datos de las 3 landing pages EN
│   └── styles/
│       └── global.css                # Variables CSS + reset + fuentes base
├── public/
│   ├── Logo/LOGO.PNG                 # Logo original (ya existe)
│   ├── logo.webp                     # Logo convertido (crear en Task 3)
│   ├── robots.txt
│   └── _headers                      # Cache-Control headers para Netlify
├── .github/
│   └── workflows/
│       └── deploy.yml                # Build + deploy dual Netlify + GitHub Pages
├── CLAUDE.md                         # Instrucciones del proyecto para Claude Code
├── docs/
│   ├── errors-learned.md             # Bitácora de errores
│   └── superpowers/
│       ├── specs/                    # (ya existe)
│       └── plans/                    # (este archivo)
├── astro.config.mjs                  # i18n, React, image, site URL
├── tailwind.config.mjs               # Tokens de color + tipografía
├── tsconfig.json
├── netlify.toml                      # Redirects + headers + build config
├── package.json
└── .gitignore
```

---

## Task 1: Inicializar proyecto Astro + instalar dependencias

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`

- [ ] **Step 1: Inicializar Astro en la carpeta del proyecto**

```bash
cd "/c/Users/MIPC/Desktop/DESARROLLOS/INFINTY GUN CLUB"
npm create astro@latest . -- --template minimal --typescript strict --no-git --install
```

Cuando pregunte si desea instalar, responde `y`. Cuando pregunte sobre git, `n` (el repo ya existe).

- [ ] **Step 2: Instalar integraciones y dependencias**

```bash
npm install @astrojs/react @astrojs/tailwind @astrojs/sitemap
npm install react react-dom
npm install -D tailwindcss @tailwindcss/typography
```

- [ ] **Step 3: Verificar que Astro arranca**

```bash
npm run dev
```

Esperado: servidor en `http://localhost:4321` sin errores.

- [ ] **Step 4: Commit base**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json
git commit -m "feat: inicializar proyecto Astro 5 con React + Tailwind"
```

---

## Task 2: Configurar Astro, Tailwind y archivos raíz

**Files:**
- Modify: `astro.config.mjs`
- Create: `tailwind.config.mjs`, `netlify.toml`, `.gitignore`, `public/robots.txt`, `public/_headers`

- [ ] **Step 1: Configurar `astro.config.mjs`**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://infinitygunclub.netlify.app',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-PA', en: 'en-US' } } }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  image: { domains: [] },
  compressHTML: true,
  build: { format: 'directory' },
});
```

- [ ] **Step 2: Configurar `tailwind.config.mjs`**

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:   '#FFD700',
        'primary-dark': '#FFC000',
        black:     '#000000',
        bg:        '#0D0D0D',
        surface:   '#1A1A1A',
        muted:     '#888888',
        body:      '#E8E8E8',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tactical: '0.25em',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Crear `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/en"
  to = "/en/"
  status = 301

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

- [ ] **Step 4: Crear `.gitignore`**

```gitignore
node_modules/
dist/
.env
.env.local
.astro/
.superpowers/
*.log
.DS_Store
Thumbs.db
```

- [ ] **Step 5: Crear `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://infinitygunclub.netlify.app/sitemap-index.xml
```

- [ ] **Step 6: Crear `public/_headers`**

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=86400

/*.js
  Cache-Control: public, max-age=86400
```

- [ ] **Step 7: Crear `src/styles/global.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: #FFD700;
    --color-primary-dark: #FFC000;
    --color-black: #000000;
    --color-bg: #0D0D0D;
    --color-surface: #1A1A1A;
    --color-muted: #888888;
    --color-body: #E8E8E8;
  }

  html { background-color: #0D0D0D; scroll-behavior: smooth; }
  body { color: #E8E8E8; font-family: 'Inter', system-ui, sans-serif; }

  /* Scrollbar táctica */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0D0D0D; }
  ::-webkit-scrollbar-thumb { background: #FFD700; }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-black font-black uppercase tracking-tactical
           px-6 py-3 text-sm transition-colors hover:bg-primary-dark
           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg;
  }
  .btn-outline {
    @apply border-2 border-primary text-primary font-bold uppercase tracking-tactical
           px-6 py-3 text-sm transition-colors hover:bg-primary hover:text-black
           focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg;
  }
  .section-tag {
    @apply text-primary font-bold uppercase tracking-tactical text-xs
           border-l-2 border-primary pl-3;
  }
  .section-title {
    @apply font-display text-4xl md:text-5xl text-white tracking-wide uppercase;
  }
}
```

- [ ] **Step 8: Verificar que el build funciona**

```bash
npm run build
```

Esperado: carpeta `dist/` generada sin errores.

- [ ] **Step 9: Commit**

```bash
git add astro.config.mjs tailwind.config.mjs netlify.toml .gitignore public/robots.txt public/_headers src/styles/global.css
git commit -m "feat: configurar Astro, Tailwind, Netlify y archivos base"
```

---

## Task 3: Crear CLAUDE.md, bitácora y archivos del proyecto

**Files:**
- Create: `CLAUDE.md`, `docs/errors-learned.md`

- [ ] **Step 1: Crear `CLAUDE.md`**

```markdown
# CLAUDE.md — Infinity Gun Club

## Proyecto
Sitio web comercial para el polígono de tiro y armería más grande de Panamá.
- **Repo:** https://github.com/abrinay1997-stack/INFINYGUNCLUB.git
- **Deploy primario:** https://infinitygunclub.netlify.app
- **Deploy backup:** https://abrinay1997-stack.github.io/INFINYGUNCLUB

## Stack
- **Framework:** Astro 5 + React Islands (solo BookingForm y LanguageToggle)
- **Estilos:** Tailwind CSS (ver `tailwind.config.mjs`)
- **Fuentes:** Bebas Neue (display) + Inter (body) — Google Fonts
- **Hosting:** Netlify (primaria) + GitHub Pages (backup)

## Comandos
```bash
npm run dev      # Servidor local en localhost:4321
npm run build    # Build de producción → /dist
npm run preview  # Preview del build en localhost:4321
```

## Agentes del Proyecto
| Agente | Rol | Dominio |
|--------|-----|---------|
| **Pixel** | Frontend/Astro | Componentes, páginas, estilos, responsive |
| **Bolt** | Backend/Forms | BookingForm, validaciones, Netlify Forms |
| **Atlas** | QA | Lighthouse, Core Web Vitals, accesibilidad |

## Skills Disponibles
- `frontend-design` — Diseño de componentes UI
- `web-artifacts-builder` — Construir artefactos web
- `seo-audit` — Auditoría SEO
- `commit` — Commits con convención de mensajes
- `create-pr` — Crear Pull Requests
- `simplify` — Simplificar código

## Plugins Activos
- **Canva** — Para crear/exportar assets gráficos
- **Telegram** — Notificaciones al desarrollador

## Protocolo Multi-Agente
- SIEMPRE leer el archivo antes de modificarlo
- Debate con especialistas antes de cambios no triviales (>3 archivos)
- Un agente, un dominio (no mezclar frontend + backend)
- Verificar `npm run build` al terminar cada tarea
- Registrar errores en `docs/errors-learned.md`

## Estructura Clave
- `src/data/es/` y `src/data/en/` — Contenido bilingüe (NO duplicar componentes)
- `src/components/` — Componentes Astro (estáticos) y React Islands (interactivos)
- `src/pages/en/` — Rutas en inglés (español es el default en `/`)
- `public/` — Assets estáticos (logo, robots.txt, _headers)

## Colores (Tailwind)
- `primary` = #FFD700 (amarillo táctico)
- `bg` = #0D0D0D (fondo principal)
- `surface` = #1A1A1A (cards)

## Bitácora de Errores
Ver: `docs/errors-learned.md`

## Spec de Diseño
Ver: `docs/superpowers/specs/2026-04-01-infinity-gun-club-design.md`
```

- [ ] **Step 2: Crear `docs/errors-learned.md`**

```markdown
# Bitácora de Errores — Infinity Gun Club

> Registrar SOLO errores que requirieron investigación (no typos).
> NUNCA sobreescribir entradas — solo añadir al final.

---

## Formato de Entrada

```
## [YYYY-MM-DD] — Título breve del error
**Contexto:** Qué se estaba haciendo.
**Error:** Mensaje exacto o síntoma.
**Causa raíz:** Por qué ocurrió.
**Fix aplicado:** Qué cambio exacto resolvió el problema.
**Prevención:** Regla o patrón a seguir en el futuro.
**Archivos:** `ruta/archivo.ts:L42`
```

---

<!-- Las entradas de errores van aquí abajo -->
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md docs/errors-learned.md
git commit -m "docs: agregar CLAUDE.md y bitácora de errores"
```

---

## Task 4: Crear Layout base

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: Crear `src/layouts/Layout.astro`**

```astro
---
// src/layouts/Layout.astro
export interface Props {
  title: string;
  description: string;
  lang?: 'es' | 'en';
  canonicalUrl?: string;
  ogImage?: string;
  hreflangEs?: string;
  hreflangEn?: string;
}

const {
  title,
  description,
  lang = 'es',
  canonicalUrl = Astro.url.href,
  ogImage = '/og-default.jpg',
  hreflangEs,
  hreflangEn,
} = Astro.props;

// Importar CSS global en el frontmatter (correcto en Astro — no usar @import en <style>)
import '../styles/global.css';

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  "name": "INFINITY GUN CLUB",
  "description": "El polígono de tiro más grande de Panamá. Experiencias para civiles, empresas e instituciones.",
  "url": "https://infinitygunclub.netlify.app",
  "telephone": "PENDIENTE",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PA",
    "addressLocality": "Panama City"
  },
  "image": "https://infinitygunclub.netlify.app/logo.webp",
  "priceRange": "$$",
  "sameAs": ["https://www.instagram.com/infinitygunclub"]
};
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <meta name="theme-color" content="#000000" />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <!-- hreflang -->
    <link rel="alternate" hreflang="es" href={hreflangEs ?? "https://infinitygunclub.netlify.app/"} />
    <link rel="alternate" hreflang="en" href={hreflangEn ?? "https://infinitygunclub.netlify.app/en/"} />
    <link rel="alternate" hreflang="x-default" href="https://infinitygunclub.netlify.app/" />

    <link rel="canonical" href={canonicalUrl} />
    <link rel="icon" type="image/png" href="/Logo/LOGO.PNG" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700;900&display=swap"
      rel="stylesheet"
    />

    <title>{title}</title>

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json" set:html={JSON.stringify(schemaOrg)} />

  </head>
  <body class="bg-bg text-body">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verificar que el layout no genera errores de TypeScript**

```bash
npx astro check
```

Esperado: sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: crear Layout base con SEO, schema y hreflang"
```

---

## Task 5: Crear NavBar

**Files:**
- Create: `src/components/NavBar.astro`, `src/components/LanguageToggle.jsx`, `src/data/es/nav.ts`, `src/data/en/nav.ts`

- [ ] **Step 1: Crear `src/data/es/nav.ts`**

```typescript
// src/data/es/nav.ts
export const navLinks = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Instalaciones', href: '/instalaciones' },
  { label: 'Reservas', href: '/reservas' },
  { label: 'Contacto', href: '/contacto' },
];

export const mobileNav = [
  { label: 'Inicio', href: '/', icon: '🏠' },
  { label: 'Reservar', href: '/reservas', icon: '📅' },
  { label: 'Precios', href: '/#servicios', icon: '💰' },
  { label: 'Contacto', href: '/contacto', icon: '📞' },
];
```

- [ ] **Step 2: Crear `src/data/en/nav.ts`**

```typescript
// src/data/en/nav.ts
export const navLinks = [
  { label: 'Services', href: '/en/#services' },
  { label: 'Facilities', href: '/en/facilities' },
  { label: 'Booking', href: '/en/booking' },
  { label: 'Contact', href: '/en/contact' },
];

export const mobileNav = [
  { label: 'Home', href: '/en/', icon: '🏠' },
  { label: 'Book', href: '/en/booking', icon: '📅' },
  { label: 'Prices', href: '/en/#services', icon: '💰' },
  { label: 'Contact', href: '/en/contact', icon: '📞' },
];
```

- [ ] **Step 3: Crear `src/components/LanguageToggle.jsx`**

```jsx
// src/components/LanguageToggle.jsx
import { useEffect, useState } from 'react';

const ROUTE_MAP = {
  '/': '/en/',
  '/civiles': '/en/civilians',
  '/corporativo': '/en/corporate',
  '/gobierno': '/en/government',
  '/instalaciones': '/en/facilities',
  '/reservas': '/en/booking',
  '/contacto': '/en/contact',
};

const ROUTE_MAP_REVERSE = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([es, en]) => [en, es])
);

export default function LanguageToggle({ currentPath }) {
  const isEnglish = currentPath.startsWith('/en');

  function toggleLang() {
    if (isEnglish) {
      const esPath = ROUTE_MAP_REVERSE[currentPath] ?? '/';
      localStorage.setItem('igc_lang', 'es');
      window.location.href = esPath;
    } else {
      const enPath = ROUTE_MAP[currentPath] ?? '/en/';
      localStorage.setItem('igc_lang', 'en');
      window.location.href = enPath;
    }
  }

  return (
    <div className="flex border border-primary text-xs font-bold overflow-hidden cursor-pointer" onClick={toggleLang}>
      <span className={`px-3 py-1.5 transition-colors ${!isEnglish ? 'bg-primary text-black' : 'text-muted hover:text-primary'}`}>
        ES
      </span>
      <span className={`px-3 py-1.5 transition-colors ${isEnglish ? 'bg-primary text-black' : 'text-muted hover:text-primary'}`}>
        EN
      </span>
    </div>
  );
}
```

- [ ] **Step 4: Crear `src/components/NavBar.astro`**

```astro
---
// src/components/NavBar.astro
import { navLinks, mobileNav } from '../data/es/nav.ts';
import LanguageToggle from './LanguageToggle.jsx';

export interface Props {
  lang?: 'es' | 'en';
}

const { lang = 'es' } = Astro.props;
const currentPath = Astro.url.pathname;
const links = lang === 'en'
  ? (await import('../data/en/nav.ts')).navLinks
  : navLinks;
const mobile = lang === 'en'
  ? (await import('../data/en/nav.ts')).mobileNav
  : mobileNav;
---

<!-- Desktop/Tablet Nav -->
<header class="fixed top-0 left-0 right-0 z-50 bg-black border-b border-primary/30">
  <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <!-- Logo -->
    <a href={lang === 'en' ? '/en/' : '/'} class="flex items-center gap-2">
      <img src="/Logo/LOGO.PNG" alt="Infinity Gun Club" class="h-10 w-auto" />
    </a>

    <!-- Links desktop -->
    <ul class="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <li>
          <a
            href={link.href}
            class="text-xs font-bold uppercase tracking-tactical text-muted hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>

    <!-- Derecha: toggle idioma + CTA -->
    <div class="flex items-center gap-3">
      <LanguageToggle currentPath={currentPath} client:load />
      <a
        href={lang === 'en' ? '/en/booking' : '/reservas'}
        class="hidden md:inline-block btn-primary text-xs"
      >
        {lang === 'en' ? 'BOOK NOW' : 'RESERVA AHORA'}
      </a>
    </div>
  </nav>
</header>

<!-- Spacer para compensar el nav fijo -->
<div class="h-16"></div>

<!-- Mobile Bottom Tab Navigation -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black border-t border-primary/30"
     style="padding-bottom: env(safe-area-inset-bottom)">
  <ul class="flex justify-around items-center h-14">
    {mobile.map((item) => (
      <li>
        <a
          href={item.href}
          class="flex flex-col items-center gap-0.5 text-muted hover:text-primary transition-colors px-3 py-1"
        >
          <span class="text-lg leading-none">{item.icon}</span>
          <span class="text-[10px] font-bold uppercase tracking-wide">{item.label}</span>
        </a>
      </li>
    ))}
  </ul>
</nav>

<!-- Spacer mobile para el bottom nav -->
<div class="md:hidden h-14"></div>
```

- [ ] **Step 5: Verificar sin errores de TypeScript**

```bash
npx astro check
```

- [ ] **Step 6: Commit**

```bash
git add src/components/NavBar.astro src/components/LanguageToggle.jsx src/data/
git commit -m "feat: NavBar responsive + LanguageToggle ES/EN"
```

---

## Task 6: Crear Footer y StickyCTA

**Files:**
- Create: `src/components/Footer.astro`, `src/components/StickyCTA.astro`

- [ ] **Step 1: Crear `src/components/Footer.astro`**

```astro
---
// src/components/Footer.astro
export interface Props {
  lang?: 'es' | 'en';
}
const { lang = 'es' } = Astro.props;
const year = new Date().getFullYear();
---

<footer class="bg-black border-t border-primary/30 mt-20">
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      <!-- Logo + descripción -->
      <div>
        <img src="/Logo/LOGO.PNG" alt="Infinity Gun Club" class="h-12 w-auto mb-4" />
        <p class="text-muted text-sm leading-relaxed">
          {lang === 'en'
            ? "Panama's largest shooting range. Safe, professional, for all levels."
            : "El polígono de tiro más grande de Panamá. Seguro, profesional, para todos los niveles."}
        </p>
      </div>

      <!-- Servicios -->
      <div>
        <h4 class="section-tag mb-4">{lang === 'en' ? 'Services' : 'Servicios'}</h4>
        <ul class="space-y-2 text-sm text-muted">
          <li><a href={lang === 'en' ? '/en/civilians' : '/civiles'} class="hover:text-primary transition-colors">{lang === 'en' ? 'Civilian Experience' : 'Experiencias Civiles'}</a></li>
          <li><a href={lang === 'en' ? '/en/corporate' : '/corporativo'} class="hover:text-primary transition-colors">{lang === 'en' ? 'Corporate Events' : 'Eventos Corporativos'}</a></li>
          <li><a href={lang === 'en' ? '/en/government' : '/gobierno'} class="hover:text-primary transition-colors">{lang === 'en' ? 'Government Training' : 'Training Gobierno'}</a></li>
          <li><a href={lang === 'en' ? '/en/facilities' : '/instalaciones'} class="hover:text-primary transition-colors">{lang === 'en' ? 'Facilities' : 'Instalaciones'}</a></li>
        </ul>
      </div>

      <!-- Contacto -->
      <div>
        <h4 class="section-tag mb-4">{lang === 'en' ? 'Contact' : 'Contacto'}</h4>
        <ul class="space-y-2 text-sm text-muted">
          <li>📍 Panama City, Panamá</li>
          <li>📞 {lang === 'en' ? 'Phone: PENDING' : 'Tel: PENDIENTE'}</li>
          <li>✉️ reservas@infinitygunclub.pa</li>
          <li>🕐 {lang === 'en' ? 'Mon–Sun 8am–6pm' : 'Lun–Dom 8am–6pm'}</li>
        </ul>
      </div>

      <!-- Redes sociales -->
      <div>
        <h4 class="section-tag mb-4">{lang === 'en' ? 'Follow Us' : 'Síguenos'}</h4>
        <a
          href="https://www.instagram.com/infinitygunclub"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
        >
          📸 @infinitygunclub
        </a>
        <div class="mt-6">
          <a href={lang === 'en' ? '/en/booking' : '/reservas'} class="btn-primary text-xs">
            {lang === 'en' ? 'BOOK NOW' : 'RESERVA AHORA'}
          </a>
        </div>
      </div>

    </div>

    <div class="border-t border-surface mt-10 pt-6 text-center text-xs text-muted">
      © {year} Infinity Gun Club. {lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Crear `src/components/StickyCTA.astro`**

```astro
---
// src/components/StickyCTA.astro
// Visible en mobile al hacer scroll — se oculta al llegar al footer
// Posición: bottom: 56px (encima del tab nav), z-index: 99
export interface Props {
  lang?: 'es' | 'en';
  href?: string;
}
const { lang = 'es', href } = Astro.props;
const link = href ?? (lang === 'en' ? '/en/booking' : '/reservas');
const label = lang === 'en' ? 'BOOK NOW →' : 'RESERVA AHORA →';
---

<a
  id="sticky-cta"
  href={link}
  class="md:hidden fixed left-0 right-0 z-[99] bg-primary text-black font-black text-sm uppercase tracking-tactical py-3 text-center transition-transform translate-y-full"
  style="bottom: 56px"
  aria-label={label}
>
  {label}
</a>

<script>
  const cta = document.getElementById('sticky-cta');
  const footer = document.querySelector('footer');
  if (cta) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 300;
      const nearFooter = footer
        ? window.scrollY + window.innerHeight >= footer.offsetTop
        : false;
      if (scrolled && !nearFooter) {
        cta.classList.remove('translate-y-full');
      } else {
        cta.classList.add('translate-y-full');
      }
    }, { passive: true });
  }
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro src/components/StickyCTA.astro
git commit -m "feat: Footer responsive + StickyCTA mobile"
```

---

## Task 7: Crear secciones del Homepage (Hero + ValueProps + HowItWorks)

**Files:**
- Create: `src/components/Hero.astro`, `src/components/ValueProps.astro`, `src/components/HowItWorks.astro`, `src/data/es/home.ts`, `src/data/en/home.ts`

- [ ] **Step 1: Crear `src/data/es/home.ts`** (datos de contenido ES)

```typescript
// src/data/es/home.ts
export const hero = {
  tag: 'EL POLÍGONO MÁS GRANDE DE PANAMÁ',
  headline: 'EXPERIENCIA DE TIRO\nPROFESIONAL',
  subheadline: 'Seguro · Certificado · Para todos los niveles',
  ctaPrimary: { label: 'RESERVA AHORA', href: '/reservas' },
  ctaSecondary: { label: 'VER SERVICIOS', href: '/#servicios' },
};

export const valueProps = [
  { icon: '🛡️', title: 'Seguridad Total', desc: 'Protocolos certificados en cada práctica' },
  { icon: '⚡', title: 'Adrenalina Real', desc: '+15 modelos de armas disponibles' },
  { icon: '👨‍🏫', title: 'Instructores Pro', desc: 'Certificados y con años de experiencia' },
];

export const howItWorks = {
  title: 'CÓMO FUNCIONA',
  steps: [
    { num: '1', label: 'Elige', desc: 'Selecciona tu experiencia' },
    { num: '2', label: 'Reserva', desc: 'Elige fecha y hora' },
    { num: '3', label: 'Paga', desc: 'Pago seguro online' },
    { num: '4', label: '¡Vive!', desc: 'Vive la experiencia' },
  ],
};

export const socialProof = {
  rating: '4.8',
  reviewCount: '245',
  reviewPlatform: 'Google',
  tagline: '+500 experiencias completadas',
};

export const faq = [
  { q: '¿Cuál es la edad mínima para disparar?', a: 'La edad mínima es 18 años. Menores de edad pueden participar en algunas actividades con autorización escrita de sus padres.' },
  { q: '¿Necesito experiencia previa?', a: 'No. Contamos con instructores certificados para principiantes. Todos nuestros paquetes incluyen briefing de seguridad.' },
  { q: '¿Qué debo llevar?', a: 'Solo ropa cómoda y zapatos cerrados. Nosotros proveemos armas, munición, lentes y protección auditiva.' },
  { q: '¿Puedo traer mi propio equipo?', a: 'Sí, previa inspección de seguridad. Contacta con nosotros para los detalles.' },
  { q: '¿Tienen paquetes para grupos?', a: 'Sí. Atendemos grupos desde 5 hasta más de 100 personas para eventos corporativos y team building.' },
  { q: '¿Cómo cancelo o reprogramo mi reserva?', a: 'Puedes cancelar sin costo hasta 24 horas antes de tu cita. Después de ese plazo se aplica una penalidad del 50%.' },
];
```

- [ ] **Step 2: Crear `src/data/en/home.ts`** (datos de contenido EN)

```typescript
// src/data/en/home.ts
export const hero = {
  tag: "PANAMA'S LARGEST SHOOTING RANGE",
  headline: 'PROFESSIONAL\nSHOOTING EXPERIENCE',
  subheadline: 'Safe · Certified · For All Levels',
  ctaPrimary: { label: 'BOOK NOW', href: '/en/booking' },
  ctaSecondary: { label: 'VIEW SERVICES', href: '/en/#services' },
};

export const valueProps = [
  { icon: '🛡️', title: 'Total Safety', desc: 'Certified protocols on every session' },
  { icon: '⚡', title: 'Real Adrenaline', desc: '+15 weapon models available' },
  { icon: '👨‍🏫', title: 'Pro Instructors', desc: 'Certified and highly experienced' },
];

export const howItWorks = {
  title: 'HOW IT WORKS',
  steps: [
    { num: '1', label: 'Choose', desc: 'Select your experience' },
    { num: '2', label: 'Book', desc: 'Pick date and time' },
    { num: '3', label: 'Pay', desc: 'Secure online payment' },
    { num: '4', label: 'Live It!', desc: 'Enjoy the experience' },
  ],
};

export const socialProof = {
  rating: '4.8',
  reviewCount: '245',
  reviewPlatform: 'Google',
  tagline: '+500 completed experiences',
};

export const faq = [
  { q: 'What is the minimum age to shoot?', a: 'Minimum age is 18 years. Minors may participate in some activities with written parental consent.' },
  { q: 'Do I need prior experience?', a: 'No. We have certified instructors for beginners. All packages include a safety briefing.' },
  { q: 'What should I bring?', a: 'Just comfortable clothes and closed-toe shoes. We provide firearms, ammunition, glasses, and hearing protection.' },
  { q: 'Can I bring my own gear?', a: 'Yes, after a safety inspection. Contact us for details.' },
  { q: 'Do you have group packages?', a: 'Yes. We serve groups from 5 to 100+ people for corporate events and team building.' },
  { q: 'How do I cancel or reschedule?', a: 'You can cancel at no cost up to 24 hours before your appointment. After that, a 50% penalty applies.' },
];
```

- [ ] **Step 3: Crear `src/components/Hero.astro`**

```astro
---
// src/components/Hero.astro
import type { hero as HeroType } from '../data/es/home.ts';
export interface Props {
  data: typeof HeroType;
}
const { data } = Astro.props;
---

<section class="relative min-h-[85vh] flex items-end bg-black overflow-hidden">
  <!-- Video de fondo (desktop) — fallback imagen en mobile/tablet -->
  <div class="absolute inset-0">
    <!-- Imagen de fondo (siempre) -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style="background-image: url('/images/hero-bg.jpg')"
      role="img"
      aria-label="Infinity Gun Club - Polígono de tiro profesional"
    ></div>
    <!-- Video overlay (solo desktop) -->
    <video
      class="hidden lg:block absolute inset-0 w-full h-full object-cover"
      autoplay
      muted
      loop
      playsinline
      preload="none"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
    <!-- Gradiente oscuro -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
  </div>

  <!-- Contenido -->
  <div class="relative z-10 max-w-7xl mx-auto px-4 pb-16 lg:pb-24">
    <p class="section-tag mb-4">{data.tag}</p>
    <h1 class="font-display text-5xl md:text-7xl lg:text-8xl text-primary leading-none mb-4 whitespace-pre-line">
      {data.headline}
    </h1>
    <p class="text-muted text-lg mb-8 max-w-xl">{data.subheadline}</p>
    <div class="flex flex-wrap gap-4">
      <a href={data.ctaPrimary.href} class="btn-primary">{data.ctaPrimary.label}</a>
      <a href={data.ctaSecondary.href} class="btn-outline">{data.ctaSecondary.label}</a>
    </div>
  </div>
</section>
```

**Nota:** Crear `public/images/` y colocar una imagen placeholder `hero-bg.jpg` (puede ser negra temporalmente). El video y la imagen real los proveerá el cliente.

- [ ] **Step 4: Crear `src/components/ValueProps.astro`**

```astro
---
// src/components/ValueProps.astro
export interface Props {
  items: { icon: string; title: string; desc: string }[];
}
const { items } = Astro.props;
---

<section class="bg-surface border-y border-primary/30">
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-primary/20">
      {items.map((item) => (
        <div class="flex flex-col items-center text-center p-8">
          <span class="text-4xl mb-4">{item.icon}</span>
          <h3 class="font-display text-2xl text-primary tracking-wide mb-2">{item.title}</h3>
          <p class="text-muted text-sm">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Crear `src/components/HowItWorks.astro`**

```astro
---
// src/components/HowItWorks.astro
export interface Props {
  data: { title: string; steps: { num: string; label: string; desc: string }[] };
}
const { data } = Astro.props;
---

<section class="py-20 bg-bg">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <p class="section-tag justify-center mb-6 inline-flex">{data.title}</p>
    <div class="flex flex-col md:flex-row items-center gap-4 md:gap-0 mt-10">
      {data.steps.map((step, i) => (
        <>
          <div class="flex flex-col items-center text-center flex-1">
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-black text-xl mb-3">
              {step.num}
            </div>
            <h4 class="font-bold text-white mb-1">{step.label}</h4>
            <p class="text-muted text-xs">{step.desc}</p>
          </div>
          {i < data.steps.length - 1 && (
            <div class="hidden md:block w-16 h-px bg-primary/40 flex-shrink-0"></div>
          )}
        </>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Commit**

```bash
git add src/data/ src/components/Hero.astro src/components/ValueProps.astro src/components/HowItWorks.astro
git commit -m "feat: Hero + ValueProps + HowItWorks con datos bilingues"
```

---

## Task 8: Crear secciones SocialProof, Segments, Gallery, FAQ, TrustSignals, ContactMap

**Files:**
- Create: `src/components/SocialProof.astro`, `src/components/Segments.astro`, `src/components/Gallery.astro`, `src/components/FAQ.astro`, `src/components/TrustSignals.astro`, `src/components/ContactMap.astro`, `src/data/es/segments.ts`, `src/data/en/segments.ts`

- [ ] **Step 1: Crear `src/data/es/segments.ts`**

```typescript
// src/data/es/segments.ts
export const segments = [
  {
    tag: '👤 CIVILES',
    title: 'Experiencias de Tiro',
    desc: 'Para principiantes y avanzados. Vive la adrenalina con seguridad total.',
    href: '/civiles',
    cta: 'VER PAQUETES →',
  },
  {
    tag: '🏢 CORPORATIVO',
    title: 'Team Building',
    desc: 'Eventos grupales desde 10 personas. Conecta a tu equipo de forma única.',
    href: '/corporativo',
    cta: 'COTIZAR EVENTO →',
  },
  {
    tag: '🔒 GOBIERNO',
    title: 'Training Táctico',
    desc: 'Programas certificados para instituciones y fuerzas de seguridad.',
    href: '/gobierno',
    cta: 'SOLICITAR PROPUESTA →',
  },
];
```

- [ ] **Step 2: Crear `src/data/en/segments.ts`**

```typescript
// src/data/en/segments.ts
export const segments = [
  {
    tag: '👤 CIVILIANS',
    title: 'Shooting Experiences',
    desc: 'For beginners and advanced shooters. Feel the adrenaline with total safety.',
    href: '/en/civilians',
    cta: 'VIEW PACKAGES →',
  },
  {
    tag: '🏢 CORPORATE',
    title: 'Team Building',
    desc: 'Group events from 10 people. Connect your team in a unique way.',
    href: '/en/corporate',
    cta: 'GET A QUOTE →',
  },
  {
    tag: '🔒 GOVERNMENT',
    title: 'Tactical Training',
    desc: 'Certified programs for institutions and security forces.',
    href: '/en/government',
    cta: 'REQUEST PROPOSAL →',
  },
];
```

- [ ] **Step 3: Crear `src/components/SocialProof.astro`**

```astro
---
// src/components/SocialProof.astro
export interface Props {
  data: { rating: string; reviewCount: string; reviewPlatform: string; tagline: string };
}
const { data } = Astro.props;
---

<section class="bg-surface border-y border-primary/20 py-10">
  <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
    <div class="flex items-center gap-4">
      <div class="text-5xl font-black text-primary font-display">{data.rating}</div>
      <div>
        <div class="text-primary text-xl">★★★★★</div>
        <div class="text-muted text-sm">{data.reviewCount} reseñas en {data.reviewPlatform}</div>
      </div>
    </div>
    <div class="text-muted text-sm font-bold uppercase tracking-tactical">{data.tagline}</div>
    <div class="flex items-center gap-3">
      <div class="text-xs text-muted uppercase tracking-wider">Confían en nosotros:</div>
      <div class="flex gap-3">
        {[1,2,3].map(() => (
          <div class="w-16 h-8 bg-surface border border-primary/20 rounded"></div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Crear `src/components/Segments.astro`**

```astro
---
// src/components/Segments.astro
export interface Props {
  items: { tag: string; title: string; desc: string; href: string; cta: string }[];
  sectionTitle?: string;
}
const { items, sectionTitle = 'NUESTROS SERVICIOS' } = Astro.props;
---

<section id="servicios" class="py-20 bg-bg">
  <div class="max-w-7xl mx-auto px-4">
    <p class="section-tag mb-10">{sectionTitle}</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
      {items.map((item) => (
        <div class="bg-surface p-8 flex flex-col gap-4 hover:border-l-2 hover:border-primary transition-all group">
          <span class="text-xs font-bold uppercase tracking-tactical text-primary">{item.tag}</span>
          <h3 class="font-display text-3xl text-white tracking-wide">{item.title}</h3>
          <p class="text-muted text-sm flex-1">{item.desc}</p>
          <a
            href={item.href}
            class="text-primary text-xs font-bold uppercase tracking-tactical border-b border-primary pb-1 inline-block w-fit group-hover:pl-2 transition-all"
          >
            {item.cta}
          </a>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 5: Crear `src/components/Gallery.astro`**

```astro
---
// src/components/Gallery.astro
export interface Props {
  title?: string;
  subtitle?: string;
}
const {
  title = 'NUESTRAS INSTALACIONES',
  subtitle = 'El polígono de tiro más grande de Panamá',
} = Astro.props;

// Placeholder hasta que el cliente provea fotos reales
const images = [
  { src: '/images/gallery-1.jpg', alt: 'Línea de tiro interior' },
  { src: '/images/gallery-2.jpg', alt: 'Armería y equipo' },
  { src: '/images/gallery-3.jpg', alt: 'Instrucción profesional' },
  { src: '/images/gallery-4.jpg', alt: 'Puestos de tiro' },
  { src: '/images/gallery-5.jpg', alt: 'Evento corporativo' },
  { src: '/images/gallery-6.jpg', alt: 'Vista general' },
];
---

<section class="py-20 bg-black">
  <div class="max-w-7xl mx-auto px-4">
    <p class="section-tag mb-4">{title}</p>
    <p class="text-muted mb-10">{subtitle}</p>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-2">
      {images.map((img) => (
        <div class="aspect-square bg-surface overflow-hidden">
          <img
            src={img.src}
            alt={img.alt}
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onerror="this.style.display='none'"
          />
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Crear `src/components/FAQ.astro`**

```astro
---
// src/components/FAQ.astro
export interface Props {
  items: { q: string; a: string }[];
  title?: string;
}
const { items, title = 'PREGUNTAS FRECUENTES' } = Astro.props;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": items.map((item) => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};
---

<section class="py-20 bg-bg">
  <div class="max-w-3xl mx-auto px-4">
    <p class="section-tag mb-10">{title}</p>
    <div class="space-y-2">
      {items.map((item, i) => (
        <details class="bg-surface border border-primary/10 group">
          <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-white hover:text-primary transition-colors list-none">
            {item.q}
            <span class="text-primary font-display text-xl group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p class="px-5 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>

<script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
```

- [ ] **Step 7: Crear `src/components/TrustSignals.astro`**

```astro
---
// src/components/TrustSignals.astro
export interface Props {
  lang?: 'es' | 'en';
}
const { lang = 'es' } = Astro.props;
const ctaLabel = lang === 'en' ? 'BOOK NOW' : 'RESERVA AHORA';
const ctaHref = lang === 'en' ? '/en/booking' : '/reservas';
---

<section class="py-20 bg-surface border-y border-primary/20">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <div class="flex flex-wrap justify-center gap-8 mb-12">
      {['✅ Certificado', '🛡️ Seguro', '⭐ 4.8 Google', '🏆 +5 años'].map((item) => (
        <div class="text-white font-bold text-sm">{item}</div>
      ))}
    </div>
    <h2 class="font-display text-4xl md:text-5xl text-primary mb-4">
      {lang === 'en' ? 'READY TO SHOOT?' : '¿LISTO PARA DISPARAR?'}
    </h2>
    <p class="text-muted mb-8">
      {lang === 'en'
        ? 'Limited spots available. Book your experience today.'
        : 'Cupos limitados disponibles. Reserva tu experiencia hoy.'}
    </p>
    <a href={ctaHref} class="btn-primary text-base px-10 py-4">{ctaLabel}</a>
  </div>
</section>
```

- [ ] **Step 8: Crear `src/components/ContactMap.astro`**

```astro
---
// src/components/ContactMap.astro
export interface Props {
  lang?: 'es' | 'en';
}
const { lang = 'es' } = Astro.props;
---

<section class="py-20 bg-black">
  <div class="max-w-7xl mx-auto px-4">
    <p class="section-tag mb-10">{lang === 'en' ? 'FIND US' : 'ENCUÉNTRANOS'}</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Mapa -->
      <div class="bg-surface h-64 lg:h-96 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126003.56388959765!2d-79.59479655!3d8.99350265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca8f59f2b6213%3A0xafd1a4867f4bd9f7!2sPanama!5e0!3m2!1ses!2spa!4v1700000000000"
          width="100%"
          height="100%"
          style="border:0; filter: grayscale(100%) invert(90%)"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Ubicación Infinity Gun Club"
        ></iframe>
      </div>
      <!-- Información -->
      <div class="flex flex-col justify-center gap-6">
        <div>
          <h4 class="text-primary font-bold uppercase tracking-tactical text-xs mb-2">📍 {lang === 'en' ? 'Location' : 'Ubicación'}</h4>
          <p class="text-muted">Panama City, Panamá</p>
        </div>
        <div>
          <h4 class="text-primary font-bold uppercase tracking-tactical text-xs mb-2">🕐 {lang === 'en' ? 'Hours' : 'Horarios'}</h4>
          <p class="text-muted">{lang === 'en' ? 'Monday – Sunday: 8:00 AM – 6:00 PM' : 'Lunes – Domingo: 8:00 AM – 6:00 PM'}</p>
        </div>
        <div>
          <h4 class="text-primary font-bold uppercase tracking-tactical text-xs mb-2">📸 Instagram</h4>
          <a href="https://www.instagram.com/infinitygunclub" target="_blank" rel="noopener noreferrer" class="text-muted hover:text-primary transition-colors">@infinitygunclub</a>
        </div>
        <div>
          <h4 class="text-primary font-bold uppercase tracking-tactical text-xs mb-2">✉️ Email</h4>
          <p class="text-muted">reservas@infinitygunclub.pa</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 9: Commit**

```bash
git add src/components/SocialProof.astro src/components/Segments.astro src/components/Gallery.astro src/components/FAQ.astro src/components/TrustSignals.astro src/components/ContactMap.astro src/data/es/segments.ts src/data/en/segments.ts
git commit -m "feat: secciones SocialProof, Segments, Gallery, FAQ, TrustSignals, ContactMap"
```

---

## Task 9: Crear BookingForm (React Island)

**Files:**
- Create: `src/components/BookingForm.jsx`

- [ ] **Step 1: Crear `src/components/BookingForm.jsx`**

```jsx
// src/components/BookingForm.jsx
// Usa Netlify Forms — no requiere backend
import { useState } from 'react';

const STEPS = {
  es: ['Tus datos', 'Fecha y hora', 'Experiencia'],
  en: ['Your info', 'Date & time', 'Experience'],
};

export default function BookingForm({ lang = 'es' }) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const steps = STEPS[lang];

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="font-display text-3xl text-primary mb-2">
          {lang === 'en' ? 'BOOKING CONFIRMED!' : '¡RESERVA CONFIRMADA!'}
        </h3>
        <p className="text-muted">
          {lang === 'en'
            ? 'We will contact you shortly to confirm your experience.'
            : 'Nos pondremos en contacto contigo pronto para confirmar tu experiencia.'}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {steps.map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-1 rounded mb-2 transition-colors ${i <= step ? 'bg-primary' : 'bg-surface'}`}></div>
            <span className={`text-xs uppercase tracking-wider ${i === step ? 'text-primary font-bold' : 'text-muted'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <form
        name="booking"
        method="POST"
        data-netlify="true"
        onSubmit={(e) => {
          if (step < steps.length - 1) {
            e.preventDefault();
            setStep(step + 1);
          } else {
            setSubmitted(true);
          }
        }}
        className="space-y-4"
      >
        <input type="hidden" name="form-name" value="booking" />

        {/* Step 1: Datos personales */}
        {step === 0 && (
          <>
            <input type="text" name="name" required placeholder={lang === 'en' ? 'Full Name' : 'Nombre Completo'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
            <input type="email" name="email" required placeholder="Email"
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
            <input type="tel" name="phone" placeholder={lang === 'en' ? '+1 (507) 000-0000' : '+507 6000-0000'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
          </>
        )}

        {/* Step 2: Fecha y hora */}
        {step === 1 && (
          <>
            <input type="date" name="date" required
              className="w-full bg-surface border border-primary/20 text-white px-4 py-3 focus:outline-none focus:border-primary" />
            <select name="time" required
              className="w-full bg-surface border border-primary/20 text-white px-4 py-3 focus:outline-none focus:border-primary">
              <option value="">{lang === 'en' ? 'Select time' : 'Selecciona hora'}</option>
              {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input type="number" name="people" min="1" max="100" required
              placeholder={lang === 'en' ? 'Number of people' : 'Número de personas'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary" />
          </>
        )}

        {/* Step 3: Experiencia */}
        {step === 2 && (
          <>
            <select name="experience" required
              className="w-full bg-surface border border-primary/20 text-white px-4 py-3 focus:outline-none focus:border-primary">
              <option value="">{lang === 'en' ? 'Select experience' : 'Selecciona experiencia'}</option>
              <option value="civil">{lang === 'en' ? 'Civilian Experience' : 'Experiencia Civil'}</option>
              <option value="corporate">{lang === 'en' ? 'Corporate / Team Building' : 'Corporativo / Team Building'}</option>
              <option value="government">{lang === 'en' ? 'Government / Tactical' : 'Gobierno / Táctico'}</option>
            </select>
            <textarea name="notes" rows={3}
              placeholder={lang === 'en' ? 'Additional notes (optional)' : 'Notas adicionales (opcional)'}
              className="w-full bg-surface border border-primary/20 text-white placeholder-muted px-4 py-3 focus:outline-none focus:border-primary resize-none" />
          </>
        )}

        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)}
              className="btn-outline flex-1">
              {lang === 'en' ? '← Back' : '← Volver'}
            </button>
          )}
          <button type="submit" className="btn-primary flex-1">
            {step < steps.length - 1
              ? (lang === 'en' ? 'NEXT →' : 'SIGUIENTE →')
              : (lang === 'en' ? 'CONFIRM BOOKING' : 'CONFIRMAR RESERVA')}
          </button>
        </div>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BookingForm.jsx
git commit -m "feat: BookingForm React Island 3 pasos con Netlify Forms"
```

---

## Task 10: Crear Homepage ES e EN

**Files:**
- Create/Modify: `src/pages/index.astro`, `src/pages/en/index.astro`

- [ ] **Step 1: Crear `src/pages/index.astro`** (Homepage ES)

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import StickyCTA from '../components/StickyCTA.astro';
import Hero from '../components/Hero.astro';
import ValueProps from '../components/ValueProps.astro';
import HowItWorks from '../components/HowItWorks.astro';
import SocialProof from '../components/SocialProof.astro';
import Segments from '../components/Segments.astro';
import Gallery from '../components/Gallery.astro';
import BookingForm from '../components/BookingForm.jsx';
import FAQ from '../components/FAQ.astro';
import TrustSignals from '../components/TrustSignals.astro';
import ContactMap from '../components/ContactMap.astro';

import { hero, valueProps, howItWorks, socialProof, faq } from '../data/es/home.ts';
import { segments } from '../data/es/segments.ts';
---

<Layout
  title="Infinity Gun Club — Polígono de Tiro Profesional en Panamá"
  description="El polígono de tiro más grande de Panamá. Experiencias para civiles, empresas e instituciones. Reserva online."
  lang="es"
>
  <NavBar lang="es" />
  <StickyCTA lang="es" />

  <Hero data={hero} />
  <ValueProps items={valueProps} />
  <HowItWorks data={howItWorks} />
  <SocialProof data={socialProof} />
  <Segments items={segments} sectionTitle="NUESTROS SERVICIOS" />
  <Gallery title="NUESTRAS INSTALACIONES" subtitle="El polígono más grande de Panamá" />

  <section class="py-20 bg-surface">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">RESERVA RÁPIDA</p>
      <BookingForm lang="es" client:visible />
    </div>
  </section>

  <FAQ items={faq} title="PREGUNTAS FRECUENTES" />
  <TrustSignals lang="es" />
  <ContactMap lang="es" />
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 2: Crear `src/pages/en/index.astro`** (Homepage EN)

```astro
---
// src/pages/en/index.astro
import Layout from '../../layouts/Layout.astro';
import NavBar from '../../components/NavBar.astro';
import Footer from '../../components/Footer.astro';
import StickyCTA from '../../components/StickyCTA.astro';
import Hero from '../../components/Hero.astro';
import ValueProps from '../../components/ValueProps.astro';
import HowItWorks from '../../components/HowItWorks.astro';
import SocialProof from '../../components/SocialProof.astro';
import Segments from '../../components/Segments.astro';
import Gallery from '../../components/Gallery.astro';
import BookingForm from '../../components/BookingForm.jsx';
import FAQ from '../../components/FAQ.astro';
import TrustSignals from '../../components/TrustSignals.astro';
import ContactMap from '../../components/ContactMap.astro';

import { hero, valueProps, howItWorks, socialProof, faq } from '../../data/en/home.ts';
import { segments } from '../../data/en/segments.ts';
---

<Layout
  title="Infinity Gun Club — Professional Shooting Range in Panama"
  description="Panama's largest shooting range. Experiences for civilians, companies and government institutions. Book online."
  lang="en"
>
  <NavBar lang="en" />
  <StickyCTA lang="en" />

  <Hero data={hero} />
  <ValueProps items={valueProps} />
  <HowItWorks data={howItWorks} />
  <SocialProof data={socialProof} />
  <Segments items={segments} sectionTitle="OUR SERVICES" />
  <Gallery title="OUR FACILITIES" subtitle="Panama's largest shooting range" />

  <section class="py-20 bg-surface">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">QUICK BOOKING</p>
      <BookingForm lang="en" client:visible />
    </div>
  </section>

  <FAQ items={faq} title="FREQUENTLY ASKED QUESTIONS" />
  <TrustSignals lang="en" />
  <ContactMap lang="en" />
  <Footer lang="en" />
</Layout>
```

- [ ] **Step 3: Arrancar dev server y verificar visualmente**

```bash
npm run dev
```

Abrir `http://localhost:4321` y verificar:
- [ ] Hero section visible con texto en amarillo
- [ ] NavBar con logo + links + toggle ES/EN
- [ ] Bottom nav visible en mobile (DevTools → responsive)
- [ ] Todas las secciones renderizan sin errores en consola

- [ ] **Step 4: Build de verificación**

```bash
npm run build && npm run preview
```

Esperado: sin errores de build, site funcional en preview.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/en/index.astro
git commit -m "feat: homepage ES + EN completas con todas las secciones"
```

---

## Task 11: Crear Landing Pages (Civiles, Corporativo, Gobierno) ES + EN

**Files:**
- Create: `src/pages/civiles.astro`, `src/pages/corporativo.astro`, `src/pages/gobierno.astro`
- Create: `src/pages/en/civilians.astro`, `src/pages/en/corporate.astro`, `src/pages/en/government.astro`

- [ ] **Step 1: Crear `src/pages/civiles.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import StickyCTA from '../components/StickyCTA.astro';
import BookingForm from '../components/BookingForm.jsx';
import TrustSignals from '../components/TrustSignals.astro';
import FAQ from '../components/FAQ.astro';

const faqCiviles = [
  { q: '¿Qué armas puedo usar?', a: 'Pistolas 9mm, .45 ACP, revólveres, rifles AR-15 y escopetas según el paquete elegido.' },
  { q: '¿Incluye instructor?', a: 'Todos los paquetes incluyen instructor certificado durante toda la sesión.' },
  { q: '¿Cuánto tiempo dura?', a: 'Las sesiones duran entre 1 y 3 horas según el paquete. Recomendamos llegar 15 minutos antes.' },
];
---

<Layout
  title="Experiencias de Tiro para Civiles — Infinity Gun Club Panamá"
  description="Vive la adrenalina del tiro con seguridad total. Paquetes para principiantes y avanzados en el polígono más grande de Panamá."
  lang="es"
>
  <NavBar lang="es" />
  <StickyCTA lang="es" href="/reservas?tipo=civil" />

  <!-- Hero del segmento -->
  <section class="min-h-[60vh] flex items-end bg-black relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
    <div class="absolute inset-0 bg-cover bg-center opacity-40" style="background-image: url('/images/civiles-bg.jpg')"></div>
    <div class="relative z-20 max-w-7xl mx-auto px-4 pb-16">
      <p class="section-tag mb-4">👤 CIVILES</p>
      <h1 class="font-display text-5xl md:text-7xl text-primary mb-4">VIVE LA ADRENALINA<br>SIN RIESGO</h1>
      <p class="text-muted text-lg mb-8 max-w-xl">Para principiantes y avanzados. Instructor incluido. Seguridad total.</p>
      <a href="/reservas?tipo=civil" class="btn-primary">RESERVA MI EXPERIENCIA</a>
    </div>
  </section>

  <!-- Paquetes -->
  <section class="py-20 bg-bg">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">NUESTROS PAQUETES</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
        {[
          { name: 'BÁSICO', price: '$35', bullets: ['50 disparos', 'Pistola 9mm', 'Instructor incluido', 'Equipo de seguridad'] },
          { name: 'INTERMEDIO', price: '$65', bullets: ['100 disparos', '2 armas a elegir', 'Instructor incluido', 'Equipo + fotos'] },
          { name: 'PRO', price: '$110', bullets: ['200 disparos', '4 armas a elegir', 'Video de la sesión', 'Certificado de tiro'] },
        ].map((pkg) => (
          <div class="bg-surface p-8 flex flex-col">
            <h3 class="font-display text-3xl text-primary mb-2">{pkg.name}</h3>
            <div class="text-4xl font-black text-white mb-6">{pkg.price}</div>
            <ul class="space-y-2 flex-1 mb-8">
              {pkg.bullets.map(b => <li class="text-muted text-sm flex gap-2"><span class="text-primary">✓</span>{b}</li>)}
            </ul>
            <a href="/reservas?tipo=civil" class="btn-primary text-center text-sm">RESERVAR</a>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="py-20 bg-surface">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">RESERVA AHORA</p>
      <BookingForm lang="es" client:visible />
    </div>
  </section>

  <FAQ items={faqCiviles} title="PREGUNTAS — CIVILES" />
  <TrustSignals lang="es" />
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 2: Crear `src/pages/corporativo.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import StickyCTA from '../components/StickyCTA.astro';
import BookingForm from '../components/BookingForm.jsx';
import TrustSignals from '../components/TrustSignals.astro';
import FAQ from '../components/FAQ.astro';

const faqCorp = [
  { q: '¿Cuál es el mínimo de personas para un evento corporativo?', a: 'Atendemos grupos desde 5 personas. Para grupos grandes de 50+ personas, contáctanos para una propuesta personalizada.' },
  { q: '¿Se puede incluir catering?', a: 'Sí. Trabajamos con proveedores de catering para eventos de medio día o día completo. Consúltanos al reservar.' },
  { q: '¿Emiten factura fiscal?', a: 'Sí. Emitimos facturas para personas jurídicas con RUC. Indicar datos al reservar.' },
  { q: '¿Cuánto dura un evento de team building?', a: 'Los paquetes duran entre 2 y 4 horas. Incluyen briefing, práctica y sesión de cierre grupal.' },
];
---

<Layout
  title="Team Building con Tiro Deportivo — Infinity Gun Club Panamá"
  description="Eventos corporativos y team building únicos en el polígono más grande de Panamá. Grupos desde 5 personas. Factura fiscal disponible."
  lang="es"
  hreflangEs="https://infinitygunclub.netlify.app/corporativo"
  hreflangEn="https://infinitygunclub.netlify.app/en/corporate"
>
  <NavBar lang="es" />
  <StickyCTA lang="es" href="/reservas?tipo=corporativo" />

  <section class="min-h-[60vh] flex items-end bg-black relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
    <div class="absolute inset-0 bg-cover bg-center opacity-40" style="background-image: url('/images/corporativo-bg.jpg')"></div>
    <div class="relative z-20 max-w-7xl mx-auto px-4 pb-16">
      <p class="section-tag mb-4">🏢 CORPORATIVO</p>
      <h1 class="font-display text-5xl md:text-7xl text-primary mb-4">TEAM BUILDING<br>QUE CONECTA</h1>
      <p class="text-muted text-lg mb-8 max-w-xl">Eventos grupales desde 5 personas. Experiencia única que une equipos.</p>
      <a href="/reservas?tipo=corporativo" class="btn-primary">COTIZA TU EVENTO</a>
    </div>
  </section>

  <section class="py-20 bg-bg">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">PAQUETES CORPORATIVOS</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
        {[
          { name: 'BÁSICO', price: '$350', sub: 'Hasta 10 personas', bullets: ['100 disparos por grupo', '2 armas disponibles', 'Instructor grupal', 'Equipo de seguridad'] },
          { name: 'PREMIUM', price: '$750', sub: 'Hasta 25 personas', bullets: ['Tiro ilimitado 2h', '5 modelos de armas', 'Instructor por equipo', 'Fotos del evento'] },
          { name: 'ENTERPRISE', price: 'Cotizar', sub: '50+ personas', bullets: ['Día completo exclusivo', 'Armas sin límite', 'Catering opcional', 'Video + certificados'] },
        ].map((pkg) => (
          <div class="bg-surface p-8 flex flex-col">
            <h3 class="font-display text-3xl text-primary mb-1">{pkg.name}</h3>
            <p class="text-muted text-xs mb-4">{pkg.sub}</p>
            <div class="text-4xl font-black text-white mb-6">{pkg.price}</div>
            <ul class="space-y-2 flex-1 mb-8">
              {pkg.bullets.map(b => <li class="text-muted text-sm flex gap-2"><span class="text-primary">✓</span>{b}</li>)}
            </ul>
            <a href="/reservas?tipo=corporativo" class="btn-primary text-center text-sm">RESERVAR</a>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="py-20 bg-surface">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">COTIZA TU EVENTO</p>
      <BookingForm lang="es" client:visible />
    </div>
  </section>

  <FAQ items={faqCorp} title="PREGUNTAS — CORPORATIVO" />
  <TrustSignals lang="es" />
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 3: Crear `src/pages/gobierno.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import StickyCTA from '../components/StickyCTA.astro';
import BookingForm from '../components/BookingForm.jsx';
import TrustSignals from '../components/TrustSignals.astro';
import FAQ from '../components/FAQ.astro';

const faqGob = [
  { q: '¿Qué certificaciones ofrece el polígono?', a: 'Emitimos certificados de competencia táctica avalados por instructores certificados. Consultenos sobre acreditaciones específicas de su institución.' },
  { q: '¿Se puede facturar a nombre de una institución del gobierno?', a: 'Sí. Trabajamos con órdenes de compra y facturación institucional. Contáctenos para iniciar el proceso.' },
  { q: '¿Tienen programas anuales de entrenamiento?', a: 'Sí. Ofrecemos contratos anuales para mantenimiento de habilidades tácticas con descuentos especiales por volumen.' },
  { q: '¿El polígono cumple con estándares de seguridad oficiales?', a: 'Sí. Nuestras instalaciones cumplen con todas las regulaciones panameñas aplicables al uso y manejo de armas de fuego.' },
];
---

<Layout
  title="Training Táctico Certificado para Instituciones — Infinity Gun Club"
  description="Programas de entrenamiento táctico para SENAFRON, Policía Nacional, SPI y empresas de seguridad en Panamá."
  lang="es"
  hreflangEs="https://infinitygunclub.netlify.app/gobierno"
  hreflangEn="https://infinitygunclub.netlify.app/en/government"
>
  <NavBar lang="es" />
  <StickyCTA lang="es" href="/contacto?tipo=gobierno" />

  <section class="min-h-[60vh] flex items-end bg-black relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
    <div class="absolute inset-0 bg-cover bg-center opacity-40" style="background-image: url('/images/gobierno-bg.jpg')"></div>
    <div class="relative z-20 max-w-7xl mx-auto px-4 pb-16">
      <p class="section-tag mb-4">🔒 GOBIERNO & SEGURIDAD</p>
      <h1 class="font-display text-5xl md:text-7xl text-primary mb-4">TRAINING TÁCTICO<br>CERTIFICADO</h1>
      <p class="text-muted text-lg mb-8 max-w-xl">Programas para SENAFRON, Policía Nacional, SPI, y seguridad privada.</p>
      <a href="/contacto?tipo=gobierno" class="btn-primary">SOLICITA PROPUESTA</a>
    </div>
  </section>

  <section class="py-20 bg-bg">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">PROGRAMAS DISPONIBLES</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
        {[
          { name: 'BÁSICO', sub: 'Mantenimiento de habilidades', bullets: ['Recalificación anual', 'Pistola y fusil', 'Certificado incluido', 'Facturación institucional'] },
          { name: 'TÁCTICO', sub: 'Entrenamiento avanzado', bullets: ['Escenarios tácticos', 'Tiro en movimiento', 'CQB básico', 'Evaluación de desempeño'] },
          { name: 'PROGRAMA ANUAL', sub: 'Contrato institucional', bullets: ['Sesiones mensuales', 'Seguimiento individual', 'Informes de progreso', 'Precio preferencial'] },
        ].map((pkg) => (
          <div class="bg-surface p-8 flex flex-col">
            <h3 class="font-display text-3xl text-primary mb-1">{pkg.name}</h3>
            <p class="text-muted text-xs mb-4">{pkg.sub}</p>
            <ul class="space-y-2 flex-1 mb-8">
              {pkg.bullets.map(b => <li class="text-muted text-sm flex gap-2"><span class="text-primary">✓</span>{b}</li>)}
            </ul>
            <a href="/contacto?tipo=gobierno" class="btn-outline text-center text-sm">SOLICITAR INFO</a>
          </div>
        ))}
      </div>
    </div>
  </section>

  <section class="py-20 bg-surface">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-10">CONTACTO INSTITUCIONAL</p>
      <BookingForm lang="es" client:visible />
    </div>
  </section>

  <FAQ items={faqGob} title="PREGUNTAS — GOBIERNO & SEGURIDAD" />
  <TrustSignals lang="es" />
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 4: Crear páginas EN** (`en/civilians.astro`, `en/corporate.astro`, `en/government.astro`)

Para cada una: copiar la página ES equivalente, cambiar:
- `lang="es"` → `lang="en"`
- Rutas de `hreflangEs/hreflangEn` al revés
- Textos en inglés usando los datos de `src/data/en/`
- `import` de componentes desde `../../` en vez de `../`
- `href` de CTAs a rutas `/en/booking` o `/en/contact`

- [ ] **Step 5: Build y verificar**

```bash
npm run build
```

Verificar que las 6 landing pages aparecen en `/dist/` sin errores.

- [ ] **Step 6: Commit**

```bash
git add src/pages/civiles.astro src/pages/corporativo.astro src/pages/gobierno.astro src/pages/en/civilians.astro src/pages/en/corporate.astro src/pages/en/government.astro
git commit -m "feat: landing pages civiles, corporativo, gobierno ES + EN"
```

---

## Task 12: Crear páginas adicionales y 404

**Files:**
- Create: `src/pages/instalaciones.astro`, `src/pages/reservas.astro`, `src/pages/contacto.astro`, `src/pages/blog/[slug].astro`, `src/pages/404.astro`
- Create: equivalentes EN

- [ ] **Step 1: Crear `src/pages/instalaciones.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import Gallery from '../components/Gallery.astro';
import TrustSignals from '../components/TrustSignals.astro';
---
<Layout
  title="Instalaciones — Infinity Gun Club Panamá"
  description="Conoce el polígono de tiro más grande de Panamá. Instalaciones de clase mundial."
  lang="es"
  hreflangEs="https://infinitygunclub.netlify.app/instalaciones"
  hreflangEn="https://infinitygunclub.netlify.app/en/facilities"
>
  <NavBar lang="es" />
  <section class="py-20 bg-bg">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-4">NUESTRAS INSTALACIONES</p>
      <h1 class="font-display text-5xl text-primary mb-4">EL POLÍGONO MÁS GRANDE DE PANAMÁ</h1>
      <p class="text-muted mb-12 max-w-2xl">Instalaciones de clase mundial con los más altos estándares de seguridad.</p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { num: '20+', label: 'Puestos de tiro' },
          { num: '15+', label: 'Modelos de armas' },
          { num: '500+', label: 'Clientes anuales' },
          { num: '5★', label: 'Rating Google' },
        ].map(stat => (
          <div class="bg-surface p-6 text-center">
            <div class="font-display text-4xl text-primary">{stat.num}</div>
            <div class="text-muted text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
  <Gallery title="GALERÍA" subtitle="Instalaciones, equipos y experiencias" />
  <TrustSignals lang="es" />
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 2: Crear `src/pages/reservas.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import BookingForm from '../components/BookingForm.jsx';
---
<Layout
  title="Reserva tu Experiencia — Infinity Gun Club"
  description="Reserva tu experiencia de tiro en el polígono más grande de Panamá."
  lang="es"
  hreflangEs="https://infinitygunclub.netlify.app/reservas"
  hreflangEn="https://infinitygunclub.netlify.app/en/booking"
>
  <NavBar lang="es" />
  <section class="min-h-screen py-20 bg-bg">
    <div class="max-w-2xl mx-auto px-4">
      <p class="section-tag mb-4">RESERVA ONLINE</p>
      <h1 class="font-display text-5xl text-primary mb-2">RESERVA TU<br>EXPERIENCIA</h1>
      <p class="text-muted mb-12">Completa el formulario y te confirmaremos en menos de 24 horas.</p>
      <BookingForm lang="es" client:load />
    </div>
  </section>
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 3: Crear `src/pages/contacto.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
import ContactMap from '../components/ContactMap.astro';
---
<Layout
  title="Contacto — Infinity Gun Club Panamá"
  description="Contáctanos para reservas, cotizaciones y más información."
  lang="es"
  hreflangEs="https://infinitygunclub.netlify.app/contacto"
  hreflangEn="https://infinitygunclub.netlify.app/en/contact"
>
  <NavBar lang="es" />
  <section class="py-20 bg-bg">
    <div class="max-w-7xl mx-auto px-4">
      <p class="section-tag mb-4">CONTACTO</p>
      <h1 class="font-display text-5xl text-primary mb-12">ESTAMOS AQUÍ<br>PARA AYUDARTE</h1>
    </div>
  </section>
  <ContactMap lang="es" />
  <Footer lang="es" />
</Layout>
```

- [ ] **Step 4: Crear `src/pages/blog/[slug].astro`** — Placeholder Fase 1

```astro
---
// src/pages/blog/[slug].astro
export function getStaticPaths() {
  return []; // Se poblará en Fase 2
}
---
```

- [ ] **Step 5: Crear `src/pages/404.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import NavBar from '../components/NavBar.astro';
import Footer from '../components/Footer.astro';
---
<Layout title="404 — Infinity Gun Club" description="Página no encontrada">
  <NavBar />
  <main class="min-h-screen flex items-center justify-center text-center px-4">
    <div>
      <p class="section-tag mb-4">ERROR 404</p>
      <h1 class="font-display text-8xl text-primary mb-4">FUERA DE<br>OBJETIVO</h1>
      <p class="text-muted mb-8">Esta página no existe. Regresa al inicio.</p>
      <a href="/" class="btn-primary">VOLVER AL INICIO</a>
    </div>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 6: Crear equivalentes EN** (`en/facilities.astro`, `en/booking.astro`, `en/contact.astro`)

- [ ] **Step 7: Commit**

```bash
git add src/pages/instalaciones.astro src/pages/reservas.astro src/pages/contacto.astro src/pages/blog/ src/pages/404.astro src/pages/en/
git commit -m "feat: páginas adicionales + 404 + blog placeholder ES y EN"
```

---

## Task 13: Configurar GitHub Actions CI/CD (deploy dual)

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Crear `.github/workflows/deploy.yml`**

Copiar el workflow completo del spec en `docs/superpowers/specs/2026-04-01-infinity-gun-club-design.md` sección 10.

- [ ] **Step 2: Configurar secrets en GitHub**

Ir a GitHub → Repositorio → Settings → Secrets and variables → Actions → New repository secret:
- `NETLIFY_AUTH_TOKEN` — obtener en: Netlify → User settings → OAuth → Personal access tokens
- `NETLIFY_SITE_ID` — obtener en: Netlify → Site overview → Site ID

- [ ] **Step 3: Habilitar GitHub Pages**

GitHub → Repository → Settings → Pages → Source: **GitHub Actions**

- [ ] **Step 4: Verificar que el workflow funciona**

```bash
git add .github/
git commit -m "ci: agregar workflow deploy dual Netlify + GitHub Pages"
git push origin main
```

Luego ir a GitHub → Actions y verificar que el workflow completa sin errores.

- [ ] **Step 5: Verificar URLs**

- Netlify: `https://infinitygunclub.netlify.app`
- GitHub Pages: `https://abrinay1997-stack.github.io/INFINYGUNCLUB/`

Ambas deben mostrar el sitio correctamente.

---

## Task 14: Crear imagen placeholder y optimizar public/

**Files:**
- Create: `public/images/` (carpeta con imágenes placeholder), `public/og-default.jpg`

- [ ] **Step 1: Crear carpeta de imágenes**

```bash
mkdir -p "/c/Users/MIPC/Desktop/DESARROLLOS/INFINTY GUN CLUB/public/images"
```

- [ ] **Step 2: Crear imagen placeholder negra** para hero y galería

Crear un archivo SVG placeholder que actúa como imagen temporal:

```bash
# Crear carpeta
mkdir -p public/images

# SVG mínimo como placeholder (se sirve correctamente aunque extensión sea .jpg)
printf '<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect width="1920" height="1080" fill="#0D0D0D"/><text x="960" y="540" text-anchor="middle" fill="#FFD700" font-family="sans-serif" font-size="48" opacity="0.3">INFINITY GUN CLUB</text></svg>' > public/images/hero-bg.jpg

# Placeholders de galería
for i in 1 2 3 4 5 6; do cp public/images/hero-bg.jpg "public/images/gallery-$i.jpg"; done

# Placeholder civiles/corporativo/gobierno
cp public/images/hero-bg.jpg public/images/civiles-bg.jpg
cp public/images/hero-bg.jpg public/images/corporativo-bg.jpg
cp public/images/hero-bg.jpg public/images/gobierno-bg.jpg

# OG image placeholder
cp public/images/hero-bg.jpg public/og-default.jpg
```

Nota: El cliente proveerá fotos reales en Fase 2. Reemplazar estos placeholders por las fotos definitivas.

- [ ] **Step 3: Convertir logo a WebP**

Astro lo hace automáticamente al usar `<Image>` de `astro:assets`. Verificar que el logo en `public/Logo/LOGO.PNG` es accesible.

- [ ] **Step 4: Commit final**

```bash
git add public/
git commit -m "feat: assets public + imágenes placeholder"
```

---

## Task 15: Verificación final de calidad (Lighthouse + Core Web Vitals)

- [ ] **Step 1: Build de producción**

```bash
npm run build
npm run preview
```

- [ ] **Step 2: Verificar Astro Check (TypeScript)**

```bash
npx astro check
```

Esperado: 0 errores.

- [ ] **Step 3: Verificar Lighthouse en Chrome DevTools**

Abrir `http://localhost:4321` → DevTools → Lighthouse → Modo mobile → Analizar:
- LCP < 2.5s ✅
- CLS < 0.1 ✅
- Score Performance > 85 ✅

- [ ] **Step 4: Verificar responsive**

DevTools → Toggle device toolbar → verificar:
- Mobile (390px): Bottom nav visible, hero legible, StickyCTA aparece al scroll
- Tablet (768px): Hamburger menu, grid 2 columnas
- Desktop (1440px): Nav horizontal, grid 3 columnas, video hero

- [ ] **Step 5: Verificar bilingüismo**

- Navegar a `/en/` — contenido en inglés ✅
- Toggle ES/EN en navbar — redirige correctamente ✅
- hreflang tags presentes en `<head>` ✅

- [ ] **Step 6: Commit de cierre de Fase 1**

```bash
git add -A
git commit -m "feat: Fase 1 MVP completa — Infinity Gun Club"
git push origin main
```

---

## Resumen de la Fase 1

Al completar este plan tendrás:

| Entregable | Estado esperado |
|-----------|----------------|
| Homepage ES + EN | Completa con 10 secciones |
| Landing Civiles ES + EN | Completa con paquetes y form |
| Landing Corporativo ES + EN | Completa |
| Landing Gobierno ES + EN | Completa |
| Páginas adicionales (instalaciones, reservas, contacto) | Completas |
| 404 personalizado | Táctico, en inglés + español |
| BlogPlaceholder | Rutas configuradas para Fase 2 |
| Bilingüismo ES/EN | Routing correcto + toggle funcional |
| Deploy Netlify | Automático desde `git push main` |
| Deploy GitHub Pages | Automático desde `git push main` |
| CLAUDE.md | Documentado para el equipo |
| Bitácora de errores | Lista para registrar incidencias |
| Lighthouse Score | > 85 mobile |
| Core Web Vitals | LCP < 2.5s, CLS < 0.1 |
