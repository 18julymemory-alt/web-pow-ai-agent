// Playwright checks for the three Facebook Ads landing pages.
// Usage: node scripts/test-facebook-ads-lp.cjs   (serve.mjs must be on 127.0.0.1:4173)
//
// Same frame as the Google Ads trio (test-google-ads-lp.cjs): shell, no
// sideways scroll at 320–1920 px, chapter frame, every workbench button at
// 1440 and 390, the page 01 tools, the page 03 visual kit and the legacy
// anchors. On top: no platform logos in the simulations, every chapter cites
// Meta, the old Facebook files are gone.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:4173';
const P1 = BASE + '/dich-vu/quang-cao-da-kenh/facebook-ads/';
const P2 = P1 + 'chon-cach-chay/';
const P3 = P1 + 'chi-phi-hieu-qua/';
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];
const TYPES = {
  feed: '#8ec5ff', stories: '#ff9bc1', carousel: '#85e1c1',
  messaging: '#c0a2ff', leadform: '#ffbd80', catalog: '#e0cd9b'
};

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
  const page = await browser.newPage({viewport: {width, height: 900}});
  const errors = watch(page);
  await page.goto(url, {waitUntil: 'networkidle'});
  return {page, errors};
}

/* ---------------- files: old code gone, new CSS within budget ----------- */
function files() {
  const root = path.resolve(__dirname, '..');
  const old = ['facebook-detail-data', 'facebook-detail-page', 'facebook-easy-scenes', 'facebook-format-gallery',
    'facebook-settings-sheets', 'facebook-setup-guide'].map(n => `scripts/${n}.mjs`)
    .concat(['dist/facebook-detail.css', 'dist/facebook-detail.js']);
  const left = old.filter(f => fs.existsSync(path.join(root, f)));
  ok('old Facebook files removed', left.length === 0, left.join(', '));

  const css = fs.readFileSync(path.join(root, 'dist/facebook-ads-lp.css'), 'utf8');
  ok('facebook-ads-lp.css ≤ 25 KB', css.length <= 25 * 1024, `${(css.length / 1024).toFixed(1)} KB`);
  ok('facebook-ads-lp.css has no !important', !/!important/.test(css));

  const mods = fs.readdirSync(path.join(root, 'scripts/facebook-ads-lp')).filter(f => f.endsWith('.mjs'));
  const src = mods.map(f => fs.readFileSync(path.join(root, 'scripts/facebook-ads-lp', f), 'utf8')).join('\n');
  ok('modules import the Google Ads kit', /from '\.\.\/google-ads-lp\//.test(src));
  ok('modules do not import google-ads-page.mjs', !/google-ads-page\.mjs/.test(src));
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
  ok(`${label} body class ga-lp fb-lp`, /\bga-lp\b/.test(info.body) && /\bfb-lp\b/.test(info.body), info.body);
  ok(`${label} loads google-ads-lp.css + facebook-ads-lp.css`,
    info.css.some(h => /google-ads-lp\.css/.test(h)) && info.css.some(h => /facebook-ads-lp\.css/.test(h)));
  ok(`${label} reuses google-ads-lp.js`, info.js.some(s => /google-ads-lp\.js/.test(s)));
  ok(`${label} real header hydrated`, info.header && info.navLinks > 0, `${info.navLinks} links`);
  ok(`${label} footer present`, info.footer);
  ok(`${label} no Three.js / no canvas`, !info.three && info.canvas === 0);
  ok(`${label} three-step bar points at the Facebook pages`,
    info.steps.length === 3 && info.steps.every(h => h.startsWith('/dich-vu/quang-cao-da-kenh/facebook-ads/')), info.steps.join(' '));
  ok(`${label} step bar marks "${current}"`, info.current.includes(current), info.current);
  ok(`${label} shell loads without console errors`, errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- chapter frame -----------------------------------------
   (a) every .panel-toc lists the chapters of its own scope in order; (b) every
   .chap opens with a numbered head following the table of contents; (c) every
   chapter shows something to look at or use; every chapter except the contact
   form cites Meta ("Tài liệu Meta:"). */
const VISUAL = '.workbench, .stage, .v-pipeline, .v-funnel, .sc-road, .checklist, .sc-faq, form, .bp, .meas, .path-cards, .diag-list';

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
      const src = [...c.querySelectorAll('.sources')].find(s => /Tài liệu Meta/.test(s.textContent));
      const links = src ? [...src.querySelectorAll('a')].filter(a => /^https:\/\/(www\.facebook\.com\/business|transparency\.meta\.com|developers\.facebook\.com)/.test(a.href)) : [];
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
  ok(`${label} chương nào cũng có dòng "Tài liệu Meta:" dẫn tới Meta`, r.cite.length === 0, r.cite.join(', '));
  await page.close();
}

/* ---------------- no platform logos, sample numbers labelled ------------ */
async function logos(browser, url, label) {
  const {page} = await open(browser, url);
  const r = await page.evaluate(() => {
    const brand = /facebook|instagram|messenger|threads|whatsapp|\bmeta\b|\bfb\b|\big\b/i;
    const bad = [];
    document.querySelectorAll('main img').forEach(i => {
      const s = (i.getAttribute('src') || '') + ' ' + (i.getAttribute('alt') || '');
      if (brand.test(s)) bad.push('img ' + s.trim());
    });
    document.querySelectorAll('main svg').forEach(s => {
      const t = [s.getAttribute('aria-label'), s.querySelector('title')?.textContent, s.getAttribute('class'),
        ...[...s.querySelectorAll('use')].map(u => u.getAttribute('href'))].filter(Boolean).join(' ');
      if (brand.test(t) || /logo/i.test(t)) bad.push('svg ' + t);
    });
    // .c-logo is the kit's hero tile holding a tap icon, not a brand mark.
    const brandClass = /(fb|ig|meta|facebook|instagram|messenger|threads|whatsapp)[-_]?logo|logo[-_]?(fb|ig|meta|facebook|instagram|messenger|threads|whatsapp)/i;
    document.querySelectorAll('main [class*="logo"]').forEach(e => {
      if (brandClass.test(e.className) || e.querySelector('img, svg:not(.ico)')) bad.push('class ' + e.className);
    });
    // Every simulation says it is a drawing.
    const mocks = [...document.querySelectorAll('main [data-mock]')];
    const unlabelled = mocks.filter(m => !m.closest('.stage, .workbench, .hero-stage, .pick-art, .meas, .bp, .sc-road, .v-pipeline, .v-funnel, .path-cards, .diag-list, [aria-hidden="true"]'));
    return {bad: [...new Set(bad)], mocks: mocks.length, unlabelled: unlabelled.length};
  });
  ok(`${label} không có logo Facebook / Instagram / Meta / Messenger / Threads`, r.bad.length === 0, r.bad.slice(0, 5).join(' | '));
  if (r.mocks) ok(`${label} ${r.mocks} mô phỏng đều nằm trong khung có nhãn`, r.unlabelled === 0, String(r.unlabelled));
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
  ok(`${label} @${width} (d) ${clicks} nút [data-format] mở đúng pane`, bad.length === 0 && clicks > 0, bad.slice(0, 6).join(' | '));
  ok(`${label} @${width} (d) không lỗi console khi bấm`, errors.length === 0, errors.join(' | '));
  await page.close();
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

  await page.click('.pick[data-pick="feed"]');
  await page.waitForTimeout(60);

  // character counters: Meta's recommended limits, flag when over
  const long = 'Nến thơm sáp đậu nành, giao trong 2 giờ nội thành';
  await page.fill('#fc-feed-2', long);
  await page.waitForTimeout(60);
  const cc = await page.evaluate(() => {
    const field = document.querySelector('#fc-feed-2');
    const box = field.closest('[data-counter]');
    return {count: box.querySelector('.v-count b').textContent, length: Array.from(field.value).length,
      limit: field.dataset.limit, over: box.hasAttribute('data-over')};
  });
  ok('P1 headline counter counts characters', cc.count === String(cc.length), `${cc.count} vs ${cc.length}`);
  ok('P1 headline counter uses 27 (Meta feed headline)', cc.limit === '27', cc.limit);
  ok('P1 headline counter flags over limit', cc.over === true);
  await page.fill('#fc-feed-2', 'Nến thơm, giao 2 giờ');
  await page.waitForTimeout(40);
  ok('P1 headline counter clears when back under', !(await page.evaluate(() => document.querySelector('#fc-feed-2').closest('[data-counter]').hasAttribute('data-over'))));

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

  ok('P1 no console errors after interactions', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- page 3 interactions ----------------------------------- */
async function page3(browser) {
  const {page, errors} = await open(browser, P3);

  await tabset(page, '.v-funnel', 'P3 phễu chỉ số', 5);
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
  ok('P3 ô tính thử: ÷ 90.000₫ mỗi khách', out.leads === '≈ 100', out.leads);

  const boxes = await page.$$('[data-checklist] input[type="checkbox"]');
  ok('P3 fifteen preparation items', boxes.length === 15, String(boxes.length));
  for (const b of boxes.slice(0, 3)) await b.check();
  await page.waitForTimeout(60);
  const pct = await page.evaluate(() => document.querySelector('[data-ring-text]').textContent);
  ok('P3 checklist ring updates', pct === '20%', pct);

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
  ok('P3 form stays on page', form.url.endsWith('/facebook-ads/chi-phi-hieu-qua/'), form.url);
  ok('P3 form explains the missing endpoint', /\[HOTLINE\]/.test(form.status) && /\[ZALO\]/.test(form.status), form.status);
  ok('P3 goal select lists the Meta objectives', form.goals.length === 6, form.goals.join(' / '));

  ok('P3 no console errors after interactions', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- legacy anchors land on the right page ----------------- */
const REDIRECTS = [
  [P1, '#stories', P1, 'stories'],
  [P2, '#leadform', P1, 'leadform'],
  [P3, '#catalog', P1, 'catalog'],
  [P1, '#fd-panel-reels', P1, 'stories'],
  [P1, '#fd-tab-collection', P1, 'carousel'],
  [P2, '#fd-panel-feed-video', P1, 'feed'],
  [P3, '#sheet-formats', P1, ''],
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
    for (const [url, label] of built) for (const width of [1440, 390]) await workbenches(browser, url, label, width);
    await page1(browser);
    await page3(browser);
    await redirects(browser);
  } finally {
    await browser.close();
  }
  console.log(failures ? `\n${passes} passed, ${failures} check(s) failed.` : `\nAll ${passes} checks passed.`);
  process.exit(failures ? 1 : 0);
})();
