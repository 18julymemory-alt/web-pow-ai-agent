// Scenes for the Google Ads landing pages.
//
// 1. The chapter frame of page 01 (sticky index, big chapter number, the
//    list | text | light stage workbench) so pages 02 and 03 read the same.
// 2. Phone screens that look like the real thing: a shop website with the
//    floating call / chat bubbles Vietnamese sites use, the call screen, a
//    Zalo-style and a Messenger-style chat, the contact form.
// 3. One picture per idea on pages 02 and 03: audience signals, readiness
//    stages, bidding settings, the invoice, the event stream.
//
// Same rules as visuals.mjs / mocks.mjs: no platform logos or wordmarks, one
// sample shop (Nhà Thơm · nhathom.example), pictures in fixed-ratio frames.

import {esc, icon, shot, SHOP, PRODUCTS, more, barChart, targetDots, lineChart} from './visuals.mjs';
import {handset, win, BRAND, mkImg, mkFav, mkQuery, mkTextAd} from './mocks.mjs';

const pad2 = n => String(n).padStart(2, '0');

/* ================================================================== *
 * 1. Chapter frame (same markup and classes as page 01)
 * ================================================================== */
export function chapterHead(num, eyebrow, title, lead = '') {
  return '<div class="chap-head has-num">'
    + `<span class="chap-num">${pad2(num)}</span>`
    + `<div class="chap-title"><span class="kicker">${esc(eyebrow)}</span><h3>${title}</h3>`
    + (lead ? `<p class="lead">${esc(lead)}</p>` : '') + '</div></div>';
}

export function chapter({id, num, eyebrow, title, lead, body}) {
  return `<section class="chap rv" id="${id}">${chapterHead(num, eyebrow, title, lead)}${body}</section>`;
}

export function toc(items, label) {
  return `<nav class="panel-toc" aria-label="${esc(label)}">`
    + items.map(([id, text], i) => `<a href="#${id}">${pad2(i + 1)} ${esc(text)}</a>`).join('')
    + '</nav>';
}

