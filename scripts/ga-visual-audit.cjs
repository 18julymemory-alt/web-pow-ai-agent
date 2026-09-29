// Visual audit of every simulation on the three Google Ads pages.
//
// For each page at 1440 and 390 it
//   - sets every <img loading="lazy"> to eager and waits for the pictures,
//   - clicks every [data-format] button of every .workbench (on page 01 in all
//     six campaign panels) and captures the pane that opens,
//   - captures the other simulations (hero, picker art, machine, measurement,
//     path cards, pipeline stations, funnel tiers, rollout steps, FAQ, form…),
//     once per tab state where they have tabs,
//   - checks each capture for: text running past its box or the screen, text
//     covered by a floating button, empty pictures, ad titles over 2 lines,
//     text under 10px, stretched pictures, text or buttons under the TikTok
//     action rail and platform logos,
//   - stitches the captures into contact sheets.
//
//   AUDIT_TAG=after node scripts/ga-visual-audit.cjs
//   AUDIT_PAGES=p1 AUDIT_W=390 node scripts/ga-visual-audit.cjs
//   AUDIT_SITE=facebook-ads AUDIT_TAG=fb node scripts/ga-visual-audit.cjs   (Facebook Ads trio)
//   AUDIT_SITE=tiktok-ads AUDIT_TAG=tt node scripts/ga-visual-audit.cjs     (TikTok Ads trio)
//   AUDIT_SITE=chatgpt-ads AUDIT_TAG=cg node scripts/ga-visual-audit.cjs    (ChatGPT Ads trio)
//
// Output: .sites-runtime/visual-audit/<tag>/{shots/*.png, report.json, sheet-<page>-<w>-<n>.png}
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BASE = process.env.AUDIT_BASE || 'http://127.0.0.1:4173';
const TAG = process.env.AUDIT_TAG || 'latest';
const OUT = path.resolve('.sites-runtime/visual-audit', TAG);
const SHOTS = path.join(OUT, 'shots');
const PAGES = (process.env.AUDIT_PAGES || 'p1,p2,p3').split(',');
const WIDTHS = (process.env.AUDIT_W || '1440,390').split(',').map(Number);
const PER_SHEET = 24;
const SITE = process.env.AUDIT_SITE || 'google-ads';
const URLS = {
  p1: `/dich-vu/quang-cao-da-kenh/${SITE}/`,
  p2: `/dich-vu/quang-cao-da-kenh/${SITE}/chon-cach-chay/`,
  p3: `/dich-vu/quang-cao-da-kenh/${SITE}/chi-phi-hieu-qua/`
};

// Simulations outside a workbench. [selector, tab selector inside it or '']
const BLOCKS = [
  ['.hero-stage', ''],
  ['.pick-art', ''],
  ['.v-machine', ''],
  ['.meas', '.v-lp-btn'],
  ['.files', ''],
  ['.path-cards', ''],
  ['.diag-list', ''],
  ['.v-pipeline', '[role=tab]'],
  ['.v-funnel', '[role=tab]'],
  ['.sc-road', '[role=tab]'],
  ['.sc-faq', '[role=tab]'],
  ['.checklist', ''],
  ['.tta-map', ''],
  ['.tt-vat', ''],
  ['.cg-pr-art', ''],
  ['.cg-vs', ''],
  ['.cg-tax', ''],
  ['main form', '']
];

