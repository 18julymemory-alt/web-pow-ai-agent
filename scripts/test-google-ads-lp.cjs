// Playwright checks for the three Google Ads landing pages.
// Usage: node scripts/test-google-ads-lp.cjs   (serve.mjs must be on 127.0.0.1:4173)
//
// Per page: shell (header, footer, no Three.js), (f) no sideways scroll at
// 320–1920 px, (a)(b)(c) chapter frame, (d) every workbench button at 1440 and
// 390, then the page 01 tools, (e) the page 03 visual kit (funnel, pipeline,
// rollout steps, FAQ tabs, calculator, checklist, form) and the legacy anchors.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const BASE = 'http://127.0.0.1:4173';
const P1 = BASE + '/dich-vu/quang-cao-da-kenh/google-ads/';
const P2 = P1 + 'chon-cach-chay/';
const P3 = P1 + 'chi-phi-hieu-qua/';
const WIDTHS = [320, 390, 768, 1024, 1440, 1920];

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
    // The hero art bleeds a little past its box on purpose, so scrollWidth is not
    // the question — the question is whether the page can be dragged sideways.
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
async function shell(browser, url, label) {
  const {page, errors} = await open(browser, url);
  const info = await page.evaluate(() => ({
    header: Boolean(document.querySelector('.pow-header #header-navigation')),
    navLinks: document.querySelectorAll('#header-navigation a').length,
    footer: Boolean(document.querySelector('footer.page-footer')),
    three: Array.from(document.scripts).some(s => /three/i.test(s.src || s.textContent)),
    importmap: Boolean(document.querySelector('script[type="importmap"]')),
    canvas: document.querySelectorAll('canvas').length,
    steps: document.querySelectorAll('.steps-bar a').length,
    current: document.querySelector('.steps-bar a[aria-current="page"]')?.textContent.trim()
  }));
  ok(`${label} real header hydrated`, info.header && info.navLinks > 0, `${info.navLinks} links`);
  ok(`${label} footer present`, info.footer);
  ok(`${label} no Three.js / no canvas`, !info.three && !info.importmap && info.canvas === 0);
  ok(`${label} three-step bar`, info.steps === 3, info.current || '');
  ok(`${label} shell loads without console errors`, errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- chapter frame -----------------------------------------
   (a) every .panel-toc lists the chapters of its own scope (page 01: one per
   campaign panel), in order; (b) every .chap opens with a numbered head, the
   numbers following the table of contents; (c) every chapter shows something
   to look at or use: one of the kit below, or on page 01 its own scenes
   (files blueprint, measurement demo, chart cards, diagnosis reports). The
   closing summary of page 02 (.recap: three link cards back to its chapters)
   is the one chapter allowed without. */
const VISUAL = '.workbench, .stage, .v-pipeline, .v-funnel, .sc-road, .checklist, .sc-faq, form, .bp, .meas, .path-cards, .diag-list';

async function frame(browser, url, label, tocs) {
  const {page} = await open(browser, url);
  const r = await page.evaluate(VISUAL => {
    const out = {tocs: [], heads: [], bare: [], order: []};
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
    });
    out.count = document.querySelectorAll('.chap').length;
    return out;
  }, VISUAL);
  ok(`${label} (a) ${tocs} mục lục chương`, r.tocs.length === tocs, String(r.tocs.length));
  for (const t of r.tocs) ok(`${label} (a) ${t.name}: link trỏ đúng id chương`, t.ok, t.links);
  ok(`${label} (b) ${r.count} chương đều có chap-head.has-num`, r.heads.length === 0, r.heads.join(', '));
  ok(`${label} (b) số chương theo đúng thứ tự mục lục`, r.order.length === 0, r.order.join(', '));
  ok(`${label} (c) chương nào cũng có mô phỏng / công cụ`, r.bare.length === 0, r.bare.join(', '));
  await page.close();
}

