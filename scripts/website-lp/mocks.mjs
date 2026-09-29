// Mock screens for the Website & Landing Page services (WEBSITE_LP_PLAN.md).
// Same rules as every other mock: no platform logos or wordmarks, sample
// brand Nhà Thơm (nhathom.example), text 11px or larger, pictures cover a
// fixed frame, tilt 4° or less, numbers marked "số mẫu".
//
// Everything new starts with wsm- and is styled in dist/website-lp.css. The
// browser and phone chrome come from the Google Ads kit; a few conversion
// screens are reused from the one-page ads mocks.
import {handset, win, BRAND, mkImg as img, mkFav as fav} from '../google-ads-lp/mocks.mjs';
import {icon, esc, SHOP, PRODUCTS} from '../google-ads-lp/visuals.mjs';
export {checkout, dropoff, splitTest, match, leadDone, crm, form} from '../one-page-lp/mocks.mjs';

export const wrap = (html, cls = '') => `<div class="wsm${cls ? ' ' + cls : ''}" data-mock>${html}</div>`;
// Internal screens (admin, logs, specs) sit on the sample brand's own domain.
const inside = url => url.includes(SHOP) ? url : 'quantri.' + SHOP + ' › ' + url;
export const box = (url, title, ic, body, note = '') => wrap(win(inside(url), '<div class="wsm-win">'
  + (title ? `<b class="wsm-h">${icon(ic)}${esc(title)}</b>` : '') + body
  + (note ? `<p class="wsm-note">${esc(note)}</p>` : '') + '</div>'));
export const phone = (inner, cls = '') => wrap(handset(`<div class="wsm-ph ${cls}">${inner}</div>`, {cls: 'wsm-phone'}));
export const chip = (t, cls = '') => `<span class="wsm-chip${cls ? ' ' + cls : ''}">${esc(t)}</span>`;
const nav = (items = ['Giới thiệu', 'Dịch vụ', 'Dự án', 'Liên hệ'], hot = -1) => `<div class="wsm-nav">${fav()}<b>${BRAND}</b>`
  + `<span class="wsm-menu">${items.map((t, i) => `<i${i === hot ? ' class="is-on"' : ''}>${esc(t)}</i>`).join('')}</span></div>`;

/* ------------------------------------------------------------------ *
 * Structure
 * ------------------------------------------------------------------ */
// Sitemap tree: home, first-level pages, second-level pages.
export function sitemap(hot = 1, tree = [
  ['Giới thiệu', ['Câu chuyện', 'Nhà xưởng']],
  ['Dịch vụ', ['Quà tặng doanh nghiệp', 'Nến theo yêu cầu', 'Phân phối đại lý']],
  ['Dự án', ['Theo ngành']],
  ['Tin tức', []],
  ['Liên hệ', ['Form', 'Bản đồ']]
]) {
  return box(SHOP + '/so-do-trang', 'Sơ đồ trang (mẫu)', 'layers', '<div class="wsm-tree">'
    + `<span class="wsm-node is-root">${icon('page')}Trang chủ</span><div class="wsm-lv">`
    + tree.map(([t, kids], i) => `<div class="wsm-br${i === hot ? ' is-on' : ''}"><span class="wsm-node">${esc(t)}</span>`
      + kids.map(k => `<span class="wsm-leaf">${esc(k)}</span>`).join('') + '</div>').join('')
    + '</div></div>', 'Mỗi trang trả lời một câu hỏi của khách. Sơ đồ chốt trước khi chọn giao diện.');
}

// Company home page in a browser.
export function homePage({hot = -1} = {}) {
  const svc = [['s-desk', 'Quà tặng doanh nghiệp'], ['s6', 'Nến theo yêu cầu'], ['s3', 'Phân phối đại lý']];
  return wrap(win(SHOP, nav(undefined, hot) + '<div class="wsm-hero">'
    + `<div><small>Xưởng nến thủ công từ 2016 (mẫu)</small><b>Quà tặng mùi hương cho doanh nghiệp</b>`
    + `<span class="wsm-btns"><i class="is-pri">Nhận báo giá</i><i>Xem dự án</i></span></div>${img('s-shelf', 'r169')}</div>`
    + `<div class="wsm-cards">${svc.map(([p, t]) => `<span class="wsm-card">${img(p, 'r169')}<b>${esc(t)}</b></span>`).join('')}</div>`
    + '<div class="wsm-trust"><span><b>120+</b>khách doanh nghiệp</span><span><b>48 giờ</b>gửi mẫu thử</span><span><b>3</b>xưởng đối tác</span><em>số mẫu</em></div>'));
}

// Service detail page: what, for whom, proof, form.
export function servicePage() {
  return wrap(win(SHOP + '/dich-vu/qua-tang-doanh-nghiep', nav(undefined, 1)
    + '<div class="wsm-crumb">Trang chủ / Dịch vụ / <b>Quà tặng doanh nghiệp</b></div>'
    + '<div class="wsm-svc"><div><b class="wsm-t">Hộp quà nến in logo cho sự kiện, Tết, tri ân</b>'
    + '<ul class="wsm-list"><li>Đặt từ 50 hộp (mẫu)</li><li>Duyệt mẫu trước khi sản xuất</li><li>Giao theo danh sách địa chỉ</li></ul>'
    + `<div class="wsm-gal">${['s6', 's3', 's1'].map(p => img(p, 'r11')).join('')}</div></div>`
    + `<div class="wsm-mini-form"><b>Nhận báo giá</b>${['Công ty', 'Số lượng', 'Ngày cần'].map(t => `<span>${t}</span>`).join('')}<i>Gửi yêu cầu</i></div></div>`));
}

