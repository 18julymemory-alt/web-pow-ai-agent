const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  try {
    const page = await browser.newPage({viewport: {width: 1440, height: 950}});
    const artifactDir = 'C:/Users/ADMIN/.gemini/antigravity-ide/brain/37b628b0-f5ce-4a20-8dff-e46f472b8dec';
    await page.goto('http://127.0.0.1:4173/dich-vu/quang-cao-da-kenh/tiktok-ads/', {waitUntil: 'networkidle'});
    
    // 1. Hero
    await page.screenshot({path: path.join(artifactDir, 'tiktok_final_hero.png')});
    
    // 2. Sheet 01 (Tổng quan)
    await page.evaluate(() => document.querySelector('#guide').scrollIntoView());
    await page.waitForTimeout(300);
    await page.screenshot({path: path.join(artifactDir, 'tiktok_final_sheet01.png')});
    
    // 3. Sheet 04 (Định dạng & vị trí)
    await page.locator('#guide .ga-sheet-tabs [role="tab"]').nth(3).click();
    await page.waitForTimeout(300);
    await page.screenshot({path: path.join(artifactDir, 'tiktok_final_sheet04.png')});

    // 4. Sheet 08 (Ngân sách)
    await page.locator('#guide .ga-sheet-tabs [role="tab"]').nth(7).click();
    await page.waitForTimeout(300);
    await page.screenshot({path: path.join(artifactDir, 'tiktok_final_sheet08.png')});

    console.log('Final screenshots captured successfully!');
  } finally {
    await browser.close();
  }
})();
