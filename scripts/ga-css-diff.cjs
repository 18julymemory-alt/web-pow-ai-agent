#!/usr/bin/env node
// Screenshot diff for CSS clean-up: shoot the three Google Ads pages (every
// campaign panel on page 01) at 1440 and 390, then compare two runs pixel by
// pixel.
//
//   node scripts/ga-css-diff.cjs shoot before
//   node scripts/ga-css-diff.cjs shoot after
//   node scripts/ga-css-diff.cjs compare before after   → % changed per shot
//
// Needs `node serve.mjs` on 127.0.0.1:4173. Output: .sites-runtime/css-diff/.
const fs = require('fs');
const path = require('path');
const {chromium} = require(process.env.PLAYWRIGHT_PATH || 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const BASE = process.env.BASE_URL || 'http://127.0.0.1:4173';
const EDGE = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const OUT = path.resolve(__dirname, '..', '.sites-runtime', 'css-diff');
const ROOT = '/dich-vu/quang-cao-da-kenh/google-ads/';
const PAGES = [['p1', ROOT], ['p2', ROOT + 'chon-cach-chay/'], ['p3', ROOT + 'chi-phi-hieu-qua/']];
const PICKS = ['search', 'pmax', 'shopping', 'demand', 'video', 'app'];
const WIDTHS = [1440, 390];
const LIMIT = Number(process.env.DIFF_LIMIT || 1);

// Freeze everything that moves so two runs of the same CSS give the same pixels.
const FREEZE = '*,*:before,*:after{animation:none!important;transition:none!important;caret-color:transparent!important}'
  + 'canvas{visibility:hidden!important}';

async function settle(page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
    const step = innerHeight * 0.7;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
    await Promise.all([...document.images].map(img => img.complete ? 0 : new Promise(r => { img.onload = img.onerror = r; })));
    scrollTo(0, 0);
  });
  await page.addStyleTag({content: FREEZE});
  await page.waitForTimeout(300);
}

async function shoot(tag) {
  const dir = path.join(OUT, tag);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.mkdirSync(dir, {recursive: true});
  const browser = await chromium.launch({executablePath: EDGE});
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({viewport: {width: w, height: 900}, reducedMotion: 'reduce'});
    for (const [name, url] of PAGES) {
      const page = await ctx.newPage();
      await page.goto(BASE + url, {waitUntil: 'load'});
      const picks = name === 'p1' ? PICKS : [''];
      for (const pick of picks) {
        if (pick) {
          await page.evaluate(id => document.getElementById('tab-' + id).click(), pick);
          await page.waitForTimeout(200);
        }
        await settle(page);
        const file = path.join(dir, `${name}${pick ? '-' + pick : ''}-${w}.png`);
        await page.screenshot({path: file, fullPage: true});
        console.log(path.relative(OUT, file));
      }
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
}

async function compare(a, b) {
  const files = fs.readdirSync(path.join(OUT, a)).filter(f => f.endsWith('.png'));
  const browser = await chromium.launch({executablePath: EDGE});
  const page = await browser.newPage();
  // Same-origin URLs so the canvas can read the pixels back.
  await page.route('http://diff.local/**', route => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname.slice(1));
    route.fulfill({path: path.join(OUT, rel), contentType: rel.endsWith('.png') ? 'image/png' : 'text/html'});
  });
  await page.route('http://diff.local/', route => route.fulfill({body: '<!doctype html>', contentType: 'text/html'}));
  await page.goto('http://diff.local/');
  let worst = 0;
  const rows = [];
  for (const f of files) {
    const pa = path.join(OUT, a, f), pb = path.join(OUT, b, f);
    if (!fs.existsSync(pb)) { rows.push([f, 'thiếu']); worst = 100; continue; }
    const res = await page.evaluate(async ([ua, ub]) => {
      const load = src => new Promise((r, j) => { const i = new Image(); i.onload = () => r(i); i.onerror = j; i.src = src; });
      const [ia, ib] = await Promise.all([load(ua), load(ub)]);
      const W = Math.max(ia.width, ib.width), H = Math.max(ia.height, ib.height);
      const px = img => {
        const c = new OffscreenCanvas(W, H), x = c.getContext('2d');
        x.fillStyle = '#f0f'; x.fillRect(0, 0, W, H); x.drawImage(img, 0, 0);
        return x.getImageData(0, 0, W, H).data;
      };
      const da = px(ia), db = px(ib);
      let diff = 0;
      for (let k = 0; k < da.length; k += 4) {
        if (Math.abs(da[k] - db[k]) + Math.abs(da[k + 1] - db[k + 1]) + Math.abs(da[k + 2] - db[k + 2]) > 24) diff++;
      }
      return {diff, total: W * H, size: [ia.width, ia.height, ib.width, ib.height]};
    }, [`http://diff.local/${a}/${f}`, `http://diff.local/${b}/${f}`]);
    const pct = res.diff / res.total * 100;
    worst = Math.max(worst, pct);
    rows.push([f, `${pct.toFixed(3)}%`, `${res.size[0]}×${res.size[1]} → ${res.size[2]}×${res.size[3]}`]);
  }
  await browser.close();
  for (const r of rows) console.log(r.join('  '));
  console.log(`Lớn nhất: ${worst.toFixed(3)}% (ngưỡng ${LIMIT}%)`);
  if (worst > LIMIT) process.exitCode = 1;
}

const [cmd, a, b] = process.argv.slice(2);
(cmd === 'shoot' ? shoot(a || 'before') : compare(a || 'before', b || 'after')).catch(e => { console.error(e); process.exit(1); });
