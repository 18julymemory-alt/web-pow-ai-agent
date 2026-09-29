// ChatGPT Ads landing page 02 — "Chọn cách chạy".
// Same frame as the other channels' page 02: sticky chapter index, big
// chapter numbers and the list | text | light-stage workbench. Five
// chapters: objectives, readiness, context & audience, industries, recap.

import {SOURCES, OBJECTIVES, READINESS, AUDIENCES, FAMILIES, INDUSTRIES, IND_FAMILIES} from './data.mjs';
import {AFTER_CLICK, STAGE_AD, hintsBox, platformBox, countryBox, plans, verdictCard, customerAudience, sensitiveMock} from './mocks.mjs';
import {UPDATED} from './page-formats.mjs';
import {esc, section, stepsBar, nextBlock, sourceList, icon, CG_PAGES} from '../google-ads-lp/shared.mjs';
import {chapter, toc, workbench, facts, note} from '../google-ads-lp/scenes.mjs';
import {heroBlock, recapLinks} from '../google-ads-lp/panel-kit.mjs';

const STEPS_LABEL = 'Ba bước tìm hiểu ChatGPT Ads';
const src = keys => sourceList(SOURCES, keys, {label: 'Tài liệu OpenAI:'});

/* ------------------------------------------------------------------ *
 * Hero — the five readiness stages as a CSS-3D ladder
 * ------------------------------------------------------------------ */
function hero() {
  const rungs = READINESS.map((r, i) => `<div class="rung3d" data-step="${i}" data-stage="${r.id}">`
    + `<span class="r3-ico">${icon(r.icon)}</span>`
    + `<b>${esc(r.name)}</b><span>${esc(r.run.split(' · ')[0])}</span></div>`).join('');

  return heroBlock({
    crumb: 'Chọn cách chạy',
    eyebrow: 'POWAI / CHATGPT ADS · 02',
    title: 'Chọn cách chạy',
    sub: 'Bắt đầu từ <em>điều khách đang hỏi</em>, không từ từ khóa.',
    lead: 'ChatGPT Ads có ba mục tiêu, không nhắm theo từ khóa và chỉ chạy cho một số ngành. '
      + 'Trang này đi từ mục tiêu, tới quảng cáo hợp với từng mức sẵn sàng của khách, cách viết ngữ cảnh, '
      + 'chọn đối tượng và kiểm tra ngành. ' + UPDATED,
    primary: ['#muc-tieu', 'Xem ba mục tiêu'],
    ghost: ['/lien-he/', 'Trao đổi nhu cầu'],
    stage: `<div class="hero-stage" aria-hidden="true"><div class="ladder3d" id="heroStack">${rungs}</div></div>`
  });
}

/* ------------------------------------------------------------------ *
 * 01 — Objectives: each opens on the screen the person sees
 * ------------------------------------------------------------------ */
function chapterGoals() {
  const items = OBJECTIVES.map(o => ({
    key: 'goal-' + o.id,
    label: o.title,
    icon: o.icon,
    body: `<h4>${esc(o.title)}</h4>`
      + facts([
        ['Tối ưu cho', o.optimize],
        ['Tính phí theo', o.pricing],
        ['Cần chuẩn bị', o.needs]
      ]),
    stage: AFTER_CLICK[o.id](),
    tag: 'KHÁCH THẤY',
    cap: 'Màn hình khách thấy với mục tiêu này. Nội dung là mẫu của Nhà Thơm.'
  }));

  return chapter({
    id: 'muc-tieu', num: 1, eyebrow: 'BA MỤC TIÊU',
    title: 'Bạn muốn trả tiền cho điều gì?',
    lead: 'Ads Manager có ba mục tiêu chiến dịch: Views, Clicks và Conversions. Chọn một mục tiêu để xem khách thấy gì.',
    body: workbench(items)
      + note({
        label: 'MỤC TIÊU QUYẾT ĐỊNH CÁCH TÍNH PHÍ', ic: 'target',
        text: 'Mục tiêu quyết định cách tính phí và cách hệ thống tối ưu phân phối. '
          + 'Với Conversions, bạn vẫn trả theo lượt nhấp hoặc lượt hiển thị, không trả theo chuyển đổi. '
          + 'Trả theo lượt hiển thị cho Conversions đang thử nghiệm (beta).',
        extra: src(['campaigns', 'convCamp'])
      })
      + src(['campaigns'])
  });
}

