// Platform mock-ups, one per ad format (GOOGLE_ADS_FIX_VISUALS_PROMPT.md, PHẦN B).
//
// Rules every mock keeps:
// - Real layout, no platform logos: a search page is a query bar and result
//   tabs, a video page is a player and a list of videos.
// - One sample brand, Nhà Thơm (nhathom.example), and its six products.
// - Every picture sits in a fixed-ratio frame (.mk-img.rXX) and is cropped
//   with object-fit: cover, never stretched.
// - Text is 11px or larger; ad titles stop at two lines.
// - At most two grey placeholder bars; the rest is sample content.
// - Frames tilt 4° at most (the hero may tilt more).
import {esc, icon, shot, SHOP, PRODUCTS} from './visuals.mjs';

export const BRAND = 'Nhà Thơm';

/* ------------------------------------------------------------------ *
 * Building blocks
 * ------------------------------------------------------------------ */
const img = (name, ratio = 'r11', cls = '') => `<span class="mk-img ${ratio}${cls ? ' ' + cls : ''}">${shot(name)}</span>`;
const fav = (letter = 'N', cls = '') => `<i class="mk-fav${cls ? ' ' + cls : ''}" aria-hidden="true">${esc(letter)}</i>`;

export function win(url, inner, cls = '') {
  return `<div class="mk-win${cls ? ' ' + cls : ''}" data-mock>`
    + '<div class="mk-chrome"><span class="mk-dots"><i></i><i></i><i></i></span>'
    + `<span class="mk-url">${icon('lock')}<span>${esc(url)}</span></span></div>`
    + `<div class="mk-page">${inner}</div></div>`;
}

export function handset(inner, {dark = false, cls = ''} = {}) {
  return `<div class="mk-phone${dark ? ' is-dark' : ''}${cls ? ' ' + cls : ''}" data-mock>`
    + '<div class="mk-scr"><div class="mk-status"><b>9:41</b><span><i></i><i></i><i></i></span></div>'
    + inner + '</div></div>';
}

const TABS = ['Tất cả', 'Mua sắm', 'Hình ảnh', 'Video', 'Bản đồ'];
function query(q, {active = 'Tất cả', tabs = true} = {}) {
  return `<div class="mk-q">${icon('search')}<span>${esc(q)}</span></div>`
    + (tabs ? '<div class="mk-tabs">' + TABS.map(t => t === active ? `<b>${t}</b>` : `<span>${t}</span>`).join('') + '</div>' : '');
}

// Search text ad: "Được tài trợ", site row, blue title, grey description.
function textAd({title, path = 'nen-thom', desc, links = [], image = '', call = false}) {
  return '<div class="mk-ad">'
    + '<b class="mk-spons">Được tài trợ</b>'
    + `<div class="mk-site">${fav()}<span><b>${BRAND}</b><em>${SHOP} › ${esc(path)}</em></span></div>`
    + '<div class="mk-ad-main"><div>'
    + `<span class="mk-title">${esc(title)}</span>`
    + `<p class="mk-desc">${esc(desc)}</p></div>`
    + (image ? img(image, 'r11', 'mk-ad-img') : '')
    + '</div>'
    + (links.length ? '<div class="mk-links">' + links.map(l => `<span>${esc(l)}</span>`).join('') + '</div>' : '')
    + (call ? `<span class="mk-callbtn">${icon('phone')}Gọi</span>` : '')
    + '</div>';
}

const ORGANIC = [
  ['G', 'Góc Sống Xanh', 'gocsongxanh.example › meo-hay', 'Cách chọn nến thơm cho phòng ngủ',
    'Chọn sáp đậu nành, mùi nhẹ như oải hương hoặc gỗ tuyết tùng.'],
  ['T', 'Tạp chí Nhà Đẹp', 'nhadep.example › trang-tri', '7 mùi hương giúp căn phòng dễ chịu hơn',
    'Cam ngọt, sả chanh và bạc hà hợp với phòng khách.']
];
function organic(i = 0) {
  const [l, name, url, title, desc] = ORGANIC[i % ORGANIC.length];
  return '<div class="mk-org">'
    + `<div class="mk-site">${fav(l, 'is-alt')}<span><b>${name}</b><em>${url}</em></span></div>`
    + `<span class="mk-title">${title}</span><p class="mk-desc">${desc}</p></div>`;
}

