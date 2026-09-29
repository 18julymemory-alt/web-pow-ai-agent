// Facebook Ads mock screens (FACEBOOK_ADS_REBUILD_PROMPT.md §2).
//
// Same rules as the Google mocks:
// - Real layout, no platform logos or wordmarks: a feed is a top bar, posts
//   and a like / comment / share row; a story is a full-bleed 9:16 frame.
// - One sample brand, Nhà Thơm (nhathom.example), and its six products.
// - Pictures sit in fixed-ratio frames (.mk-img.rXX) cropped with cover.
// - Text is 11px or larger; tilt stays at 4° or less.
// Every class here starts with fbm- and is styled in dist/facebook-ads-lp.css.
import {handset, BRAND, mkImg as img, mkFav as fav} from '../google-ads-lp/mocks.mjs';
import {icon, shot, esc, SHOP, PRODUCTS} from '../google-ads-lp/visuals.mjs';
import {messengerScreen, callScreen, crmScreen} from '../google-ads-lp/scenes.mjs';

const DOMAIN = SHOP.toUpperCase();
const HANDLE = 'nhathom';

// Glyphs the shared icon set does not have. Same stroke style as icon().
const svg = d => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const G = {
  comment: svg('<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z"/>'),
  share: svg('<path d="M14 5l6 6-6 6"/><path d="M20 11h-9a6 6 0 0 0-6 6v2"/>'),
  bookmark: svg('<path d="M7 4h10v16l-5-4-5 4Z"/>'),
  music: svg('<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>'),
  repost: svg('<path d="M4 10V8a3 3 0 0 1 3-3h11l-3-3"/><path d="M20 14v2a3 3 0 0 1-3 3H6l3 3"/>'),
  up: svg('<path d="m6 14 6-6 6 6"/>')
};

const av = (letter = 'N', cls = '') => fav(letter, 'fbm-av' + (cls ? ' ' + cls : ''));
const product = i => PRODUCTS[i % PRODUCTS.length];

/* ------------------------------------------------------------------ *
 * App chrome
 * ------------------------------------------------------------------ */
// A neutral social-app top bar: a word, not a logo.
const appTop = (title = 'Bảng tin', ig = false) => `<div class="fbm-top${ig ? ' is-ig' : ''}"><b>${esc(title)}</b>`
  + `<span>${ig ? icon('heart') + icon('send') : icon('plus') + icon('search') + icon('chat')}</span></div>`;

// An ordinary post from a friend, so the ad sits between real content.
const FRIENDS = [
  ['L', 'Lan Phạm', '2 giờ', 'Cuối tuần dọn lại góc đọc sách, thêm cây xanh là thấy dễ chịu hẳn.'],
  ['M', 'Minh Trần', 'Hôm qua', 'Ai có quán cà phê yên tĩnh ở quận 3 chỉ mình với.']
];
const friendPost = (i = 0) => {
  const [l, name, when, text] = FRIENDS[i % FRIENDS.length];
  return `<div class="fbm-friend"><div class="fbm-head">${av(l, 'is-alt')}<span><b>${name}</b><em>${when}</em></span></div>`
    + `<p class="fbm-text">${text}</p></div>`;
};

/* ------------------------------------------------------------------ *
 * The feed ad (§2): avatar, page name, "Quảng cáo", ⋯, primary text with
 * "Xem thêm", media, headline + domain + CTA bar, then the action row.
 * ------------------------------------------------------------------ */
const TEXT = 'Góc thư giãn cuối ngày: nến sáp đậu nành, mùi oải hương dịu nhẹ, đốt đến 40 giờ.';

function adHead(sub = 'Quảng cáo') {
  return `<div class="fbm-head">${av()}<span><b>${BRAND}</b><em>${esc(sub)} · ${icon('globe')}</em></span>`
    + `<i class="fbm-more">${icon('dots')}</i></div>`;
}

const ctaBar = (headline, cta, sub = DOMAIN) => '<div class="fbm-ctabar">'
  + `<span><em>${esc(sub)}</em><b>${esc(headline)}</b></span><span class="fbm-btn">${esc(cta)}</span></div>`;

