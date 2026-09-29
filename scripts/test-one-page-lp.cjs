// Playwright checks for the five one-page service landing pages
// (ONE_PAGE_ADS_PLAN.md): Instagram Ads, YouTube Ads, Remarketing,
// Performance Marketing, Tối ưu chuyển đổi quảng cáo.
// Usage: node scripts/test-one-page-lp.cjs   (serve.mjs must be on 127.0.0.1:4173)
//
// Same frame as the three-page channels: shell, no sideways scroll at
// 320–1920 px, eight numbered chapters that follow the index, a picture or
// tool in every chapter, a platform source under every chapter except the
// form, every workbench button at 1440 and 390, mock text ≥ 11 px, tilt ≤ 4°,
// pictures cover their frame, no platform logos, funnel / FAQ / checklist /
// form work, and no console errors.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/';
const PAGES = [
  ['instagram-ads', 'Instagram Ads', '#edb1d8', 'Tài liệu Meta:', /facebook\.com/],
  ['youtube-ads', 'YouTube Ads', '#f4adad', 'Tài liệu Google:', /support\.google\.com/],
  ['remarketing', 'Remarketing', '#c9b8ec', 'Tài liệu nền tảng:', /support\.google\.com|facebook\.com/],
  ['performance-marketing', 'Performance Marketing', '#a2dfc5', 'Tài liệu nền tảng:', /support\.google\.com|facebook\.com/],
  ['toi-uu-chuyen-doi-quang-cao', 'Tối ưu chuyển đổi quảng cáo', '#eac897', 'Tài liệu tham khảo:', /support\.google\.com|web\.dev/]
];
const CHAPTERS = ['khi-nao', 'dinh-dang', 'chuan-bi', 'muc-tieu', 'do-luong', 'trien-khai', 'faq', 'lien-he'];
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];
const ROOT = path.resolve(__dirname, '..');

let failures = 0;
let passes = 0;
const ok = (name, pass, detail = '') => {
  if (!pass) failures++;
  else passes++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

async function open(browser, url, width = 1440) {
  const page = await browser.newPage({viewport: {width, height: 900}, reducedMotion: 'reduce'});
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, {waitUntil: 'networkidle'});
  return {page, errors};
}

