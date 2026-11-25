/* ==========================================================
   TWS Liquid Chef — shared site behaviour
   (content lives in js/data.js)
   ========================================================== */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PAGE = document.body.dataset.page;
const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const img = (key, w = 1200) => IMG(MEDIA[key] || key, w);
const pula = (n) => "P" + Number(n).toLocaleString("en-US");
const wa = (msg = CONFIG.whatsappMessage) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* Lucide-style icons (inline SVG) */
const P = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  wa: '<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.5A8.4 8.4 0 1 1 21 11.5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  fb: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  tt: '<path d="M9 12a4 4 0 1 0 4 4V3c.5 2.5 2.5 4.5 5 5"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" fill="currentColor"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  glass: '<path d="M8 22h8M12 11v11M5 3h14l-7 8z"/>',
  coffee: '<path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M6 2v2M10 2v2M14 2v2"/>',
  brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>'
};
const icon = (n, cls = "i") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
const LOGO_PATH = '<path d="M6 6h20L17.5 17v7.5H22V27H10v-2.5h4.5V17z"/><path class="fill" d="M10.2 9h11.6L16 15z"/>';

const NAV = [
  ["index.html", "Home", "home"], ["about.html", "About", "about"], ["services.html", "Services", "services"],
  ["menu.html", "Menu", "menu"], ["packages.html", "Packages", "packages"], ["gallery.html", "Gallery", "gallery"],
  ["reviews.html", "Reviews", "reviews"], ["faqs.html", "FAQs", "faqs"], ["investors.html", "Vision", "investors"],
  ["contact.html", "Contact", "contact"]
];

/* ---------- Shared chrome ---------- */
function renderChrome() {
  const cur = (k) => (k === PAGE ? ' aria-current="page"' : "");
  $("#header").outerHTML = `
  <header class="header" id="site-header">
    <div class="wrap header__inner">
      <a class="logo" href="index.html" aria-label="TWS Liquid Chef — home">
        <svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true">${LOGO_PATH}</svg>
        <span class="logo__word"><b>TWS</b><i>Liquid Chef</i></span>
      </a>
      <nav class="nav" aria-label="Main">${NAV.slice(1).map(([h, t, k]) => `<a href="${h}"${cur(k)}>${t}</a>`).join("")}</nav>
      <a class="btn btn--primary btn--sm header__cta" href="${wa()}" target="_blank" rel="noopener">Get a Quote</a>
      <button class="burger" aria-controls="site-menu" aria-expanded="false" aria-label="Open menu"><span></span><span></span></button>
    </div>
  </header>
  <div class="menu" id="site-menu" hidden>
    <nav aria-label="Mobile">${NAV.map(([h, t, k], i) => `<a href="${h}" style="--n:${i}"${cur(k)}><span>${String(i + 1).padStart(2, "0")}</span>${t === "Vision" ? "Investor Vision" : t}</a>`).join("")}</nav>
    <div class="menu__foot">
      <a class="btn btn--wa btn--block" href="${wa()}" target="_blank" rel="noopener">${icon("wa")} WhatsApp for a quote</a>
      <a class="btn btn--ghost btn--block" href="mailto:${CONFIG.email}">${icon("mail")} ${CONFIG.email}</a>
    </div>
  </div>`;

  const social = (k, n, label) => CONFIG.socials[k]
    ? `<a href="${CONFIG.socials[k]}" target="_blank" rel="noopener" aria-label="${label}">${icon(n)}</a>`
    : `<a aria-disabled="true" aria-label="${label} (coming soon)" title="Coming soon">${icon(n)}</a>`;
  $("#footer").outerHTML = `
  <footer class="footer">
    <div class="wrap">
      <p class="footer__big reveal">Mix. Create. <em>Serve.</em></p>
      <div class="footer__grid">
        <div>
          <a class="logo" href="index.html"><svg class="logo__mark" viewBox="0 0 32 32" aria-hidden="true">${LOGO_PATH}</svg><span class="logo__word"><b>TWS</b><i>Liquid Chef</i></span></a>
          <p class="muted" style="margin-top:1rem;max-width:22rem">Premium beverage experiences, thoughtfully crafted for every occasion. ${esc(CONFIG.area)}</p>
          <div class="socials">${social("instagram", "ig", "Instagram")}${social("facebook", "fb", "Facebook")}${social("tiktok", "tt", "TikTok")}</div>
        </div>
        <div><h4>Explore</h4><ul class="footer__links">${NAV.map(([h, t]) => `<li><a href="${h}">${t === "Vision" ? "Investor Vision" : t}</a></li>`).join("")}</ul></div>
        <div class="footer__contact"><h4>Contact</h4>
          <a href="${wa()}" target="_blank" rel="noopener">${icon("wa")} ${CONFIG.whatsappDisplay}</a>
          <a href="mailto:${CONFIG.email}">${icon("mail")} ${CONFIG.email}</a>
          ${CONFIG.phone ? `<a href="tel:${CONFIG.phone.replace(/\s/g, "")}">${icon("phone")} ${CONFIG.phone}</a>` : ""}
          <span class="muted" style="display:flex;gap:.5rem;align-items:center;min-height:40px">${icon("clock")} ${CONFIG.hours}</span>
        </div>
      </div>
      <div class="footer__fine"><span>© ${new Date().getFullYear()} TWS Liquid Chef · Tiro Wabotlhe Sebeso</span><span>Please drink responsibly · 18+ for alcohol</span></div>
    </div>
  </footer>
  <a class="fab is-hidden" href="${wa()}" target="_blank" rel="noopener">${icon("wa")} WhatsApp for a quote</a>
  <div class="curtain" aria-hidden="true"></div>`;
}