const actions = '<div class="fbm-stats"><span><i class="fbm-react">♥</i>248</span><span>36 bình luận · 12 lượt chia sẻ</span></div>'
  + `<div class="fbm-acts"><span>${icon('like')}Thích</span><span>${G.comment}Bình luận</span><span>${G.share}Chia sẻ</span></div>`;

export function fbPost({media, text = TEXT, headline = 'Nến thơm nắp gỗ 200g', cta = 'Mua ngay', bar, sub, foot = true} = {}) {
  return '<article class="fbm-post">'
    + adHead(sub)
    + `<p class="fbm-text">${esc(text)} <b>Xem thêm</b></p>`
    + (media || img('s-desk', 'r45'))
    + (bar !== undefined ? bar : ctaBar(headline, cta))
    + (foot ? actions : '')
    + '</article>';
}

// Instagram-style: square avatar ring, media first, CTA strip, icons, caption.
function igPost({media, caption = 'Nến sáp đậu nành, đốt đến 40 giờ.', cta = 'Mua ngay'} = {}) {
  return '<article class="fbm-ig">'
    + `<div class="fbm-head">${av('N', 'is-ring')}<span><b>${HANDLE}</b><em>Được tài trợ</em></span><i class="fbm-more">${icon('dots')}</i></div>`
    + (media || img('s-desk', 'r45'))
    + `<div class="fbm-igcta"><b>${esc(cta)}</b><span aria-hidden="true">›</span></div>`
    + `<div class="fbm-igacts">${icon('heart')}${G.comment}${icon('send')}<i>${G.bookmark}</i></div>`
    + `<p class="fbm-cap"><b>${HANDLE}</b> ${esc(caption)}</p>`
    + '</article>';
}

/* ------------------------------------------------------------------ *
 * Vertical, full screen: Stories and Reels
 * ------------------------------------------------------------------ */
function story({pic = 's-tall', cta = 'Tìm hiểu thêm', ig = false, text = 'Nhỏ ba giọt, căn phòng dịu lại', safe = false, chat = false} = {}) {
  return handset(`<div class="fbm-story">${img(pic, 'r916')}`
    + '<span class="fbm-prog"><i></i><i></i><i></i></span>'
    + `<div class="fbm-shead">${av('N', ig ? 'is-ring' : '')}<span><b>${ig ? HANDLE : BRAND}</b><em>Được tài trợ</em></span>`
    + `<i>${icon('dots')}</i><i>${icon('close')}</i></div>`
    + `<p class="fbm-stext">${esc(text)}</p>`
    + (safe ? '<span class="fbm-safe is-top">14%</span><span class="fbm-safe is-bottom">35%</span>' : '')
    + `<div class="fbm-sfoot"><span class="fbm-up">${chat ? icon('chat') : G.up}</span><b>${esc(cta)}</b></div>`
    + '</div>', {dark: true, cls: 'fbm-phone'});
}

function reels({pic = 's-tall', cta = 'Mua ngay', ig = false} = {}) {
  const col = [[icon('heart'), '2,4 N'], [G.comment, '86'], [G.share, '31'], [icon('dots'), '']];
  return handset(`<div class="fbm-reel">${img(pic, 'r916')}`
    + `<b class="fbm-rtitle">${ig ? 'Reels' : 'Thước phim'}</b>`
    + `<div class="fbm-rcol">${col.map(([g, n]) => `<span>${g}${n ? `<em>${n}</em>` : ''}</span>`).join('')}`
    + `<span class="fbm-disc">${shot('s6')}</span></div>`
    + `<div class="fbm-rmeta"><div class="fbm-head">${av('N', ig ? 'is-ring' : '')}<span><b>${ig ? HANDLE : BRAND}</b><em>Được tài trợ</em></span></div>`
    + '<p>Ba bước cho góc thư giãn tối nay.</p>'
    + `<span class="fbm-music">${G.music}Âm thanh gốc · ${BRAND}</span></div>`
    + `<span class="fbm-rcta">${esc(cta)}<i aria-hidden="true">›</i></span>`
    + '</div>', {dark: true, cls: 'fbm-phone'});
}

