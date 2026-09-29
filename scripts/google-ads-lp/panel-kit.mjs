// Building blocks shared by every channel landing page built on the Google
// Ads frame (Google Ads, Facebook Ads). The markup and classes are the ones
// page 01/02/03 always used; each channel passes its own data and wording.
// Nothing here knows about a platform: labels that name one are parameters.

import {esc, icon, shot, more, knob, reportTable, lineChart, barChart, phone, actionScreen, ratioFrame, charBox, machine, tabs} from './visuals.mjs';
import {crumbs, kicker, secHead, section, nextBlock, placeholders} from './shared.mjs';
import {chapter, siteScreen, FAB_KINDS, fabGlyph} from './scenes.mjs';

const pad2 = n => String(n).padStart(2, '0');

/* ------------------------------------------------------------------ *
 * Hero copy block. `stage` is the trusted 3D picture on the right.
 * ------------------------------------------------------------------ */
export function heroBlock({crumb, eyebrow, title, sub, lead, primary, ghost, stage}) {
  return '<section class="ga-hero"><div class="wrap hero-inner"><div class="hero-copy">'
    + crumbs(crumb)
    + kicker(eyebrow)
    + `<h1>${esc(title)}</h1>`
    + `<p class="hero-sub">${sub}</p>`
    + `<p class="lead">${lead}</p>`
    + '<div class="ctas">'
    + `<a class="btn btn-cyan" href="${primary[0]}">${esc(primary[1])} <span aria-hidden="true">${primary[2] || '↓'}</span></a>`
    + `<a class="btn btn-ghost" href="${ghost[0]}">${esc(ghost[1])} <b aria-hidden="true">→</b></a>`
    + '</div></div>'
    + stage
    + '</div></section>';
}

/* ------------------------------------------------------------------ *
 * Journey orbit. journey: [[name, label, text]], icons in the same order.
 * ------------------------------------------------------------------ */
export function orbitSection({journey, icons, core = 'TÀI KHOẢN', head, hint}) {
  const n = journey.length;
  const nodes = journey.map(([name], i) => {
    const a = (i / n) * Math.PI * 2;
    const left = 50 + Math.cos(a) * 37;
    const top = 50 + Math.sin(a) * 30;
    return `<button type="button" class="orbit-node" data-orbit="${i}" style="left:${left.toFixed(2)}%;top:${top.toFixed(2)}%"`
      + `${i === 0 ? ' aria-pressed="true"' : ' aria-pressed="false"'}>`
      + `${icon(icons[i] || 'dot')}<span>${esc(name)}</span></button>`;
  }).join('');

  const details = journey.map(([name, label, text], i) => `<article class="orbit-detail" data-orbit-detail="${i}"${i ? ' hidden' : ''}>`
    + `${kicker(label)}<h3>${esc(name)}</h3><p class="lead">${esc(text)}</p></article>`).join('');

  const stage = '<div class="orbit" id="gaOrbit">'
    + '<span class="ring r1" aria-hidden="true"></span>'
    + '<span class="ring r2" aria-hidden="true"></span>'
    + `<span class="core"><span class="core-ico" aria-hidden="true">${icon('target')}</span><small>${esc(core)}</small></span>`
    + nodes + '</div>';

  return section({
    id: 'journey',
    veil: true,
    inner: '<div class="eco rv">'
      + `<div>${secHead(head)}<div id="orbitDetails">${details}</div>`
      + `<p class="orbit-hint">${esc(hint)}</p></div>`
      + stage
      + '</div>'
  });
}

/* ------------------------------------------------------------------ *
 * Type picker. types: [{id, tag, title, description}], art(id) → HTML.
 * ------------------------------------------------------------------ */
