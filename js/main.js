/* ==========================================================
   TWS Liquid Chef — edit your details and drinks here
   ========================================================== */
const CONFIG = {
  whatsapp: "", // your number in international format, digits only, e.g. "27821234567"
  email: "",    // e.g. "bookings@twsliquidchef.com"
  instagram: "" // e.g. "https://instagram.com/twsliquidchef"
};

// tag: "signature" | "classic" | "mocktail"; colours tint the glass
const DRINKS = [
  { name: "Electric Blue Lagoon", tag: "signature", desc: "Vodka, blue curaçao, lemon, a whisper of coconut.", c1: "#2f7bff", c2: "#7fd4ff" },
  { name: "Midnight Passion", tag: "signature", desc: "Spiced rum, passion fruit, lime, vanilla foam.", c1: "#7b3fe4", c2: "#c49bff" },
  { name: "Liquid Gold", tag: "signature", desc: "Whisky, honey, ginger, smoked orange peel.", c1: "#d68a1a", c2: "#ffd27a" },
  { name: "Mojito", tag: "classic", desc: "White rum, fresh mint, lime, soda.", c1: "#3fbf7f", c2: "#c9f5d9" },
  { name: "Espresso Martini", tag: "classic", desc: "Vodka, coffee liqueur, fresh espresso.", c1: "#4a2c1d", c2: "#b88b6a" },
  { name: "Margarita", tag: "classic", desc: "Tequila, triple sec, lime, salted rim.", c1: "#b8d43a", c2: "#f1ffb5" },
  { name: "Cosmopolitan", tag: "classic", desc: "Citrus vodka, cranberry, lime, orange.", c1: "#e03a6b", c2: "#ffa3bf" },
  { name: "Virgin Blue Breeze", tag: "mocktail", desc: "Blue spirulina, pineapple, lime, soda.", c1: "#1aa3d6", c2: "#a8ecff" },
  { name: "Berry Fizz", tag: "mocktail", desc: "Mixed berries, basil, lemon, tonic.", c1: "#c2185b", c2: "#ff9ec4" }
];
const MAX_PICKS = 6;

/* ---------------------------------------------------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const TAG_LABEL = { signature: "Signature", classic: "Classic", mocktail: "Alcohol-free" };
const ICON_PLUS = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_CHECK = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
const ICON_X = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
const picked = new Set();

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Catalogue */
function renderCards() {
  $("#cards").innerHTML = DRINKS.map((d, i) => `
    <li class="card reveal" data-tag="${d.tag}" data-i="${i}">
      <div class="card__art" style="--liquid:${d.c1};--liquid2:${d.c2}" aria-hidden="true">
        <div class="glass"><span class="glass__bowl"><span class="glass__fill"></span><span class="glass__shine"></span></span><span class="glass__stem"></span><span class="glass__base"></span></div>
      </div>
      <div class="card__body">
        <span class="card__tag">${TAG_LABEL[d.tag]}</span>
        <h3>${esc(d.name)}</h3>
        <p class="card__desc">${esc(d.desc)}</p>
        <button class="card__add" type="button" aria-pressed="false">${ICON_PLUS}<span>Add to quote</span></button>
      </div>
    </li>`).join("");
}

function togglePick(i) {
  if (picked.has(i)) picked.delete(i);
  else if (picked.size >= MAX_PICKS) { flash(`You can pick up to ${MAX_PICKS} drinks — remove one first.`); return; }
  else picked.add(i);
  syncPicks();
}

function syncPicks() {
  $$(".card").forEach((card) => {
    const on = picked.has(+card.dataset.i);
    card.classList.toggle("is-picked", on);
    const btn = $(".card__add", card);
    btn.setAttribute("aria-pressed", on);
    btn.innerHTML = on ? `${ICON_CHECK}<span>Added</span>` : `${ICON_PLUS}<span>Add to quote</span>`;
  });
  $("#picked").innerHTML = [...picked].map((i) =>
    `<li><button type="button" data-i="${i}" aria-label="Remove ${esc(DRINKS[i].name)}">${esc(DRINKS[i].name)}${ICON_X}</button></li>`).join("");
  $("#picked-none").hidden = picked.size > 0;
  const count = $("#fab-count");
  count.textContent = picked.size;
  count.hidden = picked.size === 0;
}

