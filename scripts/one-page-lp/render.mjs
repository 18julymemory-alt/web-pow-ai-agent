// One-page landing pages for the smaller multichannel services
// (ONE_PAGE_ADS_PLAN.md): Instagram Ads, YouTube Ads, Remarketing,
// Performance Marketing and Tối ưu chuyển đổi quảng cáo.
//
// Same frame as the three-page channels (hero, sticky chapter index, big
// chapter numbers, list | text | stage workbench, "Đọc tiếp", contact form),
// built from the Google Ads kit. Each page module hands over data only;
// every page gets the same eight chapters.

import {esc, section, nextBlock, sourceList, icon, CHANNELS} from '../google-ads-lp/shared.mjs';
import {ratioFrame, charBox, more, funnel as funnelTabs, machine} from '../google-ads-lp/visuals.mjs';
import {chapter, toc, workbench, facts, note} from '../google-ads-lp/scenes.mjs';
import {
  heroBlock, flowList, blueprint, specTile, assetFolder, specDrawer, filesBody,
  rolloutBody, checklistBlock, faqBody, contactChapter, recapLinks
} from '../google-ads-lp/panel-kit.mjs';

const dateVi = iso => iso.split('-').reverse().join('/');

export const CHAPTERS = [
  ['khi-nao', 'Khi nào nên dùng'],
  ['dinh-dang', 'Định dạng'],
  ['chuan-bi', 'Cần chuẩn bị'],
  ['muc-tieu', 'Mục tiêu & đối tượng'],
  ['do-luong', 'Đo lường'],
  ['trien-khai', 'Triển khai'],
  ['faq', 'Hỏi đáp'],
  ['lien-he', 'Liên hệ']
];

