/* ==========================================================
   TWS Liquid Chef — edit your details and drinks here
   ========================================================== */
const CONFIG = {
  whatsapp: "", // your number in international format, digits only, e.g. "27821234567"
  email: "",    // e.g. "bookings@twsliquidchef.com"
  instagram: "" // e.g. "https://instagram.com/twsliquidchef"
};

// tag: "signature" | "classic" | "mocktail"
// glass: "martini" | "coupe" | "rocks" | "highball"; c1/c2 = liquid colours (bottom/top)
const DRINKS = [
  { name: "Electric Blue Lagoon", tag: "signature", glass: "highball", desc: "Vodka, blue curaçao, lemon, a whisper of coconut.", c1: "#1d5cff", c2: "#8fdcff" },
  { name: "Midnight Passion", tag: "signature", glass: "coupe", desc: "Spiced rum, passion fruit, lime, vanilla foam.", c1: "#6a2fd6", c2: "#c7a4ff" },
  { name: "Liquid Gold", tag: "signature", glass: "rocks", desc: "Whisky, honey, ginger, smoked orange peel.", c1: "#c27410", c2: "#ffd47e" },
  { name: "Mojito", tag: "classic", glass: "highball", desc: "White rum, fresh mint, lime, soda.", c1: "#2fae6e", c2: "#c9f5d9" },
  { name: "Espresso Martini", tag: "classic", glass: "martini", desc: "Vodka, coffee liqueur, fresh espresso.", c1: "#3a2216", c2: "#c49a76" },
  { name: "Margarita", tag: "classic", glass: "coupe", desc: "Tequila, triple sec, lime, salted rim.", c1: "#a8c52c", c2: "#f1ffb5" },
  { name: "Cosmopolitan", tag: "classic", glass: "martini", desc: "Citrus vodka, cranberry, lime, orange.", c1: "#d42e62", c2: "#ffa6c2" },
  { name: "Virgin Blue Breeze", tag: "mocktail", glass: "highball", desc: "Blue spirulina, pineapple, lime, soda.", c1: "#1592c8", c2: "#aef0ff" },
  { name: "Berry Fizz", tag: "mocktail", glass: "rocks", desc: "Mixed berries, basil, lemon, tonic.", c1: "#b0174f", c2: "#ff9ec4" }
];
const MAX_PICKS = 6;

/* ---------------------------------------------------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
const TAG_LABEL = { signature: "Signature", classic: "Classic", mocktail: "Alcohol-free" };
const ICON_PLUS = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_X = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
const picked = new Set();
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Glass illustrations (viewBox 0 0 100 140) */
const GLASSES = {
  martini: { bowl: "M8 22 L92 22 L53 68 L47 68 Z", top: 30, stem: [68, 120], base: 20 },
  coupe: { bowl: "M10 34 Q10 74 50 76 Q90 74 90 34 Z", top: 42, stem: [76, 120], base: 20 },
  rocks: { bowl: "M18 56 L82 56 L78 124 Q78 128 74 128 L26 128 Q22 128 22 124 Z", top: 74, ice: true },
  highball: { bowl: "M28 14 L72 14 L69 126 Q69 130 65 130 L35 130 Q31 130 31 126 Z", top: 32, ice: true }
};
function wave(y) {
  let d = `M0 ${y} Q12.5 ${y - 3} 25 ${y}`;
  for (let x = 50; x <= 200; x += 25) d += ` T${x} ${y}`;
  return d + " V150 H0 Z";
}
function glassSVG(d, i) {
  const g = GLASSES[d.glass];
  const ice = g.ice
    ? `<rect x="38" y="${g.top + 6}" width="14" height="14" rx="3" transform="rotate(-12 45 ${g.top + 13})" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.45)" stroke-width=".8"/>
       <rect x="52" y="${g.top + 14}" width="13" height="13" rx="3" transform="rotate(16 58 ${g.top + 20})" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.4)" stroke-width=".8"/>`
    : "";
  const stem = g.stem
    ? `<rect x="48.8" y="${g.stem[0]}" width="2.4" height="${g.stem[1] - g.stem[0]}" rx="1" fill="rgba(220,235,255,.7)"/>
       <ellipse cx="50" cy="${g.stem[1] + 1}" rx="${g.base}" ry="3" fill="rgba(220,235,255,.7)"/>`
    : "";
  return `<svg viewBox="0 0 100 140" aria-hidden="true">
    <defs>
      <clipPath id="b${i}"><path d="${g.bowl}"/></clipPath>
      <linearGradient id="l${i}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${d.c1}"/><stop offset="1" stop-color="${d.c2}"/></linearGradient>
    </defs>
    <path d="${g.bowl}" fill="rgba(255,255,255,.035)"/>
    <g clip-path="url(#b${i})">
      <g class="liquid"><path class="surface" d="${wave(g.top)}" fill="url(#l${i})"/>${ice}</g>
    </g>
    <path d="${g.bowl}" fill="none" stroke="rgba(220,235,255,.5)" stroke-width="1.2" stroke-linejoin="round"/>
    ${stem}
  </svg>`;
}

