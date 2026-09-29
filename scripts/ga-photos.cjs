// Turns the Nhà Thơm photos listed in ANH-CAN-TAO.md into the WebP pairs the
// Google Ads pages use (GOOGLE_ADS_FIX_VISUALS_PROMPT.md, PHẦN A3).
//
//   1. Put each photo in dist/assets/product-photos/nhathom/<name>.(png|jpg|jpeg|webp)
//   2. node scripts/ga-photos.cjs
//   3. Rebuild: node scripts/build-service-pages.mjs --google-only
//
// Each photo is centre-cropped to its ratio and saved as <name>@1x.webp and
// <name>@2x.webp in dist/assets/ga/. The page switches from the SVG stand-in to
// the photo on its own once both files exist. Quality starts at 0.86 and steps
// down to 0.82; if the file is still over budget the size shrinks by 10 % until
// it fits (thumbnails 40 KB, scenes 150 KB).
//
// No image library is installed; Edge (already used by the test scripts) does
// the decode and re-encode through a canvas.
const {chromium} = require('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const SRC = path.resolve('dist/assets/product-photos/nhathom');
const OUT = path.resolve('dist/assets/ga');
const KB = 1024;

// [name, ratio w, ratio h, @2x width, budget per file]
const PHOTOS = [
  ['nen-thom', 1, 1, 800, 40 * KB],
  ['tinh-dau', 1, 1, 800, 40 * KB],
  ['kem-duong', 1, 1, 800, 40 * KB],
  ['khuech-tan', 1, 1, 800, 40 * KB],
  ['sua-tam', 1, 1, 800, 40 * KB],
  ['khan-cotton', 1, 1, 800, 40 * KB],
  ['scene-191', 1200, 628, 1200, 150 * KB],
  ['scene-45', 4, 5, 960, 150 * KB],
  ['scene-916', 9, 16, 720, 150 * KB],
  ['video-169', 16, 9, 1280, 150 * KB],
  ['service-ac', 3, 2, 1200, 150 * KB]
];
const EXT = ['.png', '.jpg', '.jpeg', '.webp'];

(async () => {
  const todo = PHOTOS.map(p => {
    const file = EXT.map(e => path.join(SRC, p[0] + e)).find(f => fs.existsSync(f));
    if (!file) console.log(p[0].padEnd(12), 'chưa có ảnh — giữ ảnh SVG thay thế');
    return file ? [file, ...p] : null;
  }).filter(Boolean);
  if (!todo.length) return;

  const browser = await chromium.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('about:blank');

  for (const [file, name, rw, rh, width2x, budget] of todo) {
    const mime = /\.png$/i.test(file) ? 'png' : /\.webp$/i.test(file) ? 'webp' : 'jpeg';
    const data = fs.readFileSync(file).toString('base64');
    for (const [suffix, target] of [['@2x', width2x], ['@1x', Math.round(width2x / 2)]]) {
      const res = await page.evaluate(async ({data, mime, rw, rh, target, budget}) => {
        const img = new Image();
        img.src = `data:image/${mime};base64,` + data;
        await img.decode();
        // Centre crop to the frame ratio: never stretched.
        const ratio = rw / rh;
        let sw = img.naturalWidth, sh = sw / ratio;
        if (sh > img.naturalHeight) { sh = img.naturalHeight; sw = sh * ratio; }
        const sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) / 2;
        let w = Math.min(target, Math.round(sw));
        for (;;) {
          const c = document.createElement('canvas');
          c.width = w;
          c.height = Math.round(w / ratio);
          const g = c.getContext('2d');
          g.imageSmoothingQuality = 'high';
          g.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
          for (const q of [0.86, 0.84, 0.82]) {
            const url = c.toDataURL('image/webp', q);
            const bytes = Math.ceil((url.length - url.indexOf(',') - 1) * 3 / 4);
            if (bytes <= budget) return {url, w: c.width, h: c.height, q, source: [img.naturalWidth, img.naturalHeight]};
          }
          w = Math.round(w * 0.9);
        }
      }, {data, mime, rw, rh, target, budget});
      const buf = Buffer.from(res.url.split(',')[1], 'base64');
      fs.writeFileSync(path.join(OUT, name + suffix + '.webp'), buf);
      const note = res.w >= target ? ''
        : Math.min(res.source[0], res.source[1] * rw / rh) < target ? `  (ảnh gốc ${res.source.join('×')} nhỏ hơn cần — nên tạo lại lớn hơn)`
        : '  (thu nhỏ để vừa dung lượng)';
      console.log((name + suffix).padEnd(15), `${res.w}×${res.h}`, `q${res.q}`, (buf.length / KB).toFixed(1) + ' KB' + note);
    }
  }
  await browser.close();
})();