/* ---------- Header, menu ---------- */
function initHeader() {
  const header = $(".header"), burger = $(".burger"), menu = $("#site-menu");
  let open = false;
  const onScroll = () => header.classList.toggle("is-solid", open || scrollY > 24);
  const setOpen = (next) => {
    if (next === open) return;
    open = next;
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    window.__lenis?.[open ? "stop" : "start"]();
    if (open) { menu.hidden = false; void menu.offsetWidth; menu.classList.add("is-open"); }
    else { menu.classList.remove("is-open"); setTimeout(() => { if (!open) menu.hidden = true; }, reduceMotion ? 0 : 260); }
    onScroll();
  };
  burger.addEventListener("click", () => setOpen(!open));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
  matchMedia("(min-width: 1200px)").addEventListener("change", (e) => e.matches && setOpen(false));
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
}

/* Floating WhatsApp: hidden while the first screen or any [data-hide-fab] is visible */
function initFab() {
  const fab = $(".fab"), seen = new Set();
  const targets = [$(".hero, .phero"), ...$$("[data-hide-fab]"), $(".footer")].filter(Boolean);
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    fab.classList.toggle("is-hidden", seen.size > 0);
  }, { threshold: 0.05 });
  targets.forEach((t) => io.observe(t));
}

/* ---------- Page transitions ---------- */
function initTransitions() {
  if ("onpagereveal" in window) return; // native cross-document View Transitions handle it
  document.documentElement.classList.add("js-fallback");
  const curtain = $(".curtain");
  addEventListener("pageshow", () => curtain.classList.remove("is-on"));
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    if (reduceMotion) return;
    e.preventDefault();
    curtain.classList.add("is-on");
    setTimeout(() => (location.href = url.href), 320);
  });
}

/* ---------- Smooth scroll (Lenis, mouse/trackpad only) ---------- */
function initSmoothScroll() {
  if (reduceMotion || !matchMedia("(pointer: fine)").matches) return;
  const s = document.createElement("script");
  s.src = "https://unpkg.com/lenis@1.3.11/dist/lenis.min.js";
  s.onload = () => {
    if (!window.Lenis) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
    window.__lenis = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  };
  document.head.append(s);
}

/* ---------- Reveal on scroll ---------- */
function initReveal(root = document) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in"); io.unobserve(e.target);
  }), { rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .reveal-img, .steps", root).forEach((el) => { if (!el.classList.contains("is-in")) io.observe(el); });
}

