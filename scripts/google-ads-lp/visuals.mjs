// Visual kit for the three Google Ads landing pages.
// Everything a block needs to show instead of tell: line icons, platform
// mock-ups, true-ratio frames, flow diagrams, the measurement pipeline, the
// funnel, mini charts and the accessible one-of-many controls around them.
//
// Rules the kit keeps for every page:
// - No platform logos or wordmarks. A search page is a search bar and result
//   tabs; a video page is a player; chat buttons are a chat icon plus a label.
// - One fictional shop (nhathom.example) and six products run through every mock.
// - Motion is CSS only and lives behind [data-anim]; google-ads-lp.js adds
//   .is-live while the block is on screen. The resting style is the last frame,
//   so reduced motion shows a finished picture, not a blank one.

import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {renderMock, hasRender} from './mocks.mjs';

export const esc = s => String(s)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const attr = (name, value) => value === undefined || value === null || value === false
  ? '' : ` ${name}="${esc(value)}"`;

let uid = 0;
const nextId = prefix => `${prefix}-${(++uid).toString(36)}`;

/* ------------------------------------------------------------------ *
 * Icons. One 24px box and one stroke weight, so a row reads as a set.
 * ------------------------------------------------------------------ */
export const ICON_PATHS = {
  need: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 1 3.5 10.9V16h-7v-2.1A6 6 0 0 1 12 3Z"/>',
  search: '<circle cx="11" cy="11" r="6.2"/><path d="m15.6 15.6 4 4"/>',
  auction: '<path d="M12 3.5v17"/><path d="M7 20.5h10"/><path d="M4 7.5h16"/><path d="M4 7.5 1.6 13h4.8Z"/><path d="M20 7.5 17.6 13h4.8Z"/>',
  creative: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M6.5 9h.01"/><path d="m4 16 4.5-4.5 3.5 3.5 3-2.5L21 17"/>',
  page: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M6 6.5h.01"/><path d="M8.5 6.5h.01"/>',
  convert: '<circle cx="12" cy="12" r="8.5"/><path d="m8.2 12.4 2.6 2.6 5-5.6"/>',
  phone: '<path d="M6.3 3h3.2l1.5 4-2 1.5a12.4 12.4 0 0 0 6.5 6.5l1.5-2 4 1.5v3.2a2 2 0 0 1-2.2 2A17.2 17.2 0 0 1 4.3 5.2 2 2 0 0 1 6.3 3Z"/>',
  chat: '<path d="M21 11.6a8 8 0 0 1-8 8H4.5l2-2.7A8 8 0 1 1 21 11.6Z"/><path d="M8.5 11.5h.01"/><path d="M12 11.5h.01"/><path d="M15.5 11.5h.01"/>',
  form: '<rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M8.5 8.5h7"/><path d="M8.5 12.5h7"/><path d="M8.5 16.5h4"/>',
  cart: '<circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17.5" cy="19.5" r="1.4"/><path d="M2.5 3.5h2.3l2.5 12h10.6l1.9-8.6H6.2"/>',
  install: '<path d="M12 3v11.5"/><path d="m7.8 10.3 4.2 4.2 4.2-4.2"/><path d="M4 17.5V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"/>',
  play: '<circle cx="12" cy="12" r="8.5"/><path d="m10.2 8.5 5.6 3.5-5.6 3.5Z"/>',
  pin: '<path d="M12 21s6.8-5.7 6.8-11A6.8 6.8 0 1 0 5.2 10c0 5.3 6.8 11 6.8 11Z"/><circle cx="12" cy="9.8" r="2.4"/>',
  users: '<circle cx="9.2" cy="8" r="3.3"/><path d="M2.8 20a6.4 6.4 0 0 1 12.8 0"/><path d="M16.2 5.3a3.3 3.3 0 0 1 0 5.4"/><path d="M18 14.4a6.4 6.4 0 0 1 3.2 5.6"/>',
  upload: '<path d="M12 20.5V9"/><path d="m7.8 13.2 4.2-4.2 4.2 4.2"/><path d="M4 6.5V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5"/>',
  check: '<path d="m4.5 12.5 4.5 4.5 10.5-11"/>',
  repeat: '<path d="M4 9.5A5.5 5.5 0 0 1 9.5 4H19"/><path d="m15.8 1.2 3.4 2.8-3.4 2.8"/><path d="M20 14.5a5.5 5.5 0 0 1-5.5 5.5H5"/><path d="m8.2 22.8-3.4-2.8 3.4-2.8"/>',
  list: '<path d="M9 6.5h11"/><path d="M9 12h11"/><path d="M9 17.5h11"/><circle cx="4.5" cy="6.5" r="1.2"/><circle cx="4.5" cy="12" r="1.2"/><circle cx="4.5" cy="17.5" r="1.2"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r=".9" fill="currentColor" stroke="none"/>',
  tag: '<path d="M11.4 3H20a1 1 0 0 1 1 1v8.6a2 2 0 0 1-.6 1.4l-6.4 6.4a2 2 0 0 1-2.8 0l-7.6-7.6a2 2 0 0 1 0-2.8L10 3.6a2 2 0 0 1 1.4-.6Z"/><path d="M16.6 7.4h.01"/>',
  chart: '<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7.5" y="12" width="3" height="5" rx="1"/><rect x="13" y="8.5" width="3" height="8.5" rx="1"/>',
  wallet: '<rect x="3" y="5.5" width="18" height="13.5" rx="2.5"/><path d="M3 10h18"/><path d="M16.5 14.5h2"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.2V12l3.2 2"/>',
  shield: '<path d="M12 3 5 5.8v5.5c0 4.2 2.9 7.6 7 8.7 4.1-1.1 7-4.5 7-8.7V5.8Z"/><path d="m9.2 11.8 2 2 3.6-3.9"/>',
  dot: '<circle cx="12" cy="12" r="4.5"/>',
  // added for the visual redesign
  tap: '<path d="M9.5 12.5V6a1.5 1.5 0 0 1 3 0v5"/><path d="M12.5 10.5a1.5 1.5 0 0 1 3 0v1"/><path d="M15.5 11.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6H12a6 6 0 0 1-4.8-2.4l-2.6-3.5a1.5 1.5 0 0 1 2.4-1.8l2.5 3"/><path d="M6.5 6.5a5 5 0 0 1 8.4-2.6"/>',
  thought: '<path d="M7.5 16a4 4 0 0 1-.7-7.9 5.5 5.5 0 0 1 10.4-.6A4.2 4.2 0 0 1 17 16Z"/><circle cx="7" cy="19.5" r="1.1"/><circle cx="4.2" cy="21.6" r=".6"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  code: '<path d="m8.5 8-4 4 4 4"/><path d="m15.5 8 4 4-4 4"/><path d="m13.5 5-3 14"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10.5 5-3v9l-5-3"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17"/><path d="M8 3v4"/><path d="M16 3v4"/>',
  store: '<path d="M4 10v10h16V10"/><path d="M3 9.5 5 4h14l2 5.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0"/><path d="M10 20v-5h4v5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  bolt: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z"/>',
  knob: '<circle cx="12" cy="12" r="8.5"/><path d="M12 12 16.5 7.5"/><path d="M12 3.5v1.5"/><path d="M3.5 12H5"/><path d="M19 12h1.5"/>',
  funnel: '<path d="M3.5 4.5h17l-6.5 8v6l-4 2v-8Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3 13 9 5 9-5"/>',
  trend: '<path d="M3.5 17.5 9 12l3.5 3.5 8-8"/><path d="M15 7.5h5.5V13"/>',
  area: '<path d="M3.5 20h17"/><path d="M3.5 17 8 11l4 3 8.5-8V20h-17Z"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
  hash: '<path d="M9 3.5 7.5 20.5"/><path d="M16.5 3.5 15 20.5"/><path d="M4 9h17"/><path d="M3 15h17"/>',
  table: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3 9.5h18"/><path d="M3 14.5h18"/><path d="M9.5 9.5v10"/>',
  person: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 20.5a7 7 0 0 1 14 0"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5a13 13 0 0 1 0 17"/><path d="M12 3.5a13 13 0 0 0 0 17"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/>',
  receipt: '<path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21Z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h3"/>',
  pay: '<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19"/><path d="M6 15h4"/>',
  stamp: '<path d="M9 13.5V11a3 3 0 1 1 6 0v2.5"/><path d="M4.5 13.5h15V17h-15Z"/><path d="M6 20.5h12"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4.5h11l-2 4 2 4H5"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9Z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/>',
  sliders: '<path d="M4 7h10"/><path d="M18 7h2"/><circle cx="16" cy="7" r="2"/><path d="M4 17h4"/><path d="M12 17h8"/><circle cx="10" cy="17" r="2"/>',
  auto: '<rect x="4.5" y="7.5" width="15" height="11" rx="3"/><path d="M12 3.5v4"/><circle cx="12" cy="3.5" r=".6"/><path d="M9.5 13h.01"/><path d="M14.5 13h.01"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.2a2.6 2.6 0 0 0-2.5-1.4c-1.5 0-2.6.8-2.6 2s1.1 1.7 2.6 2 2.6.8 2.6 2-1.1 2-2.6 2a2.7 2.7 0 0 1-2.6-1.5"/><path d="M12 6v1.8M12 16.2V18"/>',
  alert: '<path d="M12 4 2.8 19.5h18.4Z"/><path d="M12 10v4.5"/><path d="M12 17h.01"/>',
  arrow: '<path d="M4 12h15"/><path d="m13.5 6.5 5.5 5.5-5.5 5.5"/>',
  minus: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12h8"/>',
  box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/>',
  mobile: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  // phone and chat app chrome (scenes.mjs)
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21"/>',
  micoff: '<path d="M15 10V6a3 3 0 0 0-5.6-1.5"/><path d="M9 9v2a3 3 0 0 0 4.8 2.4"/><path d="M18.5 11a6.5 6.5 0 0 1-1.2 3.8"/><path d="M5.5 11a6.5 6.5 0 0 0 10 5.5"/><path d="M12 17.5V21"/><path d="m4 4 16 16"/>',
  keypad: '<circle cx="6" cy="5" r="1.4"/><circle cx="12" cy="5" r="1.4"/><circle cx="18" cy="5" r="1.4"/><circle cx="6" cy="11" r="1.4"/><circle cx="12" cy="11" r="1.4"/><circle cx="18" cy="11" r="1.4"/><circle cx="6" cy="17" r="1.4"/><circle cx="12" cy="17" r="1.4"/><circle cx="18" cy="17" r="1.4"/><circle cx="12" cy="22" r="1"/>',
  speaker: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m4 17.5 5-4.5 3.5 3 3-2.5 4.5 4"/>',
  smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14a4.2 4.2 0 0 0 7 0"/><path d="M9 9.5h.01"/><path d="M15 9.5h.01"/>',
  back: '<path d="m15 5-7 7 7 7"/>',
  like: '<path d="M7.5 10.5v9h-3v-9Z"/><path d="M7.5 10.5 11 4a2 2 0 0 1 2.5 2.2L13 9.5h5.3a2 2 0 0 1 2 2.4l-1.3 6a2 2 0 0 1-2 1.6H7.5"/>',
  dots: '<circle cx="5.5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="18.5" cy="12" r="1.2"/>',
  send: '<path d="M4 12 20 4l-4 16-4-7Z"/><path d="m12 13 8-9"/>',
  camera: '<path d="M4 8.5h3l1.5-2.5h7L17 8.5h3v10H4Z"/><circle cx="12" cy="13" r="3.3"/>',
  menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
  verified: '<circle cx="12" cy="12" r="8.5"/><path d="m8.4 12.2 2.4 2.4 4.8-5"/>'
};

