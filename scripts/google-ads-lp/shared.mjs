// Shared shell + building blocks for the three Google Ads landing pages.
// Markup is authored here directly: no HTML slicing, no import of google-ads-page.mjs.

import {esc, icon} from './visuals.mjs';

// The visual kit owns icons, mock-ups and diagrams; re-exported here so the
// page modules keep one import line.
export {
  esc, icon, shot, mock, hasMock, SHOP, PRODUCTS, browser, phone, stage, tiltStage,
  searchHead, serpAd, productCard, productGrid, carousel, player, feedCard, appPage,
  landingPhone, reportTable, contactReport, crmTable, eventLog, utmBar, tagList, ga4Mini,
  ecField, callLog, merchantGrid, offlineRow, lineChart, barChart, targetDots, knob, ring,
  stackBar, tabs, more, marker, withMarkers, ratioFrame, charBox, assetKit, flow, machine,
  pipeline, funnel, equation, CONTACT_ACTIONS
} from './visuals.mjs';

/* ------------------------------------------------------------------ *
 * Placeholders. Replace once the real values are confirmed.
 * ------------------------------------------------------------------ */
export const placeholders = {
  hotline: '[HOTLINE]',
  zalo: '[ZALO]',
  formEndpoint: '[FORM_ENDPOINT]'
};

/* ------------------------------------------------------------------ *
 * The real header and footer, same markup and hooks as every other page.
 * navigation.js hydrates .pow-header / #header-navigation.
 * ------------------------------------------------------------------ */
const HEADER = '<header class="pow-header">'
  + '<a href="/#gateway" class="brand" aria-label="POWAI trang chủ">POW<span>AI</span><small>MARKETING × TECHNOLOGY</small></a>'
  + '<div id="header-navigation"></div>'
  + '<a class="contact" href="/lien-he/">Nhận tư vấn <span>→</span></a>'
  + '<button class="mobile-nav-toggle" type="button" aria-label="Mở menu" aria-expanded="false" aria-controls="pow-navigation"><span></span><span></span></button>'
  + '</header>';

const FOOTER = '<footer class="page-footer">'
  + '<a href="/#gateway">POWAI</a>'
  + '<span>Marketing × Technology × AI</span>'
  + '<a href="/dich-vu/">Tất cả dịch vụ →</a>'
  + '</footer>';

const SKY = '<div class="ga-sky" aria-hidden="true"><i></i><i></i></div>';

export const V = '2';

/* ------------------------------------------------------------------ *
 * Navigation between the three landing pages of each channel
 * ------------------------------------------------------------------ */
const threePages = (base, hints) => [
  {key: 'formats', href: base, num: '01', label: 'Cách chạy & định dạng', hint: hints[0]},
  {key: 'goals', href: base + 'chon-cach-chay/', num: '02', label: 'Chọn cách chạy', hint: hints[1]},
  {key: 'budget', href: base + 'chi-phi-hieu-qua/', num: '03', label: 'Chi phí & hiệu quả', hint: hints[2]}
];

