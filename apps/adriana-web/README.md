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
npm run lint
```

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
