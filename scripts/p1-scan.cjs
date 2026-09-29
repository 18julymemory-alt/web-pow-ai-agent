// Full-page scan of landing page 01 in viewport-sized slices, for design review.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const OUT = path.resolve('screenshots');
const URL_ = process.env.SCAN_URL || 'http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/google-ads/';
const TAG = process.env.SCAN_TAG || 'p1';
const WIDTH = Number(process.env.SCAN_W || 1440);
const HEIGHT = Number(process.env.SCAN_H || 900);
const STEP = Number(process.env.SCAN_STEP || 820);

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  const page = await browser.newPage({viewport: {width: WIDTH, height: HEIGHT}, deviceScaleFactor: 1});
  await page.goto(URL_, {waitUntil: 'networkidle'});
  // Walk the page once so every .rv block reveals before we capture.
  const total = await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      scrollTo({top: y, behavior: 'instant'});
      await new Promise(r => setTimeout(r, 40));
    }
    scrollTo({top: 0, behavior: 'instant'});
    return document.body.scrollHeight;
  });
  await page.waitForTimeout(500);

  let n = 0;
  for (let y = 0; y < total && n < 20; y += STEP, n++) {
    await page.evaluate(t => scrollTo({top: t, behavior: 'instant'}), y);
    await page.waitForTimeout(220);
    await page.screenshot({
      path: path.join(OUT, `${TAG}-${String(n).padStart(2, '0')}.png`),
      animations: 'disabled',
      timeout: 60000
    });
  }
  console.log(`height ${total}px, ${n} slices at ${WIDTH}x${HEIGHT}`);
  await browser.close();
})();