/* Segmented filter with sliding pill. onChange(value) */
function segmented(seg, onChange) {
  const pill = document.createElement("span");
  pill.className = "seg__pill"; pill.setAttribute("aria-hidden", "true");
  seg.prepend(pill);
  const move = (b) => { pill.style.width = b.offsetWidth + "px"; pill.style.transform = `translateX(${b.offsetLeft}px)`; };
  const active = () => $("button.is-active", seg);
  move(active());
  document.fonts?.ready.then(() => move(active()));
  addEventListener("resize", () => move(active()));
  $$("button", seg).forEach((b) => b.addEventListener("click", () => {
    $$("button", seg).forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b); });
    move(b);
    seg.scrollTo({ left: b.offsetLeft - 20, behavior: reduceMotion ? "auto" : "smooth" });
    onChange(b.dataset.v);
  }));
}

/* Animate items back in after a filter change (non-uniform, tapering stagger) */
const STAGGER = [0, 40, 75, 105, 130, 150, 165, 175];
function restagger(items) {
  let n = 0;
  items.forEach((el) => {
    el.classList.remove("is-entering");
    if (el.hidden) return;
    el.style.setProperty("--d", STAGGER[Math.min(n++, STAGGER.length - 1)] + "ms");
    void el.offsetWidth;
    el.classList.add("is-entering");
  });
  return n;
}

