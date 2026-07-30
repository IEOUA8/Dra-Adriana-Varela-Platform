# Documento Base del Ecosistema Digital  
## Dra. Adriana Varela + Canorá Medical

**Versión:** 1.0  
**Fecha:** 23 de julio de 2026  
**Propósito:** definir la arquitectura compartida, la relación entre marcas, el sistema visual y las reglas transversales que deben respetar ambos desarrollos.

---

## 1. Mandato para Codex

Asume simultáneamente los roles de:

- Principal Full-Stack Engineer.
- Software Architect.
- Product Designer senior con dirección UI/UX.
- Especialista en diseño responsive mobile-first.
- Especialista en optimización de conversión, SEO técnico, accesibilidad y analítica.
- Revisor de seguridad, privacidad y calidad de software.

No construyas dos plantillas genéricas. Diseña un ecosistema digital médico coherente, escalable y mantenible, con una misma raíz institucional y dos expresiones de marca claramente diferenciadas.

Antes de escribir código:

1. Lee este documento y los dos documentos maestros.
2. Genera un inventario de requerimientos y dependencias.
3. Propón la estructura del repositorio y un plan por fases.
4. Identifica credenciales, textos, imágenes, datos médicos, datos legales y decisiones comerciales aún pendientes.
5. Implementa primero la infraestructura compartida, luego cada aplicación.
6. No inventes credenciales, registros profesionales, certificaciones, resultados clínicos, precios, testimonios, números INVIMA ni afirmaciones médicas.
7. Usa contenido provisional claramente marcado cuando falte información.
8. No expongas secretos en frontend, repositorio, logs o respuestas de API.
9. No declares una tarea terminada mientras existan errores de compilación, tipado, lint, accesibilidad crítica o pruebas esenciales fallidas.

---

## 2. Lectura estratégica de las marcas

### 2.1 Dra. Adriana Varela

Marca personal médica orientada a:

- Autoridad profesional.
- Confianza y cercanía.
- Filosofía de envejecimiento saludable.
- Explicación clara de tratamientos y criterios clínicos.
- Conversión a valoración o consulta.
- Construcción de reputación y posicionamiento orgánico.

La web debe responder: **¿por qué confiar en la Dra. Adriana y por qué agendar una valoración con ella?**

### 2.2 Canorá Medical

Marca institucional y comercial orientada a:

- Presentar la clínica, sus áreas, servicios, tecnología y equipo.
- Organizar una oferta amplia sin saturar al usuario.
- Convertir tráfico en citas, conversaciones de WhatsApp y compras.
- Operar catálogo, carrito, checkout, pagos, pedidos e inventario.
- Escalar contenidos, campañas, landing pages y alianzas.

La web debe responder: **¿qué solución ofrece Canorá, cómo funciona, dónde se presta y cuál es el siguiente paso?**

### 2.3 Relación entre marcas

- Adriana es la autoridad médica visible y fundadora/directora clínica.
- Canorá es el entorno institucional donde se prestan servicios y se comercializan productos autorizados.
- Ambas marcas deben enlazarse de forma contextual, no invasiva.
- El usuario no debe sentir que ha entrado a dos empresas desconectadas.
- Cada dominio debe conservar su identidad, sitemap, SEO, analítica y embudo propio.
- Evitar duplicar exactamente textos extensos entre dominios para no diluir el posicionamiento orgánico.

---

## 3. Diagnóstico de partida

### Sitio actual de la Dra. Adriana

La home actual concentra:

- Mensaje sobre envejecimiento.
- Tres áreas generales: medicina regenerativa, funcional y estética.
- Biografía breve.
- Testimonios.
- CTA a WhatsApp.
- Enlaces a Canorá.

Problemas a resolver:

- Arquitectura excesivamente corta para una marca médica de autoridad.
- Falta de páginas profundas por tratamiento o enfoque.
- Escasa demostración de metodología, experiencia, credenciales y proceso.
- Ausencia de un flujo de valoración estructurado.
- Pocas respuestas a objeciones y dudas.
- SEO semántico limitado.
- Conversión dependiente casi exclusivamente de WhatsApp.

