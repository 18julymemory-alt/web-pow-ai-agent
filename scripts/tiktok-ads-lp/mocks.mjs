// TikTok Ads mock screens (TIKTOK_ADS_REBUILD_PROMPT.md).
//
// Same rules as the Google and Facebook mocks:
// - Real layout, no logos or wordmarks (TikTok, CapCut, Lemon8, TikTok Shop):
//   a For You screen is two top tabs, a right rail and a caption block. The
//   sound is a spinning disc, never a note shape.
// - One sample brand, Nhà Thơm (nhathom.example), and its six products.
// - 9:16 first. Pictures fill fixed-ratio frames (.mk-img.rXX) with cover.
// - Text is 11px or larger; tilt stays at 4° or less.
// Every class here starts with ttm- and is styled in dist/tiktok-ads-lp.css.
import {handset, BRAND, mkImg as img, mkFav as fav} from '../google-ads-lp/mocks.mjs';
import {icon, shot, esc, SHOP, PRODUCTS} from '../google-ads-lp/visuals.mjs';
import {messengerScreen, zaloScreen, crmScreen} from '../google-ads-lp/scenes.mjs';

const HANDLE = 'nhathom';
const CREATOR = ['M', 'Mai Linh', 'mailinh.decor'];

// Glyphs the shared icon set does not have. Same stroke style as icon().
const svg = d => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const G = {
  comment: svg('<path d="M12 4c4.4 0 8 3 8 6.8s-3.6 6.7-8 6.7c-.9 0-1.8-.1-2.6-.4L5 19l1-3.4C4.8 14.4 4 12.7 4 10.8 4 7 7.6 4 12 4Z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/>'),
  save: svg('<path d="M7 4h10v16l-5-4-5 4Z"/>'),
  share: svg('<path d="M13 5l7 6.5-7 6.5v-4c-5 0-8 1.5-10 5 .5-6 3.5-10 10-10.5Z"/>'),
  disc: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.5"/>'),
  bag: svg('<path d="M5 8h14l-1 12H6Z"/><path d="M9 8V7a3 3 0 0 1 6 0v1"/>'),
  home: svg('<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z"/>')
};

const av = (letter = 'N', cls = '') => fav(letter, 'ttm-av' + (cls ? ' ' + cls : ''));
const product = i => PRODUCTS[i % PRODUCTS.length];
const phone = (inner, dark = false) => handset(inner, {dark, cls: 'ttm-phone'});
const wrap = html => `<div class="ttm" data-mock>${html}</div>`;

/* ------------------------------------------------------------------ *
 * The For You screen: top tabs, right rail, caption block, CTA bar, nav
 * ------------------------------------------------------------------ */
const fyTabs = () => `<div class="ttm-tabs"><span class="ttm-live">LIVE</span><span>Đang follow</span>`
  + `<b>Dành cho bạn</b><i>${icon('search')}</i></div>`;

const searchTop = q => `<div class="ttm-qtop">${icon('back')}<span>${icon('search')}${esc(q)}</span></div>`;

// Avatar with the follow badge, heart, comment, save, share, spinning disc.
function rail({letter = 'N', counts = ['12,4 N', '318', '1.206', '402'], alt = false} = {}) {
  const [likes, comments, saves, shares] = counts;
  const cell = (g, n) => `<span>${g}<em>${n}</em></span>`;
  return '<div class="ttm-rail">'
    + `<span class="ttm-me">${av(letter, alt ? 'is-alt' : '')}<i>${icon('plus')}</i></span>`
    + cell(icon('heart'), likes) + cell(G.comment, comments) + cell(G.save, saves) + cell(G.share, shares)
    + `<span class="ttm-disc">${shot('s6')}</span></div>`;
}

// Name, "Được tài trợ", two-line caption, sound line.
function meta({name = BRAND, sponsored = 'Được tài trợ', caption, sound = `Âm thanh gốc · ${BRAND}`, follow = false, extra = ''} = {}) {
  return '<div class="ttm-meta">'
    + extra
    + `<b class="ttm-name">${esc(name)}${follow ? '<span class="ttm-follow">Follow</span>' : ''}</b>`
    + (sponsored ? `<span class="ttm-spons">${esc(sponsored)}</span>` : '')
    + `<p class="ttm-cap">${esc(caption)}</p>`
    + `<span class="ttm-sound">${G.disc}<span>${esc(sound)}</span></span></div>`;
}

