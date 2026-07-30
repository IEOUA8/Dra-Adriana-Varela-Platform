# Sitio web — Dra. Adriana Varela

Aplicación pública de autoridad médica, educación y captación de solicitudes de valoración.

## Requisitos

- Node.js `>=22.13.0` (Node 24 recomendado)
- npm

## Desarrollo local

```bash
nvm use
npm install
npm run dev
```

El servidor local usa `http://localhost:3000`.

## Verificación

```bash
npm run build
npm run build:vercel
npm run lint
```

## Despliegue

El repositorio mantiene dos destinos compatibles:

- OpenAI Sites utiliza Vinext, Cloudflare Workers y el binding D1 definido en
  `.openai/hosting.json`.
- Vercel utiliza Next.js, Node.js 24 y `npm run build:vercel`, con
  `apps/adriana-web` como directorio raíz del proyecto.

La agenda solo acepta reservas cuando existe persistencia D1. En Vercel se
muestra un estado de activación y no se recopilan datos personales hasta
conectar una base de datos persistente compatible.

## SEO de producción

- Dominio canónico: `https://www.dradrianavarela.com`.
- El dominio raíz redirige permanentemente a `www`.
- `app/robots.ts` y `app/sitemap.ts` controlan rastreo e indexación.
- `app/lib/seo.ts` centraliza metadatos, palabras clave, Open Graph, X Cards y
  datos estructurados.
- La portada social oficial está en
  `public/images/portada-seo-dra-adriana-varela.png`.
- `/agendar` conserva `noindex` mientras la persistencia de reservas permanezca
  sin configurar.

## Estructura inicial

- `app/`: rutas, layouts y componentes del sitio.
- `public/`: activos públicos optimizados.
- `db/`: esquema y acceso a datos cuando se apruebe persistencia.
- `tests/`: pruebas automatizadas.
- `.openai/hosting.json`: capacidades de infraestructura del proyecto.

## Configuración

Copiar `.env.example` como `.env.local` únicamente cuando existan integraciones confirmadas. No agregar secretos a variables con prefijo `NEXT_PUBLIC_`, al repositorio, a logs ni a respuestas de API.

La base de datos, autenticación, agenda, CRM, WhatsApp y analítica permanecen sin configurar hasta recibir proveedor, alcance y credenciales válidas.

## Fuentes de verdad

La arquitectura, los requerimientos y las restricciones clínicas/legales están documentados en la raíz del proyecto. El inventario técnico y el plan están en `02_Contexto_Tecnico_y_Plan.md`.