const STORES = [BRAND, 'Mộc Hương', 'An Nhiên', BRAND, 'Lá Sả'];
function productCard(i, {store} = {}) {
  const [pic, name, price] = PRODUCTS[i % PRODUCTS.length];
  return '<div class="mk-pc">' + img(pic)
    + `<span class="mk-pn">${esc(name)}</span><b class="mk-price">${esc(price)}</b>`
    + `<em>${esc(store || STORES[i % STORES.length])}</em></div>`;
}

// 16:9 player. `count` is the yellow ad badge; `skip` adds the skip button
// that shows once five seconds have passed.
function player({count = 'Quảng cáo · 0:05', skip = true, pic = 's-hero', play = false} = {}) {
  return `<div class="mk-player">${img(pic, 'r169')}`
    + `<span class="mk-vbadge">${esc(count)}</span>`
    + (skip ? '<span class="mk-skip">Bỏ qua quảng cáo <b aria-hidden="true">▸|</b></span>' : '')
    + (play ? `<span class="mk-play">${icon('play')}</span>` : '')
    + '<span class="mk-vprog"><i></i></span></div>';
}

const companion = (cta = 'Mua ngay') => '<div class="mk-comp">'
  + `${fav()}<span><b>Nến thơm nắp gỗ 200g</b><em>Được tài trợ · ${SHOP}</em></span>`
  + `<span class="mk-cta">${cta}</span></div>`;

const UP_NEXT = [
  ['s-shelf', 'Tinh dầu nào hợp phòng ngủ?', 'Góc Sống Xanh · 18 N lượt xem'],
  ['s-desk', 'Trang trí góc đọc sách ấm áp', 'Nhà Đẹp TV · 9,2 N lượt xem'],
  ['s5', 'Gấp khăn kiểu khách sạn', 'Mẹo Nhà · 41 N lượt xem']
];
const vidRow = ([pic, title, meta], ad = false) => `<div class="mk-vrow${ad ? ' is-ad' : ''}">${img(pic, 'r169')}`
  + `<span><span class="mk-vt">${esc(title)}</span><em>${esc(meta)}</em></span></div>`;

const watchInfo = '<div class="mk-watch"><span class="mk-vt">Thư giãn sau giờ làm — 12 phút</span>'
  + '<em>Góc Sống Xanh · 24 N lượt xem</em></div>';

// Feed chrome for the phone surfaces (Demand Gen, app, inbox).
const feedTop = title => `<div class="mk-apptop"><b>${esc(title)}</b><span>${icon('search')}${icon('bell')}</span></div>`;
const POSTS = [
  ['G', 'Góc Sống Xanh', '2 giờ trước', 'Ba cách làm phòng ngủ thơm dịu mà không cần máy lọc.'],
  ['M', 'Mẹo Nhà', 'Hôm qua', 'Gấp khăn kiểu khách sạn chỉ với bốn bước.']
];
const post = (i = 0) => {
  const [l, name, when, text] = POSTS[i % POSTS.length];
  return '<div class="mk-post">'
    + `<div class="mk-site">${fav(l, 'is-alt')}<span><b>${name}</b><em>${when}</em></span></div>`
    + `<p class="mk-desc">${text}</p></div>`;
};

function feedAd({media, title = 'Góc thư giãn cuối ngày', cta = 'Mua ngay', extra = ''}) {
  return '<div class="mk-fad">'
    + `<div class="mk-site">${fav()}<span><b>${BRAND}</b><em>Được tài trợ · ${SHOP}</em></span></div>`
    + media
    + `<div class="mk-fad-foot"><span class="mk-title is-dark">${esc(title)}</span><span class="mk-cta">${esc(cta)}</span></div>`
    + extra + '</div>';
}

// An article page: the page's own text around the ad slot.
function article(slot, {side = false, top = false} = {}) {
  const text = '<h5 class="mk-h">Ba cách làm phòng ngủ thơm dịu mỗi tối</h5>'
    + '<p class="mk-p">Một góc thơm nhẹ giúp bạn chậm lại sau ngày dài. Nến sáp đậu nành cháy sạch, còn que gỗ khuếch tán giữ mùi suốt nhiều tuần.</p>';
  const more = '<p class="mk-p">Đặt que khuếch tán cách gối ngủ ít nhất một mét và đảo que mỗi tuần một lần.</p>';
  const site = '<div class="mk-news"><b>Góc Sống Xanh</b><span>Nhà cửa</span><span>Sống khỏe</span></div>';
  if (side) return site + `<div class="mk-art is-side"><div>${text}${more}</div>${slot}</div>`;
  if (top) return site + slot + `<div class="mk-art">${text}</div>`;
  return site + `<div class="mk-art">${text}${slot}${more}</div>`;
}
const adLabel = '<span class="mk-adlabel">Quảng cáo <i aria-hidden="true">ⓘ</i></span>';

