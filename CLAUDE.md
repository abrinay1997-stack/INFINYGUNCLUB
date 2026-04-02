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
- `npm run dev` — Servidor local en localhost:4321
- `npm run build` — Build de producción → /dist
- `npm run preview` — Preview del build

## Agentes del Proyecto
| Agente | Rol |
|--------|-----|
| **Pixel** | Frontend/Astro — componentes, páginas, estilos |
| **Bolt** | Backend/Forms — BookingForm, validaciones |
| **Atlas** | QA — Lighthouse, Core Web Vitals |

## Skills Disponibles
- `frontend-design`, `web-artifacts-builder`, `seo-audit`, `commit`, `create-pr`, `simplify`

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
- `src/components/` — Componentes Astro + React Islands
- `src/pages/en/` — Rutas EN (español es el default en `/`)

## Colores (Tailwind tokens)
- `primary` = #FFD700 | `bg` = #0D0D0D | `surface` = #1A1A1A

## Spec y Plan
- Spec: `docs/superpowers/specs/2026-04-01-infinity-gun-club-design.md`
- Plan: `docs/superpowers/plans/2026-04-01-infinity-gun-club-phase1.md`
- Bitácora: `docs/errors-learned.md`