export function icon(name, cls = '') {
  return `<svg class="ico${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"`
    + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + (ICON_PATHS[name] || ICON_PATHS.dot) + '</svg>';
}

/* ------------------------------------------------------------------ *
 * The sample shop and its photographs.
 * Files come from scripts/ga-crop-photos.cjs.
 * ------------------------------------------------------------------ */
// Slot name → picture file. A slot shows the WebP pair made by
// ga-crop-photos.cjs when it exists, otherwise the SVG stand-in from
// ga-placeholders.mjs. Either way the <img> fills a fixed-ratio frame and is
// cropped with object-fit: cover, so no picture is ever stretched.
const PICTURES = {
  s1: 'tinh-dau', s2: 'kem-duong', s3: 'khuech-tan', s4: 'sua-tam', s5: 'khan-cotton', s6: 'nen-thom',
  's-hero': 'video-169', 's-shelf': 'scene-191', 's-tall': 'scene-916', 's-desk': 'scene-45', svc: 'service-ac'
};
const GA_DIR = fileURLToPath(new URL('../../dist/assets/ga/', import.meta.url));
const hasPhoto = file => fs.existsSync(GA_DIR + file + '@1x.webp') && fs.existsSync(GA_DIR + file + '@2x.webp');

export const shot = name => {
  const file = PICTURES[name] || PICTURES.s6;
  const src = hasPhoto(file)
    ? `/assets/ga/${file}@1x.webp" srcset="/assets/ga/${file}@1x.webp 1x, /assets/ga/${file}@2x.webp 2x`
    : `/assets/ga/ph/${file}.svg`;
  return `<img class="shot" src="${src}" alt="" loading="lazy" decoding="async">`;
};

export const SHOP = 'nhathom.example';
export const PRODUCTS = [
  ['s1', 'Tinh dầu oải hương 30ml', '285.000₫'],
  ['s2', 'Kem dưỡng ẩm 50ml', '390.000₫'],
  ['s3', 'Khuếch tán que gỗ 150ml', '340.000₫'],
  ['s4', 'Sữa tắm thảo mộc 500ml', '245.000₫'],
  ['s5', 'Khăn cotton dệt tổ ong', '180.000₫'],
  ['s6', 'Nến thơm nắp gỗ 200g', '320.000₫']
];


