// Mock screens for the Đào tạo Digital Marketing pages (TRAINING_LP_PLAN.md).
// Same rules as every other mock: no platform logos or wordmarks, sample
// brand Nhà Thơm (nhathom.example), text 11px or larger, pictures cover a
// fixed frame, no tilt, numbers marked "mẫu". New classes start with trm-
// and live in dist/training-lp.css; the window/phone helpers and many
// screens come from the website mocks, ad screens from the ads kits.
import {mkImg as img} from '../google-ads-lp/mocks.mjs';
import {icon, esc} from '../google-ads-lp/visuals.mjs';
import {box, phone, chip} from '../website-lp/mocks.mjs';
export {sitemap, scrollMap, contactForm, vitals, dropoff, crm, lpAnatomy, pipeline, syncLog, uiStates, splitTest, hypothesis,
  mobileSite, fieldMap, leadDone} from '../website-lp/mocks.mjs';
export {google, fb} from '../one-page-lp/mocks.mjs';

const H = 'hoc.nhathom.example › ';

/* ------------------------------------------------------------------ *
 * Course structure
 * ------------------------------------------------------------------ */
// Syllabus: modules, sessions and the piece of work each one ends with.
export function syllabus(mods, hot = 0) {
  return box(H + 'de-cuong', 'Đề cương (mẫu)', 'list', '<ol class="trm-syl">'
    + mods.map(([ic, t, out], i) => `<li${i === hot ? ' class="is-on"' : ''}><i>${String(i + 1).padStart(2, '0')}</i>${icon(ic)}`
      + `<span><b>${esc(t)}</b><em>Bài làm: ${esc(out)}</em></span></li>`).join('') + '</ol>',
  'Mỗi chủ đề kết thúc bằng một bài làm có tiêu chí chấm.');
}

// Lesson screen: video frame on the left, practice steps on the right.
export function lesson(title, steps, hot = 1, pic = 's-desk') {
  return box(H + 'bai-hoc', '', 'play', '<div class="trm-lesson"><div class="trm-video">'
    + `${img(pic, 'r169')}<span class="trm-play">${icon('play')}</span><b>Bài học: ${esc(title)}</b><em>Học → thực hành → nhận phản hồi</em></div>`
    + '<div class="trm-steps"><small>NỘI DUNG THỰC HÀNH</small>'
    + steps.map((t, i) => `<span class="${i < hot ? 'is-done' : i === hot ? 'is-on' : ''}"><i>${i < hot ? icon('check') : i + 1}</i>${esc(t)}</span>`).join('')
    + '</div></div>');
}

// Class schedule: sessions with format and the work handed in.
export function schedule(rows, hot = 1) {
  return box(H + 'lich-hoc', 'Lịch học (mẫu)', 'calendar', '<div class="trm-sched">'
    + rows.map(([t, f, out], i) => `<span class="trm-sess${i === hot ? ' is-on' : ''}"><i>Buổi ${i + 1}</i><b>${esc(t)}</b>`
      + `${chip(f, f === 'Thực hành' ? 'is-ok' : '')}<em>${esc(out)}</em></span>`).join('') + '</div>');
}

/* ------------------------------------------------------------------ *
 * Practice and feedback
 * ------------------------------------------------------------------ */
export function exercise({title, brief, data, criteria}) {
  return box(H + 'bai-tap', 'Đề bài thực hành', 'form', '<div class="trm-ex">'
    + `<b class="trm-t">${esc(title)}</b><p>${esc(brief)}</p>`
    + `<small>Dữ liệu được dùng</small><p class="trm-data">${icon('file')}${esc(data)}</p>`
    + '<small>Tiêu chí đạt</small><ul>' + criteria.map(c => `<li>${icon('check')}${esc(c)}</li>`).join('') + '</ul>'
    + `<i class="wsm-btn">Nộp bài</i></div>`);
}