/* ------------------------------------------------------------------ *
 * 02 — Readiness: the ad a person at each stage should see
 * ------------------------------------------------------------------ */
const HEAT = ['#88e4ff', '#85e1c1', '#c0a2ff', '#e0cd9b', '#ffbd80'];

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
        ['Cách chạy', r.run],
        ['Việc cần làm', r.aim],
        ['Nội dung nên đưa', r.content],
        ['Lời kêu gọi', r.cta]
      ]),
    stage: STAGE_AD[r.id](),
    tag: r.id === 'customer' ? 'CÀI ĐẶT MẪU' : 'QUẢNG CÁO MẪU',
    cap: r.id === 'advice'
      ? 'Thẻ dẫn về form tư vấn. Trò chuyện với thương hiệu đang thử nghiệm tại Mỹ, chưa có ở Việt Nam.'
      : 'Quảng cáo hợp với người đang ở mức này.'
  }));

  return chapter({
    id: 'hanh-trinh', num: 2, eyebrow: 'MỨC ĐỘ SẴN SÀNG',
    title: 'Cùng một người, khác câu hỏi, cần một quảng cáo khác.',
    lead: 'Chọn một mức để xem người đó nên thấy kiểu quảng cáo nào.',
    body: heat + workbench(items)
      + note({
        label: 'CÂU HỎI CHO BIẾT MỨC SẴN SÀNG', ic: 'route',
        text: 'Người hỏi "nên chọn loại nào" khác người hỏi "mua ở đâu". '
          + 'Tách nhóm quảng cáo theo từng kiểu câu hỏi và viết gợi ý ngữ cảnh riêng cho mỗi nhóm. '
          + 'Người đã mua dùng đối tượng tùy chỉnh để loại trừ hoặc điều chỉnh giá thầu.',
        extra: src(['hints', 'customAud', 'agents'])
      })
      + src(['adGroups', 'feedCamp'])
  });
}

/* ------------------------------------------------------------------ *
 * 03 — Context & audience: three families
 * ------------------------------------------------------------------ */
const AUD_STAGE = {
  hints: () => hintsBox(),
  hintgood: () => hintsBox({weak: true}),
  country: () => countryBox(),
  platform: () => platformBox(),
  who: () => plans(),
  include: () => customerAudience('include'),
  exclude: () => customerAudience('exclude'),
  multiplier: () => customerAudience('multiplier')
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
    tag: a.id === 'hintgood' ? 'GỢI Ý CHƯA TỐT' : 'CÀI ĐẶT MẪU',
    cap: 'Màn hình Ads Manager vẽ lại để minh họa, số liệu là mẫu.'
  }));

  return chapter({
    id: 'doi-tuong', num: 3, eyebrow: 'NGỮ CẢNH & ĐỐI TƯỢNG',
    title: 'Tả tình huống, khóa điều bắt buộc, dùng dữ liệu của bạn.',
    lead: 'Ngữ cảnh là phần chính. Ràng buộc là giới hạn cứng. Dữ liệu doanh nghiệp để loại trừ hoặc ưu tiên khách đã biết.',
    body: workbench(items, {cls: 'is-aud'})
      + note({
        label: 'KHÔNG NHẮM THEO TỪ KHÓA, TUỔI, SỞ THÍCH', ic: 'shield', tone: 'warn',
        text: 'Tài liệu nhắm mục tiêu của OpenAI liệt kê vị trí, nền tảng và đối tượng tùy chỉnh; không có từ khóa, tuổi, giới tính hay sở thích như Google, Facebook. '
          + 'Gợi ý ngữ cảnh không phải từ khóa khớp chính xác. '
          + 'Đối tượng tùy chỉnh cần tối thiểu 25.000 người khớp để nhắm hoặc chỉnh giá thầu; loại trừ không cần.',
        extra: src(['targeting', 'hints', 'customAud'])
      })
      + src(['targeting', 'devAud'])
  });
}

/* ------------------------------------------------------------------ *
 * 04 — Industries allowed, reviewed, prohibited; contexts with no ads
 * ------------------------------------------------------------------ */
const IND_PIC = {retail: 's6', local: 's-hero', digital: 's-desk', finance: 's-shelf', health: 's2'};