/* ------------------------------------------------------------------ *
 * Device chrome
 * ------------------------------------------------------------------ */
export function browser(url, inner, cls = '') {
  return `<div class="browser${cls ? ' ' + cls : ''}">`
    + '<div class="bt"><span class="dots"><i></i><i></i><i></i></span>'
    + `<span class="url">${icon('lock')}${esc(url)}</span></div>`
    + `<div class="bb">${inner}</div></div>`;
}

export function phone(inner, cls = '') {
  return `<div class="phone-f${cls ? ' ' + cls : ''}"><div class="notch"></div>`
    + `<div class="scr">${inner}</div></div>`;
}

// A device floating on an accent gradient, tilted in 3D. The picker cards and
// the campaign panels stand their mock-ups on this.
export function tiltStage(inner, cls = '') {
  return `<div class="v-tilt${cls ? ' ' + cls : ''}"><div class="v-tilt-dev">${inner}</div></div>`;
}

// The light zone every platform mock-up sits in. `tag` names what is shown.
export function stage(inner, {tag = 'MÔ PHỎNG', cls = '', caption = ''} = {}) {
  return `<figure class="v-stage${cls ? ' ' + cls : ''}">`
    + (tag ? `<span class="demo-tag">${esc(tag)}</span>` : '')
    + inner
    + (caption ? `<figcaption>${esc(caption)}</figcaption>` : '')
    + '</figure>';
}

/* ------------------------------------------------------------------ *
 * Platform parts. Real layout, no logos: the search page is known by its
 * bar and result tabs, not by a wordmark.
 * ------------------------------------------------------------------ */
export function searchHead(query, {typing = false, tabs = true, active = 'Tất cả'} = {}) {
  const tabRow = ['Tất cả', 'Hình ảnh', 'Mua sắm', 'Video', 'Bản đồ']
    .map(t => t === active ? `<b>${t}</b>` : `<span>${t}</span>`).join('');
  return '<div class="v-shead">'
    + `<div class="v-sbar">${icon('search')}`
    + `<span class="v-q${typing ? ' v-typing' : ''}" style="--n:${[...query].length}">${esc(query)}</span></div>`
    + (tabs ? `<div class="v-stabs">${tabRow}</div>` : '')
    + '</div>';
}

export function serpAd({title, url, desc, links = [], call = false, cls = ''}) {
  return `<div class="serp-ad${cls ? ' ' + cls : ''}">`
    + '<span class="spons">Được tài trợ</span>'
    + `<div class="ad-url"><i class="fav"></i>${esc(url)}</div>`
    + `<div class="ad-title">${esc(title)}</div>`
    + `<div class="ad-desc">${esc(desc)}</div>`
    + (links.length ? `<div class="sitelinks">${links.map(l => `<span>${esc(l)}</span>`).join('')}</div>` : '')
    + (call ? `<div class="ad-call">${icon('phone')} Gọi</div>` : '')
    + '</div>';
}

export function productCard(i, {sponsored = false, cls = ''} = {}) {
  const [img, name, price] = PRODUCTS[i % PRODUCTS.length];
  return `<div class="p-card${cls ? ' ' + cls : ''}">`
    + `<div class="photo">${shot(img)}</div>`
    + `<b>${esc(name)}</b>`
    + `<em>${esc(price)} · ${SHOP}</em>`
    + (sponsored ? '<span class="spons">Được tài trợ</span>' : '')
    + '</div>';
}

export function productGrid(n, tagged, start = 0) {
  let out = '';
  for (let i = 0; i < n; i++) out += productCard(start + i, {sponsored: tagged && i < 2});
  return `<div class="p-grid">${out}</div>`;
}

// A row of product cards where ours (index `ours`) is lifted forward.
export function carousel(n = 5, ours = 1) {
  let out = '';
  for (let i = 0; i < n; i++) out += productCard(i, {sponsored: i === ours, cls: i === ours ? 'is-ours' : ''});
  return `<div class="v-carousel">${out}</div>`;
}

export function player({label = 'Quảng cáo · 0:15', skippable = true, img = 's-hero'} = {}) {
  return '<div class="player">'
    + `<div class="photo dark">${shot(img)}`
    + '<span class="p-badge">Quảng cáo</span>'
    + `<span class="p-count">${esc(label)}</span>`
    + (skippable ? '<span class="p-skip">Bỏ qua <span aria-hidden="true">▸|</span></span>' : '')
    + `<span class="p-play">${icon('play')}</span>`
    + '<span class="p-bar"><i></i></span></div>'
    + '<div class="p-meta"><i class="av"></i><div><b>Góc thư giãn cuối ngày</b>'
    + `<em>${SHOP} · Tìm hiểu thêm</em></div></div>`
    + '</div>';
}

export function feedCard({img = 's-shelf', title = 'Góc thư giãn cuối ngày', sponsored = true, cls = ''} = {}) {
  return `<div class="f-card${cls ? ' ' + cls : ''}">`
    + (sponsored ? '<span class="spons">Được tài trợ</span>' : '')
    + `<div class="photo">${shot(img)}</div>`
    + `<b>${esc(title)}</b><em>Nến & tinh dầu · ${SHOP}</em>`
    + (sponsored ? '<span class="cta-chip">Tìm hiểu thêm</span>' : '')
    + '</div>';
}

export function appPage({state = 'install'} = {}) {
  const btn = {install: 'Cài đặt', loading: 'Đang tải…', open: 'Mở'}[state] || 'Cài đặt';
  return '<div class="v-app">'
    + `<div class="v-app-top"><span class="app-icon">${shot('s6')}</span>`
    + `<div><b>Nhà Thơm — Nến & tinh dầu</b><em>Được tài trợ · Mua sắm</em></div></div>`
    + '<div class="v-app-stats"><span><b>4,7 ★</b>2,1 N đánh giá</span><span><b>18 MB</b>Dung lượng</span><span><b>50 N+</b>Lượt tải</span></div>'
    + `<span class="v-app-btn" data-state="${state}"><i class="v-app-fill"></i><span>${btn}</span></span>`
    + `<div class="v-app-shots"><i class="photo">${shot('s1')}</i><i class="photo">${shot('s3')}</i><i class="photo">${shot('s2')}</i></div>`
    + '</div>';
}


// The format mock-ups live in mocks.mjs. `campaign` picks the right one
// where a format id repeats across campaigns.
export const mock = (formatId, campaign) => renderMock(formatId, campaign);
export const hasMock = id => hasRender(id);

/* ------------------------------------------------------------------ *
 * Business-side mock-ups: the page the ad leads to and the tools that
 * count what happens there. Used by measurement and pipeline blocks.
 * ------------------------------------------------------------------ */
export const CONTACT_ACTIONS = [
  {id: 'call', icon: 'phone', label: 'Gọi hotline', event: 'click_call'},
  {id: 'zalo', icon: 'chat', label: 'Nhắn Zalo', event: 'click_zalo'},
  {id: 'messenger', icon: 'chat', label: 'Messenger', event: 'click_messenger'},
  {id: 'form', icon: 'form', label: 'Gửi form', event: 'form_submit'}
];