// Runs in the page: every rule the prompt asks to check.
function measure(el) {
  const out = {overflow: [], covered: [], emptyImg: [], longTitle: [], smallText: [], stretched: [], rail: [], logo: []};
  const box = el.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const clip = s => s.trim().replace(/\s+/g, ' ').slice(0, 28);
  const hidden = n => {
    for (let a = n; a && a !== el.parentElement; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return true;
    }
    return !n.getClientRects().length;
  };
  // Elements that float over content: the shop's call / chat bubbles and
  // anything the site pins to the screen.
  const floats = [...document.querySelectorAll('.sc-fab, .c-tap, [class*="float"]')]
    .concat([...document.querySelectorAll('body *')].filter(n => getComputedStyle(n).position === 'fixed'))
    .filter(n => {
      if (hidden(n) || n.closest('header, .site-header, .panel-toc')) return false;
      // Full-screen backdrops (the sky behind the page) are not buttons.
      const r = n.getBoundingClientRect();
      const cs = getComputedStyle(n);
      return cs.pointerEvents !== 'none' && r.width * r.height < innerWidth * innerHeight * .25;
    });

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode;
    const p = t.parentElement;
    if (!t.textContent.trim() || hidden(p)) continue;
    const range = document.createRange();
    range.selectNodeContents(t);
    const rects = [...range.getClientRects()].filter(r => r.width > 1);
    if (!rects.length) continue;
    const cs = getComputedStyle(p);
    const deco = p.closest('.demo-tag, .stage-cap, figcaption, [aria-hidden="true"]');

    // 1. Past its box or the screen. Text a carousel or window clips out of
    //    view on purpose is not shown, so only what is visible is checked;
    //    text sliced in half by a clip that is not a scroller counts.
    const shown = [];
    for (const r of rects) {
      let v = {left: r.left, right: r.right, top: r.top, bottom: r.bottom};
      let sliced = false;
      for (let a = p.parentElement; a && a !== document.body; a = a.parentElement) {
        const acs = getComputedStyle(a);
        if (acs.overflowX === 'visible' && acs.overflowY === 'visible') continue;
        const ar = a.getBoundingClientRect();
        const nv = {left: Math.max(v.left, ar.left), right: Math.min(v.right, ar.right), top: Math.max(v.top, ar.top), bottom: Math.min(v.bottom, ar.bottom)};
        const scroller = /auto|scroll/.test(acs.overflowX + acs.overflowY) || /carousel|rail|strip|scroll|track|stack/.test(a.className);
        if (nv.right - nv.left > 1 && nv.bottom - nv.top > 1 && (nv.right - nv.left < v.right - v.left - 2) && !scroller) sliced = true;
        v = nv;
      }
      if (v.right - v.left > 1 && v.bottom - v.top > 1) shown.push(v);
      if (sliced && v.right - v.left > 1) out.overflow.push(`${clip(t.textContent)} bị cắt nửa`);
    }
    const loose = el.matches('.hero-stage');
    for (const r of shown) {
      if (r.right > vw + 1 || r.left < -1) { out.overflow.push(`${clip(t.textContent)} ra ngoài màn hình`); break; }
      if (!loose && (r.right > box.right + 1 || r.left < box.left - 1)) { out.overflow.push(`${clip(t.textContent)} ra ngoài khối`); break; }
    }
    if (!shown.length) continue;
    if (!seen.has(p)) {
      seen.add(p);
      if (/hidden|clip/.test(cs.overflowX) && p.scrollWidth > p.clientWidth + 1 && cs.textOverflow !== 'clip' && !p.closest('.mk-url, .sc-addr')) {
        out.overflow.push(`${clip(t.textContent)} bị cắt ngang`);
      }
      // 4. Ad titles: at most 2 lines, and none cut off by the clamp.
      // Facebook mocks: the .fbm-* headings and the headline of a link bar.
      const fbTitle = /fbm-(ph|fh|ixh|rtitle)\b|ttm-(ph|fh)\b/.test(p.className)
        || (p.tagName === 'B' && p.parentElement.parentElement.classList.contains('fbm-ctabar'));
      if (p.closest('[data-mock], .device, .browser') && (fbTitle || /title|mk-t\b|ad-title|mk-pn|mk-vt|cgm-(adt|pn)\b/.test(p.className))) {
        const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.3;
        const lines = Math.round((p.offsetHeight || p.getBoundingClientRect().height) / lh);
        if (lines > 2 || p.scrollHeight > p.clientHeight + 2) out.longTitle.push(`${clip(t.textContent)} (${lines} dòng)`);
      }
      // Small text (A2), ignoring captions.
      if (!deco) {
        let scale = 1;
        for (let a = p; a && a !== document.body; a = a.parentElement) {
          const tr = getComputedStyle(a).transform;
          if (tr && tr !== 'none') scale *= Math.hypot(new DOMMatrix(tr).a, new DOMMatrix(tr).b);
        }
        const px = parseFloat(cs.fontSize) * scale;
        if (px < 9.95) out.smallText.push(`${clip(t.textContent)} ${px.toFixed(1)}px`);
      }
    }
    // 2. Covered by a floating button that is not part of the text itself.
    for (const f of floats) {
      if (f.contains(p) || p.contains(f)) continue;
      const fr = f.getBoundingClientRect();
      const hit = shown.some(r => r.left < fr.right - 2 && r.right > fr.left + 2 && r.top < fr.bottom - 2 && r.bottom > fr.top + 2);
      if (hit) { out.covered.push(`${clip(t.textContent)} ← ${f.className || f.tagName}`); break; }
    }
  }
  // 2b. Corner labels ("MÔ PHỎNG", "CÀI ĐẶT MẪU") hidden under the mock.
  for (const tag of el.querySelectorAll('.demo-tag')) {
    if (hidden(tag)) continue;
    const r = tag.getBoundingClientRect();
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    if (top && !tag.contains(top)) out.covered.push(`${clip(tag.textContent)} ← ${top.className || top.tagName}`);
  }

  // 3. Empty pictures: broken or not yet loaded images, picture frames with
  //    nothing inside.
  for (const img of el.querySelectorAll('img')) {
    if (hidden(img)) continue;
    const r = img.getBoundingClientRect();
    if (!img.complete || !img.naturalWidth || r.width < 2 || r.height < 2) out.emptyImg.push(img.getAttribute('src') || '(không src)');
    const cs = getComputedStyle(img);
    const nat = img.naturalWidth / img.naturalHeight;
    if (img.naturalWidth && !/cover|contain/.test(cs.objectFit) && Math.abs(nat / (r.width / r.height) - 1) > .04) {
      out.stretched.push(`${img.getAttribute('src')} ${nat.toFixed(2)}→${(r.width / r.height).toFixed(2)}`);
    }
  }
  for (const frame of el.querySelectorAll('.mk-img, .photo, .af-thumb:not(.is-text):not(.is-ico)')) {
    if (hidden(frame)) continue;
    if (!frame.querySelector('img, svg, video') && getComputedStyle(frame).backgroundImage === 'none') out.emptyImg.push(`khung ${frame.className} trống`);
  }
  // 5. TikTok feed: caption, name, sound line and buttons stay clear of the
  //    action rail on the right (like, comment, share, disc).
  for (const rail of el.querySelectorAll('.ttm-rail, .tth-rail')) {
    if (hidden(rail)) continue;
    const rr = rail.getBoundingClientRect();
    const screen = rail.closest('.mk-scr, .tth-fy, .tth-live') || rail.parentElement;
    const over = r => r.left < rr.right - 1 && r.right > rr.left + 1 && r.top < rr.bottom - 1 && r.bottom > rr.top + 1;
    for (const n of screen.querySelectorAll('.ttm-meta, .ttm-cta, .ttm-anchor, .ttm-pin, .ttm-catrow, .ttm-inline, .ttm-tvmeta, .tth-meta, .tth-cta')) {
      if (hidden(n) || rail.contains(n)) continue;
      if (over(n.getBoundingClientRect())) out.rail.push(`${n.className.split(' ')[0]} dưới cột nút`);
    }
  }
  // 6. No platform logos: pictures, drawn marks or classes named after them.
  const brand = /tik\s?tok|capcut|lemon8|pangle|douyin|facebook|instagram|messenger|openai|chatgpt/i;
  for (const img of el.querySelectorAll('img')) {
    const s = (img.getAttribute('src') || '') + ' ' + (img.getAttribute('alt') || '');
    if (brand.test(s) || /logo/i.test(s)) out.logo.push('ảnh ' + clip(s));
  }
  for (const svg of el.querySelectorAll('svg')) {
    const s = [svg.getAttribute('aria-label'), svg.querySelector('title')?.textContent, svg.getAttribute('class')].filter(Boolean).join(' ');
    if (brand.test(s) || /logo|wordmark/i.test(s)) out.logo.push('svg ' + clip(s));
  }
  for (const n of el.querySelectorAll('[class*="logo"], [class*="wordmark"]')) {
    // Text-only or icon-only tiles (.c-logo, .sp-logo) are placeholders, not brand marks.
    if (n.querySelector('img, svg:not(.ico)') || brand.test(n.textContent)) out.logo.push('class ' + n.className);
  }
  for (const k of Object.keys(out)) out[k] = [...new Set(out[k])];
  return out;
}

