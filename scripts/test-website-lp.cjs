// Playwright checks for the ten Website & Landing Page service pages
// (WEBSITE_LP_PLAN.md), one landing page each on the one-page frame.
// Usage: node scripts/test-website-lp.cjs   (serve.mjs must be on 127.0.0.1:4173)
//
// Same frame as the three-page channels: shell, no sideways scroll at
// 320–1920 px, eight numbered chapters that follow the index, a picture or
// tool in every chapter, a platform source under every chapter except the
// form, every workbench button at 1440 and 390, mock text ≥ 11 px, tilt ≤ 4°,
// pictures cover their frame, no platform logos, funnel / FAQ / checklist /
// form work, breadcrumb to the group, links to sister pages, no console errors.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:4173/dich-vu/website-landing-page/';
const OFFICIAL = /web\.dev|w3\.org|developer\.mozilla\.org|wordpress\.org|developers\.google\.com|support\.google\.com|owasp\.org|online\.gov\.vn/;
const PAGES = [
  ['website-doanh-nghiep', 'Website doanh nghiệp', '#9fc8ff'],
  ['website-ban-hang', 'Website bán hàng', '#ffc59a'],
  ['landing-page', 'Landing Page', '#f3a9c9'],
  ['wordpress', 'WordPress', '#a9c4ec'],
  ['website-theo-yeu-cau', 'Website theo yêu cầu', '#b9a8f2'],
  ['ui-ux', 'UI/UX', '#e0b3ff'],
  ['cro-toi-uu-chuyen-doi', 'CRO – tối ưu chuyển đổi', '#f0d28a'],
  ['bao-tri-website', 'Bảo trì Website', '#9fe0c9'],
  ['toi-uu-toc-do', 'Tối ưu tốc độ', '#8fe3f0'],
  ['tich-hop-he-thong', 'Tích hợp hệ thống', '#b8e08f']
].map(p => [...p, 'Tài liệu tham khảo:', OFFICIAL]);
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
  const css = fs.readFileSync(path.join(ROOT, 'dist/website-lp.css'), 'utf8');
  ok('website-lp.css ≤ 25 KB', Buffer.byteLength(css) <= 25 * 1000, `${Buffer.byteLength(css)} bytes`);
  ok('website-lp.css has no !important', !/!important/.test(css));
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '');
  ok('website-lp.css is scoped to .ws-lp', /^\s*body\.ws-lp\{[^}]*\}\s*\.ws-lp\{/.test(rules)
    && rules.split('@media').slice(1).every(m => /^[^{]*\{\s*\.ws-lp[\s{]/.test(m)));
  ok('website-lp.css: no rotate, tilt at most 4°', !/rotate|skew/.test(rules));

  const dir = path.join(ROOT, 'scripts/website-lp');
  const mods = fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort();
  const DATA = ['ban-hang', 'bao-tri', 'cro', 'doanh-nghiep', 'landing-page', 'theo-yeu-cau', 'tich-hop', 'toc-do', 'ui-ux', 'wordpress'];
  ok('website modules', mods.join() === [...DATA, 'mocks', 'sources'].sort().map(m => m + '.mjs').join(), mods.join());
  const src = mods.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  ok('modules reuse the Google Ads kit', /from '\.\.\/google-ads-lp\//.test(src));
  ok('modules do not import google-ads-page.mjs or the old service guide', !/google-ads-page\.mjs|service-guide/.test(src));
  ok('sources carry a check date', /export const CHECKED = '\d{4}-\d{2}-\d{2}'/.test(fs.readFileSync(path.join(dir, 'sources.mjs'), 'utf8')));
  ok('every data module re-exports the check date', DATA.every(m => /export \{CHECKED\}/.test(fs.readFileSync(path.join(dir, m + '.mjs'), 'utf8'))));
  const hosts = [...fs.readFileSync(path.join(dir, 'sources.mjs'), 'utf8').matchAll(/'(https:\/\/[^']+)'/g)].map(m => new URL(m[1]).host);
  ok('every source is official documentation', hosts.length > 5 && hosts.every(h => OFFICIAL.test(h)), [...new Set(hosts)].join(' '));

  const shared = fs.readFileSync(path.join(ROOT, 'scripts/google-ads-lp/shared.mjs'), 'utf8');
  ok('shared.mjs has one CHANNELS row per website page', (shared.match(/\n  web[A-Z]\w+: web\('/g) || []).length === 10);
  ok('shared.mjs has no per-channel if/else', !/(channel|ch)\s*===?\s*'[a-z]+'/.test(shared));
  const build = fs.readFileSync(path.join(ROOT, 'scripts/build-service-pages.mjs'), 'utf8');
  ok('build: WEB_PAGE + --website-only', /const WEB_PAGE=/.test(build) && /--website-only/.test(build));
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
    old: /multichannel|mc-hero|ga-sheet-panel|service-row|scope-grid/.test(document.querySelector('main').outerHTML),
    crumb: [...document.querySelectorAll('.ga-hero .crumbs a')].map(a => a.getAttribute('href') + ' ' + a.textContent).join(' | ')
  }));
  ok(`${name} body class ga-lp op-lp ws-lp`, /\bga-lp\b/.test(info.body) && /\bop-lp\b/.test(info.body) && /\bws-lp\b/.test(info.body), info.body);
  ok(`${name} accent ${accent}`, info.accent === accent, info.accent);
  ok(`${name} loads google-ads-lp.css + one-page-lp.css + website-lp.css`, info.css.some(h => /google-ads-lp\.css/.test(h)) && info.css.some(h => /one-page-lp\.css/.test(h)) && info.css.some(h => /website-lp\.css/.test(h)),
    info.css.join(' '));
  ok(`${name} reuses google-ads-lp.js`, info.js.some(s => /google-ads-lp\.js/.test(s)), info.js.join(' '));
  ok(`${name} real header and footer`, info.header > 0 && info.footer);
  ok(`${name} h1 is the service name`, info.h1 === name, info.h1);
  ok(`${name} hero shows the check date`, /Cập nhật theo tài liệu .+? ngày \d{2}\/\d{2}\/\d{4}/.test(info.hero));
  ok(`${name} old service guide is gone`, !info.old);
  ok(`${name} breadcrumb goes through Website & Landing Page`, info.crumb.includes('/dich-vu/website-landing-page/ Website & Landing Page'), info.crumb);
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
    const brand = /instagram|facebook|meta|youtube|google|tik\s?tok|zalo|wordpress|shopify|woocommerce|logo|wordmark/i;
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
  const FACTS = {'toi-uu-toc-do': ['LCP ≤ 2,5 s', 'INP ≤ 200 ms', 'CLS ≤ 0,1', 'phân vị 75'], 'website-ban-hang': ['online.gov.vn'],
    'wordpress': ['Biên tập viên', 'Tác giả', 'Cộng tác viên']};
  for (const f of FACTS[slug] || []) ok(`${name} nêu "${f}" theo nguồn`, body.includes(f));

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
  ok(`${name} có khối xem thêm sang trang cùng nhóm`, more.length === 3 && more.every(h => /^\/dich-vu\/website-landing-page\/[a-z-]+\/$/.test(h) && !h.endsWith(`/${slug}/`)), more.join(' | '));
  const bad = [];
  for (const h of more) { const r = await page.request.get('http://127.0.0.1:4173' + h); if (r.status() !== 200) bad.push(h + ' ' + r.status()); }
  ok(`${name} liên kết xem thêm mở được`, !bad.length, bad.join(' | '));
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