export function pickerBlock({types, art, head, label}) {
  const cards = types.map((c, i) => `<button type="button" class="pick" data-campaign="${c.id}" data-pick="${c.id}" data-anim`
    + ` role="tab" aria-selected="${i === 0}" aria-controls="panel-${c.id}" id="tab-${c.id}">`
    + `<span class="pick-art">${art(c.id)}</span>`
    + '<span class="pick-body">'
    + `<span class="pick-num">${pad2(i + 1)} · ${esc(c.tag)}</span>`
    + `<strong>${esc(c.title)}<span class="pick-arrow" aria-hidden="true">${icon('arrow')}</span></strong>`
    + `<span class="pick-desc">${esc(c.description)}</span>`
    + '</span></button>').join('');

  return secHead(head) + `<div class="picker" role="tablist" aria-label="${esc(label)}">${cards}</div>`;
}

/* ------------------------------------------------------------------ *
 * One panel: banner, chapter index, chapters.
 * ------------------------------------------------------------------ */
export const PANEL_TOC = ['Trông như thế nào', 'Chạy như thế nào', 'Cần chuẩn bị gì', 'Đo điều gì', 'Cách triển khai', 'Trước khi chạy'];
const PANEL_IDS = ['look', 'how', 'files', 'measure', 'paths', 'play'];

export function panelShell({c, i, extra = '', chapters}) {
  const toc = PANEL_IDS.map((k, j) => `<a href="#ch-${k}-${c.id}">${esc(pad2(j + 1) + ' ' + PANEL_TOC[j])}</a>`).join('');
  return `<div class="panel" id="panel-${c.id}" data-campaign="${c.id}" data-panel="${c.id}"`
    + ` role="tabpanel" aria-labelledby="tab-${c.id}"${i ? ' hidden' : ''}>`
    + '<div class="panel-banner">'
    + kicker(c.tag)
    + `<h3>${esc(c.title)} — ${esc(c.description)}</h3>`
    + `<p class="lead">${esc(c.bestFor)}</p>`
    + extra
    + '</div>'
    + `<nav class="panel-toc" aria-label="Mục lục ${esc(c.title)}">${toc}</nav>`
    + chapters
    + '</div>';
}

// Numbered chapters ("03 · …") get the number set large beside the title so
// the six chapters read as steps at a glance.
export function chapterHead(eyebrow, title, lead) {
  const m = eyebrow.match(/^(\d{2}) · (.+)$/);
  return `<div class="chap-head${m ? ' has-num' : ''}">`
    + (m ? `<span class="chap-num">${m[1]}</span>` : '')
    + `<div class="chap-title">${kicker(m ? m[2] : eyebrow)}<h3>${title}</h3>`
    + (lead ? `<p class="lead">${esc(lead)}</p>` : '') + '</div></div>';
}

export const chap = (id, head, body) => `<section class="chap rv" id="${id}">${head}${body}</section>`;

// First sentence up front, the rest behind a drawer.
export function splitFirst(text) {
  const parts = String(text).split(/(?<=\.)\s+/);
  return [parts[0], parts.slice(1).join(' ')];
}

/* ------------------------------------------------------------------ *
 * 02 — the flow and the input → account → output machine
 * ------------------------------------------------------------------ */
export function flowList(steps, icons) {
  return `<ol class="pipeline flow">${steps.map((s, i) => '<li>'
    + `<span class="flow-ico">${icon(icons[i] || 'dot')}</span>`
    + `<b class="flow-n">${pad2(i + 1)}</b>`
    + `<span class="flow-txt">${esc(s)}</span></li>`).join('')}</ol>`;
}

// What you hand over slides into the account, what it hands back comes out
// the other side. The part of `outputs` after ";" is the caveat under it.
export function ioBlock({inputs, outputs, core, note = 'Tài khoản quảng cáo', guess}) {
  const [gain, caveat] = String(outputs).split(/;\s*/);
  return '<div class="how-io">' + machine({
    inputs: {items: inputs.map(label => ({icon: guess(label), label}))},
    core: {icon: 'gear', label: core, note},
    outputs: {items: [{icon: guess(gain, 'convert'), label: gain}]}
  }) + (caveat ? `<p class="how-io-note">${icon('alert')}<span>${esc(caveat)}</span></p>` : '') + '</div>';
}