/* ---------------- files --------------------------------------------------- */
function files() {
  const css = fs.readFileSync(path.join(ROOT, 'dist/one-page-lp.css'), 'utf8');
  ok('one-page-lp.css ≤ 25 KB', Buffer.byteLength(css) <= 25 * 1000, `${Buffer.byteLength(css)} bytes`);
  ok('one-page-lp.css has no !important', !/!important/.test(css));
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '');
  ok('one-page-lp.css is scoped to .op-lp', /^\s*body\.op-lp\{[^}]*\}\s*\.op-lp\{/.test(rules)
    && rules.split('@media').slice(1).every(m => /^[^{]*\{\s*\.op-lp[\s{]/.test(m)));

  const dir = path.join(ROOT, 'scripts/one-page-lp');
  const mods = fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort();
  ok('one-page modules', mods.join() === 'cro.mjs,instagram.mjs,mocks.mjs,performance.mjs,remarketing.mjs,render.mjs,youtube.mjs', mods.join());
  const src = mods.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  ok('modules import the Google Ads kit', /from '\.\.\/google-ads-lp\//.test(src));
  ok('modules do not import google-ads-page.mjs or the multichannel guide', !/google-ads-page\.mjs|multichannel-guide/.test(src));
  ok('every data module carries a check date', ['youtube', 'remarketing', 'performance', 'cro']
    .every(m => /export const CHECKED = '\d{4}-\d{2}-\d{2}'/.test(fs.readFileSync(path.join(dir, m + '.mjs'), 'utf8'))));

  const shared = fs.readFileSync(path.join(ROOT, 'scripts/google-ads-lp/shared.mjs'), 'utf8');
  ok('shared.mjs has CHANNELS rows for the five pages',
    ['instagram', 'youtube', 'remarketing', 'performance', 'cro'].every(k => new RegExp(`\\n  ${k}: \\{`).test(shared)));
  ok('shared.mjs has no per-channel if/else', !/(channel|ch)\s*===?\s*'[a-z]+'/.test(shared));
  const js = fs.readFileSync(path.join(ROOT, 'dist/google-ads-lp.js'), 'utf8');
  ok('google-ads-lp.js has an op-lp row before the others', /const CHANNELS = \[\s*\/\/[^\n]*\n\s*\{cls: 'op-lp'/.test(js));
  const build = fs.readFileSync(path.join(ROOT, 'scripts/build-service-pages.mjs'), 'utf8');
  ok('build: buildOnePage + --onepage-only', /async function buildOnePage\(/.test(build) && /--onepage-only/.test(build));
}

/* ---------------- shell + layout ----------------------------------------- */
async function shell(browser, [slug, name, accent]) {
  const {page, errors} = await open(browser, BASE + slug + '/');
  const info = await page.evaluate(() => ({
    body: document.body.className,
    accent: getComputedStyle(document.body).getPropertyValue('--accent').trim().toLowerCase(),
    css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.getAttribute('href')),
    js: [...document.scripts].map(s => s.getAttribute('src')).filter(Boolean),
    header: document.querySelectorAll('#header-navigation a').length,
    footer: Boolean(document.querySelector('footer.page-footer')),
    h1: document.querySelector('h1')?.textContent.trim(),
    hero: document.querySelector('.ga-hero').textContent.replace(/\s+/g, ' '),
    old: /multichannel|mc-hero|ga-sheet-panel/.test(document.documentElement.outerHTML)
  }));
  ok(`${name} body class ga-lp op-lp`, /\bga-lp\b/.test(info.body) && /\bop-lp\b/.test(info.body), info.body);
  ok(`${name} accent ${accent}`, info.accent === accent, info.accent);
  ok(`${name} loads google-ads-lp.css + one-page-lp.css`, info.css.some(h => /google-ads-lp\.css/.test(h)) && info.css.some(h => /one-page-lp\.css/.test(h)),
    info.css.join(' '));
  ok(`${name} reuses google-ads-lp.js`, info.js.some(s => /google-ads-lp\.js/.test(s)), info.js.join(' '));
  ok(`${name} real header and footer`, info.header > 0 && info.footer);
  ok(`${name} h1 is the service name`, info.h1 === name, info.h1);
  ok(`${name} hero shows the check date`, /Cập nhật theo tài liệu .+? ngày \d{2}\/\d{2}\/\d{4}/.test(info.hero));
  ok(`${name} old multichannel guide is gone`, !info.old);
  ok(`${name} shell loads without console errors`, errors.length === 0, errors.join(' | '));
  await page.close();
}

async function layout(browser, [slug, name]) {
  for (const width of WIDTHS) {
    const {page, errors} = await open(browser, BASE + slug + '/', width);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); }
      scrollTo(0, 0);
    });
    const x = await page.evaluate(() => { scrollTo(500, 0); const v = scrollX; scrollTo(0, 0); return v; });
    ok(`${name} @${width} no horizontal scroll`, x === 0, `scrollX=${x}`);
    ok(`${name} @${width} no console errors`, errors.length === 0, errors.join(' | '));
    await page.close();
  }
}

/* ---------------- chapter frame ------------------------------------------ */
const VISUAL = '.workbench, .stage, .v-funnel, .sc-road, .checklist, .sc-faq, form, .bp, .files, [data-mock], .how-io';

async function frame(browser, [slug, name, , label, host]) {
  const {page} = await open(browser, BASE + slug + '/');
  const r = await page.evaluate(({VISUAL, label, host}) => {
    const toc = [...document.querySelectorAll('.panel-toc a')].map(a => a.getAttribute('href').slice(1));
    const chaps = [...document.querySelectorAll('.chap')];
    return {
      toc, ids: chaps.map(c => c.id),
      nums: chaps.map((c, i) => Number(c.querySelector('.chap-head.has-num .chap-num')?.textContent) === i + 1),
      bare: chaps.filter(c => !c.querySelector(VISUAL)).map(c => c.id),
      cite: chaps.filter(c => {
        if (c.querySelector('form')) return false;
        const s = [...c.querySelectorAll('.sources')].find(x => x.textContent.includes(label));
        return !s || ![...s.querySelectorAll('a')].some(a => new RegExp(host).test(a.href));
      }).map(c => c.id)
    };
  }, {VISUAL, label, host: host.source});
  ok(`${name} mục lục đủ 8 chương theo thứ tự`, r.toc.join() === CHAPTERS.join() && r.ids.join() === CHAPTERS.join(), r.ids.join());
  ok(`${name} chương nào cũng có số lớn đúng thứ tự`, r.nums.every(Boolean));
  ok(`${name} chương nào cũng có hình / công cụ`, !r.bare.length, r.bare.join(', '));
  ok(`${name} chương nào cũng có dòng "${label}" dẫn tới nguồn`, !r.cite.length, r.cite.join(', '));
  await page.close();
}

/* ---------------- logos ---------------------------------------------------- */
async function logos(browser, [slug, name]) {
  const {page} = await open(browser, BASE + slug + '/');
  const r = await page.evaluate(() => {
    const brand = /instagram|facebook|meta|youtube|google|tik\s?tok|zalo|logo|wordmark/i;
    const bad = [];
    document.querySelectorAll('main img').forEach(i => {
      const s = (i.getAttribute('src') || '') + ' ' + (i.getAttribute('alt') || '');
      if (brand.test(s)) bad.push('img ' + s.trim());
    });
    document.querySelectorAll('main svg').forEach(s => {
      const t = [s.getAttribute('aria-label'), s.querySelector('title')?.textContent].filter(Boolean).join(' ');
      if (brand.test(t)) bad.push('svg ' + t);
    });
    const mocks = [...document.querySelectorAll('main [data-mock]')];
    const unlabelled = mocks.filter(m => !m.closest('.stage, .workbench, .bp, .files, [aria-hidden="true"]'));
    return {bad, mocks: mocks.length, unlabelled: unlabelled.length, brand: mocks.filter(m => /Nhà Thơm|nhathom/.test(m.textContent)).length};
  });
  ok(`${name} không logo / wordmark nền tảng`, !r.bad.length, r.bad.slice(0, 4).join(' | '));
  ok(`${name} ${r.mocks} mô phỏng đều nằm trong khung có nhãn`, r.unlabelled === 0, String(r.unlabelled));
  ok(`${name} mô phỏng dùng thương hiệu mẫu Nhà Thơm`, r.brand > 0, `${r.brand}/${r.mocks}`);
  await page.close();
}

/* ---------------- workbenches + mock rules -------------------------------- */
async function benches(browser, [slug, name], width) {
  const {page, errors} = await open(browser, BASE + slug + '/', width);
  const bad = [];
  const rules = {small: [], tilt: [], cover: []};
  let clicks = 0;
  const benchesL = page.locator('main .workbench');
  const n = await benchesL.count();
  for (let w = 0; w < n; w++) {
    const bench = benchesL.nth(w);
    const formats = await bench.locator('[data-format]').evaluateAll(bs => bs.map(b => b.dataset.format));
    for (const f of formats) {
      try { await bench.locator(`[data-format="${f}"]`).click({timeout: 5000}); } catch (e) { bad.push(`${f}: không bấm được`); continue; }
      clicks++;
      const s = await bench.evaluate((wb, f) => {
        const panes = [...wb.querySelectorAll('[data-format-pane]')];
        const pane = panes.find(p => p.dataset.formatPane === f);
        return {shown: Boolean(pane && !pane.hidden && pane.getBoundingClientRect().height > 0), others: panes.filter(p => p !== pane && !p.hidden).length};
      }, f);
      if (!s.shown || s.others) bad.push(`${f}: ${JSON.stringify(s)}`);
      const r = await bench.evaluate(wb => {
        const shown = e => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
        const out = {small: [], tilt: [], cover: []};
        const pane = [...wb.querySelectorAll('[data-format-pane]')].find(p => !p.hidden);
        pane.querySelectorAll('[data-mock] *').forEach(e => {
          if (!shown(e)) return;
          const own = [...e.childNodes].some(x => x.nodeType === 3 && x.textContent.trim());
          const fs = parseFloat(getComputedStyle(e).fontSize);
          if (own && fs < 11) out.small.push(`${e.className || e.tagName} ${fs}px "${e.textContent.trim().slice(0, 16)}"`);
          const t = getComputedStyle(e).transform;
          if (t && t !== 'none') {
            const v = t.match(/matrix(3d)?\(([^)]+)\)/)[2].split(',').map(Number);
            const deg = Math.abs(Math.atan2(v[1], v[0]) * 180 / Math.PI);
            if (deg > 4.01) out.tilt.push(`${e.className} ${deg.toFixed(1)}°`);
          }
        });
        pane.querySelectorAll('[data-mock] img').forEach(img => {
          if (shown(img) && getComputedStyle(img).objectFit !== 'cover') out.cover.push(img.getAttribute('src'));
        });
        return out;
      });
      for (const k of Object.keys(rules)) rules[k].push(...r[k]);
    }
  }
  const u = a => [...new Set(a)];
  ok(`${name} @${width} ${clicks} nút [data-format] mở đúng pane`, clicks > 0 && !bad.length, bad.slice(0, 4).join(' | '));
  ok(`${name} @${width} chữ trong mô phỏng ≥ 11px`, !rules.small.length, u(rules.small).slice(0, 4).join(' | '));
  ok(`${name} @${width} không phần tử nào nghiêng quá 4°`, !rules.tilt.length, u(rules.tilt).slice(0, 4).join(' | '));
  ok(`${name} @${width} ảnh trong mô phỏng object-fit: cover`, !rules.cover.length, u(rules.cover).slice(0, 4).join(' | '));
  ok(`${name} @${width} không lỗi console khi bấm`, errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- interactions -------------------------------------------- */
async function tabset(page, sel, label) {
  const tabs = page.locator(`${sel} [role="tab"]`);
  const n = await tabs.count();
  const bad = [];
  for (let i = 0; i < n; i++) {
    await tabs.nth(i).click();
    await page.waitForTimeout(40);
    const s = await tabs.nth(i).evaluate(t => {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      return {sel: t.getAttribute('aria-selected'), shown: Boolean(panel && !panel.hidden && panel.getBoundingClientRect().height > 0)};
    });
    if (s.sel !== 'true' || !s.shown) bad.push(`${i + 1}: ${JSON.stringify(s)}`);
  }
  ok(`${label}: ${n} tab mở đúng nội dung`, n > 0 && !bad.length, bad.slice(0, 3).join(' | '));
}

async function interact(browser, [slug, name]) {
  const {page, errors} = await open(browser, BASE + slug + '/');
  await tabset(page, '.v-funnel', `${name} phễu đo lường`);
  await tabset(page, '.sc-road', `${name} các bước triển khai`);
  await tabset(page, '.sc-faq', `${name} tab hỏi đáp`);

  const body = await page.evaluate(() => document.querySelector('main').textContent.replace(/\s+/g, ' '));
  ok(`${name} phễu ghi rõ số mẫu`, body.includes('Số mẫu, không phải kết quả dự kiến'));
  ok(`${name} có phần Đọc tiếp`, body.includes('Đọc tiếp'));

  const boxes = await page.$$('#trien-khai [data-checklist] input[type="checkbox"]');
  if (boxes.length) { await boxes[0].check(); await page.waitForTimeout(60); }
  const ring = await page.evaluate(() => document.querySelector('#trien-khai [data-ring-text]')?.textContent || '');
  ok(`${name} checklist có vòng tiến độ`, boxes.length >= 6 && /%$/.test(ring) && ring !== '0%', `${boxes.length} mục, ${ring}`);

  const counters = await page.$$eval('[data-counter] [data-limit]', fs => fs.map(f => f.id));
  for (const id of counters) {
    const limit = Number(await page.getAttribute('#' + id, 'data-limit'));
    await page.fill('#' + id, 'Nến thơm Nhà Thơm '.repeat(Math.ceil((limit + 5) / 18)));
    await page.waitForTimeout(40);
    const over = await page.evaluate(i => document.getElementById(i).closest('[data-counter]').hasAttribute('data-over'), id);
    ok(`${name} ô đếm ký tự ${limit} báo khi vượt`, over);
  }

  const action = await page.getAttribute('#gaBrief', 'action');
  ok(`${name} form giữ placeholder [FORM_ENDPOINT]`, action === '[FORM_ENDPOINT]', action);
  await page.fill('#f-company', 'Công ty thử nghiệm');
  await page.fill('#f-contact', 'Nguyễn A');
  await page.fill('#f-phone', '0900000000');
  await page.click('#gaBrief button[type="submit"]');
  await page.waitForTimeout(120);
  const form = await page.evaluate(() => ({url: location.pathname, status: document.querySelector('[data-brief-status]').textContent}));
  ok(`${name} form ở lại trang và báo chưa nối nơi nhận`, form.url.endsWith(`/${slug}/`) && /\[HOTLINE\]/.test(form.status), form.status);

  const more = await page.$$eval('.op-more .next a', as => as.map(a => a.getAttribute('href')));
  ok(`${name} có khối xem thêm sang kênh khác`, more.length === 3 && more.every(h => /^\/dich-vu\/quang-cao-da-kenh\/[a-z-]+\/$/.test(h)), more.join(' | '));
  ok(`${name} không lỗi console sau khi thao tác`, errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- run ------------------------------------------------------ */
(async () => {
  files();
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  try {
    for (const p of PAGES) {
      await shell(browser, p);
      await layout(browser, p);
      await frame(browser, p);
      await logos(browser, p);
      for (const w of [1440, 390]) await benches(browser, p, w);
      await interact(browser, p);
    }
  } finally {
    await browser.close();
  }
  console.log(failures ? `\n${passes} passed, ${failures} check(s) failed.` : `\nAll ${passes} checks passed.`);
  process.exit(failures ? 1 : 0);
})();