// The service page on a phone, with the four contact buttons. Pass
// `interactive` to render the buttons as real <button>s with data-action.
export function landingPhone({interactive = false, title = 'Nến thơm & tinh dầu thiên nhiên'} = {}) {
  const btns = CONTACT_ACTIONS.map(a => interactive
    ? `<button type="button" class="v-lp-btn" data-action="${a.id}" data-event="${a.event}">${icon(a.icon)}<span>${a.label}</span></button>`
    : `<span class="v-lp-btn">${icon(a.icon)}<span>${a.label}</span></span>`).join('');
  return phone('<div class="v-lp">'
    + `<div class="v-lp-nav"><b>${SHOP}</b><i></i></div>`
    + `<div class="photo v-lp-hero">${shot('s-shelf')}</div>`
    + `<b class="v-lp-title">${esc(title)}</b>`
    + '<p class="v-lp-desc">Sáp đậu nành, mùi nhẹ, đốt đến 40 giờ.</p>'
    + `<div class="v-lp-btns">${btns}</div>`
    + '</div>', 'v-lp-phone');
}

// Generic report table: head = column labels, rows = arrays of cells.
// A cell may be {text, status: 'good'|'consider'|'fix'} to render a chip.
const cell = c => {
  if (c && typeof c === 'object') {
    return c.status
      ? `<td><span class="v-chip" data-accent="${c.status}">${esc(c.text)}</span></td>`
      : `<td${attr('data-key', c.key)}>${esc(c.text)}</td>`;
  }
  return `<td>${esc(c)}</td>`;
};

export function reportTable({title, head, rows, cls = '', icon: ic = 'table'}) {
  return `<div class="v-report${cls ? ' ' + cls : ''}">`
    + (title ? `<div class="v-report-top">${icon(ic)}<b>${esc(title)}</b></div>` : '')
    + '<table><thead><tr>' + head.map(h => `<th scope="col">${esc(h)}</th>`).join('') + '</tr></thead>'
    + '<tbody>' + rows.map(r => '<tr>' + r.map(cell).join('') + '</tr>').join('') + '</tbody></table>'
    + '</div>';
}

// The four counters the measurement block fills when a button is tapped.
export function contactReport() {
  return reportTable({
    title: 'Báo cáo chuyển đổi',
    icon: 'chart',
    cls: 'v-contact-report',
    head: ['Hành động', 'Lượt', 'Đội tư vấn xác nhận'],
    rows: CONTACT_ACTIONS.map((a, i) => [
      a.event,
      {text: String([12, 18, 7, 9][i]), key: a.id},
      {text: ['Đủ điều kiện', 'Đang gọi lại', 'Chưa phù hợp', 'Đủ điều kiện'][i], status: ['good', 'consider', 'fix', 'good'][i]}
    ])
  });
}

export function crmTable({rows} = {}) {
  const data = rows || [
    ['Ng*** Lan', 'Tìm kiếm', {text: 'Đã mua', status: 'good'}],
    ['Tr*** Minh', 'Zalo', {text: 'Đang tư vấn', status: 'consider'}],
    ['Ph*** Hà', 'Form', {text: 'Đủ điều kiện', status: 'good'}],
    ['Lê*** Tú', 'Hotline', {text: 'Sai nhu cầu', status: 'fix'}]
  ];
  return reportTable({title: 'Danh sách khách hàng', icon: 'users', cls: 'v-crm', head: ['Khách', 'Nguồn', 'Trạng thái'], rows: data});
}

// A log-style stream. group: 'signal' (yellow) or 'confirmed' (green).
export function eventLog(events) {
  return '<ol class="v-log">' + events.map((e, i) => `<li data-group="${e.group || 'signal'}" style="--i:${i}">`
    + `<span class="v-log-t">${esc(e.time || `10:0${i}`)}</span>`
    + `<code>${esc(e.name)}</code>`
    + (e.label ? `<span class="v-log-l">${esc(e.label)}</span>` : '')
    + '</li>').join('') + '</ol>';
}

// Address bar with the tracking parameters coloured by part.
export function utmBar({base = SHOP + '/nen-thom', params = [['utm_source', 'google'], ['utm_medium', 'cpc'], ['utm_campaign', 'nen-thom-t9']]} = {}) {
  return '<div class="v-utm">' + icon('link')
    + `<span class="v-utm-base">${esc(base)}</span>`
    + params.map(([k, v], i) => `<span class="v-utm-p" data-i="${i}">${i ? '&amp;' : '?'}${esc(k)}=<b>${esc(v)}</b></span>`).join('')
    + '</div>';
}

// A tag manager style list with ticks.
export function tagList(tags = ['Chuyển đổi — Gửi form', 'Chuyển đổi — Bấm gọi', 'Chuyển đổi — Nhấp Zalo', 'Sự kiện GA4 — xem dịch vụ']) {
  return '<ul class="v-tags">' + tags.map((t, i) => `<li style="--i:${i}">${icon('code')}<span>${esc(t)}</span><i class="v-tick">${icon('check')}</i></li>`).join('') + '</ul>';
}

export function ga4Mini() {
  return '<div class="v-ga4">'
    + lineChart([12, 18, 15, 24, 22, 31, 36], {w: 200, h: 64})
    + '<ul><li><code>page_view</code><b>1.240</b></li><li><code>view_service</code><b>410</b></li><li><code>generate_lead</code><b>38</b></li></ul>'
    + '</div>';
}

// Enhanced conversions: the email is hashed before it leaves the page.
export function ecField() {
  return '<div class="v-ec">'
    + `<span class="v-ec-f">${icon('mail')}<span>••••@••••.vn</span>${icon('lock', 'v-ec-lock')}</span>`
    + '<span class="v-ec-h">3f9a…c21e</span>'
    + '</div>';
}

export function callLog() {
  const rows = [['09•• ••• 218', '03:12', 'good'], ['08•• ••• 540', '00:18', 'fix'], ['03•• ••• 771', '06:45', 'good']];
  return '<ul class="v-calls">' + rows.map(([n, d, s]) => `<li>${icon('phone')}<span>${n}</span><b>${d}</b><i class="v-dot" data-accent="${s}"></i></li>`).join('') + '</ul>';
}

export function merchantGrid() {
  const status = [['good', 'Đã duyệt'], ['good', 'Đã duyệt'], ['consider', 'Đang xét'], ['fix', 'Bị từ chối']];
  return '<div class="v-merchant">' + status.map(([s, t], i) => `<div class="v-mc">`
    + `<div class="photo">${shot(PRODUCTS[i][0])}</div><em>${esc(PRODUCTS[i][2])}</em>`
    + `<span class="v-chip" data-accent="${s}">${t}</span></div>`).join('') + '</div>';
}