/* ------------------------------------------------------------------ *
 * 03 — blueprint board, spec tiles, asset folder, spec drawer
 * ------------------------------------------------------------------ */
const RATIOS = [[1, '1:1'], [16 / 9, '16:9'], [9 / 16, '9:16'], [4 / 5, '4:5'], [1.91, '1.91:1'], [4, '4:1']];

export function ratioName(w, h) {
  const r = w / h;
  const hit = RATIOS.find(([v]) => Math.abs(v - r) / v < .03);
  return hit ? hit[1] : r.toFixed(2) + ':1';
}

export const imgFor = r => r > 1.2 ? 's-shelf' : r < .8 ? 's-tall' : 's6';

export {ratioFrame, charBox};

export function blueprint(texts, frames) {
  return texts.length || frames.length
    ? `<div class="bp${texts.length && frames.length ? ' has-both' : ''}">`
      + `<span class="bp-tag">${icon('sliders')}BẢN VẼ KÍCH THƯỚC</span>`
      + (texts.length ? `<div class="bp-text">${texts.join('')}</div>` : '')
      + (frames.length ? `<div class="bp-frames">${frames.join('')}</div>` : '')
      + '</div>'
    : '';
}

export const specTile = (pic, name, spec) => '<article class="sp-tile">'
  + `<span class="sp-pic" aria-hidden="true">${pic}</span>`
  + `<h4>${esc(name)}</h4><b>${esc(spec)}</b></article>`;

// Thumbnails for the asset folder, chosen by the asset's tag.
export function assetThumb(tag) {
  const r = tag.match(/^(\d+):(\d+)$/);
  if (r) {
    return `<span class="af-thumb is-ratio" style="--r:${r[1]}/${r[2]}"><i class="photo dark">${shot(imgFor(r[1] / r[2]))}</i>`
      + `<span class="sp-play">${icon('play')}</span></span>`;
  }
  if (/^(Text|Chữ)/.test(tag)) return '<span class="af-thumb is-text"><b>Aa</b></span>';
  if (/^Video/.test(tag)) return `<span class="af-thumb"><i class="photo dark">${shot('s-hero')}</i><span class="sp-play">${icon('play')}</span></span>`;
  if (/^Ảnh/.test(tag)) return `<span class="af-thumb"><i class="photo">${shot('s6')}</i></span>`;
  const ic = [[/Feed|Dữ liệu/, 'table'], [/Landing|Trang/, 'page'], [/Assets|Tài sản/, 'layers'],
    [/Store/, 'store'], [/Sự kiện/, 'convert'], [/Carousel/, 'list'], [/Danh mục/, 'table'], [/Kịch bản|Tin nhắn/, 'chat'],
    [/Câu hỏi|Form/, 'form']].find(([re]) => re.test(tag));
  return `<span class="af-thumb is-ico">${icon(ic ? ic[1] : 'folder')}</span>`;
}

export function assetFolder(assets) {
  return assets && assets.length
    ? '<div class="af">'
      + `<div class="af-tab">${icon('folder')}<b>Bộ tài nguyên</b><small>${assets.length} mục</small></div>`
      + `<ul>${assets.map(([tag, name, text]) => '<li>'
        + assetThumb(tag)
        + `<div><small>${esc(tag)}</small><b>${esc(name)}</b><span>${esc(text)}</span></div>`
        + `<span class="af-tick" aria-hidden="true">${icon('check')}</span></li>`).join('')}</ul></div>`
    : '';
}

export function specDrawer(specs) {
  return specs.length
    ? more('<dl class="sp-detail">' + specs.map(([name, spec, note]) => `<div><dt>${esc(name)}</dt>`
      + `<dd><b>${esc(spec)}</b> ${esc(note)}</dd></div>`).join('') + '</dl>', {label: 'Xem đủ thông số và ghi chú'})
    : '';
}

