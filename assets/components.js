const SITE = {
  phoneDisplay: "(+598) 2707 51 65",
  phoneHref: "+59827075165",
  whatsapp: "59898388553",
  email: "info@lostrovadores.com.uy",
  address: "Gabriel Pereira 3202, esq. Pedro Berro",
  city: "Pocitos, Montevideo, Uruguay",
  instagram: "https://www.instagram.com/heladerialostrovadores/",
  facebook: "https://www.facebook.com/heladeria.lostrovadores",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Helader%C3%ADa+Los+Trovadores+Gabriel+Pereira+3202+Montevideo",
};

const pages = [
  { key: "inicio", label: "Inicio", href: "index.html" },
  { key: "historia", label: "Sobre nosotros", href: "sobre-nosotros.html" },
  { key: "productos", label: "Productos", href: "productos.html" },
  { key: "eventos", label: "Eventos", href: "eventos.html" },
  { key: "redes", label: "Nuestras redes", href: "nuestras-redes.html" },
  { key: "contacto", label: "Contacto", href: "contacto.html" },
];

const currentPage = () => document.body.dataset.page || "inicio";

const brandMarkup = () => `
  <img
    class="brand__logo"
    src="https://framerusercontent.com/images/RIAgDKH40Lt0IJQel8Hu4rzNQbg.png?width=231&height=128"
    alt=""
    width="231"
    height="128"
  >
`;

const navMarkup = (className = "nav-links") => `
  <nav class="${className}" aria-label="Navegación principal">
    ${pages
      .map(
        (page) => `
          <a href="${page.href}" ${
            currentPage() === page.key ? 'aria-current="page"' : ""
          }>${page.label}</a>
        `,
      )
      .join("")}
  </nav>
`;

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a class="skip-link" href="#contenido">Saltar al contenido</a>
      <div class="announcement">
        Heladería artesanal desde 1934 · Pocitos, Montevideo
      </div>
      <header class="site-header">
        <div class="container site-nav">
          <a class="brand" href="index.html" aria-label="Los Trovadores, inicio">
            ${brandMarkup()}
          </a>
          ${navMarkup()}
          <div class="nav-actions">
            <a class="button button--outline" href="tel:${SITE.phoneHref}">Llamar</a>
            <a class="button" href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
              "Hola, quisiera hacer una consulta.",
            )}" target="_blank" rel="noopener">Pedí por WhatsApp</a>
          </div>
          <button
            class="menu-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded="false"
            aria-controls="menu-movil"
          >
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div class="mobile-panel" id="menu-movil" aria-hidden="true">
          ${navMarkup("mobile-links")}
          <div class="mobile-actions">
            <a class="button button--light" href="tel:${SITE.phoneHref}">Llamar</a>
            <a class="button" href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
              "Hola, quisiera hacer una consulta.",
            )}" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </header>
    `;

    const toggle = this.querySelector(".menu-toggle");
    const panel = this.querySelector(".mobile-panel");
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      panel.setAttribute("aria-hidden", "true");
      panel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Cerrar menú");
      panel.setAttribute("aria-hidden", "false");
      panel.classList.add("is-open");
      document.body.classList.add("menu-open");
      panel.querySelector("a")?.focus();
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu();
      else openMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      }
    });

    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1088) closeMenu();
    });
  }
}

class BusinessCta extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="business-cta">
        <div class="container business-cta__inner reveal">
          <div class="business-cta__copy">
            <span class="eyebrow">Helado premium</span>
            <h2 class="section-title section-title--small">
              Nuestros helados en tu restaurante, hotel o evento
            </h2>
            <p>
              Ofrecemos baldes de helado artesanal en los sabores que elijas
              para sumar a la carta de tu establecimiento o celebración.
            </p>
            <div class="button-row">
              <a class="button button--light" href="contacto.html">Solicitar información</a>
            </div>
          </div>
          <figure class="business-cta__image">
            <img
              src="https://framerusercontent.com/images/A5RZjnp90ePr8dCXXuoILuDKggI.jpeg?height=1376&width=768"
              alt="Presentación de helados artesanales de Los Trovadores"
              width="768"
              height="1376"
              loading="lazy"
            >
          </figure>
        </div>
      </section>
    `;
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html" aria-label="Los Trovadores, inicio">
                ${brandMarkup()}
              </a>
              <p>
                Heladería artesanal desde 1934, en la esquina más helada de
                Pocitos.
              </p>
              <div class="button-row">
                <a class="text-link" href="${SITE.instagram}" target="_blank" rel="noopener">
                  Instagram
                </a>
                <a class="text-link" href="${SITE.facebook}" target="_blank" rel="noopener">
                  Facebook
                </a>
              </div>
            </div>
            <div>
              <h2 class="footer-heading">Explorá</h2>
              <nav class="footer-links" aria-label="Navegación del pie">
                ${pages
                  .map((page) => `<a href="${page.href}">${page.label}</a>`)
                  .join("")}
              </nav>
            </div>
            <div>
              <h2 class="footer-heading">Contacto</h2>
              <address class="footer-links">
                <a href="tel:${SITE.phoneHref}">${SITE.phoneDisplay}</a>
                <a href="mailto:${SITE.email}">${SITE.email}</a>
                <a href="${SITE.maps}" target="_blank" rel="noopener">
                  ${SITE.address}<br>${SITE.city}
                </a>
              </address>
            </div>
            <div class="footer-map">
              <iframe
                src="https://maps.google.com/maps?q=Gabriel%20Pereira%203202%20Montevideo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Mapa de Heladería Los Trovadores"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div class="footer-bottom">
            <p>© ${year} Los Trovadores. Todos los derechos reservados.</p>
            <p>Hecho con tradición en Montevideo.</p>
          </div>
        </div>
      </footer>
      <a
        class="whatsapp-fab"
        href="https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
          "Hola, quisiera hacer una consulta.",
        )}"
        target="_blank"
        rel="noopener"
        aria-label="Consultar por WhatsApp"
        title="WhatsApp"
      >W</a>
    `;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("business-cta", BusinessCta);
customElements.define("site-footer", SiteFooter);
