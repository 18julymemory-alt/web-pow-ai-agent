// Mock screens for the Thương mại điện tử pages (COMMERCE_LP_PLAN.md). Same
// rules as every other mock: no platform logos, names or brand colours drawn
// as marks — a marketplace is a generic shopping app, a seller centre is a
// generic admin; sample brand Nhà Thơm; text 11px or larger; pictures cover
// their frame; numbers marked "mẫu". New classes start with cmm- and live in
// dist/commerce-lp.css; window and phone helpers come from the website mocks.
import {mkImg as img, mkFav as fav, BRAND} from '../google-ads-lp/mocks.mjs';
import {icon, esc, PRODUCTS} from '../google-ads-lp/visuals.mjs';
import {box, phone, chip} from '../website-lp/mocks.mjs';
export {scene, product, checkout, orders, category, payFail, leadDone, mobileSite} from '../website-lp/mocks.mjs';
export {storyboard, calendar} from '../training-lp/mocks.mjs';

const S = 'nguoiban.nhathom.example › ';

/* ------------------------------------------------------------------ *
 * Buyer side: marketplace app on a phone
 * ------------------------------------------------------------------ */
// Search results in a marketplace app; `ad` marks the first card as sponsored.
export function marketSearch({ad = false, hot = 0} = {}) {
  const cards = [PRODUCTS[5], PRODUCTS[2], PRODUCTS[0], PRODUCTS[3]];
  return phone(`<div class="cmm-top"><span class="cmm-q">${icon('search')}nến thơm quà tặng</span>${icon('cart')}</div>`
    + `<div class="cmm-chips">${['Liên quan', 'Mới nhất', 'Bán chạy', 'Giá'].map((t, i) => chip(t, i ? '' : 'is-on')).join('')}</div>`
    + '<div class="cmm-grid">' + cards.map(([p, n, pr], i) => `<span class="cmm-card${i === hot ? ' is-hi' : ''}">${img(p, 'r11')}`
      + (ad && i === 0 ? '<em class="cmm-ad">Tài trợ</em>' : '') + `<b>${esc(n)}</b><strong>${pr}</strong>`
      + `<small>${icon('star')}4,${9 - i} · Đã bán ${[1.2, 0.8, 2.1, 0.5][i]}k</small></span>`).join('') + '</div>'
    + '<p class="wsm-note cmm-pad">Số liệu mẫu.</p>', 'cmm-app');
}

// Product page in a marketplace app: photos, variants, shop row, two buttons.
export function marketPdp({state = 'ok'} = {}) {
  const [p, n, pr] = PRODUCTS[5];
  return phone(`<div class="cmm-hero">${img(p, 'r11')}<span class="cmm-dots"><i class="is-on"></i><i></i><i></i><i></i></span></div>`
    + `<div class="wsm-pbody"><strong class="cmm-price">${pr}</strong><b class="wsm-t">${esc(n)} · mùi gỗ tuyết tùng</b>`
    + `<small class="cmm-meta">${icon('star')}4,8 · 1,2k đánh giá · Đã bán 3,4k (mẫu)</small>`
    + `<span class="wsm-opts">${chip('100g')}${chip('200g', 'is-on')}${chip(state === 'out' ? '400g · hết' : '400g', state === 'out' ? 'is-off' : '')}</span>`
    + `<span class="cmm-shop">${fav()}<b>${BRAND} Official</b><em>Phản hồi trong vài giờ</em></span></div>`
    + `<div class="cmm-buy"><i>${icon('chat')}</i><i>${icon('cart')}Thêm vào giỏ</i><i class="is-pri">Mua ngay</i></div>`, 'cmm-app');
}

// Short video with a tagged product card (video commerce).
export function videoShop() {
  const [p, n, pr] = PRODUCTS[5];
  return phone(`<div class="cmm-video">${img('s-tall', 'r916')}`
    + `<span class="cmm-cap"><b>@nhathom</b><em>Đốt thử nến nắp gỗ trong 10 giây</em></span>`
    + `<span class="cmm-tag">${img(p, 'r11')}<span><b>${esc(n)}</b><strong>${pr}</strong></span><i>${icon('cart')}</i></span></div>`, 'cmm-app is-dark');
}

