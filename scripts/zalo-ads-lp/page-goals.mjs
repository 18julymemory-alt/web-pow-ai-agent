// Zalo Ads landing page 02 — "Chọn cách chạy".
// Same frame as the Google, Facebook and TikTok page 02: sticky chapter
// index, big chapter numbers and the list | text | light-stage workbench.
// Each objective opens on the screen the tap leads to; pricing and
// preparation stay behind "Đọc tiếp".

import {SOURCES, OBJECTIVES, READINESS, AUDIENCES, FAMILIES} from './data.mjs';
import {AFTER_CLICK, STAGE_AD} from './mocks.mjs';
import {esc, section, stepsBar, nextBlock, sourceList, icon, ZL_PAGES} from '../google-ads-lp/shared.mjs';
import {chapter, toc, workbench, facts, note, SIGNALS} from '../google-ads-lp/scenes.mjs';
import {heroBlock, recapLinks} from '../google-ads-lp/panel-kit.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu Zalo Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu Zalo Ads:'});

/* ------------------------------------------------------------------ *
 * Hero — the five readiness stages as a CSS-3D ladder
 * ------------------------------------------------------------------ */
function hero() {
  const rungs = READINESS.map((r, i) => `<div class="rung3d" data-step="${i}" data-stage="${r.id}">`
    + `<span class="r3-ico">${icon(r.icon)}</span>`
    + `<b>${esc(r.name)}</b><span>${esc(r.run)}</span></div>`).join('');

  return heroBlock({
    crumb: 'Chọn cách chạy',
    eyebrow: 'POWAI / ZALO ADS · 02',
    title: 'Chọn cách chạy',
    sub: 'Bắt đầu từ <em>nơi khách cần tới</em> sau khi bấm.',
    lead: 'Trên Zalo Ads, hình thức quảng cáo quyết định khách đi đâu: trang OA, website, form, cuộc trò chuyện hay trang đặt hàng. '
      + 'Trang này đi từ sáu mục tiêu, tới quảng cáo hợp với từng mức sẵn sàng của khách và cách chọn đối tượng.',
    primary: ['#muc-tieu', 'Xem sáu mục tiêu'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: `<div class="hero-stage" aria-hidden="true"><div class="ladder3d" id="heroStack">${rungs}</div></div>`
  });
}

/* ------------------------------------------------------------------ *
 * 01 — Objectives: each opens on the screen after the tap
 * ------------------------------------------------------------------ */
function chapterGoals() {
  const items = OBJECTIVES.map(o => ({
    key: 'goal-' + o.id,
    label: o.title,
    icon: o.icon,
    body: `<h4>${esc(o.title)}</h4>`
      + facts([
        ['Hình thức', o.format],
        ['Khách đi đâu sau khi bấm', o.where],
        ['Tính phí theo', o.pricing],
        ['Cần chuẩn bị', o.needs]
      ]),
    stage: AFTER_CLICK[o.id](),
    tag: 'SAU KHI BẤM',
    cap: 'Màn hình khách thấy sau khi chạm vào quảng cáo. Nội dung là mẫu của Nhà Thơm.'
  }));

  return chapter({
    id: 'muc-tieu', num: 1, eyebrow: 'SÁU MỤC TIÊU',
    title: 'Bạn muốn khách làm gì sau khi bấm?',
    lead: 'Mỗi mục tiêu đi với một hình thức quảng cáo và một nơi khách đến. Chọn một mục tiêu để xem màn hình sau khi bấm.',
    body: workbench(items)
      + note({
        label: 'CHỌN MỤC TIÊU QUẢNG CÁO', ic: 'target',
        text: 'Bước đầu tiên khi tạo quảng cáo là chọn mục tiêu; hình thức và cách tính phí đi theo lựa chọn đó. '
          + 'Tên mục tiêu trong công cụ có thể khác cách gọi ở đây: đọc mô tả của từng mục tiêu trước khi chọn.',
        extra: src(['setup', 'formats', 'pricing'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Readiness: the ad a person at each stage should see
 * ------------------------------------------------------------------ */
const HEAT = ['#88e4ff', '#9bcaff', '#e0cd9b', '#ffbd80', '#85e1c1'];

function chapterReadiness() {
  const heat = '<div class="sc-heat rv" aria-hidden="true">'
    + READINESS.map((r, i) => `<span style="--c:${HEAT[i]};--i:${i}"><i>${icon(r.icon)}</i><b>${esc(r.name)}</b></span>`).join('')
    + `<em class="sc-heat-who">${icon('person')}</em></div>`;

  const items = READINESS.map((r, i) => ({
    key: 'stage-' + r.id,
    label: r.name,
    icon: r.icon,
    dot: '<span class="wb-heat" aria-hidden="true">'
      + READINESS.map((_, j) => `<i${j <= i ? ` style="background:${HEAT[i]}"` : ''}></i>`).join('') + '</span>',
    body: `<h4>${esc(r.name)}</h4><p class="wb-sub">${esc(r.state)}</p>`
      + facts([
        ['Việc cần làm', r.aim],
        ['Cách chạy', r.run],
        ['Nội dung nên đưa', r.content],
        ['Lời kêu gọi', r.cta]
      ]),
    stage: STAGE_AD[r.id](),
    tag: 'QUẢNG CÁO MẪU',
    cap: 'Quảng cáo hợp với người đang ở mức này.'
  }));

  return chapter({
    id: 'hanh-trinh', num: 2, eyebrow: 'MỨC ĐỘ SẴN SÀNG',
    title: 'Cùng một người, khác lúc, cần một quảng cáo khác.',
    lead: 'Chọn một mức để xem người đó nên thấy quảng cáo nào.',
    body: heat + workbench(items)
      + note({
        label: 'MỖI MỨC MỘT VIỆC', ic: 'route',
        text: 'Mỗi quảng cáo chỉ cần đưa người xem sang mức kế tiếp. '
          + 'Người đã gửi form, đã nhắn tin hay đã mua được gom lại thành nhóm đối tượng để nói tiếp. '
          + 'ZNS (tin thông báo gửi qua Zalo cho khách đã có giao dịch) là dịch vụ riêng, không phải quảng cáo.',
        extra: src(['audience', 'zns'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 03 — Audiences: ten ways, three families
 * ------------------------------------------------------------------ */
const sg = (inner, cls) => `<div class="sg ${cls}" data-anim>${inner}</div>`;
const arrow = label => `<span class="sg-arrow"><i>${icon('arrow')}</i><small>${esc(label)}</small></span>`;
const people = (n, on = n, cls = '') => `<span class="sg-people${cls ? ' ' + cls : ''}">`
  + Array.from({length: n}, (_, i) => `<i class="${i < on ? 'is-on' : ''}" style="--i:${i}">${icon('person')}</i>`).join('')
  + '</span>';
const tagOut = text => `<span class="sg-tagout">${icon('users')}${esc(text)}</span>`;
const trail = steps => '<div class="sg-trail">'
  + steps.map(([t, ic], i) => `<span class="sg-step" style="--i:${i}"><i>${icon(ic)}</i><b>${esc(t)}</b></span>`).join('')
  + '</div>';
const pills = (label, list, cap) => sg(`<div class="sg-demo"><small>${esc(label)}</small><div class="sg-ages">`
  + list.map(([t, on]) => `<span class="${on ? 'is-on' : 'is-unk'}">${icon(on ? 'check' : 'minus')}${esc(t)}</span>`).join('')
  + `</div><p class="sg-cap">${esc(cap)}</p></div>`, 'is-demo');

const AUD_STAGE = {
  location: () => sg('<div class="tta-map">'
    + '<span class="tta-ring"></span><span class="tta-ring is-in"></span>'
    + `<span class="tta-pin">${icon('pin')}</span><small>TP.HCM · Hà Nội</small></div>`
    + '<p class="sg-cap">Chỉ người ở tỉnh thành đã chọn mới thấy quảng cáo.</p>', 'is-tt-loc'),
  gender: () => pills('Giới tính', [['Nữ', 1], ['Nam', 0]], 'Chỉ khóa giới tính khi sản phẩm dành rõ cho một nhóm.'),
  age: () => pills('Độ tuổi', [['18–24', 0], ['25–34', 1], ['35–44', 1], ['45+', 0]],
    'Khoảng tuổi mẫu. Khoảng chia thật chọn trong công cụ.'),
  interest: () => SIGNALS.affinity(),
  platform: () => pills('Nền tảng', [['Điện thoại', 1], ['Máy tính', 0]], 'Danh sách nền tảng thật chọn trong công cụ.'),
  phones: () => sg('<div class="sg-sheet"><div class="sg-sheet-h"><span>Điện thoại</span><span>Nhóm</span></div>'
    + [['09•• ••• 218', 'Khách cũ'], ['08•• ••• 540', 'Khách cũ'], ['03•• ••• 771', 'Khách cũ']]
      .map(([p, g]) => `<div><span>${p}</span><span>${g}</span></div>`).join('')
    + '</div>' + tagOut('Tệp số điện thoại · tối đa 10 MB'), 'is-customer'),
  formmanage: () => sg(trail([['Thấy quảng cáo', 'eye'], ['Mở form', 'form'], ['Đã gửi', 'send']]) + tagOut('Nhóm: người đã gửi form'), 'is-visitor'),
  messaged: () => sg(trail([['Bấm Nhắn tin', 'tap'], ['Nhận lời chào', 'chat'], ['Đã hỏi giá', 'send']]) + tagOut('Nhóm: người đã nhắn tin'), 'is-visitor'),
  lookalike: () => sg('<div class="sg-col is-chips">'
    + `<span class="sg-chip" style="--i:0">${icon('table')}Nguồn: 1.000–10.000 số đang hoạt động</span></div>`
    + arrow('Zalo Ads tìm người có điểm giống') + people(6, 4, 'is-grid'), 'is-custom'),
  saved: () => sg('<div class="sg-col is-chips">'
    + [['TP.HCM', 'pin'], ['Nữ 25–44', 'person'], ['Trang trí nhà', 'heart']]
      .map(([t, ic], i) => `<span class="sg-chip" style="--i:${i}">${icon(ic)}${esc(t)}</span>`).join('')
    + '</div>' + tagOut('Đã lưu: Nhà Thơm · khách nữ TP.HCM'), 'is-visitor')
};

function chapterAudiences() {
  const items = AUDIENCES.map(a => ({
    key: 'aud-' + a.id,
    label: a.title,
    icon: a.icon,
    group: FAMILIES[a.family][0],
    groupColor: FAMILIES[a.family][1],
    body: `<h4>${esc(a.title)}</h4><p class="wb-sub">${esc(a.text)}</p>`
      + facts([['Dùng khi', a.use]]),
    stage: AUD_STAGE[a.id](),
    tag: 'DẤU HIỆU',
    cap: 'Minh họa loại dấu hiệu Zalo Ads dùng, không phải số liệu thật.'
  }));

  return chapter({
    id: 'doi-tuong', num: 3, eyebrow: 'MƯỜI CÁCH CHỌN ĐỐI TƯỢNG',
    title: 'Khóa điều bắt buộc, dùng dữ liệu của bạn cho phần còn lại.',
    lead: 'Có điều kiện là giới hạn cứng, có điều kiện chỉ là gợi ý. Dữ liệu khách của chính doanh nghiệp thường cho nhóm chính xác nhất.',
    body: workbench(items, {cls: 'is-aud'})
      + note({
        label: 'ĐIỀU KIỆN ÁP DỤNG', ic: 'shield', tone: 'warn',
        text: 'Danh sách số điện thoại không dùng chung được với điều kiện nhân khẩu học (tuổi, giới tính). '
          + 'Chỉ tải lên số khách đã đồng ý nhận thông tin. '
          + 'Đối tượng tương tự cần nhóm nguồn đủ lớn; danh sách sở thích và nền tảng thật xem trong công cụ.',
        extra: src(['audience'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Recap
 * ------------------------------------------------------------------ */
function chapterRecap() {
  const items = [
    ['Chọn mục tiêu', 'Sáu mục tiêu, mỗi mục tiêu một nơi khách đến.', '#muc-tieu', 'target'],
    ['Chia theo mức sẵn sàng', 'Năm mức, mỗi mức một quảng cáo khác nhau.', '#hanh-trinh', 'route'],
    ['Chọn đúng đối tượng', 'Khóa khu vực, dùng dữ liệu khách của bạn.', '#doi-tuong', 'users']
  ];

  return chapter({
    id: 'tom-tat', num: 4, eyebrow: 'TÓM TẮT',
    title: 'Ba câu hỏi trước khi dựng quảng cáo.',
    body: `<div class="recap rv">${recapLinks(items)}</div>`
      + nextBlock({
        eyebrow: 'TIẾP THEO · ' + ZL_PAGES[2].num,
        title: ZL_PAGES[2].label,
        text: ZL_PAGES[2].hint,
        href: ZL_PAGES[2].href,
        cta: 'Xem chi phí & hiệu quả'
      })
      + src(['setup', 'audience'])
  });
}

export function goalsPage() {
  const index = toc([
    ['muc-tieu', 'Mục tiêu'],
    ['hanh-trinh', 'Mức độ sẵn sàng'],
    ['doi-tuong', 'Đối tượng'],
    ['tom-tat', 'Tóm tắt']
  ], 'Mục lục Chọn cách chạy');

  return hero() + stepsBar('goals', ZL_PAGES, STEPS_LABEL)
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterGoals() + chapterReadiness() + chapterAudiences() + chapterRecap()
    });
}

export const goalsMeta = {
  title: 'Zalo Ads: chọn cách chạy theo mục tiêu',
  description: 'Sáu mục tiêu quảng cáo Zalo, năm mức sẵn sàng của khách và mười cách chọn đối tượng '
    + '— chọn cách chạy từ nơi khách cần tới sau khi bấm.'
};
