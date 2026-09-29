#!/usr/bin/env node
// Compares the computed style of every element (and ::before / ::after) of the
// three Google Ads pages under two versions of google-ads-lp.css: every campaign
// panel on page 01, <details> closed and open, several widths. Stricter than a
// screenshot diff: it sees hidden content and differences of a pixel.
//
//   node scripts/ga-css-style-diff.cjs old.css [new.css = dist/google-ads-lp.css]
//
// Needs `node serve.mjs`. Exit code 1 when anything differs.
const fs = require('fs');
const path = require('path');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const EDGE = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ROOT = '/dich-vu/quang-cao-da-kenh/google-ads/';
const PAGES = [[ROOT, ['search', 'pmax', 'shopping', 'demand', 'video', 'app']], [ROOT + 'chon-cach-chay/', ['']], [ROOT + 'chi-phi-hieu-qua/', ['']]];
const WIDTHS = (process.env.WIDTHS || '1440,390').split(',').map(Number);
const [oldCss, newCss = path.resolve(__dirname, '..', 'dist', 'google-ads-lp.css')] = process.argv.slice(2);
if (!oldCss) { console.error('Cần đường dẫn CSS cũ'); process.exit(2); }

// the properties either stylesheet declares (shorthands expanded in the page)
const NAMES = [...new Set([oldCss, newCss].flatMap(f => [...fs.readFileSync(f, 'utf8').matchAll(/[{;]\s*(-?-?[a-z][\w-]*)\s*:/g)].map(m => m[1])))];
const FREEZE = '*,*:before,*:after{animation:none!important;transition:none!important}';

// every element → computed values (element, ::before, ::after); hashes only
// unless `want` lists the indexes to spell out
function collect([open, want, names]) {
  const probe = document.createElement('div');
  // custom properties are left out: only what they end up doing counts
  const props = [...new Set(names.flatMap(n => { if (n.startsWith('--')) return []; probe.style.cssText = n + ':inherit'; return [...probe.style]; }))];
  if (open) document.querySelectorAll('details').forEach(d => { d.open = true; });
  const els = [...document.querySelectorAll('body *')];
  const text = (el, ps) => {
    const cs = getComputedStyle(el, ps);
    if (ps && (cs.content === 'none' || cs.content === 'normal')) return '';
    let s = '';
    for (const p of props) s += p + ':' + cs.getPropertyValue(p) + ';';
    return s;
  };
  const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h >>> 0; };
  const tag = el => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList.length ? '.' + [...el.classList].join('.') : '');
  if (want) return want.map(i => [tag(els[i]), [null, '::before', '::after'].map(ps => text(els[i], ps))]);
  return els.map(el => [null, '::before', '::after'].map(ps => hash(text(el, ps))).join(','));
}

async function open(browser, css, url, pick, width, details) {
  const ctx = await browser.newContext({viewport: {width, height: 900}, reducedMotion: 'reduce'});
  const page = await ctx.newPage();
  await page.route('**/google-ads-lp.css*', r => r.fulfill({body: fs.readFileSync(css, 'utf8'), contentType: 'text/css'}));
  await page.goto(BASE + url, {waitUntil: 'load'});
  await page.addStyleTag({content: FREEZE});
  if (pick) await page.evaluate(id => document.getElementById('tab-' + id).click(), pick);
  await page.waitForTimeout(250);
  return {ctx, page, hashes: await page.evaluate(collect, [details, null, NAMES])};
}

(async () => {
  const browser = await chromium.launch({executablePath: EDGE});
  let bad = 0;
  const seen = new Set();
  for (const [url, picks] of PAGES) for (const pick of picks) for (const width of WIDTHS) for (const details of [false, true]) {
    const A = await open(browser, oldCss, url, pick, width, details);
    const B = await open(browser, newCss, url, pick, width, details);
    const where = `${url.replace(ROOT, '/')} ${pick} ${width}${details ? ' mở' : ''}`;
    if (A.hashes.length !== B.hashes.length) { console.log(`[${where}] số phần tử khác (${A.hashes.length} → ${B.hashes.length})`); bad++; }
    else {
      const idx = A.hashes.map((h, i) => h === B.hashes[i] ? -1 : i).filter(i => i >= 0).slice(0, 200);
      if (idx.length) {
        const a = await A.page.evaluate(collect, [false, idx, NAMES]);
        const b = await B.page.evaluate(collect, [false, idx, NAMES]);
        a.forEach(([tag, pa3], n) => {
          for (let k = 0; k < 3; k++) {
            if (pa3[k] === b[n][1][k]) continue;
            const map = s => new Map(s.split(';').map(d => [d.slice(0, d.indexOf(':')), d.slice(d.indexOf(':') + 1)]));
            const pa = map(pa3[k]), pb = map(b[n][1][k]);
            const props = [...new Set([...pa.keys(), ...pb.keys()])].filter(p => pa.get(p) !== pb.get(p));
            const line = `${tag.slice(0, 80)}${['', '::before', '::after'][k]} { ${props.map(p => `${p}: ${pa.get(p)} → ${pb.get(p)}`).join('; ').slice(0, 300)} }`;
            bad++;
            if (!seen.has(line)) { seen.add(line); console.log(`[${where}] ${line}`); }
          }
        });
      }
    }
    await A.ctx.close();
    await B.ctx.close();
  }
  await browser.close();
  console.log(bad ? `Khác nhau: ${bad} (${seen.size} dạng)` : 'Không có khác biệt nào.');
  if (bad) process.exitCode = 1;
})();
