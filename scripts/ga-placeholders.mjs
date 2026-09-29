// Placeholder pictures for the Google Ads pages (sample brand "Nhà Thơm").
// No source photo meets the brief (straight-on product, clean background,
// >= 2x resolution), so each slot gets a flat, straight-on SVG drawing of the
// product until the real photo lands in dist/assets/product-photos/nhathom/.
// See ANH-CAN-TAO.md for the photo list; ga-crop-photos.cjs turns those
// photos into the WebP files that replace these.
//
//   node scripts/ga-placeholders.mjs
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('dist/assets/ga/ph');

// Shared paint: warm wall, wooden table, soft floor shadow.
const defs = `<defs>
<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6efe6"/><stop offset="1" stop-color="#eadccb"/></linearGradient>
<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c49a6c"/><stop offset="1" stop-color="#a47a4f"/></linearGradient>
<linearGradient id="lid" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9b6b3f"/><stop offset=".45" stop-color="#c79a68"/><stop offset="1" stop-color="#8d5f36"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e3dccf"/><stop offset=".3" stop-color="#fbf8f2"/><stop offset="1" stop-color="#d8cfc0"/></linearGradient>
<linearGradient id="amber" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a2c0e"/><stop offset=".35" stop-color="#9a5522"/><stop offset="1" stop-color="#4c240b"/></linearGradient>
<linearGradient id="olive" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f5b34"/><stop offset=".35" stop-color="#7a8a55"/><stop offset="1" stop-color="#465230"/></linearGradient>
<linearGradient id="white" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e4e1dc"/><stop offset=".35" stop-color="#ffffff"/><stop offset="1" stop-color="#d9d5ce"/></linearGradient>
<linearGradient id="black" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1b1b1b"/><stop offset=".4" stop-color="#474747"/><stop offset="1" stop-color="#151515"/></linearGradient>
<linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2b46a" stop-opacity=".75"/><stop offset="1" stop-color="#b9823c" stop-opacity=".85"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd996" stop-opacity=".75"/><stop offset="1" stop-color="#ffd996" stop-opacity="0"/></radialGradient>
<radialGradient id="shade" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#6b4a2c" stop-opacity=".32"/><stop offset="1" stop-color="#6b4a2c" stop-opacity="0"/></radialGradient>

</defs>`;