const ctaBar = (cta, hot = false) => `<span class="ttm-cta${hot ? ' is-hot' : ''}"><b>${esc(cta)}</b><i aria-hidden="true">›</i></span>`;

const nav = () => '<div class="ttm-nav">'
  + `<span>${G.home}<em>Trang chủ</em></span><span>${icon('users')}<em>Bạn bè</em></span>`
  + `<span class="ttm-add">${icon('plus')}</span>`
  + `<span>${icon('mail')}<em>Hộp thư</em></span><span>${icon('person')}<em>Hồ sơ</em></span></div>`;

const CAPTION = 'Góc thư giãn cuối ngày: nến sáp đậu nành, mùi oải hương dịu nhẹ, đốt đến 40 giờ.';

function fy({pic = 's-tall', top = fyTabs(), letter = 'N', alt = false, counts, name, sponsored, caption = CAPTION, sound, follow,
  cta = 'Mua ngay', hot = false, extra = '', over = '', media = ''} = {}) {
  return phone('<div class="ttm-fy">'
    + (media || img(pic, 'r916'))
    + top
    + rail({letter, counts, alt})
    + meta({name, sponsored, caption, sound, follow, extra})
    + (cta ? ctaBar(cta, hot) : '')
    + over
    + '</div>' + nav(), true);
}

/* ------------------------------------------------------------------ *
 * Carousel, product anchor, LIVE
 * ------------------------------------------------------------------ */
const carouselMedia = () => `<span class="ttm-car">${img('s-desk', 'r916')}`
  + '<span class="ttm-count">1/5</span>'
  + '<span class="ttm-dots"><i class="is-on"></i><i></i><i></i><i></i><i></i></span></span>';

// The product card that sits above the caption on a shopping video.
const anchor = (i = 5) => {
  const [pic, name, price] = product(i);
  return `<span class="ttm-anchor">${img(pic)}<span><b>${esc(name)}</b><em>${price}</em></span>${G.bag}</span>`;
};

const catalogRow = () => '<span class="ttm-catrow">' + [5, 0, 2].map(i => {
  const [pic, , price] = product(i);
  return `<span>${img(pic)}<em>${price}</em></span>`;
}).join('') + '</span>';

const COMMENTS = [['Hà', 'Mùi oải hương có nồng không ạ?'], ['Tú', 'Đặt 2 hộp rồi nha'], ['Vy', 'Có giao Đà Nẵng không shop?']];

function live({pinned = true} = {}) {
  const [pic, name, price] = product(5);
  return phone('<div class="ttm-fy ttm-livewrap">'
    + img('s-shelf', 'r916')
    + `<div class="ttm-lhead">${av()}<span><b>${BRAND}</b><em>${icon('eye')}1,2 N người xem</em></span>`
    + `<span class="ttm-lbadge">LIVE</span><i>${icon('close')}</i></div>`
    + `<div class="ttm-comments">${COMMENTS.map(([who, t]) => `<p><b>${who}</b>${esc(t)}</p>`).join('')}</div>`
    + (pinned ? `<span class="ttm-pin">${img(pic)}<span><small>Đang giới thiệu</small><b>${esc(name)}</b><em>${price}</em></span>`
      + '<span class="ttm-buy">Mua</span></span>' : '')
    + `<div class="ttm-lfoot"><span class="ttm-bag">${G.bag}<i>12</i></span><span class="ttm-say">Thêm bình luận…</span>`
    + `${icon('heart')}${G.share}</div>`
    + '</div>', true);
}

/* ------------------------------------------------------------------ *
 * Search
 * ------------------------------------------------------------------ */
const TILES = [
  ['s-desk', 'Cách chọn nến cho phòng ngủ', 'Góc Sống Xanh', '8,1 N'],
  ['s6', 'Nến thơm nắp gỗ · giao 2 giờ', BRAND, '2,4 N', true],
  ['s1', 'Tinh dầu hay nến thơm?', 'Mẹo Nhà', '5,6 N'],
  ['s3', 'Review khuếch tán que gỗ', 'Linh review', '3,0 N']
];

