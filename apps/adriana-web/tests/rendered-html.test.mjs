import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renderiza la home de la Dra. Adriana Varela", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /Dra\. Adriana Varela/);
  assert.match(html, /Envejecer es natural\./);
  assert.match(html, /Medicina regenerativa/);
  assert.match(html, /Método de valoración/);
  assert.match(html, /Contenido médico, profesional y legal/);
  assert.match(html, /Agenda próximamente/);
  assert.match(html, /Exosomas/);
  assert.match(html, /Consulta y Programa Well Aging/);
  assert.match(html, /Toxina botulínica/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("mantiene visibles las restricciones médicas y de contenido", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /no reemplaza una valoración médica/i);
  assert.match(html, /soportes en validación/i);
  assert.match(html, /información clínica validada/i);
  assert.match(html, /nunca debe presentarse como un resultado garantizado/i);
});

test("renderiza la trayectoria profesional suministrada", async () => {
  const response = await render("/sobre-mi");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Adriana Varela Nariño/);
  assert.match(html, /Universidad Nacional de Colombia/);
  assert.match(html, /Instituto Nacional de Cancerología/);
  assert.match(html, /AMWC Latin America 2023/);
  assert.match(html, /CEO · Canorá Medical/);
  assert.match(html, /No creo en tratamientos aislados/i);
  assert.match(html, /Regenerar desde el origen/i);
  assert.match(html, /La salud comienza desde adentro/i);
  assert.match(html, /Resaltar tu belleza, no cambiar quién eres/i);
  assert.match(html, /verificación documental/i);
});

test("renderiza los catálogos informados para cada enfoque", async () => {
  const routes = [
    {
      path: "/enfoques/medicina-regenerativa",
      expected: ["Exosomas", "Polinucleótidos \\(PDRN\\)", "Regeneración capilar"],
    },
    {
      path: "/enfoques/medicina-funcional",
      expected: [
        "Programa Well Aging",
        "optimización epigenética",
        "Medicina biorreguladora intravenosa",
      ],
    },
    {
      path: "/enfoques/medicina-estetica",
      expected: [
        "láser Erbium",
        "Armonización facial",
        "Modelado corporal no invasivo",
        "Depilación láser médica",
      ],
    },
  ];

  for (const route of routes) {
    const response = await render(route.path);
    const html = await response.text();

    assert.equal(response.status, 200);
    for (const expected of route.expected) {
      assert.match(html, new RegExp(expected, "i"));
    }
    assert.match(html, /Detalle clínico en preparación/i);
    assert.match(html, /pendientes de revisión médica/i);
  }
});