// Project / case study grid with filter chips.
export function projects() {
  const items = [['s-desk', 'Ngân hàng · Tết', '800 hộp'], ['s3', 'Khách sạn · phòng nghỉ', 'Mùi riêng'], ['s6', 'Sự kiện ra mắt', '300 hộp'], ['s1', 'Spa · quà khách', 'In tên']];
  return wrap(win(SHOP + '/du-an', nav(undefined, 2)
    + `<div class="wsm-filters">${['Tất cả', 'Tài chính', 'Khách sạn', 'Sự kiện'].map((t, i) => chip(t, i ? '' : 'is-on')).join('')}</div>`
    + `<div class="wsm-grid">${items.map(([p, t, s]) => `<span class="wsm-card">${img(p, 'r169')}<b>${esc(t)}</b><em>${esc(s)}</em></span>`).join('')}</div>`
    + '<p class="wsm-note">Dự án mẫu. Chỉ đăng dự án khách đã đồng ý công bố.</p>'));
}

// Phone view: open menu or sticky contact bar.
export function mobileSite(state = 'menu') {
  const menu = state === 'menu';
  return phone(`<div class="wsm-pnav">${fav()}<b>${BRAND}</b>${icon(menu ? 'close' : 'menu')}</div>`
    + (menu ? '<div class="wsm-pmenu">' + ['Giới thiệu', 'Dịch vụ', 'Dự án', 'Tin tức', 'Liên hệ'].map((t, i) => `<span${i === 1 ? ' class="is-on"' : ''}>${t}${icon('arrow')}</span>`).join('')
      + '<i class="wsm-btn">Nhận báo giá</i></div>'
      : img('s-shelf', 'r169') + '<div class="wsm-pbody"><b class="wsm-t">Quà tặng mùi hương cho doanh nghiệp</b><p>Duyệt mẫu trước khi sản xuất, giao theo danh sách.</p></div>'
        + `<div class="wsm-sticky"><span>${icon('phone')}Gọi</span><span>${icon('chat')}Nhắn</span><span class="is-pri">${icon('form')}Báo giá</span></div>`));
}

// Contact form in four states: idle, error, sending, done.
export function contactForm(state = 'error') {
  const f = (label, value, err = '') => `<div class="wsm-f${err ? ' is-err' : ''}"><small>${label}</small><span>${value}</span>${err ? `<em>${err}</em>` : ''}</div>`;
  if (state === 'done') {
    return phone(`<div class="wsm-done"><span class="wsm-ok">${icon('check')}</span><b>Đã nhận yêu cầu</b>`
      + '<p>Mã hồ sơ NT-0925. Nhân viên gọi lại trong giờ làm việc.</p><span class="wsm-ev">Sự kiện: generate_lead</span></div>');
  }
  return phone(`<div class="wsm-pnav">${fav()}<b>Nhận báo giá</b></div><div class="wsm-pbody">`
    + f('Họ và tên', 'Trần Minh')
    + f('Số điện thoại', state === 'error' ? '0900 000 00' : '0900 000 000', state === 'error' ? 'Thiếu một số: kiểm tra lại' : '')
    + f('Số lượng hộp', '120')
    + `<i class="wsm-btn${state === 'sending' ? ' is-busy' : ''}">${state === 'sending' ? 'Đang gửi…' : 'Gửi yêu cầu'}</i>`
    + '<p class="wsm-note">Báo lỗi ngay tại trường, giữ nội dung đã nhập.</p></div>');
}

/* ------------------------------------------------------------------ *
 * Shop
 * ------------------------------------------------------------------ */
export function category() {
  return wrap(win(SHOP + '/nen-thom', nav(['Nến', 'Tinh dầu', 'Quà tặng', 'Giỏ (2)'], 0)
    + '<div class="wsm-shop"><aside class="wsm-side"><b>Lọc</b>'
    + ['Mùi gỗ', 'Mùi hoa', 'Dưới 300k', 'Còn hàng'].map((t, i) => `<span${i === 3 ? ' class="is-on"' : ''}>${icon(i === 3 ? 'check' : 'dot')}${t}</span>`).join('')
    + '</aside><div class="wsm-grid is-3">' + PRODUCTS.map(([p, n, pr], i) => `<span class="wsm-prod">${img(p, 'r11')}<b>${esc(n)}</b><em>${pr}</em>`
      + (i === 1 ? '<i class="wsm-flag">Hết hàng</i>' : '') + '</span>').join('') + '</div></div>'));
}

export function product() {
  const [p, n, pr] = PRODUCTS[5];
  return wrap(win(SHOP + '/nen-thom-nap-go', nav(['Nến', 'Tinh dầu', 'Quà tặng', 'Giỏ (2)'], 0)
    + `<div class="wsm-pdp"><div class="wsm-pics">${img(p, 'r11')}<span>${['s3', 's1', 's-shelf'].map(x => img(x, 'r11')).join('')}</span></div>`
    + `<div class="wsm-buy"><b class="wsm-t">${esc(n)}</b><strong>${pr}</strong>`
    + `<small>Khối lượng</small><span class="wsm-opts">${chip('100g')}${chip('200g', 'is-on')}${chip('400g', 'is-off')}</span>`
    + `<small>Mùi</small><span class="wsm-opts">${chip('Gỗ tuyết tùng', 'is-on')}${chip('Oải hương')}</span>`
    + `<span class="wsm-stock">${icon('check')}Còn 14 sản phẩm</span>`
    + '<span class="wsm-qty"><i>−</i><b>1</b><i>+</i></span><i class="wsm-btn">Thêm vào giỏ</i>'
    + `<span class="wsm-ship">${icon('box')}Giao 2 giờ nội thành · đổi trả 7 ngày</span></div></div>`));
}