/* Catalogue */
function renderCards() {
  $("#cards").innerHTML = DRINKS.map((d, i) => `
    <li class="card reveal" data-tag="${d.tag}" data-i="${i}" style="--glow:${d.c1};--d:${[0, 70, 120][i % 3]}ms">
      <div class="card__art">${glassSVG(d, i)}</div>
      <div class="card__body">
        <span class="card__tag">${TAG_LABEL[d.tag]}</span>
        <h3 class="card__name">${esc(d.name)}</h3>
        <p class="card__desc">${esc(d.desc)}</p>
        <button class="card__add" type="button" aria-pressed="false">${ICON_PLUS}<span>Add to quote</span></button>
      </div>
    </li>`).join("");
}

function togglePick(i) {
  if (picked.has(i)) picked.delete(i);
  else if (picked.size >= MAX_PICKS) { flash(`You can pick up to ${MAX_PICKS} drinks — remove one first.`); return; }
  else picked.add(i);
  syncPicks(true);
}

function syncPicks(changed) {
  $$(".card").forEach((card) => {
    const on = picked.has(+card.dataset.i);
    card.classList.toggle("is-picked", on);
    const btn = $(".card__add", card);
    btn.setAttribute("aria-pressed", on);
    $("span", btn).textContent = on ? "Added" : "Add to quote";
  });
  // only add/remove changed chips so existing ones don't re-animate
  const list = $("#picked");
  const have = new Set($$("button", list).map((b) => +b.dataset.i));
  $$("li", list).forEach((li) => { if (!picked.has(+$("button", li).dataset.i)) li.remove(); });
  picked.forEach((i) => {
    if (have.has(i)) return;
    const li = document.createElement("li");
    li.innerHTML = `<button type="button" data-i="${i}" aria-label="Remove ${esc(DRINKS[i].name)}">${esc(DRINKS[i].name)}${ICON_X}</button>`;
    list.append(li);
  });
  $("#picked-none").hidden = picked.size > 0;
  $("#picked-count").textContent = `${picked.size} / ${MAX_PICKS}`;
  const count = $("#fab-count");
  count.textContent = picked.size;
  count.hidden = picked.size === 0;
  if (changed && !reduceMotion.matches) { count.classList.remove("bump"); void count.offsetWidth; count.classList.add("bump"); }
}

let flashTimer;
function flash(msg) {
  const err = $("#form-error");
  err.textContent = msg; err.hidden = false;
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => (err.hidden = true), 4500);
}

