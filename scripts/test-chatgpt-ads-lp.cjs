// Playwright checks for the three ChatGPT Ads landing pages.
// Usage: node scripts/test-chatgpt-ads-lp.cjs   (serve.mjs must be on 127.0.0.1:4173)
//
// Same frame as the Google, Facebook, TikTok and Zalo trios: shell, no
// sideways scroll at 320–1920 px, chapter frame, every workbench button at
// 1440 and 390, the page 01 tools, the page 02 rules, the page 03 visual kit
// and the legacy anchors. On top: no OpenAI logo, no ChatGPT wordmark and no
// partner names in the simulations, ad pictures are square, mock text ≥ 11
// px, tilt ≤ 4°, pictures cover their frame, every chapter cites an OpenAI
// page, the tax rate stays null, trial features are labelled, and the menu
// lists ChatGPT Ads right after Zalo Ads.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:4173';
const P1 = BASE + '/dich-vu/quang-cao-da-kenh/chatgpt-ads/';
const P2 = P1 + 'chon-cach-chay/';
const P3 = P1 + 'chi-phi-hieu-qua/';
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];
const TYPES = {
  card: '#85e1c1', pair: '#88e4ff', product: '#c0a2ff',
  carousel: '#ff9bc1', conv: '#ffbd80', agent: '#e0cd9b'
};
const ROOT = path.resolve(__dirname, '..');

let failures = 0;
let passes = 0;
const ok = (name, pass, detail = '') => {
  if (!pass) failures++;
  else passes++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

function watch(page) {
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => {
    if (m.type() === 'error') errors.push(m.text());
  });
  return errors;
}

async function open(browser, url, width = 1440) {
  const page = await browser.newPage({viewport: {width, height: 900}, reducedMotion: 'reduce'});
  const errors = watch(page);
  await page.goto(url, {waitUntil: 'networkidle'});
  return {page, errors};
}