// Rubric: criteria against three levels, one selected per row.
export function rubric(rows, hot = 1) {
  const L = ['Chưa đạt', 'Đạt', 'Tốt'];
  return box(H + 'tieu-chi', 'Tiêu chí chấm (mẫu)', 'check', '<div class="trm-rub">'
    + `<span class="trm-rr is-head"><i></i>${L.map(l => `<i>${l}</i>`).join('')}</span>`
    + rows.map(([c, pick], i) => `<span class="trm-rr${i === hot ? ' is-hi' : ''}"><b>${esc(c)}</b>`
      + L.map((_, k) => `<i class="${k === pick ? 'is-pick is-' + k : ''}">${k === pick ? icon('check') : ''}</i>`).join('') + '</span>').join('')
    + '</div>', 'Tiêu chí công bố trước khi làm bài; giảng viên chấm theo cùng bảng.');
}

// A submission with the trainer's numbered notes.
export function feedback(work, notes, hot = 0) {
  return box(H + 'nhan-xet', 'Nhận xét bài làm', 'chat', '<div class="trm-fb"><div class="trm-work">'
    + work.map(([t, n]) => `<span>${esc(t)}${n ? `<i>${n}</i>` : ''}</span>`).join('') + '</div><ol class="trm-notes">'
    + notes.map(([t, tone], i) => `<li class="is-${tone}${i === hot ? ' is-on' : ''}"><i>${i + 1}</i>${esc(t)}</li>`).join('') + '</ol></div>');
}

// Roles × skills with a level for each.
export function skillMatrix(hot = 1) {
  const skills = ['Kế hoạch', 'Quảng cáo', 'Nội dung', 'Dữ liệu', 'Tự động hóa'];
  const rows = [['Trưởng nhóm', [3, 2, 2, 2, 1]], ['Chạy quảng cáo', [2, 3, 1, 2, 1]], ['Nội dung', [1, 1, 3, 1, 1]], ['Chăm sóc khách', [1, 0, 2, 1, 2]]];
  return box(H + 'nang-luc', 'Ma trận kỹ năng (mẫu)', 'users', '<div class="trm-mx">'
    + `<span class="trm-mr is-head"><i></i>${skills.map(s => `<i>${s}</i>`).join('')}</span>`
    + rows.map(([r, v], i) => `<span class="trm-mr${i === hot ? ' is-hi' : ''}"><b>${r}</b>${v.map(n => `<i class="trm-lv" data-lv="${n}"><u></u><u></u><u></u></i>`).join('')}</span>`).join('')
    + '</div>', 'Ô nhạt là kỹ năng cần bù; chương trình ưu tiên ô ảnh hưởng tới việc phối hợp.');
}

/* ------------------------------------------------------------------ *
 * Topic screens
 * ------------------------------------------------------------------ */
// One-page marketing plan.
export function planCanvas(hot = 2) {
  const b = [['target', 'Mục tiêu', '60 đơn quà tặng doanh nghiệp / quý'], ['users', 'Khách hàng', 'Phòng nhân sự công ty 50–300 người'],
    ['route', 'Vai trò kênh', 'Tìm kiếm đón nhu cầu, mạng xã hội nhắc lại'], ['page', 'Nội dung', 'Mẫu hộp quà, bảng giá, dự án'],
    ['wallet', 'Ngân sách thử', 'Chia theo vai trò kênh'], ['chart', 'Chỉ số', 'Lead phù hợp, đơn, chi phí mỗi đơn']];
  return box(H + 'ke-hoach', 'Kế hoạch một trang (bài mẫu)', 'layers', `<div class="trm-canvas">${b.map(([ic, t, d], i) =>
    `<span${i === hot ? ' class="is-on"' : ''}>${icon(ic)}<b>${t}</b><em>${esc(d)}</em></span>`).join('')}</div>`);
}

