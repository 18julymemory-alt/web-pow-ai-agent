// Cuts product thumbnails out of the existing POWAI product photos and saves
// them as small WebP files, so the Google surface mock-ups show real products
// instead of a coloured placeholder shape.
//
// No image library is installed; Chromium (already used by the test scripts)
// does the decode and re-encode through a canvas.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.resolve('dist/assets/ga');
const SRC = path.resolve('dist/assets/product-photos');

// [name, source file, x, y, w, h, output size]
// The commerce shot holds a six-product catalogue on a tablet screen: each tile
// is a clean product photo on a light backdrop, which is what a Shopping or
// Search ad thumbnail actually looks like.
const CROPS = [
  ['p1', 'commerce.png', 622, 300, 158, 172, 180],
  ['p2', 'commerce.png', 796, 300, 158, 172, 180],
  ['p3', 'commerce.png', 968, 300, 158, 172, 180],
  // The tablet is angled, so the lower row of tiles sits slightly right and down.
  ['p4', 'commerce.png', 640, 500, 152, 160, 180],
  ['p5', 'commerce.png', 818, 500, 152, 160, 180],
  ['p6', 'commerce.png', 992, 500, 152, 160, 180],
  // Wide scenes for banner-shaped ad slots and video frames.
  ['scene-desk', 'ads.png', 330, 20, 840, 560, 620],
  ['scene-shelf', 'commerce.png', 60, 240, 560, 470, 560],
  // The creative on its own, without the monitor around it: this is what a
  // display banner or a video frame actually shows.
  ['scene-hero', 'ads.png', 428, 178, 486, 300, 640],
  // Portrait crop for vertical video and Demand Gen story slots.
  ['scene-tall', 'commerce.png', 120, 250, 250, 444, 320]
];

(async () => {
  fs.mkdirSync(OUT, {recursive: true});
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('about:blank');

  for (const [name, file, x, y, w, h, size] of CROPS) {
    const data = fs.readFileSync(path.join(SRC, file)).toString('base64');
    const out = await page.evaluate(async ({data, x, y, w, h, size}) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + data;
      await img.decode();
      const scale = size / w;
      const c = document.createElement('canvas');
      c.width = Math.round(w * scale);
      c.height = Math.round(h * scale);
      const g = c.getContext('2d');
      g.imageSmoothingQuality = 'high';
      g.drawImage(img, x, y, w, h, 0, 0, c.width, c.height);
      return c.toDataURL('image/webp', 0.86);
    }, {data, x, y, w, h, size});

    const buf = Buffer.from(out.split(',')[1], 'base64');
    fs.writeFileSync(path.join(OUT, name + '.webp'), buf);
    console.log(name.padEnd(13), (buf.length / 1024).toFixed(1) + ' KB');
  }
  await browser.close();
})();
