// Génère « Kitoo-Design-System.pdf » à la racine du projet.
// À lancer depuis la racine du dépôt : `node design-system/build-pdf.mjs`
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// --- Assets en base64 (document auto-suffisant) ---
const b64 = (p, mime) => `data:${mime};base64,${readFileSync(p).toString("base64")}`;
const goodly = b64("design-system/fonts/goodly-medium.otf", "font/otf");
const logo = b64("public/kitoo-logo.png", "image/png");
const koala = (name) => b64(`public/illustrations/kitoo-${name}.png`, "image/png");

const poses = [
  ["classic", "Accueil / neutre"],
  ["heart", "Écoute / soutien"],
  ["sleeping", "Repos / bien-être"],
  ["soda", "Légèreté / détente"],
  ["bubble-tea", "Convivialité"],
  ["sunglasses", "Fierté / bonne humeur"],
  ["skating", "Énergie / avancée"],
  ["crying", "Soutien (ménagé)"],
];

// --- Données tokens ---
const brand = [
  ["50", "#F3F3FE", ""], ["100", "#E9EAFA", "brume lavande"], ["200", "#D7D8F6", ""],
  ["300", "#BFC0F4", ""], ["400", "#ABACF2", ""], ["500", "#9B9DF0", "graine de marque"],
  ["600", "#7E80E6", "hover boutons"], ["700", "#6466CF", "fond boutons"],
  ["800", "#4F50A8", "eyebrows"], ["900", "#3B3C7D", "épaisseur 3D"],
];
const ink = [
  ["50", "#FAFAFD", "canvas"], ["100", "#F2F2F7", ""], ["200", "#E6E6EE", "bordures"],
  ["300", "#D2D2DE", "contrôles"], ["400", "#A6A7B8", ""], ["500", "#7C7D90", ""],
  ["600", "#5C5D70", "icônes"], ["700", "#44455A", ""], ["800", "#2E2F45", ""],
  ["900", "#16161D", "texte"],
];
const moodDefault = [
  ["Très positif", "#FFD93D"], ["Positif", "#A8E6CF"], ["Neutre", "#E0E0E0"],
  ["Négatif", "#FF8C42"], ["Très négatif", "#FF595E"],
];
const moodCb = [
  ["Très positif", "#009E73"], ["Positif", "#56B4E9"], ["Neutre", "#999999"],
  ["Négatif", "#E69F00"], ["Très négatif", "#D55E00"],
];
const semantic = [["success", "#38B27E"], ["warning", "#F2A33C"], ["danger", "#E5575C"]];

const swatch = (hex, name, role, dark) => `
  <div class="sw">
    <div class="sw-chip" style="background:${hex};${dark ? "color:#fff" : "color:#16161D"}">${name}</div>
    <div class="sw-meta"><b>${hex}</b>${role ? `<span>${role}</span>` : ""}</div>
  </div>`;

const moodChip = (label, hex) => `
  <div class="mood">
    <span class="mood-dot" style="background:${hex}"></span>
    <span class="mood-lbl">${label}</span>
    <span class="mood-hex">${hex}</span>
  </div>`;

const koalaCard = (name, use) => `
  <figure class="koala">
    <img src="${koala(name)}" alt="" />
    <figcaption><b>kitoo-${name}</b><span>${use}</span></figcaption>
  </figure>`;