export function keywordGroups(hot = 1) {
  const g = [['Mua ngay', ['nến thơm quà tặng giá', 'mua hộp quà nến'], 'is-ok'], ['Tìm hiểu', ['nến thơm loại nào tốt', 'nến sáp đậu nành là gì'], ''],
    ['Doanh nghiệp', ['quà tặng doanh nghiệp in logo', '[hộp quà tết công ty]'], 'is-ok'], ['Loại trừ', ['-cách làm nến', '-miễn phí'], 'is-bad']];
  return box(H + 'tu-khoa', 'Nhóm từ khóa theo ý định (bài mẫu)', 'search', '<div class="trm-kw">'
    + g.map(([t, kws, c], i) => `<span class="trm-kg${i === hot ? ' is-on' : ''}"><b>${t}</b>${kws.map(k => chip(k, c)).join('')}</span>`).join('')
    + '</div>', 'Dấu [ ] là đối sánh chính xác, dấu − là từ khóa phủ định (Google Ads).');
}

export function eventPlan(hot = 1) {
  const r = [['page_view', 'Tự động', '—', 'ok'], ['form_start', 'Nhập trường đầu tiên', 'form_id', 'ok'], ['generate_lead', 'Máy chủ nhận form', 'form_id, value', 'warn'],
    ['click_call', 'Bấm nút Gọi', 'vi_tri', 'ok']];
  return box(H + 'ke-hoach-su-kien', 'Kế hoạch sự kiện (bài mẫu)', 'table', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Sự kiện</i><i>Khi nào ghi</i><i>Tham số</i><i>Kiểm tra</i></span>'
    + r.map(([e, w, p, s], i) => `<span class="wsm-tr${i === hot + 1 ? ' is-hi' : ''}"><i><code>${e.replace(/_/g, '_<wbr>')}</code></i><i>${w}</i><i>${p}</i>`
      + `<i>${chip(s === 'ok' ? 'Đã thấy' : 'Đang thử', 'is-' + s)}</i></span>`).join('') + '</div>',
  'Tên sự kiện đề xuất theo Google Analytics; click_call là sự kiện tự đặt.');
}

// DebugView-like stream: what one test device sent, second by second.
export function debugStream(hot = 2) {
  const ev = [['00:01', 'page_view', 'page_location: /qua-tang'], ['00:14', 'scroll', 'percent_scrolled: 90'], ['00:31', 'form_start', 'form_id: bao-gia'],
    ['00:52', 'generate_lead', 'form_id: bao-gia · value: 1']];
  return box(H + 'kiem-tra-su-kien', 'Luồng sự kiện của máy thử (mô phỏng)', 'bolt', '<div class="trm-stream">'
    + ev.map(([t, e, p], i) => `<span class="${i === hot ? 'is-on' : ''}"><i>${t}</i><b><code>${e}</code></b><em>${esc(p)}</em></span>`).join('')
    + '</div>', 'Thử cả khi không nên ghi: form lỗi không được sinh generate_lead.');
}

// Tag Manager idea: a tag fires when its trigger matches, reading variables.
export function tagSetup(hot = 1) {
  const c = [['code', 'Thẻ', 'Gửi sự kiện generate_lead'], ['bolt', 'Trình kích hoạt', 'Khi form gửi thành công'], ['sliders', 'Biến', 'form_id = bao-gia']];
  return box(H + 'the-kich-hoat', 'Thẻ · trình kích hoạt · biến (bài mẫu)', 'layers', `<div class="wsm-envs">${c.map(([ic, t, d], i) =>
    `<span class="wsm-env${i === hot ? ' is-on' : ''}">${icon(ic)}<b>${t}</b><em>${d}</em></span>`).join(`<i class="wsm-arr">${icon('arrow')}</i>`)}</div>`,
  'Xem trước trong chế độ gỡ lỗi trước khi xuất bản thay đổi.');
}

export function promptCard() {
  return box(H + 'ai-yeu-cau', 'Yêu cầu có nguồn + bản nháp', 'spark', '<div class="trm-ai"><div class="trm-prompt">'
    + '<small>YÊU CẦU</small><p>Viết 3 tiêu đề cho trang hộp quà Tết. Chỉ dùng thông tin trong bảng sản phẩm đính kèm. Không nêu giá nếu bảng không có.</p>'
    + `<span>${chip('Nguồn: bảng sản phẩm.xlsx', 'is-ok')}${chip('Giọng: thân thiện, ngắn')}</span></div>`
    + '<div class="trm-draft"><small>BẢN NHÁP</small>'
    + '<p>Hộp quà 3 nến sáp đậu nành, <mark class="is-ok">in thiệp tên</mark> theo yêu cầu.</p>'
    + '<p>Quà Tết cho đội ngũ, <mark class="is-bad">giao toàn quốc trong 24 giờ</mark>.</p>'
    + `<em>${icon('alert')}Câu 2 có thông tin không có trong nguồn: cần kiểm chứng hoặc bỏ.</em></div></div>`);
}

