#!/usr/bin/env node
// Finds declarations in dist/google-ads-lp.css that change nothing: take each
// declaration out of the live stylesheet and see whether the computed style of
// any element it targets moves. Run on the three pages at widths covering every
// breakpoint; a declaration is dropped only if it was tested in an active rule
// and never made a difference to any element it matches, shown or hidden.
//
//   node scripts/ga-css-prune.cjs            → report
//   node scripts/ga-css-prune.cjs --write    → rewrite the CSS without them
//
// Kept without testing: rules that depend on state (:hover, :focus, […],
// classes only JS adds), @container / @supports / reduced-motion rules,
// animation and transition properties, properties JS sets inline, and
// ::before / ::after of boxes that are not drawn. Needs `node serve.mjs`.
const fs = require('fs');
const path = require('path');
const {pack, unpack} = require('./ga-css-pack.cjs');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const ROOT = path.resolve(__dirname, '..');
const CSS = path.join(ROOT, 'dist', 'google-ads-lp.css');
const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const EDGE = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const GA = '/dich-vu/quang-cao-da-kenh/google-ads/';
// page 01 once per campaign tab, so every panel is drawn once
const PAGES = [...['search', 'pmax', 'shopping', 'demand', 'video', 'app'].map(t => [GA, t]), [GA + 'chon-cach-chay/'], [GA + 'chi-phi-hieu-qua/']];
const WIDTHS = [1440, 1920, 1200, 1024, 900, 800, 760, 600, 390, 380, 320];

// Worked on flat (ga-css-pack.cjs unpack): one rule per line, "sel{a:b;c:d}"
// at the top level or indented inside "@media(...){" … "}". The pages are
// served that flat text, so CSSOM rules and lines match one to one.
const FLAT = unpack(fs.readFileSync(CSS, 'utf8'));
const lines = FLAT.split('\n');
const rules = []; // {line, sel, decls:[text]}
lines.forEach((l, i) => {
  const m = /^\s*([^@\s}][^{]*)\{(.*)\}$/.exec(l);
  if (!m || /^\s*(from|to|\d+%)/.test(m[1])) return;
  rules.push({line: i, sel: m[1], decls: splitDecls(m[2])});
});