/* ---------------- files: old code gone, new CSS within budget ----------- */
function files() {
  const css = fs.readFileSync(path.join(ROOT, 'dist/chatgpt-ads-lp.css'), 'utf8');
  ok('chatgpt-ads-lp.css ≤ 25 KB', Buffer.byteLength(css) <= 25 * 1000, `${Buffer.byteLength(css)} bytes`);
  ok('chatgpt-ads-lp.css has no !important', !/!important/.test(css));
  const rules = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@keyframes[^{]*\{(?:[^{}]*\{[^}]*\})*[^}]*\}/g, '');
  ok('chatgpt-ads-lp.css is scoped to .cg-lp', /^\s*body\.cg-lp\{[^}]*\}\s*\.cg-lp\{/.test(rules)
    && rules.split('@media').slice(1).every(m => /^[^{]*\{\s*\.cg-lp[\s{]/.test(m)));

  const dir = path.join(ROOT, 'scripts/chatgpt-ads-lp');
  const mods = fs.readdirSync(dir).filter(f => f.endsWith('.mjs')).sort();
  ok('five ChatGPT modules', mods.join() === 'data.mjs,mocks.mjs,page-budget.mjs,page-formats.mjs,page-goals.mjs', mods.join());
  const src = mods.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
  ok('modules import the Google Ads kit', /from '\.\.\/google-ads-lp\//.test(src));
  ok('modules do not import google-ads-page.mjs', !/google-ads-page\.mjs/.test(src));
  const data = fs.readFileSync(path.join(dir, 'data.mjs'), 'utf8');
  ok('sources carry a check date', /export const CHECKED = '\d{4}-\d{2}-\d{2}'/.test(data));
  ok('tax rate stays null', /export const TAX_RATE = null;/.test(data));
  const urls = [...data.matchAll(/(?:H|D|O)\('([^']*)'\)/g)].length;
  const foreign = [...data.matchAll(/https?:\/\/([^/'"]+)/g)].map(m => m[1])
    .filter(h => !/^(openai\.com|help\.openai\.com|developers\.openai\.com)$/.test(h));
  ok('every source is an OpenAI page', urls > 20 && foreign.length === 0, `${urls} nguồn; ngoài OpenAI: ${foreign.join(', ')}`);

  const shared = fs.readFileSync(path.join(ROOT, 'scripts/google-ads-lp/shared.mjs'), 'utf8');
  ok('shared.mjs has a CHANNELS row for chatgpt',
    /export const CHANNELS = \{/.test(shared) && ['google', 'facebook', 'tiktok', 'zalo', 'chatgpt'].every(k => new RegExp(`\\n  ${k}: \\{`).test(shared)));
  ok('shared.mjs has no per-channel if/else', !/(channel|ch)\s*===?\s*'(google|facebook|tiktok|zalo|chatgpt)'/.test(shared)
    && !/'(google|facebook|tiktok|zalo|chatgpt)'\s*===?\s*(channel|ch)\b/.test(shared));
  const js = fs.readFileSync(path.join(ROOT, 'dist/google-ads-lp.js'), 'utf8');
  ok('google-ads-lp.js has a cg-lp channel row', /\{cls: 'cg-lp', urls: sheetUrls\('\/dich-vu\/quang-cao-da-kenh\/chatgpt-ads\/'\), resolve: resolveCgHash\}/.test(js));

  // The menu data and every array indexed like services[0].children.
  const nav = fs.readFileSync(path.join(ROOT, 'dist/navigation-data.js'), 'utf8');
  const titles = [...nav.slice(0, nav.indexOf('"slug": "thiet-ke-web') > 0 ? nav.indexOf('"slug": "thiet-ke-web') : nav.length)
    .matchAll(/"title": "([^"]+)"/g)].map(m => m[1]);
  const zi = titles.indexOf('Zalo Ads');
  ok('navigation-data: ChatGPT Ads right after Zalo Ads', zi > 0 && titles[zi + 1] === 'ChatGPT Ads', titles.join(' / '));
  ok('navigation-data: ChatGPT Ads links to its page', /"title": "ChatGPT Ads",\s*"slug": "chatgpt-ads",\s*"href": "\/dich-vu\/quang-cao-da-kenh\/chatgpt-ads\/"/.test(nav));
  const build = fs.readFileSync(path.join(ROOT, 'scripts/build-service-pages.mjs'), 'utf8');
  ok('build: buildChatGPTAds + --chatgpt-only + skipped by --multichannel-only',
    /async function buildChatGPTAds\(\)/.test(build) && /--chatgpt-only/.test(build) && /'zalo-ads','chatgpt-ads'\]/.test(build));
}

/* ---------------- (f) layout: no horizontal scroll, no console errors --- */
async function layout(browser, url, label) {
  for (const width of WIDTHS) {
    const {page, errors} = await open(browser, url, width);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        scrollTo(0, y);
        await new Promise(r => setTimeout(r, 25));
      }
      scrollTo(0, 0);
    });
    const scroll = await page.evaluate(() => {
      scrollTo(500, 0);
      const x = window.scrollX;
      scrollTo(0, 0);
      return {x, over: document.documentElement.scrollWidth - document.documentElement.clientWidth};
    });
    ok(`${label} @${width} (f) no horizontal scroll`, scroll.x === 0,
      `scrollX=${scroll.x}px, content bleed=${scroll.over}px`);
    ok(`${label} @${width} no console errors`, errors.length === 0, errors.join(' | '));
    await page.close();
  }
}

/* ---------------- shell: real header/footer, no Three.js ---------------- */
async function shell(browser, url, label, current) {
  const {page, errors} = await open(browser, url);
  const info = await page.evaluate(() => ({
    body: document.body.className,
    accent: getComputedStyle(document.body).getPropertyValue('--accent').trim().toLowerCase(),
    css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.getAttribute('href')),
    js: [...document.scripts].map(s => s.getAttribute('src')).filter(Boolean),
    header: Boolean(document.querySelector('.pow-header #header-navigation')),
    navLinks: document.querySelectorAll('#header-navigation a').length,
    footer: Boolean(document.querySelector('footer.page-footer')),
    three: Array.from(document.scripts).some(s => /three/i.test(s.src || s.textContent)),
    canvas: document.querySelectorAll('canvas').length,
    steps: [...document.querySelectorAll('.steps-bar a')].map(a => a.getAttribute('href')),
    current: document.querySelector('.steps-bar a[aria-current="page"]')?.textContent.trim() || ''
  }));
  ok(`${label} body class ga-lp cg-lp`, /\bga-lp\b/.test(info.body) && /\bcg-lp\b/.test(info.body), info.body);
  ok(`${label} accent #85e1c1`, info.accent === '#85e1c1', info.accent);
  ok(`${label} loads google-ads-lp.css + chatgpt-ads-lp.css only`,
    info.css.some(h => /google-ads-lp\.css/.test(h)) && info.css.some(h => /chatgpt-ads-lp\.css/.test(h))
    && !info.css.some(h => /multichannel|service-workspace|ads-catalog|service-references/.test(h)), info.css.join(' '));
  ok(`${label} reuses google-ads-lp.js, no ChatGPT / multichannel script`,
    info.js.some(s => /google-ads-lp\.js/.test(s)) && !info.js.some(s => /chatgpt|multichannel/i.test(s)), info.js.join(' '));
  ok(`${label} real header hydrated`, info.header && info.navLinks > 0, `${info.navLinks} links`);
  ok(`${label} footer present`, info.footer);
  ok(`${label} no Three.js / no canvas`, !info.three && info.canvas === 0);
  const old = await page.evaluate(() => ({
    text: /multichannel/i.test(document.documentElement.outerHTML),
    cls: [...new Set([...document.querySelectorAll('[class]')].flatMap(e => [...e.classList])
      .filter(c => /^(mc|mp|sv|sr)-|^(sheet-visual|ga-sheet-panel|service-reference-panel|page-kicker)$/.test(c)))]
  }));
  ok(`${label} no "multichannel" string in the page`, !old.text);
  ok(`${label} no classes from the multichannel guide`, old.cls.length === 0, old.cls.slice(0, 8).join(' '));
  ok(`${label} three-step bar points at the ChatGPT pages`,
    info.steps.length === 3 && info.steps.every(h => h.startsWith('/dich-vu/quang-cao-da-kenh/chatgpt-ads/')), info.steps.join(' '));
  const hero = await page.evaluate(() => document.querySelector('.ga-hero').textContent.replace(/\s+/g, ' '));
  ok(`${label} hero shows the OpenAI check date`, /Cập nhật theo tài liệu OpenAI ngày \d{2}\/\d{2}\/\d{4}/.test(hero));
  // The services menu: Dịch vụ → Quảng cáo đa kênh lists the channel pages.
  await page.click('.services-trigger');
  await page.click('.category-choice[data-group="0"]');
  await page.waitForTimeout(60);
  const menu = await page.evaluate(() => {
    const links = [...document.querySelectorAll('#category-detail .category-services a')];
    const name = a => a.querySelector('span').textContent.trim();
    const zi = links.findIndex(a => name(a) === 'Zalo Ads');
    const next = links[zi + 1];
    return {zi, text: next ? name(next) : '', href: next ? next.getAttribute('href') : ''};
  });
  ok(`${label} menu: ChatGPT Ads right after Zalo Ads`, menu.zi >= 0 && menu.text === 'ChatGPT Ads'
    && menu.href === '/dich-vu/quang-cao-da-kenh/chatgpt-ads/', JSON.stringify(menu));
  ok(`${label} step bar marks "${current}"`, info.current.includes(current), info.current);
  ok(`${label} shell loads without console errors`, errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- chapter frame -----------------------------------------
   (a) every .panel-toc lists the chapters of its own scope in order; (b) every
   .chap opens with a numbered head following the table of contents; (c) every
   chapter shows something to look at or use; every chapter except the contact
   form cites OpenAI ("Tài liệu OpenAI:"). */
const VISUAL = '.workbench, .stage, .v-pipeline, .v-funnel, .sc-road, .checklist, .sc-faq, form, .bp, .meas, .path-cards, .diag-list, [data-mock]';

async function frame(browser, url, label, tocs) {
  const {page} = await open(browser, url);
  const r = await page.evaluate(VISUAL => {
    const out = {tocs: [], heads: [], bare: [], order: [], cite: []};
    document.querySelectorAll('.panel-toc').forEach(toc => {
      const scope = toc.closest('[data-panel]') || document;
      const links = [...toc.querySelectorAll('a')].map(a => a.getAttribute('href'));
      const chaps = [...scope.querySelectorAll('.chap')];
      out.tocs.push({name: toc.getAttribute('aria-label'), ok: links.join() === chaps.map(c => '#' + c.id).join(), links: links.join(' ')});
      chaps.forEach((c, i) => {
        const num = c.querySelector('.chap-head.has-num .chap-num');
        if (!num || Number(num.textContent) !== i + 1) out.order.push(c.id + '=' + (num ? num.textContent : '?'));
      });
    });
    document.querySelectorAll('.chap').forEach(c => {
      const head = [...c.querySelectorAll('.chap-head.has-num')].some(h => h.closest('.chap') === c);
      if (!head) out.heads.push(c.id);
      if (!c.querySelector(VISUAL) && !c.querySelector('.recap')) out.bare.push(c.id);
      const src = [...c.querySelectorAll('.sources')].find(s => /Tài liệu OpenAI:/.test(s.textContent));
      const links = src ? [...src.querySelectorAll('a')].filter(a => /^https:\/\/(openai\.com|help\.openai\.com|developers\.openai\.com)\//.test(a.href)) : [];
      if (!c.querySelector('form') && (!src || !links.length)) out.cite.push(c.id);
    });
    out.count = document.querySelectorAll('.chap').length;
    return out;
  }, VISUAL);
  ok(`${label} (a) ${tocs} mục lục chương`, r.tocs.length === tocs, String(r.tocs.length));
  for (const t of r.tocs) ok(`${label} (a) ${t.name}: link trỏ đúng id chương`, t.ok, t.links);
  ok(`${label} (b) ${r.count} chương đều có chap-head.has-num`, r.heads.length === 0, r.heads.join(', '));
  ok(`${label} (b) số chương theo đúng thứ tự mục lục`, r.order.length === 0, r.order.join(', '));
  ok(`${label} (c) chương nào cũng có mô phỏng / công cụ`, r.bare.length === 0, r.bare.join(', '));
  ok(`${label} chương nào cũng có dòng "Tài liệu OpenAI:" dẫn tới trang OpenAI`, r.cite.length === 0, r.cite.join(', '));
  await page.close();
}

/* ---------------- no platform logos, labelled simulations --------------- */
async function logos(browser, url, label) {
  const {page} = await open(browser, url);
  const r = await page.evaluate(() => {
    const brand = /openai|chatgpt|gpt/i;
    const partner = /shopee|wayfair|dentsu|havas|omnicom|publicis|\bwpp\b|lazada|tiki/i;
    const bad = [];
    document.querySelectorAll('main img').forEach(i => {
      const s = (i.getAttribute('src') || '') + ' ' + (i.getAttribute('alt') || '');
      if (brand.test(s) || /logo/i.test(s)) bad.push('img ' + s.trim());
    });
    document.querySelectorAll('main svg').forEach(s => {
      const t = [s.getAttribute('aria-label'), s.querySelector('title')?.textContent, s.getAttribute('class'),
        ...[...s.querySelectorAll('use')].map(u => u.getAttribute('href'))].filter(Boolean).join(' ');
      if (brand.test(t) || /logo|flower|blossom/i.test(t)) bad.push('svg ' + t);
    });
    document.querySelectorAll('main [class*="logo"], main [class*="brand"]').forEach(e => {
      if (/(cg|openai|chatgpt)[-_]?logo|logo[-_]?(cg|openai)|wordmark/i.test(e.className)
        || (/logo/.test(e.className) && e.querySelector('img, svg:not(.ico)'))) bad.push('class ' + e.className);
    });
    // Inside the simulations: no "ChatGPT"/"OpenAI" word, no partner names.
    const sims = [...document.querySelectorAll('main :is([data-mock], .hero-stage, .pick-art)')];
    sims.forEach(m => {
      const t = m.textContent;
      if (/chatgpt|openai/i.test(t.replace(/ChatGPT Ads/g, ''))) bad.push('wordmark in a simulation: ' + t.trim().slice(0, 40));
      if (partner.test(t)) bad.push('partner name in a simulation: ' + t.match(partner)[0]);
    });
    // The assistant is a plain dot, never a picture or a drawn mark.
    document.querySelectorAll('main .cgm-dot').forEach(d => { if (d.children.length || d.textContent.trim()) bad.push('assistant avatar has content'); });
    // The answer never names the advertiser.
    document.querySelectorAll('main .cgm-a').forEach(a => { if (/Nhà Thơm|nhathom/i.test(a.textContent)) bad.push('answer names the advertiser'); });
    const mocks = [...document.querySelectorAll('main [data-mock]')];
    const unlabelled = mocks.filter(m => !m.closest('.stage, .workbench, .hero-stage, .pick-art, .meas, .bp, .sc-road, .v-pipeline, .v-funnel, .path-cards, .diag-list, [aria-hidden="true"]'));
    return {bad: [...new Set(bad)], mocks: mocks.length, unlabelled: unlabelled.length,
      brand: mocks.filter(m => /Nhà Thơm|nhathom/.test(m.textContent)).length};
  });
  ok(`${label} không logo / wordmark OpenAI, ChatGPT hay tên đối tác trong mô phỏng`, r.bad.length === 0, r.bad.slice(0, 5).join(' | '));
  if (r.mocks) {
    ok(`${label} ${r.mocks} mô phỏng đều nằm trong khung có nhãn`, r.unlabelled === 0, String(r.unlabelled));
    ok(`${label} mô phỏng dùng thương hiệu mẫu Nhà Thơm`, r.brand > 0, `${r.brand}/${r.mocks}`);
  }
  await page.close();
}

/* ---------------- mock rules: text size, tilt, cover, ratio ------------- */
async function mockRules(browser, url, label, width) {
  const {page} = await open(browser, url, width);
  const picks = await page.$$eval('.pick[data-pick]', bs => bs.map(b => b.dataset.pick));
  const bad = {small: [], tilt: [], cover: [], ratio: []};
  for (const pick of picks.length ? picks : [null]) {
    if (pick) {
      await page.click(`#tab-${pick}`);
      await page.waitForTimeout(80);
    }
    // open every workbench pane in turn so hidden mocks are measured too
    const benches = await page.locator(pick ? `#panel-${pick} .workbench` : 'main .workbench').count();
    for (let w = 0; w < benches; w++) {
      const bench = page.locator(pick ? `#panel-${pick} .workbench` : 'main .workbench').nth(w);
      const formats = await bench.locator('[data-format]').evaluateAll(bs => bs.map(b => b.dataset.format));
      for (const f of formats.length ? formats : [null]) {
        if (f) {
          await bench.locator(`[data-format="${f}"]`).click();
          await page.waitForTimeout(30);
        }
        const r = await page.evaluate(() => {
          const shown = e => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
          const out = {small: [], tilt: [], cover: [], ratio: []};
          const mocks = [...document.querySelectorAll('main [data-mock], main .cgm-phone, main .hero-stage, main .pick-art')].filter(shown);
          for (const m of mocks) {
            m.querySelectorAll('*').forEach(e => {
              if (!shown(e)) return;
              const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
              const fs = parseFloat(getComputedStyle(e).fontSize);
              if (own && fs < 11) out.small.push(`${e.className || e.tagName} ${fs}px "${e.textContent.trim().slice(0, 18)}"`);
              const t = getComputedStyle(e).transform;
              if (t && t !== 'none') {
                const v = t.match(/matrix(3d)?\(([^)]+)\)/)[2].split(',').map(Number);
                const deg = Math.abs(Math.atan2(v[1], v[0]) * 180 / Math.PI);
                if (deg > 4.01) out.tilt.push(`${e.className} ${deg.toFixed(1)}°`);
              }
            });
            m.querySelectorAll('img').forEach(img => {
              if (!shown(img)) return;
              const cs = getComputedStyle(img);
              if (cs.objectFit !== 'cover') out.cover.push(img.getAttribute('src') + ' ' + cs.objectFit);
            });
            // the hero cards sit in a 3D stack whose perspective skews boxes
            m.querySelectorAll(':is(.cgm-adb, .cgm-pc) > .mk-img').forEach(f => {
              if (!shown(f) || f.closest('.hero-stage')) return;
              const r = f.getBoundingClientRect();
              if (Math.abs(r.width / r.height - 1) > 0.04) out.ratio.push(`${f.parentElement.className} > ${f.className} ${Math.round(r.width)}×${Math.round(r.height)}`);
            });
          }
          return out;
        });
        for (const k of Object.keys(bad)) bad[k].push(...r[k]);
      }
    }
  }
  const u = a => [...new Set(a)];
  ok(`${label} @${width} chữ trong mô phỏng ≥ 11px`, !bad.small.length, u(bad.small).slice(0, 5).join(' | '));
  ok(`${label} @${width} không phần tử nào nghiêng quá 4°`, !bad.tilt.length, u(bad.tilt).slice(0, 5).join(' | '));
  ok(`${label} @${width} ảnh trong mô phỏng object-fit: cover`, !bad.cover.length, u(bad.cover).slice(0, 5).join(' | '));
  ok(`${label} @${width} ảnh quảng cáo và ảnh sản phẩm vuông 1:1`, !bad.ratio.length, u(bad.ratio).slice(0, 5).join(' | '));
  await page.close();
}

/* ---------------- (d) every workbench, every format button ------------- */
async function workbenches(browser, url, label, width) {
  const {page, errors} = await open(browser, url, width);
  const picks = await page.$$eval('.pick[data-pick]', bs => bs.map(b => b.dataset.pick));
  let clicks = 0;
  const bad = [];
  for (const pick of picks.length ? picks : [null]) {
    const scope = pick ? `#panel-${pick}` : 'main';
    if (pick) {
      await page.click(`#tab-${pick}`);
      await page.waitForTimeout(80);
    }
    const benches = page.locator(`${scope} .workbench`);
    const n = await benches.count();
    for (let w = 0; w < n; w++) {
      const bench = benches.nth(w);
      const formats = await bench.locator('[data-format]').evaluateAll(bs => bs.map(b => b.dataset.format));
      for (const f of formats) {
        const where = `${pick ? pick + ' ' : ''}wb${w + 1} ${f}`;
        try {
          await bench.locator(`[data-format="${f}"]`).click({timeout: 3000});
        } catch (e) {
          bad.push(`${where}: không bấm được (${String(e.message).split('\n')[0].slice(0, 80)})`);
          continue;
        }
        clicks++;
        const s = await bench.evaluate((wb, f) => {
          const panes = [...wb.querySelectorAll('[data-format-pane]')];
          const pane = panes.find(p => p.dataset.formatPane === f);
          const btn = wb.querySelector(`[data-format="${f}"]`);
          return {
            shown: Boolean(pane && !pane.hidden && pane.getBoundingClientRect().height > 0),
            others: panes.filter(p => p !== pane && !p.hidden).length,
            pressed: btn.getAttribute('aria-pressed')
          };
        }, f);
        if (!s.shown || s.others || s.pressed !== 'true') bad.push(`${where}: ${JSON.stringify(s)}`);
      }
    }
  }
  if (clicks || bad.length) {
    ok(`${label} @${width} (d) ${clicks} nút [data-format] mở đúng pane`, bad.length === 0, bad.slice(0, 6).join(' | '));
  }
  ok(`${label} @${width} (d) không lỗi console khi bấm`, errors.length === 0, errors.join(' | '));
  await page.close();
  return clicks;
}

/* ---------------- one-of-many tab sets (visual kit) --------------------- */
async function tabset(page, sel, name, expect, {toggle = false} = {}) {
  const tabs = page.locator(`${sel} [role="tab"]`);
  const n = await tabs.count();
  const bad = [];
  for (let i = 0; i < n; i++) {
    const tab = tabs.nth(i);
    if (toggle && (await tab.getAttribute('aria-selected')) === 'true') await tab.click();
    await tab.click();
    await page.waitForTimeout(40);
    const s = await tab.evaluate(t => {
      const set = t.closest('[data-tabs]');
      const all = [...set.querySelectorAll('[role="tab"]')].filter(x => x.closest('[data-tabs]') === set);
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      return {
        selected: t.getAttribute('aria-selected'),
        shown: Boolean(panel && !panel.hidden && panel.getBoundingClientRect().height > 0),
        others: all.filter(x => x !== t).map(x => document.getElementById(x.getAttribute('aria-controls'))).filter(p => p && !p.hidden).length
      };
    });
    if (s.selected !== 'true' || !s.shown || s.others) bad.push(`${i + 1}: ${JSON.stringify(s)}`);
  }
  ok(`${name}: ${n} tab, mỗi tab mở đúng nội dung`, n === expect && !bad.length, `${n}/${expect} ${bad.slice(0, 4).join(' | ')}`);
  if (toggle && n) {
    const last = tabs.nth(n - 1);
    await last.click();
    await page.waitForTimeout(40);
    const closed = await last.evaluate(t => t.getAttribute('aria-selected') === 'false' && document.getElementById(t.getAttribute('aria-controls')).hidden);
    ok(`${name}: bấm lại thì đóng`, closed);
  }
}

/* ---------------- page 1 interactions ---------------------------------- */
async function page1(browser) {
  const {page, errors} = await open(browser, P1);

  ok('P1 six ad-type panels rendered', (await page.$$('[data-panel]')).length === 6);

  for (const [id, accent] of Object.entries(TYPES)) {
    await page.click(`.pick[data-pick="${id}"]`);
    await page.waitForTimeout(60);
    const state = await page.evaluate(type => {
      const open_ = Array.from(document.querySelectorAll('[data-panel]')).filter(p => !p.hidden);
      const panel = document.querySelector(`[data-panel="${type}"]`);
      return {
        openCount: open_.length,
        openId: open_[0] && open_[0].dataset.panel,
        accent: panel ? getComputedStyle(panel).getPropertyValue('--accent').trim().toLowerCase() : '',
        chapters: panel ? [...panel.querySelectorAll('.chap')].map(c => c.id).join() : '',
        mocks: panel ? panel.querySelectorAll('[data-mock]').length : 0
      };
    }, id);
    ok(`P1 ${id} panel opens alone`, state.openCount === 1 && state.openId === id);
    ok(`P1 ${id} accent ${accent}`, state.accent === accent, state.accent);
    ok(`P1 ${id} six chapters look/how/files/measure/paths/play`,
      state.chapters === ['look', 'how', 'files', 'measure', 'paths', 'play'].map(c => `ch-${c}-${id}`).join(), state.chapters);
    ok(`P1 ${id} has simulations`, state.mocks > 0, String(state.mocks));
  }

  // character counters: the limit comes from the OpenAI spec line, flag when over
  const counters = await page.$$eval('[data-counter] [data-limit]', fs => fs.map(f => f.id));
  ok('P1 character counters present', counters.length > 0, counters.join(', '));
  for (const fid of counters) {
    const type = fid.split('-')[1];
    await page.click(`.pick[data-pick="${type}"]`);
    await page.waitForTimeout(60);
    const limit = Number(await page.getAttribute('#' + fid, 'data-limit'));
    const label = await page.evaluate(id => document.getElementById(id).closest('[data-counter]').textContent, fid);
    ok(`P1 ${fid} limit ${limit} matches its spec line`, label.replace(/\./g, '').includes(`${limit} ký tự`));
    await page.fill('#' + fid, 'Nến thơm Nhà Thơm '.repeat(Math.ceil((limit + 5) / 18)));
    await page.waitForTimeout(40);
    const cc = await page.evaluate(id => {
      const field = document.getElementById(id);
      const box = field.closest('[data-counter]');
      return {count: box.querySelector('.v-count b').textContent, length: Array.from(field.value).length, over: box.hasAttribute('data-over')};
    }, fid);
    ok(`P1 ${fid} counts characters and flags over ${limit}`, cc.count === String(cc.length) && cc.over, JSON.stringify(cc));
    await page.fill('#' + fid, 'Nến thơm');
    await page.waitForTimeout(40);
    ok(`P1 ${fid} clears when back under`, !(await page.evaluate(id => document.getElementById(id).closest('[data-counter]').hasAttribute('data-over'), fid)));
  }

  // measurement demo on every ad type: a tap adds one to its report row
  for (const id of Object.keys(TYPES)) {
    await page.click(`.pick[data-pick="${id}"]`);
    await page.waitForTimeout(60);
    const meas = await page.evaluate(type => {
      const box = document.querySelector(`#panel-${type} [data-meas]`);
      if (!box) return {missing: true};
      const tabs = [...box.querySelectorAll('[role="tab"]')].filter(t => box.querySelector(`td[data-key="${t.dataset.key}"]`));
      const res = tabs.map(tab => {
        const td = box.querySelector(`td[data-key="${tab.dataset.key}"]`);
        const before = Number(td.textContent);
        tab.click();
        return Number(td.textContent) === before + 1 && td.parentElement.classList.contains('is-on');
      });
      return {tabs: tabs.length, ok: res.every(Boolean)};
    }, id);
    ok(`P1 ${id} measurement demo counts every tap`, !meas.missing && meas.tabs > 0 && meas.ok, JSON.stringify(meas));
  }

  // readiness checklist ring, per panel
  for (const id of Object.keys(TYPES)) {
    await page.click(`.pick[data-pick="${id}"]`);
    await page.waitForTimeout(60);
    const boxes = await page.$$(`#panel-${id} [data-checklist] input[type="checkbox"]`);
    if (!boxes.length) { ok(`P1 ${id} checklist present`, false); continue; }
    await boxes[0].check();
    await page.waitForTimeout(60);
    const pct = await page.evaluate(t => document.querySelector(`#panel-${t} [data-ring-text]`).textContent, id);
    ok(`P1 ${id} checklist ring updates`, /%$/.test(pct) && pct !== '0%', `${boxes.length} mục, ${pct}`);
  }

  // OpenAI's three principles, each with a source
  const pr = await page.$$eval('#nguyen-tac .cg-pr', cs => cs.map(c => Boolean(c.querySelector('.cg-pr-art') && c.querySelector('.sources a[href*="openai.com"]'))));
  ok('P1 ba nguyên tắc, mỗi nguyên tắc có hình và nguồn', pr.length === 3 && pr.every(Boolean), JSON.stringify(pr));
  // the trial feature is labelled as such, everywhere it is drawn
  await page.click('.pick[data-pick="agent"]');
  await page.waitForTimeout(60);
  const trial = await page.evaluate(() => {
    const panel = document.querySelector('#panel-agent');
    return {
      pick: document.querySelector('.pick[data-pick="agent"]').textContent.includes('ĐANG THỬ NGHIỆM'),
      tags: [...panel.querySelectorAll('#ch-look-agent .demo-tag')].every(t => t.textContent.includes('ĐANG THỬ NGHIỆM')),
      banner: /thử nghiệm/i.test(panel.querySelector('.panel-banner').textContent)
    };
  });
  ok('P1 Trò chuyện với thương hiệu gắn nhãn "Đang thử nghiệm"', trial.pick && trial.tags && trial.banner, JSON.stringify(trial));
  // sample numbers are labelled
  const txt = await page.evaluate(() => document.querySelector('main').textContent);
  ok('P1 gợi ý ngữ cảnh ≠ từ khóa, ghi rõ không khớp chính xác', /không phải lệnh khớp chính xác/.test(txt));
  ok('P1 no console errors after interactions', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- page 3 interactions ----------------------------------- */
async function page3(browser) {
  const {page, errors} = await open(browser, P3);

  await tabset(page, '.v-funnel', 'P3 phễu chỉ số', 4);
  await tabset(page, '.v-pipeline', 'P3 trạm đường ống đo lường', 9, {toggle: true});
  await tabset(page, '.sc-road', 'P3 các bước triển khai', 10);
  await tabset(page, '.sc-faq', 'P3 tab hỏi đáp', 4);

  await page.locator('.sc-faq [role="tab"]').first().click();
  await page.keyboard.press('ArrowRight');
  const moved = await page.evaluate(() => document.activeElement.getAttribute('aria-selected') === 'true'
    && [...document.querySelectorAll('.sc-faq [role="tab"]')].indexOf(document.activeElement) === 1);
  ok('P3 hỏi đáp: phím mũi tên chuyển tab', moved);

  const faq = await page.locator('.sc-faq [role="tabpanel"]:not([hidden]) details:not([open])').first().elementHandle();
  const shut = await faq.evaluate(d => d.getBoundingClientRect().height);
  await (await faq.$('summary')).click();
  await page.waitForTimeout(600);
  const opened = await faq.evaluate(d => ({open: d.open, h: d.getBoundingClientRect().height}));
  ok('P3 hỏi đáp: câu hỏi mở ra', opened.open && opened.h > shut, `${shut} → ${opened.h}px`);

  // Tax box: OpenAI does not state a rate, so none is applied, and the box says so
  const tax = await page.evaluate(() => {
    const box = document.querySelector('.cg-tax');
    return box ? {text: box.textContent.replace(/\s+/g, ' '),
      src: Boolean(box.querySelector('.sources a[href^="https://help.openai.com/"]'))} : null;
  });
  ok('P3 hộp thuế không áp mức thuế', tax && tax.text.includes('CHƯA ÁP MỨC THUẾ') && !/\d+\s?%/.test(tax.text), tax && tax.text.slice(0, 120));
  ok('P3 hộp thuế có câu đối chiếu chứng từ', tax && tax.text.includes('Thuế và hóa đơn theo chứng từ OpenAI xuất; POWAI đối chiếu khi thanh toán.'));
  ok('P3 hộp thuế có nguồn OpenAI', tax && tax.src);

  const body = await page.evaluate(() => document.querySelector('main').textContent.replace(/\s+/g, ' '));
  ok('P3 phễu ghi rõ số mẫu', body.includes('Số mẫu, không phải kết quả dự kiến'));
  ok('P3 ghi thời gian cập nhật số liệu (15 phút, 7–8 giờ)', body.includes('15 phút') && body.includes('7–8 giờ'));
  ok('P3 ghi oCPM đang thử nghiệm (beta)', /oCPM[^.]*beta/i.test(body));
  const events = ['page_viewed', 'contents_viewed', 'items_added', 'checkout_started', 'order_created', 'lead_created', 'registration_completed', 'subscription_created'];
  ok('P3 sự kiện chuẩn đúng tên tài liệu OpenAI', events.every(e => body.includes(e)), events.filter(e => !body.includes(e)).join(', '));
  ok('P3 ghi sự kiện tùy chỉnh chưa dùng để tối ưu', /Sự kiện tùy chỉnh hiện chưa dùng được để tối ưu chuyển đổi/.test(body));
  const tags = await page.evaluate(() => document.querySelector('main').textContent);
  ok('P3 sự kiện tách tín hiệu / kết quả đã xác nhận', /TÍN HIỆU/.test(tags) && /KẾT QUẢ ĐÃ XÁC NHẬN/.test(tags));
  const more = await page.$$eval('.cg-more .next', ns => ns.map(n => (n.querySelector('a') || n).getAttribute('href') || ''));
  ok('P3 bốn khối đọc tiếp sang Google / Facebook / TikTok / Zalo', more.length === 4
    && /google-ads/.test(more[0]) && /facebook-ads/.test(more[1]) && /tiktok-ads/.test(more[2]) && /zalo-ads/.test(more[3]), more.join(' | '));

  const calc = page.locator('[data-calc]');
  const empty = await calc.evaluate(b => [...b.querySelectorAll('[data-o]')].map(o => o.textContent).join());
  ok('P3 ô tính thử trống khi chưa nhập', empty === '—,—', empty);
  await calc.locator('[data-c="daily"]').fill('300000');
  await calc.locator('[data-c="days"]').fill('30');
  await calc.locator('[data-c="cpl"]').fill('90000');
  const out = await calc.evaluate(b => ({
    spend: b.querySelector('[data-o="spend"]').textContent,
    leads: b.querySelector('[data-o="leads"]').textContent
  }));
  ok('P3 ô tính thử: 300.000₫ × 30 ngày', out.spend === '9.000.000₫', out.spend);
  ok('P3 ô tính thử: ÷ 90.000₫ mỗi kết quả', out.leads === '≈ 100', out.leads);

  const boxes = await page.$$('[data-checklist] input[type="checkbox"]');
  ok('P3 fourteen preparation items', boxes.length === 14, String(boxes.length));
  for (const b of boxes.slice(0, 3)) await b.check();
  await page.waitForTimeout(60);
  const pct = await page.evaluate(() => document.querySelector('[data-ring-text]').textContent);
  ok('P3 checklist ring updates', pct === Math.round(300 / 14) + '%', pct);

  // the form must not post into the [FORM_ENDPOINT] placeholder
  const action = await page.getAttribute('#gaBrief', 'action');
  ok('P3 form keeps the [FORM_ENDPOINT] placeholder', action === '[FORM_ENDPOINT]', action);
  await page.fill('#f-company', 'Công ty thử nghiệm');
  await page.fill('#f-contact', 'Nguyễn A');
  await page.fill('#f-phone', '0900000000');
  await page.click('#gaBrief button[type="submit"]');
  await page.waitForTimeout(120);
  const form = await page.evaluate(() => ({
    url: location.pathname,
    status: document.querySelector('[data-brief-status]').textContent,
    goals: [...document.querySelectorAll('#f-goal option')].map(o => o.textContent.trim())
  }));
  ok('P3 form stays on page', form.url.endsWith('/chatgpt-ads/chi-phi-hieu-qua/'), form.url);
  ok('P3 form explains the missing endpoint', /\[HOTLINE\]/.test(form.status) && /\[ZALO\]/.test(form.status), form.status);
  ok('P3 goal select lists the ChatGPT goals', form.goals.length === 6 && form.goals.some(g => /danh mục|ngành/.test(g)), form.goals.join(' / '));

  ok('P3 no console errors after interactions', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- legacy anchors land on the right page ----------------- */
/* ---------------- page 2 content ----------------------------------------- */
async function page2(browser) {
  const {page, errors} = await open(browser, P2);
  const r = await page.evaluate(() => ({
    toc: [...document.querySelectorAll('.toc a, nav[aria-label*="Mục lục"] a')].map(a => a.textContent.trim()),
    text: document.querySelector('main').textContent.replace(/\s+/g, ' '),
    next: [...document.querySelectorAll('main .next a, main a.next')].map(a => a.getAttribute('href'))
  }));
  const want = ['Mục tiêu', 'Mức độ sẵn sàng', 'Ngữ cảnh & đối tượng', 'Ngành được chạy', 'Tóm tắt'];
  ok('P2 mục lục: Mục tiêu / Mức độ sẵn sàng / Ngữ cảnh & đối tượng / Ngành được chạy / Tóm tắt',
    want.every((w, i) => (r.toc[i] || '').includes(w)), r.toc.join(' / '));
  ok('P2 có phần Đọc tiếp', r.text.includes('Đọc tiếp'));
  ok('P2 ba mục tiêu Views / Clicks / Conversions', ['Views', 'Clicks', 'Conversions'].every(w => r.text.includes(w)));
  ok('P2 đối tượng tùy chỉnh cần 25.000 người khớp', r.text.includes('25.000 người khớp'));
  ok('P2 ngành: được chạy / xét từng trường hợp / không được chạy',
    ['Được chạy', 'Xét từng trường hợp', 'Không được chạy', 'Không hiện quảng cáo'].every(w => r.text.includes(w)));
  ok('P2 đọc tiếp dẫn sang Chi phí & hiệu quả', r.next.some(h => /\/chatgpt-ads\/chi-phi-hieu-qua\//.test(h || '')), r.next.join(' | '));
  ok('P2 no console errors', errors.length === 0, errors.join(' | '));
  await page.close();

  const p1 = await open(browser, P1);
  const next1 = await p1.page.$$eval('main .next a, main a.next', as => as.map(a => a.getAttribute('href')));
  ok('P1 đọc tiếp dẫn sang Chọn cách chạy', next1.some(h => /\/chatgpt-ads\/chon-cach-chay\//.test(h || '')), next1.join(' | '));
  await p1.page.close();
}

const REDIRECTS = [
  [P1, '#pair', P1, 'pair'],
  [P2, '#product', P1, 'product'],
  [P3, '#agent', P1, 'agent'],
  [P2, '#conv', P1, 'conv'],
  [P2, '#cg-formats', P1, ''],
  [P3, '#sheet-specs', P1, ''],
  [P2, '#guide', P1, '']
];

async function redirects(browser) {
  for (const [from, hash, to, type] of REDIRECTS) {
    const {page} = await open(browser, from + hash);
    const target = new URL(to).pathname;
    await page.waitForURL(u => u.pathname === target, {timeout: 5000}).catch(() => {});
    await page.waitForLoadState('load');
    await page.waitForTimeout(300);
    const state = await page.evaluate(() => ({
      url: location.pathname,
      open: Array.from(document.querySelectorAll('[data-panel]'))
        .filter(p => !p.hidden).map(p => p.dataset.panel)[0] || ''
    }));
    ok(`${hash} → ${target}${type ? ' #' + type : ''}`,
      state.url === target && (!type || state.open === type),
      `${state.url}${state.open ? ' / ' + state.open : ''}`);
    await page.close();
  }
}

/* ---------------- run ---------------------------------------------------- */
(async () => {
  files();
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  try {
    const built = [[P1, 'P1', 'Cách chạy'], [P2, 'P2', 'Chọn cách chạy'], [P3, 'P3', 'Chi phí']];
    for (const [url, label, current] of built) {
      await shell(browser, url, label, current);
      await layout(browser, url, label);
      await logos(browser, url, label);
    }
    await frame(browser, P1, 'P1', 6);
    await frame(browser, P2, 'P2', 1);
    await frame(browser, P3, 'P3', 1);
    let clicks = 0;
    for (const [url, label] of built) for (const width of [1440, 390]) clicks += await workbenches(browser, url, label, width);
    ok('workbench buttons found on the ChatGPT pages', clicks > 0, String(clicks));
    for (const [url, label] of built) for (const width of [1440, 390]) await mockRules(browser, url, label, width);
    await page1(browser);
    await page2(browser);
    await page3(browser);
    await redirects(browser);
  } finally {
    await browser.close();
  }
  console.log(failures ? `\n${passes} passed, ${failures} check(s) failed.` : `\nAll ${passes} checks passed.`);
  process.exit(failures ? 1 : 0);
})();