/* ---------- Reusable renderers ---------- */
const stars = (r) => `<span class="review__stars" aria-label="${r} out of 5 stars">${[1, 2, 3, 4, 5].map((n) => `<span class="${n <= r ? "" : "off"}">${icon("star")}</span>`).join("")}</span>`;
function reviewCard(r) {
  const d = r.date ? new Date(r.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "";
  return `<article class="card review reveal">
    ${stars(r.rating)}
    ${r.photo ? `<img src="${esc(r.photo)}" alt="Photo from ${esc(r.name)}'s event" loading="lazy">` : ""}
    <blockquote>“${esc(r.text)}”</blockquote>
    <footer><span><b>${esc(r.name)}</b> · ${esc(r.event)}</span><span>${d}</span></footer>
  </article>`;
}
function emptyReviews(compact) {
  return `<div class="card empty-state reveal">
    <p class="h3s">Our first reviews are <em>on their way.</em></p>
    <p>Every review here comes from a real TWS client and is approved before it's published.${compact ? "" : " Hosted an event with us? We'd love to hear about it."}</p>
    <a class="btn btn--ghost" href="reviews.html#write">Leave a review ${icon("arrow", "i i--arrow")}</a>
  </div>`;
}
function renderFaqs(el, list) {
  el.innerHTML = list.map((f) => `<details class="reveal"><summary>${esc(f.q)}<span class="plus" aria-hidden="true"></span></summary><div class="faq__a"><p>${esc(f.a)}</p></div></details>`).join("");
}
function galleryFigures(list, sizes = 800) {
  return list.map((g, i) => `<figure data-cat="${g.cat}" data-i="${i}"><img src="${img(g.img, sizes)}" alt="${esc(g.alt)}" loading="lazy" decoding="async"><figcaption class="glass">${esc(g.alt)}</figcaption></figure>`).join("");
}

/* ==========================================================
   Page scripts
   ========================================================== */
const PAGES = {
  home() {
    // Desktop: cross-fading video montage. Phones: the still image only (saves data).
    const media = $(".hero__media");
    if (matchMedia("(min-width: 900px)").matches && !reduceMotion && !navigator.connection?.saveData) {
      const vids = MEDIA.heroVideos.map(() => {
        const v = document.createElement("video");
        Object.assign(v, { muted: true, playsInline: true, preload: "none" });
        v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
        media.append(v); return v;
      });
      let i = 0;
      const play = (n) => {
        const v = vids[n];
        if (!v.src) v.src = MEDIA.heroVideos[n];
        v.currentTime = 0;
        v.play().then(() => {
          vids.forEach((o) => o.classList.toggle("is-on", o === v));
          const next = (n + 1) % vids.length;
          if (!vids[next].src) { vids[next].preload = "auto"; vids[next].src = MEDIA.heroVideos[next]; vids[next].load(); }
        }).catch(() => {});
      };
      vids.forEach((v, n) => v.addEventListener("timeupdate", () => {
        if (n === i && v.duration && v.currentTime > Math.min(v.duration - 1.2, 7.5)) { i = (i + 1) % vids.length; play(i); }
      }));
      play(0);
    }
    // Rotating headline
    const words = $$(".rotator > span");
    if (words.length > 1) {
      let w = 0;
      setInterval(() => {
        const prev = words[w]; w = (w + 1) % words.length;
        prev.classList.remove("is-on"); prev.classList.add("is-out");
        words[w].classList.remove("is-out"); words[w].classList.add("is-on");
        setTimeout(() => prev.classList.remove("is-out"), 700);
      }, 2800);
    }
    // Gallery + reviews previews
    $("#home-gallery").innerHTML = galleryFigures(GALLERY.slice(0, 6), 700);
    $("#home-reviews").innerHTML = REVIEWS.length
      ? `<div class="reviews reviews--3">${REVIEWS.slice(0, 3).map(reviewCard).join("")}</div>`
      : emptyReviews(true);
  },

  services() {
    $("#svc-chips").innerHTML = SERVICES.map((s) => `<a class="chip" href="#${s.id}">${esc(s.name)}</a>`).join("");
    $("#svc-list").innerHTML = SERVICES.map((s, i) => `
      <article class="svc" id="${s.id}">
        <div class="svc__img reveal-img"><img src="${img(s.img, 1100)}" alt="" loading="lazy"></div>
        <div class="reveal">
          <p class="svc__n">${String(i + 1).padStart(2, "0")}${s.primary ? '<span class="badge">Primary service</span>' : ""}</p>
          <h2>${esc(s.name)}</h2>
          <p class="svc__desc">${esc(s.desc)}</p>
          <dl class="svc__facts">
            <dt>Event size</dt><dd>${esc(s.sizes)}</dd>
            <dt>Benefits</dt><dd><ul class="ticks">${s.benefits.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></dd>
            <dt>Customise</dt><dd>${esc(s.custom)}</dd>
          </dl>
          <div class="btns">
            <a class="btn btn--primary" href="${wa(`Hello TWS Liquid Chef. I would like a quotation for ${s.name.toLowerCase()}.`)}" target="_blank" rel="noopener">Get a quote ${icon("arrow", "i i--arrow")}</a>
            <a class="btn btn--ghost" href="packages.html">See packages</a>
          </div>
        </div>
      </article>`).join("");
    scrollSpy($$(".svc"), $$("#svc-chips .chip"));
  },

  menu() {
    $("#menu-chips").innerHTML = MENU.map((c) => `<a class="chip" href="#${c.id}">${esc(c.title)}</a>`).join("");
    $("#menu-list").innerHTML = MENU.map((c) => `
      <section class="mcat" id="${c.id}" aria-labelledby="h-${c.id}">
        <div class="mcat__head reveal"><h2 id="h-${c.id}">${esc(c.title)}</h2><p>${esc(c.note)}</p></div>
        <ul class="mitems">${c.items.map((it) => `
          <li class="mitem" data-alc="${it.alc}">
            <div class="mitem__top"><h3>${esc(it.name)}</h3><span class="dots"></span>
              <span class="mitem__price">${it.price ? pula(it.price) : '<small>On request</small>'}</span></div>
            <p>${esc(it.desc)}</p>
            <div class="mitem__meta">
              <span class="tag ${it.alc ? "tag--alc" : "tag--na"}">${it.alc ? "Alcoholic" : "Non-alcoholic"}</span>
              <span>${esc(it.ing)}</span><span>· ${esc(it.diet)}</span>
            </div>
          </li>`).join("")}</ul>
      </section>`).join("");
    $("#na-only").addEventListener("change", (e) => {
      $$(".mitem").forEach((li) => (li.hidden = e.target.checked && li.dataset.alc === "true"));
    });
    scrollSpy($$(".mcat"), $$("#menu-chips .chip"));
  },

  packages() {
    $("#pkg-chips").innerHTML = PACKAGES.map((g, i) => `<a class="chip" href="#pkg-${i}">${esc(g.group)}</a>`).join("");
    $("#pkg-list").innerHTML = PACKAGES.map((g, i) => `
      <section class="pgroup" id="pkg-${i}">
        <div class="pgroup__head reveal"><h2>${esc(g.group)}</h2><p>${esc(g.intro)}</p></div>
        <div class="tiers tiers--${Math.min(g.tiers.length, 3)}">${g.tiers.map((t, n) => `
          <article class="card tier ${t.featured ? "tier--featured" : ""} reveal" style="--d:${[0, 80, 140][n] || 0}ms">
            <div class="tier__top"><span>${esc(t.guests)}</span>${t.featured ? '<span class="tier__badge">Most booked</span>' : ""}</div>
            <h3>${esc(t.name)}</h3>
            <p class="tier__price">From <b>${pula(t.from)}</b>${t.perGuest ? " per guest" : ""}</p>
            <ul class="ticks">${t.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            <a class="btn ${t.featured ? "btn--primary" : "btn--ghost"} btn--block" target="_blank" rel="noopener"
               href="${wa(`Hello TWS Liquid Chef. I'm interested in the ${g.group} — ${t.name} package (${t.guests}). Please send me a quotation.`)}">Request this package</a>
          </article>`).join("")}</div>
      </section>`).join("");
    scrollSpy($$(".pgroup"), $$("#pkg-chips .chip"));
  },

  gallery() {
    const grid = $("#gallery");
    grid.innerHTML = galleryFigures(GALLERY, 900);
    const figs = $$("figure", grid);
    segmented($("#gallery-filter"), (v) => {
      figs.forEach((f) => (f.hidden = v !== "all" && f.dataset.cat !== v));
      restagger(figs);
    });
    lightbox(grid);
  },

  reviews() {
    const list = $("#review-list");
    let filter = "all", sort = "new";
    const draw = () => {
      let rs = REVIEWS.filter((r) => filter === "all" || r.event === filter);
      rs = rs.sort((a, b) => sort === "top" ? b.rating - a.rating : sort === "low" ? a.rating - b.rating : new Date(b.date) - new Date(a.date));
      list.innerHTML = REVIEWS.length === 0 ? emptyReviews(false)
        : rs.length ? `<div class="reviews">${rs.map(reviewCard).join("")}</div>`
        : `<p class="muted">No reviews for this event type yet.</p>`;
      initReveal(list);
    };
    $("#f-filter").innerHTML = `<option value="all">All event types</option>` + EVENT_TYPES.map((t) => `<option>${esc(t)}</option>`).join("");
    $("#r-event").innerHTML = EVENT_TYPES.map((t) => `<option>${esc(t)}</option>`).join("");
    $("#f-filter").addEventListener("change", (e) => { filter = e.target.value; draw(); });
    $("#f-sort").addEventListener("change", (e) => { sort = e.target.value; draw(); });
    if (REVIEWS.length) {
      const avg = REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length;
      $("#review-summary").innerHTML = `<b>${avg.toFixed(1)}</b> ${stars(Math.round(avg))} <span>from ${REVIEWS.length} review${REVIEWS.length > 1 ? "s" : ""}</span>`;
    }
    draw();

    // star input
    const labels = $$(".stars label");
    const paint = (n) => labels.forEach((l, i) => l.classList.toggle("is-on", i < n));
    $$(".stars input").forEach((inp) => inp.addEventListener("change", () => paint(+inp.value)));
    paint(5);

    formToWhatsApp($("#review-form"), ["r-name", "r-text"], (f) => {
      const rating = +($(".stars input:checked")?.value || 5);
      return [
        "Hello TWS Liquid Chef — here is my review for your website:",
        `Name: ${f["r-name"]}`, `Event: ${f["r-event"]}`, `Rating: ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
        `Review: ${f["r-text"]}`, f["r-photo"] ? "I'll attach a photo from my event in this chat." : ""
      ].filter(Boolean).join("\n");
    });
  },

  faqs() { renderFaqs($("#faq-list"), FAQS); },

  contact() {
    formToWhatsApp($("#quote-form"), ["q-name", "q-date", "q-guests"], (f) => [
      CONFIG.whatsappMessage, "",
      `Name: ${f["q-name"]}`, `Event: ${f["q-type"]}`, `Date: ${f["q-date"]}`, `Guests: ${f["q-guests"]}`,
      f["q-venue"] && `Venue / town: ${f["q-venue"]}`, `Interested in: ${f["q-service"]}`, f["q-notes"] && `Notes: ${f["q-notes"]}`
    ].filter(Boolean).join("\n"));
    const d = new Date();
    const dateEl = $("#q-date");
    if (dateEl) dateEl.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    $("#q-service").innerHTML = ["Not sure yet", ...SERVICES.map((s) => s.name)].map((s) => `<option>${esc(s)}</option>`).join("");
    $("#q-type").innerHTML = EVENT_TYPES.map((t) => `<option>${esc(t)}</option>`).join("");
  }
};

/* Validates required fields, then opens WhatsApp with the built message */
function formToWhatsApp(form, required, build) {
  if (!form) return;
  const err = $(".form__error", form);
  form.addEventListener("input", (e) => e.target.removeAttribute("aria-invalid"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let first = null;
    required.forEach((id) => {
      const el = form.elements[id];
      el.removeAttribute("aria-invalid");
      if (!el.value.trim()) { void el.offsetWidth; el.setAttribute("aria-invalid", "true"); first ||= el; }
    });
    if (first) { err.textContent = "Please fill in the highlighted fields."; err.hidden = false; first.focus(); return; }
    err.hidden = true;
    const vals = Object.fromEntries([...form.elements].filter((x) => x.id).map((x) => [x.id, x.type === "checkbox" ? x.checked : x.value.trim()]));
    window.open(wa(build(vals)), "_blank", "noopener");
  });
}

/* Highlights the chip for the section in view; keeps the chip row scrolled to it */
function scrollSpy(sections, chips) {
  const byId = Object.fromEntries(chips.map((c) => [c.hash.slice(1), c]));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    chips.forEach((c) => c.classList.remove("is-active"));
    const c = byId[e.target.id]; if (!c) return;
    c.classList.add("is-active");
    c.parentElement.scrollTo({ left: c.offsetLeft - 20, behavior: reduceMotion ? "auto" : "smooth" });
  }), { rootMargin: "-35% 0px -60% 0px" });
  sections.forEach((s) => io.observe(s));
}

function lightbox(grid) {
  const dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.innerHTML = `<button class="lightbox__close" aria-label="Close">${icon("x")}</button><div><img alt=""><p></p></div>`;
  document.body.append(dlg);
  grid.addEventListener("click", (e) => {
    const f = e.target.closest("figure"); if (!f) return;
    const g = GALLERY[+f.dataset.i];
    $("img", dlg).src = img(g.img, 1800); $("img", dlg).alt = g.alt; $("p", dlg).textContent = g.alt;
    dlg.showModal(); window.__lenis?.stop();
  });
  dlg.addEventListener("close", () => window.__lenis?.start());
  dlg.addEventListener("click", (e) => { if (e.target === dlg || e.target.closest(".lightbox__close")) dlg.close(); });
}

/* ---------- Boot ---------- */
renderChrome();
initHeader();
initTransitions();
PAGES[PAGE]?.();
$$("[data-faqs]").forEach((el) => renderFaqs(el, FAQS.slice(0, +el.dataset.faqs || FAQS.length)));
$$("[data-wa]").forEach((a) => { a.href = wa(a.dataset.wa || undefined); a.target = "_blank"; a.rel = "noopener"; });
$$("[data-email]").forEach((a) => { a.href = `mailto:${CONFIG.email}`; if (!a.textContent.trim()) a.textContent = CONFIG.email; });
// Responsive sizes for lazy Unsplash images: phones fetch ~480–800px instead of desktop sizes
$$('img[loading="lazy"][src*="images.unsplash.com"]').forEach((im) => {
  const base = im.src.split("?")[0];
  im.srcset = [480, 800, 1200, 1800].map((w) => `${base}?w=${w}&q=65&auto=format&fit=crop ${w}w`).join(", ");
  im.sizes = im.closest(".masonry") ? "(min-width: 900px) 33vw, 50vw"
    : im.closest(".tile, .sig__item") ? "(min-width: 1050px) 33vw, (min-width: 700px) 50vw, 100vw"
    : im.closest(".cta") ? "100vw" : "(min-width: 950px) 50vw, 100vw";
});
initReveal();
initFab();
initSmoothScroll();
Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 700))])
  .then(() => requestAnimationFrame(() => document.documentElement.classList.add("is-loaded")));
