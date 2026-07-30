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
  assert.match(html, /<html lang="es-CO">/i);
  assert.match(html, /Dra\. Adriana Varela/);
  assert.match(html, /Envejecer es natural\./);
  assert.match(html, /Medicina regenerativa/);
  assert.match(html, /Método de valoración/);
  assert.match(html, /Aprender también es parte del cuidado/);
  assert.match(html, /Agendar valoración/);
  assert.match(html, /Exosomas/);
  assert.match(html, /Consulta y Programa Well Aging/);
  assert.match(html, /Toxina botulínica/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.dradrianavarela\.com\/"/i,
  );
  assert.match(
    html,
    /portada-seo-dra-adriana-varela\.png/i,
  );
  assert.match(html, /<meta name="robots" content="index, follow"/i);
  assert.match(
    html,
    /<meta name="google-site-verification" content="TyMWOVZKCLg49r5LP6z3mzORXm9UsmEwjAkWhkoqxvI"/i,
  );
  assert.match(html, /"@type":"Physician"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("mantiene visibles las restricciones médicas y de contenido", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /no reemplaza una valoración médica/i);
  assert.match(html, /contenido es educativo y general/i);
  assert.match(html, /valoración médica individual/i);
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
  assert.match(html, /"@type":"ProfilePage"/i);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.dradrianavarela\.com\/sobre-mi"/i,
  );
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
    assert.match(html, /requiere valoración médica/i);
    assert.match(html, /"@type":"MedicalWebPage"/i);
    assert.match(html, /"@type":"BreadcrumbList"/i);
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="https://www\\.dradrianavarela\\.com${route.path}"`,
        "i",
      ),
    );
  }
});

test("publica robots y sitemap de producción", async () => {
  const robotsResponse = await render("/robots.txt");
  const robots = await robotsResponse.text();

  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Disallow: \/api\//i);
  assert.match(
    robots,
    /Sitemap: https:\/\/www\.dradrianavarela\.com\/sitemap\.xml/i,
  );

  const sitemapResponse = await render("/sitemap.xml");
  const sitemap = await sitemapResponse.text();

  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemap, /https:\/\/www\.dradrianavarela\.com\/sobre-mi/i);
  assert.match(
    sitemap,
    /https:\/\/www\.dradrianavarela\.com\/enfoques\/medicina-regenerativa/i,
  );
  assert.doesNotMatch(sitemap, /\/agendar/i);
});