### Sitio actual de Canorá

La home actual reúne:

- Declaración institucional.
- Tres áreas médicas.
- Listas de tratamientos.
- CTA a WhatsApp.

Problemas a resolver:

- Servicios presentados como inventario de nombres, sin jerarquía clínica ni rutas por necesidad.
- Repetición de bloques y categorías.
- Ausencia de páginas de detalle suficientemente persuasivas.
- Falta de equipo, tecnología, proceso, evidencia, preguntas frecuentes y recursos.
- No existe una experiencia comercial visible para farmacia, carrito y checkout.
- Falta una arquitectura preparada para campañas, SEO local y expansión.

Este diagnóstico no sustituye una auditoría con acceso a Analytics, Search Console, hosting, CMS, servidor, base de datos o historial de conversiones.

---

## 4. Principios de experiencia

1. **Mobile-first real:** diseñar primero para 360–430 px.
2. **Claridad clínica:** una idea principal por sección.
3. **Confianza antes de persuasión:** credenciales, proceso, contexto y seguridad.
4. **Conversión sin presión:** CTAs claros, elegantes y no agresivos.
5. **Lenguaje comprensible:** evitar tecnicismos sin explicación.
6. **Interacciones táctiles:** objetivos de toque amplios y feedback inmediato.
7. **Glassmorphism funcional:** usarlo para jerarquía, navegación, tarjetas y overlays; nunca para sacrificar contraste o legibilidad.
8. **Movimiento con propósito:** animaciones cortas, discretas y compatibles con `prefers-reduced-motion`.
9. **Carga progresiva:** priorizar contenido crítico, imágenes responsivas y componentes diferidos.
10. **Privacidad por diseño:** recolectar únicamente los datos necesarios.

---

## 5. Sistema visual institucional compartido

### 5.1 Dirección estética

Concepto: **ciencia consciente + bienestar contemporáneo + precisión clínica**.

La identidad debe sentirse:

- Médica, no hospitalaria.
- Premium, no ostentosa.
- Humana, no genérica.
- Tecnológica, no futurista en exceso.
- Femenina en sensibilidad, no estereotipada.

### 5.2 Paleta base propuesta

Definir tokens, no valores dispersos:

- `--color-ivory`: fondo cálido principal.
- `--color-white`: superficies limpias.
- `--color-graphite`: texto principal.
- `--color-slate`: texto secundario.
- `--color-sage`: bienestar y equilibrio.
- `--color-emerald`: acento institucional Canorá.
- `--color-champagne`: acento premium Adriana.
- `--color-bronze`: detalles y estados destacados.
- `--color-success`, `--color-warning`, `--color-error`, `--color-info`.

Los valores definitivos deben extraerse o validarse contra los logos y materiales oficiales.

### 5.3 Diferenciación

**Adriana**
- Más cálida, editorial y personal.
- Mayor uso de marfil, champagne, fotografía de retrato y espacios de respiración.
- Composición narrativa.

**Canorá**
- Más clínica, modular y operativa.
- Mayor uso de blanco, verde mineral, vidrio translúcido y grillas.
- Composición orientada a servicios, equipo, tecnología y comercio.

### 5.4 Tipografía

- Serif editorial de alto contraste para titulares seleccionados.
- Sans serif contemporánea y muy legible para navegación, cuerpo, UI y comercio.
- Cargar fuentes localmente o mediante un proveedor optimizado.
- Evitar más de dos familias.
- Escala tipográfica con `clamp()`.
- Texto base móvil mínimo recomendado: 16 px.

### 5.5 Glassmorphism

Reglas obligatorias:

- Contraste AA como mínimo.
- Fondos con suficiente opacidad.
- Borde sutil y sombra corta.
- `backdrop-filter` solo como mejora progresiva.
- Fallback sólido para navegadores incompatibles.
- No colocar párrafos largos sobre fondos fotográficos translúcidos.
- Evitar múltiples capas de blur que afecten rendimiento.