export function workflow(hot = 2) {
  const n = [['bolt', 'Khi có lead mới'], ['sliders', 'Có số điện thoại?'], ['users', 'Tạo hồ sơ CRM'], ['bell', 'Báo nhân viên']];
  return box(H + 'luong-tu-dong', 'Luồng tự động (bài mẫu)', 'repeat', `<div class="wsm-flow">${n.map(([ic, t], i) =>
    `<span class="wsm-fn${i === 1 ? ' is-q' : ''}${i === hot ? ' is-on' : ''}">${icon(ic)}${t}</span>`).join(`<i class="wsm-arr">${icon('arrow')}</i>`)}</div>`
    + `<div class="wsm-fork">${chip('Không → gửi email xin bổ sung', 'is-warn')}${chip('Lỗi CRM → thử lại, báo quản trị', 'is-bad')}</div>`,
  'Thử sự kiện trùng và thiếu dữ liệu trước khi coi luồng hoàn tất.');
}

export function contentBrief() {
  const r = [['Người đọc', 'Phòng nhân sự chọn quà Tết cho 100 nhân viên'], ['Câu hỏi', 'Chọn quà thế nào để hợp nhiều người?'],
    ['Ý chính', 'Mùi nhẹ, in tên, giao theo danh sách'], ['Bằng chứng', 'Ảnh thật, dự án đã được phép công bố'], ['Hành động', 'Tải bảng giá, nhận mẫu thử']];
  return box(H + 'brief', 'Brief nội dung (bài mẫu)', 'file', '<div class="trm-brief">'
    + r.map(([k, v]) => `<span><small>${k}</small><b>${esc(v)}</b></span>`).join('') + '</div>');
}

export function calendar(hot = 2) {
  const d = [['T2', 'Mẹo chọn mùi', 'Bài ảnh', 'ok'], ['T3', '', '', ''], ['T4', 'Hậu trường xưởng', 'Video ngắn', 'ok'], ['T5', 'Hỏi đáp khách', 'Bài chữ', 'warn'],
    ['T6', 'Dự án quà Tết', 'Album', 'n'], ['T7', '', '', ''], ['CN', 'Trả lời bình luận', 'Trực', 'ok']];
  return box(H + 'lich-noi-dung', 'Lịch nội dung một tuần (bài mẫu)', 'calendar', '<div class="trm-cal">'
    + d.map(([day, t, f, s], i) => `<span class="${i === hot ? 'is-on' : ''}${t ? '' : ' is-empty'}"><i>${day}</i>${t ? `<b>${t}</b><em>${f}</em>${chip({ok: 'Đã duyệt', warn: 'Chờ duyệt', n: 'Nháp'}[s], 'is-' + s)}` : '<em>—</em>'}</span>`).join('')
    + '</div>');
}

