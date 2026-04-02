# Infinity Gun Club — Especificación de Diseño Web
**Fecha:** 2026-04-01
**Estado:** Aprobado por cliente
**Repositorio:** https://github.com/abrinay1997-stack/INFINYGUNCLUB.git

---

## 1. Resumen del Proyecto

Sitio web comercial para **Infinity Gun Club**, el polígono de tiro y armería más grande de Panamá. La página sirve como herramienta de marketing, captación de clientes y reservas online para tres segmentos: civiles, empresas y entidades gubernamentales.

**Instagram:** https://www.instagram.com/infinitygunclub
**Ubicación:** https://share.google/TjPHdZz0bYSLIrNLO

---

## 2. Objetivos

- Posicionarse como el referente #1 en "polígono de tiro Panamá" en Google
- Captar reservas online directas (reducir fricción vs. llamada/WhatsApp)
- Presentar los 3 segmentos de clientes con mensajes diferenciados
- Superar a competidores locales (American Gun Shop, Topgun Panamá, Training Shoot Range) en UX y velocidad
- Ventaja competitiva: único sitio bilingüe ES/EN del mercado panameño

---

## 3. Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| Framework | **Astro 5** | HTML estático + React Islands → Lighthouse 95+, LCP <1.8s |
| Estilos | **Tailwind CSS** | Utility-first, sin CSS muerto, perfecto para Astro |
| Interactividad | **React** (Islands) | Solo para booking form y toggle idioma |
| Hosting primario | **Netlify** | CDN global, deploy previews, SSL automático |
| Hosting backup | **GitHub Pages** | Deploy automático desde GitHub Actions |
| Fuentes | **Google Fonts** | Bebas Neue (titulares) + Inter (cuerpo) — gratis |
| Imágenes | **AVIF + WebP + fallback** | -40% peso vs JPEG, Astro Image las genera automáticamente |
| Schema | **JSON-LD** | LocalBusiness + SportsActivityLocation + FAQPage |
| Analytics | **Google Analytics 4** | Seguimiento de conversiones y eventos |

---

## 4. Paleta de Color

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary` | `#FFD700` | Amarillo táctico — CTAs, logo, acentos |
| `--color-primary-dark` | `#FFC000` | Hover states |
| `--color-black` | `#000000` | Hero, navbar, footer |
| `--color-bg` | `#0D0D0D` | Background principal |
| `--color-surface` | `#1A1A1A` | Cards, secciones alternas |
| `--color-text-muted` | `#888888` | Subtítulos, texto secundario |
| `--color-text` | `#E8E8E8` | Texto principal |

---

## 5. Tipografía

| Rol | Fuente | Peso | Tamaño | Color |
|-----|--------|------|--------|-------|
| H1 Hero | Bebas Neue | 400 | 72–96px | `#FFD700` |
| H2 Secciones | Bebas Neue | 400 | 40–48px | `#FFFFFF` |
| Tags / Labels | Inter | 700 | 11px + uppercase + letter-spacing 4px | `#FFD700` |
| Body | Inter | 400 | 16px | `#CCCCCC` |
| CTAs | Inter | 900 | 14px + uppercase | `#000000` sobre `#FFD700` |

---

## 6. Arquitectura de Páginas

### 6.1 Homepage (`/` y `/en/`)
Página principal bilingüe con todas las secciones en el siguiente orden (probado para máxima conversión):

1. **Hero** — Video autoplay (muted/loop) + fallback imagen AVIF. Headline <8 palabras. CTA primaria "RESERVA AHORA" + secundaria "VER SERVICIOS". Tag: "EL POLÍGONO MÁS GRANDE DE PANAMÁ".
2. **Propuesta de Valor** — 3 columnas: 🛡️ Seguridad Total · ⚡ Adrenalina Real · 👨‍🏫 Instructores Pro.
3. **Cómo Funciona** — 4 pasos lineales: Elige → Reserva → Paga → ¡Vive! (+24% conversión).
4. **Social Proof** — Rating Google (4.8★), testimonios en video (60–90 seg), logos de empresas cliente.
5. **Segmentos / Servicios** — 3 tarjetas: Civiles · Corporativo · Gobierno, cada una con CTA a su landing page.
6. **Instalaciones + Galería** — "El polígono más grande de Panamá", fotos optimizadas, capacidad, equipamiento.
7. **Reserva Rápida** — Formulario 3 pasos (Datos → Fecha/Hora → Experiencia) + WhatsApp como fallback.
8. **FAQ** — 6–8 preguntas con FAQPage Schema Markup (rich snippets en Google).
9. **Trust Signals + Urgencia** — Certificaciones, "X spots disponibles esta semana", CTA final.
10. **Contacto + Mapa + Footer** — Google Maps embed, teléfono, email, horarios, redes sociales. Schema LocalBusiness.