### 5.6 Motion

- Duración general: 140–320 ms.
- Easing consistente.
- Microinteracciones en hover, focus, tap, accordions y cambio de estado.
- Parallax muy limitado.
- Nada debe depender exclusivamente de animación para entenderse.
- Respetar `prefers-reduced-motion`.

---

## 6. Navegación compartida

### Desktop

Header sticky translúcido con:

- Logo.
- Navegación principal.
- Mega menú o panel desplegable para áreas y servicios.
- CTA primario.
- CTA secundario o acceso a tienda, según dominio.
- Estado visual al hacer scroll.
- Navegación por teclado y cierre con `Escape`.
- Manejo correcto de foco.

### Móvil

- Header compacto.
- Botón menú accesible.
- Panel tipo sheet de altura completa o casi completa.
- Secciones en acordeón.
- CTA persistente pero no obstructivo.
- Cierre al navegar.
- Bloqueo de scroll del fondo.
- Área táctil mínima de 44 × 44 px.

### Cross-linking

- En Adriana: “Conoce Canorá Medical”.
- En Canorá: “Dirección médica: Dra. Adriana Varela”.
- El enlace debe abrir en la misma pestaña salvo decisión explícita.
- Mantener parámetros UTM cuando la navegación provenga de campañas.

---

## 7. Arquitectura técnica recomendada

### 7.1 Repositorio

Preferencia: monorepo.

```text
/
├─ apps/
│  ├─ adriana-web/
│  ├─ canora-web/
│  └─ admin/
├─ packages/
│  ├─ ui/
│  ├─ design-tokens/
│  ├─ database/
│  ├─ auth/
│  ├─ analytics/
│  ├─ seo/
│  ├─ validation/
│  ├─ config/
│  └─ types/
├─ docs/
├─ tests/
├─ scripts/
└─ infrastructure/
```

### 7.2 Stack

- Next.js con App Router.
- TypeScript en modo estricto.
- React Server Components cuando aporten valor.
- Tailwind CSS o sistema equivalente basado en tokens.
- Componentes accesibles basados en primitives robustas.
- Supabase para PostgreSQL, autenticación, almacenamiento y funciones cuando aplique.
- Validación compartida de entrada con esquemas.
- Formularios con validación cliente-servidor.
- Tests unitarios, integración y E2E.
- Despliegue con entornos preview, staging y producción.
- Gestor de paquetes y lockfile único.

No fijar versiones arbitrarias en este documento. Al iniciar el proyecto, seleccionar versiones estables compatibles, documentarlas y bloquearlas en el lockfile.

### 7.3 Estrategia de contenido

Contenido administrable mediante:

- Panel propio respaldado por Supabase, o
- CMS headless validado antes de iniciar.

No dejar textos comerciales importantes hardcodeados si el equipo deberá actualizarlos con frecuencia.

### 7.4 Separación de datos

- Leads de Adriana y Canorá deben conservar `source`, `campaign`, `landing_page`, `service_interest` y consentimiento.
- Pedidos y datos comerciales no deben mezclarse con notas clínicas.
- No almacenar historias clínicas en este alcance.
- Cualquier dato de salud debe tratarse como sensible, con minimización y consentimiento explícito.

---

## 8. Analítica y medición

Implementar capa de eventos centralizada:

```text
page_view
view_service
view_professional_profile
click_primary_cta
click_whatsapp
start_booking
submit_booking
booking_success
view_item
add_to_cart
remove_from_cart
view_cart
begin_checkout
add_shipping_info
add_payment_info
purchase
search
view_search_results
newsletter_signup
form_error
```

Requisitos:

- GA4.
- Meta Pixel.
- Integración opcional con Google Ads.
- UTMs persistentes durante la sesión.
- Consentimiento antes de activar etiquetas no esenciales.
- Eventos sin información médica sensible.
- Dashboard de conversión por dominio, canal, campaña y servicio.
- Evitar doble disparo por navegación SPA o reintentos.

---

## 9. SEO transversal