/* ------------------------------------------------------------------ *
 * Several products: carousel, collection, instant experience
 * ------------------------------------------------------------------ */
function cards(list = [5, 0, 2, 1], {more = true, btn = 'Mua ngay', tag = ''} = {}) {
  return '<div class="fbm-car">'
    + list.map(i => {
      const [pic, name, price] = product(i);
      return `<div class="fbm-card">${img(pic)}${tag ? `<span class="fbm-tag">${esc(tag)}</span>` : ''}`
        + `<span class="fbm-cardt"><b>${esc(name)}</b><em>${esc(price)}</em></span><span class="fbm-btn is-sm">${btn}</span></div>`;
    }).join('')
    + (more ? `<div class="fbm-card is-more"><span>${icon('arrow')}</span><b>Xem thêm tại ${SHOP}</b></div>` : '')
    + '</div>';
}

function collection({video = true, tag = ''} = {}) {
  return `<div class="fbm-coll"><span class="fbm-cover">${img('s-shelf', 'r191')}`
    + (video ? `<span class="fbm-play">${icon('play')}</span>` : '') + '</span>'
    + `<div class="fbm-grid3">${[5, 0, 2].map(i => {
      const [pic, , price] = product(i);
      return `<span>${img(pic)}<em>${price}</em></span>`;
    }).join('')}</div>${tag ? `<span class="fbm-tag is-flat">${esc(tag)}</span>` : ''}</div>`;
}

function instant() {
  return handset('<div class="fbm-ix">'
    + `<div class="fbm-ixbar">${icon('back')}<b>${BRAND}</b>${icon('dots')}</div>`
    + img('s-shelf', 'r191')
    + '<b class="fbm-ixh">Bộ sưu tập mùi hương mùa thu</b>'
    + '<p class="fbm-ixp">Ba mùi mới, sáp đậu nành, giao trong 2 giờ.</p>'
    + `<div class="fbm-ixgrid">${[5, 0, 2, 1].map(i => {
      const [pic, name, price] = product(i);
      return `<span>${img(pic)}<b>${esc(name)}</b><em>${price}</em></span>`;
    }).join('')}</div>`
    + `<span class="fbm-ixbtn">Mua trên website ${icon('arrow')}</span>`
    + '</div>', {cls: 'fbm-phone'});
}

/* ------------------------------------------------------------------ *
 * Other surfaces: marketplace, search, threads, partner apps
 * ------------------------------------------------------------------ */
const LISTINGS = [
  ['s-desk', '1.200.000₫', 'Kệ gỗ treo tường', 'Quận 3'],
  ['s5', '150.000₫', 'Bộ khăn tắm cotton', 'Bình Thạnh'],
  ['s2', '90.000₫', 'Chậu cây để bàn', 'Thủ Đức']
];
function market({catalog = false} = {}) {
  const ad = catalog ? product(2) : product(5);
  const cell = ([pic, price, name, where], sponsored) => `<div class="fbm-li${sponsored ? ' is-ad' : ''}">${img(pic)}`
    + `<b>${esc(price)}</b><span>${esc(name)}</span><em>${esc(where)}</em></div>`;
  return handset(appTop('Mua bán')
    + '<div class="fbm-chips"><span class="is-on">Dành cho bạn</span><span>Địa điểm: TP.HCM</span><span>Danh mục</span></div>'
    + '<div class="fbm-market">'
    + cell(LISTINGS[0]) + cell([ad[0], ad[2], ad[1], `Được tài trợ · ${BRAND}`], true)
    + cell(LISTINGS[1]) + cell(LISTINGS[2])
    + '</div>', {cls: 'fbm-phone'});
}

function searchResults() {
  return handset(`<div class="fbm-sbar">${icon('back')}<span>${icon('search')}nến thơm</span></div>`
    + '<div class="fbm-chips"><span class="is-on">Tất cả</span><span>Bài viết</span><span>Trang</span><span>Mua bán</span></div>'
    + `<div class="fbm-srow">${av('G', 'is-alt')}<span><b>Góc Sống Xanh</b><em>Trang · Nhà cửa</em></span></div>`
    + fbPost({media: img('s6', 'r191'), text: 'Nến sáp đậu nành, giao 2 giờ.', foot: false})
    + `<div class="fbm-srow">${av('M', 'is-alt')}<span><b>Mẹo Nhà</b><em>Nhóm · 12 N thành viên</em></span></div>`, {cls: 'fbm-phone'});
}

