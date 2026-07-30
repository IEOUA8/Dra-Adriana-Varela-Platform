# Documento Maestro de Desarrollo  
## Sitio Web Profesional — Dra. Adriana Varela

**Dominio:** `dradrianavarela.com`  
**Versión:** 1.0  
**Fecha:** 23 de julio de 2026  
**Tipo de producto:** sitio médico de autoridad, educación y captación de valoraciones.

---

## 1. Visión

Transformar el sitio de la Dra. Adriana Varela en una plataforma de autoridad médica contemporánea que comunique de forma clara su enfoque en medicina regenerativa, funcional y estética; explique el valor de una valoración personalizada; genere confianza antes del contacto y convierta tráfico orgánico y publicitario en citas calificadas.

La experiencia debe sentirse personal, clínica, elegante y consciente. No debe parecer una landing genérica de estética ni un catálogo de procedimientos.

---

## 2. Rol que debe asumir Codex

Actúa como:

- Principal Full-Stack Developer.
- Arquitecto de software.
- Director de UI/UX.
- Especialista en CRO para servicios médicos.
- Especialista en SEO médico y SEO local.
- Especialista en accesibilidad y rendimiento.
- Revisor de privacidad y seguridad.

Debes cuestionar inconsistencias, documentar decisiones y proteger la integridad clínica de los contenidos.

---

## 3. Objetivos de negocio

1. Aumentar solicitudes de valoración.
2. Elevar la percepción de autoridad y confianza.
3. Diferenciar a la doctora de ofertas estéticas genéricas.
4. Explicar su filosofía de envejecimiento saludable.
5. Posicionar servicios y contenidos en buscadores.
6. Conectar de manera natural con Canorá Medical.
7. Crear una base escalable para campañas y landing pages.
8. Medir conversiones por servicio, canal y campaña.

---

## 4. Objetivos de usuario

El usuario debe poder:

- Entender quién es la doctora en menos de 15 segundos.
- Reconocer qué problemas o necesidades atiende.
- Explorar enfoques y tratamientos sin sentirse abrumado.
- Ver credenciales verificables.
- Conocer el proceso de valoración.
- Resolver dudas frecuentes.
- Identificar la ubicación de atención.
- Contactar o solicitar una cita.
- Llegar a Canorá cuando necesite información institucional.
- Leer contenidos educativos revisados médicamente.

---

## 5. Audiencias

### Primaria

Personas interesadas en:

- Envejecimiento saludable.
- Rejuvenecimiento natural.
- Medicina regenerativa.
- Medicina funcional.
- Salud metabólica y bienestar integral.
- Tratamientos estéticos médicos.
- Cuidado de piel y armonización.

### Secundaria

- Pacientes actuales.
- Personas referidas.
- Usuarios provenientes de Meta Ads o Google Ads.
- Profesionales y aliados.
- Personas que conocieron primero Canorá.

No asumir sexo, edad, diagnóstico o poder adquisitivo sin datos reales.

---

## 6. Propuesta de posicionamiento

### Idea central

**Envejecer es natural. Hacerlo con salud, consciencia y acompañamiento médico es una decisión.**

### Pilares

1. Ciencia y actualización.
2. Valoración individual.
3. Naturalidad.
4. Bienestar integral.
5. Seguridad.
6. Resultados responsables.
7. Acompañamiento.

### Tono

- Profesional.
- Cálido.
- Sereno.
- Didáctico.
- Preciso.
- Sin promesas absolutas.
- Sin presión comercial.

---

## 7. Arquitectura de información

```text
/
├─ /sobre-mi
├─ /enfoques
│  ├─ /medicina-regenerativa
│  ├─ /medicina-funcional
│  └─ /medicina-estetica
├─ /tratamientos
│  └─ /[slug]
├─ /metodo-de-valoracion
├─ /resultados-y-testimonios
├─ /recursos
│  ├─ /articulos
│  └─ /articulos/[slug]
├─ /preguntas-frecuentes
├─ /contacto
├─ /agendar
├─ /politica-de-privacidad
├─ /tratamiento-de-datos
├─ /politica-de-cookies
└─ /terminos-de-uso
```

La lista final de tratamientos debe ser aprobada por la doctora antes de publicar.

---

## 8. Home — especificación

### 8.1 Header