export function offlineRow() {
  return '<div class="v-offline">' + icon('repeat')
    + '<span><code>sale</code> · Ng*** Lan · 1.290.000₫</span>'
    + '<span class="v-chip" data-accent="good">Đã gửi lại</span></div>';
}

/* ------------------------------------------------------------------ *
 * Mini charts. Plain SVG, sized by viewBox, tinted by --accent.
 * ------------------------------------------------------------------ */
function scale(values, w, h, pad = 6) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = (w - pad * 2) / Math.max(values.length - 1, 1);
  return values.map((v, i) => [pad + i * step, h - pad - ((v - min) / span) * (h - pad * 2)]);
}

export function lineChart(values, {w = 240, h = 90, area = false, label = ''} = {}) {
  const pts = scale(values, w, h);
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('');
  const fill = area ? `<path class="v-area" d="${d}L${pts.at(-1)[0].toFixed(1)} ${h}L${pts[0][0].toFixed(1)} ${h}Z"/>` : '';
  const [lx, ly] = pts.at(-1);
  return `<svg class="v-chart v-line" viewBox="0 0 ${w} ${h}" role="img"${attr('aria-label', label || null)}${label ? '' : ' aria-hidden="true"'}>`
    + '<g class="v-grid"><path d="M0 ' + (h - 1) + 'H' + w + '"/></g>'
    + `<g class="v-draw">${fill}<path class="v-stroke" d="${d}"/></g>`
    + `<circle class="v-end" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="3.5"/>`
    + '</svg>';
}

export function barChart(values, {w = 240, h = 90, labels = [], highlight = -1, label = ''} = {}) {
  const max = Math.max(...values) || 1;
  const gap = 8;
  const bw = (w - gap * (values.length - 1)) / values.length;
  const bars = values.map((v, i) => {
    const bh = Math.max(2, (v / max) * (h - 2));
    const x = i * (bw + gap);
    return `<rect class="v-bar${i === highlight ? ' is-hi' : ''}" style="--i:${i}" x="${x.toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3"/>`;
  }).join('');
  const svg = `<svg class="v-chart v-bars" viewBox="0 0 ${w} ${h}" role="img"${attr('aria-label', label || null)}${label ? '' : ' aria-hidden="true"'}>${bars}</svg>`;
  if (!labels.length) return svg;
  // Labels are HTML so they keep a readable size however small the chart is drawn.
  return `<div class="v-bars-box">${svg}<div class="v-bar-labels" aria-hidden="true" style="--n:${values.length};--gap:${(gap / w * 100).toFixed(2)}%">`
    + values.map((_, i) => `<span>${esc(labels[i] || '')}</span>`).join('') + '</div></div>';
}

// Cost-per-result dots wobbling around a target line (target CPA).
export function targetDots({values = [92, 118, 104, 86, 110, 97, 101, 95, 108, 99], target = 100, w = 240, h = 90, label = ''} = {}) {
  const max = Math.max(...values, target) * 1.15;
  const min = Math.min(...values, target) * 0.85;
  const y = v => h - ((v - min) / (max - min)) * h;
  const step = w / (values.length + 1);
  const dots = values.map((v, i) => `<circle class="v-tdot" style="--i:${i}" cx="${((i + 1) * step).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4"/>`).join('');
  return `<svg class="v-chart v-target" viewBox="0 0 ${w} ${h}" role="img"${attr('aria-label', label || null)}${label ? '' : ' aria-hidden="true"'}>`
    + `<path class="v-tline" d="M0 ${y(target).toFixed(1)}H${w}"/>${dots}</svg>`;
}

// A dial; value 0..1. Used for "goal knob" style pictures.
export function knob(value = .65, {label = ''} = {}) {
  const deg = -135 + value * 270;
  return `<div class="v-knob" style="--deg:${deg}deg" role="img" aria-label="${esc(label || 'Núm điều chỉnh')}">`
    + '<svg viewBox="0 0 100 100" aria-hidden="true"><path class="v-knob-track" d="M22 78A40 40 0 1 1 78 78"/>'
    + `<path class="v-knob-fill" pathLength="100" stroke-dasharray="${(value * 100).toFixed(1)} 100" d="M22 78A40 40 0 1 1 78 78"/></svg>`
    + '<i class="v-knob-cap"><i></i></i></div>';
}

export function ring(value = .6, {label = '', text = ''} = {}) {
  const c = 2 * Math.PI * 42;
  return `<div class="v-ring" role="img" aria-label="${esc(label || Math.round(value * 100) + '%')}">`
    + '<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="v-ring-track" cx="50" cy="50" r="42"/>'
    + `<circle class="v-ring-fill" cx="50" cy="50" r="42" stroke-dasharray="${(value * c).toFixed(1)} ${c.toFixed(1)}"/></svg>`
    + `<b>${esc(text || Math.round(value * 100) + '%')}</b></div>`;
}

// One budget split into coloured parts. Each part is a tab: hover or focus
// opens its explanation. parts: [{id, label, value, color, body}]
export function stackBar({parts, label = 'Cơ cấu ngân sách', unit = '₫', total}) {
  const sum = parts.reduce((s, p) => s + p.value, 0);
  const items = parts.map(p => ({
    id: p.id,
    tab: `<span class="v-seg-sw" style="--c:${p.color}"></span><span>${esc(p.label)}</span><b>${Math.round(p.value / sum * 100)}%</b>`,
    panel: p.body,
    style: `--c:${p.color};--w:${(p.value / sum * 100).toFixed(2)}`
  }));
  const bar = '<div class="v-stack" aria-hidden="true">' + parts.map(p => `<i style="--c:${p.color};flex:${p.value}"></i>`).join('') + '</div>';
  return `<div class="v-stackbar">`
    + (total ? `<div class="v-stack-total"><b>${esc(total)}</b><span>${esc(unit)}</span></div>` : '')
    + bar
    + tabs({label, items, cls: 'v-stack-tabs', hover: true})
    + '</div>';
}

/* ------------------------------------------------------------------ *
 * Accessible one-of-many controls
 * ------------------------------------------------------------------ */

// items: [{id, tab (html), panel (html), style?}]. `toggle` lets the open tab
// close again (pipeline stations). `hover` opens on pointer hover too.
// `layout(buttons)` may arrange the tab buttons (an array of HTML strings)
// inside the tablist, e.g. into pipeline columns.
export function tabs({label, items, cls = '', active = 0, toggle = false, hover = false, vertical = false, listCls = '', layout}) {
  const base = nextId('vt');
  // With nothing open (active < 0) the first tab still takes the Tab key.
  const focus = active < 0 ? 0 : active;
  const buttons = items.map((it, i) => {
    const on = i === active;
    return `<button type="button" role="tab" id="${base}-t${i}" aria-controls="${base}-p${i}"`
      + ` aria-selected="${on}" tabindex="${i === focus ? 0 : -1}"${attr('data-key', it.id)}${attr('class', it.cls)}${attr('style', it.style)}>${it.tab}</button>`;
  });
  const list = layout ? layout(buttons) : buttons.join('');
  const panels = items.map((it, i) => `<div role="tabpanel" id="${base}-p${i}" aria-labelledby="${base}-t${i}" tabindex="0"`
    + `${attr('data-key', it.id)}${i === active ? '' : ' hidden'}>${it.panel}</div>`).join('');
  return `<div class="v-tabset${cls ? ' ' + cls : ''}" data-tabs${toggle ? ' data-toggle' : ''}${hover ? ' data-hover' : ''}>`
    + `<div role="tablist" class="v-tablist${listCls ? ' ' + listCls : ''}" aria-label="${esc(label)}"${vertical ? ' aria-orientation="vertical"' : ''}>${list}</div>`
    + `<div class="v-panels">${panels}</div></div>`;
}