function searchGrid({q = 'nến thơm', note = ''} = {}) {
  const tile = ([pic, t, who, likes, ad]) => `<span class="ttm-tile${ad ? ' is-ad' : ''}">`
    + `<span class="ttm-tpic">${img(pic, 'r34')}${ad ? '<b class="ttm-tspons">Được tài trợ</b>' : ''}</span>`
    + `<b class="ttm-tt">${esc(t)}</b><span class="ttm-tw">${av(who[0], 'is-sm' + (ad ? '' : ' is-alt'))}<em>${esc(who)}</em>`
    + `<i>${icon('heart')}${likes}</i></span></span>`;
  return phone(`<div class="ttm-search">${searchTop(q)}`
    + '<div class="ttm-chips"><b>Hàng đầu</b><span>Video</span><span>Người dùng</span><span>Cửa hàng</span><span>LIVE</span></div>'
    + `<div class="ttm-grid">${TILES.map(tile).join('')}</div>`
    + (note ? `<span class="ttm-toast">${esc(note)}</span>` : '')
    + '</div>');
}

/* ------------------------------------------------------------------ *
 * Profile, authorisation code, partner apps
 * ------------------------------------------------------------------ */
function profile({letter = 'N', name = BRAND, handle = HANDLE, following = false} = {}) {
  const pics = ['s-desk', 's6', 's1', 's3', 's5', 's2'];
  return phone('<div class="ttm-prof">'
    + `<div class="ttm-pbar">${icon('back')}<b>${esc(name)}</b>${icon('dots')}</div>`
    + `<div class="ttm-phead">${av(letter, 'is-xl' + (letter === 'N' ? '' : ' is-alt'))}<em>@${esc(handle)}</em></div>`
    + '<div class="ttm-stats"><span><b>86</b>Đang follow</span><span><b>24,1 N</b>Follower</span><span><b>310 N</b>Thích</span></div>'
    + `<div class="ttm-pbtns"><span class="${following ? 'is-done' : 'is-main'}">${following ? icon('check') + 'Đang follow' : 'Follow'}</span>`
    + '<span>Nhắn tin</span></div>'
    + '<p class="ttm-bio">Nến & tinh dầu thiên nhiên · giao 2 giờ nội thành</p>'
    + `<div class="ttm-pgrid">${pics.map((p, i) => `<span>${img(p, 'r34')}${i === 0 ? '<b>Đã ghim</b>' : ''}`
      + `<em>${icon('play')}${['12 N', '8,4 N', '3,1 N', '5 N', '2,2 N', '9 N'][i]}</em></span>`).join('')}</div>`
    + '</div>');
}

function sparkCode() {
  return phone('<div class="ttm-set">'
    + `<div class="ttm-pbar">${icon('back')}<b>Cài đặt quảng cáo</b><span></span></div>`
    + `<div class="ttm-srow"><span><b>Cho phép quảng cáo bài này</b><em>Doanh nghiệp dùng bài qua mã ủy quyền</em></span><i class="ttm-sw is-on"></i></div>`
    + `<div class="ttm-srow"><span><b>Thời hạn ủy quyền</b><em>Chủ bài chọn</em></span><strong>30 ngày ›</strong></div>`
    + `<div class="ttm-code"><small>Mã ủy quyền</small><b>#ttA1b2••••••c9</b><span>${icon('file')}Sao chép</span></div>`
    + `<div class="ttm-postmini">${img('s3', 'r34')}<span><b>@${CREATOR[2]}</b><em>Bài đăng được chọn · 12,4 N lượt thích</em></span></div>`
    + '<p class="ttm-hint">Gửi mã cho doanh nghiệp. Hủy ủy quyền bất cứ lúc nào trong mục này.</p>'
    + '</div>');
}

// The ad inside someone else's app; the app is named in text only.
function partnerApp({bundle = false} = {}) {
  const [title, sub] = bundle ? ['Ứng dụng chỉnh video', 'Một ứng dụng trong gói ứng dụng'] : ['Tin tức hôm nay', 'Ứng dụng đối tác'];
  return phone('<div class="ttm-app">'
    + `<div class="ttm-appbar"><b>${title}</b><em>${sub}</em></div>`
    + (bundle
      ? '<div class="ttm-edit"><span class="ttm-track"><i></i><i></i><i></i></span><em>Đang xuất video · 64%</em></div>'
      : '<div class="ttm-news"><b>Giá xăng giảm nhẹ từ chiều nay</b><span></span><span></span></div>')
    + `<div class="ttm-native"><span class="ttm-adl">Quảng cáo</span>${img(bundle ? 's-tall' : 's6', bundle ? 'r916' : 'r11')}`
    + `<div class="ttm-nrow">${av()}<span><b>${BRAND}</b><em>${esc(CAPTION.slice(0, 44))}…</em></span></div>`
    + '<span class="ttm-nbtn">Mua ngay</span></div>'
    + (bundle ? '' : '<div class="ttm-news"><b>Dự báo mưa rào vào cuối tuần</b><span></span></div>')
    + '</div>');
}

