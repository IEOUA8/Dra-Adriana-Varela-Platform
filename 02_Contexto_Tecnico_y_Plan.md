# Contexto técnico y plan de desarrollo

**Estado:** entorno base preparado  
**Alcance actual:** sitio profesional de la Dra. Adriana Varela  
**Fuentes de verdad:** `00_Arquitectura_Compartida_Adriana_Canora.md`, `01_Documento_Maestro_Dra_Adriana_Varela.md` y `colores.jpeg`

## 1. Decisiones técnicas iniciales

- Aplicación web en `apps/adriana-web`.
- Next.js 16 con App Router sobre Vinext/Vite.
- React 19.
- TypeScript 5 en modo estricto.
- Tailwind CSS 4, con tokens de diseño centralizados.
- Node.js `>=22.13.0`; para este entorno se validó Node.js 24.
- Gestor de paquetes: npm, con lockfile.
- Base compatible con Cloudflare Workers/Sites; el proveedor final de despliegue permanece pendiente de confirmación.
- Supabase/PostgreSQL es la recomendación del documento de arquitectura y permanece pendiente de confirmación. Drizzle viene disponible en la base, pero no se adopta como sustituto ni se crean tablas en esta fase.
- Desarrollo mobile-first con objetivo WCAG 2.2 AA y Core Web Vitals.

La aplicación se mantiene dentro de `apps/` para permitir que el repositorio evolucione al monorepo descrito en la arquitectura compartida:

```text
/
├─ apps/
│  ├─ adriana-web/        # preparado
│  ├─ canora-web/         # futuro
│  └─ admin/              # futuro
├─ packages/              # futuro: UI, tokens, validación, analítica, tipos
└─ docs/                  # documentación adicional futura
```

No se crean todavía aplicaciones o paquetes vacíos que no tengan una necesidad funcional confirmada.

## 2. Inventario funcional priorizado

### Fase 1 — Fundamentos y home

- [x] Sistema visual inicial y tokens derivados de la identidad de referencia.
- [x] Header accesible y navegación responsive.
- [x] Hero editorial con propuesta de valor y contenido provisional marcado.
- [x] Rutas de entrada por necesidad.
- [x] Tres enfoques médicos con lenguaje prudente.
- [x] Método de valoración.
- [x] Perfil resumido con estado pendiente de verificación.
- [x] Estado protegido para tratamientos todavía no aprobados.
- [x] Recursos previstos, preguntas frecuentes, CTA final y footer.
- [x] Metadata base, no indexación durante desarrollo e imagen social.
- [ ] Sitemap, `robots.txt` de producción y datos estructurados.
- [ ] Capa centralizada de eventos, inicialmente desacoplada de proveedores.
- [ ] Sustituir monogramas por logo y fotografía oficiales.
- [ ] Revisión médica, de marca y legal del contenido provisional.

### Fase 2 — Autoridad y contenido

- [x] Sobre mí, con información suministrada y estado de verificación.
- [x] Páginas de medicina regenerativa, funcional y estética.
- [x] Inventario estructurado de servicios y slugs por enfoque.
- [ ] Plantilla administrable de detalle de tratamientos.
- Método de valoración.
- Preguntas frecuentes.
- Recursos y artículos con autoría, revisión médica y referencias.

### Fase 3 — Conversión

- Flujo de solicitud de valoración.
- Consentimiento de tratamiento de datos no preseleccionado.
- WhatsApp contextual.
- Integración con agenda y CRM mediante adaptadores.
- Estados de carga, error, éxito y reintento.
- Analítica de conversión sin datos médicos sensibles.

### Fase 4 — Administración

- Contenido, credenciales, tratamientos, artículos, testimonios, FAQ y SEO.
- Flujo editorial `draft → medical_review → approved → published → archived`.
- Roles mínimos, auditoría y RLS.

## 3. Dependencias y decisiones pendientes

### Identidad y contenido

- Logo oficial en formato vectorial y sus variantes.
- Retratos y fotografías auténticas con derechos de uso.
- Filosofía médica y biografía narrativa final.
- Soportes verificables de credenciales, formación, certificaciones y registro profesional.
- Lista aprobada y priorizada de tratamientos.
- Dirección exacta en Pereira, horarios, teléfonos, correo, redes y enlaces oficiales.
- Testimonios y casos con consentimiento documentado.
- Artículos y responsables de revisión médica.
- Dominio final y accesos DNS/hosting.

### Conversión e integraciones

- Número y cuenta de WhatsApp Business.
- Proveedor y flujo de agenda.
- CRM y campos requeridos.
- Proveedor de correo transaccional.
- Reglas de notificación y responsables internos.

### Analítica y marketing

- GA4 y contenedor de Google Tag Manager, si se usará.
- Meta Pixel.
- Google Ads, Search Console y campañas.
- Categorías de consentimiento de cookies.
- Convención definitiva de UTMs y dominios de referencia.

### Legal, privacidad y cumplimiento

- Política de privacidad.
- Política de tratamiento de datos.
- Política de cookies.
- Términos de uso.
- Datos profesionales legalmente requeridos.
- Revisión jurídica colombiana antes de producción.
- Validación médica de toda afirmación clínica, contraindicaciones y expectativas.

## 4. Reglas no negociables

- No inventar credenciales, certificaciones, registros, resultados, precios, testimonios o afirmaciones médicas.
- Marcar como provisional cualquier contenido pendiente de aprobación.
- No solicitar diagnósticos, historia clínica, documentos o fotografías médicas en el primer contacto público.
- No almacenar historias clínicas en este alcance.
- No enviar información médica sensible a herramientas de analítica.
- Mantener secretos únicamente en variables de entorno del servidor.
- Activar analítica no esencial solo después del consentimiento.
- No publicar contenido generado sin revisión médica y editorial.

## 5. Paleta de referencia

Valores impresos en `colores.jpeg`, pendientes de validación contra archivos maestros de marca:

- Marrón: `#703d22`
- Oliva mineral: `#6d6c51`
- Champagne: `#f5d69b`
- Marfil: `#f4f3e2`
- Verde profundo: `#273016`

La implementación debe convertir estos valores en tokens semánticos y validar contraste antes de asignarlos a texto, fondos y controles.

## 6. Criterio de avance

Cada fase debe cerrar con compilación, tipado estricto, lint, pruebas relevantes, navegación por teclado, revisión responsive, ausencia de errores críticos de consola y comprobación de que no se exponen datos sensibles.
