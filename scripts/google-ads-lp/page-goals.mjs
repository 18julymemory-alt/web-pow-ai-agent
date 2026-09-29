// Landing page 02 — "Chọn cách chạy".
// Same frame as page 01: a sticky chapter index, big chapter numbers and the
// list | text | light-stage workbench. Every choice shows the surface or the
// signal it is about; the longer copy stays on the page behind "Đọc tiếp".

import {goals, funnel, segments, sources} from '../../dist/google-ads-experience-data.js';
import {
  esc, crumbs, kicker, section, stepsBar, nextBlock, sourceList, mock, icon, PAGES
} from './shared.mjs';
import {
  chapter, toc, workbench, facts, note, formScreen, bookingScreen, priceSearch, reminderScreen,
  mailScreen, SIGNALS
} from './scenes.mjs';
import {renderMock} from './mocks.mjs';
import {heroBlock, recapLinks} from './panel-kit.mjs';

const STAGE_ICONS = {cold: 'play', warm: 'creative', hot: 'search', lead: 'form', customer: 'cart'};

/* ------------------------------------------------------------------ *
 * Hero — a CSS-3D ladder previewing chapter 02
 * ------------------------------------------------------------------ */
function hero() {
  const rungs = funnel.map(([id, name, , , , , campaign], i) => `<div class="rung3d" data-step="${i}" data-stage="${id}">`
    + `<span class="r3-ico">${icon(STAGE_ICONS[id] || 'dot')}</span>`
    + `<b>${esc(name)}</b><span>${esc(campaign)}</span></div>`).join('');

  return heroBlock({
    crumb: 'Chọn cách chạy',
    eyebrow: 'POWAI / GOOGLE ADS · 02',
    title: 'Chọn cách chạy',
    sub: 'Bắt đầu từ <em>mục tiêu kinh doanh</em>, không phải từ tên chiến dịch.',
    lead: 'Cùng một ngân sách có thể đi theo nhiều hướng. Trang này đi từ điều '
      + 'doanh nghiệp muốn nhận được, tới loại chiến dịch phù hợp và nhóm khách nên nhắm đến.',
    primary: ['#muc-tieu', 'Xem tám mục tiêu'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: `<div class="hero-stage" aria-hidden="true"><div class="ladder3d" id="heroStack">${rungs}</div></div>`
  });
}

/* ------------------------------------------------------------------ *
 * 01 — Goals: each goal opens on the screen the ad actually leads to
 * ------------------------------------------------------------------ */
const GOAL_STAGE = {
  call: () => renderMock('search-call'),
  lead: () => formScreen({done: false}),
  booking: () => bookingScreen(),
  purchase: () => renderMock('shop-cards'),
  traffic: () => renderMock('search-text'),
  promote: () => renderMock('dg-video'),
  remarketing: () => renderMock('disp-square'),
  awareness: () => renderMock('masthead')
};
const GOAL_ICONS = {
  call: 'phone', lead: 'form', booking: 'calendar', purchase: 'cart',
  traffic: 'page', promote: 'play', remarketing: 'repeat', awareness: 'eye'
};

function chapterGoals() {
  const items = goals.map(g => ({
    key: 'goal-' + g.id,
    label: g.title,
    icon: GOAL_ICONS[g.id] || 'target',
    body: `<h4>${esc(g.title)}</h4>`
      + facts([
        ['Loại chiến dịch', g.campaign],
        ['Lời kêu gọi trên quảng cáo', g.cta],
        ['Đo điều gì', g.measure],
        ['Doanh nghiệp cần chuẩn bị', g.needs]
      ]),
    stage: (GOAL_STAGE[g.id] || GOAL_STAGE.traffic)()
      + `<ol class="flow-chain row">${g.flow.map((s, j) => `<li><b>${String(j + 1).padStart(2, '0')}</b><span>${esc(s)}</span></li>`).join('')}</ol>`,
    cap: 'Màn hình khách nhìn thấy, bên dưới là các bước từ lúc thấy quảng cáo tới khi doanh nghiệp nhận kết quả.'
  }));

  return chapter({
    id: 'muc-tieu', num: 1, eyebrow: 'TÁM MỤC TIÊU',
    title: 'Doanh nghiệp muốn nhận được điều gì?',
    lead: 'Chọn một mục tiêu để xem khách sẽ thấy gì và loại chiến dịch nên dùng.',
    body: workbench(items)
      + note({
        label: 'LƯU Ý', ic: 'spark',
        text: 'Một mục tiêu có thể dùng nhiều loại chiến dịch, và một loại chiến dịch phục vụ được nhiều mục tiêu. '
          + 'Điều quyết định là dữ liệu, nội dung và điểm đến mà doanh nghiệp đang có, không phải tên gọi của chiến dịch.'
      })
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Readiness: the ad a person at each stage should see
 * ------------------------------------------------------------------ */
const STAGE_SCREEN = {
  cold: () => renderMock('vid-skip'),
  warm: () => renderMock('dg-single'),
  hot: () => priceSearch(),
  lead: () => reminderScreen(),
  customer: () => mailScreen()
};
const HEAT = ['#88e4ff', '#9fc9ff', '#e0cd9b', '#ffbd80', '#85e1c1'];

function chapterReadiness() {
  const heat = '<div class="sc-heat rv" aria-hidden="true">'
    + funnel.map(([id, name], i) => `<span style="--c:${HEAT[i]};--i:${i}"><i>${icon(STAGE_ICONS[id] || 'dot')}</i><b>${esc(name)}</b></span>`).join('')
    + `<em class="sc-heat-who">${icon('person')}</em></div>`;

  const items = funnel.map(([id, name, state, aim, content, cta, campaign], i) => ({
    key: 'stage-' + id,
    label: name,
    icon: STAGE_ICONS[id] || 'dot',
    dot: '<span class="wb-heat" aria-hidden="true">'
      + funnel.map((_, j) => `<i${j <= i ? ` style="background:${HEAT[i]}"` : ''}></i>`).join('') + '</span>',
    body: `<h4>${esc(name)}</h4><p class="wb-sub">${esc(state)}</p>`
      + facts([
        ['Việc cần làm', aim],
        ['Cách chạy', campaign],
        ['Nội dung nên đưa', content],
        ['Lời kêu gọi', cta]
      ]),
    stage: STAGE_SCREEN[id](),
    cap: 'Quảng cáo phù hợp với người đang ở mức này.'
  }));

  return chapter({
    id: 'hanh-trinh', num: 2, eyebrow: 'MỨC ĐỘ SẴN SÀNG',
    title: 'Cùng một người, khác thời điểm, cần một lời mời khác.',
    lead: 'Chọn một mức để xem người đó nên nhìn thấy quảng cáo nào.',
    body: heat + workbench(items)
      + note({
        label: 'MỖI MỨC MỘT VIỆC', ic: 'route',
        text: 'Mỗi mức chỉ cần đẩy người xem sang mức kế tiếp, không phải chốt đơn ngay từ lần hiển thị đầu tiên.'
      })
  });
}

/* ------------------------------------------------------------------ *
 * 03 — Audiences: nine signals, three families
 * ------------------------------------------------------------------ */
const FAMILY = {
  intent: ['Ý định tìm kiếm', '#88e4ff'],
  market: ['Ý định tìm kiếm', '#88e4ff'],
  affinity: ['Sở thích & nhân khẩu', '#c0a2ff'],
  custom: ['Sở thích & nhân khẩu', '#c0a2ff'],
  demo: ['Sở thích & nhân khẩu', '#c0a2ff'],
  customer: ['Dữ liệu của doanh nghiệp', '#85e1c1'],
  visitor: ['Dữ liệu của doanh nghiệp', '#85e1c1'],
  viewer: ['Dữ liệu của doanh nghiệp', '#85e1c1'],
  remarketing: ['Dữ liệu của doanh nghiệp', '#85e1c1']
};
const SEGMENT_ICONS = {
  intent: 'search', market: 'cart', affinity: 'heart', custom: 'need', demo: 'users',
  customer: 'table', visitor: 'page', viewer: 'play', remarketing: 'repeat'
};

function chapterAudiences() {
  const items = segments.map(([id, title, text, use]) => ({
    key: 'aud-' + id,
    label: title,
    icon: SEGMENT_ICONS[id] || 'target',
    group: FAMILY[id][0],
    groupColor: FAMILY[id][1],
    body: `<h4>${esc(title)}</h4><p class="wb-sub">${esc(text)}</p>`
      + facts([['Dùng khi', use]]),
    stage: SIGNALS[id] ? SIGNALS[id]() : '',
    tag: 'DẤU HIỆU',
    cap: 'Minh họa loại dấu hiệu Google dùng, không phải số liệu thật.'
  }));

  return chapter({
    id: 'doi-tuong', num: 3, eyebrow: 'CHÍN CÁCH NHẮM ĐỐI TƯỢNG',
    title: 'Nhắm ai, và nhắm bằng dấu hiệu gì.',
    lead: 'Google không bán danh sách khách hàng. Mỗi cách dựa trên một loại dấu hiệu khác nhau.',
    body: workbench(items, {cls: 'is-aud'})
      + note({
        label: 'ĐIỀU KIỆN ÁP DỤNG', ic: 'shield', tone: 'warn',
        text: 'Danh sách khách hàng và nhóm người đã vào website chỉ dùng được khi tài khoản đủ điều kiện. '
          + 'Dữ liệu phải có quyền sử dụng và website đã cài đo lường. '
          + 'Một số loại chiến dịch chỉ nhận đối tượng ở chế độ tham khảo.',
        extra: sourceList(sources, ['audience', 'observation', 'customer', 'data', 'signals', 'location'])
      })
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Recap
 * ------------------------------------------------------------------ */
function chapterRecap() {
  const items = [
    ['Bắt đầu từ mục tiêu', 'Tám mục tiêu, mỗi mục tiêu một màn hình khách nhìn thấy.', '#muc-tieu', 'target'],
    ['Chia theo mức sẵn sàng', 'Năm mức, mỗi mức một lời mời khác nhau.', '#hanh-trinh', 'route'],
    ['Chọn dấu hiệu nhắm', 'Chín cách nhắm, ba nhóm dấu hiệu.', '#doi-tuong', 'users']
  ];

  return chapter({
    id: 'tom-tat', num: 4, eyebrow: 'TÓM TẮT',
    title: 'Ba câu hỏi trước khi mở tài khoản.',
    body: `<div class="recap rv">${recapLinks(items)}</div>`
      + nextBlock({
        eyebrow: 'TIẾP THEO · ' + PAGES[2].num,
        title: PAGES[2].label,
        text: PAGES[2].hint,
        href: PAGES[2].href,
        cta: 'Xem chi phí & hiệu quả'
      })
  });
}

export function goalsPage() {
  const index = toc([
    ['muc-tieu', 'Mục tiêu'],
    ['hanh-trinh', 'Mức độ sẵn sàng'],
    ['doi-tuong', 'Đối tượng'],
    ['tom-tat', 'Tóm tắt']
  ], 'Mục lục Chọn cách chạy');

  return hero() + stepsBar('goals')
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterGoals() + chapterReadiness() + chapterAudiences() + chapterRecap()
    });
}

export const goalsMeta = {
  title: 'Google Ads: chọn cách chạy theo mục tiêu',
  description: 'Tám mục tiêu kinh doanh, năm mức sẵn sàng của khách và chín cách nhắm đối tượng '
    + 'trong Google Ads — chọn loại chiến dịch từ điều doanh nghiệp muốn nhận được.'
};