/* ------------------------------------------------------------------ *
 * Instant form, chat, in-app pages
 * ------------------------------------------------------------------ */
function formShell(inner, step) {
  return phone('<div class="ttm-form">'
    + `<span class="ttm-dim">${img('s-tall', 'r916')}</span>`
    + `<div class="ttm-sheet"><div class="ttm-fbar"><span class="ttm-grab"></span>${icon('close')}${step ? `<em>${step}</em>` : ''}</div>`
    + inner + '</div></div>', true);
}

const field = (label, value) => `<label class="ttm-ff"><small>${esc(label)}</small><span>${esc(value)}</span><i>${icon('check')}</i></label>`;

const formOpen = () => formShell(`<div class="ttm-fbrand">${av()}<b>${BRAND}</b></div>`
  + '<b class="ttm-fh">Nhận báo giá quà tặng cuối năm</b>'
  + '<p class="ttm-fnote">Điền sẵn từ thông tin TikTok của bạn. Kiểm tra lại trước khi gửi.</p>'
  + field('Họ và tên', 'Nguyễn Lan') + field('Số điện thoại', '09•• ••• 218')
  + '<div class="ttm-fq"><small>Bạn cần khoảng bao nhiêu hộp?</small><span>Dưới 10</span><span class="is-on">10 – 30</span><span>Trên 30</span></div>'
  + `<p class="ttm-fpriv">Thông tin được gửi cho ${BRAND}. <u>Chính sách quyền riêng tư</u></p>`
  + '<span class="ttm-fbtn">Gửi</span>', '1 / 2');

const formThanks = () => formShell(`<span class="ttm-done">${icon('check')}</span>`
  + '<b class="ttm-fh is-c">Cảm ơn bạn!</b>'
  + '<p class="ttm-fnote is-c">Nhà Thơm đã nhận thông tin và sẽ gọi cho bạn trong 15 phút.</p>'
  + `<span class="ttm-fbtn">${icon('phone')}Gọi ngay</span>`
  + `<span class="ttm-fbtn is-ghost">${icon('link')}Xem website</span>`, '2 / 2');

const GREETING = [['shop', 'Chào bạn! Nhà Thơm có thể giúp gì ạ? Chọn một câu bên dưới để hỏi nhanh.']];
const QUICK = ['Giá bao nhiêu?', 'Còn hàng không?', 'Giao mấy ngày?'];

const dm = (thread = GREETING, quick = QUICK, first = true) => messengerScreen({thread, quick, quickFirst: first,
  sub: 'Tài khoản doanh nghiệp · thường trả lời trong vài phút', intro: 'Nến & tinh dầu thiên nhiên · 24,1 N follower', cls: 'ttm-dm'});

const dmLead = () => dm([
  ['shop', 'Bạn cần khoảng bao nhiêu hộp quà ạ?'],
  ['me', 'Khoảng 20 hộp'],
  ['shop', 'Cho Nhà Thơm xin số điện thoại để gửi báo giá nhé.'],
  ['me', '09•• ••• 218']
], [], false);

const zalo = () => zaloScreen({thread: [
  ['shop', 'Chào bạn! Nhà Thơm nhận được tin từ video trên TikTok. Bạn cần tư vấn món nào ạ?'],
  ['me', 'Mình muốn hỏi hộp quà 20 phần'],
  ['shop', 'Dạ, Nhà Thơm gửi bảng giá sỉ và mẫu hộp ngay nhé.']
], quick: ['Xem bảng giá', 'Mẫu hộp quà']});

function inApp(inner) {
  return phone(`<div class="ttm-iab"><div class="ttm-iabbar">${icon('close')}<span><b>${BRAND}</b><em>${SHOP}</em></span>${icon('dots')}</div>`
    + inner + '</div>');
}

const productPage = (i = 5) => {
  const [pic, name, price] = product(i);
  return inApp(`${img(pic, 'r43')}<b class="ttm-ph">${esc(name)}</b>`
    + `<span class="ttm-pp">${price}</span><p class="ttm-pd">Sáp đậu nành, giao 2 giờ, đổi trả 7 ngày.</p>`
    + `<span class="ttm-fbtn">${icon('cart')}Thêm vào giỏ</span>`);
};