// Chat queue for customer care, each thread with an owner.
export function chatQueue(hot = 1) {
  const q = [['Chị Lan', 'Còn mùi oải hương 200g không?', 'Mai', '2 phút'], ['Anh Hùng', 'Đơn #1041 chưa thấy giao', 'Nam', '14 phút'],
    ['Chị Hoa', 'Muốn đổi sang màu trắng', 'Chưa giao', '35 phút']];
  return phone(`<div class="wsm-pnav">${icon('chat')}<b>Tin nhắn khách</b></div><div class="wsm-pbody">`
    + q.map(([who, msg, owner, t], i) => `<span class="cmm-thread${i === hot ? ' is-hi' : ''}${owner === 'Chưa giao' ? ' is-warn' : ''}"><b>${who}</b><em>${msg}</em>`
      + `<small>${icon('person')}${owner} · ${t}</small></span>`).join('')
    + '<p class="wsm-note">Tin nhắn chưa có người nhận nổi lên đầu (mẫu).</p></div>', 'cmm-app');
}

/* ------------------------------------------------------------------ *
 * Seller side: a generic seller centre
 * ------------------------------------------------------------------ */
const MENU = [['receipt', 'Đơn hàng'], ['tag', 'Sản phẩm'], ['target', 'Marketing'], ['chart', 'Dữ liệu'], ['chat', 'Tin nhắn'], ['gear', 'Thiết lập shop']];
const center = (on, body, url) => box(S + url, '', 'store', `<div class="wsm-cms"><aside>${MENU.map(([ic, t], i) =>
  `<span${i === on ? ' class="is-on"' : ''} title="${t}">${icon(ic)}<em>${t}</em></span>`).join('')}</aside><div class="wsm-cms-main">${body}</div></div>`);

// SKU table: variants, stock, image; the problem row shares one picture.
export function skuTable(hot = 2) {
  const r = [['NT-NG-100', '100g · gỗ', '180.000₫', '42', 's6', 'ok'], ['NT-NG-200', '200g · gỗ', '320.000₫', '14', 's6', 'ok'],
    ['NT-NG-200-W', '200g · trắng', '320.000₫', '0', 's6', 'bad'], ['NT-OH-200', '200g · oải hương', '320.000₫', '26', 's1', 'ok']];
  return center(1, '<div class="wsm-bar"><small>Sản phẩm · biến thể (mẫu)</small><span><i class="is-pri">Thêm sản phẩm</i></span></div><div class="cmm-sku">'
    + '<span class="cmm-sr is-head"><i></i><i>SKU</i><i>Biến thể</i><i>Giá</i><i>Tồn</i></span>'
    + r.map(([sku, v, pr, st, p, s], i) => `<span class="cmm-sr${i === hot ? ' is-hi' : ''}">${img(p, 'r11')}<i><code>${sku.replace(/-/g, '-<wbr>')}</code></i><i>${v}</i><i>${pr}</i>`
      + `<i>${s === 'bad' ? chip('Hết · dùng chung ảnh', 'is-bad') : st}</i></span>`).join('') + '</div>', 'san-pham');
}

// Order board: columns by status.
export function orderBoard(hot = 1) {
  const cols = [['Chờ xác nhận', [['#1044', '2 sản phẩm', ''], ['#1045', 'Hỏi đổi màu', 'warn']]], ['Đang đóng gói', [['#1042', 'Kiểm SKU', 'ok'], ['#1043', 'Thiếu 200g trắng', 'bad']]],
    ['Đã bàn giao', [['#1039', 'Đơn vị vận chuyển', 'ok']]], ['Hoàn / hủy', [['#1036', 'Khách đổi ý', '']]]];
  return center(0, '<div class="wsm-bar"><small>Đơn hôm nay (mẫu)</small><span><i>Lọc theo người phụ trách</i></span></div><div class="cmm-board">'
    + cols.map(([t, cards], i) => `<span class="cmm-col${i === hot ? ' is-on' : ''}"><b>${t} <em>${cards.length}</em></b>`
      + cards.map(([id, d, s]) => `<i class="cmm-oc${s ? ' is-' + s : ''}"><code>${id}</code>${d}</i>`).join('') + '</span>').join('') + '</div>', 'don-hang');
}