/* ------------------------------------------------------------------ *
 * The formats
 * ------------------------------------------------------------------ */
const Q = 'nến thơm thiên nhiên';
const AD = {
  title: 'Nến thơm thiên nhiên — Giao trong 2 giờ',
  desc: 'Sáp đậu nành, bấc gỗ, đốt đến 40 giờ. Đổi trả trong 7 ngày.'
};

const RENDER = {
  'search-text': () => win('search?q=nen+thom+thien+nhien', query(Q) + textAd(AD) + organic(0) + organic(1)),

  'search-links': () => win('search?q=nen+thom+thien+nhien', query(Q)
    + textAd({...AD, links: ['Nến thơm', 'Tinh dầu', 'Quà tặng', 'Liên hệ']}) + organic(0)),

  'search-image': () => win('search?q=nen+thom+thien+nhien', query(Q)
    + textAd({...AD, desc: 'Sáp đậu nành, đốt đến 40 giờ. Đổi trả 7 ngày.', image: 's6'}) + organic(0) + organic(1)),

  'search-call': () => handset(query('nến thơm giao nhanh', {tabs: false})
    + textAd({title: 'Nến thơm giao nhanh — Gọi là có hàng', desc: 'Giao trong 2 giờ tại TP.HCM. Tư vấn chọn mùi qua điện thoại.', call: true})
    + organic(0)),

  'pmax-feed': () => pmaxGrid('Nến thơm nắp gỗ 200g'),
  'pmax-assets': () => pmaxGrid('Góc thư giãn cuối ngày', {product: 's1', name: 'Tinh dầu oải hương 30ml', price: '285.000₫'}),
  'pmax-video': () => '<div class="mk-ratios" data-mock>'
    + [['r169', '16:9 · ngang'], ['r11', '1:1 · vuông'], ['r916', '9:16 · dọc']].map(([r, l]) => '<figure>'
      + `<span class="mk-player is-bare">${img(r === 'r916' ? 's-tall' : 's-hero', r)}<span class="mk-play">${icon('play')}</span></span>`
      + `<figcaption>${l}</figcaption></figure>`).join('') + '</div>',

  'shop-cards': () => win('search?q=nen+thom', query('nến thơm') + shopGroup()),

  'shop-group': () => win('search?q=nen+thom&tab=mua-sam', query('nến thơm', {active: 'Mua sắm'})
    + '<div class="mk-chips"><span>Dưới 300.000₫</span><span>Giao hôm nay</span><span>Sáp đậu nành</span></div>'
    + '<b class="mk-spons">Được tài trợ</b>'
    + `<div class="mk-pgrid">${[5, 0, 2, 1].map(i => productCard(i, {store: i === 0 || i === 5 ? BRAND : undefined})).join('')}</div>`),

  'shop-pdp': () => win(SHOP + '/nen-thom-nap-go', '<div class="mk-pdp">' + img('s6')
    + '<div class="mk-pdp-info"><em>Nến thơm › Sáp đậu nành</em>'
    + '<span class="mk-h">Nến thơm nắp gỗ 200g</span>'
    + '<span class="mk-rate">★★★★★ <em>4,8 · 126 đánh giá</em></span>'
    + '<b class="mk-price is-big">320.000₫</b>'
    + '<span class="mk-stock">Còn hàng · giao trong 2 giờ</span>'
    + '<div class="mk-chips"><span class="is-on">Oải hương</span><span>Gỗ tuyết tùng</span></div>'
    + `<span class="mk-btn">${icon('cart')}Thêm vào giỏ</span></div></div>`),

  'dg-single': () => handset(feedTop('Bảng tin') + post() + feedAd({media: img('s-shelf', 'r191')}) + post(1)),

  'dg-carousel': () => handset(feedTop('Bảng tin') + feedAd({
    media: `<div class="mk-car">${[5, 0, 1, 2].map(i => {
      const [pic, name, price] = PRODUCTS[i];
      return `<div class="mk-cc">${img(pic)}<span class="mk-pn">${esc(name)}</span><b class="mk-price">${price}</b></div>`;
    }).join('')}</div>`,
    title: 'Bộ sưu tập mùi hương mùa thu'
  }) + post()),

  'dg-video': () => handset(feedTop('Video') + feedAd({
    media: `<span class="mk-player is-bare">${img('s-hero', 'r169')}<span class="mk-play">${icon('play')}</span><span class="mk-vtime">0:24</span></span>`,
    title: 'Nhỏ ba giọt, căn phòng dịu lại', cta: 'Xem thêm'
  }) + post() + post(1)),

  'dg-product': () => handset(feedTop('Khám phá') + feedAd({
    media: img('s-shelf', 'r191'),
    extra: `<div class="mk-strip">${[5, 0, 2].map(i => {
      const [pic, , price] = PRODUCTS[i];
      return `<span>${img(pic)}<b class="mk-price">${price}</b></span>`;
    }).join('')}</div>`
  }) + post()),

  'disp-wide': () => win('gocsongxanh.example/phong-ngu-thom', article('<div class="mk-slot">' + adLabel
    + `<div class="mk-slot-in">${img('s-shelf', 'r191')}<div><span class="mk-title is-dark">Góc thư giãn cuối ngày</span>`
    + `<em>${BRAND} · ${SHOP}</em><span class="mk-cta">Mua ngay</span></div></div></div>`)),

  'disp-square': () => win('gocsongxanh.example/phong-ngu-thom', article('<div class="mk-slot is-sq">' + adLabel
    + img('s6') + '<span class="mk-title is-dark">Nến thơm nắp gỗ</span>'
    + `<em>${SHOP}</em><span class="mk-cta">Mua ngay</span></div>`, {side: true})),

  'disp-banner': () => win('gocsongxanh.example/phong-ngu-thom', article('<div class="mk-slot is-lead">' + adLabel
    + `<div class="mk-banner">${img('s-shelf', 'r191')}<span><b>Nến thơm thủ công</b><em>Giảm 15% tuần này</em></span>`
    + '<span class="mk-cta">Mua ngay</span></div></div>', {top: true})),

  'vid-skip': () => win('video › xem', player() + companion() + watchInfo),
  'vid-nonskip': () => win('video › xem', player({count: 'Quảng cáo · 0:15', skip: false}) + companion() + watchInfo),
  'vid-bumper': () => win('video › xem', player({count: 'Quảng cáo · 0:06', skip: false}) + companion('Xem thêm') + watchInfo),

  'vid-infeed': () => win('video › tìm kiếm', query('cách dùng tinh dầu', {tabs: false})
    + '<div class="mk-vlist">'
    + vidRow(['s-hero', 'Nhỏ ba giọt, căn phòng dịu lại', `Được tài trợ · ${BRAND}`], true)
    + vidRow(UP_NEXT[0]) + vidRow(UP_NEXT[1]) + '</div>'),

  shorts: () => handset(`<div class="mk-short">${img('s-tall', 'r916')}`
    + `<div class="mk-acts"><span>${icon('heart')}<em>2,4 N</em></span><span>${icon('chat')}<em>86</em></span><span>${icon('arrow')}<em>Chia sẻ</em></span></div>`
    + `<div class="mk-short-meta"><div class="mk-site">${fav()}<span><b>${BRAND}</b><em>Được tài trợ</em></span></div>`
    + '<span>Góc thư giãn cuối ngày</span></div>'
    + '<span class="mk-ctabar">Mua ngay</span></div>', {dark: true}),

  masthead: () => win('video › trang chủ', query('Tìm video', {tabs: false})
    + `<div class="mk-mast">${player({count: 'Quảng cáo', skip: false})}`
    + `<div class="mk-mast-info">${fav()}<span class="mk-title is-dark">Góc thư giãn cuối ngày</span>`
    + `<em>Được tài trợ · ${SHOP}</em><span class="mk-cta">Xem ngay</span></div></div>`
    + `<div class="mk-vgrid">${UP_NEXT.map(([pic, t, m]) => `<div>${img(pic, 'r169')}<span class="mk-vt">${t}</span><em>${m}</em></div>`).join('')}</div>`),

  'app-install': () => handset(appStore()),

  'app-video': () => handset(`<div class="mk-short">${img('s-tall', 'r916')}`
    + `<div class="mk-appbar">${img('s6', 'r11', 'mk-appicon')}<span><b>${BRAND}</b><em>4,7 ★ · Miễn phí</em></span>`
    + '<span class="mk-cta">Cài đặt</span></div></div>', {dark: true}),

  'app-image': () => handset(feedTop('Bảng tin') + post() + '<div class="mk-fad">'
    + `<div class="mk-site">${fav()}<span><b>${BRAND}</b><em>Được tài trợ · Ứng dụng</em></span></div>`
    + img('s-shelf', 'r191')
    + `<div class="mk-appbar is-light">${img('s6', 'r11', 'mk-appicon')}<span><b>${BRAND}</b><em>Nến & tinh dầu · 4,7 ★</em></span>`
    + '<span class="mk-cta">Cài đặt</span></div></div>' + post(1)),

  inbox: () => win('thu › hop-thu-den', '<div class="mk-mail">'
    + '<div class="mk-mlist"><div class="mk-mtabs"><b>Chính</b><span>Quảng cáo</span><span>Mạng xã hội</span></div>'
    + `<div class="mk-mrow is-ad">${fav()}<span><b>${BRAND} <i>Được tài trợ</i></b><em>Ưu đãi 15% bộ nến mùa thu</em></span></div>`
    + `<div class="mk-mrow">${fav('Đ', 'is-alt')}<span><b>Đơn hàng #1024</b><em>Đơn của bạn đã được giao</em></span></div>`
    + `<div class="mk-mrow">${fav('L', 'is-alt')}<span><b>Lịch hẹn</b><em>Xác nhận lịch thứ Sáu 15:00</em></span></div></div>`
    + `<div class="mk-mopen"><div class="mk-site">${fav()}<span><b>${BRAND}</b><em>Được tài trợ</em></span></div>`
    + img('s-shelf', 'r191') + '<span class="mk-title is-dark">Ưu đãi 15% bộ nến mùa thu</span>'
    + '<p class="mk-desc">Ba mùi hương mới, sáp đậu nành, giao trong 2 giờ.</p><span class="mk-cta">Xem bộ sưu tập</span></div>'
    + '</div>'),

  landing: () => handset(landingPage())
};