export function renderPage(P) {
  const src = keys => sourceList(P.SOURCES, keys, {label: P.sourceLabel});
  const updated = `<small class="op-upd">${icon('clock')}Cập nhật theo ${esc(P.docName)} ngày ${dateVi(P.checked)}</small>`;

  /* -------------------------------- hero -------------------------------- */
  const rungs = P.hero.rungs.map(([ic, name, sub], i) => `<div class="rung3d" data-step="${i}">`
    + `<span class="r3-ico">${icon(ic)}</span><b>${esc(name)}</b><span>${esc(sub)}</span></div>`).join('');
  const hero = heroBlock({
    crumb: P.name,
    eyebrow: 'POWAI / ' + P.name.toUpperCase(),
    title: P.name,
    sub: P.hero.sub,
    lead: esc(P.hero.lead) + ' ' + updated,
    primary: ['#dinh-dang', P.hero.cta],
    ghost: ['#lien-he', 'Gửi yêu cầu tư vấn'],
    stage: `<div class="hero-stage" aria-hidden="true"><div class="ladder3d" id="heroStack">${rungs}</div></div>`
  });

  /* ---------------------------- 01 when to use --------------------------- */
  const W = P.when;
  const fit = (cls, ic, title, list) => `<div class="op-fit ${cls}"><small>${icon(ic)}${esc(title)}</small><ul>`
    + list.map(t => `<li>${icon(ic)}<span>${esc(t)}</span></li>`).join('') + '</ul></div>';
  const ch1 = chapter({
    id: 'khi-nao', num: 1, eyebrow: 'KHI NÀO NÊN DÙNG', title: W.title, lead: W.lead,
    body: flowList(W.journey.map(j => j[1]), W.journey.map(j => j[0]))
      + '<div class="how-io">' + machine({
        inputs: {title: 'Bạn đưa vào', items: W.inputs.map(([ic, label]) => ({icon: ic, label}))},
        core: {icon: 'gear', label: W.core, note: P.name},
        outputs: {title: 'Bạn nhận lại', items: W.outputs.map(([ic, label]) => ({icon: ic, label}))}
      }) + '</div>'
      + `<div class="op-fits rv">${fit('is-yes', 'check', 'Hợp khi', W.fit)}${fit('is-no', 'alert', 'Chưa hợp khi', W.notFit)}</div>`
      + src(W.src)
  });

  /* ------------------------------ 02 formats ----------------------------- */
  const F = P.formats;
  const ch2 = chapter({
    id: 'dinh-dang', num: 2, eyebrow: F.eyebrow, title: F.title, lead: F.lead,
    body: workbench(F.items.map(it => ({
      key: 'f-' + it.key, label: it.label, icon: it.icon, group: it.group, groupColor: it.groupColor,
      body: `<h4>${esc(it.label)}</h4>` + facts([[F.whereLabel || 'Hiển thị ở đâu', it.where], [F.whatLabel || 'Nội dung gì', it.what],
        ...(it.more || [])]),
      stage: it.stage(), tag: it.tag || 'MÔ PHỎNG',
      cap: it.cap || 'Vẽ lại bố cục để hình dung, không phải giao diện thật. Nội dung là mẫu của Nhà Thơm.'
    })))
      + (F.note ? note(F.note) : '')
      + src(F.src)
  });

  /* ---------------------------- 03 preparation --------------------------- */
  const R = P.prep;
  const texts = (R.texts || []).map((t, i) => charBox({id: `op-${P.slug}-${i}`, label: `${t.label} · tối đa ${t.limit} ký tự`,
    text: t.text, limit: t.limit, multiline: t.limit > 60}));
  const frames = (R.frames || []).map(f => ratioFrame(f)).concat((R.boards || []).map(b => b()));
  const tiles = (R.tiles || []).map(([ic, name, spec]) => specTile(`<span class="sp-ico">${icon(ic)}</span>`, name, spec));
  const ch3 = chapter({
    id: 'chuan-bi', num: 3, eyebrow: 'CẦN CHUẨN BỊ GÌ', title: R.title, lead: R.lead,
    body: `<div class="key-pt rv"><span class="key-pt-ico">${icon('layers')}</span><div><small>NGUYÊN TẮC</small><p>${esc(R.principle)}</p></div></div>`
      + filesBody({board: blueprint(texts, frames), tiles, folder: assetFolder(R.assets), detail: specDrawer(R.specs)})
      + src(R.src)
  });

  /* --------------------------- 04 goals & people ------------------------- */
  const G = P.goals;
  const ch4 = chapter({
    id: 'muc-tieu', num: 4, eyebrow: 'MỤC TIÊU & ĐỐI TƯỢNG', title: G.title, lead: G.lead,
    body: workbench(G.items.map(it => ({
      key: 'g-' + it.key, label: it.label, icon: it.icon, group: it.group, groupColor: it.groupColor,
      body: (it.tag ? `<span class="wb-tag">${esc(it.tag)}</span>` : '') + `<h4>${esc(it.label)}</h4>`
        + (it.sub ? `<p class="wb-sub">${esc(it.sub)}</p>` : '') + facts(it.facts),
      stage: it.stage(), tag: it.stageTag || 'KHÁCH THẤY', cap: it.cap || 'Minh họa với nội dung mẫu của Nhà Thơm.'
    })), {cls: 'is-aud'})
      + (G.note ? note(G.note) : '')
      + src(G.src)
  });

  /* ---------------------------- 05 measurement --------------------------- */
  const M = P.measure;
  const tiers = M.tiers.map(([id, label, value, cards]) => ({
    id: 'kpi-' + id, label, value: typeof value === 'number' ? value : Number(String(value).replace(/\./g, '').replace(',', '.')),
    panel: '<div class="sc-kpis">' + cards.map(([name, v, meaning]) => `<div class="sc-kpi"><b>${esc(v)}</b>`
      + `<span>${esc(name)}</span><small>${esc(meaning)}</small></div>`).join('') + '</div>'
      + (M.tips && M.tips[id] ? more(`<p>${esc(M.tips[id])}</p>`, {label: 'Khi con số bất thường, kiểm tra gì'}) : '')
  }));
  const ch5 = chapter({
    id: 'do-luong', num: 5, eyebrow: 'ĐO LƯỜNG', title: M.title, lead: M.lead,
    body: `<div class="sc-funnel rv">${funnelTabs({tiers, label: 'Các tầng của phễu'})}</div>`
      + '<p class="sc-sample">Số mẫu, không phải kết quả dự kiến. Một tháng giả định, chỉ để minh họa cách đọc.</p>'
      + (M.note ? note(M.note) : '')
      + src(M.src)
  });

  /* ------------------------------ 06 rollout ----------------------------- */
  const T = P.rollout;
  const ch6 = chapter({
    id: 'trien-khai', num: 6, eyebrow: 'TRIỂN KHAI CÙNG POWAI', title: T.title,
    lead: 'Mỗi bước kết thúc bằng một thứ có thể xem được. Bên dưới là danh sách kiểm tra trước khi chạy.',
    body: rolloutBody({steps: T.steps, icons: T.icons, phases: T.phases})
      + `<div class="sub-block">${checklistBlock(P.slug, T.checks)}</div>`
      + src(T.src)
  });

  /* -------------------------------- 07 FAQ ------------------------------- */
  const Q = P.faq;
  const ch7 = chapter({
    id: 'faq', num: 7, eyebrow: 'CÂU HỎI THƯỜNG GẶP', title: 'Những câu hỏi hay gặp.',
    lead: 'Chọn một chủ đề. Câu trả lời nói cả điều làm được lẫn điều còn phụ thuộc dữ liệu của bạn.',
    body: faqBody(Q.topics, Q.items) + src(Q.src)
  });

  /* ------------------------------ 08 contact ----------------------------- */
  const ch8 = contactChapter({goals: P.contactGoals, website: 'Website hoặc trang đích'});

  /* -------------------------------- recap -------------------------------- */
  const sister = ([title, text, href]) => nextBlock({eyebrow: 'XEM THÊM', title, text, href, cta: 'Xem ' + title});
  const recap = section({
    cls: 'lp-recap',
    inner: `<div class="sec-head center"><span class="kicker">TÓM TẮT</span><h2>${esc(P.recap.title)}</h2></div>`
      + `<div class="recap rv">${recapLinks(P.recap.items)}</div>`
      + `<div class="op-more">${P.sisters.map(sister).join('')}</div>`
  });

  return hero
    + section({id: 'chuong', cls: 'lp-chapters',
      inner: toc(CHAPTERS, 'Mục lục ' + P.name) + ch1 + ch2 + ch3 + ch4 + ch5 + ch6 + ch7 + ch8})
    + recap;
}

// Channel row check: every page module names a CHANNELS row.
export function channelOf(P) {
  if (!CHANNELS[P.channel]) throw new Error('No CHANNELS row for ' + P.channel);
  return P.channel;
}
