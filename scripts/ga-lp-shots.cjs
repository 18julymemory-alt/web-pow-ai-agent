// Side-by-side review shots: the new Google Ads landing page next to the
// homepage, at desktop 1440 and mobile 390.
// Usage: node scripts/ga-lp-shots.cjs   (serve.mjs must be on 127.0.0.1:4173)
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');
const fs = require('node:fs/promises');

const OUT = path.resolve('screenshots');
const BASE = 'http://127.0.0.1:4173';
const GA = BASE + '/dich-vu/quang-cao-da-kenh/google-ads/';

const SIZES = [
  {name: '1440', viewport: {width: 1440, height: 900}, mobile: false},
  {name: '390', viewport: {width: 390, height: 844}, mobile: true}
];

async function shoot(browser, {url, size, file, scrollTo}) {
  const page = await browser.newPage({
    viewport: size.viewport,
    deviceScaleFactor: 1,
    isMobile: size.mobile,
    hasTouch: size.mobile
  });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await page.goto(url, {waitUntil: 'networkidle'});
  if (scrollTo) {
    await page.evaluate(sel => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({block: 'start'});
    }, scrollTo);
  }
  await page.waitForTimeout(1400);
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth);
  await page.screenshot({path: path.join(OUT, file)});
  await page.close();
  return {file, overflow, errors};
}

// about:blank cannot load file:// images, so the shots are inlined.
async function dataUrl(file) {
  const buf = await fs.readFile(path.join(OUT, file));
  return 'data:image/png;base64,' + buf.toString('base64');
}

async function pair(browser, left, right, label, file, size) {
  const w = size.viewport.width;
  const h = size.viewport.height;
  const [l, r] = await Promise.all([dataUrl(left), dataUrl(right)]);
  const page = await browser.newPage({viewport: {width: w * 2 + 72, height: h + 76}});
  await page.setContent(`<!doctype html><meta charset="utf-8">
    <style>
      body{margin:0;background:#0b0f16;font:13px/1 "Segoe UI",system-ui,sans-serif;color:#cfe3f2}
      .row{display:flex;gap:24px;padding:24px}
      figure{margin:0;flex:0 0 auto}
      figcaption{padding:0 0 10px;letter-spacing:2px;text-transform:uppercase;font-size:11px;color:#72eaff}
      img{display:block;width:${w}px;border:1px solid #1d2c3b}
    </style>
    <div class="row">
      <figure><figcaption>Trang chủ · ${label}</figcaption><img src="${l}"></figure>
      <figure><figcaption>Google Ads (mới) · ${label}</figcaption><img src="${r}"></figure>
    </div>`);
  await page.waitForTimeout(400);
  await page.screenshot({path: path.join(OUT, file), fullPage: true});
  await page.close();
}

(async () => {
  await fs.mkdir(OUT, {recursive: true});
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  const report = [];
  try {
    for (const size of SIZES) {
      report.push(await shoot(browser, {url: BASE + '/', size, file: `home-${size.name}.png`}));
      report.push(await shoot(browser, {url: GA, size, file: `ga-${size.name}.png`}));
      await pair(browser, `home-${size.name}.png`, `ga-${size.name}.png`,
        size.name === '1440' ? 'desktop 1440' : 'mobile 390',
        `compare-${size.name}.png`, size);
    }
    // A few more of the new page so the whole layout can be reviewed.
    for (const size of SIZES) {
      for (const [sel, tag] of [['.eco', 'orbit'], ['#campaigns', 'campaigns'], ['.workbench', 'workbench']]) {
        report.push(await shoot(browser, {url: GA, size, scrollTo: sel, file: `ga-${size.name}-${tag}.png`}));
      }
    }
  } finally {
    await browser.close();
  }
  for (const r of report) {
    console.log(`${r.file}  overflowX=${r.overflow}  errors=${r.errors.length}${r.errors.length ? '\n   ' + r.errors.join('\n   ') : ''}`);
  }
})();