export function filesBody({board, tiles, folder, detail}) {
  return '<div class="files" data-anim>'
    + board
    + (tiles.length || folder
      ? `<div class="files-row">${tiles.length ? `<div class="sp-tiles">${tiles.join('')}</div>` : ''}${folder}</div>`
      : '')
    + detail
    + '</div>';
}

/* ------------------------------------------------------------------ *
 * 04 — measurement demo: the button, the screen, the report row
 * items: [{label, kind, ic, event, what}]
 * scenes: kind → () => phone screen. fab: kinds pinned as floating bubbles.
 * verify: kind → [text, status].
 * ------------------------------------------------------------------ */
const START_COUNTS = [12, 18, 7, 9];

// screen / steps / cap let a channel put the buttons on its own ad instead of
// the shop's landing page (the Facebook pages).
const MEAS_STEPS = ['Khách bấm trên trang', 'Điều khách thấy', 'Báo cáo ghi nhận'];
const MEAS_CAP = 'Bấm từng nút ở bước 1 để xem màn hình khách nhận được và lượt được cộng vào báo cáo.';

export function measureDemo({id, items, scenes, verify, verifyHead, fab = {call: 'call', zalo: 'zalo', messenger: 'messenger'},
  site = {}, title = 'Báo cáo chuyển đổi', evLabel = 'Sự kiện ví dụ', screen = siteScreen, steps = MEAS_STEPS, cap = MEAS_CAP,
  label = 'Nút trên trang đích', counts = START_COUNTS}) {
  const tid = i => `meas-${id}-t${i}`;
  const pid = i => `meas-${id}-p${i}`;

  const tab = (it, i, cls, inner) => `<button type="button" class="v-lp-btn ${cls}" role="tab" id="${tid(i)}"`
    + ` aria-controls="${pid(i)}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}" data-key="k${i}"`
    + ` aria-label="${esc(it.label)}">${inner}</button>`;
  const inline = items.map((it, i) => fab[it.kind] ? '' : tab(it, i, 'sc-cta', `${icon(it.ic)}<span>${esc(it.label)}</span>`)).join('');
  const fabs = items.map((it, i) => {
    if (!fab[it.kind]) return '';
    const f = FAB_KINDS[it.kind];
    return tab(it, i, `sc-fab is-${it.kind}`, `<span class="sc-fab-l">${f.label}</span><i>${fabGlyph(it.kind)}</i>`
      + `<span class="sc-tap" aria-hidden="true">${icon('tap')}</span>`);
  }).join('');

  const landing = `<div class="meas-btns" role="tablist" aria-label="${esc(label)}">`
    + screen({inline, fabs, cls: 'meas-phone', ...site}) + '</div>';

  const screens = items.map((it, i) => `<div class="meas-screen" role="tabpanel" id="${pid(i)}" aria-labelledby="${tid(i)}"${i ? ' hidden' : ''}>`
    + (scenes[it.kind] ? scenes[it.kind]() : phone(actionScreen(it.kind), 'meas-phone'))
    + `<p class="meas-what"><b>${esc(it.label)}</b>${esc(it.what)}</p>`
    + `<span class="meas-ev"><small>${esc(evLabel)}</small><code>${esc(it.event)}</code></span>`
    + '</div>').join('');

  const report = reportTable({
    title,
    icon: 'chart',
    cls: 'meas-report',
    head: ['Sự kiện', 'Lượt', verifyHead],
    rows: items.map((it, i) => [
      it.event,
      {text: String(counts[i] || 5), key: 'k' + i},
      {text: verify[it.kind][0], status: verify[it.kind][1]}
    ])
  });

  const step = (n, text) => `<span class="meas-step"><b>${n}</b>${esc(text)}</span>`;
  const wire = '<span class="meas-wire" aria-hidden="true"><i></i></span>';

  return `<div class="meas" data-tabs data-anim data-meas>`
    + `<div class="meas-col">${step(1, steps[0])}${landing}</div>`
    + wire
    + `<div class="meas-col">${step(2, steps[1])}${screens}</div>`
    + wire
    + `<div class="meas-col">${step(3, steps[2])}${report}`
    + `<p class="meas-cap">${icon('tap')}<span>${esc(cap)}</span></p></div>`
    + '</div>'
    + '<p class="act-note">Mỗi hành động phải được cấu hình thành một sự kiện đo được '
    + 'thì mới xuất hiện trong báo cáo.</p>';
}

