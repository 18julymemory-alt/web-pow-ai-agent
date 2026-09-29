// Total bytes each landing page pulls over the wire, per resource type.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const BASE = 'http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/google-ads/';
(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  for (const [u, label] of [['', '01 formats'], ['chon-cach-chay/', '02 goals'], ['chi-phi-hieu-qua/', '03 budget']]) {
    const page = await browser.newPage({viewport: {width: 1440, height: 900}});
    const seen = new Map();
    page.on('response', async r => {
      try {
        const body = await r.body();
        seen.set(r.url(), body.length);
      } catch { /* redirects and aborted requests have no body */ }
    });
    await page.goto(BASE + u, {waitUntil: 'networkidle'});
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 900) {
        scrollTo(0, y);
        await new Promise(r => setTimeout(r, 30));
      }
    });
    await page.waitForTimeout(400);
    let total = 0;
    const big = [];
    for (const [url, size] of seen) {
      total += size;
      big.push([size, url.replace('http://127.0.0.1:4173', '')]);
    }
    big.sort((a, b) => b[0] - a[0]);
    console.log(`\n${label}: ${(total / 1024).toFixed(1)} KB over ${seen.size} requests`);
    big.slice(0, 6).forEach(([s, url]) => console.log(`   ${(s / 1024).toFixed(1).padStart(7)} KB  ${url}`));
    await page.close();
  }
  await browser.close();
})();