function threads() {
  const note = (l, name, text, extra = '', ad = false) => `<div class="fbm-th${ad ? ' is-ad' : ''}">`
    + `<span class="fbm-thl">${av(l, ad ? '' : 'is-alt')}<i></i></span><div>`
    + `<div class="fbm-thh"><b>${name}</b><em>${ad ? 'Được tài trợ' : '3 giờ'}</em>${icon('dots')}</div>`
    + `<p>${esc(text)}</p>${extra}`
    + `<div class="fbm-tha">${icon('heart')}${G.comment}${G.repost}${icon('send')}</div></div></div>`;
  return handset('<div class="fbm-top is-center"><b>Dành cho bạn</b></div>'
    + note('L', 'lanpham', 'Tối nay đọc nốt cuốn sách, bật nến là đủ.')
    + note('N', HANDLE, 'Góc thư giãn cuối ngày. Nến sáp đậu nành, đốt đến 40 giờ.', img('s-desk', 'r45'), true), {cls: 'fbm-phone'});
}

function partnerApp() {
  return handset('<div class="fbm-app">'
    + `<div class="fbm-top"><b>Thời tiết hôm nay</b><span>${icon('menu')}</span></div>`
    + '<div class="fbm-wx"><b>31°</b><span>TP.HCM · Nắng nhẹ</span><em>Chiều có mưa rào 40%</em></div>'
    + '<div class="fbm-native"><span class="fbm-adl">Quảng cáo <i aria-hidden="true">ⓘ</i></span>'
    + `<div class="fbm-nrow">${img('s6')}<span><b>Nến thơm nắp gỗ 200g</b><em>${BRAND} · ${SHOP}</em></span></div>`
    + '<span class="fbm-btn is-wide">Mua ngay</span></div>'
    + '<div class="fbm-days"><span>T5 <b>32°</b></span><span>T6 <b>30°</b></span><span>T7 <b>29°</b></span></div>'
    + `<div class="fbm-banner">${img('s-shelf', 'r191')}<span><b>Giảm 15% bộ nến mùa thu</b><em>${BRAND}</em></span><span class="fbm-btn is-sm">Xem</span></div>`
    + '</div>', {cls: 'fbm-phone'});
}

/* ------------------------------------------------------------------ *
 * Chat and the instant form
 * ------------------------------------------------------------------ */
const INTRO = 'Nến & tinh dầu thiên nhiên · Thường trả lời trong vài phút';
const GREETING = [['shop', 'Chào bạn! Nhà Thơm có thể giúp gì ạ? Chạm một câu bên dưới để hỏi nhanh.']];
const QUICK = ['Giá bao nhiêu?', 'Còn hàng không?', 'Giao mấy ngày?'];

const chat = (thread = GREETING, quick = QUICK, {first = true} = {}) =>
  messengerScreen({thread, quick, intro: INTRO, quickFirst: first, cls: 'fbm-phone'});

const chatPrice = () => chat([
  ...GREETING,
  ['me', 'Giá bao nhiêu?'],
  ['shop', 'Dạ nến nắp gỗ 200g giá 320.000₫, giao 2 giờ nội thành ạ.']
], ['Đặt 1 hộp', 'Xem mùi khác'], {first: false});

const chatLead = () => chat([
  ['shop', 'Bạn cần khoảng bao nhiêu hộp quà ạ?'],
  ['me', 'Khoảng 20 hộp'],
  ['shop', 'Cho Nhà Thơm xin số điện thoại để gửi báo giá nhé.'],
  ['me', '09•• ••• 218']
], [], {first: false});

function formShell(inner, step) {
  return handset('<div class="fbm-form">'
    + `<div class="fbm-fbar">${icon('close')}${step ? `<span class="fbm-fstep">${step}</span>` : ''}</div>`
    + inner + '</div>', {cls: 'fbm-phone'});
}