export function orders(hot = 1) {
  const rows = [['#1042', 'Chị Lan', '640.000₫', ['Đã thanh toán', 'ok'], ['Đang đóng gói', '']],
    ['#1041', 'Anh Hùng', '320.000₫', ['Thanh toán lỗi', 'bad'], ['Chưa xử lý', 'warn']],
    ['#1040', 'Chị Mai', '1.180.000₫', ['COD', ''], ['Đã giao', 'ok']],
    ['#1039', 'Anh Nam', '285.000₫', ['Đã hoàn tiền', 'warn'], ['Đã hủy', '']]];
  return box('quan-tri › don-hang', 'Đơn hàng hôm nay (số mẫu)', 'receipt', '<div class="wsm-table">'
    + '<span class="wsm-tr is-head"><i>Mã</i><i>Khách</i><i>Tổng</i><i>Thanh toán</i><i>Giao</i></span>'
    + rows.map(([id, who, sum, pay, ship], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${id}</i><i>${who}</i><i>${sum}</i>`
      + `<i>${chip(pay[0], 'is-' + (pay[1] || 'n'))}</i><i>${chip(ship[0], 'is-' + (ship[1] || 'n'))}</i></span>`).join('')
    + '</div>', 'Đơn thanh toán lỗi phải hiện rõ để gọi lại khách, không lẫn với đơn thành công.');
}

// Payment failed: say whether money left the account and what to do next.
export function payFail() {
  const [p, n, pr] = PRODUCTS[5];
  return phone(`<div class="wsm-pnav">${icon('back')}<b>Thanh toán</b></div><div class="wsm-pbody">`
    + `<div class="wsm-line">${img(p, 'r11')}<span><b>${esc(n)}</b><em>${pr} · đơn #1041</em></span></div>`
    + `<div class="wsm-alert">${icon('alert')}<span><b>Thanh toán chưa thành công</b><em>Tài khoản của bạn chưa bị trừ tiền. Giỏ hàng vẫn được giữ.</em></span></div>`
    + '<i class="wsm-btn">Thử lại thanh toán</i><i class="wsm-btn is-ghost">Chuyển sang nhận hàng trả tiền</i>'
    + '<p class="wsm-note">Không tạo đơn mới khi khách bấm thử lại: dùng lại mã đơn #1041.</p></div>');
}

/* ------------------------------------------------------------------ *
 * Landing page
 * ------------------------------------------------------------------ */
// Anatomy of a campaign landing page: numbered sections beside a phone.
export function lpAnatomy(hot = 0) {
  const parts = [['Tiêu đề khớp quảng cáo', 'Hộp quà 3 nến, giao 2 giờ'], ['Lợi ích để quyết định', 'Sáp đậu nành · in thiệp tên'],
    ['Bằng chứng', 'Ảnh thật, đánh giá, chính sách'], ['Một form', '3 trường + câu phân loại'], ['Câu hỏi hay gặp', 'Phí giao, đổi trả']];
  return wrap('<div class="wsm-anat">' + handset('<div class="wsm-ph">'
    + `<div class="wsm-pnav">${fav()}<b>${BRAND}</b></div>`
    + `<div class="wsm-sec${hot === 0 ? ' is-on' : ''}">${img('s6', 'r169')}<b class="wsm-t">Hộp quà 3 nến · giao 2 giờ</b></div>`
    + `<div class="wsm-sec${hot === 1 ? ' is-on' : ''}"><span class="wsm-ticks">${['Sáp đậu nành', 'In thiệp tên', 'Đốt 40 giờ'].map(t => `<i>${icon('check')}${t}</i>`).join('')}</span></div>`
    + `<div class="wsm-sec${hot === 2 ? ' is-on' : ''}"><span class="wsm-stars">${icon('star')}4,8 · 1.200 đánh giá (mẫu)</span></div>`
    + `<div class="wsm-sec${hot === 3 ? ' is-on' : ''}"><span class="wsm-f"><small>Số điện thoại</small><span>0900 000 000</span></span><i class="wsm-btn">Nhận báo giá</i></div>`
    + '</div>', {cls: 'wsm-phone'})
    + `<ol class="wsm-parts">${parts.map(([t, d], i) => `<li${i === hot ? ' class="is-on"' : ''}><i>${i + 1}</i><span><b>${t}</b><em>${d}</em></span></li>`).join('')}</ol></div>`);
}

// One message per campaign: two ads, two matching landing pages.
export function lpVariants() {
  const v = [['Quảng cáo Tết', 'Hộp quà Tết in logo', 's-desk', 'Báo giá trong ngày'], ['Quảng cáo sinh nhật', 'Nến khắc tên tặng sinh nhật', 's1', 'Giao 2 giờ']];
  return box('chien-dich › trang-dich', 'Mỗi chiến dịch, một trang', 'target', '<div class="wsm-two">'
    + v.map(([ad, h, p, s]) => `<span class="wsm-var"><small>${ad}</small>${img(p, 'r169')}<b>${h}</b><em>${s}</em><i class="wsm-btn">Nhận báo giá</i></span>`).join('')
    + '</div>', 'Cùng khung trang, đổi tiêu đề, ảnh và ưu đãi theo lời hứa của từng quảng cáo.');
}

/* ------------------------------------------------------------------ *
 * CMS
 * ------------------------------------------------------------------ */
const CMS_MENU = [['chart', 'Bảng tin'], ['file', 'Trang'], ['list', 'Bài viết'], ['image', 'Thư viện'], ['layers', 'Giao diện'], ['code', 'Plugin'], ['users', 'Người dùng']];
const cms = (on, body, url = 'quan-tri › trang') => wrap(win(inside(url), `<div class="wsm-cms"><aside>${CMS_MENU
  .map(([ic, t], i) => `<span${i === on ? ' class="is-on"' : ''} title="${t}">${icon(ic)}<em>${t}</em></span>`).join('')}</aside><div class="wsm-cms-main">${body}</div></div>`));

export function editor() {
  return cms(1, '<div class="wsm-bar"><small>BẢN NHÁP · Trang dịch vụ</small><span><i>Xem trước</i><i class="is-pri">Xuất bản</i></span></div>'
    + '<b class="wsm-t">Quà tặng doanh nghiệp</b>'
    + ['Khối tiêu đề + ảnh', 'Khối lợi ích (3 cột)', 'Khối dự án tiêu biểu', 'Khối form liên hệ'].map((t, i) => `<span class="wsm-block${i === 1 ? ' is-on' : ''}">${icon(['image', 'layers', 'star', 'form'][i])}${t}</span>`).join('')
    + '<p class="wsm-note">Khối có sẵn kiểu chữ và màu: người sửa đổi nội dung, không phá bố cục.</p>');
}

export function media() {
  const items = [['s6', 'nen-nap-go.webp', '180 KB', true], ['s3', 'khuech-tan.webp', '164 KB', true], ['s1', 'tinh-dau.jpg', '2,4 MB', false], ['s-shelf', 'ke-trung-bay.webp', '210 KB', true]];
  return cms(3, '<div class="wsm-bar"><small>Thư viện ảnh</small><span><i class="is-pri">Tải lên</i></span></div><div class="wsm-grid is-4">'
    + items.map(([p, n, s, ok]) => `<span class="wsm-med${ok ? '' : ' is-warn'}">${img(p, 'r11')}<b>${n}</b><em>${s}${ok ? '' : ' · cần nén'}</em></span>`).join('')
    + '</div><div class="wsm-f"><small>Văn bản thay thế (alt)</small><span>Nến thơm nắp gỗ 200g trên kệ gỗ</span></div>', 'quan-tri › thu-vien');
}

export function updates(hot = 1) {
  const rows = [['Lõi hệ thống', '6.x → 6.y', 'Đã sao lưu', 'ok'], ['Plugin form', '2.4 → 3.0', 'Đổi lớn · thử trên bản sao', 'warn'],
    ['Plugin SEO', '21.1 → 21.2', 'Bản vá', 'ok'], ['Giao diện con', 'Tùy biến riêng', 'Không cập nhật tự động', 'n']];
  return cms(5, '<div class="wsm-bar"><small>Cập nhật chờ xử lý (mẫu)</small><span><i>Kiểm tra lại</i></span></div>'
    + rows.map(([n, v, s, t], i) => `<span class="wsm-upd${i === hot ? ' is-hi' : ''}"><b>${n}</b><em>${v}</em>${chip(s, 'is-' + t)}</span>`).join('')
    + '<p class="wsm-note">Sao lưu trước, cập nhật bản lớn trên bản sao, rà trang và form sau cập nhật.</p>', 'quan-tri › cap-nhat');
}

// Roles × capabilities. "wp" follows the default roles WordPress documents;
// "app" is a sample role set for a custom web app.
const ROLE_SETS = {
  wp: {url: 'quan-tri › nguoi-dung', caps: ['Sửa bài của mình', 'Xuất bản', 'Sửa bài người khác', 'Cài plugin', 'Quản lý tài khoản'],
    rows: [['Quản trị viên', [1, 1, 1, 1, 1]], ['Biên tập viên', [1, 1, 1, 0, 0]], ['Tác giả', [1, 1, 0, 0, 0]], ['Cộng tác viên', [1, 0, 0, 0, 0]]],
    note: 'Nhân sự nội dung dùng quyền Biên tập viên; tài khoản quản trị giữ ít người.'},
  app: {url: 'he-thong › phan-quyen', caps: ['Xem đơn', 'Tạo đơn', 'Hủy đơn', 'Xem giá vốn', 'Quản lý tài khoản'],
    rows: [['Quản lý', [1, 1, 1, 1, 1]], ['Bán hàng', [1, 1, 0, 0, 0]], ['Kho', [1, 0, 0, 0, 0]], ['Kế toán', [1, 0, 1, 1, 0]]],
    note: 'Quyền kiểm tra ở máy chủ cho từng thao tác, không chỉ ẩn nút trên giao diện.'}
};
export function roles(hot = 1, kind = 'wp') {
  const R = ROLE_SETS[kind];
  return box(R.url, 'Vai trò và quyền' + (kind === 'app' ? ' (mẫu)' : ''), 'users', '<div class="wsm-matrix">'
    + `<span class="wsm-mr is-head"><i></i>${R.caps.map(c => `<i>${c}</i>`).join('')}</span>`
    + R.rows.map(([r, v], i) => `<span class="wsm-mr${i === hot ? ' is-hi' : ''}"><b>${r}</b>${v.map(x => `<i>${icon(x ? 'check' : 'minus', x ? 'is-y' : 'is-n')}</i>`).join('')}</span>`).join('')
    + '</div>', R.note);
}

/* ------------------------------------------------------------------ *
 * Custom build
 * ------------------------------------------------------------------ */
export function userStory() {
  return box('dac-ta › dat-lich-giao', 'Câu chuyện người dùng', 'person', '<div class="wsm-story">'
    + '<p class="wsm-quote">Là <b>nhân viên kho</b>, tôi muốn <b>xem đơn cần giao theo khung giờ</b> để <b>xếp tuyến trước 9 giờ</b>.</p>'
    + '<small>Điều kiện chấp nhận</small><ul class="wsm-list is-check">'
    + ['Lọc đơn theo ngày và khung giờ', 'Đơn đổi giờ hiện nhãn "đã đổi"', 'Xuất danh sách cho tài xế', 'Nhân viên kho không thấy giá vốn'].map(t => `<li>${icon('check')}${t}</li>`).join('')
    + `</ul><small>Ngoài phạm vi</small><p class="wsm-out">${icon('close')}Tối ưu tuyến tự động</p></div>`);
}

export function modules(hot = 1) {
  const m = [['users', 'Khách hàng', 'Hồ sơ, lịch sử mua'], ['cart', 'Đơn đặt', 'Tạo, duyệt, hủy'], ['calendar', 'Lịch giao', 'Khung giờ, tài xế'],
    ['box', 'Kho', 'Tồn theo lô'], ['chart', 'Báo cáo', 'Theo ngày, tuần'], ['shield', 'Phân quyền', 'Theo vai trò']];
  return box('kien-truc › module', 'Tách module (mẫu)', 'layers', `<div class="wsm-mods">${m.map(([ic, t, d], i) =>
    `<span class="wsm-mod${i === hot ? ' is-on' : ''}">${icon(ic)}<b>${t}</b><em>${d}</em></span>`).join('')}</div>`,
  'Mỗi module có vai trò dùng, dữ liệu và điều kiện chấp nhận riêng.');
}

export function environments(hot = 1) {
  const e = [['code', 'Phát triển', 'Nhánh tính năng', 'Lập trình viên'], ['eye', 'Thử nghiệm', 'Dữ liệu mẫu', 'Doanh nghiệp duyệt'], ['globe', 'Chính thức', 'Phiên bản 1.3', 'Khách dùng']];
  return box('trien-khai › moi-truong', 'Ba môi trường', 'route', `<div class="wsm-envs">${e.map(([ic, t, v, who], i) =>
    `<span class="wsm-env${i === hot ? ' is-on' : ''}">${icon(ic)}<b>${t}</b><em>${v}</em><small>${who}</small></span>`).join(`<i class="wsm-arr">${icon('arrow')}</i>`)}</div>`,
  'Không sửa thẳng trên bản chính thức; mọi thay đổi qua bản thử nghiệm và có bản ghi phát hành.');
}

/* ------------------------------------------------------------------ *
 * UI/UX
 * ------------------------------------------------------------------ */
export function flow(hot = 2) {
  const n = [['page', 'Vào trang sản phẩm'], ['cart', 'Thêm giỏ'], ['person', 'Đã có tài khoản?'], ['form', 'Nhập địa chỉ'], ['pay', 'Thanh toán'], ['check', 'Xác nhận đơn']];
  return box('luong › dat-hang', 'Luồng đặt hàng', 'route', `<div class="wsm-flow">${n.map(([ic, t], i) =>
    `<span class="wsm-fn${i === 2 ? ' is-q' : ''}${i === hot ? ' is-on' : ''}">${icon(ic)}${t}</span>`).join(`<i class="wsm-arr">${icon('arrow')}</i>`)}</div>`
    + `<div class="wsm-fork">${chip('Có → đăng nhập nhanh', 'is-ok')}${chip('Không → mua không cần tài khoản', 'is-ok')}</div>`,
  'Vẽ cả nhánh rẽ và lỗi trước khi vẽ giao diện.');
}

export function wireframe(mode = 'wire') {
  const hi = mode === 'ui';
  return wrap(win(SHOP + (hi ? '/ban-mau' : '/khung-day'), `<div class="wsm-wf${hi ? ' is-ui' : ''}">`
    + (hi ? nav(['Nến', 'Quà tặng', 'Giỏ']) : '<span class="wsm-ph-bar is-nav"></span>')
    + `<div class="wsm-wf-hero">${hi ? img('s-shelf', 'r169') : `<span class="wsm-ph-img">${icon('image')}Ảnh chính</span>`}`
    + `<div>${hi ? '<b class="wsm-t">Quà tặng mùi hương</b><p>Duyệt mẫu trước khi sản xuất.</p><i class="wsm-btn">Nhận báo giá</i>'
      : '<span class="wsm-ph-bar"></span><span class="wsm-ph-bar is-s"></span><span class="wsm-ph-btn">Nút chính</span>'}</div></div>`
    + `<div class="wsm-grid is-3">${[0, 1, 2].map(i => hi ? `<span class="wsm-card">${img(['s6', 's3', 's1'][i], 'r169')}<b>${esc(PRODUCTS[[5, 2, 0][i]][1])}</b></span>`
      : `<span class="wsm-ph-card"><span class="wsm-ph-img">${icon('image')}</span><span class="wsm-ph-bar is-s"></span></span>`).join('')}</div></div>`));
}

export function uiStates(state = 'empty') {
  const S = {
    empty: [icon('cart'), 'Giỏ hàng đang trống', 'Gợi ý 3 sản phẩm bán chạy', 'Xem nến thơm'],
    loading: ['', 'Đang tải đơn hàng…', '', ''],
    error: [icon('alert'), 'Chưa tải được đơn hàng', 'Mạng yếu hoặc máy chủ bận. Dữ liệu của bạn vẫn còn.', 'Thử lại'],
    success: [icon('check'), 'Đã đặt hàng #1042', 'Email xác nhận đã gửi tới lan@example.com', 'Xem đơn'],
    denied: [icon('lock'), 'Bạn chưa có quyền xem mục này', 'Tài khoản Kho không xem được giá vốn. Liên hệ quản lý nếu cần.', 'Quay lại']
  }[state];
  return phone(`<div class="wsm-pnav">${icon('back')}<b>Đơn hàng</b></div>`
    + (state === 'loading' ? '<div class="wsm-pbody">' + [0, 1, 2].map(() => '<span class="wsm-skel"><i></i><span><i></i><i class="is-s"></i></span></span>').join('')
      + '<p class="wsm-note">Khung chờ giữ đúng chỗ nội dung, trang không nhảy khi tải xong.</p></div>'
      : `<div class="wsm-state is-${state}"><span class="wsm-si">${S[0]}</span><b>${S[1]}</b><p>${S[2]}</p><i class="wsm-btn">${S[3]}</i></div>`));
}

export function designSystem() {
  const sw = [['#1f3a2e', 'Chính'], ['#c98b4a', 'Nhấn'], ['#f6efe6', 'Nền'], ['#b42318', 'Lỗi'], ['#1f7a55', 'Thành công']];
  return box('he-thong › thanh-phan', 'Hệ thống giao diện (mẫu)', 'layers', '<div class="wsm-ds">'
    + `<div class="wsm-sw">${sw.map(([c, t]) => `<span><i style="background:${c}"></i>${t}</span>`).join('')}</div>`
    + '<div class="wsm-type"><b class="is-h1">Tiêu đề 32</b><b class="is-h2">Tiêu đề phụ 22</b><span>Nội dung 16 · dòng 1,5</span></div>'
    + '<div class="wsm-btns">' + ['Chính', 'Phụ', 'Tắt'].map((t, i) => `<i class="${['is-pri', '', 'is-off'][i]}">${t}</i>`).join('') + '</div>'
    + '<div class="wsm-f is-err"><small>Email</small><span>lan@example</span><em>Thiếu tên miền sau @</em></div></div>',
  'Một nút, một ô nhập, một thông báo lỗi dùng chung cho mọi màn hình.');
}

export function usability(hot = 1) {
  const rows = [['Tìm hộp quà 50 cái', '5/5', '40 giây', ''], ['Đổi mùi trong giỏ', '2/5', '2 phút', 'Không thấy nút sửa'],
    ['Nhập mã giảm giá', '4/5', '35 giây', ''], ['Theo dõi đơn', '3/5', '1 phút', 'Tìm ở chân trang']];
  return box('nghien-cuu › thu-nguoi-dung', '5 người thử · 4 tác vụ (số mẫu)', 'users', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Tác vụ</i><i>Hoàn tất</i><i>Thời gian</i><i>Vấn đề</i></span>'
    + rows.map(([t, d, s, p], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${t}</i><i>${d}</i><i>${s}</i><i>${p ? chip(p, 'is-warn') : '—'}</i></span>`).join('')
    + '</div>', 'Sửa tác vụ nhiều người không hoàn tất trước, rồi thử lại.');
}

/* ------------------------------------------------------------------ *
 * CRO
 * ------------------------------------------------------------------ */
export function scrollMap() {
  const bands = [['Tiêu đề + ảnh', 100], ['Lợi ích', 72], ['Bảng giá', 41], ['Form', 23], ['Câu hỏi', 12]];
  return box('phan-tich › do-sau-cuon', 'Bao nhiêu người cuộn tới đâu (số mẫu)', 'eye', '<div class="wsm-scroll">'
    + bands.map(([t, v], i) => `<span class="wsm-band${i === 3 ? ' is-hi' : ''}" style="--v:${v}%"><b>${t}</b><em>${v}%</em></span>`).join('')
    + '</div>', 'Form nằm dưới bảng giá nên chỉ khoảng một phần tư người xem thấy: thử đưa nút lên sớm hơn.');
}

export function hypothesis() {
  return box('thu-nghiem › gia-thuyet', 'Phiếu giả thuyết', 'flag', '<div class="wsm-story">'
    + '<p class="wsm-quote">Vì <b>77% người xem không cuộn tới form</b> (số mẫu), nếu <b>thêm nút "Nhận báo giá" ở màn hình đầu</b> thì <b>tỷ lệ gửi form</b> sẽ tăng mà lead phù hợp không giảm.</p>'
    + '<small>Đo bằng</small><ul class="wsm-list is-check">' + ['form_submit / lượt xem trang', 'Lead phù hợp trong CRM', 'Chạy tới khi đủ mẫu đã định'].map(t => `<li>${icon('check')}${t}</li>`).join('')
    + `</ul><small>Không đổi cùng lúc</small><p class="wsm-out">${icon('close')}Giá, ảnh, tiêu đề</p></div>`);
}

/* ------------------------------------------------------------------ *
 * Maintenance
 * ------------------------------------------------------------------ */
export function backups(hot = 0) {
  const rows = [['Hôm nay 02:00', 'Toàn bộ', '1,8 GB', 'Kho ngoài máy chủ', 'ok'], ['Hôm qua 02:00', 'Cơ sở dữ liệu', '120 MB', 'Kho ngoài máy chủ', 'ok'],
    ['Thứ hai', 'Trước cập nhật', '1,8 GB', 'Máy chủ + kho ngoài', 'ok'], ['Tháng trước', 'Thử khôi phục', '—', 'Bản sao thử nghiệm', 'warn']];
  return box('bao-tri › sao-luu', 'Nhật ký sao lưu (mẫu)', 'shield', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Thời điểm</i><i>Loại</i><i>Dung lượng</i><i>Nơi lưu</i></span>'
    + rows.map(([t, k, s, w, st], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${t}</i><i>${chip(k, 'is-' + st)}</i><i>${s}</i><i>${w}</i></span>`).join('')
    + '</div>', 'Bản sao lưu chỉ có giá trị khi đã thử khôi phục được.');
}

export function uptime() {
  const days = Array.from({length: 30}, (_, i) => i === 11 ? 'bad' : i === 22 ? 'warn' : 'ok');
  return box('bao-tri › tinh-trang', '30 ngày gần nhất (mẫu)', 'bell', `<div class="wsm-days">${days.map(d => `<i class="is-${d}"></i>`).join('')}</div>`
    + '<div class="wsm-inc"><span>' + chip('Ngày 12', 'is-bad') + '<b>Form không gửi được 40 phút</b><em>Plugin form lỗi sau cập nhật · đã khôi phục bản trước</em></span>'
    + '<span>' + chip('Ngày 23', 'is-warn') + '<b>Trang chậm buổi tối</b><em>Ảnh banner mới 3 MB · đã nén lại</em></span></div>',
  'Mỗi sự cố ghi nguyên nhân, cách xử lý và việc cần làm để không lặp lại.');
}

export function careReport() {
  const items = [['check', 'Cập nhật 6 plugin, 1 giao diện', 'ok'], ['shield', '4 bản sao lưu, 1 lần thử khôi phục', 'ok'], ['form', 'Thử form liên hệ mỗi tuần', 'ok'],
    ['alert', '2 liên kết hỏng đã sửa', 'warn'], ['bolt', 'Ảnh mới chưa nén: 3', 'warn']];
  return box('bao-tri › bao-cao-thang', 'Báo cáo bảo trì tháng 9 (mẫu)', 'receipt', '<div class="wsm-rep">'
    + items.map(([ic, t, s]) => `<span class="wsm-ri is-${s}">${icon(ic)}${t}</span>`).join('') + '</div>',
  'Một trang đọc trong năm phút: đã làm gì, còn gì, cần doanh nghiệp quyết định gì.');
}

/* ------------------------------------------------------------------ *
 * Speed
 * ------------------------------------------------------------------ */
// Core Web Vitals with the web.dev "good" thresholds; values are samples.
export function vitals(stage = 'before') {
  const after = stage === 'after';
  const m = [['LCP', 'Tải nội dung chính', after ? '2,1 s' : '4,6 s', '≤ 2,5 s', after ? 'ok' : 'bad', after ? 62 : 100],
    ['INP', 'Phản hồi thao tác', after ? '160 ms' : '340 ms', '≤ 200 ms', after ? 'ok' : 'warn', after ? 55 : 100],
    ['CLS', 'Bố cục xê dịch', after ? '0,04' : '0,21', '≤ 0,1', after ? 'ok' : 'bad', after ? 25 : 100]];
  return box('do-hieu-suat › dien-thoai', (after ? 'Sau khi sửa' : 'Trước khi sửa') + ' · điện thoại (số mẫu)', 'bolt', '<div class="wsm-cwv">'
    + m.map(([k, t, v, g, s, w]) => `<span class="wsm-m is-${s}"><b>${k}</b><em>${t}</em><strong>${v}</strong>`
      + `<span class="wsm-gauge"><i style="width:${w}%"></i></span><small>Tốt: ${g}</small></span>`).join('')
    + '</div>', 'Ngưỡng "tốt" theo web.dev, đọc ở phân vị 75 của lượt tải trang, tách điện thoại và máy tính.');
}

export function waterfall(hot = 3) {
  const r = [['HTML', 'tài liệu', 0, 8, ''], ['style.css', 'chặn hiển thị', 8, 14, 'warn'], ['font 4 kiểu', 'chặn chữ', 10, 22, 'warn'],
    ['banner.jpg', '2,4 MB', 12, 70, 'bad'], ['app.js', '480 KB', 14, 40, 'warn'], ['khung chat', 'bên thứ ba', 30, 30, '']];
  return box('do-hieu-suat › tai-nguyen', 'Tài nguyên khi tải trang (số mẫu)', 'list', '<div class="wsm-wfall">'
    + r.map(([n, d, s, w, t], i) => `<span class="wsm-wr${i === hot ? ' is-hi' : ''}"><b>${n}</b><em>${d}</em>`
      + `<span class="wsm-track"><i class="is-${t || 'n'}" style="left:${s}%;width:${w}%"></i></span></span>`).join('')
    + '</div>', 'Ảnh banner chiếm phần lớn thời gian tải nội dung chính: sửa ở đây trước.');
}

// Cache rules by file type (examples following MDN's HTTP caching guide).
export function cacheRules(hot = 1) {
  const r = [['Trang HTML', 'no-cache', 'Luôn hỏi lại máy chủ để thấy nội dung mới'],
    ['CSS, JS có mã phiên bản', 'max-age=31536000, immutable', 'Đổi nội dung thì đổi tên tệp'],
    ['Ảnh sản phẩm', 'max-age=604800', 'Giữ một tuần (ví dụ)'],
    ['Giỏ hàng, tài khoản', 'private, no-store', 'Dữ liệu riêng, không lưu chung']];
  return box('do-hieu-suat › bo-nho-dem', 'Quy tắc bộ nhớ đệm (ví dụ)', 'repeat', '<div class="wsm-rules">'
    + r.map(([t, h, why], i) => `<span class="wsm-rule${i === hot ? ' is-hi' : ''}"><b>${t}</b><code>Cache-Control: ${h}</code><em>${why}</em></span>`).join('')
    + '</div>', 'Giá trị cụ thể chọn theo hệ thống; lần tải sau dùng lại tệp không đổi.');
}

export function imageDiet() {
  return box('do-hieu-suat › anh', 'Cùng một ảnh, hai cách xuất (số mẫu)', 'image', '<div class="wsm-two">'
    + `<span class="wsm-var is-bad">${img('s-shelf', 'r169')}<b>JPG 4000 px</b><em>2,4 MB · tải cả trên điện thoại</em></span>`
    + `<span class="wsm-var is-ok">${img('s-shelf', 'r169')}<b>WebP 1600 px + srcset</b><em>180 KB · kích thước theo màn hình</em></span>`
    + '</div>', 'Ảnh đầu trang tải sớm; ảnh bên dưới dùng loading="lazy".');
}

/* ------------------------------------------------------------------ *
 * Integrations
 * ------------------------------------------------------------------ */
export function pipeline(hot = 2) {
  const n = [['form', 'Form website'], ['shield', 'Kiểm tra dữ liệu'], ['link', 'API'], ['users', 'CRM'], ['bell', 'Báo nhân viên']];
  return box('tich-hop › luong-du-lieu', 'Một lead đi qua đâu', 'route', `<div class="wsm-flow is-line">${n.map(([ic, t], i) =>
    `<span class="wsm-fn${i === hot ? ' is-on' : ''}">${icon(ic)}${t}</span>`).join(`<i class="wsm-arr">${icon('arrow')}</i>`)}</div>`
    + `<div class="wsm-fork">${chip('Lỗi → xếp hàng thử lại', 'is-warn')}${chip('Trùng số điện thoại → gộp hồ sơ', 'is-ok')}</div>`,
  'Mỗi bước ghi trạng thái để biết lead dừng ở đâu nếu CRM không nhận.');
}

export function fieldMap(hot = 1) {
  const rows = [['Họ và tên', 'contact_name', 'Chữ', 'Bắt buộc'], ['Số điện thoại', 'phone', 'Chuẩn hóa +84', 'Bắt buộc · khóa gộp'],
    ['Số lượng hộp', 'quantity', 'Số', 'Tùy chọn'], ['Nguồn', 'utm_source', 'Từ đường dẫn', 'Tự điền'], ['Đồng ý liên hệ', 'consent', 'Có / không', 'Bắt buộc']];
  return box('tich-hop › anh-xa-truong', 'Ánh xạ trường form → CRM', 'table', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Form</i><i>Trường CRM</i><i>Kiểu</i><i>Quy tắc</i></span>'
    + rows.map(([a, b, c, d], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${a}</i><i><code>${b.replace(/_/g, '_<wbr>')}</code></i><i>${c}</i><i>${d}</i></span>`).join('')
    + '</div>', 'Tên trường CRM là ví dụ; ánh xạ thật theo tài liệu API của hệ thống đang dùng.');
}

export function syncLog(hot = 2) {
  const rows = [['09:12', 'NT-0921', '201', 'Đã tạo', 'ok'], ['09:15', 'NT-0922', '409', 'Trùng → gộp', 'ok'],
    ['09:20', 'NT-0923', '503', 'Thử lại lần 2', 'warn'], ['09:31', 'NT-0924', '401', 'Hết hạn khóa → báo quản trị', 'bad']];
  return box('tich-hop › nhat-ky', 'Nhật ký đồng bộ (mẫu)', 'list', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Giờ</i><i>Hồ sơ</i><i>Mã trả về</i><i>Xử lý</i></span>'
    + rows.map(([t, id, c, s, st], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${t}</i><i>${id}</i><i><code>${c}</code></i><i>${chip(s, 'is-' + st)}</i></span>`).join('')
    + '</div>', 'Không để lỗi kết nối làm mất lead: lưu lại, thử lại, báo người phụ trách.');
}

export function payload() {
  return box('tich-hop › du-lieu-gui', 'Dữ liệu gửi đi (mẫu, không có thông tin thật)', 'code', '<pre class="wsm-code">'
    + esc('{\n  "contact_name": "Trần Minh",\n  "phone": "+84900000000",\n  "quantity": 120,\n  "utm_source": "google",\n  "consent": true,\n  "form_id": "bao-gia-qua-tang"\n}')
    + '</pre>', 'Chỉ gửi trường cần dùng; khóa API lưu phía máy chủ, không nằm trong mã trang.');
}

// Hero pictures reused by several pages: a small browser beside a phone.
export const heroSite = () => homePage();
