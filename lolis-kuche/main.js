// Número de WhatsApp para pedidos (código de país + número)
const WHATSAPP_NUMBER = "573176645184";

const money = (n) => "$" + n.toLocaleString("es-CO");
const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// ---------- Imágenes que faltan (logo.png, abuelo.jpg) ----------
const onMissing = (img) => {
  const mode = img.dataset.fallback;
  img.hidden = true;
  if (mode === "wordmark") img.nextElementSibling.hidden = false;
  if (mode === "arch") img.nextElementSibling.hidden = false;
};
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  if (img.complete && img.naturalWidth === 0) onMissing(img);
  else img.addEventListener("error", () => onMissing(img));
});

// ---------- Dónde estás: resaltar la sección actual ----------
const SECTION_NAMES = {
  inicio: "Inicio",
  "nuestra-historia": "Historia",
  menu: "Menú",
  pedidos: "Tu pedido",
  preguntas: "Preguntas",
  contacto: "Contacto",
};
// En la barra inferior, Historia cuenta como Inicio y Preguntas como Contacto
const TAB_FOR = { "nuestra-historia": "inicio", preguntas: "contacto" };
const whereLabel = document.getElementById("whereLabel");
const navLinks = [...document.querySelectorAll("#navMenu a, .tabbar a")];

function setCurrent(id) {
  whereLabel.textContent = SECTION_NAMES[id];
  const tab = TAB_FOR[id] || id;
  navLinks.forEach((a) => {
    const target = a.dataset.section || a.getAttribute("href").slice(1);
    const on = a.closest(".tabbar") ? target === tab : target === id;
    if (on) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
}

const sections = Object.keys(SECTION_NAMES).map((id) => document.getElementById(id));
if ("IntersectionObserver" in window) {
  // La sección que ocupa el centro de la pantalla es la actual
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((sec) => spy.observe(sec));
}
setCurrent("inicio");

// Al tocar un enlace interno, la sección de destino se ilumina un momento
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", () => {
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (!target) return;
    const head = target.querySelector(".section__head") || target;
    setTimeout(() => {
      head.classList.remove("is-arrived");
      void head.offsetWidth;
      head.classList.add("is-arrived");
    }, 450);
  });
});

// ---------- Aviso corto ----------
const toast = document.getElementById("toast");
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.hidden = false;
  toast.classList.remove("is-out");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("is-out");
    setTimeout(() => { toast.hidden = true; }, 250);
  }, 2200);
}

// ---------- Armar el pedido ----------
const items = [...document.querySelectorAll(".item")];
const cart = new Map(items.map((el) => [el.dataset.name, 0]));
const priceOf = (name) => Number(items.find((el) => el.dataset.name === name).dataset.price);

const lines = document.getElementById("orderLines");
const empty = document.getElementById("orderEmpty");
const totalRow = document.getElementById("orderTotalRow");
const totalEl = document.getElementById("orderTotal");
const sendBtn = document.getElementById("sendOrder");
const form = document.getElementById("orderForm");

const navCta = document.getElementById("navCta");
const ctaCount = document.getElementById("ctaCount");
const cartBar = document.getElementById("cartBar");
const cartBarCount = document.getElementById("cartBarCount");
const cartBarTotal = document.getElementById("cartBarTotal");
const waFloat = document.getElementById("waFloat");
const tabCount = document.getElementById("tabCount");
const menuNext = document.getElementById("menuNext");
const menuNextHint = document.getElementById("menuNextHint");
const orderError = document.getElementById("orderError");

// Mensaje editable ("Prefiero copiar el mensaje y completarlo yo")
const messageBox = document.getElementById("messageText");
const sendTemplate = document.getElementById("sendTemplate");
const resetTemplate = document.getElementById("resetTemplate");
const copyBtn = document.getElementById("copyTemplate");
const copyMsg = document.getElementById("copyMsg");
let messageEdited = false;

const picked = () => [...cart].filter(([, q]) => q > 0);
const totalOf = (list) => list.reduce((sum, [name, q]) => sum + q * priceOf(name), 0);

function buildMessage() {
  const data = new FormData(form);
  const list = picked();
  let text = "¡Hola, Loli's Küche! Quiero hacer un pedido:\n\n";
  if (list.length) {
    text += list.map(([name, q]) => `• ${q} × ${name}`).join("\n");
    text += `\n\nTotal productos: ${money(totalOf(list))} (sin domicilio)`;
  } else {
    text += "• Cantidad × Salchicha:";
  }
  text += `\n\nNombre: ${data.get("name").trim()}`;
  text += `\nDirección de entrega (Bogotá): ${data.get("address").trim()}`;
  text += `\nBarrio o localidad: ${data.get("barrio").trim()}`;
  text += `\nPago: ${data.get("pay")}`;
  return text;
}

// El texto que se envía: el que la persona editó, o el generado
const currentMessage = () => (messageEdited ? messageBox.value : buildMessage());