const formIntro = () => formShell(img('s-shelf', 'r191')
  + `<div class="fbm-fbrand">${av()}<b>${BRAND}</b></div>`
  + '<b class="fbm-fh">Nhận báo giá quà tặng cuối năm</b>'
  + '<ul class="fbm-fl"><li>Bảng giá sỉ từ 10 hộp</li><li>Mẫu hộp và thiệp in tên</li><li>Nhân viên gọi lại trong 15 phút</li></ul>'
  + '<span class="fbm-fbtn">Tiếp</span>', '1 / 3');

const field = (label, value, pre = true) => `<label class="fbm-ff"><small>${esc(label)}</small><span>${esc(value)}</span>`
  + (pre ? `<i>${icon('check')}</i>` : '') + '</label>';

const formFields = () => formShell('<b class="fbm-fh">Thông tin liên hệ</b>'
  + '<p class="fbm-fnote">Điền sẵn từ hồ sơ của bạn. Kiểm tra và sửa nếu cần.</p>'
  + field('Họ và tên', 'Nguyễn Lan') + field('Số điện thoại', '09•• ••• 218') + field('Email', 'lan.nguyen@mail.example')
  + '<div class="fbm-fq"><small>Bạn cần khoảng bao nhiêu hộp?</small>'
  + '<span>Dưới 10</span><span class="is-on">10 – 30</span><span>Trên 30</span></div>'
  + `<p class="fbm-fpriv">Bằng việc gửi, bạn đồng ý chia sẻ thông tin với ${BRAND}. <u>Chính sách quyền riêng tư</u></p>`
  + '<span class="fbm-fbtn">Gửi</span>', '2 / 3');

const formThanks = () => formShell(`<span class="fbm-done">${icon('check')}</span>`
  + '<b class="fbm-fh is-c">Cảm ơn bạn!</b>'
  + '<p class="fbm-fnote is-c">Nhà Thơm đã nhận thông tin. Nhân viên sẽ gọi cho bạn trong 15 phút.</p>'
  + `<span class="fbm-fbtn">${icon('phone')}Gọi ngay</span>`
  + `<span class="fbm-fbtn is-ghost">${icon('link')}Xem website</span>`, '3 / 3');

/* ------------------------------------------------------------------ *
 * After the tap: the page inside the app's own browser
 * ------------------------------------------------------------------ */
function inApp(inner) {
  return handset(`<div class="fbm-iab"><div class="fbm-iabbar">${icon('close')}<span><b>${BRAND}</b><em>${SHOP}</em></span>${icon('dots')}</div>`
    + inner + '</div>', {cls: 'fbm-phone'});
}

const productPage = (i = 5) => {
  const [pic, name, price] = product(i);
  return inApp(`${img(pic, 'r43')}<b class="fbm-ph">${esc(name)}</b>`
    + `<span class="fbm-pp">${price}</span><p class="fbm-pd">Sáp đậu nành, giao 2 giờ, đổi trả 7 ngày.</p>`
    + `<span class="fbm-fbtn">${icon('cart')}Thêm vào giỏ</span>`);
};

const cartPage = () => {
  const [pic, name, price] = product(5);
  return inApp('<b class="fbm-ph">Giỏ hàng (1)</b>'
    + `<div class="fbm-crow">${img(pic)}<span><b>${esc(name)}</b><em>${price} · SL 1</em></span></div>`
    + '<div class="fbm-sum"><span>Tạm tính</span><b>320.000₫</b></div>'
    + '<span class="fbm-fbtn">Thanh toán</span>'
    + `<span class="fbm-toast">${icon('check')}Đã thêm vào giỏ</span>`);
};

const orderPage = () => inApp(`<span class="fbm-done">${icon('check')}</span>`
  + '<b class="fbm-ph is-c">Đặt hàng thành công</b>'
  + '<p class="fbm-pd is-c">Đơn #NT-1024 · giao trong 2 giờ</p>'
  + '<div class="fbm-sum"><span>Tổng thanh toán</span><b>320.000₫</b></div>'
  + '<div class="fbm-sum"><span>Thanh toán</span><b>Khi nhận hàng</b></div>');

/* ------------------------------------------------------------------ *
 * Chapter 01 — one mock per format id
 * ------------------------------------------------------------------ */