let flashTimer;
function flash(msg) {
  const err = $("#form-error");
  err.textContent = msg; err.hidden = false;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => (err.hidden = true), 4000);
}

/* Filters */
function initFilters() {
  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => { c.classList.toggle("is-active", c === chip); c.setAttribute("aria-pressed", c === chip); });
    const f = chip.dataset.filter;
    let shown = 0;
    $$(".card").forEach((card) => {
      const show = f === "all" || card.dataset.tag === f;
      card.hidden = !show; if (show) shown++;
    });
    $(".empty").hidden = shown > 0;
  }));
}

/* Quote message */
function buildMessage() {
  const f = $("#quote-form");
  const v = (n) => f.elements[n].value.trim();
  const drinks = [...picked].map((i) => DRINKS[i].name).join(", ") || "Not chosen yet";
  return [
    "Hi TWS Liquid Chef, I'd like a quote.",
    `Name: ${v("name")}`,
    `Date: ${v("date")}`,
    `Guests: ${v("guests")}`,
    `Event: ${v("type")}`,
    `Package: ${v("package")}`,
    v("venue") && `Venue: ${v("venue")}`,
    `Drinks: ${drinks}`,
    v("notes") && `Notes: ${v("notes")}`
  ].filter(Boolean).join("\n");
}

function validate() {
  const f = $("#quote-form");
  let first = null;
  ["name", "date", "guests"].forEach((n) => {
    const el = f.elements[n];
    const bad = !el.value.trim() || (n === "guests" && +el.value < 1);
    el.setAttribute("aria-invalid", bad);
    if (bad && !first) first = el;
  });
  if (first) { flash("Please add your name, event date and number of guests."); first.focus(); return false; }
  return true;
}

function initForm() {
  const f = $("#quote-form");
  f.addEventListener("input", (e) => e.target.removeAttribute("aria-invalid"));
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = encodeURIComponent(buildMessage());
    if (CONFIG.whatsapp) window.open(`https://wa.me/${CONFIG.whatsapp}?text=${text}`, "_blank", "noopener");
    else if (CONFIG.email) location.href = `mailto:${CONFIG.email}?subject=Quote%20request&body=${text}`;
    else flash("Contact details haven't been set up yet — add them in js/main.js.");
  });
  $("#email-link").addEventListener("click", (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!CONFIG.email) { flash("Email hasn't been set up yet — add it in js/main.js."); return; }
    location.href = `mailto:${CONFIG.email}?subject=Quote%20request&body=${encodeURIComponent(buildMessage())}`;
  });
  // package buttons preselect the dropdown
  $$("[data-package]").forEach((a) => a.addEventListener("click", () => { f.elements.package.value = a.dataset.package; }));
  // no past dates
  f.elements.date.min = new Date().toISOString().slice(0, 10);
}

/* Nav */
function initNav() {
  const nav = $(".nav"), toggle = $(".nav__toggle"), menu = $("#menu");
  const setOpen = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
}

/* Hide floating button while the booking form is on screen */
function initFab() {
  const fab = $(".fab");
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    fab.classList.toggle("is-hidden", visible.size > 0);
  }, { threshold: 0.15 });
  io.observe($("#book"));
  io.observe($(".hero__cta"));
}

function initReveal() {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .pkg, .steps li").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}

function initSocial() {
  const map = {
    instagram: CONFIG.instagram,
    whatsapp: CONFIG.whatsapp && `https://wa.me/${CONFIG.whatsapp}`,
    email: CONFIG.email && `mailto:${CONFIG.email}`
  };
  $$("[data-social]").forEach((a) => {
    const url = map[a.dataset.social];
    if (url) { a.href = url; if (!url.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; } }
    else a.remove();
  });
}

renderCards();
syncPicks();
initFilters();
initForm();
initNav();
initFab();
initReveal();
initSocial();
$("#cards").addEventListener("click", (e) => { const b = e.target.closest(".card__add"); if (b) togglePick(+b.closest(".card").dataset.i); });
$("#picked").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) togglePick(+b.dataset.i); });
$("#year").textContent = new Date().getFullYear();
