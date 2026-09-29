// Zalo Ads mock screens (ZALO_ADS_REBUILD_PROMPT.md).
//
// Same rules as the Google, Facebook and TikTok mocks:
// - Real layout, no logos or wordmarks (Zalo, OA, ZaloPay, Báo Mới, Zing MP3):
//   an official account is a name plus the shared verified mark; partner
//   sites are named only "Trang tin tức" and "Ứng dụng nghe nhạc".
// - One sample brand, Nhà Thơm (nhathom.example), and its six products.
// - The ad picture is 1024 × 533 (.mk-img.r192) with cover.
// - Soft blue on white or light grey; text 11px or larger; tilt 4° or less.
// Every class here starts with zlm- and is styled in dist/zalo-ads-lp.css.
import {handset, win, BRAND, mkImg as img, mkFav as fav} from '../google-ads-lp/mocks.mjs';
import {icon, shot, esc, SHOP, PRODUCTS} from '../google-ads-lp/visuals.mjs';
import {zaloScreen, siteScreen, crmScreen, callScreen, FAB_KINDS} from '../google-ads-lp/scenes.mjs';

const product = i => PRODUCTS[i % PRODUCTS.length];
const phone = inner => handset(inner, {cls: 'zlm-phone'});
const wrap = html => `<div class="zlm" data-mock>${html}</div>`;
const av = (letter = 'N', cls = '') => fav(letter, 'zlm-av' + (cls ? ' ' + cls : ''));
const ok = () => icon('verified', 'zlm-ok');
const oaName = (name = BRAND) => `<b class="zlm-oa">${esc(name)}${ok()}</b>`;

const FOLLOWERS = '24.180 người quan tâm';
const TEXT = 'Nến sáp đậu nành mùi oải hương, đốt đến 40 giờ. Quan tâm OA để nhận ưu đãi tuần này.';

/* ------------------------------------------------------------------ *
 * The Nhật ký screen: blue search bar, a friend's post, the ad card, tabs
 * ------------------------------------------------------------------ */
const topBar = (label = 'Tìm kiếm') => `<div class="zlm-top">${icon('search')}<span>${esc(label)}</span>${icon('image')}${icon('bell')}</div>`;

const NAV = [['chat', 'Tin nhắn'], ['users', 'Danh bạ'], ['globe', 'Khám phá'], ['clock', 'Nhật ký'], ['person', 'Cá nhân']];
const nav = (on = 'Nhật ký') => '<div class="zlm-nav">'
  + NAV.map(([ic, t]) => `<span${t === on ? ' class="is-on"' : ''}>${icon(ic)}<em>${t}</em></span>`).join('') + '</div>';

const friend = () => '<div class="zlm-post">'
  + `<div class="zlm-ch">${av('H', 'is-alt')}<span><b>Thu Hà</b><em>2 giờ trước</em></span></div>`
  + '<p class="zlm-tx">Cuối tuần dọn lại góc làm việc, thêm một chậu cây nhỏ.</p><span class="zlm-bars"><i></i><i></i></span></div>';

// The ad card: avatar, OA name with the verified mark, "Quảng cáo", text of
// 90 characters or fewer, the 1024 × 533 picture, a footer with one CTA.
function card({pic = 's-shelf', text = TEXT, title = BRAND, sub = 'Tài khoản chính thức', cta = 'Quan tâm', media = '', hot = false} = {}) {
  return '<div class="zlm-card">'
    + `<div class="zlm-ch">${av()}<span>${oaName()}<em>Quảng cáo</em></span>${icon('dots')}</div>`
    + `<p class="zlm-tx">${esc(text)}</p>`
    + (media || img(pic, 'r192'))
    + `<div class="zlm-cf"><span><b>${esc(title)}</b><em>${esc(sub)}</em></span>`
    + `<span class="zlm-btn${hot ? ' is-hot' : ''}">${esc(cta)}</span></div></div>`;
}