// Shop setup checklist.
export function shopSetup(hot = 2) {
  const r = [['Hồ sơ chủ gian hàng', 'Đã duyệt', 'ok'], ['Tài khoản, phân quyền', 'Đã xong', 'ok'], ['Danh mục & SKU ban đầu', '24/30 sản phẩm', 'warn'],
    ['Vận chuyển & đóng gói', 'Chưa chọn kho lấy hàng', 'bad'], ['Chính sách đổi trả', 'Chờ duyệt nội dung', 'warn'], ['Tin nhắn tự động', 'Chưa thiết lập', 'n']];
  return center(5, '<div class="wsm-bar"><small>Thiết lập gian hàng (mẫu)</small><span><i class="is-pri">Mở bán</i></span></div>'
    + r.map(([t, s, c], i) => `<span class="wsm-upd${i === hot ? ' is-hi' : ''}"><b>${t}</b><em>${s}</em>${chip({ok: 'Xong', warn: 'Đang làm', bad: 'Chặn mở bán', n: 'Chưa làm'}[c], 'is-' + c)}</span>`).join(''), 'thiet-lap');
}

// Ads report by product, read against completed orders.
export function adsReport(hot = 1) {
  const r = [['Nến nắp gỗ 200g', '1,2 tr', '46', '41', 'ok'], ['Khuếch tán 150ml', '0,9 tr', '12', '8', 'warn'], ['Hộp quà 3 nến', '1,5 tr', '31', '30', 'ok'], ['Tinh dầu 30ml', '0,6 tr', '5', '2', 'bad']];
  return center(2, '<div class="wsm-bar"><small>Quảng cáo theo sản phẩm · 7 ngày (số mẫu)</small><span><i>Xuất báo cáo</i></span></div><div class="wsm-table">'
    + '<span class="wsm-tr is-head cmm-ads"><i>Sản phẩm</i><i>Chi tiêu</i><i>Đơn sàn báo</i><i>Hoàn tất</i><i>Đánh giá</i></span>'
    + r.map(([n, c, o, d, s], i) => `<span class="wsm-tr cmm-ads${i === hot ? ' is-hi' : ''}"><i>${n}</i><i>${c}</i><i>${o}</i><i>${d}</i><i>${chip({ok: 'Giữ', warn: 'Xem lại', bad: 'Dừng'}[s], 'is-' + s)}</i></span>`).join('')
    + '</div><p class="wsm-note">Đọc đơn hoàn tất sau hủy, hoàn; không chỉ số đơn nền tảng báo.</p>', 'quang-cao');
}

