// Mock screens for the one-page services. Same rules as every other mock:
// no platform logos or wordmarks, sample brand Nhà Thơm (nhathom.example),
// text 11px or larger, pictures cover a fixed frame, tilt 4° or less.
//
// Instagram screens are the Facebook Ads mocks (styled by facebook-ads-lp.css,
// whose rules live under .fb-lp, hence the wrapper); YouTube screens are the
// Google Ads mocks. Everything new starts with opm- and is styled in
// dist/one-page-lp.css.
import {handset, win, BRAND, mkImg as img, mkFav as fav} from '../google-ads-lp/mocks.mjs';
import {renderMock} from '../google-ads-lp/mocks.mjs';
import {renderFb} from '../facebook-ads-lp/mocks.mjs';
import {icon, esc, SHOP, PRODUCTS, reportTable, barChart, lineChart} from '../google-ads-lp/visuals.mjs';
import {siteScreen, formScreen, messengerScreen, crmScreen, SIGNALS} from '../google-ads-lp/scenes.mjs';

export const wrap = html => `<div class="opm" data-mock>${html}</div>`;
export const fb = id => `<div class="fb-lp op-fb">${renderFb(id)}</div>`;
export const google = id => renderMock(id);
export const site = () => siteScreen({});
export const form = (done = false) => formScreen({done});
export const chat = () => messengerScreen({});
export const crm = (stage = 'qualified', sources) => crmScreen(stage, sources ? {sources} : {});
export const signal = id => SIGNALS[id]();

/* ------------------------------------------------------------------ *
 * Remarketing
 * ------------------------------------------------------------------ */
// Membership windows: who is in which list, and who is left out.
export function windows(on = 1) {
  const rows = [
    ['1–7 ngày', 'Vừa xem sản phẩm', 'Nhắc lại món vừa xem', 92],
    ['8–30 ngày', 'Chưa quay lại', 'Lý do nên chọn, đánh giá', 64],
    ['31–90 ngày', 'Chu kỳ mua dài', 'Ưu đãi hoặc món mới', 38],
    ['Đã mua', 'Loại khỏi tệp trên', 'Chuyển sang mua lại', 0]
  ];
  return wrap(win('quang-cao › doi-tuong › khung-thoi-gian', '<div class="opm-win">'
    + `<b class="opm-h">${icon('clock')}Tệp theo thời gian (mẫu)</b>`
    + rows.map(([t, who, msg, w], i) => `<div class="opm-row${i === on ? ' is-hi' : ''}${w ? '' : ' is-out'}">`
      + `<span class="opm-t">${t}</span><span class="opm-bar"><i style="width:${w || 100}%"></i></span>`
      + `<span class="opm-m"><b>${who}</b><em>${msg}</em></span></div>`).join('')
    + '<p class="opm-note">Mỗi tệp loại nhóm gần hơn để không chồng lặp. Độ dài tệp là ví dụ, không phải lịch bắt buộc.</p></div>'));
}

// Frequency: how often one person sees the same ad.
export function frequency() {
  const days = [1, 2, 2, 3, 5, 7, 9];
  return wrap(win('bao-cao › tan-suat', '<div class="opm-win">'
    + `<b class="opm-h">${icon('repeat')}Tần suất trên mỗi người · 7 ngày (số mẫu)</b>`
    + barChart(days, {labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], highlight: 6})
    + '<p class="opm-note">Tần suất tăng dần mà chuyển đổi không tăng: tệp quá nhỏ hoặc thông điệp lặp lại.</p></div>'));
}

/* ------------------------------------------------------------------ *
 * Performance Marketing
 * ------------------------------------------------------------------ */
// One report across channels, with the CRM column next to platform numbers.
export function crossReport() {
  return wrap(win('bao-cao › tong-hop-kenh', '<div class="opm-win">'
    + reportTable({title: 'Tháng 9 · số mẫu', icon: 'chart', cls: 'opm-rep',
      head: ['Kênh', 'Chi phí', 'Nền tảng báo', 'CRM xác nhận'],
      rows: [
        ['Tìm kiếm', '12 tr', '96 lead', {text: '41 phù hợp', status: 'good'}],
        ['Mạng xã hội', '9 tr', '140 lead', {text: '28 phù hợp', status: 'consider'}],
        ['Video', '6 tr', '18 lead', {text: '9 phù hợp', status: 'consider'}],
        ['Remarketing', '3 tr', '44 lead', {text: '22 phù hợp', status: 'good'}]
      ]})
    + '<p class="opm-note">Cộng cột "Nền tảng báo" sẽ đếm trùng: một khách có thể được nhiều kênh ghi nhận.</p></div>'));
}

export function budgetSplit() {
  const parts = [['Đón nhu cầu', 12, '#88e4ff'], ['Tạo nhu cầu', 9, '#c0a2ff'], ['Tiếp nối', 6, '#85e1c1'], ['Thử nghiệm', 3, '#ffbd80']];
  return wrap(win('ke-hoach › phan-bo-ngan-sach', '<div class="opm-win">'
    + `<b class="opm-h">${icon('wallet')}Ngân sách tháng · 30 triệu (số mẫu)</b>`
    + `<div class="opm-split">${parts.map(([, v, c]) => `<i style="flex:${v};background:${c}"></i>`).join('')}</div>`
    + '<ul class="opm-legend">' + parts.map(([t, v, c]) => `<li><i style="background:${c}"></i><span>${t}</span><b>${v} tr</b></li>`).join('') + '</ul>'
    + '<p class="opm-note">Chia theo vai trò của kênh, không chia đều. Giữ một phần cố định cho thử nghiệm.</p></div>'));
}