const feed = (ad, extra = '') => phone(topBar() + `<div class="zlm-feed">${friend()}${ad}</div>` + extra + nav());

/* ------------------------------------------------------------------ *
 * Official account page and chat
 * ------------------------------------------------------------------ */
const MENU = ['Sản phẩm', 'Ưu đãi', 'Tư vấn'];

function oaPage({following = false} = {}) {
  const posts = [['s-desk', 'Ba mùi hương cho góc làm việc', '2 ngày trước'], ['s1', 'Cách dùng tinh dầu cho phòng ngủ', '5 ngày trước']];
  return phone('<div class="zlm-oapage">'
    + `<span class="zlm-cover">${img('s-hero', 'r192')}<i>${icon('back')}</i></span>`
    + `<div class="zlm-ohead">${av('N', 'is-xl')}${oaName()}<em>Tài khoản chính thức · ${FOLLOWERS}</em></div>`
    + '<div class="zlm-obtns">'
    + (following ? `<span class="is-done">${icon('check')}Đã quan tâm</span>` : `<span class="is-main">${icon('plus')}Quan tâm</span>`)
    + `<span>${icon('chat')}Nhắn tin</span></div>`
    + `<div class="zlm-menu">${MENU.map(m => `<span>${m}</span>`).join('')}</div>`
    + `<div class="zlm-posts">${posts.map(([p, t, d]) => `<span>${img(p, 'r11')}<span><b>${t}</b><em>${d}</em></span></span>`).join('')}</div>`
    + (following ? `<span class="zlm-toast">${icon('check')}Bạn đã quan tâm ${BRAND}</span>` : '')
    + '</div>');
}

const QUICK = ['Gửi tin nhắn', 'Mở website', 'Gọi điện'];
const GREET = 'Chào bạn! Nhà Thơm có thể giúp gì ạ? Chọn một nút bên dưới hoặc nhắn câu hỏi.';
const ZL_CLS = 'zlm-phone zlm-chat';

const chatGreet = ({pic = false} = {}) => zaloScreen({thread: [['shop', GREET]], quick: QUICK,
  head: pic ? `<span class="zlm-pic">${img('s1', 'r192')}</span>` : '', cls: ZL_CLS});

const chatTalk = () => zaloScreen({thread: [
  ['shop', GREET],
  ['me', 'Nến oải hương còn hàng không shop?'],
  ['shop', 'Dạ còn ạ. Bạn cho Nhà Thơm xin số điện thoại để xác nhận giao hàng nhé.']
], quick: [], sub: 'Tài khoản chính thức · Nhân viên đang trả lời', cls: ZL_CLS});

const chatFollowed = () => zaloScreen({thread: [
  ['shop', 'Cảm ơn bạn đã quan tâm Nhà Thơm! Bạn đang tìm mùi hương cho phòng nào ạ?'],
  ['me', 'Phòng ngủ, mùi dịu thôi'],
  ['shop', 'Dạ, oải hương hoặc gỗ tuyết tùng hợp phòng ngủ. Nhà Thơm gửi ảnh hai mẫu nhé.']
], quick: MENU, head: `<span class="zlm-sys">${icon('check')}Bạn vừa quan tâm ${BRAND}</span>`, cls: ZL_CLS});

const chatSent = () => zaloScreen({thread: [['shop', GREET], ['me', 'Cho mình hỏi giá hộp quà 3 nến']],
  quick: QUICK, sub: 'Tài khoản chính thức · Thường trả lời trong 5 phút', cls: ZL_CLS});

/* ------------------------------------------------------------------ *
 * Bài viết OA, website, thank-you page
 * ------------------------------------------------------------------ */