// One row per ad channel. The frame, the script and every shared class stay
// the same; a channel only adds its own stylesheet, body class, labels and
// accent. Add a channel by adding a row, never a branch in the renderer.
export const CHANNELS = {
  google: {
    name: 'Google Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/google-ads/', [
      'Sáu loại chiến dịch trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới loại chiến dịch và đối tượng.',
      'Ngân sách, thuế phí, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu Google Ads',
    crumb: 'Google Ads',
    css: [],
    bodyClass: '',
    accent: '',
    sourceLabel: 'Tài liệu Google:'
  },
  facebook: {
    name: 'Facebook Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/facebook-ads/', [
      'Sáu kiểu quảng cáo trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới mục tiêu chiến dịch và đối tượng.',
      'Ngân sách, thuế, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu Facebook Ads',
    crumb: 'Facebook Ads',
    css: ['/facebook-ads-lp.css'],
    bodyClass: 'fb-lp',
    accent: '',
    sourceLabel: 'Tài liệu Meta:'
  },
  tiktok: {
    name: 'TikTok Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/tiktok-ads/', [
      'Sáu kiểu quảng cáo video trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới mục tiêu chiến dịch và đối tượng.',
      'Ngân sách, thuế, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu TikTok Ads',
    crumb: 'TikTok Ads',
    css: ['/tiktok-ads-lp.css'],
    bodyClass: 'tt-lp',
    accent: '#ff9bc1',
    sourceLabel: 'Tài liệu TikTok:'
  },
  zalo: {
    name: 'Zalo Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/zalo-ads/', [
      'Sáu kiểu quảng cáo trên Zalo trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới kiểu quảng cáo và đối tượng.',
      'Ngân sách, hóa đơn, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu Zalo Ads',
    crumb: 'Zalo Ads',
    css: ['/zalo-ads-lp.css'],
    bodyClass: 'zl-lp',
    accent: '#9bcaff',
    sourceLabel: 'Tài liệu Zalo Ads:'
  },
  chatgpt: {
    name: 'ChatGPT Ads',
    pages: threePages('/dich-vu/quang-cao-da-kenh/chatgpt-ads/', [
      'Quảng cáo trong ChatGPT trông như thế nào và chạy ra sao.',
      'Từ mục tiêu kinh doanh tới ngữ cảnh, đối tượng và ngành được chạy.',
      'Ngân sách, đo lường và triển khai cùng POWAI.'
    ]),
    stepsLabel: 'Ba bước tìm hiểu ChatGPT Ads',
    crumb: 'ChatGPT Ads',
    css: ['/chatgpt-ads-lp.css'],
    bodyClass: 'cg-lp',
    accent: '#85e1c1',
    sourceLabel: 'Tài liệu OpenAI:'
  }
};

export const PAGES = CHANNELS.google.pages;
export const FB_PAGES = CHANNELS.facebook.pages;
export const TT_PAGES = CHANNELS.tiktok.pages;
export const ZL_PAGES = CHANNELS.zalo.pages;
export const CG_PAGES = CHANNELS.chatgpt.pages;

export function document_({title, description, page, body, channel = 'google'}) {
  const ch = CHANNELS[channel];
  if (!ch) throw new Error('Unknown ad channel: ' + channel);
  return '<!doctype html><html lang="vi"><head><meta charset="utf-8">'
    + '<meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<meta name="theme-color" content="#020812">'
    + '<link rel="icon" type="image/svg+xml" href="/powai-favicon.svg">'
    + `<title>${esc(title)} | POWAI</title>`
    + `<meta name="description" content="${esc(description)}">`
    + '<link rel="stylesheet" href="/style.css">'
    + '<link rel="stylesheet" href="/navigation.css">'
    + `<link rel="stylesheet" href="/google-ads-lp.css?v=${V}">`
    + ch.css.map(href => `<link rel="stylesheet" href="${href}?v=${V}">`).join('')
    + `</head><body class="ga-lp${ch.bodyClass ? ' ' + ch.bodyClass : ''} ga-${page}"`
    + (ch.accent ? ` style="--accent:${ch.accent}"` : '') + '>'
    + SKY + HEADER
    + `<main id="page-content" data-ga-page="${page}">${body}</main>`
    + FOOTER
    + '<script type="module" src="/navigation.js?v=menu-clean-2"></script>'
    + `<script type="module" src="/google-ads-lp.js?v=${V}"></script>`
    + '</body></html>';
}

export function stepsBar(active, pages = PAGES, label = 'Ba bước tìm hiểu Google Ads') {
  const items = pages.map(p => {
    const on = p.key === active;
    return `<a href="${p.href}"${on ? ' aria-current="page"' : ''}>`
      + `<b>${p.num}</b><div><span>${esc(p.label)}</span><small>${esc(p.hint)}</small></div></a>`;
  }).join('');
  return `<nav class="steps-nav" aria-label="${esc(label)}"><div class="wrap"><div class="steps-bar">${items}</div></div></nav>`;
}

export function crumbs(current) {
  return '<nav class="crumbs" aria-label="Đường dẫn">'
    + '<a href="/#gateway">Trang chủ</a><span>/</span>'
    + '<a href="/dich-vu/">Dịch vụ</a><span>/</span>'
    + '<a href="/dich-vu/quang-cao-da-kenh/">Quảng cáo đa kênh</a><span>/</span>'
    + `<b aria-current="page">${esc(current)}</b></nav>`;
}

export function kicker(text) {
  return `<span class="kicker">${esc(text)}</span>`;
}

// Picks the icon that matches a call-to-action label written in Vietnamese.
const ACTION_ICONS = [
  ['hotline', 'phone'], ['gọi', 'phone'], ['zalo', 'chat'], ['messenger', 'chat'],
  ['chat', 'chat'], ['nhắn', 'chat'], ['form', 'form'], ['biểu mẫu', 'form'],
  ['đăng ký', 'form'], ['đơn', 'cart'], ['mua', 'cart'], ['giỏ', 'cart'],
  ['thanh toán', 'cart'], ['cài', 'install'], ['tải', 'install'], ['xem', 'play'],
  ['video', 'play'], ['đường', 'pin'], ['bản đồ', 'pin'], ['ghé', 'pin']
];

export function actionIcon(label) {
  const text = String(label).toLowerCase();
  const hit = ACTION_ICONS.find(([key]) => text.includes(key));
  return icon(hit ? hit[1] : 'convert');
}

export function secHead({eyebrow, title, lead, center = false, big = false}) {
  // A <div>, not a <header>: style.css pins every <header> to the viewport.
  return `<div class="sec-head${center ? ' center' : ''}${big ? ' lead-in' : ''}">`
    + (eyebrow ? kicker(eyebrow) : '')
    + `<h2>${title}</h2>`
    + (lead ? `<p class="lead">${esc(lead)}</p>` : '')
    + '</div>';
}

export function section({id, cls = '', veil = false, inner}) {
  return `<section${id ? ` id="${id}"` : ''} class="lp-section${veil ? ' veiled' : ''}${cls ? ' ' + cls : ''}">`
    + `<div class="wrap">${inner}</div></section>`;
}

export function nextBlock({eyebrow, title, text, href, cta}) {
  return '<aside class="next rv">'
    + `<div>${kicker(eyebrow)}<h3>${esc(title)}</h3><p>${esc(text)}</p></div>`
    + `<a class="btn btn-cyan" href="${href}">${esc(cta)} <span aria-hidden="true">→</span></a>`
    + '</aside>';
}

// A source is [id, label]; an id that is already a URL is used as is (the
// Facebook pages cite Meta's help centre and developer docs).
export function sourceList(sources, keys, {label = 'Tài liệu Google:'} = {}) {
  const links = keys
    .filter(k => sources[k])
    .map(k => {
      const [id, text] = sources[k];
      const href = /^https?:/.test(id) ? id : `https://support.google.com/google-ads/answer/${id}`;
      return `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(text)} ↗</a>`;
    })
    .join('');
  return links ? `<p class="sources"><span>${esc(label)}</span>${links}</p>` : '';
}
