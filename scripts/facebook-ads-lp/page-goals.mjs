// Facebook Ads landing page 02 — "Chọn cách chạy".
// Same frame as the Google Ads page 02: sticky chapter index, big chapter
// numbers and the list | text | light-stage workbench. Each objective opens on
// the screen the tap leads to; the longer copy stays behind "Đọc tiếp".

import {SOURCES, OBJECTIVES, READINESS, AUDIENCES, FAMILIES} from './data.mjs';
import {AFTER_CLICK, STAGE_AD} from './mocks.mjs';
import {esc, section, stepsBar, nextBlock, sourceList, icon, FB_PAGES} from '../google-ads-lp/shared.mjs';
import {chapter, toc, workbench, facts, note, SIGNALS} from '../google-ads-lp/scenes.mjs';
import {heroBlock, recapLinks} from '../google-ads-lp/panel-kit.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu Facebook Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu Meta:'});

/* ------------------------------------------------------------------ *
 * Hero — the five readiness stages as a CSS-3D ladder
 * ------------------------------------------------------------------ */
function hero() {
  const rungs = READINESS.map((r, i) => `<div class="rung3d" data-step="${i}" data-stage="${r.id}">`
    + `<span class="r3-ico">${icon(r.icon)}</span>`
    + `<b>${esc(r.name)}</b><span>${esc(r.run)}</span></div>`).join('');

  return heroBlock({
    crumb: 'Chọn cách chạy',
    eyebrow: 'POWAI / FACEBOOK ADS · 02',
    title: 'Chọn cách chạy',
    sub: 'Bắt đầu từ <em>việc khách cần làm</em> sau khi thấy quảng cáo.',
    lead: 'Meta tối ưu theo mục tiêu bạn chọn. Trang này đi từ sáu mục tiêu chiến dịch, '
      + 'tới quảng cáo hợp với từng mức sẵn sàng của khách và cách nhắm đối tượng.',
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
        ['Tối ưu cho', o.optimise],
        ['Khách đi đâu sau khi bấm', o.where],
        ['Đo điều gì', o.measure],
        ['Cần chuẩn bị', o.needs]
      ]),
    stage: AFTER_CLICK[o.id](),
    tag: 'SAU KHI BẤM',
    cap: 'Màn hình khách thấy sau khi chạm vào quảng cáo. Nội dung là mẫu của Nhà Thơm.'
  }));

  return chapter({
    id: 'muc-tieu', num: 1, eyebrow: 'SÁU MỤC TIÊU',
    title: 'Bạn muốn Meta tìm người làm gì?',
    lead: 'Mục tiêu chiến dịch cho Meta biết cần tìm ai. Chọn một mục tiêu để xem khách sẽ đi đâu sau khi bấm.',
    body: workbench(items)
      + note({
        label: 'ADVANTAGE+', ic: 'auto',
        text: 'Advantage+ là nhóm tính năng để Meta tự chọn đối tượng, vị trí hoặc nội dung. '
          + 'Chiến dịch Advantage+ bật sẵn nhiều phần tự động. Nó chỉ tốt khi sự kiện đo đã đúng, '
          + 'vì hệ thống tối ưu theo đúng con số bạn gửi.',
        extra: src(['advPlus', 'advCampaign', 'objectives', 'perfGoals'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Readiness: the ad a person at each stage should see
 * ------------------------------------------------------------------ */
const HEAT = ['#8ec5ff', '#85e1c1', '#e0cd9b', '#ffbd80', '#c0a2ff'];

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
    title: 'Cùng một người, khác lúc, cần một lời mời khác.',
    lead: 'Chọn một mức để xem người đó nên thấy quảng cáo nào.',
    body: heat + workbench(items)
      + note({
        label: 'MỖI MỨC MỘT VIỆC', ic: 'route',
        text: 'Mỗi quảng cáo chỉ cần đưa người xem sang mức kế tiếp. '
          + 'Nhóm người đã quan tâm, đã nhắn tin hay đã mua được tạo từ đối tượng tùy chỉnh.',
        extra: src(['custom', 'placements'])
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

const AUD_STAGE = {
  location: () => sg('<div class="fba-map">'
    + '<span class="fba-ring"></span><span class="fba-ring is-in"></span>'
    + `<span class="fba-pin">${icon('store')}</span><small>Bán kính 5 km quanh cửa hàng</small></div>`
    + '<p class="sg-cap">Người đang sống hoặc vừa ở trong vùng này mới thấy quảng cáo.</p>', 'is-fb-loc'),
  age: () => sg('<div class="sg-demo"><small>Độ tuổi</small><div class="sg-ages">'
    + [['13–17', 0], ['18–24', 1], ['25–34', 1], ['35–44', 1], ['45–54', 1], ['55–64', 1], ['65+', 1]]
      .map(([t, on]) => `<span class="${on ? 'is-on' : 'is-unk'}">${icon(on ? 'check' : 'lock')}${t}</span>`).join('')
    + '</div><p class="sg-cap">Độ tuổi tối thiểu là giới hạn cứng: người nhỏ hơn mức đặt không thấy quảng cáo.</p></div>', 'is-demo'),
  detailed: () => SIGNALS.affinity(),
  advantage: () => sg('<div class="sg-col is-chips">'
    + ['Trang trí nhà', 'Nến thơm', 'Nữ 25–44', 'TP.HCM']
      .map((t, i) => `<span class="sg-chip" style="--i:${i}">${icon(i < 2 ? 'heart' : i === 2 ? 'person' : 'pin')}${esc(t)}</span>`).join('')
    + '</div>' + arrow('Gợi ý là điểm bắt đầu') + people(6, 6, 'is-grid'), 'is-custom'),
  customer: () => SIGNALS.customer(),
  visitor: () => SIGNALS.visitor(),
  engager: () => sg(trail([['Thích bài', 'like'], ['Bình luận', 'chat'], ['Lưu bài', 'star']]) + tagOut('Nhóm: tương tác với Trang 90 ngày'), 'is-visitor'),
  viewer: () => SIGNALS.viewer(),
  messager: () => sg(trail([['Mở chat', 'chat'], ['Hỏi giá', 'tag'], ['Chưa đặt', 'close']]) + tagOut('Nhóm: đã nhắn tin cho Trang'), 'is-visitor'),
  lookalike: () => sg('<div class="sg-col is-chips">'
    + `<span class="sg-chip" style="--i:0">${icon('table')}Nguồn: 800 khách đã mua</span></div>`
    + arrow('Meta tìm người có điểm giống') + people(6, 4, 'is-grid'), 'is-custom')
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
    cap: 'Minh họa loại dấu hiệu Meta dùng, không phải số liệu thật.'
  }));

  return chapter({
    id: 'doi-tuong', num: 3, eyebrow: 'MƯỜI CÁCH NHẮM ĐỐI TƯỢNG',
    title: 'Khóa điều bắt buộc, gợi ý phần còn lại.',
    lead: 'Meta không bán danh sách khách. Có điều kiện là giới hạn cứng, có điều kiện chỉ là gợi ý để hệ thống bắt đầu.',
    body: workbench(items, {cls: 'is-aud'})
      + note({
        label: 'ĐIỀU KIỆN ÁP DỤNG', ic: 'shield', tone: 'warn',
        text: 'Danh sách khách hàng chỉ dùng được khi doanh nghiệp có quyền dùng dữ liệu đó và chấp nhận điều khoản. '
          + 'Người vào website cần Pixel hoặc Conversions API đã cài. '
          + 'Một số ngành bị giới hạn cách nhắm theo tuổi, giới tính hoặc sở thích.',
        extra: src(['controls', 'advAudience', 'custom', 'lookalike'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Recap
 * ------------------------------------------------------------------ */
function chapterRecap() {
  const items = [
    ['Chọn mục tiêu', 'Sáu mục tiêu, mỗi mục tiêu một màn hình sau khi bấm.', '#muc-tieu', 'target'],
    ['Chia theo mức sẵn sàng', 'Năm mức, mỗi mức một quảng cáo khác nhau.', '#hanh-trinh', 'route'],
    ['Nhắm đúng mức', 'Khóa khu vực và độ tuổi, còn lại để hệ thống học.', '#doi-tuong', 'users']
  ];

  return chapter({
    id: 'tom-tat', num: 4, eyebrow: 'TÓM TẮT',
    title: 'Ba câu hỏi trước khi dựng chiến dịch.',
    body: `<div class="recap rv">${recapLinks(items)}</div>`
      + nextBlock({
        eyebrow: 'TIẾP THEO · ' + FB_PAGES[2].num,
        title: FB_PAGES[2].label,
        text: FB_PAGES[2].hint,
        href: FB_PAGES[2].href,
        cta: 'Xem chi phí & hiệu quả'
      })
      + src(['objectives', 'controls'])
  });
}

export function goalsPage() {
  const index = toc([
    ['muc-tieu', 'Mục tiêu'],
    ['hanh-trinh', 'Mức độ sẵn sàng'],
    ['doi-tuong', 'Đối tượng'],
    ['tom-tat', 'Tóm tắt']
  ], 'Mục lục Chọn cách chạy');

  return hero() + stepsBar('goals', FB_PAGES, STEPS_LABEL)
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterGoals() + chapterReadiness() + chapterAudiences() + chapterRecap()
    });
}

export const goalsMeta = {
  title: 'Facebook Ads: chọn cách chạy theo mục tiêu',
  description: 'Sáu mục tiêu chiến dịch của Meta, năm mức sẵn sàng của khách và mười cách nhắm đối tượng '
    + 'trên Facebook, Instagram — chọn cách chạy từ việc khách cần làm sau khi thấy quảng cáo.'
};
