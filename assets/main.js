const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealElements = () => {
  const elements = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
  );

  elements.forEach((element) => observer.observe(element));
};

const setupWhatsAppForms = () => {
  document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const heading = form.dataset.heading || "Nueva consulta desde la web";
      const lines = [heading];

      for (const [key, value] of data.entries()) {
        const cleanValue = String(value).trim();
        if (cleanValue) lines.push(`${key}: ${cleanValue}`);
      }

      const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
        lines.join("\n"),
      )}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
};

const setupMap = () => {
  const trigger = document.querySelector("[data-load-map]");
  if (!trigger) return;

  trigger.addEventListener(
    "click",
    () => {
      const wrapper = trigger.closest("[data-map-wrapper]");
      const iframe = document.createElement("iframe");
      iframe.src =
        "https://maps.google.com/maps?q=Gabriel%20Pereira%203202%20Montevideo&t=&z=15&ie=UTF8&iwloc=&output=embed";
      iframe.title = "Mapa de Heladería Los Trovadores";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      wrapper.replaceChildren(iframe);
    },
    { once: true },
  );
};

const setupFlavors = () => {
  const grid = document.querySelector("[data-flavor-grid]");
  const controls = document.querySelector("[data-flavor-controls]");
  const title = document.querySelector("[data-flavor-title]");
  const sugarFreeImage = document.querySelector("[data-sugar-free-image]");
  if (!grid || !controls || !title || !window.FLAVORS) return;

  const categories = new Map(
    (window.FLAVOR_CATEGORIES || []).map((category) => [
      category.key,
      category.label,
    ]),
  );

  controls.querySelectorAll("[data-category]").forEach((control) => {
    control.setAttribute("aria-controls", grid.id);
  });

  const render = (category) => {
    const matches = window.FLAVORS.filter((item) => item.category === category);
    const activeButton = controls.querySelector(`[data-category="${category}"]`);

    title.textContent = categories.get(category) || "Sabores y productos";
    if (activeButton?.id) grid.setAttribute("aria-labelledby", activeButton.id);
    if (sugarFreeImage) {
      sugarFreeImage.hidden = category !== "sin-azucar";
    }

    grid.innerHTML = matches.length
      ? matches
          .map(
            (item) => `
              <article class="flavor-item">
                <div class="flavor-item__image">
                  ${
                    item.image
                      ? `
                        <img
                          src="${item.image}"
                          alt=""
                          width="160"
                          height="160"
                          loading="lazy"
                        >
                      `
                      : '<span class="visually-hidden">Imagen pendiente</span>'
                  }
                </div>
                <div class="flavor-item__copy">
                  <h3>${item.name}</h3>
                  ${item.description ? `<p>${item.description}</p>` : ""}
                </div>
              </article>
            `,
          )
          .join("")
      : `
        <p class="flavor-empty">
          Consultanos por WhatsApp para conocer la disponibilidad actual de
          esta categoría.
        </p>
      `;
  };

  controls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    controls.querySelectorAll("[data-category]").forEach((control) => {
      const active = control === button;
      control.setAttribute("aria-selected", String(active));
      control.tabIndex = active ? 0 : -1;
    });

    render(button.dataset.category);
  });

  controls.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    const buttons = [...controls.querySelectorAll("[data-category]")];
    const index = buttons.indexOf(document.activeElement);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = buttons[(index + direction + buttons.length) % buttons.length];
    event.preventDefault();
    next.click();
    next.focus();
  });

  render("clasicos");
};

const setCurrentYearStory = () => {
  document.querySelectorAll("[data-years-since]").forEach((element) => {
    element.textContent = String(new Date().getFullYear() - 1934);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  revealElements();
  setupWhatsAppForms();
  setupMap();
  setupFlavors();
  setCurrentYearStory();
});