function chapterIndustries() {
  const items = INDUSTRIES.map(([id, fam, title, ic, text]) => ({
    key: 'ind-' + id,
    label: title,
    icon: ic,
    group: IND_FAMILIES[fam][0],
    groupColor: IND_FAMILIES[fam][1],
    body: `<span class="wb-tag">${esc(IND_FAMILIES[fam][0].toUpperCase())}</span><h4>${esc(title)}</h4><p class="wb-sub">${esc(text)}</p>`,
    stage: fam === 'ctx' ? sensitiveMock() : verdictCard(fam === 'no' ? 'Mẫu quảng cáo không được duyệt' : title, fam,
      fam === 'no' ? 'Ngành này không chạy được trên ChatGPT Ads.' : text, IND_PIC[id] || 's6'),
    tag: fam === 'ctx' ? 'KHÔNG CÓ QUẢNG CÁO' : 'MINH HỌA',
    cap: 'Minh họa kết luận theo chính sách quảng cáo của OpenAI; chính sách thật đổi theo thời gian.'
  }));

  return chapter({
    id: 'nganh', num: 4, eyebrow: 'NGÀNH ĐƯỢC CHẠY',
    title: 'Kiểm tra ngành trước khi làm bất cứ việc gì khác.',
    lead: 'Chính sách quảng cáo của OpenAI chia ngành thành được chạy, xét từng trường hợp và không được chạy. Có những ngữ cảnh không bao giờ có quảng cáo.',
    body: workbench(items, {cls: 'is-aud'})
      + note({
        label: 'XÉT TỪNG TRƯỜNG HỢP CHỈ TẠI MỸ', ic: 'alert', tone: 'warn',
        text: 'Tài chính, y tế và pháp lý đang mở dần, duyệt thủ công từng nhà quảng cáo; quảng cáo tài chính ngoài Mỹ nhìn chung bị cấm. '
          + 'Mẫu quảng cáo không được bắt chước giao diện, chức năng hay giọng của ChatGPT. '
          + 'Doanh nghiệp tại Việt Nam trong các ngành này nên chờ OpenAI công bố thêm.',
        extra: src(['policies', 'inChat'])
      })
      + src(['policies', 'inChat'])
  });
}

/* ------------------------------------------------------------------ *
 * 05 — Recap
 * ------------------------------------------------------------------ */
function chapterRecap() {
  const items = [
    ['Chọn mục tiêu', 'Views, Clicks hoặc Conversions; mục tiêu quyết định cách tính phí.', '#muc-tieu', 'target'],
    ['Viết ngữ cảnh', 'Tả tình huống người dùng hỏi, không liệt kê từ khóa.', '#doi-tuong', 'thought'],
    ['Kiểm tra ngành', 'Được chạy, xét từng trường hợp hay không được chạy.', '#nganh', 'shield']
  ];

  return chapter({
    id: 'tom-tat', num: 5, eyebrow: 'TÓM TẮT',
    title: 'Ba câu hỏi trước khi dựng quảng cáo.',
    body: `<div class="recap rv">${recapLinks(items)}</div>`
      + nextBlock({
        eyebrow: 'TIẾP THEO · ' + CG_PAGES[2].num,
        title: CG_PAGES[2].label,
        text: CG_PAGES[2].hint,
        href: CG_PAGES[2].href,
        cta: 'Xem chi phí & hiệu quả'
      })
      + src(['campaigns', 'policies'])
  });
}

export function goalsPage() {
  const index = toc([
    ['muc-tieu', 'Mục tiêu'],
    ['hanh-trinh', 'Mức độ sẵn sàng'],
    ['doi-tuong', 'Ngữ cảnh & đối tượng'],
    ['nganh', 'Ngành được chạy'],
    ['tom-tat', 'Tóm tắt']
  ], 'Mục lục Chọn cách chạy');

  return hero() + stepsBar('goals', CG_PAGES, STEPS_LABEL)
    + section({
      id: 'chuong', cls: 'lp-chapters',
      inner: index + chapterGoals() + chapterReadiness() + chapterAudiences() + chapterIndustries() + chapterRecap()
    });
}

export const goalsMeta = {
  title: 'ChatGPT Ads: chọn cách chạy theo mục tiêu',
  description: 'Ba mục tiêu chiến dịch ChatGPT Ads, năm mức sẵn sàng của khách, gợi ý ngữ cảnh, nhắm mục tiêu, '
    + 'đối tượng tùy chỉnh và các ngành được chạy theo chính sách quảng cáo của OpenAI.'
};