const ISSUE_KEYS = ['overflow', 'covered', 'emptyImg', 'longTitle', 'smallText', 'stretched', 'rail', 'logo'];
const ISSUE_VI = {overflow: 'chữ tràn', covered: 'bị che', emptyImg: 'ảnh trống', longTitle: 'tiêu đề > 2 dòng', smallText: 'chữ < 10px', stretched: 'ảnh méo', rail: 'bị cột nút che', logo: 'logo nền tảng'};
const issuesOf = r => r.error ? [r.error] : ISSUE_KEYS.filter(k => r[k] && r[k].length).map(k => `${ISSUE_VI[k]} ${r[k].length}`);

async function eager(page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
  });
}

async function run(page, key, w, rows) {
  let n = 0;
  const snap = async (loc, label) => {
    n++;
    const file = `${key}-${w}-${String(n).padStart(3, '0')}.png`;
    try {
      await loc.scrollIntoViewIfNeeded({timeout: 3000});
      await page.waitForTimeout(150);
      const m = await loc.evaluate(measure);
      await loc.screenshot({path: path.join(SHOTS, file), animations: 'disabled', timeout: 8000});
      rows.push({page: key, w, label, file, ...m});
    } catch (e) {
      rows.push({page: key, w, label, error: String(e).split('\n')[0]});
    }
  };

  // Page 01 keeps six campaign panels; every other page has one "scope".
  const scopes = key === 'p1'
    ? await page.$$eval('.picker .pick', els => els.map(e => e.dataset.pick))
    : [''];
  for (const scope of scopes) {
    const root = scope ? `#panel-${scope} ` : 'main ';
    if (scope) {
      await page.locator(`#tab-${scope}`).click({force: true});
      await page.waitForTimeout(300);
      await eager(page);
    }
    // Workbenches: one capture per pane.
    const benches = page.locator(`${root}.workbench`);
    for (let b = 0; b < await benches.count(); b++) {
      const bench = benches.nth(b);
      const where = await bench.evaluate(e => (e.closest('section[id]') || {}).id || '');
      const btns = bench.locator('[data-format]');
      for (let i = 0; i < await btns.count(); i++) {
        const btn = btns.nth(i);
        const fid = await btn.getAttribute('data-format');
        const label = (await btn.innerText()).trim().replace(/\s+/g, ' ');
        await btn.click({force: true});
        await page.waitForTimeout(200);
        await snap(bench.locator(`[data-format-pane="${fid}"]`), `${scope ? scope + ' · ' : ''}${where} · ${label}`);
      }
    }
    // Other simulations, per tab state.
    for (const [sel, tabSel] of BLOCKS) {
      if (scope && /hero|pick-art/.test(sel) && scope !== scopes[0]) continue;
      const blocks = page.locator(/hero|pick-art/.test(sel) ? sel : root + sel);
      for (let b = 0; b < await blocks.count(); b++) {
        const block = blocks.nth(b);
        if (!(await block.isVisible())) continue;
        const where = await block.evaluate(e => (e.closest('section[id]') || {}).id || '');
        const tabs = tabSel ? block.locator(tabSel) : null;
        const count = tabs ? await tabs.count() : 0;
        if (!count) { await snap(block, `${scope ? scope + ' · ' : ''}${where} · ${sel}`); continue; }
        for (let i = 0; i < count; i++) {
          const t = tabs.nth(i);
          if (!(await t.isVisible())) continue;
          const label = ((await t.innerText()) || (await t.getAttribute('aria-label')) || '').trim().replace(/\s+/g, ' ').slice(0, 40);
          await t.click({force: true});
          await page.waitForTimeout(250);
          await snap(block, `${scope ? scope + ' · ' : ''}${where} · ${label}`);
          // FAQ / pipeline tabs toggle: close again so the next one opens alone.
          if (/v-pipeline/.test(sel)) await t.click({force: true});
        }
      }
    }
  }
}