// Two facts up front, the rest behind "Đọc tiếp".
export function facts(list, {visible = 2} = {}) {
  const row = ([dt, dd]) => `<div><dt>${esc(dt)}</dt><dd>${esc(dd)}</dd></div>`;
  const shown = list.slice(0, visible);
  const rest = list.slice(visible);
  return `<dl class="wb-facts">${shown.map(row).join('')}</dl>`
    + (rest.length ? more(`<dl class="wb-facts">${rest.map(row).join('')}</dl>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '');
}

// The page-01 workbench. items: [{key, label, icon?, group?, dot?, body, stage, cap?}]
// A new `group` value starts a small heading in the list.
export function workbench(items, {cls = '', tag = 'MÔ PHỎNG', cap = ''} = {}) {
  let group = null;
  const list = items.map((it, i) => {
    let head = '';
    if (it.group && it.group !== group) {
      group = it.group;
      head = `<span class="wb-group"${it.groupColor ? ` style="--g:${it.groupColor}"` : ''}>${esc(it.group)}</span>`;
    }
    return head + `<button type="button" data-format="${it.key}" aria-pressed="${i === 0}"`
      + `${it.groupColor ? ` style="--g:${it.groupColor}"` : ''}>`
      + (it.icon ? `<span class="wb-ico" aria-hidden="true">${icon(it.icon)}</span>` : '')
      + `<span>${esc(it.label)}</span>${it.dot || ''}</button>`;
  }).join('');

  const panes = items.map((it, i) => `<div class="wb-pane" data-format-pane="${it.key}"${i ? ' hidden' : ''}>`
    + `<div class="wb-body">${it.body}</div>`
    + `<div class="stage"><span class="demo-tag">${esc(it.tag || tag)}</span>`
    + `<div class="device">${it.stage}</div>`
    + ((it.cap || cap) ? `<p class="stage-cap">${esc(it.cap || cap)}</p>` : '')
    + '</div></div>').join('');

  return `<div class="workbench rv${cls ? ' ' + cls : ''}"><div class="wb-list">${list}</div><div class="wb-panes">${panes}</div></div>`;
}

// A short note with an icon: one sentence visible, the rest in a drawer.
export function note({label, text, ic = 'alert', tone = '', extra = ''}) {
  const parts = String(text).split(/(?<=\.)\s+/);
  const first = parts.shift();
  const rest = parts.join(' ');
  return `<div class="key-pt sc-note${tone ? ' is-' + tone : ''} rv"><span class="key-pt-ico">${icon(ic)}</span>`
    + `<div><small>${esc(label)}</small><p>${esc(first)}</p>`
    + ((rest || extra) ? more(`${rest ? `<p>${esc(rest)}</p>` : ''}${extra}`, {label: 'Đọc tiếp'}) : '')
    + '</div></div>';
}

/* ================================================================== *
 * 2. Phone screens
 * ================================================================== */
const av = (text, cls = '') => `<i class="sc-av${cls ? ' ' + cls : ''}" aria-hidden="true">${esc(text)}</i>`;

// The shop's product page on a phone, as Vietnamese shop sites look: address
// bar, header, photo, price, an in-page button, and the floating call / Zalo /
// Messenger bubbles in the bottom-right corner.
// `inline` and `fabs` are trusted HTML (tab buttons on page 01, spans elsewhere).
export function siteScreen({inline = '', fabs = '', title = 'Nến thơm nắp gỗ 200g', cls = ''} = {}) {
  return handset('<div class="sc-site">'
    + `<div class="sc-addr">${icon('lock')}<span>${SHOP}/nen-thom-nap-go</span></div>`
    + `<div class="sc-nav">${mkFav()}<b>${BRAND}</b>${icon('cart')}${icon('menu')}</div>`
    + `<div class="sc-hero">${mkImg('s6', 'r43')}<span class="sc-badge">Giao 2 giờ</span></div>`
    + `<b class="sc-h">${esc(title)}</b>`
    + '<div class="sc-price"><b>320.000₫</b><s>390.000₫</s><span>-18%</span></div>'
    + '<p class="sc-p">Sáp đậu nành, bấc gỗ, đốt đến 40 giờ. Đổi trả trong 7 ngày.</p>'
    + (inline ? `<div class="sc-inline">${inline}</div>` : '')
    + (fabs ? `<div class="sc-fabs">${fabs}</div>` : '')
    + '</div>', {cls: 'sc-phone is-site' + (cls ? ' ' + cls : '')});
}

// Static floating bubbles (pages 02/03). `hot` marks the one being tapped.
export const FAB_KINDS = {
  call: {icon: 'phone', label: 'Gọi ngay'},
  zalo: {icon: 'chat', label: 'Chat Zalo'},
  messenger: {icon: 'chat', label: 'Messenger'}
};

// What sits in the bubble: an icon, or for Zalo the word itself in white on
// Zalo blue, as shop sites show it (plain text, not the platform's logo).
export const fabGlyph = kind => kind === 'zalo' ? '<b class="sc-zalo-w">Zalo</b>' : icon(FAB_KINDS[kind].icon);

export function staticFabs(hot = '') {
  return Object.entries(FAB_KINDS).map(([kind, f]) => `<span class="sc-fab is-${kind}${kind === hot ? ' is-hot' : ''}">`
    + `<span class="sc-fab-l">${f.label}</span><i>${fabGlyph(kind)}</i>`
    + (kind === hot ? `<span class="sc-tap" aria-hidden="true">${icon('tap')}</span>` : '')
    + '</span>').join('');
}

export function callScreen({time = 'Đang gọi…'} = {}) {
  const keys = [['micoff', 'Tắt tiếng'], ['keypad', 'Bàn phím'], ['speaker', 'Loa'],
    ['plus', 'Thêm'], ['video', 'Gọi video'], ['person', 'Danh bạ']];
  return handset('<div class="sc-call">'
    + '<div class="sc-call-top">'
    + av('NT', 'is-lg')
    + `<b>${BRAND} · Hotline</b><span>1900 •••• 18</span><small class="sc-timer">${esc(time)}</small></div>`
    + '<div class="sc-call-grid">' + keys.map(([ic, t]) => `<span><i>${icon(ic)}</i><em>${t}</em></span>`).join('') + '</div>'
    + `<span class="sc-call-end" aria-hidden="true">${icon('phone')}</span>`
    + '</div>', {dark: true, cls: 'sc-phone is-call'});
}

// The chat thread shared by the Zalo-style and Messenger-style screens.
const THREAD = [
  ['shop', 'Nhà Thơm xin chào! Bạn cần tư vấn mùi hương hay quà tặng ạ?'],
  ['me', 'Mình cần 20 hộp nến làm quà tặng cuối năm'],
  ['shop', 'Dạ, Nhà Thơm gửi bạn bảng giá sỉ và mẫu hộp ngay nhé.']
];
const QUICK = ['Xem bảng giá', 'Quà tặng doanh nghiệp', 'Địa chỉ cửa hàng'];

function bubbles(thread, {time = '09:42'} = {}) {
  return thread.map(([who, text], i) => `<div class="sc-msg is-${who}" style="--i:${i}">`
    + (who === 'shop' && (i === 0 || thread[i - 1][0] !== 'shop') ? av('NT', 'is-sm') : '')
    + `<p>${esc(text)}</p>`
    + (who === 'me' ? `<small>${time} · Đã xem</small>` : '')
    + '</div>').join('');
}

// Zalo-style: blue bar, official-account line, date divider, quick replies.
// head is trusted HTML placed before the first message (the Zalo Ads pages
// put a picture there); cls is added to the phone.
export function zaloScreen({thread = THREAD, quick = QUICK, sub = 'Tài khoản chính thức · Vừa truy cập', head = '', cls = ''} = {}) {
  return handset('<div class="sc-chat is-zalo">'
    + `<div class="sc-chat-top">${icon('back')}${av('NT')}`
    + `<span class="sc-who"><b>${BRAND} ${icon('verified', 'sc-ok')}</b><small>${esc(sub)}</small></span>`
    + `<span class="sc-acts">${icon('phone')}${icon('video')}${icon('menu')}</span></div>`
    + '<div class="sc-chat-body"><span class="sc-day">Hôm nay</span>'
    + head
    + bubbles(thread.slice(0, 1))
    + (quick.length ? `<div class="sc-quick">${quick.map(q => `<span>${esc(q)}</span>`).join('')}</div>` : '')
    + bubbles(thread.slice(1))
    + '<span class="sc-typing" aria-hidden="true"><i></i><i></i><i></i></span></div>'
    + `<div class="sc-chat-in">${icon('smile')}<span>Tin nhắn</span>${icon('image')}${icon('mic')}</div>`
    + '</div>', {cls: 'sc-phone is-zalo' + (cls ? ' ' + cls : '')});
}

// Messenger-style: white bar, page intro card, gradient own bubbles.
// The Facebook pages pass their own thread, suggested questions and sub line;
// intro is trusted HTML.
export function messengerScreen({thread = THREAD, quick = QUICK.slice(0, 2), sub = 'Thường trả lời trong vài phút',
  intro = 'Nến & tinh dầu thiên nhiên · 12 N người thích', quickFirst = false, cls = ''} = {}) {
  const chips = quick.length ? `<div class="sc-quick is-pill">${quick.map(q => `<span>${esc(q)}</span>`).join('')}</div>` : '';
  return handset('<div class="sc-chat is-msg">'
    + `<div class="sc-chat-top">${icon('back')}${av('NT')}`
    + `<span class="sc-who"><b>${BRAND}</b><small>${esc(sub)}</small></span>`
    + `<span class="sc-acts">${icon('phone')}${icon('video')}</span></div>`
    + '<div class="sc-chat-body">'
    + `<div class="sc-intro">${av('NT', 'is-lg')}<b>${BRAND}</b><small>${intro}</small></div>`
    + (quickFirst ? bubbles(thread.slice(0, 1)) + chips + bubbles(thread.slice(1)) : bubbles(thread) + chips)
    + '</div>'
    + `<div class="sc-chat-in">${icon('plus')}${icon('camera')}${icon('image')}<span>Aa</span>${icon('like')}</div>`
    + '</div>', {cls: 'sc-phone is-msg' + (cls ? ' ' + cls : '')});
}

export function formScreen({done = true} = {}) {
  return handset('<div class="sc-form">'
    + `<div class="sc-addr">${icon('lock')}<span>${SHOP}/nhan-tu-van</span></div>`
    + `<div class="sc-nav">${mkFav()}<b>${BRAND}</b>${icon('menu')}</div>`
    + '<b class="sc-h">Nhận tư vấn chọn quà</b>'
    + '<p class="sc-p">Để lại thông tin, Nhà Thơm gọi lại trong 15 phút.</p>'
    + '<label class="sc-f"><small>Họ tên</small><span>Nguyễn Lan</span></label>'
    + '<label class="sc-f"><small>Số điện thoại</small><span>09•• ••• 218</span></label>'
    + '<label class="sc-f"><small>Nhu cầu</small><span>20 hộp quà tặng cuối năm</span></label>'
    + '<span class="sc-submit">Gửi yêu cầu</span>'
    + (done ? `<span class="sc-toast">${icon('check')}Đã gửi. Nhà Thơm sẽ gọi lại cho bạn.</span>` : '')
    + '</div>', {cls: 'sc-phone is-form'});
}

// The service / product detail page (view_service).
export function serviceScreen() {
  return handset('<div class="sc-site">'
    + `<div class="sc-addr">${icon('lock')}<span>${SHOP}/qua-tang-doanh-nghiep</span></div>`
    + `<div class="sc-nav">${mkFav()}<b>${BRAND}</b>${icon('cart')}${icon('menu')}</div>`
    + `<div class="sc-hero">${mkImg('s-desk', 'r43')}</div>`
    + '<b class="sc-h">Quà tặng doanh nghiệp</b>'
    + '<ul class="sc-ticks"><li>Hộp 3 nến, in logo theo yêu cầu</li><li>Từ 20 hộp, giao toàn quốc</li><li>Báo giá trong 2 giờ</li></ul>'
    + '<span class="sc-submit is-line">Xem bảng giá</span>'
    + '</div>', {cls: 'sc-phone is-site'});
}

/* ================================================================== *
 * 3a. Page 02 — readiness stages: what a person at each stage sees
 * ================================================================== */
export function priceSearch() {
  return handset(mkQuery('nến thơm quà tặng giá bao nhiêu', {tabs: false})
    + mkTextAd({
      title: 'Nến thơm quà tặng từ 320.000₫ — Báo giá sỉ trong 2 giờ',
      path: 'qua-tang',
      desc: 'Hộp 3 nến sáp đậu nành, in logo theo yêu cầu. Giao toàn quốc.',
      links: ['Bảng giá sỉ', 'Mẫu hộp quà', 'Liên hệ']
    })
    + '<div class="mk-org"><div class="mk-site">' + mkFav('G', 'is-alt')
    + '<span><b>Góc Sống Xanh</b><em>gocsongxanh.example › qua-tang</em></span></div>'
    + '<span class="mk-title">Nên tặng nến thơm hay tinh dầu?</span></div>');
}

export function reminderScreen() {
  return zaloScreen({
    thread: [
      ['shop', 'Nhà Thơm đã nhận yêu cầu của bạn. Lịch tư vấn: 10:00 thứ Bảy, 28/9.'],
      ['me', 'Mình cần chuẩn bị gì trước không?'],
      ['shop', 'Bạn gửi giúp số lượng và logo để in lên hộp nhé.']
    ],
    quick: ['Đổi lịch', 'Gửi logo'],
    sub: 'Tài khoản chính thức · Đang hoạt động'
  });
}

export function mailScreen() {
  const rel = [PRODUCTS[0], PRODUCTS[2]];
  return win('thu › hop-thu-den › don-hang', '<div class="sc-mail">'
    + `<div class="sc-mail-h">${av('NT')}<span><b>${BRAND}</b><small>gửi bạn · 09:15</small></span></div>`
    + '<b class="sc-h">Cách đốt nến lần đầu để nến cháy đều</b>'
    + `<div class="sc-mail-hero">${mkImg('s6', 'r191')}</div>`
    + '<ol class="sc-steps"><li>Đốt lần đầu 2 giờ cho sáp chảy đều mặt</li><li>Cắt bấc còn 5 mm trước mỗi lần đốt</li></ol>'
    + '<small class="sc-mail-sub">Có thể bạn cũng thích</small>'
    + '<div class="sc-mail-rel">' + rel.map(([pic, name, price]) => `<span>${mkImg(pic, 'r11')}<b>${esc(name)}</b><em>${price}</em></span>`).join('') + '</div>'
    + '</div>');
}

/* ================================================================== *
 * 3b. Page 02 — audience signals, one picture each
 * ================================================================== */
const people = (n, {on = n, cls = ''} = {}) => `<span class="sg-people${cls ? ' ' + cls : ''}">`
  + Array.from({length: n}, (_, i) => `<i class="${i < on ? 'is-on' : ''}" style="--i:${i}">${icon('person')}</i>`).join('')
  + '</span>';

const card = (inner, cls = '') => `<div class="sg${cls ? ' ' + cls : ''}" data-anim>${inner}</div>`;
const arrow = label => `<span class="sg-arrow"><i>${icon('arrow')}</i>${label ? `<small>${esc(label)}</small>` : ''}</span>`;

export const SIGNALS = {
  intent: () => card('<div class="sg-col">'
    + `<div class="sg-search">${icon('search')}<span class="sg-type" style="--n:16">thiết kế website</span></div>`
    + '<div class="sg-ad"><b class="mk-spons">Được tài trợ</b><span class="mk-title">Thiết kế website doanh nghiệp — Báo giá trong ngày</span><em>studio.example › thiet-ke-website</em></div>'
    + '</div>' + arrow('Khớp điều họ đang tìm') + people(3), 'is-intent'),

  market: () => card('<div class="sg-compare">'
    + [0, 5].map((p, i) => {
      const [pic, name, price] = PRODUCTS[p];
      return `<div class="sg-prod${i ? ' is-pick' : ''}">${mkImg(pic, 'r11')}<b>${esc(name)}</b><em>${price}</em>`
        + `<span>${i ? '4,8 ★ · 1,2 N đánh giá' : '4,6 ★ · 640 đánh giá'}</span></div>`;
    }).join('')
    + '<span class="sg-vs">so sánh</span></div>'
    + arrow('Đang xem xét mua') + people(3, {on: 2}), 'is-market'),

  affinity: () => card('<div class="sg-orbit">'
    + `<span class="sg-core">${icon('person')}</span>`
    + ['Trang trí nhà', 'Spa tại gia', 'Yoga', 'Du lịch', 'Làm đẹp']
      .map((t, i) => `<span class="sg-bub" style="--i:${i}">${esc(t)}</span>`).join('')
    + '</div><p class="sg-cap">Mối quan tâm lâu dài, không phải nhu cầu mua ngay.</p>', 'is-affinity'),

  custom: () => card('<div class="sg-col is-chips">'
    + ['nến thơm handmade', 'tinh dầu thiên nhiên', 'gocsongxanh.example', 'ứng dụng thiền']
      .map((t, i) => `<span class="sg-chip" style="--i:${i}">${icon(i < 2 ? 'search' : i === 2 ? 'globe' : 'mobile')}${esc(t)}</span>`).join('')
    + '</div>' + arrow('Google tìm người tương tự') + people(6, {on: 4, cls: 'is-grid'}), 'is-custom'),

  demo: () => card('<div class="sg-demo">'
    + '<small>Độ tuổi</small><div class="sg-ages">'
    + [['18–24', 0], ['25–34', 1], ['35–44', 1], ['45–54', 1], ['55–64', 0], ['65+', 0], ['Không xác định', 2]]
      .map(([t, s]) => `<span class="${s === 1 ? 'is-on' : s === 2 ? 'is-unk' : ''}">${s ? icon(s === 1 ? 'check' : 'alert') : ''}${t}</span>`).join('')
    + '</div><small>Giới tính</small><div class="sg-ages">'
    + [['Nữ', 1], ['Nam', 1], ['Không xác định', 2]]
      .map(([t, s]) => `<span class="${s === 1 ? 'is-on' : 'is-unk'}">${icon(s === 1 ? 'check' : 'alert')}${t}</span>`).join('')
    + '</div><p class="sg-cap">Nhóm “Không xác định” vẫn có thể là khách tốt — xem kết quả trước khi loại.</p></div>', 'is-demo'),

  customer: () => card('<div class="sg-sheet">'
    + '<div class="sg-sheet-h"><span>Email</span><span>Điện thoại</span></div>'
    + [['lan•••@gmail.com', '09•• ••• 218'], ['minh•••@yahoo.com', '08•• ••• 540'], ['ha•••@gmail.com', '03•• ••• 771']]
      .map(([e, p]) => `<div><span>${e}</span><span>${p}</span></div>`).join('')
    + '</div>'
    + `<span class="sg-lock"><i>${icon('lock')}</i><small>Mã hóa trước khi tải lên</small></span>`
    + '<span class="sg-match">' + [1, 1, 0].map((m, i) => `<i class="${m ? 'is-on' : ''}" style="--i:${i}">${icon(m ? 'check' : 'minus')}</i>`).join('')
    + '<small>2/3 người khớp</small></span>', 'is-customer'),

  visitor: () => card('<div class="sg-trail">'
    + [['Trang chủ', 'page'], ['Nến thơm', 'eye'], ['Giỏ hàng', 'cart']]
      .map(([t, ic], i) => `<span class="sg-step" style="--i:${i}"><i>${icon(ic)}</i><b>${t}</b></span>`).join('')
    + '</div>'
    + `<span class="sg-tagout">${icon('users')}Nhóm: đã thêm vào giỏ, chưa mua</span>`, 'is-visitor'),

  viewer: () => card('<div class="sg-vids">'
    + [['Cách chọn mùi nến cho phòng ngủ', 100], ['Mở hộp quà tặng Nhà Thơm', 65], ['Tinh dầu cho người mới', 20]]
      .map(([t, p], i) => `<div class="sg-vid" style="--i:${i}"><span class="sg-thumb">${shot(['s-hero', 's-desk', 's1'][i])}<i>${icon('play')}</i></span>`
        + `<span><b>${esc(t)}</b><span class="sg-prog"><i style="width:${p}%"></i></span><small>Đã xem ${p}%</small></span></div>`).join('')
    + '</div>'
    + `<span class="sg-tagout">${icon('users')}Nhóm: xem hết video mở hộp</span>`, 'is-viewer'),

  remarketing: () => card('<div class="sg-loop">'
    + `<span class="sg-node" style="--i:0"><i>${icon('cart')}</i><b>Xem nến trên website</b></span>`
    + `<span class="sg-node" style="--i:1"><i>${icon('close')}</i><b>Rời đi chưa mua</b></span>`
    + '<span class="sg-node is-ad" style="--i:2"><span class="sg-ban">'
    + `<span class="mk-adlabel">Quảng cáo</span>${mkImg('s6', 'r11')}<b>Nến bạn đã xem vẫn còn hàng</b></span></span>`
    + `<span class="sg-node" style="--i:3"><i>${icon('repeat')}</i><b>Quay lại mua</b></span>`
    + '</div>', 'is-remarketing')
};

/* ================================================================== *
 * 3c. Page 03 — money
 * ================================================================== */
const INVOICE = {
  url: 'quang-cao › thanh-toan › chung-tu',
  head: ['Chứng từ thanh toán · Tháng 9', 'Tài khoản quảng cáo của Nhà Thơm'],
  rows: [
    ['Chi phí quảng cáo', '9.000.000₫', 'Số tiền trả cho lượt hiển thị và lượt nhấp'],
    ['Thuế / phí', 'Theo chứng từ', 'Phụ thuộc hồ sơ thanh toán và pháp nhân'],
    ['Bên xuất hóa đơn', 'Nền tảng quảng cáo', 'Phí dịch vụ POWAI xuất hóa đơn riêng']
  ],
  foot: ['Ảnh, video, trang đích', 'Không nằm trong chứng từ này']
};

export function invoiceScreen(hi = 0, doc = INVOICE) {
  const {url, head, rows, foot} = {...INVOICE, ...doc};
  const row = (i, label, value, sub = '') => `<div class="sc-inv-row${i === hi ? ' is-hi' : ''}">`
    + `<span><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ''}</span><em>${esc(value)}</em></div>`;
  return win(url, '<div class="sc-inv">'
    + `<div class="sc-inv-h">${icon('receipt')}<span><b>${esc(head[0])}</b><small>${esc(head[1])}</small></span></div>`
    + rows.map(([label, value, sub], i) => row(i, label, value, sub)).join('')
    + `<div class="sc-inv-foot"><span>${esc(foot[0])}</span><em>${esc(foot[1])}</em></div>`
    + '</div>');
}

/* ================================================================== *
 * 3d. Page 03 — bidding: the settings screen + a small picture of the example
 * ================================================================== */
const BID_ORDER = ['clicks', 'conversions', 'cpa', 'value', 'roas', 'manual'];

function bidExample(id) {
  if (id === 'clicks') {
    return `<div class="sc-ex">${barChart([320, 410, 380, 460], {labels: ['Nguồn A', 'Nguồn B', 'Nguồn C', 'Nguồn D'], highlight: 3})}`
      + '<p><b>Cùng số lượt nhấp</b>, số người hỏi mua vẫn có thể rất khác nhau.</p></div>';
  }
  if (id === 'conversions') {
    return `<div class="sc-ex">${barChart([3, 5, 4, 7, 6, 8, 9], {labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], highlight: 6})}`
      + '<p>Đếm <b>yêu cầu tư vấn gửi thành công</b>, không đếm người chỉ xem trang.</p></div>';
  }
  if (id === 'cpa') {
    return `<div class="sc-ex">${targetDots({values: [178, 236, 205, 160, 224, 191, 214, 183, 229, 199], target: 200})}`
      + '<p class="sc-ex-leg"><i class="is-line"></i>Mục tiêu 200.000₫ — từng yêu cầu cao thấp khác nhau quanh mức bình quân.</p></div>';
  }
  if (id === 'value') {
    return '<div class="sc-ex sc-orders">'
      + '<div><span class="sc-ord">500.000₫</span><span class="sc-ord">500.000₫</span><small>2 đơn · 1.000.000₫</small></div>'
      + '<b>vs</b>'
      + '<div><span class="sc-ord is-big">2.000.000₫</span><small>1 đơn · 2.000.000₫</small></div>'
      + '<p>Tối ưu giá trị chọn tổng tiền, không chọn số đơn.</p></div>';
  }
  if (id === 'roas') {
    return '<div class="sc-ex sc-roas">'
      + `<span class="sc-coin">${icon('coin')}<b>1₫</b><small>chi quảng cáo</small></span>`
      + `<span class="sc-roas-ar">${icon('arrow')}<em>ROAS 400%</em></span>`
      + '<span class="sc-coins">' + '<i></i>'.repeat(4) + '<b>4₫</b><small>giá trị chuyển đổi</small></span>'
      + '<p>10 triệu ₫ chi → 40 triệu ₫ giá trị. Chưa trừ chi phí khác.</p></div>';
  }
  return '<div class="sc-ex sc-cpc">'
    + '<small>CPC tối đa</small><div class="sc-slider"><i style="--v:.42"></i><span>8.000₫</span></div>'
    + '<p>Bạn đặt giá cho <b>một lượt nhấp</b>, không phải cho một yêu cầu tư vấn.</p></div>';
}

// order / example / title let another channel show its own strategy list.
export function bidScreen(id, strategies, {order = BID_ORDER, example = bidExample,
  title = 'Giá thầu · Bạn muốn tập trung vào điều gì?', url = 'quang-cao › chien-dich › gia-thau'} = {}) {
  const opts = order.map(k => {
    const s = strategies[k];
    return `<li class="${k === id ? 'is-on' : ''}"><i class="sc-radio"></i><span>${esc(s[1])}</span></li>`;
  }).join('');
  return '<div class="sc-bid">'
    + win(url, '<div class="sc-bid-set">'
      + `<b class="sc-bid-h">${esc(title)}</b>`
      + `<ul>${opts}</ul></div>`, 'sc-bid-win')
    + example(id)
    + '</div>';
}

/* ================================================================== *
 * 3d'. Page 01 — the neutral "new campaign" screen for chapter 02
 * ================================================================== */
const SETUP_STEPS = ['Mục tiêu', 'Cài đặt', 'Tài sản', 'Giá thầu', 'Xem lại'];

// A settings window with the five-step rail on the left; `step` marks where
// the reader is. body is built from the su* pieces below.
export function setupScreen({step = 0, title = '', body = '', url = 'quang-cao › chien-dich › moi', steps = SETUP_STEPS}) {
  const rail = steps.map((s, i) => `<li class="${i === step ? 'is-now' : i < step ? 'is-done' : ''}">`
    + `<i>${i < step ? icon('check') : i + 1}</i><span>${s}</span></li>`).join('');
  return win(url, '<div class="su">'
    + `<ol class="su-rail">${rail}</ol>`
    + `<div class="su-main">${title ? `<b class="su-h">${esc(title)}</b>` : ''}${body}</div>`
    + '</div>', 'su-win');
}

// A labelled field. off: greyed and struck (not used by this campaign type).
export function suField(label, value, {off = false, chip = '', ic = ''} = {}) {
  return `<div class="su-fld${off ? ' is-off' : ''}"><small>${esc(label)}</small>`
    + `<span>${ic ? icon(ic) : ''}<em>${esc(value)}</em>${chip ? `<span class="v-chip" data-accent="${chip[1]}">${esc(chip[0])}</span>` : ''}</span></div>`;
}

// Radio options. item: [label, state?, note?] where state is 'on' | 'off' | ''.
export function suOpts(items, {group = ''} = {}) {
  return (group ? `<small class="su-grp">${esc(group)}</small>` : '')
    + '<ul class="su-opts">' + items.map(([label, state = '', note = '']) => `<li class="${state ? 'is-' + state : ''}">`
      + `<i class="sc-radio"></i><span>${esc(label)}${note ? `<small>${esc(note)}</small>` : ''}</span></li>`).join('') + '</ul>';
}

// Toggle rows (channels, sources).
export function suToggles(items) {
  return '<ul class="su-tgl">' + items.map(([label, on]) => `<li class="${on ? 'is-on' : ''}"><span>${esc(label)}</span><i></i></li>`).join('') + '</ul>';
}

// Picture tiles: [shot name, ratio class, caption].
export function suThumbs(items) {
  return '<div class="su-thumbs">' + items.map(([name, ratio, cap]) => `<figure><span class="mk-img ${ratio}">${shot(name)}</span>`
    + `<figcaption>${esc(cap)}</figcaption></figure>`).join('') + '</div>';
}

// The order the pieces are set up in, ticked off as a review list.
export function suReview(steps) {
  return '<ol class="su-review">' + steps.map((s, i) => `<li style="--i:${i}">${icon('check')}<span>${esc(s)}</span></li>`).join('') + '</ol>'
    + '<span class="su-go">Xuất bản chiến dịch</span>';
}

/* ================================================================== *
 * 3e. Page 03 — event stream: the phone action + the log line it writes
 * ================================================================== */
export function eventStream(events, active, {confirmed: done = ['qualified_lead', 'sale']} = {}) {
  const lines = events.map(([name, label], i) => {
    const confirmed = done.includes(name);
    return `<li class="${i === active ? 'is-now' : i < active ? 'is-past' : ''}" data-group="${confirmed ? 'confirmed' : 'signal'}">`
      + `<span class="sc-log-t">10:${pad2(2 + i * 3)}</span><code>${esc(name)}</code><span>${esc(label)}</span></li>`;
  }).join('');
  return `<ol class="sc-log">${lines}</ol>`;
}

// sources: where each of the three leads came from (Form / Zalo / Hotline on
// the Google pages; the Facebook pages use their own channels).
export function crmScreen(stage = 'qualified', {sources = ['Form', 'Zalo', 'Hotline']} = {}) {
  const rows = [
    ['Ng*** Lan', sources[0], stage === 'sale' ? ['Đã mua · 1.290.000₫', 'good'] : ['Phù hợp', 'good']],
    ['Tr*** Minh', sources[1], ['Đang tư vấn', 'consider']],
    ['Lê*** Tú', sources[2], ['Sai nhu cầu', 'fix']]
  ];
  return win('crm › khach-hang', '<div class="sc-crm">'
    + `<div class="sc-crm-h">${icon('users')}<b>Danh sách khách</b><small>Nhân viên cập nhật</small></div>`
    + '<table><thead><tr><th>Khách</th><th>Nguồn</th><th>Trạng thái</th></tr></thead><tbody>'
    + rows.map(([n, src, [st, tone]], i) => `<tr${i === 0 ? ' class="is-hi"' : ''}><td>${n}</td><td>${src}</td>`
      + `<td><span class="v-chip" data-accent="${tone}">${st}</span></td></tr>`).join('')
    + '</tbody></table></div>');
}

/* ================================================================== *
 * 3f. Small pictures: the ad account report for the KPI chapter
 * ================================================================== */
export function trendCard(values, label) {
  return `<div class="sc-trend">${lineChart(values, {w: 220, h: 60, area: true})}<small>${esc(label)}</small></div>`;
}

/* ================================================================== *
 * Page 02 — booking page (goal "Đặt lịch")
 * ================================================================== */
export function bookingScreen() {
  const days = [['T5', '26'], ['T6', '27'], ['T7', '28'], ['CN', '29']];
  const slots = ['09:00', '10:00', '14:00', '15:30', '17:00', '19:00'];
  return handset('<div class="sc-form">'
    + `<div class="sc-addr">${icon('lock')}<span>${SHOP}/dat-lich</span></div>`
    + `<div class="sc-nav">${mkFav()}<b>${BRAND}</b>${icon('menu')}</div>`
    + '<b class="sc-h">Đặt lịch tư vấn quà tặng</b>'
    + '<div class="sc-days">' + days.map(([d, n], i) => `<span class="${i === 2 ? 'is-on' : ''}"><small>${d}</small><b>${n}</b></span>`).join('') + '</div>'
    + '<div class="sc-slots">' + slots.map((t, i) => `<span class="${i === 1 ? 'is-on' : i === 4 ? 'is-off' : ''}">${t}</span>`).join('') + '</div>'
    + '<span class="sc-submit">Xác nhận 10:00 · Thứ Bảy 28/9</span>'
    + `<span class="sc-toast">${icon('calendar')}Đã giữ lịch. Tin nhắn xác nhận sẽ gửi tới bạn.</span>`
    + '</div>', {cls: 'sc-phone is-form'});
}