// One asset set, four surfaces. The Shopping tile always shows the product;
// the video and feed tiles show the lifestyle scene it sits in.
function pmaxGrid(title, {product = 's6', name = 'Nến thơm nắp gỗ 200g', price = '320.000₫'} = {}) {
  const cell = (label, body) => `<figure>${body}<figcaption>${label}</figcaption></figure>`;
  return '<div class="mk-pmax" data-mock>'
    + cell('Tìm kiếm', '<div class="mk-tile"><b class="mk-spons">Được tài trợ</b>'
      + `<div class="mk-site">${fav()}<span><b>${BRAND}</b><em>${SHOP}</em></span></div>`
      + `<span class="mk-title">${esc(title)} — Giao trong 2 giờ</span></div>`)
    + cell('Mua sắm', `<div class="mk-tile is-row">${img(product)}<span><span class="mk-pn">${esc(name)}</span>`
      + `<b class="mk-price">${price}</b><em>${BRAND}</em></span></div>`)
    + cell('Video', `<div class="mk-tile is-flush"><span class="mk-player is-bare">${img('s-hero', 'r169')}`
      + `<span class="mk-vbadge">Quảng cáo</span><span class="mk-play">${icon('play')}</span></span>`
      + `<div class="mk-fad-foot"><span class="mk-title is-dark">${esc(title)}</span><em>${SHOP}</em></div></div>`)
    + cell('Bảng tin', `<div class="mk-tile is-flush">${img('s-shelf', 'r191')}`
      + `<div class="mk-fad-foot"><span class="mk-title is-dark">${esc(title)}</span><span class="mk-cta">Mua</span></div></div>`)
    + '</div>';
}