// Long copy that must stay on the page but not in the way.
export function more(body, {label = 'Xem chi tiết', open = false, cls = ''} = {}) {
  return `<details class="v-more${cls ? ' ' + cls : ''}"${open ? ' open' : ''}>`
    + `<summary><span>${esc(label)}</span>${icon('arrow', 'v-more-ico')}</summary>`
    + `<div class="v-more-body">${body}</div></details>`;
}

// A numbered marker on a mock-up. x/y are percentages of the mock.
export function marker({n, x, y, title, text}) {
  const glyph = ['①', '②', '③', '④', '⑤', '⑥'][n - 1] || String(n);
  // Keep the tip inside the mock: markers near an edge open towards the middle.
  const side = x < 30 ? ' is-start' : x > 70 ? ' is-end' : '';
  return `<button type="button" class="v-marker${side}" style="--x:${x}%;--y:${y}%" aria-expanded="false"`
    + ` aria-label="${esc(`${glyph} ${title}: ${text}`)}">`
    + `<span class="v-marker-n" aria-hidden="true">${n}</span>`
    + `<span class="v-tip" aria-hidden="true"><b>${esc(title)}</b>${esc(text)}</span></button>`;
}

export function withMarkers(inner, markers) {
  return `<div class="v-marked">${inner}${markers.map(marker).join('')}</div>`;
}

/* ------------------------------------------------------------------ *
 * Frames and specs
 * ------------------------------------------------------------------ */

// A true-ratio frame with dimensions drawn on the edges like a drawing.
export function ratioFrame({w, h, ratio, label = '', img = 's-shelf', size = '', video = false}) {
  return `<figure class="v-ratio" style="--r:${w}/${h}">`
    + `<div class="v-ratio-box"><div class="photo${video ? ' dark' : ''}">${shot(img)}</div>`
    + (video ? `<span class="sp-play">${icon('play')}</span>` : '')
    + `<span class="v-dim v-dim-w"><span>${w} px</span></span>`
    + `<span class="v-dim v-dim-h"><span>${h} px</span></span></div>`
    + `<figcaption><b>${esc(ratio)}</b>${label ? ` ${esc(label)}` : ''}${size ? `<em>${esc(size)}</em>` : ''}</figcaption>`
    + '</figure>';
}

// A sample text field with a live character counter.
export function charBox({id, label, text, limit, multiline = false}) {
  const field = multiline
    ? `<textarea id="${id}" rows="2" data-limit="${limit}">${esc(text)}</textarea>`
    : `<input id="${id}" type="text" value="${esc(text)}" data-limit="${limit}">`;
  const n = [...text].length;
  return '<div class="v-charbox" data-counter>'
    + `<label for="${id}"><span>${esc(label)}</span><span class="v-count"><b>${n}</b>/${limit}</span></label>`
    + field
    + `<span class="v-meter"><i style="--v:${Math.min(n / limit, 1).toFixed(3)}"></i></span></div>`;
}

// An opened folder of asset thumbnails; `done` marks which are ready.
export function assetKit({title = 'Bộ tài nguyên', files}) {
  const items = files.map((f, i) => `<li class="${f.done ? 'is-done' : ''}" style="--i:${i}">`
    + `<span class="v-file">${f.img ? `<i class="photo">${shot(f.img)}</i>` : icon(f.icon || 'file')}</span>`
    + `<span class="v-file-name">${esc(f.name)}</span>`
    + `<i class="v-tick">${icon(f.done ? 'check' : 'dot')}</i></li>`).join('');
  return `<div class="v-kit">`
    + `<div class="v-kit-tab">${icon('folder')}<b>${esc(title)}</b><span>${files.filter(f => f.done).length}/${files.length}</span></div>`
    + `<ul>${items}</ul></div>`;
}

/* ------------------------------------------------------------------ *
 * Diagrams
 * ------------------------------------------------------------------ */

// A horizontal chain of stages joined by a glowing connector with a signal
// dot running along it. steps: [{icon, label, mini?}]
export function flow(steps, {cls = '', label = ''} = {}) {
  const items = steps.map((s, i) => `<li style="--i:${i}">`
    + `<span class="v-node">${icon(s.icon)}</span>`
    + (s.mini ? `<div class="v-flow-mini">${s.mini}</div>` : '')
    + `<b>${esc(s.label)}</b>`
    + (s.note ? `<small>${esc(s.note)}</small>` : '')
    + '</li>').join('');
  return `<div class="v-flow${cls ? ' ' + cls : ''}" data-anim style="--n:${steps.length}"${attr('aria-label', label || null)}${label ? ' role="group"' : ''}>`
    + '<span class="v-wire" aria-hidden="true"><i class="v-pulse"></i></span>'
    + `<ol>${items}</ol></div>`;
}

// Inputs slide into a core, results come out the other side.
export function machine({inputs, core, outputs, cls = ''}) {
  const tile = (t, i) => `<li style="--i:${i}">${icon(t.icon)}<span>${esc(t.label)}</span></li>`;
  return `<div class="v-machine${cls ? ' ' + cls : ''}" data-anim>`
    + `<div class="v-mach-col v-in"><small>${esc(inputs.title || 'Bạn đưa vào')}</small><ul>${inputs.items.map(tile).join('')}</ul></div>`
    + '<span class="v-mach-pipe" aria-hidden="true"><i></i></span>'
    + `<div class="v-core">${icon(core.icon || 'gear', 'v-core-ico')}<b>${esc(core.label)}</b>${core.note ? `<small>${esc(core.note)}</small>` : ''}</div>`
    + '<span class="v-mach-pipe" aria-hidden="true"><i></i></span>'
    + `<div class="v-mach-col v-out"><small>${esc(outputs.title || 'Bạn nhận lại')}</small><ul>${outputs.items.map(tile).join('')}</ul></div>`
    + '</div>';
}