const inFeed = (ad, top = 'Bảng tin') => handset(appTop(top) + ad + friendPost(), {cls: 'fbm-phone'});

const video = (pic = 's-desk', r = 'r45') => `<span class="fbm-vid">${img(pic, r)}<span class="fbm-play">${icon('play')}</span>`
  + '<span class="fbm-vt">0:14</span><span class="fbm-cc">Phụ đề: nhỏ ba giọt là đủ</span></span>';

const RENDER = {
  'fb-feed-img': () => inFeed(fbPost()),
  'fb-feed-vid': () => inFeed(fbPost({media: video(), cta: 'Tìm hiểu thêm'})),
  'ig-feed': () => handset(appTop('Trang chủ', true) + igPost(), {cls: 'fbm-phone'}),
  marketplace: () => market(),
  search: () => searchResults(),
  threads: () => threads(),
  'an-banner': () => partnerApp(),

  'fb-story': () => story({safe: true}),
  'ig-story': () => story({ig: true, pic: 's-shelf', text: 'Góc đọc sách thơm dịu', cta: 'Xem thêm'}),
  'fb-reels': () => reels(),
  'ig-reels': () => reels({ig: true, cta: 'Tìm hiểu thêm'}),

  carousel: () => inFeed(fbPost({media: cards(), bar: '', text: 'Bốn món cho góc thư giãn. Vuốt để xem.'})),
  'carousel-ig': () => handset(appTop('Trang chủ', true) + igPost({media: cards([5, 0, 2], {more: false, btn: 'Xem'}), cta: 'Xem thêm'}), {cls: 'fbm-phone'}),
  collection: () => inFeed(fbPost({media: collection(), bar: ctaBar('Bộ sưu tập mùa thu', 'Xem thêm')})),
  'instant-exp': () => instant(),

  'msg-feed': () => inFeed(fbPost({text: 'Hỏi giá, hỏi mẫu hộp quà: nhắn cho Nhà Thơm, trả lời trong vài phút.',
    bar: ctaBar('Nhắn tin để nhận báo giá', 'Gửi tin nhắn', 'MESSENGER')})),
  'msg-story': () => story({cta: 'Gửi tin nhắn', chat: true, pic: 's6', text: 'Quà tặng cuối năm · nhắn để nhận báo giá'}),
  'msg-chat': () => chat(),
  'msg-lead': () => chatLead(),

  'lead-ad': () => inFeed(fbPost({text: 'Đặt quà cuối năm cho đội ngũ: để lại thông tin, nhận báo giá trong 15 phút.',
    media: img('s-shelf', 'r11'), bar: ctaBar('Báo giá quà tặng doanh nghiệp', 'Nhận báo giá', 'BIỂU MẪU')})),
  'form-intro': () => formIntro(),
  'form-fields': () => formFields(),
  'form-thanks': () => formThanks(),

  'cat-carousel': () => inFeed(fbPost({media: cards([5, 0, 2, 3], {tag: 'Danh mục'}), bar: '',
    text: 'Những món bạn có thể thích từ Nhà Thơm.'})),
  'cat-collection': () => inFeed(fbPost({media: collection({video: false, tag: 'Chọn theo người xem'}), bar: ctaBar('Nhà Thơm · Mới về', 'Mua ngay')})),
  'cat-retarget': () => inFeed(fbPost({text: 'Bạn còn để quên món này trong giỏ. Giao 2 giờ nội thành.',
    media: `<span class="fbm-seen">${img('s6', 'r11')}<span class="fbm-tag">Bạn đã xem 2 ngày trước</span></span>`,
    headline: 'Nến thơm nắp gỗ 200g · 320.000₫'})),
  'cat-market': () => market({catalog: true})
};

export const FB_MOCK_IDS = Object.keys(RENDER);
export function renderFb(id) {
  const r = RENDER[id];
  if (!r) throw new Error('No Facebook mock for ' + id);
  return `<div class="fbm" data-mock>${r()}</div>`;
}

/* ------------------------------------------------------------------ *
 * Chapter 04 — the ad with the tappable buttons, and the screen behind
 * each button
 * ------------------------------------------------------------------ */