function splitDecls(body) {
  const out = [];
  let depth = 0, q = '', cur = '';
  for (const ch of body) {
    if (q) { if (ch === q) q = ''; cur += ch; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && !depth) { if (cur.trim()) out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// Classes the HTML never carries are added by JS: rules using them are state.
const inHtml = new Set();
for (const p of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, 'dist', p[0], 'index.html'), 'utf8');
  for (const m of html.matchAll(/\sclass="([^"]*)"/g)) m[1].split(/\s+/).forEach(c => c && inHtml.add(c));
}

// only = null: test every declaration on its own (and put it back).
// only = ["i:j", …]: take those out one after another and leave each out when
// nothing moved, so declarations that only duplicate each other are not all
// dropped together. Returns [i, j, changed].
async function snapshot(page, only) {
  await page.addStyleTag({content: '*,*:before,*:after{transition:none!important;animation:none!important}'});
  return page.evaluate(({rules, inHtml, only}) => {
    // animations started from JS (element.animate) would hide the rule's value
    document.getAnimations().forEach(a => a.cancel());
    const want = only && new Set(only);
    const sheet = [...document.styleSheets].find(s => s.href && s.href.includes('google-ads-lp.css'));
    const list = [];
    (function walk(rs, ctx) {
      for (const r of rs) {
        if (r instanceof CSSStyleRule) list.push({r, ctx});
        else if (r instanceof CSSMediaRule) walk(r.cssRules, {media: r.media.mediaText, skip: ctx.skip || /prefers-reduced-motion|hover|print/.test(r.media.mediaText)});
        else if (r instanceof CSSContainerRule || r instanceof CSSSupportsRule) walk(r.cssRules, {...ctx, skip: true});
      }
    })(sheet.cssRules, {});
    if (list.length !== rules.length) return {error: `CSSOM có ${list.length} rule, file có ${rules.length}`};

    const STATE = /:(hover|focus|focus-visible|focus-within|active|visited|checked|target|placeholder-shown|disabled|invalid|valid|empty|open|popover-open)|::-webkit|::-moz|\[/;
    const PSEUDO = /::?(before|after|placeholder|marker|selection|backdrop|first-line|first-letter)$/;
    const probe = document.createElement('div');
    const longhands = decl => { probe.removeAttribute('style'); probe.style.cssText = decl; return [...probe.style]; };
    const splitTop = s => { const o = []; let d = 0, c = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { o.push(c.trim()); c = ''; } else c += ch; } o.push(c.trim()); return o; };

    const res = [];
    const dropped = new Map(); // rule index → declarations left out (sequential mode)
    list.forEach(({r, ctx}, i) => {
      const src = rules[i];
      if (ctx.skip || (ctx.media && !matchMedia(ctx.media).matches)) return;
      const alts = splitTop(r.selectorText);
      const jsOnly = alts.some(a => [...a.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].some(m => !inHtml.includes(m[1])));
      if (jsOnly || alts.some(a => STATE.test(a.replace(PSEUDO, '')))) return;
      const targets = [];
      let hiddenPseudo = false;
      for (const a of alts) {
        const pm = PSEUDO.exec(a);
        const base = pm ? a.slice(0, pm.index) || '*' : a;
        let els;
        try { els = document.querySelectorAll(base); } catch { return; }
        // Hidden elements count too (other panes, closed <details>): their
        // computed values still come from the cascade. Pseudo-elements of
        // hidden boxes do not, so such a rule is kept untested.
        for (const el of els) {
          if (pm && !el.getClientRects().length) hiddenPseudo = true;
          targets.push([el, pm ? '::' + pm[1] : null]);
        }
      }
      if (!targets.length || hiddenPseudo) return;
      const styles = targets.map(([el, ps]) => getComputedStyle(el, ps));
      src.decls.forEach((d, j) => {
        if (want && !want.has(`${i}:${j}`)) return;
        const prop = d.slice(0, d.indexOf(':')).trim().toLowerCase();
        if (/^(animation|transition)/.test(prop)) return;
        const lh = prop.startsWith('--') ? [prop] : longhands(d);
        if (!lh.length) return;
        // JS writes this property inline: the rule is its starting value.
        if (targets.some(([el]) => lh.some(l => el.style.getPropertyValue(l)))) return;
        // min-width:auto, margin:auto… read as 0px on boxes that are not drawn
        if (/^(min-|max-)?(width|height)$|^margin/.test(prop) && targets.some(([el]) => !el.getClientRects().length)) return;
        const saved = r.style.cssText;
        const before = styles.map(s => lh.map(l => s.getPropertyValue(l)).join('|'));
        // Rebuild the rule without it, so an earlier declaration of the same
        // rule ("border:1px solid;border-right:0") takes its place again.
        const gone = dropped.get(i) || new Set();
        r.style.cssText = src.decls.filter((_, k) => k !== j && !gone.has(k)).join(';');
        const changed = styles.some((s, k) => lh.map(l => s.getPropertyValue(l)).join('|') !== before[k]);
        if (!want || changed) r.style.cssText = saved;
        else dropped.set(i, gone.add(j));
        res.push([i, j, changed ? 1 : 0]);
      });
    });
    return {res};
  }, {rules: rules.map(r => ({decls: r.decls})), inHtml: [...inHtml], only});
}

async function sweep(browser, only) {
  const tested = new Set(), live = new Set();
  for (const width of WIDTHS) {
    // reduced motion: the scripts leave every scene in its resting state
    const ctx = await browser.newContext({viewport: {width, height: 900}, reducedMotion: 'reduce'});
    await ctx.route('**/google-ads-lp.css*', r => r.fulfill({body: FLAT, contentType: 'text/css'}));
    for (const [url, tab] of PAGES) {
      const page = await ctx.newPage();
      await page.goto(BASE + url, {waitUntil: 'load'});
      if (tab) await page.evaluate(id => document.getElementById('tab-' + id).click(), tab);
      await page.waitForTimeout(400);
      const out = await snapshot(page, only && only.filter(k => !live.has(k)));
      if (out.error) { console.error(out.error); process.exit(1); }
      for (const [i, j, c] of out.res) { tested.add(`${i}:${j}`); if (c) live.add(`${i}:${j}`); }
      await page.close();
    }
    await ctx.close();
  }
  return [...tested].filter(k => !live.has(k));
}

(async () => {
  const browser = await chromium.launch({executablePath: EDGE});
  let dead = await sweep(browser, null);
  console.log(`Vòng 1 (từng khai báo riêng): ${dead.length} ứng viên`);
  // Take them out together until the set is stable.
  for (let round = 2; ; round++) {
    const next = await sweep(browser, dead);
    console.log(`Vòng ${round} (bỏ lần lượt): còn ${next.length}`);
    if (next.length === dead.length) break;
    dead = next;
  }
  await browser.close();

  let bytes = 0;
  const byRule = new Map();
  for (const k of dead) {
    const [i, j] = k.split(':').map(Number);
    if (!byRule.has(i)) byRule.set(i, new Set());
    byRule.get(i).add(j);
    bytes += rules[i].decls[j].length + 1;
  }
  console.log(`Khai báo không tác dụng: ${dead.length} (~${bytes} B)`);
  for (const [i, js] of [...byRule].slice(0, 400)) console.log(`  ${rules[i].sel} { ${[...js].map(j => rules[i].decls[j]).join('; ')} }`);

  if (process.argv.includes('--write')) {
    for (const [i, js] of byRule) {
      const r = rules[i];
      const keep = r.decls.filter((_, j) => !js.has(j));
      const pad = lines[r.line].match(/^\s*/)[0];
      lines[r.line] = keep.length ? `${pad}${r.sel}{${keep.join(';')}}` : null;
    }
    // drop media blocks left empty
    const out = pack(lines.filter(l => l !== null).join('\n').replace(/^@(media|container|supports)[^{]*\{\n\}\n/gm, ''));
    const before = fs.statSync(CSS).size;
    fs.writeFileSync(CSS, out);
    console.log(`Đã ghi: ${before} → ${Buffer.byteLength(out)} byte`);
  }
})();