// The measurement pipeline. Stations are tabs; clicking one opens its drawer
// and clicking it again closes it.
// columns: [[station, …], …] — a column with several stations is a fan-out
// (the same data feeding three tools). A station may carry `under`, a side
// branch hanging below it (Enhanced Conversions under the form, Merchant
// Center under the link). station: {id, icon, label, ui, drawer, under?}
export function pipeline({columns, label = 'Đường đi của dữ liệu'}) {
  const flat = [];
  const shape = columns.map(col => col.map(s => {
    const main = flat.push({...s, cls: 'v-station'}) - 1;
    const sub = s.under ? flat.push({...s.under, cls: 'v-station is-branch'}) - 1 : -1;
    return [main, sub];
  }));
  const items = flat.map(s => ({
    id: s.id,
    cls: s.cls,
    tab: `<span class="v-st-head">${icon(s.icon)}<b>${esc(s.label)}</b></span>`
      + (s.ui ? `<span class="v-st-ui">${s.ui}</span>` : ''),
    panel: s.drawer || ''
  }));
  const layout = buttons => shape.map(col => `<div class="v-pcol${col.length > 1 ? ' is-fan' : ''}" role="presentation">`
    + col.map(([m, u]) => '<div class="v-pcell" role="presentation">' + buttons[m]
      + (u >= 0 ? `<span class="v-branch-wire" aria-hidden="true"></span>${buttons[u]}` : '') + '</div>').join('')
    + '</div>').join('');
  return `<div class="v-pipeline" data-anim style="--cols:${columns.length}">`
    + '<span class="v-pipe" aria-hidden="true"><i class="v-pipe-dot"></i><i class="v-pipe-dot"></i><i class="v-pipe-dot"></i></span>'
    + tabs({label, items, cls: 'v-pipe-tabs', active: -1, toggle: true, listCls: 'v-stations', layout})
    + '</div>';
}

// A vertical funnel whose tier widths follow the sample numbers. Tiers are
// tabs; the panel holds the tier's visual equation and advice.
// tiers: [{id, label, value, unit, panel}]
export function funnel({tiers, label = 'Phễu kết quả', active = 0}) {
  const max = Math.max(...tiers.map(t => t.value));
  const fmt = v => v.toLocaleString('vi-VN');
  // Log scale: 20 000 views and 12 orders both stay readable as tiers.
  const width = v => .3 + .7 * Math.log(Math.max(v, 1) + 1) / Math.log(max + 1);
  const items = tiers.map((t, i) => ({
    id: t.id,
    tab: `<span class="v-tier-bar" style="--w:${width(t.value).toFixed(3)}"><i></i></span>`
      + `<span class="v-tier-txt"><b>${fmt(t.value)}</b><span>${esc(t.label)}</span></span>`,
    panel: t.panel || ''
  }));
  return `<div class="v-funnel" data-anim>`
    + '<span class="v-particles" aria-hidden="true">' + '<i></i>'.repeat(8) + '</span>'
    + tabs({label, items, cls: 'v-funnel-tabs', active, vertical: true, listCls: 'v-tiers'})
    + '</div>';
}

// A visual equation: CTR = clicks ÷ impressions, with the ratio as a bar.
export function equation({name, top, bottom, result, ratio}) {
  const fmt = v => typeof v === 'number' ? v.toLocaleString('vi-VN') : esc(v);
  return '<div class="v-eq">'
    + `<b class="v-eq-name">${esc(name)}</b><span class="v-eq-op">=</span>`
    + `<span class="v-frac"><span><b>${fmt(top.value)}</b>${esc(top.label)}</span><i></i>`
    + `<span><b>${fmt(bottom.value)}</b>${esc(bottom.label)}</span></span>`
    + `<span class="v-eq-op">=</span><b class="v-eq-res">${esc(result)}</b>`
    + `<span class="v-eq-bar" aria-hidden="true"><i style="--v:${Math.min(ratio, 1).toFixed(3)}"></i></span>`
    + '</div>';
}

/* ------------------------------------------------------------------ *
 * Picker art: one small animated scene per campaign type, drawn in the
 * card above its name. The loop plays on hover, focus, or while the card
 * is the selected one; at rest each scene shows its last frame.
 * ------------------------------------------------------------------ */
const PICK_ART = {
  search: () => '<div class="pa-win">'
    + `<div class="pa-bar">${icon('search')}<span class="pa-q" style="--n:19">nến thơm thiên nhiên</span></div>`
    + '<div class="pa-ad"><span class="spons">Được tài trợ</span>'
    + `<b>Nến thơm thiên nhiên — Giao trong 2 giờ</b><em><i class="fav"></i>${SHOP}</em></div>`
    + '<div class="pa-org"><b>Cách chọn nến thơm cho phòng ngủ</b><em>gocsongxanh.example</em></div></div>',

  pmax: () => '<div class="pa-screens">'
    + `<div class="pa-scr" style="--i:0"><span class="pa-mini-bar">${icon('search')}</span><b class="pa-cap">Tìm kiếm</b></div>`
    + `<div class="pa-scr is-dark" style="--i:1"><div class="photo dark">${shot('s-hero')}<span class="pa-play">${icon('play')}</span></div><b class="pa-cap">Video</b></div>`
    + `<div class="pa-scr" style="--i:2"><div class="photo">${shot('s-shelf')}</div><b class="pa-cap">Bảng tin</b></div>`
    + `<div class="pa-scr" style="--i:3"><span class="pa-pin">${icon('pin')}</span><b class="pa-cap">Bản đồ</b></div>`
    + '<span class="pa-sweep"></span></div>',

  shopping: () => '<div class="pa-shelf">'
    + [0, 5, 2].map((p, i) => {
      const [img, name, price] = PRODUCTS[p];
      return `<div class="pa-prod${i === 1 ? ' is-ours' : ''}" style="--i:${i}"><div class="photo">${shot(img)}</div>`
        + `<b>${esc(name)}</b><em>${esc(price)}</em>`
        + (i === 1 ? '<span class="spons">Được tài trợ</span>' : '') + '</div>';
    }).join('') + '</div>',

  demand: () => '<div class="pa-phone"><div class="pa-feed">'
    + '<div class="pa-post"><b>Góc Sống Xanh</b><span>Ba cách làm phòng ngủ thơm dịu</span></div>'
    + `<div class="pa-post"><div class="photo">${shot('s5')}</div><span>Gấp khăn kiểu khách sạn</span></div>`
    + `<div class="pa-post is-ad"><span class="spons">Được tài trợ</span><div class="photo">${shot('s-shelf')}</div>`
    + '<b>Góc thư giãn cuối ngày</b><span class="cta-chip">Tìm hiểu thêm</span></div>'
    + '</div></div>',

  video: () => `<div class="pa-player"><div class="photo dark">${shot('s-hero')}`
    + '<span class="p-badge">Quảng cáo</span>'
    + '<span class="pa-count"><i>Bỏ qua sau 5</i><i>Bỏ qua sau 4</i><i>Bỏ qua sau 3</i><i>Bỏ qua sau 2</i><i>Bỏ qua sau 1</i></span>'
    + '<span class="pa-skip">Bỏ qua ▸|</span>'
    + '<span class="pa-prog"><i></i></span></div></div>',

  app: () => '<div class="pa-store">'
    + `<div class="pa-app-top"><span class="app-icon">${shot('s6')}</span><div><b>Nhà Thơm</b><em>Nến & tinh dầu · 4,7 ★</em></div></div>`
    + '<span class="pa-install"><i class="pa-fill"></i>'
    + '<span class="pa-l1">Cài đặt</span><span class="pa-l2">Đang tải…</span><span class="pa-l3">Mở</span></span>'
    + `<div class="pa-shots"><i class="photo">${shot('s1')}</i><i class="photo">${shot('s3')}</i><i class="photo">${shot('s2')}</i></div>`
    + '</div>'
};