const cartPage = () => {
  const [pic, name, price] = product(5);
  return inApp('<b class="ttm-ph">Giỏ hàng (1)</b>'
    + `<div class="ttm-crow">${img(pic)}<span><b>${esc(name)}</b><em>${price} · SL 1</em></span></div>`
    + '<div class="ttm-sum"><span>Tạm tính</span><b>320.000₫</b></div>'
    + '<span class="ttm-fbtn">Thanh toán</span>'
    + `<span class="ttm-toast is-dark">${icon('check')}Đã thêm vào giỏ</span>`);
};

const orderDone = (inside = false) => {
  const body = `<span class="ttm-done">${icon('check')}</span>`
    + '<b class="ttm-ph is-c">Đặt hàng thành công</b>'
    + '<p class="ttm-pd is-c">Đơn #NT-1024 · giao trong 2 giờ</p>'
    + '<div class="ttm-sum"><span>Tổng thanh toán</span><b>320.000₫</b></div>'
    + '<div class="ttm-sum"><span>Thanh toán</span><b>Khi nhận hàng</b></div>';
  return inside ? phone(`<div class="ttm-pdp is-done"><div class="ttm-iabbar">${icon('back')}<span><b>Đơn hàng</b></span>${icon('dots')}</div>${body}</div>`) : inApp(body);
};

// The in-app product page of a shop (no browser bar): "Mua ngay".
function pdp(i = 5) {
  const [pic, name, price] = product(i);
  return phone('<div class="ttm-pdp">'
    + `<span class="ttm-pdpimg">${img(pic, 'r11')}<i>${icon('back')}</i><em>1/6</em></span>`
    + `<div class="ttm-pdpbody"><span class="ttm-pp">${price}<s>380.000₫</s></span>`
    + `<b class="ttm-ph">${esc(name)}</b>`
    + `<span class="ttm-rate">${icon('star')}4,8 · Đã bán 1,2 N</span>`
    + `<span class="ttm-ship">${icon('route')}Giao 2 giờ nội thành · Đổi trả 7 ngày</span></div>`
    + `<div class="ttm-buybar"><span>${icon('store')}<em>Cửa hàng</em></span><span>${G.comment}<em>Chat</em></span>`
    + '<b class="is-cart">Thêm vào giỏ</b><b class="is-buy">Mua ngay</b></div>'
    + '</div>');
}

function appStore() {
  return phone(`<div class="ttm-store"><div class="ttm-storetop">${img('s6', 'r11')}<span><b>Nhà Thơm — Nến & tinh dầu</b>`
    + '<em>Mua sắm · 4,7 ★</em></span></div><span class="ttm-fbtn">Cài đặt</span>'
    + `<div class="ttm-shots">${['s6', 's1', 's5'].map(p => img(p, 'r916')).join('')}</div></div>`);
}

/* ------------------------------------------------------------------ *
 * Reservation: TopView countdown, TopFeed, TopReach, reach & frequency
 * ------------------------------------------------------------------ */
function topview() {
  return phone('<div class="ttm-fy ttm-tv">'
    + img('s-tall', 'r916')
    + '<span class="ttm-open">Mở ứng dụng · video đầu tiên</span>'
    + '<span class="ttm-count3"><svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15"/><circle class="is-run" cx="18" cy="18" r="15"/></svg><b>3</b></span>'
    + `<div class="ttm-tvmeta"><b>${BRAND}</b><span class="ttm-spons">Được tài trợ</span>`
    + '<p class="ttm-cap">Bộ sưu tập mùa thu. Ba mùi mới, ra mắt hôm nay.</p></div>'
    + ctaBar('Tìm hiểu thêm', true)
    + '<span class="ttm-next">Hết giờ đếm → vào Dành cho bạn</span>'
    + '</div>', true);
}

function topreach() {
  return phone('<div class="ttm-tr">'
    + '<div class="ttm-trrow">'
    + `<span class="ttm-trcell"><span class="ttm-mini">${img('s-tall', 'r916')}<b>3</b></span><em>TopView<br>khi mở ứng dụng</em></span>`
    + `<span class="ttm-trarrow">${icon('arrow')}</span>`
    + `<span class="ttm-trcell"><span class="ttm-mini is-feed">${img('s-desk', 'r916')}<i>Dành cho bạn</i></span><em>TopFeed<br>vị trí đầu</em></span>`
    + '</div>'
    + '<div class="ttm-cap24"><b>1</b><span>lượt hiển thị mỗi người<br>trong 24 giờ</span></div>'
    + '<p class="ttm-hint">Mỗi người thấy quảng cáo ở một trong hai vị trí. Bài giới thiệu TopReach không nêu danh sách thị trường.</p>'
    + '</div>');
}