const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8" />
<style>
  @font-face{ font-family:"Goodly"; src:url("${goodly}") format("opentype"); font-weight:500; font-display:block; }
  :root{
    --brand50:#F3F3FE; --brand100:#E9EAFA; --brand500:#9B9DF0; --brand700:#6466CF;
    --brand800:#4F50A8; --brand900:#3B3C7D;
    --ink900:#16161D; --ink700:#44455A; --ink600:#5C5D70; --ink200:#E6E6EE; --ink100:#F2F2F7;
  }
  *{ box-sizing:border-box; }
  html,body{ margin:0; padding:0; }
  body{
    font-family:"Nunito","Segoe UI",system-ui,-apple-system,sans-serif;
    color:var(--ink900); font-size:13px; line-height:1.55; -webkit-print-color-adjust:exact; print-color-adjust:exact;
  }
  .display{ font-family:"Goodly","Poppins",sans-serif; font-weight:500; letter-spacing:-0.01em; }
  .page{
    position:relative; width:210mm; min-height:297mm; padding:16mm 15mm 18mm;
    page-break-after:always; overflow:hidden;
  }
  .page:last-child{ page-break-after:auto; }

  /* ---- Cover ---- */
  .cover{ background:
      radial-gradient(560px 420px at 88% 14%, #E9EAFA 0%, rgba(233,234,250,0) 70%),
      radial-gradient(640px 520px at 6% 96%, #E9EAFA 0%, rgba(233,234,250,0) 70%),
      #F3F3FE;
    display:flex; flex-direction:column; }
  .brandbar{ display:flex; align-items:center; gap:12px; }
  .brandbar img{ width:46px; height:46px; border-radius:14px; }
  .brandbar .wm{ font-size:30px; }
  .cover-mid{ flex:1; display:flex; flex-direction:column; justify-content:center; }
  .eyebrow{ text-transform:uppercase; letter-spacing:0.16em; font-weight:800; font-size:11px; color:var(--brand800); }
  .cover h1{ font-size:74px; line-height:0.98; margin:14px 0 0; color:var(--ink900); }
  .cover .sub{ font-size:17px; color:var(--ink700); max-width:430px; margin-top:18px; }
  .cover-koala{ position:absolute; right:14mm; bottom:34mm; width:250px; filter:drop-shadow(0 18px 30px rgba(42,43,87,.18)); }
  .cover-foot{ display:flex; gap:26px; font-size:12px; color:var(--ink600); border-top:1px solid #D7D8F6; padding-top:14px; }
  .cover-foot b{ color:var(--brand800); }

  /* ---- Running header ---- */
  .rh{ display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--ink200);
       padding-bottom:9px; margin-bottom:18px; }
  .rh .l{ display:flex; align-items:center; gap:9px; font-weight:800; color:var(--ink700); font-size:12px; }
  .rh .l img{ width:24px; height:24px; border-radius:8px; }
  .rh .r{ font-size:11px; color:var(--ink600); text-transform:uppercase; letter-spacing:0.1em; font-weight:700; }
  .secnum{ color:var(--brand700); }
  h2.sec{ font-size:30px; margin:0 0 4px; color:var(--ink900); }
  .lead{ color:var(--ink600); margin:0 0 20px; font-size:13px; max-width:560px; }
  h3{ font-size:15px; margin:22px 0 11px; color:var(--brand800); display:flex; align-items:center; gap:8px; }
  h3::before{ content:""; width:10px; height:10px; border-radius:50%; background:var(--brand500); }

  /* ---- Swatches ---- */
  .swgrid{ display:grid; grid-template-columns:repeat(5,1fr); gap:10px; }
  .sw-chip{ height:54px; border-radius:12px; display:flex; align-items:flex-end; padding:7px 9px; font-weight:800; font-size:12px;
            box-shadow:0 1px 2px rgba(42,43,87,.06); }
  .sw-meta{ margin-top:6px; font-size:10.5px; line-height:1.3; }
  .sw-meta b{ display:block; color:var(--ink800); } .sw-meta span{ color:var(--ink500,#7C7D90); }

  .moodrow{ display:flex; gap:8px; flex-wrap:wrap; }
  .mood{ display:flex; align-items:center; gap:7px; background:#fff; border:1px solid var(--ink200); border-radius:9999px; padding:5px 12px 5px 6px; }
  .mood-dot{ width:18px; height:18px; border-radius:50%; }
  .mood-lbl{ font-weight:700; font-size:11px; } .mood-hex{ font-size:10px; color:var(--ink600); }

  .twocol{ display:grid; grid-template-columns:1fr 1fr; gap:26px; }

  /* ---- Typography samples ---- */
  .fam{ border:1px solid var(--ink200); border-radius:16px; padding:14px 16px; margin-bottom:10px; background:#fff; }
  .fam .nm{ font-weight:800; color:var(--brand800); font-size:12px; } .fam .role{ color:var(--ink600); font-size:11px; }
  .fam .ex{ font-size:24px; margin-top:6px; }
  .scale-row{ display:flex; align-items:baseline; gap:14px; border-bottom:1px dashed var(--ink200); padding:9px 0; }
  .scale-row .tag{ width:74px; flex:none; font-size:10.5px; color:var(--ink600); font-weight:700; }
  .scale-row .spec{ margin-left:auto; font-size:10.5px; color:var(--ink600); flex:none; }

  /* ---- Radii / shadows ---- */
  .boxgrid{ display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  .demo{ text-align:center; } .demo .b{ height:78px; background:#fff; border:1px solid var(--ink200); display:flex; align-items:center; justify-content:center; color:var(--ink600); font-weight:700; font-size:11px; }
  .demo .cap{ margin-top:8px; font-size:11px; } .demo .cap b{ color:var(--brand800); } .demo .cap span{ display:block; color:var(--ink600); font-size:10px; }
  .r-control{ border-radius:16px; } .r-card{ border-radius:22px; } .r-panel{ border-radius:30px; } .r-pill{ border-radius:9999px; }
  .s-sm{ box-shadow:0 1px 2px rgba(42,43,87,.06),0 2px 6px rgba(42,43,87,.06); border-color:transparent; }
  .s-md{ box-shadow:0 6px 16px rgba(42,43,87,.08),0 12px 32px rgba(42,43,87,.08); border-color:transparent; }
  .s-brand{ box-shadow:0 8px 24px rgba(155,157,240,.35); border-color:transparent; }
  .s-focus{ box-shadow:0 0 0 4px rgba(155,157,240,.40); }

  /* ---- Components ---- */
  .btnrow{ display:flex; gap:14px; align-items:center; flex-wrap:wrap; }
  .btn{ font-family:"Nunito",sans-serif; font-weight:800; border-radius:16px; padding:11px 20px; font-size:14px; border:0; }
  .btn-primary{ background:var(--brand700); color:#fff; box-shadow:0 4px 0 0 #3B3C7D,0 8px 18px rgba(42,43,87,.18); }
  .btn-ghost{ background:transparent; color:var(--brand700); }
  .btn-outline{ background:#fff; color:var(--ink900); border:1px solid var(--ink300,#D2D2DE); box-shadow:0 3px 0 0 #D2D2DE; }
  .chips{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .pill{ border-radius:9999px; padding:5px 13px; font-weight:800; font-size:11px; }
  .pill-brand{ background:var(--brand100); color:var(--brand700); }
  .tag-on{ background:var(--brand700); color:#fff; border-radius:9999px; padding:6px 15px; font-weight:700; font-size:12px; }
  .tag-off{ background:#fff; color:var(--ink700); border:1px solid var(--ink200); border-radius:9999px; padding:6px 15px; font-weight:700; font-size:12px; }
  .card-soft{ background:var(--brand100); border-radius:22px; padding:18px; box-shadow:0 1px 2px rgba(42,43,87,.06); }
  .card-white{ background:#fff; border-radius:22px; padding:18px; box-shadow:0 6px 16px rgba(42,43,87,.08); }

  /* ---- Illustrations ---- */
  .koalagrid{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
  .koala{ margin:0; background:#fff; border:1px solid var(--ink200); border-radius:18px; padding:10px; text-align:center; }
  .koala img{ width:78px; height:78px; object-fit:contain; }
  .koala figcaption{ font-size:10px; margin-top:4px; } .koala b{ display:block; color:var(--brand800); } .koala span{ color:var(--ink600); }

  .note{ background:var(--brand50); border-left:4px solid var(--brand500); border-radius:0 10px 10px 0; padding:10px 14px; font-size:11.5px; color:var(--ink700); margin-top:14px; }
  .note b{ color:var(--brand800); }
  ul.tight{ margin:6px 0 0; padding-left:18px; } ul.tight li{ margin:3px 0; font-size:12px; }
</style></head>
<body>

<!-- ============ COVER ============ -->
<section class="page cover">
  <div class="brandbar"><img src="${logo}" alt=""/><span class="wm display">Kitoo</span></div>
  <div class="cover-mid">
    <div class="eyebrow">Identité visuelle &amp; guidelines</div>
    <h1 class="display">Design<br/>System</h1>
    <p class="sub">Le système de marque de Kitoo : couleurs, typographie, formes, composants et mouvement. Doux, arrondi, rassurant, accessible (WCAG AA).</p>
  </div>
  <img class="cover-koala" src="${koala("classic")}" alt=""/>
  <div class="cover-foot">
    <div><b>Version</b><br/>v2.0.0 · juin 2026</div>
    <div><b>Marque</b><br/>Pervenche · koala Kitoo</div>
    <div><b>Source de vérité</b><br/>design-system/ · tailwind.config.ts</div>
  </div>
</section>

<!-- ============ COULEURS ============ -->
<section class="page">
  <div class="rh"><div class="l"><img src="${logo}"/>Kitoo · Design System</div><div class="r"><span class="secnum">01</span> Couleurs</div></div>
  <h2 class="sec display">Couleurs</h2>
  <p class="lead">Pervenche comme couleur de marque, neutres « encre » à cast froid/lavande (jamais de gris chaud), et une échelle d'humeur fixe avec variante daltonisme.</p>

  <h3>Pervenche · marque (<code>brand</code>)</h3>
  <div class="swgrid">${brand.map(([n, h, r]) => swatch(h, n, r, +n >= 600)).join("")}</div>

  <h3>Encre · neutres (<code>ink</code>)</h3>
  <div class="swgrid">${ink.map(([n, h, r]) => swatch(h, n, r, +n >= 500)).join("")}</div>

  <div class="twocol" style="margin-top:22px">
    <div>
      <h3>Humeur · défaut</h3>
      <div class="moodrow">${moodDefault.map(([l, h]) => moodChip(l, h)).join("")}</div>
      <h3 style="margin-top:16px">Humeur · daltonisme</h3>
      <div class="moodrow">${moodCb.map(([l, h]) => moodChip(l, h)).join("")}</div>
    </div>
    <div>
      <h3>Sémantique</h3>
      <div class="moodrow">${semantic.map(([l, h]) => moodChip(l, h)).join("")}</div>
      <div class="note"><b>Contraste AA :</b> le texte sur pervenche utilise <code>brand-700/800</code> ; l'échelle d'humeur bascule sur la palette daltonisme via <code>data-contrast="colorblind"</code>.</div>
    </div>
  </div>
</section>

<!-- ============ TYPOGRAPHIE ============ -->
<section class="page">
  <div class="rh"><div class="l"><img src="${logo}"/>Kitoo · Design System</div><div class="r"><span class="secnum">02</span> Typographie</div></div>
  <h2 class="sec display">Typographie</h2>
  <p class="lead">Trois familles : une display de marque, un corps lisible (≥ 16px, WCAG) et une police dédiée au mode dyslexie.</p>

  <div class="fam"><span class="nm">Goodly Medium</span> · <span class="role">display — titres, wordmark, chiffres héros</span><div class="ex display">Prends soin de toi, un jour à la fois.</div></div>
  <div class="fam"><span class="nm">Nunito</span> · <span class="role">body / UI — corps, libellés, texte long</span><div class="ex" style="font-family:Nunito,sans-serif">Prends soin de toi, un jour à la fois.</div></div>
  <div class="fam"><span class="nm">Atkinson Hyperlegible</span> · <span class="role">mode dyslexie (data-font="dyslexia")</span><div class="ex" style="font-family:'Atkinson Hyperlegible',Nunito,sans-serif">Prends soin de toi, un jour à la fois.</div></div>

  <h3>Échelle typographique</h3>
  <div class="scale-row"><span class="tag">display</span><span class="display" style="font-size:46px;line-height:1">Aa</span><span class="spec">46px · 1.05 · -0.01em</span></div>
  <div class="scale-row"><span class="tag">title</span><span style="font-size:24px;font-weight:700">Aa — titres de section</span><span class="spec">24px · 1.25 · 700</span></div>
  <div class="scale-row"><span class="tag">heading</span><span style="font-size:16px;font-weight:700">Aa — sous-titres</span><span class="spec">16px · 1.4 · 700</span></div>
  <div class="scale-row"><span class="tag">body</span><span style="font-size:16px">Aa — corps de texte</span><span class="spec">16px · 1.6</span></div>
  <div class="scale-row"><span class="tag">small</span><span style="font-size:13px">Aa — libellés secondaires</span><span class="spec">13px · 1.5</span></div>
  <div class="scale-row"><span class="tag">eyebrow</span><span style="font-size:10px;text-transform:uppercase;letter-spacing:0.04em;font-weight:800">Aa — surtitres</span><span class="spec">10px · 0.04em</span></div>
</section>

<!-- ============ FORMES & OMBRES ============ -->
<section class="page">
  <div class="rh"><div class="l"><img src="${logo}"/>Kitoo · Design System</div><div class="r"><span class="secnum">03</span> Formes &amp; ombres</div></div>
  <h2 class="sec display">Formes &amp; ombres</h2>
  <p class="lead">Tout est arrondi et doux. Les ombres sont diffuses, teintées lavande <code>rgba(42,43,87,…)</code> — jamais de gris dur.</p>

  <h3>Rayons</h3>
  <div class="boxgrid">
    <div class="demo"><div class="b r-control">16</div><div class="cap"><b>control</b><span>boutons, inputs</span></div></div>
    <div class="demo"><div class="b r-card">22</div><div class="cap"><b>card</b><span>cartes</span></div></div>
    <div class="demo"><div class="b r-panel">30</div><div class="cap"><b>panel</b><span>panneaux</span></div></div>
    <div class="demo"><div class="b r-pill">∞</div><div class="cap"><b>pill</b><span>pills, tags, badges</span></div></div>
  </div>

  <h3>Ombres</h3>
  <div class="boxgrid">
    <div class="demo"><div class="b r-card s-sm"></div><div class="cap"><b>sm</b><span>élévation douce</span></div></div>
    <div class="demo"><div class="b r-card s-md"></div><div class="cap"><b>md</b><span>cartes flottantes</span></div></div>
    <div class="demo"><div class="b r-card s-brand"></div><div class="cap"><b>brand</b><span>lueur pervenche</span></div></div>
    <div class="demo"><div class="b r-card s-focus"></div><div class="cap"><b>focus</b><span>anneau 4px</span></div></div>
  </div>

  <h3>Boutons « 3D » (épaisseur)</h3>
  <div class="boxgrid">
    <div class="demo"><div class="b r-control" style="background:var(--brand700);color:#fff;box-shadow:0 4px 0 0 #3B3C7D,0 8px 18px rgba(42,43,87,.18);border:0">btn</div><div class="cap"><b>shadow-btn</b><span>repos</span></div></div>
    <div class="demo"><div class="b r-control" style="background:var(--brand700);color:#fff;box-shadow:0 1px 0 0 #3B3C7D,0 3px 10px rgba(42,43,87,.14);border:0;transform:translateY(3px)">btn</div><div class="cap"><b>btn-press</b><span>enfoncé</span></div></div>
  </div>
  <div class="note"><b>Mouvement :</b> au press le bouton descend (<code>translate-y 3px</code>) et l'épaisseur se réduit. Gardé derrière <code>motion-safe:</code> → neutralisé sous <code>prefers-reduced-motion</code>.</div>
</section>

<!-- ============ COMPOSANTS ============ -->
<section class="page">
  <div class="rh"><div class="l"><img src="${logo}"/>Kitoo · Design System</div><div class="r"><span class="secnum">04</span> Composants</div></div>
  <h2 class="sec display">Composants</h2>
  <p class="lead">Primitives réutilisables (<code>src/components/ui/</code>) construites sur les tokens ci-dessus.</p>

  <h3>Boutons</h3>
  <div class="btnrow">
    <button class="btn btn-primary">Accéder à l'app</button>
    <button class="btn btn-ghost">Action secondaire</button>
    <button class="btn btn-outline">Action tertiaire</button>
  </div>
  <p style="font-size:11px;color:var(--ink600);margin-top:8px">primary (pervenche, 3D, texte blanc) · ghost (lavande au survol) · outline (contour neutre)</p>

  <h3>Pills, badges &amp; tags</h3>
  <div class="chips">
    <span class="pill pill-brand">Pill</span>
    <span class="pill pill-brand">Badge</span>
    <span class="tag-on">Tag sélectionné</span>
    <span class="tag-off">Tag</span>
  </div>

  <h3>Cartes</h3>
  <div class="twocol">
    <div class="card-soft"><b>Card soft</b><div style="color:var(--ink700);margin-top:4px;font-size:12px">Surface lavande (brume) pour regrouper du contenu doux — ex. CTA final.</div></div>
    <div class="card-white"><b>Card blanche</b><div style="color:var(--ink700);margin-top:4px;font-size:12px">Surface blanche, ombre <code>md</code>, rayon <code>card</code> — ex. cards de fonctionnalités.</div></div>
  </div>

  <div class="note"><b>États requis :</b> chaque composant interactif gère hover / active / <b>focus-visible</b> (anneau <code>shadow-focus</code>) / disabled, cible tactile ≥ 44px.</div>
</section>

<!-- ============ MOUVEMENT, ILLUSTRATIONS, A11Y ============ -->
<section class="page">
  <div class="rh"><div class="l"><img src="${logo}"/>Kitoo · Design System</div><div class="r"><span class="secnum">05</span> Mouvement &amp; mascotte</div></div>
  <h2 class="sec display">Mouvement, mascotte &amp; accessibilité</h2>

  <h3>Mouvement</h3>
  <div class="twocol">
    <ul class="tight">
      <li><b>Easing</b> <code>kitoo</code> : cubic-bezier(0.22, 0.61, 0.36, 1) — doux, sans rebond.</li>
      <li><b>Durée</b> <code>kitoo</code> : 200ms (micro-interactions ~160ms).</li>
    </ul>
    <ul class="tight">
      <li><b>float</b> 6s — flottement idle de la mascotte.</li>
      <li><b>breathe</b> 8s — respiration des décors organiques.</li>
      <li>Toutes animations gated <code>motion-safe:</code> → off en reduced-motion.</li>
    </ul>
  </div>

  <h3>Mascotte koala (illustrations <code>kitoo-*</code>)</h3>
  <div class="koalagrid">${poses.map(([n, u]) => koalaCard(n, u)).join("")}</div>
  <div class="note"><b>Règles :</b> rester fidèle au koala pervenche — <b>ne jamais recolorer</b>. <code>kitoo-crying</code> est réservé aux contextes de soutien (humeur la plus basse), jamais en décoration.</div>

  <h3>Accessibilité (WCAG AA visé)</h3>
  <div class="twocol">
    <ul class="tight">
      <li>Contrastes AA ; texte sur pervenche en <code>brand-700/800</code>.</li>
      <li>Focus visible (anneau 4px) sur tout élément interactif.</li>
    </ul>
    <ul class="tight">
      <li>Mode <b>dyslexie</b> (Atkinson Hyperlegible) &amp; <b>daltonisme</b> (palette humeur).</li>
      <li><code>prefers-reduced-motion</code> respecté ; corps ≥ 16px.</li>
    </ul>
  </div>
</section>

</body></html>`;

// --- Rendu PDF via Chromium (Playwright) ---
let chromium;
for (const m of ["playwright", "@playwright/test", "playwright-core"]) {
  try { chromium = require(m).chromium; if (chromium) break; } catch {}
}
if (!chromium) { console.error("Playwright introuvable"); process.exit(1); }

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({
  path: "Kitoo-Design-System.pdf",
  format: "A4",
  printBackground: true,
  preferCSSPageSize: false,
});
await browser.close();
console.log("PDF généré : Kitoo-Design-System.pdf");
