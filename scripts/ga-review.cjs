// Review captures for the Google Ads visual redesign: full-page shots at
// desktop 1440 and mobile 390, plus console errors, horizontal overflow and a
// rough text-contrast audit. REVIEW_TAG names the output folder.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://127.0.0.1:4173';
const TAG = process.env.REVIEW_TAG || 'step1';
const OUT = path.resolve('screenshots/review', TAG);
const PAGES = (process.env.REVIEW_PAGES || 'p1,p2,p3,kit').split(',');
const URLS = {
  p1: '/dich-vu/quang-cao-da-kenh/google-ads/',
  p2: '/dich-vu/quang-cao-da-kenh/google-ads/chon-cach-chay/',
  p3: '/dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/',
  kit: '/__ga-visuals/'
};
const WIDTHS = (process.env.REVIEW_W || '1440,390').split(',').map(Number);

(async () => {
  fs.mkdirSync(OUT, {recursive: true});
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  for (const key of PAGES) {
    for (const w of WIDTHS) {
      const page = await browser.newPage({viewport: {width: w, height: w > 800 ? 900 : 844}, deviceScaleFactor: 1});
      const errors = [];
      page.on('console', m => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', e => errors.push(String(e)));
      await page.goto(BASE + URLS[key], {waitUntil: 'networkidle'});
      const height = await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          scrollTo({top: y, behavior: 'instant'});
          await new Promise(r => setTimeout(r, 30));
        }
        scrollTo({top: 0, behavior: 'instant'});
        return document.body.scrollHeight;
      });
      await page.waitForTimeout(400);
      const audit = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflow = doc.scrollWidth - doc.clientWidth;
        const wide = [];
        if (overflow > 0) {
          for (const el of document.querySelectorAll('main *')) {
            const r = el.getBoundingClientRect();
            if (r.right > doc.clientWidth + 1 && r.width > 0 && getComputedStyle(el).visibility !== 'hidden') {
              wide.push((el.className && el.className.baseVal === undefined ? el.className : el.tagName) + ' ' + Math.round(r.right));
              if (wide.length > 8) break;
            }
          }
        }
        // Contrast: text colour vs first solid ancestor background.
        const rgb = s => (s.match(/[\d.]+/g) || []).map(Number);
        const lum = ([r, g, b]) => {
          const f = v => (v /= 255) <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
          return .2126 * f(r) + .7152 * f(g) + .0722 * f(b);
        };
        const bgOf = el => {
          for (let n = el; n; n = n.parentElement) {
            const cs = getComputedStyle(n);
            const c = rgb(cs.backgroundColor);
            if (c.length >= 3 && (c[3] === undefined || c[3] > .85)) return c;
            if (cs.backgroundImage.includes('linear-gradient')) {
              // a solid gradient (cards) counts as the background: use its last stop
              const stops = cs.backgroundImage.match(/rgba?\([^)]+\)/g) || [];
              const last = stops.length ? rgb(stops[stops.length - 1]) : [];
              if (last.length >= 3 && (last[3] === undefined || last[3] > .85)) return last;
            }
            if (cs.backgroundImage.includes('gradient') && n.matches('.card,[role=tab],.v-more,.lp-section,.hero,.v-core')) return [15, 30, 51];
          }
          return [7, 17, 31];
        };
        const low = [];
        const seen = new Set();
        for (const el of document.querySelectorAll('main *')) {
          const t = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
          if (!t) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === 'hidden' || cs.display === 'none' || el.closest('[hidden],details:not([open]) > :not(summary),[aria-hidden=true]')) continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          const fg = rgb(cs.color);
          if (fg[3] !== undefined && fg[3] < .5) continue;
          // gradient-filled display type (big chapter numbers) paints its own colour
          if (cs.webkitBackgroundClip === 'text' || cs.backgroundClip === 'text') continue;
          const L1 = lum(fg), L2 = lum(bgOf(el));
          const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
          const size = parseFloat(cs.fontSize);
          const need = size >= 18.66 || (size >= 14 && Number(cs.fontWeight) >= 700) ? 3 : 4.5;
          if (ratio < need) {
            const id = (typeof el.className === 'string' ? el.className : el.tagName) + '|' + cs.color;
            if (seen.has(id)) continue;
            seen.add(id);
            low.push(`${ratio.toFixed(2)} ${id} "${el.textContent.trim().slice(0, 30)}"`);
          }
        }
        const small = [...document.querySelectorAll('main *')].filter(el => {
          const t = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);
          return t && parseFloat(getComputedStyle(el).fontSize) < 11 && !el.closest('.v-stage,.browser,.phone-f,.v-report,.v-kit,.v-merchant,.v-tags,.v-calls,.v-ga4,.v-utm,.v-ec,.v-offline,[aria-hidden=true]');
        }).length;
        return {overflow, wide, low: low.slice(0, 25), lowCount: low.length, small};
      });
      // Chromium refuses a single capture past ~16k px, so tall pages come in parts.
      const PART = 12000;
      const parts = Math.ceil(height / PART);
      for (let i = 0; i < parts; i++) {
        const file = path.join(OUT, parts > 1 ? `${key}-${w}-${i + 1}.png` : `${key}-${w}.png`);
        const clip = {x: 0, y: i * PART, width: w, height: Math.min(PART, height - i * PART)};
        await page.screenshot({path: file, fullPage: true, clip, animations: 'disabled', timeout: 120000});
      }
      console.log(`${key} @${w}: h=${height} overflow=${audit.overflow} small<11px=${audit.small} lowContrast=${audit.lowCount} errors=${errors.length}`);
      if (audit.wide.length) console.log('  wide:', audit.wide.join(' ; '));
      if (audit.low.length) console.log('  low:\n   ' + audit.low.join('\n   '));
      if (errors.length) console.log('  errors:', errors.slice(0, 5).join(' | '));
      await page.close();
    }
  }
  await browser.close();
})();