const MEAS_MEDIA = {
  feed: () => img('s6', 'r11'),
  stories: () => img('s-tall', 'r11'),
  carousel: () => cards([5, 1, 0], {more: false, btn: 'Xem'}),
  messaging: () => img('s6', 'r11'),
  leadform: () => img('s-shelf', 'r11'),
  catalog: () => cards([5, 0, 2], {more: false, btn: 'Mua', tag: 'Danh mục'})
};

export function measureAd(type) {
  return ({inline = '', fabs = '', cls = ''}) => handset(appTop('Bảng tin')
    + fbPost({media: MEAS_MEDIA[type](), foot: false, text: 'Chạm một nút bên dưới để xem khách thấy gì.',
      bar: `<div class="sc-inline fbm-inline">${inline}</div>`})
    + fabs, {cls: `sc-phone fbm-phone fbm-meas${cls ? ' ' + cls : ''}`});
}

const wrap = html => `<div class="fbm" data-mock>${html}</div>`;
export function measureScenes(type) {
  const base = {
    product: () => wrap(productPage(5)),
    product2: () => wrap(productPage(0)),
    cart: () => wrap(cartPage()),
    order: () => wrap(orderPage()),
    call: () => callScreen(),
    chat: () => wrap(chat()),
    chatprice: () => wrap(chatPrice()),
    chatlead: () => wrap(chatLead()),
    crm: () => crmScreen(type === 'leadform' ? 'qualified' : 'sale', {sources: type === 'leadform'
      ? ['Biểu mẫu', 'Biểu mẫu', 'Hotline'] : ['Tin nhắn', 'Tin nhắn', 'Biểu mẫu']}),
    formopen: () => wrap(formIntro()),
    lead: () => wrap(formThanks()),
    instant: () => wrap(instant())
  };
  return base;
}

/* ------------------------------------------------------------------ *
 * Page 02 — what opens after the tap, per objective
 * ------------------------------------------------------------------ */
export const AFTER_CLICK = {
  awareness: () => wrap(reels({cta: 'Tìm hiểu thêm'})),
  traffic: () => wrap(productPage(5)),
  engagement: () => wrap(chat()),
  leads: () => wrap(formFields()),
  app: () => wrap(handset(`<div class="fbm-store"><div class="fbm-storetop">${img('s6', 'r11')}<span><b>Nhà Thơm — Nến & tinh dầu</b>`
    + '<em>Mua sắm · 4,7 ★</em></span></div><span class="fbm-fbtn">Cài đặt</span>'
    + `<div class="fbm-shots">${['s6', 's1', 's5'].map(p => img(p, 'r916')).join('')}</div></div>`, {cls: 'fbm-phone'})),
  sales: () => wrap(cartPage())
};

// Page 02, readiness stage → the ad that person sees.
export const STAGE_AD = {
  cold: () => wrap(reels()),
  warm: () => wrap(inFeed(fbPost({media: cards(), bar: '', text: 'Bốn món cho góc thư giãn. Vuốt để xem.'}))),
  hot: () => wrap(inFeed(fbPost({text: 'Hỏi giá, hỏi phí giao: nhắn cho Nhà Thơm, trả lời trong vài phút.',
    bar: ctaBar('Hỏi giá trong 1 phút', 'Gửi tin nhắn', 'MESSENGER')}))),
  lead: () => wrap(inFeed(fbPost({text: 'Bạn đã hỏi về hộp quà cuối năm. Ưu đãi 10% còn tới Chủ nhật.',
    media: img('s-shelf', 'r11'), headline: 'Giữ lịch giao trước 20/12', cta: 'Đặt ngay'}))),
  customer: () => wrap(inFeed(fbPost({media: cards([0, 1, 4], {tag: 'Hợp với món bạn đã mua'}), bar: '',
    text: 'Tinh dầu và khăn cotton đi cùng nến bạn đã mua.'})))
};

/* ------------------------------------------------------------------ *
 * Hero stack and picker art
 * ------------------------------------------------------------------ */