function sheetHtml(rows, title, w) {
  const cell = r => {
    const issues = issuesOf(r);
    const detail = r.error ? '' : ISSUE_KEYS.flatMap(k => (r[k] || []).slice(0, 2)).slice(0, 3).join('<br>');
    return `<figure class="${issues.length ? 'bad' : 'ok'}">`
      + (r.file ? `<img src="shots/${r.file}">` : '')
      + `<figcaption><b>${r.label}</b><span>${issues.join(' · ') || 'đạt'}</span>${detail ? `<em>${detail}</em>` : ''}</figcaption></figure>`;
  };
  return `<!doctype html><meta charset="utf-8"><style>
    body{margin:0;padding:24px;background:#eef1f5;font:13px/1.4 system-ui,sans-serif;color:#1d2433}
    h1{font-size:18px;margin:0 0 16px}
    .g{display:grid;grid-template-columns:repeat(${w > 800 ? 3 : 6},1fr);gap:14px;align-items:start}
    figure{margin:0;background:#fff;border-radius:10px;padding:8px;box-shadow:0 1px 3px #0002}
    figure.bad{outline:3px solid #e5484d}
    img{display:block;width:100%;height:auto;max-height:${w > 800 ? 420 : 640}px;object-fit:contain;object-position:top;background:#f6f7f9;border-radius:6px}
    figcaption{display:flex;flex-direction:column;gap:2px;margin-top:6px}
    figcaption span{color:#2e7d32;font-size:12px}.bad figcaption span{color:#c62828}
    figcaption em{font-style:normal;font-size:11px;color:#8a4b4b}
  </style><h1>${title}</h1><div class="g">${rows.map(cell).join('')}</div>`;
}

