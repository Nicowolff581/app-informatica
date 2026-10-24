// Número de WhatsApp del restaurante (código de país + número, sin + ni espacios)
const WHATSAPP_NUMBER = "570000000000";

// ---------- Navegación: fondo al hacer scroll y menú móvil ----------
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const menu = document.getElementById("navMenu");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
};
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ---------- Pestañas de la carta ----------
const tabs = [...document.querySelectorAll(".menu__tab")];

const selectTab = (tab) => {
  tabs.forEach((t) => {
    const active = t === tab;
    t.classList.toggle("is-active", active);
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
  });
};

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    const next = tabs[(i + dir + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

// ---------- Formulario de reserva → WhatsApp ----------
const form = document.getElementById("reserveForm");
const msg = document.getElementById("formMsg");
const dateInput = document.getElementById("date");

const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("[required]")];
  let valid = true;
  fields.forEach((f) => {
    const ok = f.value.trim() !== "";
    f.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });
  if (!valid) {
    msg.textContent = "Por favor completa nombre, fecha y hora.";
    return;
  }

  const data = new FormData(form);
  const [y, m, d] = data.get("date").split("-");
  let text =
    `Hola, soy ${data.get("name")}. Quisiera reservar una mesa para ` +
    `${data.get("guests")} persona(s) el ${d}/${m}/${y} a las ${data.get("time")}.`;
  if (data.get("notes").trim()) text += ` Comentarios: ${data.get("notes").trim()}`;

  msg.textContent = "¡Grazie! Te llevamos a WhatsApp para confirmar.";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));

// ---------- Aparición suave de secciones ----------
const revealTargets = document.querySelectorAll(
  ".section__head, .story__photo, .story__text, .dish-card, .menu__tabs, .gallery__grid img, .review, .reserve__text, .reserve__form"
);
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

// ---------- Año actual en el pie ----------
document.getElementById("year").textContent = new Date().getFullYear();