export function heroStack() {
  const feed = '<div class="fbm fbh-feed" data-mock>'
    + fbPost({media: img('s-desk', 'r11'), text: 'Góc thư giãn cuối ngày, đốt đến 40 giờ.', foot: false}) + '</div>';
  const st = `<div class="fbh-story"><div class="photo dark">${shot('s-tall')}</div>`
    + '<span class="fbh-prog"><i></i><i></i></span><span class="fbh-cta">Tìm hiểu thêm</span></div>';
  const talk = '<div class="fbh-chat"><span class="is-me">Giá bao nhiêu ạ?</span><span>Dạ 320.000₫, giao 2 giờ ạ.</span></div>';
  const form = `<div class="fbh-form"><b>Nhận báo giá</b><span>Nguyễn Lan ${icon('check')}</span><span>09•• ••• 218 ${icon('check')}</span><i>Gửi</i></div>`;

  return '<div class="hero-stage" aria-hidden="true"><div class="stack" id="heroStack">'
    + `<div class="card3d c-serp fbc-feed">${feed}<span class="c-tag">Bảng tin</span></div>`
    + `<div class="card3d c-shop fbc-story">${st}<span class="c-tag">Stories</span></div>`
    + `<div class="card3d c-yt fbc-chat">${talk}<span class="c-tag">Nhắn tin</span></div>`
    + `<div class="card3d c-map fbc-form">${form}<span class="c-tag">Biểu mẫu</span></div>`
    + `<div class="card3d c-logo"><span class="c-tap">${icon('tap')}</span></div>`
    + '</div></div>';
}

const PICK_ART = {
  feed: () => '<div class="pa-phone"><div class="pa-feed">'
    + '<div class="pa-post"><b>Lan Phạm</b><span>Cuối tuần dọn lại góc đọc sách</span></div>'
    + `<div class="pa-post"><div class="photo">${shot('s5')}</div><span>Minh Trần · Hôm qua</span></div>`
    + `<div class="pa-post is-ad"><span class="spons">Quảng cáo</span><div class="photo">${shot('s-desk')}</div>`
    + '<b>Nến thơm nắp gỗ 200g</b><span class="cta-chip">Mua ngay</span></div>'
    + '</div></div>',
  stories: () => '<div class="pa-fbst">'
    + ['s-tall', 's-shelf', 's6'].map((p, i) => `<span class="pa-fbs" style="--i:${i}"><i class="photo dark">${shot(p)}</i>`
      + `<span class="pa-fbbar"><i></i></span>${i === 1 ? '<b>Tìm hiểu thêm</b>' : ''}</span>`).join('')
    + '</div>',
  carousel: () => '<div class="pa-shelf">'
    + [5, 0, 2].map((n, i) => {
      const [p, name, price] = product(n);
      return `<div class="pa-prod${i === 1 ? ' is-ours' : ''}" style="--i:${i}"><div class="photo">${shot(p)}</div><b>${esc(name)}</b><em>${price}</em></div>`;
    }).join('') + '</div>',
  messaging: () => '<div class="pa-fbchat">'
    + '<span class="is-shop" style="--i:0">Chào bạn! Nhà Thơm giúp gì ạ?</span>'
    + '<span class="is-me" style="--i:1">Giá bao nhiêu?</span>'
    + '<span class="is-shop" style="--i:2">Dạ 320.000₫, giao 2 giờ.</span>'
    + '<span class="is-me" style="--i:3">Đặt 1 hộp nhé</span></div>',
  leadform: () => '<div class="pa-fbform"><b>Nhận báo giá</b>'
    + ['Nguyễn Lan', '09•• ••• 218', 'lan@mail.example'].map((v, i) => `<span style="--i:${i}"><i>${v}</i>${icon('check')}</span>`).join('')
    + '<em>Gửi</em></div>',
  catalog: () => '<div class="pa-fbcat">'
    + [5, 0, 2, 1].map((n, i) => {
      const [p, , price] = product(n);
      return `<span style="--i:${i}"><i class="photo">${shot(p)}</i><b>${price}</b></span>`;
    }).join('') + '</div>'
};

export function pickArtFb(id) {
  const r = PICK_ART[id];
  return r ? `<span class="pa pa-fb-${id}" aria-hidden="true">${r()}</span>` : '';
}
