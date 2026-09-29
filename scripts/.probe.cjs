// Close-ups for the step 2 review: picker, chapter 03 and chapter 04.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const fs = require('fs');
const OUT = path.resolve('screenshots/review/step2/close');
fs.mkdirSync(OUT, {recursive: true});

(async () => {
  const browser = await chromium.launch({executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true});
  for (const w of [1440, 390]) {
    const page = await browser.newPage({viewport: {width: w, height: 900}, deviceScaleFactor: 1});
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto('http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/google-ads/', {waitUntil: 'networkidle'});
    await page.addStyleTag({content: 'header,.site-header,nav.site-nav,.panel-toc{visibility:hidden}'});
    const snap = async (sel, name) => {
      const el = page.locator(sel).first();
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await el.screenshot({path: path.join(OUT, `${name}-${w}.png`), animations: 'disabled'});
    };
    await snap('.picker', 'picker');
    for (const id of ['search', 'video']) {
      await page.locator(`#tab-${id}`).click();
      await page.waitForTimeout(500);
      await snap(`#ch-files-${id}`, `files-${id}`);
      await snap(`#ch-measure-${id}`, `measure-${id}`);
    }
    await page.locator('#tab-search').click();
    await page.waitForTimeout(400);
    const tabs = page.locator('#ch-measure-search .meas [role=tab]');
    const n = await tabs.count();
    const labels = [];
    for (let i = 0; i < n; i++) {
      await tabs.nth(i).click();
      labels.push(await tabs.nth(i).innerText());
      await page.waitForTimeout(1300);
      await snap('#ch-measure-search .meas', `meas-search-t${i}`);
    }
    console.log(w, 'tabs:', labels.join(' | '), 'counts:',
      await page.locator('#ch-measure-search td[data-key]').allInnerTexts(), 'errors:', errors.length);
    await page.close();
  }
  await browser.close();
})();