export function noteCard(kind, label, text) {
  const [first, rest] = splitFirst(text);
  const pic = kind === 'bid'
    ? knob(.62, {label: 'Núm chỉnh giá thầu'})
    : `<span class="note-alert">${icon('alert')}</span>`;
  return `<article class="note-card is-${kind}"><div class="note-pic">${pic}</div>`
    + `<div class="note-txt"><small>${esc(label)}</small><p>${esc(first)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp'}) : '')
    + '</div></article>';
}

/* ------------------------------------------------------------------ *
 * 05 — path cards and diagnosis rows
 * ------------------------------------------------------------------ */
const PATH_SERIES = [
  [4, 5, 5, 7, 8, 10, 12],
  [3, 4, 6, 5, 7, 9],
  [6, 6, 7, 8, 8, 9, 11],
  [2, 3, 5, 6, 8]
];

export function pathCard([t, text], i) {
  const [first, rest] = splitFirst(text);
  const values = PATH_SERIES[i % PATH_SERIES.length];
  const chart = i % 2
    ? barChart(values, {w: 200, h: 56, highlight: values.length - 1})
    : lineChart(values, {w: 200, h: 56, area: true});
  return '<article class="path-card">'
    + `<span class="path-chart" aria-hidden="true">${chart}</span>`
    + `<span class="path-n">${pad2(i + 1)}</span>`
    + `<h4>${esc(t)}</h4><p>${esc(first)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '')
    + '</article>';
}

// metrics: [[label, value, status]]; exactly one is 'fix' (the red number).
export function diagRow([t, text], metrics = []) {
  const [first, rest] = splitFirst(text);
  const report = reportTable({
    cls: 'is-mini diag-report',
    icon: 'alert',
    title: t,
    head: ['Chỉ số', 'Giá trị'],
    rows: metrics.map(([label, value, status]) => [label, status === 'fix' ? {text: value, status} : value])
  });
  return '<div class="diag-row">'
    + `<div class="diag-sign"><small>DẤU HIỆU</small>${report}</div>`
    + `<span class="diag-arr" aria-hidden="true">${icon('arrow')}</span>`
    + `<article class="diag-check"><small>${icon('check')}KIỂM TRA</small><p>${esc(first)}</p>`
    + (rest ? more(`<p>${esc(rest)}</p>`, {label: 'Đọc tiếp', cls: 'wb-more'}) : '')
    + '</article></div>';
}

export function pathsBody(paths, diagnosis, metrics) {
  const cards = paths && paths.length
    ? `<div class="path-cards" data-anim>${paths.map(pathCard).join('')}</div>`
    : '';
  const diag = diagnosis && diagnosis.length
    ? `<div class="diag-list">${diagnosis.map(d => diagRow(d, metrics[d[0]])).join('')}</div>`
    : '';
  return cards + (diag ? `<div class="sub-block">${diag}</div>` : '');
}

/* ------------------------------------------------------------------ *
 * 06 — checklist with the progress ring
 * ------------------------------------------------------------------ */