function render() {
  const list = picked();
  const total = totalOf(list);
  const count = list.reduce((sum, [, q]) => sum + q, 0);

  lines.innerHTML = "";
  list.forEach(([name, q]) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${q} × ${name}</span><span>${money(q * priceOf(name))}</span>`;
    lines.appendChild(li);
  });
  empty.hidden = list.length > 0;
  totalRow.hidden = list.length === 0;
  totalEl.textContent = money(total);

  items.forEach((el) => {
    const q = cart.get(el.dataset.name);
    el.querySelector(".qty__val").textContent = q;
    el.classList.toggle("is-picked", q > 0);
  });

  // Botón "Pedir ahora" del menú superior
  ctaCount.hidden = count === 0;
  ctaCount.textContent = count;
  navCta.setAttribute("aria-label", count ? `Pedir ahora: ${count} paquete${count > 1 ? "s" : ""} en tu pedido` : "Pedir ahora");

  tabCount.hidden = count === 0;
  tabCount.textContent = count;
  menuNext.hidden = count === 0;
  menuNextHint.hidden = count > 0;
  menuNext.textContent = `Listo, seguir al paso 2 (${count} paquete${count === 1 ? "" : "s"}) →`;
  if (count > 0 && orderError.dataset.reason === "empty") hideError();

  // Barra inferior con el resumen
  cartBarCount.textContent = `${count} paquete${count === 1 ? "" : "s"}`;
  cartBarTotal.textContent = money(total);
  updateCartBar();

  if (!messageEdited) messageBox.value = buildMessage();
  const link = waLink(currentMessage());
  sendBtn.href = link;
  sendTemplate.href = link;
}

// La barra inferior se oculta cuando ya estás viendo la sección de pedidos
let pedidosVisible = false;
function updateCartBar() {
  const show = picked().length > 0 && !pedidosVisible;
  cartBar.hidden = !show;
  waFloat.classList.toggle("is-raised", show);
}
if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    pedidosVisible = entry.isIntersecting;
    updateCartBar();
  }, { threshold: 0.15 }).observe(document.getElementById("pedidos"));
}

items.forEach((el) => {
  el.querySelectorAll(".qty__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = el.dataset.name;
      const before = cart.get(name);
      cart.set(name, Math.max(0, before + Number(btn.dataset.step)));
      render();
      const count = picked().reduce((sum, [, q]) => sum + q, 0);
      const llevas = count ? `Llevas ${count} paquete${count === 1 ? "" : "s"}.` : "Tu pedido está vacío.";
      if (btn.dataset.step === "1") showToast(`✓ Agregaste 1 ${name}. ${llevas}`);
      else if (before > 0) showToast(`Quitaste 1 ${name}. ${llevas}`);
      if (btn.dataset.step === "1") {
        navCta.classList.remove("is-bump");
        void navCta.offsetWidth;
        navCta.classList.add("is-bump");
      }
    });
  });
});
form.addEventListener("input", (e) => {
  e.target.classList.remove("is-invalid");
  if (orderError.dataset.reason === "fields") hideError();
  render();
});

// ---------- Revisar antes de abrir WhatsApp ----------
function showError(text, reason) {
  orderError.textContent = text;
  orderError.dataset.reason = reason;
  orderError.hidden = false;
  orderError.scrollIntoView({ behavior: "smooth", block: "center" });
}
function hideError() {
  orderError.hidden = true;
  orderError.dataset.reason = "";
}

sendBtn.addEventListener("click", (e) => {
  if (messageEdited) return; // la persona escribió su propio mensaje
  if (picked().length === 0) {
    e.preventDefault();
    showError("Primero elige al menos una salchicha en el menú (paso 1).", "empty");
    showToast("Primero elige tus salchichas en el menú.");
    return;
  }
  const missing = ["oName", "oAddress"].map((id) => document.getElementById(id)).filter((el) => !el.value.trim());
  if (missing.length) {
    e.preventDefault();
    missing.forEach((el) => el.classList.add("is-invalid"));
    showError(missing.length === 2 ? "Escribe tu nombre y tu dirección de entrega." :
      missing[0].id === "oName" ? "Escribe tu nombre." : "Escribe tu dirección de entrega en Bogotá.", "fields");
    missing[0].focus();
  }
});
form.addEventListener("submit", (e) => e.preventDefault());

messageBox.addEventListener("input", () => {
  messageEdited = true;
  resetTemplate.hidden = false;
  render();
});
resetTemplate.addEventListener("click", () => {
  messageEdited = false;
  resetTemplate.hidden = true;
  copyMsg.textContent = "";
  render();
});

copyBtn.addEventListener("click", () => {
  const selectText = () => {
    messageBox.focus();
    messageBox.select();
    copyMsg.textContent = "Texto seleccionado: cópialo con Ctrl+C o mantén presionado.";
  };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(messageBox.value)
      .then(() => { copyMsg.textContent = "Mensaje copiado. Pégalo en WhatsApp al 317 664 5184."; })
      .catch(selectText);
  } else {
    selectText();
  }
});

render();

document.getElementById("year").textContent = new Date().getFullYear();