(async () => {
  fs.rmSync(OUT, {recursive: true, force: true});
  fs.mkdirSync(SHOTS, {recursive: true});
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  const rows = [];
  for (const key of PAGES) {
    for (const w of WIDTHS) {
      const page = await browser.newPage({viewport: {width: w, height: w > 800 ? 900 : 844}, deviceScaleFactor: 1, reducedMotion: 'reduce'});
      const errors = [];
      page.on('pageerror', e => errors.push(String(e)));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      await page.goto(BASE + URLS[key], {waitUntil: 'networkidle'});
      await eager(page);
      // The sticky site header and chapter index would sit on top of every
      // capture; they are page chrome, not part of a simulation.
      await page.addStyleTag({content: 'header,.site-header,.pow-header,.panel-toc{visibility:hidden}'});
      const before = rows.length;
      await run(page, key, w, rows);
      console.log(`${key} @${w}: ${rows.length - before} ảnh, lỗi console ${errors.length}${errors.length ? ' — ' + errors.join(' | ') : ''}`);
      await page.close();
    }
  }
  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(rows, null, 2));

  const sheets = [];
  for (const key of PAGES) {
    for (const w of WIDTHS) {
      const mine = rows.filter(r => r.page === key && r.w === w);
      for (let s = 0; s * PER_SHEET < mine.length; s++) {
        const part = mine.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
        const name = `sheet-${key}-${w}-${s + 1}`;
        const file = path.join(OUT, name + '.html');
        const bad = part.filter(r => issuesOf(r).length).length;
        fs.writeFileSync(file, sheetHtml(part, `Audit ${TAG} · ${key} · ${w}px · tờ ${s + 1} · ${part.length} ảnh, ${bad} có vấn đề`, w));
        const page = await browser.newPage({viewport: {width: 1800, height: 1000}});
        await page.goto('file:///' + file.replace(/\\/g, '/'));
        await page.waitForLoadState('load');
        await page.screenshot({path: path.join(OUT, name + '.png'), fullPage: true});
        await page.close();
        sheets.push(name + '.png');
      }
    }
  }
  const bad = rows.filter(r => issuesOf(r).length);
  for (const r of bad) console.log(`  ✗ ${r.page}@${r.w} ${r.label}: ${issuesOf(r).join(', ')} — ${ISSUE_KEYS.flatMap(k => r[k] || []).slice(0, 4).join(' | ')}`);
  console.log(`Tổng ${rows.length} ảnh, ${bad.length} có vấn đề, ${sheets.length} tờ → ${OUT}`);
  await browser.close();
})();