export function checklistBlock(id, checks) {
  const items = checks.map(text => `<label><input type="checkbox" data-check="${id}">`
    + `<span>${esc(text)}</span></label>`).join('');
  return '<div class="checklist" data-checklist="' + id + '">'
    + '<div class="ring-prog"><svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">'
    + '<circle cx="70" cy="70" r="60" fill="none" stroke="#123049" stroke-width="6"></circle>'
    + '<circle cx="70" cy="70" r="60" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round"'
    + ' stroke-dasharray="377" stroke-dashoffset="377" data-ring></circle></svg>'
    + '<b data-ring-text>0%</b><small>SẴN SÀNG</small></div>'
    + `<div class="check-items">${items}</div>`
    + '</div>';
}

/* ------------------------------------------------------------------ *
 * Recaps
 * ------------------------------------------------------------------ */
// Page 01: one cell per type, each reopens its panel.
export function recapSection({types, icons, head, next}) {
  const cells = types.map(c => `<button type="button" class="rc rc-ico" data-campaign="${c.id}" data-pick="${c.id}">`
    + `<span class="rc-badge">${icon(icons[c.id] || 'dot')}</span>`
    + `<b>${esc(c.title)}</b><span>${esc(c.bestFor)}</span></button>`).join('');
  return section({
    id: 'recap',
    veil: true,
    inner: secHead({...head, center: true, big: true}) + `<div class="recap rv">${cells}</div>` + nextBlock(next)
  });
}

// Pages 02/03: three numbered links back into the page.
export const recapLinks = items => items.map(([title, text, href, ico], i) => `<a class="rc rc-ico" href="${href}">`
  + `<span class="rc-badge">${icon(ico)}</span><em class="rc-n">0${i + 1}</em>`
  + `<b>${esc(title)}</b><span>${esc(text)}</span></a>`).join('');

/* ------------------------------------------------------------------ *
 * Page 03 pieces
 * ------------------------------------------------------------------ */
// Three buckets drawn as one budget splitting in three. Equal columns on
// purpose: the split differs at every business.
export function costSplit(buckets) {
  const cols = buckets.map(([id, ico, name, text]) => `<article data-bucket="${id}">`
    + `<span class="cs-ico">${icon(ico)}</span>`
    + `<b>${esc(name)}</b><span>${esc(text)}</span></article>`).join('');

  return '<div class="cost-split rv">'
    + '<div class="cs-top"><span class="cs-ico">' + icon('wallet') + '</span>'
    + '<b>Ngân sách một tháng</b><span>Toàn bộ số tiền doanh nghiệp bỏ ra cho kênh này</span></div>'
    + '<div class="cs-arms" aria-hidden="true"><i></i><i></i><i></i></div>'
    + `<div class="cs-cols">${cols}</div>`
    + '<p class="cs-note">Ba cột vẽ bằng nhau vì tỷ trọng giữa chúng khác nhau ở từng doanh nghiệp. '
    + 'Hình này để tách khoản mục, không phải tỷ lệ chia.</p>'
    + '</div>';
}

// A plain calculator. Inputs start empty on purpose: the page does not
// suggest a budget or a cost per result.
export function calculator({platform, result = 'yêu cầu'}) {
  const input = (key, label, hint) => `<label class="sc-calc-f"><span>${esc(label)}</span>`
    + `<input type="number" inputmode="numeric" min="0" step="1000" data-c="${key}" placeholder="${esc(hint)}"></label>`;
  return '<div class="sc-calc rv" data-calc>'
    + '<div class="sc-calc-in">'
    + `<b class="sc-calc-h">${icon('sliders')}Tự tính thử</b>`
    + input('daily', 'Tiền quảng cáo mỗi ngày (₫)', 'Ví dụ 300000')
    + input('days', 'Số ngày chạy', 'Ví dụ 30')
    + input('cpl', `Chi phí một ${result} bạn giả định (₫)`, 'Ví dụ 150000')
    + '</div>'
    + '<div class="sc-calc-out" aria-live="polite">'
    + `<div><small>Tiền trả cho nền tảng</small><b data-o="spend">—</b></div>`
    + `<div><small>Số ${esc(result)} theo phép tính</small><b data-o="leads">—</b></div>`
    + `<p>Phép nhân tham khảo. Không phải hạn mức thanh toán của ${esc(platform)}, cũng không phải dự báo kết quả.</p>`
    + '</div></div>';
}

