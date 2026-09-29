const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });

  try {
    const page = await browser.newPage({viewport: {width: 1440, height: 900}});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));

    const viewports = [1440, 1280, 1024, 768, 430, 390, 360];

    // 1. Test /du-an/
    console.log('Testing /du-an/ ...');
    await page.goto('http://127.0.0.1:4173/du-an/');
    assert.equal(await page.title(), 'Dự Án POWAI | Marketing, Công Nghệ, Dữ Liệu & AI');

    for (const width of viewports) {
      await page.setViewportSize({width, height: 900});
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, `Overflow on /du-an/ at width ${width}`);
    }

    // Test filter interaction
    await page.setViewportSize({width: 1440, height: 900});
    const filterBtn = page.locator('.filter-btn[data-filter="Quảng cáo"]');
    await filterBtn.evaluate(b => b.click());
    await page.waitForTimeout(200);
    assert.match(await page.locator('#filter-results-count').innerText(), /2 \/ 4/);

    const allBtn = page.locator('.filter-btn[data-filter="all"]');
    await allBtn.evaluate(b => b.click());
    await page.waitForTimeout(200);
    assert.match(await page.locator('#filter-results-count').innerText(), /4 \/ 4/);

    // Test drawer interaction
    const openBtn = page.locator('[data-open-case="quoc-anh-door"]').first();
    await openBtn.evaluate(b => b.click());
    await page.waitForSelector('#case-drawer-overlay.open');
    assert.match(await page.locator('#drawer-title').innerText(), /Quốc Anh Door/);

    const closeBtn = page.locator('#case-drawer-close');
    await closeBtn.evaluate(b => b.click());
    await page.waitForFunction(() => !document.querySelector('#case-drawer-overlay').classList.contains('open'));

    // 2. Test /ve-pow/
    console.log('Testing /ve-pow/ ...');
    await page.goto('http://127.0.0.1:4173/ve-pow/');
    assert.equal(await page.title(), 'Về POWAI | Marketing × Technology × AI');

    for (const width of viewports) {
      await page.setViewportSize({width, height: 900});
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      assert.equal(overflow, false, `Overflow on /ve-pow/ at width ${width}`);
    }

    // 3. Test Navigation active states
    await page.goto('http://127.0.0.1:4173/du-an/');
    const activeProject = await page.locator('#pow-navigation a[aria-current="page"]').innerText();
    assert.equal(activeProject, 'Dự án');

    await page.goto('http://127.0.0.1:4173/ve-pow/');
    const activeAbout = await page.locator('#pow-navigation a[aria-current="page"]').innerText();
    assert.equal(activeAbout, 'Về POW');

    assert.deepEqual(errors, [], 'No JS errors allowed');
    console.log('PASS: All tests for /du-an/ and /ve-pow/ completed with 0 errors across all viewports!');
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
