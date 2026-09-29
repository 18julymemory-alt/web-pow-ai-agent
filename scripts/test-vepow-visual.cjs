const { chromium } = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    const failedRequests = [];

    page.on('pageerror', err => errors.push(err.message));
    page.on('requestfailed', req => failedRequests.push(req.url()));

    console.log('Navigating to http://127.0.0.1:4173/ve-pow/ ...');
    await page.goto('http://127.0.0.1:4173/ve-pow/', { waitUntil: 'networkidle' });

    // Check title
    console.log('Title:', await page.title());

    // Check Replay button click
    const replayBtn = page.locator('#replay-system-btn');
    if (await replayBtn.count() > 0) {
      console.log('Clicking replay button...');
      await replayBtn.evaluate(b => b.click());
      await page.waitForTimeout(400);
      const stageClass = await page.locator('#system-motion-stage').getAttribute('class');
      console.log('Stage class after click:', stageClass);
    }

    // Capture screenshots of each key section at 1440px
    console.log('Capturing section screenshots at 1440px...');
    const artifactDir = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/0deb1526-a5b1-4f9d-aea9-44744a406d5b';
    
    await page.locator('.about-hero').screenshot({ path: path.join(artifactDir, 'vepow_hero_1440.png') });
    await page.locator('#why-exist').screenshot({ path: path.join(artifactDir, 'vepow_why_exist_1440.png') });
    await page.locator('#method').screenshot({ path: path.join(artifactDir, 'vepow_method_1440.png') });
    await page.locator('#powai-universe').screenshot({ path: path.join(artifactDir, 'vepow_universe_1440.png') });
    await page.locator('#human-ai').screenshot({ path: path.join(artifactDir, 'vepow_human_ai_1440.png') });
    await page.locator('#principles').screenshot({ path: path.join(artifactDir, 'vepow_principles_1440.png') });
    await page.locator('.about-cta-section').screenshot({ path: path.join(artifactDir, 'vepow_cta_1440.png') });

    // Test responsive viewports and capture mobile
    const viewports = [1440, 1280, 1024, 768, 430, 390];
    for (const w of viewports) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.waitForTimeout(200);
      const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      console.log(`Viewport ${w}px overflow:`, hasOverflow);
    }

    // Capture full-page or key mobile sections at 390px
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(artifactDir, 'vepow_mobile_390_full.png'), fullPage: true });

    console.log('Errors:', errors);
    console.log('Failed requests:', failedRequests);
    console.log('DONE visual verification!');
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