// Ten steps in three phases. steps: [[title, what, output]].
export function rolloutBody({steps, icons, phases}) {
  const items = steps.map(([title, what, output], i) => ({
    id: 'step-' + i,
    tab: `<i class="sc-step-ico">${icon(icons[i])}</i><em>${pad2(i + 1)}</em><b>${esc(title)}</b>`,
    panel: `<div class="sc-step-d"><span class="sc-step-big">${icon(icons[i])}</span>`
      + `<div><small>BƯỚC ${pad2(i + 1)}</small><h4>${esc(title)}</h4><p>${esc(what)}</p>`
      + `<span class="sc-out">${icon('check')}<span><small>Bàn giao</small>${esc(output)}</span></span></div></div>`
  }));
  const layout = buttons => phases.map(([name, idx], p) => `<div class="sc-phase" role="presentation" style="--p:${p}">`
    + `<span class="sc-phase-h" role="presentation">${pad2(p + 1)} · ${esc(name)}</span>`
    + idx.map(i => buttons[i]).join('') + '</div>').join('');
  return `<div class="sc-road rv">${tabs({label: 'Mười bước triển khai', items, cls: 'sc-road-tabs', listCls: 'sc-phases', layout})}</div>`;
}

// groups: [[name, icon, [indexes]]] over `list`.
export function prepBody(groups, list) {
  const html = groups.map(([name, ico, idx]) => `<div class="ck-group"><span class="ck-h">${icon(ico)}${esc(name)}</span>`
    + idx.map(i => `<label><input type="checkbox" data-prep="${i}"><span>${esc(list[i])}</span></label>`).join('')
    + '</div>').join('');
  return '<div class="checklist sc-check rv" data-checklist>'
    + '<div class="ring-prog">'
    + '<svg width="140" height="140" viewBox="0 0 140 140" aria-hidden="true">'
    + '<circle cx="70" cy="70" r="60" fill="none" stroke="#12283a" stroke-width="6"></circle>'
    + '<circle cx="70" cy="70" r="60" fill="none" stroke="currentColor" stroke-width="6" '
    + 'stroke-linecap="round" data-ring></circle></svg>'
    + '<b data-ring-text>0%</b><small>ĐÃ CÓ</small></div>'
    + `<div class="check-items is-grouped">${html}</div></div>`;
}

// topics: [[name, icon, [indexes]]] over faq [[q, a]].
export function faqBody(topics, faq) {
  const items = topics.map(([name, ico, idx]) => ({
    id: 'faq-' + ico,
    tab: `${icon(ico)}<span>${esc(name)}</span><em>${idx.length}</em>`,
    panel: '<div class="faq">' + idx.map((i, j) => `<details${j === 0 ? ' open' : ''}>`
      + `<summary>${esc(faq[i][0])}</summary><p>${esc(faq[i][1])}</p></details>`).join('') + '</div>'
  }));
  return `<div class="sc-faq rv">${tabs({label: 'Chủ đề câu hỏi', items, cls: 'sc-faq-tabs'})}</div>`;
}

/* ------------------------------------------------------------------ *
 * Contact — the only place the placeholders are used
 * ------------------------------------------------------------------ */
const {hotline, zalo, formEndpoint} = placeholders;

function field({name, label, hint = '', type = 'text', required = false}) {
  const attrs = `type="${type}" name="${name}" id="f-${name}"${required ? ' required' : ''}`;
  return '<div class="fld">'
    + `<label for="f-${name}"><span>${esc(label)}</span>`
    + `<span>${esc(hint || (required ? 'BẮT BUỘC' : 'TÙY CHỌN'))}</span></label>`
    + `<input ${attrs}></div>`;
}