function shopGroup() {
  return '<div class="mk-shop"><div class="mk-shop-h"><b class="mk-spons">Được tài trợ</b><span>Sản phẩm cho "nến thơm"</span></div>'
    + `<div class="mk-pcs">${[5, 0, 2, 1, 3].map(i => productCard(i)).join('')}</div></div>`;
}

// Compact search result for the hero card: the query and the ad only.
export function heroSearch() {
  return win('search?q=nen+thom', query('nến thơm thiên nhiên', {tabs: false})
    + textAd({title: 'Nến thơm thiên nhiên — Giao trong 2 giờ', desc: 'Sáp đậu nành, đốt đến 40 giờ.'}), 'mk-hero');
}

export function appStore({state = 'install'} = {}) {
  const btn = {install: 'Cài đặt', loading: 'Đang tải…', open: 'Mở'}[state] || 'Cài đặt';
  return '<div class="mk-store">'
    + `<div class="mk-store-top">${img('s6', 'r11', 'mk-appicon is-big')}`
    + `<span><b>Nhà Thơm — Nến & tinh dầu</b><em>Được tài trợ · Mua sắm</em></span></div>`
    + '<div class="mk-stats"><span><b>4,7 ★</b>2,1 N đánh giá</span><span><b>18 MB</b>Dung lượng</span><span><b>50 N+</b>Lượt tải</span></div>'
    + `<span class="mk-btn is-wide" data-state="${state}">${btn}</span>`
    + '<div class="mk-shots">'
    + [['s6', 'Giao 2 giờ'], ['s1', 'Chọn mùi'], ['s5', 'Tích điểm']].map(([pic, cap]) => `<span>${img(pic, 'r916')}<em>${cap}</em></span>`).join('')
    + '</div></div>';
}