- Logo.
- Sobre mí.
- Enfoques, con mega menú.
- Tratamientos.
- Recursos.
- Canorá Medical.
- CTA “Agendar valoración”.
- Header sticky con fondo vidrio al hacer scroll.
- Navegación accesible.

### 8.2 Hero

Debe contener:

- Eyebrow de credencial o especialidad validada.
- H1 de posicionamiento.
- Texto breve orientado al usuario.
- CTA primario: “Agendar valoración”.
- CTA secundario: “Conocer mi enfoque”.
- Retrato profesional auténtico.
- Indicadores de confianza verificables, sin números inventados.
- Mensaje de ubicación cuando esté confirmado.

Ejemplo provisional:

> Medicina para acompañarte a envejecer con salud, naturalidad y consciencia.

No publicar este texto sin revisión final de marca y médica.

### 8.3 Problemas o necesidades

Presentar rutas de entrada comprensibles:

- Recuperar vitalidad.
- Comprender desequilibrios.
- Cuidar la piel.
- Envejecer de forma saludable.
- Buscar armonización sin perder naturalidad.
- Recibir un plan personalizado.

Cada ruta enlaza a un enfoque o servicio, no a una lista genérica.

### 8.4 Enfoques médicos

Tres tarjetas o paneles:

- Medicina regenerativa.
- Medicina funcional.
- Medicina estética.

Cada una debe incluir:

- Qué busca.
- Para quién puede ser relevante.
- Qué ocurre en la valoración.
- CTA “Explorar enfoque”.

### 8.5 Método clínico

Secuencia:

1. Escucha y antecedentes.
2. Valoración.
3. Definición de objetivos.
4. Plan personalizado.
5. Seguimiento y ajustes.

No presentar el proceso como garantía de resultado.

### 8.6 Sobre la doctora

- Retrato.
- Biografía.
- Formación y credenciales verificables.
- Filosofía médica.
- Enlace a perfil completo.
- Enlace institucional a Canorá.

### 8.7 Tratamientos destacados

Máximo 4–6, seleccionados por prioridad comercial y clínica.

Cada tarjeta:

- Nombre.
- Beneficio explicado con prudencia.
- Categoría.
- Duración o número de sesiones solo si es validado.
- CTA a detalle.

### 8.8 Confianza

- Testimonios autorizados.
- Logos o acreditaciones autorizadas.
- Tecnología usada, cuando corresponda.
- Nota sobre valoración individual.
- Antes/después únicamente con autorización, contexto y cumplimiento normativo.

### 8.9 Recursos

Tres artículos recientes o priorizados.

### 8.10 CTA final

- Resumen de valor.
- CTA a agenda.
- Alternativa WhatsApp.
- Información sobre dónde se presta la atención.

### 8.11 Footer

- Navegación.
- Contacto.
- Redes oficiales.
- Canorá Medical.
- Datos profesionales legalmente requeridos.
- Políticas.
- Aviso: el contenido educativo no reemplaza una valoración médica.

---

## 9. Página “Sobre mí”

Debe incluir:

- Historia profesional.
- Propósito.
- Formación.
- Certificaciones.
- Experiencia.
- Asociaciones.
- Enfoque clínico.
- Filosofía de naturalidad.
- Rol en Canorá.
- Fotografías auténticas.
- CTA.

Crear modelo de datos para credenciales:

```ts
type Credential = {
  id: string
  title: string
  institution?: string
  country?: string
  issuedAt?: string
  expiresAt?: string
  verificationUrl?: string
  displayOrder: number
  isPublic: boolean
}
```

No mostrar una credencial sin respaldo documental.

---

## 10. Páginas de enfoque

Cada página debe tener:

1. Hero específico.
2. Explicación sencilla.
3. Situaciones en las que se considera.
4. Cómo se realiza la valoración.
5. Tratamientos relacionados.
6. Expectativas realistas.
7. Seguridad y contraindicaciones generales, revisadas médicamente.
8. FAQ.
9. CTA.
10. Artículos relacionados.

Evitar texto duplicado entre enfoques.

---

## 11. Páginas de tratamiento

Plantilla administrable:

```text
Hero
Resumen
Qué es
Qué objetivo puede abordar
Para quién puede ser considerado
Valoración previa
Cómo se realiza
Preparación
Cuidados posteriores
Resultados esperables
Número de sesiones, si aplica
Contraindicaciones
Preguntas frecuentes
Profesional responsable
Ubicación
CTA
Contenido relacionado
```

Campos sugeridos:

```ts
type Treatment = {
  id: string
  slug: string
  name: string
  shortDescription: string
  categoryId: string
  heroImage?: string
  overview: RichText
  indications?: RichText
  process?: RichText
  preparation?: RichText
  aftercare?: RichText
  expectedOutcomes?: RichText
  contraindications?: RichText
  sessionInfo?: RichText
  priceFrom?: number
  showPrice: boolean
  featured: boolean
  status: "draft" | "medical_review" | "published" | "archived"
  reviewedBy?: string
  reviewedAt?: string
  seoTitle?: string
  seoDescription?: string
}
```

Los precios se mostrarán solo si la estrategia comercial lo aprueba.

---

## 12. Agenda y conversión

### Flujo mínimo

1. Seleccionar interés.
2. Elegir canal de contacto.
3. Ingresar nombre, teléfono y correo opcional.
4. Aceptar tratamiento de datos.
5. Confirmación.
6. Envío a CRM.
7. Evento de conversión.
8. Handoff a WhatsApp o agenda.

### Datos permitidos en primer contacto

- Nombre.
- Teléfono.
- Correo.
- Ciudad.
- Interés general.
- Preferencia horaria.
- Consentimiento.

No pedir diagnóstico detallado, historia clínica, documentos o fotografías médicas en un formulario público inicial.

### WhatsApp contextual

Generar mensaje según página:

```text
Hola, visité la página de [servicio] en dradrianavarela.com y quisiera recibir información para una valoración.
```

Añadir UTMs y origen al registro interno, no necesariamente al mensaje visible.

---

## 13. Testimonios y casos

Requisitos:

- Consentimiento documentado.
- Nombre completo o anonimización según autorización.
- No alterar el sentido del testimonio.
- No presentar un caso individual como resultado garantizado.
- Fecha y servicio asociados, si existe permiso.
- Moderación y estado de publicación.
- Fotografías con autorización independiente.

Modelo:

```ts
type Testimonial = {
  id: string
  displayName: string
  quote: string
  treatmentId?: string
  mediaUrl?: string
  consentReference: string
  featured: boolean
  status: "draft" | "approved" | "published" | "archived"
}
```

---

## 14. Blog y estrategia de contenidos

Categorías iniciales:

- Envejecimiento saludable.
- Medicina regenerativa.
- Medicina funcional.
- Piel y estética médica.
- Bienestar.
- Preguntas frecuentes.

Cada artículo:

- Autor.
- Revisor médico.
- Fecha de publicación.
- Fecha de actualización.
- Referencias cuando aplique.
- CTA contextual.
- Contenido relacionado.
- Schema `Article`.
- Aviso educativo.

No publicar contenido generado por IA sin revisión médica y editorial.

---

## 15. Diseño UI

### Sensación

- Editorial.
- Luminosa.
- Humana.
- Premium discreta.
- Fotografía auténtica.

### Componentes clave

- Header glass.
- Mega menú.
- Hero editorial.
- Cards de enfoque.
- Timeline de método.
- Credential list.
- Testimonial carousel accesible.
- FAQ accordion.
- CTA panels.
- Blog cards.
- Booking sheet.
- WhatsApp floating action control.
- Breadcrumbs.
- Toasts.
- Skeletons.
- Empty/error states.

### Reglas mobile

- CTA visible sin tapar contenido.
- Cards de una columna.
- Tipografía fluida.
- Carruseles con alternativa de lista.
- Accordions con targets grandes.
- Formularios en una columna.
- Teclado y autocompletado correctos.
- No usar hover como único descubrimiento.

---

## 16. SEO específico

### Entidades

- `Person` o `Physician`.
- `MedicalBusiness`/`MedicalClinic` cuando corresponda al lugar de atención.
- `Service`.
- `Article`.
- `BreadcrumbList`.

### Estrategia de keywords

Construir después de investigación:

- Marca personal.
- Especialidades reales.
- Tratamientos.
- Necesidades del paciente.
- Ubicación.
- Preguntas educativas.

No crear páginas locales falsas ni repetir ciudad de forma artificial.

