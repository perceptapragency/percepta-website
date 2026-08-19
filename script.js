const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const diagnosticForm = document.querySelector("#diagnostic-form");
const interestField = document.querySelector("#lead-interest");
const utmField = document.querySelector("#lead-utm");
const formStatus = document.querySelector("#form-status");

document.querySelectorAll("[data-interest]").forEach((link) => {
  link.addEventListener("click", () => {
    if (interestField) interestField.value = link.dataset.interest;
  });
});

if (utmField) {
  const params = new URLSearchParams(window.location.search);
  const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
    .map((key) => params.get(key))
    .filter(Boolean)
    .join(" | ");
  utmField.value = attribution;
}

if (diagnosticForm && formStatus) {
  diagnosticForm.addEventListener("submit", () => {
    const submitButton = diagnosticForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Enviando…";
    formStatus.textContent = "Estamos registrando tu solicitud.";

    window.setTimeout(() => {
      diagnosticForm.reset();
      submitButton.disabled = false;
      submitButton.textContent = "Enviar solicitud";
      formStatus.textContent = "Solicitud recibida. Revisa tu correo para confirmar la recepción.";
    }, 1800);
  });
}