### 6.2 Landing Pages por Segmento

| URL (ES) | URL (EN) | Segmento | Headline | CTA |
|----------|----------|----------|----------|-----|
| `/civiles` | `/en/civilians` | Público general | "Vive la adrenalina sin riesgo" | "Reserva Mi Experiencia" |
| `/corporativo` | `/en/corporate` | Empresas | "Team Building que Conecta" | "Cotiza Tu Evento" |
| `/gobierno` | `/en/government` | Instituciones | "Training Táctico Certificado" | "Solicita Propuesta" |

Cada landing page tiene: Hero propio · Value props del segmento · Testimonios específicos · Pricing/paquetes · FAQ del segmento · CTA dedicada.

### 6.3 Páginas Adicionales
- `/instalaciones` (`/en/facilities`) — Galería completa + specs del polígono
- `/reservas` (`/en/booking`) — Formulario de reserva completo
- `/contacto` (`/en/contact`) — Mapa + info + formulario de contacto
- `/blog` (`/en/blog`) — Artículos SEO (configurado desde Fase 1, contenido en Fase 2). Ruta dinámica Astro: `src/pages/blog/[slug].astro` y `src/pages/en/blog/[slug].astro`
- `404.astro` — Página de error personalizada con estilo táctico

---

## 7. Diseño Responsive

### Desktop (≥1280px)
- Navegación horizontal fija en top: Logo · Links (5 ítems) · Toggle ES/EN · CTA "RESERVA AHORA"
- Grid de 3 columnas para servicios y value props
- Hero con video full-width
- Footer con 4 columnas

### Tablet (768px–1279px)
- Navegación: Logo + hamburger menu
- Grid de 2 columnas para secciones de cards
- Hero con imagen estática (no video — mejor LCP en tablet)
- Footer con 2 columnas

### Mobile (<768px)
- **Bottom tab navigation** (4 ítems: 🏠 Inicio · 📅 Reservar · 💰 Precios · 📞 Contacto)
  - Altura fija: `56px`, `z-index: 100`, `position: fixed; bottom: 0`
  - `padding-bottom: env(safe-area-inset-bottom)` para respetar barra de gestos iOS/Android
- Hero minimalista con imagen estática
- **Sticky CTA amarilla** — aparece solo al hacer scroll (pasado el hero), se oculta al llegar al footer
  - Posición: `fixed; bottom: 56px` (encima del tab nav), `z-index: 99`, altura `48px`
  - No se muestra en páginas de reserva (evita duplicar CTA)
- Todas las grids colapsadas a 1 columna
- Formulario de reserva con inputs nativos (date picker nativo, tel input con código de país)

---

## 8. Bilingüismo ES / EN

- **Idioma por defecto:** Español (`/`)
- **Inglés:** Ruta dedicada `/en/` (no subdominio — preserva autoridad SEO)
- **Toggle:** ES | EN en navbar, preferencia guardada en `localStorage` bajo la clave `igc_lang`
- **Comportamiento de redirección del toggle:**
  - El toggle mapea la ruta actual al equivalente en el otro idioma (ej: `/instalaciones` → `/en/facilities`)
  - Si no existe ruta equivalente mapeada, redirige al homepage del idioma destino
  - Primera visita sin preferencia guardada: se detecta `navigator.language`. Si empieza por `en`, se muestra un banner sugeriendo la versión EN (no redirección automática)
- **hreflang tags:** En cada página para SEO internacional
- **Contenido:** Localizado (no solo traducido) — keywords diferentes por idioma
  - ES: "polígono de tiro", "experiencia de tiro"
  - EN: "shooting range", "gun experience"

---

## 9. SEO y Schema Markup

### Schema JSON-LD (en `<head>` de homepage)
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation"],
  "name": "INFINITY GUN CLUB",
  "description": "El polígono de tiro más grande de Panamá. Experiencias para civiles, empresas e instituciones.",
  "url": "https://infinitygunclub.netlify.app",
  "telephone": "PENDIENTE — completar con número real del cliente",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PA",
    "addressLocality": "Panama City"
  },
  "image": "https://infinitygunclub.pa/logo.webp",
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/infinitygunclub"
  ]
}
```

### Core Web Vitals Objetivo
| Métrica | Target |
|---------|--------|
| LCP | < 1.8s |
| INP | < 200ms |
| CLS | < 0.05 |
| Lighthouse | 95+ |

---

## 10. Despliegue

### Dominios

**Fase actual (demo para cliente):**
- Netlify: `infinitygunclub.netlify.app` — URL primaria de presentación
- GitHub Pages: `abrinay1997-stack.github.io/INFINYGUNCLUB` — URL backup

**Fase futura (cliente aprueba):**
- Dominio real a registrar en NIC.PA: `infinitygunclub.pa`
- Configurar CNAME en Netlify + redirect de GitHub Pages al dominio propio
- El spec y el código están listos para este cambio — solo requiere update de URL en `astro.config.mjs` y Schema JSON-LD

### Flujo CI/CD
```
git push origin main
    ↓