export function seoAudit(hot = 1) {
  const r = [['Tiêu đề trang trùng nhau', 'Cao', '12 trang dùng "Nhà Thơm"', 'bad'], ['Ảnh không có văn bản thay thế', 'Vừa', '34 ảnh sản phẩm', 'warn'],
    ['Trang dịch vụ thiếu liên kết nội bộ', 'Vừa', 'Không có đường từ blog', 'warn'], ['Sơ đồ trang chưa gửi', 'Thấp', 'Search Console', 'n']];
  return box(H + 'audit-seo', 'Phát hiện khi rà soát (bài mẫu)', 'search', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Vấn đề</i><i>Mức</i><i>Bằng chứng</i><i>Hướng sửa</i></span>'
    + r.map(([t, l, e, s], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${t}</i><i>${chip(l, 'is-' + s)}</i><i>${e}</i><i>Có</i></span>`).join('')
    + '</div>', 'Mỗi phát hiện có bằng chứng và hướng sửa, không chỉ liệt kê từ khóa.');
}

// Short video storyboard, four beats.
export function storyboard(hot = 0) {
  const f = [['s6', 'Mở đầu', 'Câu hỏi đúng nhu cầu'], ['s3', 'Demo', 'Đốt nến, cận cảnh'], ['s-tall', 'Bằng chứng', 'Khách thật, được phép'], ['s1', 'Kết', 'Một hành động']];
  return box(H + 'kich-ban-video', 'Kịch bản video ngắn (bài mẫu)', 'video', `<div class="trm-board">${f.map(([p, t, d], i) =>
    `<span class="${i === hot ? 'is-on' : ''}">${img(p, 'r45')}<i>${i + 1}</i><b>${t}</b><em>${d}</em></span>`).join('')}</div>`,
  'Lời thoại, chữ trên video và phụ đề nói cùng một thông điệp.');
}

// Objective picker used in the ads courses: business goal → objective.
export function objectiveMap(rows, hot = 1) {
  return box(H + 'muc-tieu', 'Mục tiêu kinh doanh → mục tiêu chiến dịch', 'target', '<div class="trm-obj">'
    + rows.map(([g, o, m], i) => `<span class="${i === hot ? 'is-on' : ''}"><b>${esc(g)}</b><i>${icon('arrow')}</i><strong>${esc(o)}</strong><em>Đo: ${esc(m)}</em></span>`).join('')
    + '</div>');
}

// A page review sheet for website marketing.
export function pageReview(hot = 1) {
  const r = [['Thông điệp', 'Tiêu đề nói rõ bán gì cho ai', 'ok'], ['Hành động', 'Nút chính hiện ở màn hình đầu', 'warn'],
    ['Form', 'Báo lỗi tại trường, có xác nhận', 'bad'], ['Đo lường', 'Có sự kiện gửi thành công', 'warn']];
  return box(H + 'danh-gia-trang', 'Phiếu đánh giá trang đích (bài mẫu)', 'eye', '<div class="trm-review">'
    + r.map(([k, v, s], i) => `<span class="${i === hot ? 'is-on' : ''}"><b>${k}</b><em>${v}</em>${chip({ok: 'Đạt', warn: 'Cần sửa', bad: 'Lỗi'}[s], 'is-' + s)}</span>`).join('') + '</div>');
}

// Workshop output: the action plan the team leaves with.
export function actionPlan(hot = 0) {
  const r = [['Viết lại trang dịch vụ quà Tết', 'Lan · Nội dung', '2 tuần', 'Trang mới đo được form'], ['Tách chiến dịch tìm kiếm theo ý định', 'Hùng · Quảng cáo', '1 tuần', 'Báo cáo truy vấn'],
    ['Thêm câu phân loại vào form', 'Mai · Website', '3 ngày', 'Lead phù hợp trong CRM']];
  return box(H + 'ke-hoach-ap-dung', 'Kế hoạch áp dụng 30 ngày (mẫu)', 'flag', '<div class="wsm-table is-4">'
    + '<span class="wsm-tr is-head"><i>Việc</i><i>Người làm</i><i>Hạn</i><i>Cách kiểm tra</i></span>'
    + r.map(([a, b, c, d], i) => `<span class="wsm-tr${i === hot ? ' is-hi' : ''}"><i>${a}</i><i>${b}</i><i>${c}</i><i>${d}</i></span>`).join('') + '</div>');
}

// Mobile view of a lesson for learners on their phone.
export const lessonPhone = (title, steps) => phone(`<div class="wsm-pnav">${icon('back')}<b>${esc(title)}</b></div>`
  + `${img('s-desk', 'r169')}<div class="wsm-pbody">`
  + steps.map((t, i) => `<span class="trm-pstep${i === 0 ? ' is-done' : i === 1 ? ' is-on' : ''}"><i>${i === 0 ? icon('check') : i + 1}</i>${esc(t)}</span>`).join('')
  + '<i class="wsm-btn">Nộp bài thực hành</i></div>');