function rfPlan() {
  const bars = [30, 52, 70, 82, 90, 94];
  return phone('<div class="ttm-set">'
    + `<div class="ttm-pbar">${icon('back')}<b>Đặt trước · số mẫu</b><span></span></div>`
    + '<div class="ttm-rf"><span><small>Người tiếp cận dự kiến</small><b>1,2 Tr</b></span><span><small>Tần suất</small><b>2 lần / 7 ngày</b></span></div>'
    + `<div class="ttm-rfbars">${bars.map((h, i) => `<i style="--h:${h}%"><em>N${i + 1}</em></i>`).join('')}</div>`
    + '<div class="ttm-srow"><span><b>Ngày chạy</b><em>Đã giữ chỗ</em></span><strong>01/11 – 07/11</strong></div>'
    + '<div class="ttm-srow"><span><b>Giá</b><em>Xác nhận trước khi chạy</em></span><strong>Theo báo giá</strong></div>'
    + '<p class="ttm-hint">Số trên màn hình là số mẫu, không phải kết quả dự kiến.</p>'
    + '</div>');
}

/* ------------------------------------------------------------------ *
 * Chapter 01 — one mock per format id
 * ------------------------------------------------------------------ */
const creator = (extra = {}) => fy({pic: 's3', letter: CREATOR[0], alt: true, name: CREATOR[1], follow: true, sponsored: 'Được tài trợ · hợp tác với Nhà Thơm',
  counts: ['48,2 N', '1.204', '3.310', '860'], caption: 'Mình dùng khuếch tán que gỗ này 3 tuần rồi, phòng thơm dịu cả ngày.',
  sound: `Âm thanh gốc · ${CREATOR[1]}`, cta: 'Xem thêm', ...extra});

const RENDER = {
  'fy-video': () => fy(),
  'fy-cta': () => fy({hot: true, cta: 'Mua ngay'}),
  carousel: () => fy({media: carouselMedia(), caption: 'Năm món cho góc thư giãn. Vuốt để xem.', sound: 'Nhạc thương mại · Chill buổi tối', cta: 'Xem thêm'}),
  'ad-network': () => partnerApp(),
  'app-bundle': () => partnerApp({bundle: true}),

  'spark-post': () => fy({pic: 's-desk', sponsored: 'Được tài trợ', counts: ['9,8 N', '240', '880', '130'],
    caption: 'Ba bước cho góc thư giãn tối nay. Bạn thích mùi nào nhất?', cta: 'Xem thêm'}),
  'spark-creator': () => creator(),
  'spark-profile': () => profile(),
  'spark-code': () => sparkCode(),

  'lead-video': () => fy({pic: 's-shelf', caption: 'Đặt quà cuối năm cho đội ngũ: để lại thông tin, nhận báo giá trong 15 phút.', cta: 'Đăng ký'}),
  'form-open': () => formOpen(),
  'form-thanks': () => formThanks(),
  'dm-open': () => dm(),
  'zalo-open': () => zalo(),

  'shop-video': () => fy({pic: 's6', extra: anchor(5), caption: 'Nến nắp gỗ 200g, đốt đến 40 giờ. Chạm thẻ để xem giá.'}),
  'shop-pdp': () => pdp(),
  'shop-live': () => live(),
  'shop-catalog': () => fy({pic: 's-desk', extra: catalogRow(), caption: 'Những món bạn có thể thích từ Nhà Thơm.', cta: 'Mua ngay'}),

  'search-grid': () => searchGrid(),
  'search-open': () => fy({top: searchTop('nến thơm'), pic: 's6', caption: 'Nến thơm nắp gỗ · giao 2 giờ nội thành.', cta: 'Mua ngay'}),
  'search-auto': () => searchGrid({note: 'Cùng video đang chạy trong Dành cho bạn'}),
  'search-campaign': () => searchGrid({q: 'quà tặng nến thơm', note: 'Chiến dịch riêng: chưa có ở Việt Nam'}),

  topview: () => topview(),
  topfeed: () => fy({pic: 's-shelf', caption: 'Bộ sưu tập mùa thu. Ba mùi mới, ra mắt hôm nay.', cta: 'Tìm hiểu thêm',
    over: '<span class="ttm-first">Video đầu tiên sau khi mở ứng dụng</span>'}),
  topreach: () => topreach(),
  rf: () => rfPlan()
};

