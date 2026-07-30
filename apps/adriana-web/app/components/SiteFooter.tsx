import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-grid">
        <div>
          <Link
            className="brand brand-footer"
            href="/"
            aria-label="Dra. Adriana Varela, inicio"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/images/logo-dra-adriana.png"
              alt=""
              width="858"
              height="376"
            />
          </Link>
          <p>
            Medicina, naturalidad y acompañamiento para decisiones conscientes.
          </p>
        </div>
        <div className="footer-nav">
          <h2>Explorar</h2>
          <Link href="/#enfoques">Enfoques</Link>
          <Link href="/#metodo">Método</Link>
          <Link href="/sobre-mi">Sobre mí</Link>
          <Link href="/#recursos">Recursos</Link>
        </div>
        <div className="footer-nav">
          <h2>Información</h2>
          <span>Pereira, Colombia</span>
          <span>Atención en Canorá Medical</span>
          <a href="https://canoramedical.com/">
            Visitar Canorá Medical <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="section-shell footer-bottom">
        <p>
          El contenido de este sitio es educativo y no reemplaza una valoración
          médica.
        </p>
        <p>© 2026 Dra. Adriana Varela</p>
      </div>
    </footer>
  );
}