/* Segmented filter with sliding pill */
function initFilters() {
  const seg = $(".seg"), pill = $(".seg__pill");
  const movePill = (btn) => {
    pill.style.width = `${btn.offsetWidth}px`;
    pill.style.transform = `translateX(${btn.offsetLeft}px)`;
  };
  movePill($(".seg__btn.is-active"));
  addEventListener("resize", () => movePill($(".seg__btn.is-active")));
  document.fonts?.ready.then(() => movePill($(".seg__btn.is-active")));

  $$(".seg__btn", seg).forEach((btn) => btn.addEventListener("click", () => {
    $$(".seg__btn", seg).forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", b === btn); });
    movePill(btn);
    btn.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
    const f = btn.dataset.filter;
    const steps = [0, 40, 75, 105, 130, 150]; // non-uniform, tapering stagger
    let shown = 0;
    $$(".card").forEach((card) => {
      const show = f === "all" || card.dataset.tag === f;
      card.hidden = !show;
      card.classList.remove("is-entering");
      if (show) {
        card.classList.add("is-in");
        card.style.setProperty("--d", `${steps[Math.min(shown, steps.length - 1)]}ms`);
        void card.offsetWidth;
        card.classList.add("is-entering");
        shown++;
      }
    });
    $(".empty").hidden = shown > 0;
  }));
}

/* Pointer spotlight on cards (mouse only) */
function initSpotlight() {
  $("#cards").addEventListener("pointermove", (e) => {
    if (!finePointer.matches) return;
    const card = e.target.closest(".card"); if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  });
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
    el.removeAttribute("aria-invalid");
    if (bad) { void el.offsetWidth; el.setAttribute("aria-invalid", "true"); }
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
  $$("[data-package]").forEach((a) => a.addEventListener("click", () => { f.elements.package.value = a.dataset.package; }));
  const d = new Date();
  f.elements.date.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* Nav + mobile sheet */
function initNav() {
  const nav = $(".nav"), toggle = $(".nav__toggle"), sheet = $("#sheet");
  let open = false;
  const setOpen = (next) => {
    if (next === open) return;
    open = next;
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    if (open) {
      sheet.hidden = false;
      void sheet.offsetWidth;
      sheet.classList.add("is-open");
      nav.classList.add("is-scrolled");
    } else {
      sheet.classList.remove("is-open");
      const done = () => { if (!open) sheet.hidden = true; };
      reduceMotion.matches ? done() : setTimeout(done, 260);
      onScroll();
    }
  };
  toggle.addEventListener("click", () => setOpen(!open));
  $$("a", sheet).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  matchMedia("(min-width: 900px)").addEventListener("change", (e) => e.matches && setOpen(false));
  const onScroll = () => nav.classList.toggle("is-scrolled", open || scrollY > 12);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
}

/* Floating quote button: hidden over the hero and the form */
function initFab() {
  const fab = $(".fab");
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    fab.classList.toggle("is-hidden", visible.size > 0);
  }, { threshold: 0.1 });
  io.observe($(".hero__cta"));
  io.observe($("#book"));
}

function initReveal() {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { rootMargin: "0px 0px -10% 0px" });
  $$(".reveal").forEach((el) => {
    io.observe(el);
    // once revealed, hand transitions back to the element's own hover/press styles
    if (el.classList.contains("card")) el.addEventListener("transitionend", function done(e) {
      if (e.target !== el || e.propertyName !== "transform") return;
      el.classList.remove("reveal");
      el.removeEventListener("transitionend", done);
    });
  });
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
syncPicks(false);
initFilters();
initSpotlight();
initForm();
initNav();
initFab();
initReveal();
initSocial();
$("#cards").addEventListener("click", (e) => { const b = e.target.closest(".card__add"); if (b) togglePick(+b.closest(".card").dataset.i); });
$("#picked").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) togglePick(+b.dataset.i); });
$("#year").textContent = new Date().getFullYear();

/* Start the hero entrance once fonts are in (max 800ms wait) so lines don't reflow mid-animation */
Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 800))])
  .then(() => requestAnimationFrame(() => document.documentElement.classList.add("is-loaded")));