export function landingPage({form = '', title = 'Nến thơm thủ công, giao trong 2 giờ'} = {}) {
  return '<div class="mk-lp">'
    + `<div class="mk-lp-nav">${fav()}<b>${BRAND}</b><span aria-hidden="true">☰</span></div>`
    + img('s-shelf', 'r191')
    + `<span class="mk-h">${esc(title)}</span>`
    + '<p class="mk-desc">Sáp đậu nành, mùi nhẹ, đốt đến 40 giờ. Tư vấn chọn mùi miễn phí.</p>'
    + (form || `<div class="mk-lp-btns"><span class="mk-btn">${icon('phone')}Gọi</span>`
      + `<span class="mk-btn is-ghost">${icon('chat')}Nhắn tin</span>`
      + `<span class="mk-btn is-ghost is-wide">${icon('form')}Để lại thông tin</span></div>`)
    + '<div class="mk-trust"><span><b>4,8 ★</b>1.200 đánh giá</span><span><b>2 giờ</b>giao nội thành</span><span><b>7 ngày</b>đổi trả</span></div>'
    + '</div>';
}

/* ------------------------------------------------------------------ *
 * Which mock each campaign format shows. Format ids come from the atlas
 * data and repeat across campaigns ("wide" is a video player on the Video
 * panel and an article banner on the Display one), so the lookup is by
 * campaign first.
 * ------------------------------------------------------------------ */
const BY_CAMPAIGN = {
  search: {serp: 'search-text', links: 'search-links', square: 'search-image', call: 'search-call'},
  pmax: {catalog: 'pmax-feed', wide: 'pmax-assets', portrait: 'pmax-video'},
  shopping: {product: 'shop-cards', catalog: 'shop-group', detail: 'shop-pdp'},
  demand: {feed: 'dg-single', catalog: 'dg-carousel', portrait: 'dg-video', product: 'dg-product',
    wide: 'disp-wide', square: 'disp-square', banner: 'disp-banner'},
  display: {wide: 'disp-wide', square: 'disp-square', banner: 'disp-banner'},
  video: {wide: 'vid-skip', nonskip: 'vid-nonskip', bumper: 'vid-bumper', feed: 'vid-infeed', portrait: 'shorts', masthead: 'masthead'},
  app: {phone: 'app-install', portrait: 'app-video', square: 'app-image'}
};

// Old single-key ids still used by the other pages.
const LEGACY = {
  serp: 'search-text', links: 'search-links', call: 'search-call', square: 'disp-square',
  wide: 'disp-wide', banner: 'disp-banner', masthead: 'masthead', product: 'shop-cards',
  catalog: 'shop-group', detail: 'shop-pdp', instream: 'vid-skip', nonskip: 'vid-nonskip',
  bumper: 'vid-bumper', feed: 'dg-single', portrait: 'shorts', phone: 'app-install', app: 'app-install'
};

export function renderMock(id, campaign) {
  const key = (campaign && BY_CAMPAIGN[campaign] && BY_CAMPAIGN[campaign][id]) || LEGACY[id] || id;
  return (RENDER[key] || RENDER['search-text'])();
}
export const hasRender = id => Boolean(RENDER[id] || LEGACY[id]);
export const MOCK_IDS = Object.keys(RENDER);

// Building blocks reused by scenes.mjs (pages 2 and 3, measurement scene).
export {img as mkImg, fav as mkFav, query as mkQuery, textAd as mkTextAd};
