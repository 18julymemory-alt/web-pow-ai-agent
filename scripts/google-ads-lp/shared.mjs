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

export const V = '3';

/* ------------------------------------------------------------------ *
 * Navigation between the three landing pages of each channel
 * ------------------------------------------------------------------ */
const threePages = (base, hints) => [
  {key: 'formats', href: base, num: '01', label: 'Cách chạy & định dạng', hint: hints[0]},
  {key: 'goals', href: base + 'chon-cach-chay/', num: '02', label: 'Chọn cách chạy', hint: hints[1]},
  {key: 'budget', href: base + 'chi-phi-hieu-qua/', num: '03', label: 'Chi phí & hiệu quả', hint: hints[2]}
];

// The smaller services are one landing page each (ONE_PAGE_ADS_PLAN.md).
const onePage = href => [{key: 'one', href, num: '01', label: 'Tổng quan', hint: ''}];
const MC = '/dich-vu/quang-cao-da-kenh/';
const WL = '/dich-vu/website-landing-page/';
const web = (slug, name, accent) => ({
  name, pages: onePage(WL + slug + '/'), stepsLabel: '', crumb: name, group: [WL, 'Website & Landing Page'],
  css: ['/one-page-lp.css', '/website-lp.css'], bodyClass: 'op-lp ws-lp', accent, sourceLabel: 'Tài liệu tham khảo:'
});
const TM = '/dich-vu/thuong-mai-dien-tu/';
const ecom = (slug, name, accent) => ({
  name, pages: onePage(TM + slug + '/'), stepsLabel: '', crumb: name, group: [TM, 'Thương mại điện tử'],
  css: ['/one-page-lp.css', '/website-lp.css', '/training-lp.css', '/commerce-lp.css'], bodyClass: 'op-lp ws-lp tr-lp cm-lp', accent, sourceLabel: 'Tài liệu tham khảo:'
});
const DT = '/dich-vu/dao-tao-digital-marketing/';
const edu = (slug, name, accent, extra = []) => ({
  name, pages: onePage(DT + slug + '/'), stepsLabel: '', crumb: name, group: [DT, 'Đào tạo Digital Marketing'],
  css: [...extra, '/one-page-lp.css', '/website-lp.css', '/training-lp.css'], bodyClass: 'op-lp ws-lp tr-lp', accent, sourceLabel: 'Tài liệu tham khảo:'
});

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
  },
  instagram: {
    name: 'Instagram Ads', pages: onePage(MC + 'instagram-ads/'), stepsLabel: '', crumb: 'Instagram Ads',
    css: ['/facebook-ads-lp.css', '/one-page-lp.css'], bodyClass: 'op-lp', accent: '#edb1d8', sourceLabel: 'Tài liệu Meta:'
  },
  youtube: {
    name: 'YouTube Ads', pages: onePage(MC + 'youtube-ads/'), stepsLabel: '', crumb: 'YouTube Ads',
    css: ['/one-page-lp.css'], bodyClass: 'op-lp', accent: '#f4adad', sourceLabel: 'Tài liệu Google:'
  },
  remarketing: {
    name: 'Remarketing', pages: onePage(MC + 'remarketing/'), stepsLabel: '', crumb: 'Remarketing',
    css: ['/facebook-ads-lp.css', '/one-page-lp.css'], bodyClass: 'op-lp', accent: '#c9b8ec', sourceLabel: 'Tài liệu nền tảng:'
  },
  performance: {
    name: 'Performance Marketing', pages: onePage(MC + 'performance-marketing/'), stepsLabel: '', crumb: 'Performance Marketing',
    css: ['/facebook-ads-lp.css', '/one-page-lp.css'], bodyClass: 'op-lp', accent: '#a2dfc5', sourceLabel: 'Tài liệu nền tảng:'
  },
  cro: {
    name: 'Tối ưu chuyển đổi quảng cáo', pages: onePage(MC + 'toi-uu-chuyen-doi-quang-cao/'), stepsLabel: '', crumb: 'Tối ưu chuyển đổi',
    css: ['/one-page-lp.css'], bodyClass: 'op-lp', accent: '#eac897', sourceLabel: 'Tài liệu tham khảo:'
  },
  // Website & Landing Page (WEBSITE_LP_PLAN.md): one landing page per service,
  // same renderer, plus website-lp.css and the group in the breadcrumb.
  webCorp: web('website-doanh-nghiep', 'Website doanh nghiệp', '#9fc8ff'),
  webShop: web('website-ban-hang', 'Website bán hàng', '#ffc59a'),
  webLanding: web('landing-page', 'Landing Page', '#f3a9c9'),
  webWp: web('wordpress', 'WordPress', '#a9c4ec'),
  webCustom: web('website-theo-yeu-cau', 'Website theo yêu cầu', '#b9a8f2'),
  webUx: web('ui-ux', 'UI/UX', '#e0b3ff'),
  webCro: web('cro-toi-uu-chuyen-doi', 'CRO – tối ưu chuyển đổi', '#f0d28a'),
  webCare: web('bao-tri-website', 'Bảo trì Website', '#9fe0c9'),
  webSpeed: web('toi-uu-toc-do', 'Tối ưu tốc độ', '#8fe3f0'),
  webIntegrate: web('tich-hop-he-thong', 'Tích hợp hệ thống', '#b8e08f'),
  // Đào tạo Digital Marketing (TRAINING_LP_PLAN.md): one landing page per
  // course on the same renderer, reusing the website mocks.
  eduOverview: edu('digital-marketing-tong-the', 'Digital Marketing tổng thể', '#9fd8ff'),
  eduGoogle: edu('google-ads', 'Google Ads', '#a8c8ff'),
  eduFacebook: edu('facebook-ads', 'Facebook Ads', '#9db8f5', ['/facebook-ads-lp.css']),
  eduTiktok: edu('tiktok-ads', 'TikTok Ads', '#f5a3c0'),
  eduSeo: edu('seo', 'SEO', '#a6e3b8'),
  eduContent: edu('content-marketing', 'Content Marketing', '#f3c79a'),
  eduSocial: edu('social-media-marketing', 'Social Media Marketing', '#d4b3ff'),
  eduWebsite: edu('website-marketing', 'Website Marketing', '#9fc8ff'),
  eduGa4: edu('ga4-tracking', 'GA4 & Tracking', '#ffd08a'),
  eduAi: edu('ai-marketing', 'AI Marketing', '#8fe3d6'),
  eduAuto: edu('automation', 'Automation', '#b8e08f'),
  eduPractice: edu('marketing-thuc-chien-cho-doanh-nghiep', 'Marketing thực chiến cho doanh nghiệp', '#ffb89a'),
  eduTeam: edu('dao-tao-doi-ngu-marketing-noi-bo', 'Đào tạo đội ngũ Marketing nội bộ', '#c9d0ff'),
  // Thương mại điện tử (COMMERCE_LP_PLAN.md): one landing page per service.
  ecomShopee: ecom('shopee', 'Shopee', '#ff9f80'),
  ecomTiktok: ecom('tiktok-shop', 'TikTok Shop', '#f5a3c0'),
  ecomWebsite: ecom('website-ban-hang', 'Website bán hàng', '#ffc59a'),
  ecomSetup: ecom('thiet-lap-gian-hang', 'Thiết lập gian hàng', '#9fd8ff'),
  ecomListing: ecom('toi-uu-san-pham', 'Tối ưu sản phẩm', '#b8e08f'),
  ecomAds: ecom('quang-cao-san', 'Quảng cáo sàn', '#ffd08a'),
  ecomOps: ecom('van-hanh-gian-hang', 'Vận hành gian hàng', '#9fe0c9'),
  ecomContent: ecom('content-thuong-mai-dien-tu', 'Content thương mại điện tử', '#d4b3ff')
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

export function crumbs(current, [groupHref, groupName] = ['/dich-vu/quang-cao-da-kenh/', 'Quảng cáo đa kênh']) {
  return '<nav class="crumbs" aria-label="Đường dẫn">'
    + '<a href="/#gateway">Trang chủ</a><span>/</span>'
    + '<a href="/dich-vu/">Dịch vụ</a><span>/</span>'
    + `<a href="${groupHref}">${esc(groupName)}</a><span>/</span>`
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
