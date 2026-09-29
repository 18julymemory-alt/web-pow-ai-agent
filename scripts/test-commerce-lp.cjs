// Playwright checks for the eight Thương mại điện tử service pages
// (COMMERCE_LP_PLAN.md), one landing page each on the one-page frame, and
// for the removal of Lazada and Livestream bán hàng from the menu.
// Usage: node scripts/test-commerce-lp.cjs   (serve.mjs must be on 127.0.0.1:4173)
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

const BASE = 'http://127.0.0.1:4173/dich-vu/thuong-mai-dien-tu/';
const OFFICIAL = /banhang\.shopee\.vn|seller-vn\.tiktok\.com|online\.gov\.vn|developers\.google\.com|support\.google\.com|web\.dev/;
const PAGES = [
  ['shopee', 'Shopee', '#ff9f80'],
  ['tiktok-shop', 'TikTok Shop', '#f5a3c0'],
  ['website-ban-hang', 'Website bán hàng', '#ffc59a'],
  ['thiet-lap-gian-hang', 'Thiết lập gian hàng', '#9fd8ff'],
  ['toi-uu-san-pham', 'Tối ưu sản phẩm', '#b8e08f'],
  ['quang-cao-san', 'Quảng cáo sàn', '#ffd08a'],
  ['van-hanh-gian-hang', 'Vận hành gian hàng', '#9fe0c9'],
  ['content-thuong-mai-dien-tu', 'Content thương mại điện tử', '#d4b3ff']
].map(p => [...p, 'Tài liệu tham khảo:', OFFICIAL]);
const CHAPTERS = ['khi-nao', 'cot-loi', 'dinh-dang', 'chuan-bi', 'muc-tieu', 'do-luong', 'trien-khai', 'faq', 'lien-he'];
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
  const css = fs.readFileSync(path.join(ROOT, 'dist/commerce-lp.css'), 'utf8');
  ok('commerce-lp.css ≤ 25 KB', Buffer.byteLength(css) <= 25 * 1000, `${Buffer.byteLength(css)} bytes`);
  ok('commerce-lp.css has no !important', !/!important/.test(css));
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '');
  ok('commerce-lp.css is scoped to .cm-lp', /^\s*body\.cm-lp\{[^}]*\}\s*\.cm-lp\{/.test(rules) && !/@media/.test(rules));
  ok('commerce-lp.css: no rotate or skew', !/rotate|skew/.test(rules));

  const dir = path.join(ROOT, 'scripts/commerce-lp');
  const mods = fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort();
  const DATA = ['content', 'quang-cao-san', 'shopee', 'thiet-lap', 'tiktok-shop', 'toi-uu-san-pham', 'van-hanh', 'website-ban-hang'];
  ok('commerce modules', mods.join() === [...DATA, 'mocks', 'shop', 'sources'].sort().map(m => m + '.mjs').join(), mods.join());
  const src = mods.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  ok('modules reuse the website and training mocks', /from '\.\.\/website-lp\/mocks\.mjs'/.test(src) && /from '\.\.\/training-lp\/mocks\.mjs'/.test(src));
  ok('no platform logo or brand colour class in the mocks', !/logo|wordmark|#ee4d2d|#fe2c55/i.test(fs.readFileSync(path.join(dir, 'mocks.mjs'), 'utf8').replace(/^\s*\/\/.*$/gm, '')));
  ok('every data module re-exports the check date', DATA.every(m => /export \{CHECKED\}/.test(fs.readFileSync(path.join(dir, m + '.mjs'), 'utf8'))));
  const hosts = [...fs.readFileSync(path.join(dir, 'sources.mjs'), 'utf8').matchAll(/'(https:\/\/[^']+)'/g)].map(m => new URL(m[1]).host);
  ok('every source is official documentation', hosts.length > 5 && hosts.every(h => OFFICIAL.test(h)), [...new Set(hosts)].join(' '));

  const shared = fs.readFileSync(path.join(ROOT, 'scripts/google-ads-lp/shared.mjs'), 'utf8');
  ok('shared.mjs has one CHANNELS row per commerce page', (shared.match(/\n  ecom[A-Z]\w+: ecom\('/g) || []).length === 8);
  const build = fs.readFileSync(path.join(ROOT, 'scripts/build-service-pages.mjs'), 'utf8');
  ok('build: ECOM_PAGE + --commerce-only', /const ECOM_PAGE=/.test(build) && /--commerce-only/.test(build));

  // Lazada and Livestream bán hàng are gone from the menu and every positional array.
  const nav = fs.readFileSync(path.join(ROOT, 'dist/navigation-data.js'), 'utf8');
  ok('menu: Lazada và Livestream bán hàng đã bỏ', !/lazada|livestream/i.test(nav));
  const content = fs.readFileSync(path.join(ROOT, 'scripts/service-content.mjs'), 'utf8');
  const audit = fs.readFileSync(path.join(ROOT, 'scripts/service-specific-audit.mjs'), 'utf8');
  const briefs = fs.readFileSync(path.join(ROOT, 'scripts/service-image-briefs.mjs'), 'utf8');
  ok('nội dung theo vị trí không còn Lazada, Livestream', ![content, audit, briefs].some(t => /Lazada|Livestream|phiên live/i.test(t)));
  ok('trang Lazada, Livestream đã xóa khỏi dist', !fs.existsSync(path.join(ROOT, 'dist/dich-vu/thuong-mai-dien-tu/lazada'))
    && !fs.existsSync(path.join(ROOT, 'dist/dich-vu/thuong-mai-dien-tu/livestream-ban-hang')));
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
  ok(`${name} body class ga-lp op-lp ws-lp tr-lp cm-lp`, ['ga-lp', 'op-lp', 'ws-lp', 'tr-lp', 'cm-lp'].every(c => info.body.split(' ').includes(c)), info.body);
  ok(`${name} accent ${accent}`, info.accent === accent, info.accent);
  ok(`${name} loads the shared stylesheets + commerce-lp.css`, ['google-ads-lp', 'one-page-lp', 'website-lp', 'training-lp', 'commerce-lp'].every(c => info.css.some(h => h.includes('/' + c + '.css'))),
    info.css.join(' '));
  ok(`${name} reuses google-ads-lp.js`, info.js.some(s => /google-ads-lp\.js/.test(s)), info.js.join(' '));
  ok(`${name} real header and footer`, info.header > 0 && info.footer);
  ok(`${name} h1 is the service name`, info.h1 === name, info.h1);
  ok(`${name} hero shows the check date`, /Cập nhật theo tài liệu .+? ngày \d{2}\/\d{2}\/\d{4}/.test(info.hero));
  ok(`${name} old service guide is gone`, !info.old);
  const hero = await page.evaluate(() => ({
    badge: document.querySelector('.tp-scene .tp-badge')?.textContent || '',
    calls: document.querySelectorAll('.tp-scene .tp-call').length,
    screen: document.querySelectorAll('.tp-scene .tp-main [data-mock]').length,
    eyebrow: document.querySelector('.ga-hero .kicker')?.textContent || '',
    intro: document.querySelector('.tp-intro h2')?.textContent || '',
    facts: document.querySelectorAll('.tp-intro dl > div').length,
    keys: document.querySelectorAll('#cot-loi .tp-key').length,
    lists: document.querySelectorAll('#cot-loi .op-fit li').length
  }));
  ok(`${name} hero có hình riêng của chủ đề, 3 chú thích và nhãn nhóm`, hero.screen > 0 && hero.calls === 3 && hero.badge.includes('Thương mại điện tử'), JSON.stringify(hero));
  ok(`${name} dòng nhỏ trên tiêu đề nói rõ thuộc nhóm nào`, hero.eyebrow.toUpperCase().includes('Thương mại điện tử'.toUpperCase()), hero.eyebrow);
  ok(`${name} có khung "là gì / học gì" với 3 ý`, /\?$/.test(hero.intro.trim()) && hero.facts === 3, hero.intro);
  ok(`${name} chương cốt lõi có 6 điểm và danh sách bàn giao / không hứa`, hero.keys === 6 && hero.lists >= 8, `${hero.keys} thẻ, ${hero.lists} dòng`);
  ok(`${name} breadcrumb goes through Thương mại điện tử`, info.crumb.includes('/dich-vu/thuong-mai-dien-tu/ Thương mại điện tử'), info.crumb);
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
const VISUAL = '.tp-keys, .workbench, .stage, .v-funnel, .sc-road, .checklist, .sc-faq, form, .bp, .files, [data-mock], .how-io';

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
  ok(`${name} mục lục đủ 9 chương theo thứ tự`, r.toc.join() === CHAPTERS.join() && r.ids.join() === CHAPTERS.join(), r.ids.join());
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
  const FACTS = {'website-ban-hang': ['online.gov.vn'], 'quang-cao-san': ['Quảng cáo Tìm kiếm'], 'shopee': ['Kênh Người Bán']};
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
  ok(`${name} có khối xem thêm sang trang cùng nhóm`, more.length === 3 && more.every(h => /^\/dich-vu\/thuong-mai-dien-tu\/[a-z0-9-]+\/$/.test(h) && !h.endsWith(`/${slug}/`)), more.join(' | '));
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
