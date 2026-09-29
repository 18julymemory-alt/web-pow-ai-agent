// Review shots for landing page 03.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');
const OUT = path.resolve('screenshots');
const URL_ = 'http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/google-ads/chi-phi-hieu-qua/';
const SECTIONS = ['chi-phi', 'dat-thau', 'do-luong', 'trien-khai', 'chuan-bi', 'faq', 'lien-he'];

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  for (const [name, width, height, mobile] of [['1440', 1440, 900, false], ['390', 390, 844, true]]) {
    const page = await browser.newPage({viewport: {width, height}, isMobile: mobile,
      deviceScaleFactor: 1, hasTouch: mobile});
    await page.goto(URL_, {waitUntil: 'networkidle'});
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        scrollTo({top: y, behavior: 'instant'}); await new Promise(r => setTimeout(r, 40));
      }
      scrollTo({top: 0, behavior: 'instant'});
    });
    await page.waitForTimeout(400);
    await page.screenshot({path: path.join(OUT, `p3-${name}-hero.png`)});
    for (const id of SECTIONS) {
      await page.evaluate(i => {
        const top = document.getElementById(i).getBoundingClientRect().top + scrollY - 92;
        scrollTo({top, behavior: 'instant'});
      }, id);
      await page.waitForTimeout(800);
      await page.screenshot({path: path.join(OUT, `p3-${name}-${id}.png`)});
    }
    await page.close();
  }
  await browser.close();
  console.log('shots done');
})();