export const TT_MOCK_IDS = Object.keys(RENDER);
export function renderTt(id) {
  const r = RENDER[id];
  if (!r) throw new Error('No TikTok mock for ' + id);
  return wrap(r());
}

/* ------------------------------------------------------------------ *
 * Chapter 04 — the ad with the tappable buttons, and the screen behind
 * each button
 * ------------------------------------------------------------------ */
const MEAS_PIC = {infeed: 's-tall', spark: 's3', lead: 's-shelf', shop: 's6', search: 's6', brand: 's-shelf'};

export function measureAd(type) {
  return ({inline = '', fabs = '', cls = ''}) => handset('<div class="ttm-fy">'
    + img(MEAS_PIC[type], 'r916')
    + (type === 'search' ? searchTop('nến thơm') : fyTabs())
    + rail({letter: type === 'spark' ? 'M' : 'N', alt: type === 'spark'})
    + meta({name: type === 'spark' ? CREATOR[1] : BRAND, caption: 'Chạm một nút bên dưới để xem khách thấy gì.',
      extra: type === 'shop' ? anchor(5) : ''})
    + `<div class="sc-inline ttm-inline">${inline}</div>`
    + '</div>' + fabs, {dark: true, cls: `sc-phone ttm-phone ttm-meas${cls ? ' ' + cls : ''}`});
}

export function measureScenes(type) {
  return {
    product: () => wrap(productPage(5)),
    cart: () => wrap(cartPage()),
    order: () => wrap(orderDone(type === 'shop')),
    follow: () => wrap(profile({following: true, letter: type === 'spark' ? 'M' : 'N',
      name: type === 'spark' ? CREATOR[1] : BRAND, handle: type === 'spark' ? CREATOR[2] : HANDLE})),
    profile: () => wrap(profile({letter: 'M', name: CREATOR[1], handle: CREATOR[2]})),
    formopen: () => wrap(formOpen()),
    lead: () => wrap(formThanks()),
    chat: () => wrap(dm()),
    pdp: () => wrap(pdp()),
    live: () => wrap(live()),
    open: () => wrap(fy({top: searchTop('nến thơm'), pic: 's6', caption: 'Nến thơm nắp gỗ · giao 2 giờ nội thành.'})),
    view: () => wrap(fy({pic: 's-shelf', caption: 'Bộ sưu tập mùa thu. Ba mùi mới, ra mắt hôm nay.', cta: 'Tìm hiểu thêm',
      over: '<span class="ttm-first">Xem hết · chuyển về Dành cho bạn</span>'})),
    crm: () => crmScreen(type === 'lead' ? 'qualified' : 'sale', {sources: type === 'lead'
      ? ['Biểu mẫu', 'Tin nhắn', 'Biểu mẫu'] : ['TikTok Shop', 'LIVE', 'TikTok Shop']})
  };
}

/* ------------------------------------------------------------------ *
 * Page 02 — what opens after the tap, per objective
 * ------------------------------------------------------------------ */
export const AFTER_CLICK = {
  reach: () => wrap(fy({cta: '', caption: 'Góc thư giãn cuối ngày. Nhà Thơm, nến sáp đậu nành.'})),
  traffic: () => wrap(productPage(5)),
  views: () => wrap(fy({pic: 's-desk', cta: '', caption: 'Ba bước cho góc thư giãn tối nay.',
    over: '<span class="ttm-prog"><i style="--w:64%"></i></span>'})),
  community: () => wrap(profile({following: true})),
  leads: () => wrap(formOpen()),
  app: () => wrap(appStore()),
  sales: () => wrap(pdp())
};

// Page 02, readiness stage → the ad that person sees.
export const STAGE_AD = {
  cold: () => wrap(topview()),
  warm: () => wrap(creator()),
  hot: () => wrap(searchGrid()),
  lead: () => wrap(fy({pic: 's-shelf', caption: 'Bạn đã hỏi về hộp quà cuối năm. Ưu đãi 10% còn tới Chủ nhật.', cta: 'Gửi tin nhắn', hot: true})),
  customer: () => wrap(live())
};