GitHub Actions (build Astro → /dist)
    ↓ (paralelo)
Netlify CDN → infinitygunclub.netlify.app (primaria)
GitHub Pages → abrinay1997-stack.github.io/INFINYGUNCLUB (backup)
```

### Archivos de configuración necesarios
- `.github/workflows/deploy.yml` — Build + deploy dual
- `netlify.toml` — Configuración Netlify (redirects ES/EN, headers cache)
- `astro.config.mjs` — i18n routing, React integration, image optimization
- `public/_headers` — Cache-Control para assets estáticos
- `.gitignore` — incluir `.superpowers/`, `dist/`, `node_modules/`

### Estructura del workflow `.github/workflows/deploy.yml`

```yaml
name: Build & Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build   # genera /dist

      # Deploy a Netlify (CDN primaria)
      - name: Deploy a Netlify
        uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: ./dist
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy desde GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}

      # Deploy a GitHub Pages (backup)
      - name: Upload artifact GitHub Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy-pages:
    needs: build-and-deploy
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    permissions:
      pages: write
      id-token: write
    steps:
      - name: Deploy a GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Secrets requeridos en GitHub → Settings → Secrets:**
- `NETLIFY_AUTH_TOKEN` — token de API de Netlify (Settings → OAuth → Personal access tokens)
- `NETLIFY_SITE_ID` — ID del site en Netlify (Site settings → Site ID)

---

## 11. CLAUDE.md del Proyecto

El archivo `CLAUDE.md` en la raíz del proyecto debe documentar:
- Stack tecnológico y comandos (`npm run dev`, `npm run build`, `npm run preview`)
- Skills disponibles: `frontend-design`, `web-artifacts-builder`, `seo-audit`, `commit`, `create-pr`
- Plugins activos: Canva (para assets), Supabase (si se agrega booking backend), Telegram (notificaciones)
- Agentes del proyecto:
  - **Pixel** (Frontend/Astro) — componentes, páginas, estilos
  - **Bolt** (Backend/Forms) — booking form, validaciones, integraciones
  - **Atlas** (QA) — Lighthouse, Core Web Vitals, accesibilidad
- Protocolo multi-agente: debate antes de cambios no triviales
- Referencia a `docs/errors-learned.md` como bitácora de errores

---

## 12. Bitácora de Errores

Archivo `docs/errors-learned.md` — se actualiza automáticamente cada vez que se encuentra y resuelve un error durante el desarrollo. Formato:

```markdown
## [YYYY-MM-DD] — Título breve del error
**Contexto:** Qué se estaba haciendo.
**Error:** Mensaje exacto o síntoma.
**Causa raíz:** Por qué ocurrió.
**Fix aplicado:** Qué cambio resolvió el problema.
**Prevención:** Regla a seguir en el futuro.
**Archivos:** `ruta/archivo:L42`
```

---

## 13. Fases de Implementación

### Fase 1 — MVP (semanas 1–2)
- [ ] Inicializar proyecto Astro 5 + Tailwind CSS
- [ ] Estructura de carpetas y archivos base
- [ ] CLAUDE.md + GITIGNORE + docs/errors-learned.md
- [ ] Homepage completa (todas las secciones)
- [ ] 3 Landing pages por segmento (civiles, corporativo, gobierno)
- [ ] Bilingüismo ES/EN con routing `/en/`
- [ ] GitHub Actions CI/CD → Netlify + GitHub Pages
- [ ] Schema JSON-LD LocalBusiness + FAQPage
- [ ] Lighthouse 90+, Core Web Vitals "Good"

### Fase 2 — SEO + Contenido (semanas 3–4)
- [ ] Google Analytics 4 + eventos de conversión
- [ ] Sitemap.xml dinámico + robots.txt
- [ ] Optimización de imágenes (AVIF/WebP con Astro Image)
- [ ] Google My Business sync
- [ ] Blog básico (5 artículos SEO)

### Fase 3 — Integraciones (semanas 5–6)
- [ ] Booking form conectado (Supabase o Netlify Forms)
- [ ] Confirmación por email (Resend)
- [ ] WhatsApp API para confirmaciones
- [ ] Sistema de reviews (Google Reviews embed)

---

## 14. Criterios de Éxito (3 meses)

| KPI | Target |
|-----|--------|
| Lighthouse Score | 95+ |
| Core Web Vitals | 90%+ "Good" |
| Ranking "polígono de tiro panamá" | Top 3 Google Maps |
| Tráfico orgánico | 500+ visitas/mes |
| Conversión formulario | 8–12% |
| Google Reviews | 25+ (≥4.5★) |