export function splitTest(kind = 'budget') {
  const [a, b] = kind === 'page'
    ? [['Trang A', 'Hiện tại · form 7 trường', 42, '3,1%'], ['Trang B', 'Form 4 trường + câu phân loại', 58, '4,0%']]
    : [['Nhóm A', 'Giữ nguyên cách chạy', 46, '180 nghìn/lead'], ['Nhóm B', 'Thêm video mở đầu', 54, '152 nghìn/lead']];
  const col = ([name, what, h, v], hot) => `<div class="opm-ab-col${hot ? ' is-b' : ''}"><b>${name}</b><em>${what}</em>`
    + `<span class="opm-ab-bar"><i style="height:${h}%"></i></span><strong>${v}</strong></div>`;
  return wrap(win('thu-nghiem › a-b', '<div class="opm-win">'
    + `<b class="opm-h">${icon('sliders')}Thử nghiệm một biến (số mẫu)</b>`
    + `<div class="opm-ab">${col(a)}<i class="opm-vs">vs</i>${col(b, true)}</div>`
    + '<p class="opm-note">Chỉ đổi một thứ, chạy đủ thời gian, đọc cả chất lượng lead trước khi kết luận.</p></div>'));
}

export function trend() {
  return wrap(win('bao-cao › chi-phi-moi-khach-phu-hop', '<div class="opm-win">'
    + `<b class="opm-h">${icon('trend')}Chi phí mỗi khách phù hợp · 8 tuần (số mẫu)</b>`
    + lineChart([240, 232, 228, 210, 214, 196, 188, 182], {w: 280, h: 90, area: true})
    + '<p class="opm-note">Đọc xu hướng theo tuần, không phản ứng với một ngày lên xuống.</p></div>'));
}

/* ------------------------------------------------------------------ *
 * Tối ưu chuyển đổi
 * ------------------------------------------------------------------ */
// The ad's promise next to what the page shows.
export function match(ok = false) {
  return wrap('<div class="opm-match">'
    + '<div class="opm-card"><small>Quảng cáo hứa</small><b>Hộp quà 3 nến, giao 2 giờ</b><em>Báo giá trong ngày</em></div>'
    + `<i class="opm-arrow">${icon('arrow')}</i>`
    + `<div class="opm-card${ok ? ' is-ok' : ' is-bad'}"><small>Trang đích cho thấy</small>`
    + (ok ? '<b>Hộp quà 3 nến · 320.000₫</b><em>Giao 2 giờ nội thành · nút Nhận báo giá</em>'
      : '<b>Trang chủ Nhà Thơm</b><em>Khách phải tự tìm hộp quà và phí giao</em>')
    + `<span class="opm-mark">${icon(ok ? 'check' : 'close')}</span></div></div>`);
}

export function checkout(step = 'ship') {
  const [pic, name, price] = PRODUCTS[5];
  const steps = ['Giỏ hàng', 'Giao hàng', 'Thanh toán'];
  const now = {cart: 0, ship: 1, pay: 2}[step];
  return handset('<div class="opm-co">'
    + `<div class="opm-addr">${icon('lock')}<span>${SHOP}/thanh-toan</span></div>`
    + `<ol class="opm-steps">${steps.map((s, i) => `<li class="${i < now ? 'is-done' : i === now ? 'is-now' : ''}"><i>${i + 1}</i>${s}</li>`).join('')}</ol>`
    + `<div class="opm-line">${img(pic, 'r11')}<span><b>${esc(name)}</b><em>${price}</em></span></div>`
    + '<div class="opm-f"><small>Phí giao</small><span>Hiện trước khi nhập địa chỉ</span></div>'
    + '<div class="opm-f is-err"><small>Số điện thoại</small><span>0900 000 00</span><em>Thiếu một số: kiểm tra lại</em></div>'
    + '<div class="opm-sum"><span>Tổng</span><b>350.000₫</b></div>'
    + `<span class="opm-btn">Tiếp tục</span></div>`, {cls: 'opm-phone'});
}

// Where visitors leave: a step-by-step drop chart.
export function dropoff() {
  const steps = [['Vào trang', 1000], ['Bắt đầu form', 310], ['Gặp lỗi', 96], ['Gửi thành công', 142]];
  return wrap(win('phan-tich › hanh-trinh', '<div class="opm-win">'
    + `<b class="opm-h">${icon('funnel')}Rơi rớt theo bước (số mẫu)</b>`
    + steps.map(([t, n], i) => `<div class="opm-row${i === 2 ? ' is-hi' : ''}"><span class="opm-t">${t}</span>`
      + `<span class="opm-bar"><i style="width:${n / 10}%"></i></span><span class="opm-n">${n.toLocaleString('vi-VN')}</span></div>`).join('')
    + '<p class="opm-note">Bước có nhiều lỗi nhất là nơi sửa trước, trước cả khi tăng ngân sách quảng cáo.</p></div>'));
}

/* ------------------------------------------------------------------ *
 * Shared: a one-line CRM verdict for the goals chapter
 * ------------------------------------------------------------------ */
export const leadDone = () => wrap(handset('<div class="opm-thx">'
  + `<span class="opm-ok">${icon('check')}</span><b>Đã nhận yêu cầu</b>`
  + `<p>${BRAND} gọi lại trong 15 phút.</p><span class="opm-ev">Sự kiện: gửi form thành công</span></div>`, {cls: 'opm-phone'}));

export const brandMark = () => fav();