// goals: [[value, label]] for the "Mục tiêu chính" select.
export function contactChapter({goals, website = 'Website hoặc trang đích'}) {
  const options = ['<option value="">Chưa xác định</option>']
    .concat(goals.map(([id, title]) => `<option value="${id}">${esc(title)}</option>`)).join('');

  const form = `<form class="brief" id="gaBrief" method="post" action="${esc(formEndpoint)}"`
    + ` data-offline-note="Biểu mẫu chưa nối tới nơi nhận. Trong lúc chờ, gọi ${esc(hotline)} hoặc nhắn Zalo ${esc(zalo)}."`
    + ' data-done-note="Đã nhận yêu cầu. POWAI sẽ liên hệ lại trong giờ làm việc."'
    + ` data-fail-note="Chưa gửi được. Gọi ${esc(hotline)} hoặc nhắn Zalo ${esc(zalo)} giúp POWAI."`
    + '>'
    + '<div class="brief-grid">'
    + field({name: 'company', label: 'Doanh nghiệp', required: true})
    + field({name: 'contact', label: 'Người liên hệ', required: true})
    + field({name: 'phone', label: 'Số điện thoại', type: 'tel', required: true})
    + field({name: 'email', label: 'Email', type: 'email'})
    + field({name: 'website', label: website, type: 'url'})
    + field({name: 'budget', label: 'Ngân sách dự kiến mỗi tháng'})
    + '<div class="fld"><label for="f-goal"><span>Mục tiêu chính</span><span>TÙY CHỌN</span></label>'
    + `<select name="goal" id="f-goal">${options}</select></div>`
    + '<div class="fld wide"><label for="f-note"><span>Doanh nghiệp đang gặp vấn đề gì</span>'
    + '<span>TÙY CHỌN</span></label>'
    + '<textarea name="note" id="f-note" rows="4"></textarea></div>'
    + '</div>'
    + '<div class="brief-foot">'
    + '<button class="btn btn-cyan" type="submit">Gửi yêu cầu tư vấn <span aria-hidden="true">→</span></button>'
    + '<p class="brief-status" data-brief-status role="status"></p>'
    + '</div></form>';

  const direct = '<aside class="brief-side">'
    + kicker('LIÊN HỆ TRỰC TIẾP')
    + '<h3>Muốn trao đổi ngay?</h3>'
    + `<p>Gọi <b>${esc(hotline)}</b> trong giờ làm việc, hoặc nhắn Zalo <b>${esc(zalo)}</b>. `
    + 'Nếu tiện hơn, gửi trước thông tin ở biểu mẫu để buổi trao đổi đi thẳng vào việc.</p>'
    + '<div class="sc-direct">'
    + `<a class="sc-dc is-call" href="tel:${esc(hotline)}"><i>${icon('phone')}</i><span><small>Hotline</small><b>${esc(hotline)}</b></span></a>`
    + `<a class="sc-dc is-zalo" href="#"><i>${fabGlyph('zalo')}</i><span><small>Zalo</small><b>${esc(zalo)}</b></span></a>`
    + '</div>'
    + '<p class="brief-hint">POWAI cần biết doanh nghiệp bán gì, phục vụ khu vực nào và hiện nhận khách '
    + 'qua đâu. Ba thông tin đó quyết định phần lớn cách chạy được đề xuất.</p>'
    + '</aside>';

  return chapter({
    id: 'lien-he', num: 9, eyebrow: 'BẮT ĐẦU',
    title: 'Gửi bối cảnh, nhận đề xuất cách chạy.',
    lead: 'Không cần chuẩn bị sẵn mọi thứ. Gửi những gì đang có, phần thiếu sẽ được rà cùng nhau.',
    body: `<div class="brief-wrap rv">${form}${direct}</div>`
  });
}