function article() {
  return phone('<div class="zlm-art">'
    + `<div class="zlm-abar">${icon('back')}${av('N', 'is-sm')}${oaName()}${icon('dots')}</div>`
    + '<b class="zlm-ah">Ba mùi hương cho góc làm việc</b>'
    + `<em class="zlm-am">${BRAND} · 2 ngày trước</em>`
    + img('s-desk', 'r192')
    + '<p>Góc làm việc cần mùi nhẹ, không át tập trung. Gỗ tuyết tùng giữ đầu óc tỉnh táo.</p>'
    + '<p>Buổi tối, đổi sang oải hương để thư giãn trước khi rời bàn.</p>'
    + `<span class="zlm-abtn">${icon('chat')}Nhắn tin tư vấn</span></div>`);
}

const FABS = ['call', 'zalo'].map(k => `<span class="sc-fab is-${k}"><span class="sc-fab-l">${FAB_KINDS[k].label}</span><i>${icon(FAB_KINDS[k].icon)}</i></span>`).join('');
const site = () => siteScreen({fabs: FABS});

function thanks() {
  return phone('<div class="zlm-thx">'
    + `<div class="zlm-addr">${icon('lock')}<span>${SHOP}/cam-on</span></div>`
    + `<span class="zlm-done">${icon('check')}</span><b>Đặt hàng thành công</b>`
    + '<p>Đơn #NT-1024 · Nhà Thơm gọi xác nhận trong 15 phút.</p>'
    + '<span class="zlm-ev">Zalo Ads Pixel · sự kiện đường dẫn URL</span></div>');
}

/* ------------------------------------------------------------------ *
 * Form inside Zalo
 * ------------------------------------------------------------------ */
const field = (label, value) => `<span class="zlm-ff"><small>${esc(label)}</small><b>${esc(value)}</b>${icon('check')}</span>`;

function formOpen() {
  return phone('<div class="zlm-form">'
    + `<div class="zlm-abar">${icon('close')}${av('N', 'is-sm')}${oaName()}<span></span></div>`
    + '<b class="zlm-fh">Nhận tư vấn chọn quà tặng</b>'
    + '<p class="zlm-fn">Tên và số điện thoại điền sẵn từ tài khoản Zalo. Kiểm tra trước khi gửi.</p>'
    + field('Họ và tên', 'Nguyễn Lan') + field('Số điện thoại', '09•• ••• 218')
    + '<div class="zlm-fq"><small>Bạn cần khoảng bao nhiêu hộp?</small><span>Dưới 10</span><span class="is-on">10 – 30</span><span>Trên 30</span></div>'
    + '<div class="zlm-fq"><small>Bạn muốn được gọi lúc nào?</small><span class="is-on">Buổi sáng</span><span>Buổi chiều</span></div>'
    + '<span class="zlm-fbtn">Gửi thông tin</span></div>');
}

function formThanks() {
  return phone('<div class="zlm-thx">'
    + `<span class="zlm-done">${icon('check')}</span><b>Cảm ơn bạn!</b>`
    + `<p>${BRAND} đã nhận thông tin và sẽ gọi cho bạn trong buổi sáng.</p>`
    + `<span class="zlm-fbtn">${icon('plus')}Quan tâm OA</span><span class="zlm-fbtn is-ghost">Đóng</span></div>`);
}