/* ---------------- (d) every workbench, every format button ------------- */
async function workbenches(browser, url, label, width) {
  const {page, errors} = await open(browser, url, width);
  const picks = await page.$$eval('[data-pick]', bs => bs.map(b => b.dataset.pick));
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
// Clicks every tab of the tab set inside `sel`: each must show its own panel
// and only that one. With toggle, a second click closes it again.
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
  const ids = ['search', 'pmax', 'shopping', 'demand', 'video', 'app'];

  ok('P1 six campaign panels rendered', (await page.$$('[data-panel]')).length === 6);

  for (const id of ids) {
    await page.click(`.pick[data-pick="${id}"]`);
    await page.waitForTimeout(60);
    const state = await page.evaluate(campaign => {
      const open_ = Array.from(document.querySelectorAll('[data-panel]')).filter(p => !p.hidden);
      const panel = document.querySelector(`[data-panel="${campaign}"]`);
      return {
        openCount: open_.length,
        openId: open_[0] && open_[0].dataset.panel,
        accent: panel ? getComputedStyle(panel).getPropertyValue('--accent').trim() : '',
        chapters: panel ? panel.querySelectorAll('.chap').length : 0
      };
    }, id);
    ok(`P1 ${id} panel opens alone`, state.openCount === 1 && state.openId === id);
    ok(`P1 ${id} has its own accent`, /^#/.test(state.accent), state.accent);
    ok(`P1 ${id} six chapters`, state.chapters === 6, String(state.chapters));
  }

  await page.click('.pick[data-pick="search"]');
  await page.waitForTimeout(60);

  // keyword match types
  for (const m of ['exact', 'phrase', 'broad']) {
    await page.click(`[data-match="${m}"]`);
    await page.waitForTimeout(40);
    const state = await page.evaluate(() => ({
      rings: document.querySelector('#matchRings')?.dataset.m,
      detail: Array.from(document.querySelectorAll('[data-match-detail]'))
        .filter(d => !d.hidden).map(d => d.dataset.matchDetail)
    }));
    ok(`P1 match ${m}`, state.rings === m && state.detail.join() === m, JSON.stringify(state));
  }

  // RSA composer
  const headline = 'Thiết kế website doanh nghiệp trọn gói cho công ty';
  await page.fill('#rsaH', headline);
  await page.waitForTimeout(60);
  const rsa = await page.evaluate(() => {
    const field = document.querySelector('#rsaH');
    const wrap = field.closest('.fld');
    return {
      count: wrap.querySelector('label b').textContent,
      length: field.value.length,
      over: wrap.querySelector('.meter').classList.contains('over'),
      preview: document.querySelector('[data-preview-out="h"]').textContent
    };
  });
  // Vietnamese diacritics arrive as combining marks, so the field's own length
  // is the reference — the counter must agree with it, not with a guess.
  ok('P1 RSA counts characters', rsa.count === String(rsa.length), `${rsa.count} vs ${rsa.length}`);
  ok('P1 RSA flags over limit', rsa.over === true);
  ok('P1 RSA preview truncates at 30', rsa.preview.length === 30, `${rsa.preview.length} chars`);

  // measurement demo: a tap on the landing phone adds one to its report row
  const meas = await page.evaluate(() => {
    const box = document.querySelector('#panel-search [data-meas]');
    const tab = [...box.querySelectorAll('[role="tab"]')].find(t => box.querySelector(`td[data-key="${t.dataset.key}"]`));
    const td = box.querySelector(`td[data-key="${tab.dataset.key}"]`);
    const before = Number(td.textContent);
    tab.click();
    return {before, after: Number(td.textContent), on: td.parentElement.classList.contains('is-on')};
  });
  ok('P1 measurement demo counts a tap', meas.after === meas.before + 1 && meas.on, JSON.stringify(meas));

  // readiness checklist ring
  const boxes = await page.$$('#panel-search [data-checklist] input[type="checkbox"]');
  await boxes[0].check();
  await page.waitForTimeout(60);
  const pct = await page.evaluate(() => document.querySelector('#panel-search [data-ring-text]').textContent);
  ok('P1 checklist ring updates', /%$/.test(pct) && pct !== '0%', pct);

  ok('P1 no console errors after interactions', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- page 3 interactions (e) ------------------------------- */
async function page3(browser) {
  const {page, errors} = await open(browser, P3);

  await tabset(page, '.v-funnel', 'P3 (e) phễu chỉ số', 5);
  await tabset(page, '.v-pipeline', 'P3 (e) trạm đường ống', 9, {toggle: true});
  await tabset(page, '.sc-road', 'P3 (e) các bước triển khai', 10);
  await tabset(page, '.sc-faq', 'P3 (e) tab hỏi đáp', 4);

  // arrow keys move along a tab list
  await page.locator('.sc-faq [role="tab"]').first().click();
  await page.keyboard.press('ArrowRight');
  const moved = await page.evaluate(() => document.activeElement.getAttribute('aria-selected') === 'true'
    && [...document.querySelectorAll('.sc-faq [role="tab"]')].indexOf(document.activeElement) === 1);
  ok('P3 (e) hỏi đáp: phím mũi tên chuyển tab', moved);

  // a closed question of the open FAQ tab opens (the first one starts open)
  const faq = await page.locator('.sc-faq [role="tabpanel"]:not([hidden]) details:not([open])').first().elementHandle();
  const shut = await faq.evaluate(d => d.getBoundingClientRect().height);
  await (await faq.$('summary')).click();
  await page.waitForTimeout(600);
  const opened = await faq.evaluate(d => ({open: d.open, h: d.getBoundingClientRect().height}));
  ok('P3 (e) hỏi đáp: câu hỏi mở ra', opened.open && opened.h > shut, `${shut} → ${opened.h}px`);

  // budget calculator: plain multiplication, empty until the visitor types
  const calc = page.locator('[data-calc]');
  const empty = await calc.evaluate(b => [...b.querySelectorAll('[data-o]')].map(o => o.textContent).join());
  ok('P3 (e) ô tính thử trống khi chưa nhập', empty === '—,—', empty);
  await calc.locator('[data-c="daily"]').fill('500000');
  await calc.locator('[data-c="days"]').fill('30');
  await calc.locator('[data-c="cpl"]').fill('250000');
  const out = await calc.evaluate(b => ({
    spend: b.querySelector('[data-o="spend"]').textContent,
    leads: b.querySelector('[data-o="leads"]').textContent
  }));
  ok('P3 (e) ô tính thử: 500.000₫ × 30 ngày', out.spend === '15.000.000₫', out.spend);
  ok('P3 (e) ô tính thử: ÷ 250.000₫ mỗi khách', out.leads === '≈ 60', out.leads);

  // checklist ring
  const boxes = await page.$$('[data-checklist] input[type="checkbox"]');
  ok('P3 thirteen preparation items', boxes.length === 13, String(boxes.length));
  await boxes[0].check();
  await boxes[1].check();
  await page.waitForTimeout(60);
  const pct = await page.evaluate(() => document.querySelector('[data-ring-text]').textContent);
  ok('P3 checklist ring updates', pct === '15%', pct);

  // the form must not post into the [FORM_ENDPOINT] placeholder
  await page.fill('#f-company', 'Công ty thử nghiệm');
  await page.fill('#f-contact', 'Nguyễn A');
  await page.fill('#f-phone', '0900000000');
  await page.click('#gaBrief button[type="submit"]');
  await page.waitForTimeout(120);
  const form = await page.evaluate(() => ({
    url: location.pathname,
    status: document.querySelector('[data-brief-status]').textContent,
    goals: document.querySelectorAll('#f-goal option').length
  }));
  ok('P3 form stays on page', form.url.endsWith('/chi-phi-hieu-qua/'), form.url);
  ok('P3 form explains the missing endpoint', /\[HOTLINE\]/.test(form.status), form.status);
  ok('P3 goal select lists eight goals', form.goals === 9, String(form.goals));

  ok('P3 no console errors after interactions', errors.length === 0, errors.join(' | '));
  await page.close();
}

/* ---------------- legacy anchors land on the right page ----------------- */
const REDIRECTS = [
  [P1, '#sheet-goals', P2, ''],
  [P1, '#sheet-budget', P3, ''],
  [P2, '#sheet-measure', P3, ''],
  [P3, '#sheet-formats', P1, ''],
  [P2, '#video', P1, 'video'],
  [P3, '#format-shopping', P1, 'shopping'],
  [P1, '#atlas-display-specs', P1, 'demand'],
  [P2, '#guide-pmax-2', P1, 'pmax'],
  [P3, '#ga-panel-display', P1, 'demand']
];

async function redirects(browser) {
  for (const [from, hash, to, campaign] of REDIRECTS) {
    const {page} = await open(browser, from + hash);
    // location.replace() fires after boot, so wait for the URL to settle.
    const target = new URL(to).pathname;
    await page.waitForURL(u => u.pathname === target, {timeout: 5000}).catch(() => {});
    await page.waitForLoadState('load');
    await page.waitForTimeout(300);
    const state = await page.evaluate(() => ({
      url: location.pathname,
      open: Array.from(document.querySelectorAll('[data-panel]'))
        .filter(p => !p.hidden).map(p => p.dataset.panel)[0] || ''
    }));
    ok(`${hash} → ${target}${campaign ? ' #' + campaign : ''}`,
      state.url === target && (!campaign || state.open === campaign),
      `${state.url}${state.open ? ' / ' + state.open : ''}`);
    await page.close();
  }
}

/* ---------------- run ---------------------------------------------------- */
(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  try {
    const built = [[P1, 'P1'], [P2, 'P2'], [P3, 'P3']];
    for (const [url, label] of built) {
      await shell(browser, url, label);
      await layout(browser, url, label);
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