const shadow = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${(rx * .16).toFixed(1)}" fill="url(#shade)"/>`;

// Each product is drawn standing on y = 0, centred on x = 0, 200 units tall at
// most, so a scene can place and scale it with one transform.
const P = {
  candle: (lit = false) => shadow(0, 0, 78)
    + '<rect x="-62" y="-124" width="124" height="124" rx="12" fill="url(#glass)"/>'
    + '<rect x="-54" y="-104" width="108" height="98" rx="8" fill="#f7efe1"/>'
    + '<rect x="-40" y="-72" width="80" height="40" rx="3" fill="#fffaf2" stroke="#d8c9b3" stroke-width="1.5"/>'
    + '<path d="M-24 -58h48M-16 -46h32" stroke="#cdb99c" stroke-width="2" stroke-linecap="round"/>'
    + (lit
      ? '<circle cx="0" cy="-150" r="70" fill="url(#glow)"/><path d="M0 -104v-12" stroke="#3a2a1a" stroke-width="2"/>'
        + '<path d="M0 -150c7 10 9 20 0 34c-9 -14 -7 -24 0 -34Z" fill="#ffb347"/><path d="M0 -138c3 6 4 11 0 20c-4 -9 -3 -14 0 -20Z" fill="#fff3c4"/>'
      : '<rect x="-66" y="-146" width="132" height="26" rx="6" fill="url(#lid)"/>'
        + '<path d="M-54 -138h40M6 -131h44M-30 -126h26" stroke="#8a5a30" stroke-width="1.4" stroke-linecap="round" opacity=".6"/>'),

  dropper: () => shadow(0, 0, 44)
    + '<path d="M-34 -96c0-12 8-20 20-22h28c12 2 20 10 20 22v88a8 8 0 0 1-8 8h-52a8 8 0 0 1-8-8Z" fill="url(#amber)"/>'
    + '<rect x="-22" y="-78" width="44" height="46" rx="3" fill="#f6ecdd"/>'
    + '<path d="M-12 -64h24M-8 -52h16" stroke="#b99a74" stroke-width="2" stroke-linecap="round"/>'
    + '<path d="M-26 -90v70" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".22"/>'
    + '<rect x="-17" y="-140" width="34" height="24" rx="3" fill="url(#black)"/>'
    + '<path d="M-12 -140c-2-30 2-46 12-46s14 16 12 46Z" fill="url(#black)"/>',

  jar: () => shadow(0, 0, 80)
    + '<rect x="-70" y="-78" width="140" height="78" rx="14" fill="url(#white)"/>'
    + '<rect x="-74" y="-112" width="148" height="38" rx="8" fill="url(#black)"/>'
    + '<path d="M-60 -104h120" stroke="#fff" stroke-width="2" opacity=".15"/>'
    + '<rect x="-36" y="-58" width="72" height="30" rx="3" fill="#f3efe8" stroke="#dcd6cc" stroke-width="1.5"/>'
    + '<path d="M-20 -46h40" stroke="#c9c1b4" stroke-width="2" stroke-linecap="round"/>',

  diffuser: () => shadow(0, 0, 56)
    + '<g stroke="#6f4d31" stroke-width="3.2" stroke-linecap="round">'
    + '<path d="M-4 -120 -58 -262"/><path d="M-2 -120 -24 -282"/><path d="M0 -120 6 -290"/><path d="M2 -120 34 -276"/><path d="M4 -120 64 -250"/></g>'
    + '<path d="M-46 -104c0-8 6-14 14-14h64c8 0 14 6 14 14v96a8 8 0 0 1-8 8h-76a8 8 0 0 1-8-8Z" fill="url(#glass)" opacity=".92"/>'
    + '<path d="M-42 -58h84v50a6 6 0 0 1-6 6h-72a6 6 0 0 1-6-6Z" fill="url(#liquid)"/>'
    + '<rect x="-14" y="-132" width="28" height="18" rx="3" fill="url(#black)"/>'
    + '<rect x="-28" y="-94" width="56" height="28" rx="3" fill="#fffaf2" stroke="#d8c9b3" stroke-width="1.5"/>'
    + '<path d="M-38 -96v84" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>',

  pump: () => shadow(0, 0, 52)
    + '<path d="M-44 -176c0-14 10-22 24-22h40c14 0 24 8 24 22v168a8 8 0 0 1-8 8h-72a8 8 0 0 1-8-8Z" fill="url(#olive)"/>'
    + '<rect x="-30" y="-140" width="60" height="70" rx="3" fill="#f2ede1"/>'
    + '<path d="M-18 -120h36M-14 -106h28M-10 -92h20" stroke="#aab08e" stroke-width="2" stroke-linecap="round"/>'
    + '<path d="M-34 -176v158" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".2"/>'
    + '<rect x="-16" y="-214" width="32" height="18" rx="3" fill="url(#black)"/>'
    + '<rect x="-5" y="-240" width="10" height="28" fill="#2a2a2a"/>'
    + '<path d="M-16 -252h52a6 6 0 0 1 0 12h-52a6 6 0 0 1 0-12Z" fill="url(#black)"/>',

  towel: () => shadow(0, 0, 104)
    + '<rect x="-96" y="-44" width="192" height="44" rx="10" fill="#e9e1d3"/>'
    + weave(-90, -38, 180, 32)
    + '<rect x="-90" y="-86" width="180" height="46" rx="10" fill="#f1ebe0"/>'
    + weave(-84, -80, 168, 34)
    + '<path d="M-90 -50h180M-96 -8h192" stroke="#c9b89c" stroke-width="3"/>'
    + '<path d="M-78 -80c30 6 126 6 156 0" stroke="#fff" stroke-width="3" opacity=".6" fill="none"/>',

  sprig: () => '<g fill="none" stroke="#7d8b5b" stroke-width="3" stroke-linecap="round"><path d="M0 0c-4-60 6-110 28-150"/></g>'
    + '<g fill="#8e9d69">' + [[-6, -30, -30], [4, -58, 30], [0, -86, -35], [12, -110, 30], [16, -134, -25]]
      .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="18" ry="7" transform="rotate(${r} ${x} ${y})"/>`).join('') + '</g>'
};

// Honeycomb weave as short dashed rows (a <pattern> fill stalls some image decoders).
const weave = (x, y, w, h) => '<path d="' + Array.from({length: Math.floor(h / 6)}, (_, i) => `M${x + (i % 2) * 5} ${y + i * 6 + 3}h${w - 5}`).join('')
  + '" stroke="#d9cfbf" stroke-width="2" stroke-dasharray="6 4"/>';

const at = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s})">${body}</g>`;

// Straight-on product on a clean backdrop: wall, a thin table edge.
function product(draw, s = 1.2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${defs}`
    + '<rect width="400" height="400" fill="url(#wall)"/>'
    + '<rect y="300" width="400" height="100" fill="#e3d4c1"/><path d="M0 300h400" stroke="#d6c4ad" stroke-width="2"/>'
    + at(200, 340, s, draw) + '</svg>';
}

// "Góc thư giãn cuối ngày": lit candle, diffuser, towel, dropper, green sprig
// on a wooden table. Layout per ratio so nothing is cropped.
function scene(w, h, layout) {
  const table = Math.round(h * (w / h < 1 ? .6 : .7));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${defs}`
    + `<rect width="${w}" height="${h}" fill="url(#wall)"/>`
    + `<rect x="${w * .62}" y="${h * .08}" width="${w * .3}" height="${h * .42}" rx="6" fill="#fbf6ee" opacity=".7"/>`
    + `<rect y="${table}" width="${w}" height="${h - table}" fill="url(#wood)"/>`
    + `<path d="M0 ${table}h${w}" stroke="#8e6841" stroke-width="3"/>`
    + `<path d="M0 ${table + (h - table) * .45}h${w * .55}M${w * .3} ${table + (h - table) * .7}h${w * .7}" stroke="#946c45" stroke-width="2" opacity=".5"/>`
    + layout(table) + '</svg>';
}

const SCENE_191 = scene(1200, 628, t => at(560, t + 18, 1.05, P.towel()) + at(560, t - 26, .95, P.candle(true))
  + at(330, t + 10, 1.05, P.diffuser()) + at(780, t + 14, 1, P.dropper()) + at(930, t + 8, 1.1, P.sprig()));
const SCENE_45 = scene(960, 1200, t => at(480, t + 70, 2.3, P.towel()) + at(480, t - 34, 2.1, P.candle(true))
  + at(170, t + 60, 1.9, P.diffuser()) + at(800, t + 64, 1.9, P.dropper()));
const SCENE_916 = scene(1080, 1920, t => at(540, t + 150, 2.6, P.towel()) + at(540, t + 20, 2.4, P.candle(true))
  + at(200, t + 120, 2.2, P.diffuser()) + at(880, t + 124, 2.1, P.dropper()));

// Video frame: oil dropping into the diffuser, dropper tilted above.
const VIDEO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">${defs}`
  + '<rect width="1920" height="1080" fill="#e9dccb"/><rect width="1920" height="1080" fill="url(#wall)" opacity=".7"/>'
  + '<rect y="760" width="1920" height="320" fill="url(#wood)"/><path d="M0 760h1920" stroke="#8e6841" stroke-width="4"/>'
  + at(820, 800, 2.4, P.diffuser())
  + `<g transform="translate(1060 330) rotate(-128) scale(2.1)">${P.dropper().replace(/<ellipse[^>]*\/>/, '')}</g>`
  + '<path d="M930 420c10 16 12 28 0 38c-12-10-10-22 0-38Z" fill="#c9893f"/>'
  + at(1380, 800, 1.9, P.candle(true)) + at(420, 800, 2, P.sprig()) + '</svg>';

// Service photo stand-in for page 2: wall air conditioner, open panel, tools.
const SERVICE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">${defs}`
  + '<rect width="1200" height="800" fill="#eef0f2"/><rect y="600" width="1200" height="200" fill="#d9dde2"/>'
  + '<rect x="300" y="150" width="600" height="190" rx="24" fill="#fbfcfd" stroke="#cfd5dc" stroke-width="4"/>'
  + '<rect x="330" y="290" width="540" height="28" rx="8" fill="#e3e8ee"/>'
  + '<path d="M340 200h520M340 228h520M340 256h520" stroke="#dde3ea" stroke-width="6"/>'
  + '<rect x="770" y="180" width="80" height="16" rx="4" fill="#bfe3cf"/>'
  + '<path d="M320 336 300 420" stroke="#9aa6b3" stroke-width="10" stroke-linecap="round"/>'
  + '<rect x="560" y="420" width="120" height="180" rx="10" fill="#8b98a6"/><rect x="580" y="440" width="80" height="60" rx="6" fill="#b8c3cf"/>'
  + '<rect x="190" y="560" width="220" height="60" rx="10" fill="#2f5d8c"/><rect x="220" y="540" width="160" height="26" rx="8" fill="none" stroke="#2f5d8c" stroke-width="10"/>'
  + '<path d="M860 600l120-90" stroke="#6b7682" stroke-width="16" stroke-linecap="round"/><circle cx="990" cy="502" r="22" fill="none" stroke="#6b7682" stroke-width="12"/>'
  + '</svg>';

export const PLACEHOLDERS = {
  'nen-thom': product(P.candle(), 1.75),
  'tinh-dau': product(P.dropper(), 1.62),
  'kem-duong': product(P.jar(), 1.9),
  'khuech-tan': product(P.diffuser(), 1.05),
  'sua-tam': product(P.pump(), 1.1),
  'khan-cotton': product(P.towel(), 1.85),
  'scene-191': SCENE_191,
  'scene-45': SCENE_45,
  'scene-916': SCENE_916,
  'video-169': VIDEO,
  'service-ac': SERVICE
};

fs.mkdirSync(OUT, {recursive: true});
for (const [name, svg] of Object.entries(PLACEHOLDERS)) {
  const min = svg.replace(/\n/g, '').replace(/>\s+</g, '><');
  fs.writeFileSync(path.join(OUT, name + '.svg'), min);
  console.log(name.padEnd(12), (min.length / 1024).toFixed(1), 'KB');
}