function formData() {
  const rows = [['09:12', 'Ng*** Lan', '09•• ••• 218', '10 – 30'], ['09:40', 'Tr*** Minh', '09•• ••• 574', 'Dưới 10'],
    ['10:05', 'Lê*** Tú', '09•• ••• 218', '10 – 30']];
  return win('quang-cao › form › du-lieu', '<div class="zlm-data">'
    + `<div class="zlm-dh"><b>Dữ liệu Form · Nhận tư vấn chọn quà</b><span>${icon('upload')}Tải dữ liệu Form</span></div>`
    + '<table><thead><tr><th>Giờ</th><th>Họ tên</th><th>Điện thoại</th><th>Số hộp</th></tr></thead><tbody>'
    + rows.map((r, i) => `<tr${i === 2 ? ' class="is-dup"' : ''}>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')
    + '</tbody></table><p class="zlm-dn">Dòng tô màu trùng số với dòng đầu: lọc trước khi gọi.</p></div>');
}

/* ------------------------------------------------------------------ *
 * Commerce: product page, order form, confirmation
 * ------------------------------------------------------------------ */
const bar = title => `<div class="zlm-abar">${icon('back')}<b class="zlm-bt">${esc(title)}</b>${icon('dots')}</div>`;

function comPage() {
  const [pic, name, price] = product(5);
  return phone('<div class="zlm-com">' + bar(BRAND)
    + img(pic, 'r11')
    + `<b class="zlm-ph">${esc(name)}</b><span class="zlm-pp">${price}</span>`
    + '<div class="zlm-vars"><small>Mùi hương</small><span class="is-on">Oải hương</span><span>Gỗ tuyết tùng</span></div>'
    + '<p class="zlm-fn">Sáp đậu nành, bấc gỗ, đốt đến 40 giờ. Giao 2 giờ nội thành.</p>'
    + `<span class="zlm-fbtn">${icon('cart')}Đặt mua</span></div>`);
}

function comOrder() {
  const [pic, name, price] = product(5);
  return phone('<div class="zlm-com">' + bar('Đặt hàng')
    + `<div class="zlm-crow">${img(pic, 'r11')}<span><b>${esc(name)}</b><em>${price} · Oải hương · 200g</em></span></div>`
    + '<div class="zlm-vars"><small>Kích cỡ</small><span class="is-on">200g</span><span>350g</span></div>'
    + field('Họ và tên', 'Nguyễn Lan') + field('Số điện thoại', '09•• ••• 218')
    + field('Địa chỉ', '12 Lý Tự Trọng, Quận 1')
    + '<div class="zlm-sum"><span>Tổng</span><b>320.000₫</b></div>'
    + '<span class="zlm-fbtn">Đặt hàng</span></div>');
}

function comDone() {
  const steps = [['Đã đặt', 'is-done'], ['Chờ doanh nghiệp xác nhận', 'is-now'], ['Đang giao', ''], ['Đã giao', '']];
  return phone('<div class="zlm-com">' + bar('Đơn hàng')
    + `<span class="zlm-done">${icon('check')}</span><b class="zlm-ph is-c">Đã gửi đơn #NT-1024</b>`
    + `<p class="zlm-fn is-c">${BRAND} sẽ gọi xác nhận trước khi giao.</p>`
    + `<ol class="zlm-steps">${steps.map(([t, c]) => `<li class="${c}"><i></i>${t}</li>`).join('')}</ol>`
    + '<div class="zlm-sum"><span>Thanh toán</span><b>Khi nhận hàng</b></div></div>');
}

/* ------------------------------------------------------------------ *
 * Video and display: in the feed, on a news page, in a music app
 * ------------------------------------------------------------------ */
const videoMedia = (pic = 's-hero') => `<span class="zlm-vid">${img(pic, 'r169')}`
  + `<i class="zlm-play">${icon('play')}</i><i class="zlm-snd">${icon('speaker')}</i>`
  + '<span class="zlm-prog"><i></i></span><em>0:12 / 0:30</em></span>';

const NEWS = ['Giá xăng giảm nhẹ từ chiều nay', 'Dự báo mưa rào vào cuối tuần', 'Mẹo giữ nhà khô thoáng mùa nồm'];

function newsPage(ad) {
  return phone('<div class="zlm-news">'
    + `<div class="zlm-nbar"><b>Trang tin tức</b>${icon('search')}</div>`
    + '<div class="zlm-cats"><b>Mới nhất</b><span>Đời sống</span><span>Kinh tế</span></div>'
    + `<div class="zlm-story"><i></i><span><b>${NEWS[0]}</b><em>15 phút trước</em></span></div>`
    + ad
    + NEWS.slice(1).map(t => `<div class="zlm-story"><i></i><span><b>${t}</b><em>1 giờ trước</em></span></div>`).join('')
    + '</div>');
}

const banner = (cls = '') => `<div class="zlm-ban${cls ? ' ' + cls : ''}"><small>Quảng cáo</small>`
  + `<span>${img('s-shelf', cls ? 'r11' : 'r192')}<span><b>${BRAND}</b><em>Nến sáp đậu nành · giao 2 giờ</em></span>`
  + '<i>Xem thêm</i></span></div>';

function musicApp() {
  return phone('<div class="zlm-music">'
    + `<div class="zlm-nbar is-dark">${icon('back')}<b>Ứng dụng nghe nhạc</b>${icon('dots')}</div>`
    + '<span class="zlm-disc"><i></i></span>'
    + '<b class="zlm-song">Bài hát đang phát</b><em class="zlm-artist">Nghệ sĩ</em>'
    + '<span class="zlm-prog is-song"><i></i></span>'
    + `<div class="zlm-ctrl">${icon('repeat')}<i>${icon('play')}</i>${icon('heart')}</div>`
    + banner()
    + '</div>');
}

/* ------------------------------------------------------------------ *
 * Chapter 01 — one mock per format id
 * ------------------------------------------------------------------ */
const [c5, n5, p5] = product(5);

const RENDER = {
  'oa-feed': () => feed(card()),
  'oa-page': () => oaPage(),
  'oa-network': () => newsPage(`<div class="zlm-inset">${card({cta: 'Quan tâm'})}</div>`),
  'oa-chat': () => chatFollowed(),

  'web-feed': () => feed(card({pic: 's-desk', text: 'Nến thơm nắp gỗ giảm 18% tuần này. Giao 2 giờ nội thành.', title: 'Nến thơm nắp gỗ 200g', sub: SHOP, cta: 'Mua ngay'})),
  'web-site': () => site(),
  'art-feed': () => feed(card({pic: 's-desk', text: 'Góc làm việc cần mùi nhẹ. Ba gợi ý từ Nhà Thơm.', title: 'Ba mùi hương cho góc làm việc', sub: 'Bài viết', cta: 'Xem thêm'})),
  'art-read': () => article(),

  'form-feed': () => feed(card({text: 'Đặt quà cuối năm cho đội ngũ? Để lại số, Nhà Thơm gọi tư vấn.', title: 'Nhận tư vấn chọn quà', sub: 'Form trong Zalo', cta: 'Đăng ký'})),
  'form-open': () => formOpen(),
  'form-thanks': () => formThanks(),
  'form-manage': () => formData(),

  'msg-feed': () => feed(card({pic: 's1', text: 'Chưa biết chọn mùi nào? Nhắn Nhà Thơm, tư vấn trong 5 phút.', title: BRAND, sub: 'Nhắn tin với OA', cta: 'Nhắn tin'})),
  'msg-text': () => chatGreet(),
  'msg-image': () => chatGreet({pic: true}),
  'msg-talk': () => chatTalk(),

  'com-feed': () => feed(card({pic: c5, text: 'Nến thơm nắp gỗ, đốt đến 40 giờ. Đặt ngay trong Zalo.', title: n5, sub: p5, cta: 'Mua ngay'})),
  'com-page': () => comPage(),
  'com-order': () => comOrder(),
  'com-done': () => comDone(),

  'vid-feed': () => feed(card({media: videoMedia(), text: 'Bộ sưu tập mùa thu. Ba mùi mới, ra mắt hôm nay.', title: BRAND, sub: 'Video', cta: 'Xem thêm'})),
  'vid-news': () => newsPage(`<div class="zlm-inset">${card({media: videoMedia('s-shelf'), text: 'Bộ sưu tập mùa thu. Ba mùi mới.', sub: 'Video', cta: 'Xem thêm'})}</div>`),
  'dsp-news': () => newsPage(banner()),
  'dsp-music': () => musicApp(),
  'dsp-mrec': () => newsPage(banner('is-mrec'))
};

export const ZL_MOCK_IDS = Object.keys(RENDER);
export function renderZl(id) {
  const r = RENDER[id];
  if (!r) throw new Error('No Zalo mock for ' + id);
  return wrap(r());
}

/* ------------------------------------------------------------------ *
 * Chapter 04 — the ad with the tappable buttons, and the screen behind
 * each button
 * ------------------------------------------------------------------ */
const MEAS_CARD = {
  oa: {}, web: {pic: 's-desk', title: 'Nến thơm nắp gỗ 200g', sub: SHOP},
  form: {title: 'Nhận tư vấn chọn quà', sub: 'Form trong Zalo'}, msg: {pic: 's1', sub: 'Nhắn tin với OA'},
  commerce: {pic: c5, title: n5, sub: p5}, media: {media: videoMedia(), sub: 'Video'}
};

export function measureAd(type) {
  return ({inline = '', cls = ''}) => handset(topBar()
    + `<div class="zlm-feed">${card({...MEAS_CARD[type], text: 'Chạm một nút bên dưới để xem khách thấy gì.', cta: ''})}`
    + `<div class="sc-inline zlm-inline">${inline}</div></div>` + nav(),
  {cls: `sc-phone zlm-phone zlm-meas${cls ? ' ' + cls : ''}`});
}

export function measureScenes(type) {
  const sale = type === 'commerce' || type === 'web';
  return {
    follow: () => wrap(oaPage({following: true})),
    oapage: () => wrap(oaPage()),
    chat: () => wrap(type === 'oa' ? chatFollowed() : chatGreet()),
    msgsent: () => wrap(chatSent()),
    call: () => wrap(callScreen()),
    site: () => wrap(site()),
    article: () => wrap(article()),
    zbtn: () => wrap(chatSent()),
    order: () => wrap(thanks()),
    formopen: () => wrap(formOpen()),
    lead: () => wrap(formThanks()),
    pdp: () => wrap(comPage()),
    orderform: () => wrap(comOrder()),
    view: () => wrap(feed(card({media: videoMedia(), text: 'Bộ sưu tập mùa thu. Ba mùi mới, ra mắt hôm nay.', sub: 'Video', cta: 'Xem thêm'}))),
    crm: () => crmScreen(sale ? 'sale' : 'qualified', {sources: {
      oa: ['Tin nhắn OA', 'Tin nhắn OA', 'Quan tâm OA'], web: ['Website', 'Nút Zalo', 'Website'],
      form: ['Form Zalo', 'Form Zalo', 'Form Zalo'], msg: ['Tin nhắn', 'Gọi điện', 'Tin nhắn'],
      commerce: ['Commerce', 'Commerce', 'Commerce'], media: ['Tin nhắn OA', 'Website', 'Tin nhắn OA']
    }[type]})
  };
}

/* ------------------------------------------------------------------ *
 * Page 02 — what opens after the tap, per objective
 * ------------------------------------------------------------------ */
export const AFTER_CLICK = {
  follow: () => wrap(oaPage({following: true})),
  traffic: () => wrap(site()),
  awareness: () => wrap(article()),
  leads: () => wrap(formOpen()),
  chat: () => wrap(chatGreet()),
  sell: () => wrap(comPage())
};

// Page 02, readiness stage → the ad that person sees.
export const STAGE_AD = {
  cold: () => wrap(RENDER['vid-feed']()),
  warm: () => wrap(RENDER['oa-feed']()),
  hot: () => wrap(RENDER['form-feed']()),
  lead: () => wrap(RENDER['msg-feed']()),
  customer: () => wrap(feed(card({pic: c5, text: 'Bạn đã mua nến oải hương. Thử thêm gỗ tuyết tùng, giảm 10%.', title: n5, sub: p5, cta: 'Mua ngay', hot: true})))
};

/* ------------------------------------------------------------------ *
 * Hero stack and picker art
 * ------------------------------------------------------------------ */
const miniHead = () => `<span class="zlh-h">${av('N', 'is-sm')}<b>${BRAND}${ok()}</b><em>Quảng cáo</em></span>`;

export function heroStack() {
  const feedCard = `<div class="zlh-card">${miniHead()}<i class="photo">${shot('s-shelf')}</i>`
    + '<span class="zlh-cf"><em>Tài khoản chính thức</em><b>Quan tâm</b></span></div>';
  const oa = `<div class="zlh-oa"><i class="photo">${shot('s-hero')}</i>${av('N', 'is-lg')}<b>${BRAND}${ok()}</b>`
    + '<span><em class="is-main">Quan tâm</em><em>Nhắn tin</em></span></div>';
  const chat = '<div class="zlh-chat"><span class="zlh-bar">' + BRAND + '</span>'
    + '<p>Chào bạn! Nhà Thơm có thể giúp gì ạ?</p><p class="is-me">Nến oải hương còn không?</p>'
    + `<span class="zlh-q">${QUICK.map(q => `<i>${q}</i>`).join('')}</span></div>`;
  const form = '<div class="zlh-form"><b>Nhận tư vấn</b>'
    + ['Nguyễn Lan', '09•• ••• 218'].map(v => `<span>${v}${icon('check')}</span>`).join('') + '<em>Gửi</em></div>';

  return '<div class="hero-stage" aria-hidden="true"><div class="stack" id="heroStack">'
    + `<div class="card3d c-serp zlc-card">${feedCard}<span class="c-tag">Nhật ký</span></div>`
    + `<div class="card3d c-shop zlc-oa">${oa}<span class="c-tag">Trang OA</span></div>`
    + `<div class="card3d c-yt zlc-chat">${chat}<span class="c-tag">Tin nhắn</span></div>`
    + `<div class="card3d c-map zlc-form">${form}<span class="c-tag">Form</span></div>`
    + `<div class="card3d c-logo"><span class="c-tap">${icon('tap')}</span></div>`
    + '</div></div>';
}

const paCard = (pic, cta, extra = '') => `<span class="pa-zlcard">${miniHead()}<i class="photo">${shot(pic)}</i>${extra}<b>${cta}</b></span>`;

const PICK_ART = {
  oa: () => `<div class="pa-zlrow">${paCard('s-shelf', 'Quan tâm')}<span class="pa-zlbadge">${icon('plus')}<b>1.200</b><em>lượt quan tâm</em></span></div>`,
  web: () => `<div class="pa-zlrow">${paCard('s-desk', 'Mua ngay')}<span class="pa-zlsite"><i class="photo">${shot('s6')}</i><em>${SHOP}</em></span></div>`,
  form: () => '<div class="pa-zlform"><b>Nhận tư vấn</b>'
    + ['Nguyễn Lan', '09•• ••• 218'].map((v, i) => `<span style="--i:${i}"><i>${v}</i>${icon('check')}</span>`).join('') + '<em>Gửi thông tin</em></div>',
  msg: () => `<div class="pa-zlchat"><p>Chào bạn! Nhà Thơm có thể giúp gì ạ?</p><span>${QUICK.map(q => `<i>${q}</i>`).join('')}</span></div>`,
  commerce: () => `<div class="pa-zlrow">${paCard(c5, 'Mua ngay')}<span class="pa-zlsite is-order"><b>${esc(n5)}</b><em>${p5}</em><i>Đặt mua</i></span></div>`,
  media: () => `<div class="pa-zlrow"><span class="pa-zlvid"><i class="photo">${shot('s-hero')}</i><b>${icon('play')}</b><s></s></span>`
    + `<span class="pa-zlsite is-ban"><small>Quảng cáo</small><i class="photo">${shot('s-shelf')}</i></span></div>`
};

export function pickArtZl(id) {
  const r = PICK_ART[id];
  return r ? `<span class="pa pa-zl-${id}" aria-hidden="true">${r()}</span>` : '';
}