/* ------------------------------------------------------------------ *
 * Hero stack and picker art
 * ------------------------------------------------------------------ */
export function heroStack() {
  const [pic, name, price] = product(5);
  const feed = `<div class="tth-fy"><i class="photo dark">${shot('s-tall')}</i>`
    + '<span class="tth-tabs"><em>Đang follow</em><b>Dành cho bạn</b></span>'
    + `<span class="tth-rail">${icon('heart')}${G.comment}${G.share}<i class="tth-disc">${shot('s6')}</i></span>`
    + `<span class="tth-meta"><b>${BRAND}</b><em>Được tài trợ</em></span><span class="tth-cta">Mua ngay</span></div>`;
  const lv = `<div class="tth-live"><i class="photo dark">${shot('s-shelf')}</i><span class="tth-lb">LIVE</span>`
    + `<span class="tth-eye">${icon('eye')}1,2 N</span><span class="tth-bag">${G.bag}</span></div>`;
  const search = `<div class="tth-search"><span class="tth-q">${icon('search')}nến thơm</span>`
    + `<span class="tth-g"><i class="photo">${shot('s-desk')}</i><i class="photo is-ad">${shot('s6')}<b>Được tài trợ</b></i></span></div>`;
  const card = `<div class="tth-card"><i class="photo">${shot(pic)}</i><b>${esc(name)}</b><em>${price}</em><span>Mua ngay</span></div>`;

  return '<div class="hero-stage" aria-hidden="true"><div class="stack" id="heroStack">'
    + `<div class="card3d c-serp ttc-fy">${feed}<span class="c-tag">Dành cho bạn</span></div>`
    + `<div class="card3d c-shop ttc-live">${lv}<span class="c-tag">LIVE</span></div>`
    + `<div class="card3d c-yt ttc-search">${search}<span class="c-tag">Tìm kiếm</span></div>`
    + `<div class="card3d c-map ttc-card">${card}<span class="c-tag">Thẻ sản phẩm</span></div>`
    + `<div class="card3d c-logo"><span class="c-tap">${icon('tap')}</span></div>`
    + '</div></div>';
}

const PICK_ART = {
  infeed: () => '<div class="pa-ttfy">'
    + ['s-desk', 's-tall', 's6'].map((p, i) => `<span class="pa-tts" style="--i:${i}"><i class="photo dark">${shot(p)}</i>`
      + (i === 1 ? '<em>Được tài trợ</em><b>Mua ngay</b>' : '') + '</span>').join('')
    + '</div>',
  spark: () => '<div class="pa-ttspark">'
    + `<span class="pa-tts is-one"><i class="photo dark">${shot('s3')}</i><em>Mai Linh · Follow</em></span>`
    + `<span class="pa-ttlikes">${icon('heart')}<b>48,2 N</b></span></div>`,
  lead: () => '<div class="pa-ttform"><b>Nhận báo giá</b>'
    + ['Nguyễn Lan', '09•• ••• 218'].map((v, i) => `<span style="--i:${i}"><i>${v}</i>${icon('check')}</span>`).join('')
    + '<span class="is-chat" style="--i:2"><i>Giá bao nhiêu?</i></span><em>Gửi</em></div>',
  shop: () => {
    const [p, name, price] = product(5);
    return `<div class="pa-ttshop"><span class="pa-tts is-one"><i class="photo dark">${shot('s-shelf')}</i><em>LIVE</em></span>`
      + `<span class="pa-ttcard"><i class="photo">${shot(p)}</i><b>${esc(name)}</b><em>${price}</em></span></div>`;
  },
  search: () => '<div class="pa-ttsearch">'
    + `<span class="pa-ttq">${icon('search')}nến thơm</span><span class="pa-ttg">`
    + ['s-desk', 's6', 's1', 's3'].map((p, i) => `<i class="photo${i === 1 ? ' is-ad' : ''}" style="--i:${i}">${shot(p)}`
      + (i === 1 ? '<b>Được tài trợ</b>' : '') + '</i>').join('')
    + '</span></div>',
  brand: () => `<div class="pa-ttbrand"><span class="pa-tts is-one"><i class="photo dark">${shot('s-tall')}</i><b class="pa-ttcd">3</b>`
    + '<em>Mở ứng dụng</em></span></div>'
};

export function pickArtTt(id) {
  const r = PICK_ART[id];
  return r ? `<span class="pa pa-tt-${id}" aria-hidden="true">${r()}</span>` : '';
}
