import Link from "next/link";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" href="/" aria-label="Dra. Adriana Varela, inicio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/images/logo-dra-adriana.png"
              alt=""
              width="858"
              height="376"
            />
          </Link>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <Link href="/sobre-mi">Sobre mí</Link>
            <Link href="/#enfoques">Enfoques</Link>
            <Link href="/#metodo">Método</Link>
            <Link href="/#recursos">Recursos</Link>
            <a href="https://canoramedical.com/">Canorá Medical</a>
          </nav>

          <Link className="button button-small header-cta" href="/agendar">
            Agendar valoración <span aria-hidden="true">↗</span>
          </Link>

          <details className="mobile-nav">
            <summary aria-label="Abrir navegación">
              <span aria-hidden="true">Menú</span>
            </summary>
            <nav aria-label="Navegación móvil">
              <Link href="/sobre-mi">Sobre mí</Link>
              <Link href="/#enfoques">Enfoques</Link>
              <Link href="/#metodo">Método</Link>
              <Link href="/#recursos">Recursos</Link>
              <a href="https://canoramedical.com/">Canorá Medical</a>
              <Link className="button" href="/agendar">
                Agendar valoración
              </Link>
            </nav>
          </details>
        </div>
        <span className="scroll-progress" aria-hidden="true" />
      </header>
    </>
  );
}