- Metadata única por página.
- Canonical correcta.
- Sitemap XML por dominio.
- `robots.txt`.
- Open Graph y Twitter Cards.
- Breadcrumbs.
- JSON-LD coherente con contenido visible.
- `Organization`, `Person`/`Physician`, `MedicalClinic`, `LocalBusiness`, `Service`, `Product`, `BreadcrumbList` y otros tipos únicamente cuando correspondan.
- URLs breves, semánticas y estables.
- Redirecciones 301 desde rutas antiguas.
- Página 404 útil.
- Imágenes con `alt` descriptivo.
- Blog con autor, revisión médica y fecha de actualización.
- No usar FAQs falsas o generadas para manipular resultados.

---

## 10. Rendimiento y accesibilidad

### Objetivos técnicos

- LCP ≤ 2,5 s.
- INP ≤ 200 ms.
- CLS ≤ 0,1.
- Evaluar en percentil 75 y dispositivos móviles reales.
- Lighthouse como herramienta de diagnóstico, no como único criterio.
- Presupuesto de JavaScript por ruta.
- Imágenes AVIF/WebP con tamaños responsivos.
- Preload solo de recursos críticos.
- Evitar videos pesados en el primer viewport.
- Cache y revalidación definidos por tipo de contenido.

### Accesibilidad

Objetivo: WCAG 2.2 nivel AA.

- Navegación completa por teclado.
- Focus visible.
- Jerarquía semántica.
- Labels asociados.
- Errores de formulario comprensibles.
- Contraste suficiente.
- No depender del color.
- Control de zoom.
- Targets táctiles adecuados.
- Modales y drawers con focus trap.
- Mensajes dinámicos con regiones `aria-live`.
- Alternativa a animaciones.

---

## 11. Seguridad y privacidad

- HTTPS obligatorio.
- Secrets solo en entorno seguro.
- RLS en todas las tablas expuestas mediante Supabase.
- Autorización por rol en servidor.
- Sanitización y validación.
- Rate limiting.
- Protección CSRF donde aplique.
- Webhooks firmados e idempotentes.
- Logs sin datos sensibles.
- Backups y restauración probada.
- Política de retención.
- Consentimiento separado para contacto y marketing.
- No usar checkbox preseleccionado.
- Aviso de privacidad accesible desde formularios.
- Política de cookies y gestor de consentimiento.
- Revisión legal antes de producción.

---

## 12. Roles administrativos compartidos

```text
super_admin
content_manager
medical_reviewer
marketing_manager
clinic_manager
store_manager
inventory_manager
order_manager
support_agent
analyst_readonly
```

Cada rol debe tener permisos mínimos necesarios.

---

## 13. Integraciones

Preparar adaptadores desacoplados para:

- WhatsApp.
- CRM.
- Proveedor de agenda.
- Email transaccional.
- Pasarela de pagos.
- Operador logístico.
- Facturación.
- Analítica.
- Almacenamiento de medios.

Una integración no debe contaminar los componentes de UI ni acoplar el dominio a un proveedor específico.

---

## 14. Calidad y definición de terminado

Una funcionalidad solo está terminada cuando:

- Compila.
- Pasa TypeScript estricto.
- Pasa lint.
- Tiene estados loading, empty, error y success.
- Funciona en móvil, tablet y desktop.
- Es operable por teclado.
- Tiene tracking validado.
- Tiene pruebas relevantes.
- No expone datos sensibles.
- Cuenta con documentación.
- Tiene criterios de aceptación verificados.

---

## 15. Fuentes normativas y técnicas de referencia

Revisar siempre la versión vigente antes del lanzamiento:

- Sitio actual Dra. Adriana Varela: https://dradrianavarela.com/
- Sitio actual Canorá Medical: https://canoramedical.com/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Core Web Vitals: https://web.dev/articles/vitals
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- SIC, protección de datos: https://www.sic.gov.co/
- INVIMA: https://www.invima.gov.co/
- Resolución 1896 de 2023 y normas que la modifiquen o sustituyan.

Este documento no constituye concepto jurídico, médico ni regulatorio.