---

## 17. Analítica

Eventos adicionales:

```text
view_about_doctor
view_credential
view_treatment
select_treatment_interest
click_canora_link
start_assessment_request
submit_assessment_request
click_whatsapp_from_treatment
read_article_75
```

Dashboard:

- Sesiones.
- Conversión a lead.
- Conversión por tratamiento.
- WhatsApp clicks.
- Formularios completados.
- Artículos que asisten conversiones.
- Fuente y campaña.

---

## 18. Panel administrativo

Módulos:

- Perfil de la doctora.
- Credenciales.
- Enfoques.
- Tratamientos.
- Artículos.
- Testimonios.
- FAQs.
- Medios.
- SEO.
- Leads.
- Redirecciones.
- Usuarios y roles.
- Auditoría de cambios.

Flujo editorial:

```text
draft → medical_review → approved → scheduled/published → archived
```

Registrar quién cambió contenido clínico y cuándo.

---

## 19. Modelo de datos mínimo

```text
profiles
credentials
service_categories
treatments
treatment_faqs
articles
article_categories
article_authors
testimonials
media_assets
leads
lead_consents
locations
site_settings
seo_redirects
users
roles
audit_logs
```

Aplicar RLS y separar permisos.

---

## 20. API y acciones de servidor

Ejemplos:

```text
POST /api/leads
POST /api/newsletter
GET  /api/treatments
GET  /api/articles
POST /api/contact
POST /api/webhooks/crm
```

Requisitos:

- Validación estricta.
- Rate limit.
- Honeypot o mecanismo antispam.
- Idempotencia cuando aplique.
- Respuestas sin filtrar errores internos.
- Trazabilidad.

---

## 21. Migración

1. Inventariar URLs actuales.
2. Extraer y clasificar contenido reutilizable.
3. Validar textos con la doctora.
4. Preparar mapa de redirecciones.
5. Migrar testimonios con sus autorizaciones.
6. Optimizar imágenes.
7. Configurar Search Console.
8. Publicar sitemap.
9. Monitorear 404, indexación y conversiones.

---

## 22. Pruebas

- Navegación y mega menú.
- Agenda.
- WhatsApp contextual.
- Formularios.
- Consentimientos.
- Eventos analíticos.
- SEO metadata.
- JSON-LD.
- Responsive.
- Lectores de pantalla.
- Teclado.
- Cross-browser.
- Redirecciones.
- Errores de red.
- Spam.
- Roles administrativos.

---

## 23. Criterios de aceptación

- La propuesta de valor se entiende en el primer viewport.
- La doctora tiene una página de autoridad completa.
- Cada enfoque cuenta con URL propia.
- Los tratamientos son administrables.
- El flujo de valoración funciona de extremo a extremo.
- WhatsApp conserva contexto.
- No se recolectan datos clínicos innecesarios.
- Cumple objetivo WCAG 2.2 AA.
- Cumple presupuesto de rendimiento.
- Tiene analítica validada.
- Tiene redirecciones desde el sitio anterior.
- No contiene afirmaciones médicas no aprobadas.
- No hay errores críticos de consola.
- El panel registra revisiones y cambios.

---

## 24. Fuera de alcance inicial

Salvo aprobación expresa:

- Historia clínica electrónica.
- Teleconsulta médica completa.
- Diagnóstico automatizado.
- Recomendaciones médicas por IA.
- Prescripción.
- Portal del paciente.
- Procesamiento de pagos de tratamientos.
- Integración con aseguradoras.

---

## 25. Entregables

- Código fuente.
- Sistema de diseño.
- Aplicación responsive.
- Panel administrativo.
- Base de datos y migraciones.
- Documentación de arquitectura.
- Variables de entorno de ejemplo.
- Manual de despliegue.
- Manual de contenido.
- Plan de redirecciones.
- Suite de pruebas.
- Reporte de accesibilidad.
- Reporte de rendimiento.
- Configuración de analítica.
- Checklist de lanzamiento.

---

## 26. Instrucción final para Codex

Prioriza claridad, confianza y sostenibilidad. No conviertas la web en una colección de efectos. Cada componente debe cumplir una función narrativa, clínica o comercial. La percepción premium debe surgir de la precisión, el espacio, la fotografía, la tipografía, la coherencia y el desempeño.