// Keyword bids for marketplace search ads.
export function keywordBids(hot = 1) {
  const r = [['nến thơm', 'Rộng', '1.200₫', 'Nhiều người tìm, cạnh tranh'], ['nến thơm quà tặng', 'Chính xác', '1.500₫', 'Đúng nhu cầu mua'], ['nến sáp đậu nành', 'Rộng', '900₫', 'Ý định tìm hiểu']];
  return center(2, '<div class="wsm-bar"><small>Từ khóa · giá thầu (mẫu)</small><span><i class="is-pri">Thêm từ khóa</i></span></div><div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Từ khóa</i><i>Đối sánh</i><i>Giá thầu</i><i>Ghi chú</i></span>'
    + r.map(([k, m, b, n], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${k}</i><i>${m}</i><i>${b}</i><i>${n}</i></span>`).join('') + '</div>', 'quang-cao › tu-khoa');
}

// Listing before and after.
export function listingCompare() {
  const col = (cls, t, pic, title, attrs) => `<span class="cmm-lc ${cls}"><small>${t}</small>${img(pic, 'r11')}<b>${esc(title)}</b>`
    + `<ul>${attrs.map(([k, v]) => `<li><em>${k}</em>${v}</li>`).join('')}</ul></span>`;
  return box(S + 'san-pham › toi-uu', 'Trang sản phẩm trước và sau (mẫu)', 'tag', '<div class="wsm-two">'
    + col('is-bad', 'TRƯỚC', 's-shelf', 'Nến thơm đẹp giá rẻ hot trend 2026 freeship', [['Khối lượng', '—'], ['Mùi', 'Nhiều mùi'], ['Ảnh', 'Chung một ảnh']])
    + col('is-ok', 'SAU', 's6', 'Nến thơm sáp đậu nành nắp gỗ 200g, mùi gỗ tuyết tùng', [['Khối lượng', '200g'], ['Thời gian đốt', 'Theo thông số nhà sản xuất'], ['Ảnh', 'Mỗi mùi một ảnh']])
    + '</div>', 'Tên nói đúng loại sản phẩm; mỗi biến thể có ảnh và thuộc tính riêng.');
}

// Product content brief for e-commerce copy.
export function productBrief() {
  const r = [['Sản phẩm', 'Nến sáp đậu nành nắp gỗ 200g'], ['Ai mua', 'Người tặng quà, người thích mùi nhẹ'], ['Câu hỏi hay gặp', 'Mùi có nồng không? Đốt bao lâu?'],
    ['Thông tin gốc', 'Bảng thông số do xưởng xác nhận'], ['Chứng minh', 'Video đốt thử, ảnh cận nắp gỗ'], ['Không được nói', 'Công dụng chữa bệnh, cam kết chưa kiểm chứng']];
  return box(S + 'noi-dung › brief', 'Brief nội dung sản phẩm (mẫu)', 'file', '<div class="trm-brief">'
    + r.map(([k, v]) => `<span><small>${k}</small><b>${esc(v)}</b></span>`).join('') + '</div>');
}

// Cancel / return reasons.
export function reasons(hot = 1) {
  const r = [['Khách đổi ý', 34], ['Thiếu hàng khi đóng gói', 26], ['Giao không thành công', 21], ['Sai mẫu, sai màu', 12], ['Khác', 7]];
  return box(S + 'du-lieu › hoan-huy', 'Hoàn, hủy theo lý do · tháng (số mẫu)', 'chart', r.map(([t, v], i) =>
    `<div class="opm-row${i === hot ? ' is-hi' : ''}"><span class="opm-t">${t}</span><span class="opm-bar"><i style="width:${v * 2.5}%"></i></span><span class="opm-n">${v}%</span></div>`).join(''),
  'Thiếu hàng và sai mẫu là lỗi vận hành: sửa trước khi tăng quảng cáo.');
}

// Money actually received after platform fees and costs.
export function netRevenue() {
  const r = [['Doanh số hiển thị', '100', ''], ['Phí sàn, thanh toán', '−', 'Theo chính sách hiện hành'], ['Mã giảm giá shop chịu', '−', 'Theo chương trình'], ['Quảng cáo', '−', 'Theo chi tiêu'],
    ['Hoàn, hủy', '−', 'Theo lý do'], ['Tiền thực nhận', '=', 'Đối chiếu với giá vốn']];
  return box(S + 'du-lieu › doi-soat', 'Từ doanh số tới tiền thực nhận', 'wallet', '<div class="cmm-net">'
    + r.map(([t, s, n], i) => `<span class="${i === r.length - 1 ? 'is-total' : ''}"><i>${s}</i><b>${t}</b><em>${n}</em></span>`).join('')
    + '</div>', 'Phí và điều kiện khác theo sàn, ngành hàng và tài khoản; lấy số thật trong Kênh Người Bán.');
}