export function pickArt(id) {
  const render = PICK_ART[id];
  return render ? `<span class="pa pa-${id}" aria-hidden="true">${render()}</span>` : '';
}

/* ------------------------------------------------------------------ *
 * What the customer sees after tapping a button on the landing page.
 * Used by the measurement chapter: one screen per kind of action.
 * ------------------------------------------------------------------ */
const chatWindow = (label, cls) => `<div class="v-chat ${cls}">`
  + `<div class="v-chat-top">${icon('chat')}<span><b>${esc(label)}</b><small>Nhà Thơm · đang hoạt động</small></span></div>`
  + '<div class="v-chat-body">'
  + '<p class="is-shop">Chào bạn, Nhà Thơm có thể giúp gì ạ?</p>'
  + '<p class="is-me">Mình cần 20 hộp nến làm quà tặng</p>'
  + '<p class="is-shop">Dạ, mình gửi bảng giá sỉ ngay nhé.</p>'
  + '</div>'
  + `<div class="v-chat-in"><span>Nhập tin nhắn…</span>${icon('arrow')}</div></div>`;

const SCREENS = {
  call: () => '<div class="v-dial">'
    + `<span class="v-dial-av">${icon('phone')}</span>`
    + '<b>Hotline Nhà Thơm</b><span class="v-dial-num">1900 •••• 18</span><small>Đang gọi…</small>'
    + '<span class="v-dial-keys">' + '<i></i>'.repeat(9) + '</span>'
    + `<span class="v-dial-end">${icon('phone')}</span></div>`,
  zalo: () => chatWindow('Zalo', 'is-zalo'),
  messenger: () => chatWindow('Messenger', 'is-msg'),
  form: () => '<div class="v-form">'
    + '<b>Nhận tư vấn</b>'
    + '<span class="v-form-f"><small>Họ tên</small>Nguyễn Lan</span>'
    + '<span class="v-form-f"><small>Điện thoại</small>09•• ••• 218</span>'
    + '<span class="v-form-f"><small>Nhu cầu</small>20 hộp quà tặng</span>'
    + '<span class="v-form-btn">Gửi yêu cầu</span>'
    + `<span class="v-form-ok">${icon('check')}Đã gửi thành công</span></div>`,
  product: () => '<div class="v-pdp">'
    + `<div class="photo">${shot('s6')}</div>`
    + '<b>Nến thơm nắp gỗ 200g</b><em>320.000₫</em>'
    + '<span class="v-pdp-btn">Thêm vào giỏ</span></div>',
  price: () => '<div class="v-pdp">'
    + `<div class="photo">${shot('s3')}</div>`
    + '<b>Khuếch tán que gỗ 150ml</b>'
    + '<span class="v-price"><s>390.000₫</s><em>340.000₫</em></span>'
    + '<span class="v-chip" data-accent="good">Còn hàng</span></div>',
  install: () => appPage({state: 'open'}),
  store: () => appPage({state: 'install'}),
  video: () => '<div class="v-watch">' + player({label: 'Video · 0:42', skippable: false})
    + '<b class="v-watch-t">Cách dùng tinh dầu cho phòng ngủ</b><em class="v-watch-m">Nhà Thơm · 3,1 N lượt xem</em></div>',
  page: () => '<div class="v-pdp">'
    + `<div class="photo">${shot('s-desk')}</div>`
    + '<b>Bộ sưu tập quà tặng</b><em>Hộp 3 nến thơm · từ 690.000₫</em>'
    + '<span class="v-pdp-btn">Xem bộ sưu tập</span></div>'
};

export function actionScreen(kind) {
  return (SCREENS[kind] || SCREENS.page)();
}

// A big-type callout for the one sentence a block exists to say.
// `extra` is trusted HTML placed under the sentence (usually a more()).
export function keyPoint(text, {ic = 'spark', label = 'ĐIỂM CHÍNH', extra = ''} = {}) {
  return `<div class="key-pt"><span class="key-pt-ico">${icon(ic)}</span>`
    + `<div><small>${esc(label)}</small><p>${esc(text)}</p>${extra}</div></div>`;
}

/* ------------------------------------------------------------------ *
 * Pictures for asset specs that are not a single image frame: files,
 * field lists, dates, durations, pairs of ratios.
 * ------------------------------------------------------------------ */
export function filePic(ext = 'JPG', size = '5 MB') {
  return '<span class="sp-file">'
    + `<span class="sp-doc"><i class="photo">${shot('s-shelf')}</i><b>${esc(ext)}</b></span>`
    + `<span class="sp-size">${icon('file')}<em>≤ ${esc(size)}</em></span></span>`;
}

export function chipsPic(items) {
  return '<span class="sp-chips">' + items.map((t, i) => `<i style="--i:${i}">${esc(t)}</i>`).join('') + '</span>';
}

export function framesPic(ratios, {video = false, label = ''} = {}) {
  return '<span class="sp-frames">' + ratios.map(r => {
    const [a, b] = r.split(':').map(Number);
    const img = a / b > 1.2 ? 's-shelf' : a / b < .8 ? 's-tall' : 's6';
    return `<span class="sp-frame" style="--r:${a}/${b}"><span class="sp-box"><i class="photo">${shot(img)}</i>`
      + (video ? `<span class="sp-play">${icon('play')}</span>` : '')
      + (label ? `<span class="sp-logo">${esc(label)}</span>` : '')
      + `</span><em>${esc(r)}</em></span>`;
  }).join('') + '</span>';
}

export function datePic(date) {
  const [d, m, y] = date.split('/');
  return `<span class="sp-date">${icon('calendar')}<b>${esc(d)}</b><span>tháng ${Number(m)}<br>${esc(y)}</span></span>`;
}

export function syncPic() {
  return '<span class="sp-sync">'
    + `<span class="sp-src">${icon('globe')}<small>Website</small><b>320.000₫</b></span>`
    + `<span class="sp-link">${icon('repeat')}</span>`
    + `<span class="sp-src">${icon('table')}<small>Nguồn dữ liệu</small><b>320.000₫</b></span></span>`;
}

export function durationPic(from = '0:10', to = '1:00') {
  return `<span class="sp-dur">${icon('clock')}<span class="sp-dur-bar"><i></i></span><span class="sp-dur-t"><em>${esc(from)}</em><em>${esc(to)}</em></span></span>`;
}

export function layersPic(items) {
  return '<span class="sp-layers">' + items.slice(0, 5).map((t, i) => `<i style="--i:${i}">${esc(t)}</i>`).join('') + '</span>';
}
